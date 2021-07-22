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
import path  from 'path'

import {
  ContactPayload,

  FileBox,

  FriendshipPayload,

  ImageType,

  MessagePayload,

  Puppet,
  PuppetOptions,

  RoomInvitationPayload,
  RoomMemberPayload,
  RoomPayload,

  UrlLinkPayload,
  MiniProgramPayload,

  log,
  PayloadType,
  MessageType,
  ContactGender,
  ContactType,
  throwUnsupportedError,
}                           from 'wechaty-puppet'

import {
  CHATIE_OFFICIAL_ACCOUNT_QRCODE,
  qrCodeForChatie,
  VERSION,
}                                   from './config'

import {
  attach,
  detach,
}           from 'frida-sidecar'

import { WeChatSidecar } from './wechat-sidecar'

export type PuppetXpOptions = PuppetOptions

class PuppetXp extends Puppet {

  static override readonly VERSION = VERSION

  private messageStore: { [k: string]: MessagePayload }

  protected sidecar: WeChatSidecar

  constructor (
    public override options: PuppetXpOptions = {},
  ) {
    super(options)
    log.verbose('PuppetXp', 'constructor(%s)', JSON.stringify(options))

    // FIXME: use LRU cache for message store so that we can reduce memory usage
    this.messageStore = {}
    this.sidecar = new WeChatSidecar()
  }

  override async start (): Promise<void> {
    log.verbose('PuppetXp', 'start()')

    if (this.state.on()) {
      log.warn('PuppetXp', 'start() is called on a ON puppet. await ready(on) and return.')
      await this.state.ready('on')
      return
    }

    this.state.on('pending')

    await attach(this.sidecar)

    this.sidecar.on('recvMsg', args => {
      if (args instanceof Error) {
        throw args
      }

      const fromId  = String(args[1])
      const text    = String(args[2])
      const toId    = String(args[3])

      const payload: MessagePayload = {
        fromId,
        id: cuid(),
        text,
        timestamp: Date.now(),
        toId,
        type: MessageType.Text,
      }

      this.messageStore[payload.id] = payload
      this.emit('message', { messageId: payload.id })
    })

    // FIXME: use the real login contact id
    await this.login('filehelper')

    // Do some async initializing tasks

    this.state.on(true)
  }

  override async stop (): Promise<void> {
    log.verbose('PuppetXp', 'stop()')

    if (this.state.off()) {
      log.warn('PuppetXp', 'stop() is called on a OFF puppet. await ready(off) and return.')
      await this.state.ready('off')
      return
    }

    this.state.off('pending')

    this.sidecar.removeAllListeners()

    if (this.logonoff()) {
      await this.logout()
    }

    await detach(this.sidecar)

    // await some tasks...
    this.state.off(true)
  }

  override login (contactId: string): Promise<void> {
    log.verbose('PuppetXp', 'login()')
    return super.login(contactId)
  }

  override async logout (): Promise<void> {
    log.verbose('PuppetXp', 'logout()')

    if (!this.id) {
      throw new Error('logout before login?')
    }

    this.emit('logout', { contactId: this.id, data: 'test' }) // before we will throw above by logonoff() when this.user===undefined
    this.id = undefined

    // TODO: do the logout job
  }

  override ding (data?: string): void {
    log.silly('PuppetXp', 'ding(%s)', data || '')
    setTimeout(() => this.emit('dong', { data: data || '' }), 1000)
  }

  override unref (): void {
    log.verbose('PuppetXp', 'unref()')
    super.unref()
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
  }

  override async contactSelfSignature (signature: string): Promise<void> {
    log.verbose('PuppetXp', 'contactSelfSignature(%s)', signature)
  }

  /**
   *
   * Contact
   *
   */
  override contactAlias (contactId: string)                      : Promise<string>
  override contactAlias (contactId: string, alias: string | null): Promise<void>

  override async contactAlias (contactId: string, alias?: string | null): Promise<void | string> {
    log.verbose('PuppetXp', 'contactAlias(%s, %s)', contactId, alias)

    if (typeof alias === 'undefined') {
      return 'mock alias'
    }
  }

  override async contactPhone (contactId: string): Promise<string[]>
  override async contactPhone (contactId: string, phoneList: string[]): Promise<void>

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
    return []
  }

  override async contactAvatar (contactId: string)                : Promise<FileBox>
  override async contactAvatar (contactId: string, file: FileBox) : Promise<void>

  override async contactAvatar (contactId: string, file?: FileBox): Promise<void | FileBox> {
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

  override async contactRawPayloadParser (payload: ContactPayload) { return payload }
  override async contactRawPayload (id: string): Promise<ContactPayload> {
    log.verbose('PuppetXp', 'contactRawPayload(%s)', id)
    return {
      avatar : 'to be added',
      gender : ContactGender.Unknown,
      id,
      name  : 'To be named',
      phone : [],
      type  : ContactType.Unknown,
    }
  }

  /**
   *
   * Conversation
   *
   */
  override async conversationReadMark (conversationId: string, hasRead?: boolean) : Promise<void> {
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
    return ''
  }

  override async messageImage (
    messageId: string,
    imageType: ImageType,
  ) : Promise<FileBox> {
    log.verbose('PuppetXp', 'messageImage(%s, %s[%s])',
      messageId,
      imageType,
      ImageType[imageType],
    )
    // const attachment = this.mocker.MockMessage.loadAttachment(messageId)
    // if (attachment instanceof FileBox) {
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

  override async messageFile (id: string): Promise<FileBox> {
    // const attachment = this.mocker.MockMessage.loadAttachment(id)
    // if (attachment instanceof FileBox) {
    //   return attachment
    // }
    return FileBox.fromBase64(
      'cRH9qeL3XyVnaXJkppBuH20tf5JlcG9uFX1lL2IvdHRRRS9kMMQxOPLKNYIzQQ==',
      'mock-file' + id + '.txt',
    )
  }

  override async messageUrl (messageId: string)  : Promise<UrlLinkPayload> {
    log.verbose('PuppetXp', 'messageUrl(%s)', messageId)
    // const attachment = this.mocker.MockMessage.loadAttachment(messageId)
    // if (attachment instanceof UrlLink) {
    //   return attachment.payload
    // }
    return {
      title : 'mock title for ' + messageId,
      url   : 'https://mock.url',
    }
  }

  override async messageMiniProgram (messageId: string): Promise<MiniProgramPayload> {
    log.verbose('PuppetXp', 'messageMiniProgram(%s)', messageId)
    // const attachment = this.mocker.MockMessage.loadAttachment(messageId)
    // if (attachment instanceof MiniProgram) {
    //   return attachment.payload
    // }
    return {
      title : 'mock title for ' + messageId,
    }
  }

  override async messageRawPayloadParser (payload: MessagePayload) { return payload }
  override async messageRawPayload (id: string): Promise<MessagePayload> {
    log.verbose('PuppetXp', 'messageRawPayload(%s)', id)

    const payload = this.messageStore[id]
    if (!payload) {
      throw new Error('no payload')
    }
    return  payload
  }

  override async messageSendText (
    conversationId: string,
    text     : string,
  ): Promise<void> {
    await this.sidecar.sendMsg(conversationId, text)
  }

  override async messageSendFile (
    conversationId: string,
    file     : FileBox,
  ): Promise<void> {
    throwUnsupportedError(conversationId, file)
  }

  override async messageSendContact (
    conversationId: string,
    contactId : string,
  ): Promise<void> {
    log.verbose('PuppetXp', 'messageSendUrl(%s, %s)', conversationId, contactId)

    // const contact = this.mocker.MockContact.load(contactId)
    // return this.messageSend(conversationId, contact)
  }

  override async messageSendUrl (
    conversationId: string,
    urlLinkPayload: UrlLinkPayload,
  ) : Promise<void> {
    log.verbose('PuppetXp', 'messageSendUrl(%s, %s)', conversationId, JSON.stringify(urlLinkPayload))

    // const url = new UrlLink(urlLinkPayload)
    // return this.messageSend(conversationId, url)
  }

  override async messageSendMiniProgram (
    conversationId: string,
    miniProgramPayload: MiniProgramPayload,
  ): Promise<void> {
    log.verbose('PuppetXp', 'messageSendMiniProgram(%s, %s)', conversationId, JSON.stringify(miniProgramPayload))
    // const miniProgram = new MiniProgram(miniProgramPayload)
    // return this.messageSend(conversationId, miniProgram)
  }

  override async messageForward (
    conversationId: string,
    messageId : string,
  ): Promise<void> {
    log.verbose('PuppetXp', 'messageForward(%s, %s)',
      conversationId,
      messageId,
    )
  }

  /**
   *
   * Room
   *
   */
  override async roomRawPayloadParser (payload: RoomPayload) { return payload }
  override async roomRawPayload (id: string): Promise<RoomPayload> {
    log.verbose('PuppetXp', 'roomRawPayload(%s)', id)
    return {} as any
  }

  override async roomList (): Promise<string[]> {
    log.verbose('PuppetXp', 'roomList()')
    return []
  }

  override async roomDel (
    roomId    : string,
    contactId : string,
  ): Promise<void> {
    log.verbose('PuppetXp', 'roomDel(%s, %s)', roomId, contactId)
  }

  override async roomAvatar (roomId: string): Promise<FileBox> {
    log.verbose('PuppetXp', 'roomAvatar(%s)', roomId)

    const payload = await this.roomPayload(roomId)

    if (payload.avatar) {
      return FileBox.fromUrl(payload.avatar)
    }
    log.warn('PuppetXp', 'roomAvatar() avatar not found, use the chatie default.')
    return qrCodeForChatie()
  }

  override async roomAdd (
    roomId    : string,
    contactId : string,
  ): Promise<void> {
    log.verbose('PuppetXp', 'roomAdd(%s, %s)', roomId, contactId)
  }

  override async roomTopic (roomId: string)                : Promise<string>
  override async roomTopic (roomId: string, topic: string) : Promise<void>

  override async roomTopic (
    roomId: string,
    topic?: string,
  ): Promise<void | string> {
    log.verbose('PuppetXp', 'roomTopic(%s, %s)', roomId, topic)

    if (typeof topic === 'undefined') {
      return 'mock room topic'
    }

    await this.dirtyPayload(PayloadType.Room, roomId)
  }

  override async roomCreate (
    contactIdList : string[],
    topic         : string,
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

  override async roomMemberList (roomId: string) : Promise<string[]> {
    log.verbose('PuppetXp', 'roomMemberList(%s)', roomId)
    return []
  }

  override async roomMemberRawPayload (roomId: string, contactId: string): Promise<RoomMemberPayload>  {
    log.verbose('PuppetXp', 'roomMemberRawPayload(%s, %s)', roomId, contactId)
    return {
      avatar    : 'mock-avatar-data',
      id        : 'xx',
      name      : 'mock-name',
      roomAlias : 'yy',
    }
  }

  override async roomMemberRawPayloadParser (rawPayload: RoomMemberPayload): Promise<RoomMemberPayload>  {
    log.verbose('PuppetXp', 'roomMemberRawPayloadParser(%s)', rawPayload)
    return rawPayload
  }

  override async roomAnnounce (roomId: string)                : Promise<string>
  override async roomAnnounce (roomId: string, text: string)  : Promise<void>

  override async roomAnnounce (roomId: string, text?: string) : Promise<void | string> {
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

  override async roomInvitationRawPayloadParser (rawPayload: any): Promise<RoomInvitationPayload> {
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

  override async friendshipRawPayloadParser (rawPayload: any): Promise<FriendshipPayload> {
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
    contactId : string,
    hello     : string,
  ): Promise<void> {
    log.verbose('PuppetXp', 'friendshipAdd(%s, %s)', contactId, hello)
  }

  override async friendshipAccept (
    friendshipId : string,
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
