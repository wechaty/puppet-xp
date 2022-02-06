/**
 *   Wechaty - https://github.com/chatie/wechaty
 *
 *   @copyright 2016-2018 Huan LI <zixia@zixia.net>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */
import cuid from 'cuid'
import path from 'path'
import fs from 'fs'
import xml2js from 'xml2js'

import os from 'os'

import * as PUPPET    from 'wechaty-puppet'
import { log }        from 'wechaty-puppet'
import type {
  FileBoxInterface,
}                     from 'file-box'
import {
  FileBox,
  FileBoxType,
}                     from 'file-box'
import {
  attach,
  detach,
} from 'sidecar'

import {
  CHATIE_OFFICIAL_ACCOUNT_QRCODE,
  qrCodeForChatie,
  VERSION,
} from './config.js'

import { WeChatSidecar } from './wechat-sidecar.js'
import { ImageDecrypt } from './pure-functions/image-decrypt.js'

const userInfo = os.userInfo()
const rootPath = `${userInfo.homedir}\\Documents\\WeChat Files\\`

export type PuppetXpOptions = PUPPET.PuppetOptions

class PuppetXp extends PUPPET.Puppet {

  static override readonly VERSION = VERSION

  private messageStore: { [k: string]: PUPPET.payloads.Message }

  private roomStore: { [k: string]: PUPPET.payloads.Room }

  private contactStore: { [k: string]: PUPPET.payloads.Contact }

  private selfInfo: any

  #sidecar?: WeChatSidecar
  protected get sidecar (): WeChatSidecar {
    return this.#sidecar!
  }

  constructor (
    public override options: PuppetXpOptions = {},
  ) {
    super(options)
    log.verbose('PuppetXp', 'constructor(%s)', JSON.stringify(options))

    // FIXME: use LRU cache for message store so that we can reduce memory usage
    this.messageStore = {}
    this.roomStore = {}
    this.contactStore = {}
    this.selfInfo = {}
  }

  override version () {
    return VERSION
  }

  async onStart () {
    log.verbose('PuppetXp', 'onStart()')

    if (this.#sidecar) {
      // Huan(2021-09-13): need to call `detach` to make sure the sidecar will be closed?
      await detach(this.#sidecar)
      this.#sidecar = undefined
      log.warn('PuppetXp', 'onStart() this.#sidecar exists? will be replaced by a new one.')
    }

    this.#sidecar = new WeChatSidecar()

    await attach(this.sidecar)

    this.selfInfo = JSON.parse(await this.sidecar.getMyselfInfo())

    const contactList = JSON.parse(await this.sidecar.getContact())

    for (const contactKey in contactList) {
      const contactInfo = contactList[contactKey]
      const contact = {
        alias: '',
        avatar: '',
        friend: true,
        gender: PUPPET.types.ContactGender.Unknown,
        id: contactInfo.id,
        name: contactInfo.name,
        phone: [],
        type: PUPPET.types.Contact.Unknown,
      }
      this.contactStore[contactInfo.id] = contact
    }

    const roomList = JSON.parse(await this.sidecar.getChatroomMemberInfo())
    for (const roomKey in roomList) {
      const roomInfo = roomList[roomKey]
      const roomId = roomInfo.roomid
      const roomMember = roomInfo.roomMember || []
      const topic = this.contactStore[roomId]?.name || ''
      const room = {
        adminIdList: [],
        avatar: '',
        external: false,
        id: roomId,
        memberIdList: roomMember,
        ownerId: '',
        topic: topic,
      }
      this.roomStore[roomId] = room

      for (const memberKey in roomMember) {
        const memberId = roomMember[memberKey]
        if (!this.contactStore[memberId]) {
          try {
            const memberNickName = await this.sidecar.getChatroomMemberNickInfo(memberId, roomId)
            const contact = {
              alias: '',
              avatar: '',
              friend: false,
              gender: PUPPET.types.ContactGender.Unknown,
              id: memberId,
              name: memberNickName,
              phone: [],
              type: PUPPET.types.Contact.Unknown,
            }
            this.contactStore[memberId] = contact
          } catch (err) {
            console.error(err)
          }
        }
      }
    }

    // console.debug(this.roomStore)
    // console.debug(this.contactStore)

    this.sidecar.on('hook', ({ method, args }) => {
      if (method !== 'recvMsg') {
        return
      }

      // console.info(args)
      let type = PUPPET.types.Message.Unknown
      let roomId = ''
      let toId = ''
      let fromId = ''
      const text = String(args[2])

      if (args[0] === 34) {
        type = PUPPET.types.Message.Audio
      } else if (args[0] === 42) {
        type = PUPPET.types.Message.Contact
      } else if (args[0] === 47) {
        type = PUPPET.types.Message.Emoticon
      } else if (args[0] === 3) {
        type = PUPPET.types.Message.Image
      } else if (args[0] === 1) {
        type = PUPPET.types.Message.Text
      } else if (args[0] === 43) {
        type = PUPPET.types.Message.Video
      } else {
        try {
          xml2js.parseString(text, { explicitArray: false, ignoreAttrs: true }, function (err: any, json: { msg: { appmsg: { type: Number } } }) {
            console.info(err)
            console.info(JSON.stringify(json))
            if (json.msg.appmsg.type === 5) {
              type = PUPPET.types.Message.Url
            } else if (json.msg.appmsg.type === 33) {
              type = PUPPET.types.Message.MiniProgram
            } else if (json.msg.appmsg.type === 6) {
              type = PUPPET.types.Message.Attachment
            } else {
              type = PUPPET.types.Message.Unknown
            }
          })
        } catch (err) {
          console.error(err)
        }
      }

      // set fromId and toId according to isMyMsg
      if (args[5] === 1) {
        fromId = this.selfInfo.id
        toId = String(args[1])
      } else {
        fromId = String(args[1])
        toId = this.selfInfo.id
      }

      // set formId if it is room message
      if (String(args[1]).split('@').length === 2) {
        fromId = String(args[3])
        roomId = String(args[1])
      }

      const payload: PUPPET.payloads.Message = {
        fromId,
        id: cuid(),
        roomId,
        text,
        timestamp: Date.now(),
        toId,
        type,
      }
      // console.info(payload)
      this.messageStore[payload.id] = payload
      this.emit('message', { messageId: payload.id })
    })

    this.sidecar.on('error', e => this.emit('error', { data: JSON.stringify(e as any) }))

    // FIXME: use the real login contact id
    await this.login(this.selfInfo.id)
  }

  async onStop () {
    log.verbose('PuppetXp', 'onStop()')

    this.sidecar.removeAllListeners()

    if (this.logonoff()) {
      await this.logout()
    }

    await detach(this.sidecar)
    this.#sidecar = undefined
  }

  override login (contactId: string): void {
    log.verbose('PuppetXp', 'login()')
    super.login(contactId)
  }

  override ding (data?: string): void {
    log.silly('PuppetXp', 'ding(%s)', data || '')
    setTimeout(() => this.emit('dong', { data: data || '' }), 1000)
  }

  /**
   *
   * ContactSelf
   *
   *
   */
  override async contactSelfQRCode (): Promise<string> {
    log.verbose('PuppetXp', 'contactSelfQRCode()')
    return CHATIE_OFFICIAL_ACCOUNT_QRCODE
  }

  override async contactSelfName (name: string): Promise<void> {
    log.verbose('PuppetXp', 'contactSelfName(%s)', name)
    if (!name) {
      return this.selfInfo.name
    }
  }

  override async contactSelfSignature (signature: string): Promise<void> {
    log.verbose('PuppetXp', 'contactSelfSignature(%s)', signature)
  }

  /**
 *
 * Contact
 *
 */
  override contactAlias(contactId: string): Promise<string>
  override contactAlias(contactId: string, alias: string | null): Promise<void>

  override async contactAlias (contactId: string, alias?: string | null): Promise<void | string> {
    log.verbose('PuppetXp', 'contactAlias(%s, %s)', contactId, alias)
    const contact = await this.contactRawPayload(contactId)
    // if (typeof alias === 'undefined') {
    //   throw new Error('to be implement')
    // }
    return contact.alias
  }

  override async contactPhone(contactId: string): Promise<string[]>
  override async contactPhone(contactId: string, phoneList: string[]): Promise<void>

  override async contactPhone (contactId: string, phoneList?: string[]): Promise<string[] | void> {
    log.verbose('PuppetXp', 'contactPhone(%s, %s)', contactId, phoneList)
    if (typeof phoneList === 'undefined') {
      return []
    }
  }

  override async contactCorporationRemark (contactId: string, corporationRemark: string) {
    log.verbose('PuppetXp', 'contactCorporationRemark(%s, %s)', contactId, corporationRemark)
  }

  override async contactDescription (contactId: string, description: string) {
    log.verbose('PuppetXp', 'contactDescription(%s, %s)', contactId, description)
  }

  override async contactList (): Promise<string[]> {
    log.verbose('PuppetXp', 'contactList()')
    const idList = Object.keys(this.contactStore)
    return idList
  }

  override async contactAvatar(contactId: string): Promise<FileBoxInterface>
  override async contactAvatar(contactId: string, file: FileBoxInterface): Promise<void>

  override async contactAvatar (contactId: string, file?: FileBoxInterface): Promise<void | FileBoxInterface> {
    log.verbose('PuppetXp', 'contactAvatar(%s)', contactId)

    /**
   * 1. set
   */
    if (file) {
      return
    }

    /**
   * 2. get
   */
    const WECHATY_ICON_PNG = path.resolve('../../docs/images/wechaty-icon.png')
    return FileBox.fromFile(WECHATY_ICON_PNG)
  }

  override async contactRawPayloadParser (payload: PUPPET.payloads.Contact) {
    // log.verbose('PuppetXp', 'contactRawPayloadParser(%s)', JSON.stringify(payload))
    return payload
  }

  override async contactRawPayload (id: string): Promise<PUPPET.payloads.Contact> {
    log.verbose('PuppetXp----------------------', 'contactRawPayload(%s)', id)
    return this.contactStore[id] || {} as any
  }

  /**
 *
 * Conversation
 *
 */
  override async conversationReadMark (conversationId: string, hasRead?: boolean): Promise<void> {
    log.verbose('PuppetService', 'conversationRead(%s, %s)', conversationId, hasRead)
  }

  /**
 *
 * Message
 *
 */
  override async messageContact (
    messageId: string,
  ): Promise<string> {
    log.verbose('PuppetXp', 'messageContact(%s)', messageId)
    // const attachment = this.mocker.MockMessage.loadAttachment(messageId)
    // if (attachment instanceof ContactMock) {
    //   return attachment.id
    // }
    return this.messageStore[messageId]?.fromId || ''
  }

  override async messageImage (
    messageId: string,
    imageType: PUPPET.types.Image,
  ): Promise<FileBoxInterface> {
    log.verbose('PuppetXp', 'messageImage(%s, %s[%s])',
      messageId,
      imageType,
      PUPPET.types.Image[imageType],
    )
    // const attachment = this.mocker.MockMessage.loadAttachment(messageId)
    // if (attachment instanceof FileBoxInterface) {
    //   return attachment
    // }
    return FileBox.fromQRCode('fake-qrcode')
  }

  override async messageRecall (
    messageId: string,
  ): Promise<boolean> {
    log.verbose('PuppetXp', 'messageRecall(%s)', messageId)
    return false
  }

  override async messageFile (id: string): Promise<FileBoxInterface> {
    // const attachment = this.mocker.MockMessage.loadAttachment(id)
    // if (attachment instanceof FileBoxInterface) {
    //   return attachment
    // }
    const message = this.messageStore[id]
    let base64 = ''
    let fileName = ''
    try {
      if (message?.text) {
        const filePath = message.text
        const dataPath = rootPath + filePath    // 要解密的文件路径
        // console.info(dataPath)
        const imageInfo = ImageDecrypt(dataPath, id)
        // console.info(imageInfo)
        base64 = imageInfo.base64
        fileName = imageInfo.fileName
      }
    } catch (err) {
      console.error(err)
    }

    return FileBox.fromBase64(
      base64,
      fileName,
    )
  }

  override async messageUrl (messageId: string): Promise<PUPPET.payloads.UrlLink> {
    log.verbose('PuppetXp', 'messageUrl(%s)', messageId)
    // const attachment = this.mocker.MockMessage.loadAttachment(messageId)
    // if (attachment instanceof UrlLink) {
    //   return attachment.payload
    // }
    return {
      title: 'mock title for ' + messageId,
      url: 'https://mock.url',
    }
  }

  override async messageMiniProgram (messageId: string): Promise<PUPPET.payloads.MiniProgram> {
    log.verbose('PuppetXp', 'messageMiniProgram(%s)', messageId)
    // const attachment = this.mocker.MockMessage.loadAttachment(messageId)
    // if (attachment instanceof MiniProgram) {
    //   return attachment.payload
    // }
    return {
      title: 'mock title for ' + messageId,
    }
  }

  override async messageLocation (messageId: string): Promise<PUPPET.payloads.Location> {
    log.verbose('PuppetXp', 'messageLocation(%s)', messageId)
    return {
      accuracy: 15, // in meters
      address: '北京市北京市海淀区45 Chengfu Rd',
      latitude: 39.995120999999997,
      longitude: 116.334154,
      name: '东升乡政府',
    }
  }

  override async messageRawPayloadParser (payload: PUPPET.payloads.Message) {
    // console.info(payload)
    return payload
  }

  override async messageRawPayload (id: string): Promise<PUPPET.payloads.Message> {
    log.verbose('PuppetXp', 'messageRawPayload(%s)', id)

    const payload = this.messageStore[id]
    if (!payload) {
      throw new Error('no payload')
    }
    return payload
  }

  override async messageSendText (
    conversationId: string,
    text: string,
    mentionIdList?: string[],
  ): Promise<void> {
    if (conversationId.split('@').length === 2 && mentionIdList && mentionIdList[0]) {
      await this.sidecar.sendAtMsg(conversationId, text, mentionIdList[0])
    } else {
      await this.sidecar.sendMsg(conversationId, text)
    }
  }

  override async messageSendFile (
    conversationId: string,
    file: FileBoxInterface,
  ): Promise<void> {
    // PUPPET.throwUnsupportedError(conversationId, file)
    const filePath = path.resolve(file.name)
    await file.toFile(filePath, true)
    if (file.type === FileBoxType.Url) {
      try {
        await this.sidecar.sendPicMsg(conversationId, filePath)
        fs.unlinkSync(filePath)
      } catch {
        fs.unlinkSync(filePath)
      }

    } else {
      PUPPET.throwUnsupportedError(conversationId, file)
    }
  }

  override async messageSendContact (
    conversationId: string,
    contactId: string,
  ): Promise<void> {
    log.verbose('PuppetXp', 'messageSendUrl(%s, %s)', conversationId, contactId)

    // const contact = this.mocker.MockContact.load(contactId)
    // return this.messageSend(conversationId, contact)
  }

  override async messageSendUrl (
    conversationId: string,
    urlLinkPayload: PUPPET.payloads.UrlLink,
  ): Promise<void> {
    log.verbose('PuppetXp', 'messageSendUrl(%s, %s)', conversationId, JSON.stringify(urlLinkPayload))

    // const url = new UrlLink(urlLinkPayload)
    // return this.messageSend(conversationId, url)
  }

  override async messageSendMiniProgram (
    conversationId: string,
    miniProgramPayload: PUPPET.payloads.MiniProgram,
  ): Promise<void> {
    log.verbose('PuppetXp', 'messageSendMiniProgram(%s, %s)', conversationId, JSON.stringify(miniProgramPayload))
    // const miniProgram = new MiniProgram(miniProgramPayload)
    // return this.messageSend(conversationId, miniProgram)
  }

  override async messageSendLocation (
    conversationId: string,
    locationPayload: PUPPET.payloads.Location,
  ): Promise<void | string> {
    log.verbose('PuppetXp', 'messageSendLocation(%s, %s)', conversationId, JSON.stringify(locationPayload))
  }

  override async messageForward (
    conversationId: string,
    messageId: string,
  ): Promise<void> {
    log.verbose('PuppetXp', 'messageForward(%s, %s)',
      conversationId,
      messageId,
    )
    const curMessage = this.messageStore[messageId]
    if (curMessage?.type === PUPPET.types.Message.Text) {
      await this.messageSendText(conversationId, curMessage.text || '')
    } else {
      PUPPET.throwUnsupportedError(conversationId, messageId)
    }
  }

  /**
 *
 * Room
 *
 */
  override async roomRawPayloadParser (payload: PUPPET.payloads.Room) { return payload }
  override async roomRawPayload (id: string): Promise<PUPPET.payloads.Room> {
    // log.verbose('PuppetXp', 'roomRawPayload(%s)', id)
    return this.roomStore[id] || {} as any
  }

  override async roomList (): Promise<string[]> {
    log.verbose('PuppetXp', 'roomList()')
    const idList = Object.keys(this.roomStore)
    return idList
  }

  override async roomDel (
    roomId: string,
    contactId: string,
  ): Promise<void> {
    log.verbose('PuppetXp', 'roomDel(%s, %s)', roomId, contactId)
  }

  override async roomAvatar (roomId: string): Promise<FileBoxInterface> {
    log.verbose('PuppetXp', 'roomAvatar(%s)', roomId)

    const payload = await this.roomPayload(roomId)

    if (payload.avatar) {
      return FileBox.fromUrl(payload.avatar)
    }
    log.warn('PuppetXp', 'roomAvatar() avatar not found, use the chatie default.')
    return qrCodeForChatie()
  }

  override async roomAdd (
    roomId: string,
    contactId: string,
  ): Promise<void> {
    log.verbose('PuppetXp', 'roomAdd(%s, %s)', roomId, contactId)
  }

  override async roomTopic(roomId: string): Promise<string>
  override async roomTopic(roomId: string, topic: string): Promise<void>

  override async roomTopic (
    roomId: string,
    topic?: string,
  ): Promise<void | string> {
    log.verbose('PuppetXp', 'roomTopic(%s, %s)', roomId, topic)
    const payload = await this.roomPayload(roomId)
    if (!topic) {
      return payload.topic
    } else {
      return payload.topic
    }
  }

  override async roomCreate (
    contactIdList: string[],
    topic: string,
  ): Promise<string> {
    log.verbose('PuppetXp', 'roomCreate(%s, %s)', contactIdList, topic)

    return 'mock_room_id'
  }

  override async roomQuit (roomId: string): Promise<void> {
    log.verbose('PuppetXp', 'roomQuit(%s)', roomId)
  }

  override async roomQRCode (roomId: string): Promise<string> {
    log.verbose('PuppetXp', 'roomQRCode(%s)', roomId)
    return roomId + ' mock qrcode'
  }

  override async roomMemberList (roomId: string): Promise<string[]> {
    log.verbose('PuppetXp', 'roomMemberList(%s)', roomId)
    return (await this.roomRawPayload(roomId)).memberIdList
  }

  override async roomMemberRawPayload (roomId: string, contactId: string): Promise<PUPPET.payloads.RoomMember> {
    log.verbose('PuppetXp', 'roomMemberRawPayload(%s, %s)', roomId, contactId)
    const contact = this.contactStore[contactId]
    const MemberRawPayload = {
      avatar: '',
      id: contactId,
      inviterId: contactId,   // "wxid_7708837087612",
      name: contact?.name || '',
      roomAlias: contact?.name || '',
    }
    // console.info(MemberRawPayload)
    return MemberRawPayload
  }

  override async roomMemberRawPayloadParser (rawPayload: PUPPET.payloads.RoomMember): Promise<PUPPET.payloads.RoomMember> {
    log.verbose('PuppetXp---------------------', 'roomMemberRawPayloadParser(%s)', rawPayload)
    return rawPayload
  }

  override async roomAnnounce(roomId: string): Promise<string>
  override async roomAnnounce(roomId: string, text: string): Promise<void>

  override async roomAnnounce (roomId: string, text?: string): Promise<void | string> {
    if (text) {
      return
    }
    return 'mock announcement for ' + roomId
  }

  /**
 *
 * Room Invitation
 *
 */
  override async roomInvitationAccept (roomInvitationId: string): Promise<void> {
    log.verbose('PuppetXp', 'roomInvitationAccept(%s)', roomInvitationId)
  }

  override async roomInvitationRawPayload (roomInvitationId: string): Promise<any> {
    log.verbose('PuppetXp', 'roomInvitationRawPayload(%s)', roomInvitationId)
  }

  override async roomInvitationRawPayloadParser (rawPayload: any): Promise<PUPPET.payloads.RoomInvitation> {
    log.verbose('PuppetXp', 'roomInvitationRawPayloadParser(%s)', JSON.stringify(rawPayload))
    return rawPayload
  }

  /**
 *
 * Friendship
 *
 */
  override async friendshipRawPayload (id: string): Promise<any> {
    return { id } as any
  }

  override async friendshipRawPayloadParser (rawPayload: any): Promise<PUPPET.payloads.Friendship> {
    return rawPayload
  }

  override async friendshipSearchPhone (
    phone: string,
  ): Promise<null | string> {
    log.verbose('PuppetXp', 'friendshipSearchPhone(%s)', phone)
    return null
  }

  override async friendshipSearchWeixin (
    weixin: string,
  ): Promise<null | string> {
    log.verbose('PuppetXp', 'friendshipSearchWeixin(%s)', weixin)
    return null
  }

  override async friendshipAdd (
    contactId: string,
    hello: string,
  ): Promise<void> {
    log.verbose('PuppetXp', 'friendshipAdd(%s, %s)', contactId, hello)
  }

  override async friendshipAccept (
    friendshipId: string,
  ): Promise<void> {
    log.verbose('PuppetXp', 'friendshipAccept(%s)', friendshipId)
  }

  /**
 *
 * Tag
 *
 */
  override async tagContactAdd (
    tagId: string,
    contactId: string,
  ): Promise<void> {
    log.verbose('PuppetXp', 'tagContactAdd(%s)', tagId, contactId)
  }

  override async tagContactRemove (
    tagId: string,
    contactId: string,
  ): Promise<void> {
    log.verbose('PuppetXp', 'tagContactRemove(%s)', tagId, contactId)
  }

  override async tagContactDelete (
    tagId: string,
  ): Promise<void> {
    log.verbose('PuppetXp', 'tagContactDelete(%s)', tagId)
  }

  override async tagContactList (
    contactId?: string,
  ): Promise<string[]> {
    log.verbose('PuppetXp', 'tagContactList(%s)', contactId)
    return []
  }

}

export { PuppetXp }
export default PuppetXp
