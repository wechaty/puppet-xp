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
import fsPromise from 'fs/promises'
import xml2js from 'xml2js'
import readXml from 'xmlreader'
import os from 'os'

import * as PUPPET from 'wechaty-puppet'
import { log } from 'wechaty-puppet'
import type {
  FileBoxInterface,
} from 'file-box'
import {
  FileBox,
  FileBoxType,
} from 'file-box'
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
import { XmlDecrypt } from './pure-functions/xml-msgpayload.js'
// import type { Contact } from 'wechaty'

// 定义一个延时方法
async function wait (ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const userInfo = os.userInfo()
const rootPath = `${userInfo.homedir}\\Documents\\WeChat Files\\`

export type PuppetXpOptions = PUPPET.PuppetOptions

class PuppetXp extends PUPPET.Puppet {

  static override readonly VERSION = VERSION

  private messageStore: { [k: string]: PUPPET.payloads.Message }

  private roomStore: { [k: string]: PUPPET.payloads.Room }

  private contactStore: { [k: string]: PUPPET.payloads.Contact }

  private scanEventData?: PUPPET.payloads.EventScan

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

    await this.onLogin()

    this.sidecar.on('hook', ({ method, args }) => {
      log.verbose('PuppetXp', 'onHook(%s, %s)', method, JSON.stringify(args))

      switch (method) {
        case 'recvMsg':
          this.onHookRecvMsg(args)
          break
        case 'checkQRLogin':
          this.onScan(args)
          break
        case 'loginEvent':
          void this.onLogin()
          break
        case 'agentReady':
          void this.onAgentReady()
          break
        case 'logoutEvent':
          void this.onLogout(args[0] as number)
          break

        default:
          log.warn('PuppetXp', 'onHook(%s,...) lack of handing', method, JSON.stringify(args))
          break
      }
    })

    this.sidecar.on('error', e => this.emit('error', { data: JSON.stringify(e as any) }))

  }

  private async onAgentReady () {
    log.verbose('PuppetXp', 'onAgentReady()')
    // const isLoggedIn = await this.sidecar.isLoggedIn()
    // if (!isLoggedIn) {
    //   await this.sidecar.callLoginQrcode(false)
    // }
  }

  private async onLogin () {

    const selfInfoRaw = JSON.parse(await this.sidecar.getMyselfInfo())
    // console.debug('selfInfoRaw:\n\n\n', selfInfoRaw)
    const selfInfo: PUPPET.payloads.Contact = {
      alias: '',
      avatar: selfInfoRaw.head_img_url,
      friend: false,
      gender: PUPPET.types.ContactGender.Unknown,
      id: selfInfoRaw.id,
      name: selfInfoRaw.name,
      phone: [],
      type: PUPPET.types.Contact.Individual,
    }

    this.selfInfo = selfInfo
    await this.loadContactList()
    await this.loadRoomList()

    await super.login(this.selfInfo.id)

    // console.debug(this.roomStore)
    // console.debug(this.contactStore)
  }

  private async onLogout (reasonNum: number) {
    await super.logout(reasonNum ? 'Kicked by server' : 'logout')
  }

  private onScan (args: any) {
    const statusMap = [
      PUPPET.types.ScanStatus.Waiting,
      PUPPET.types.ScanStatus.Scanned,
      PUPPET.types.ScanStatus.Confirmed,
      PUPPET.types.ScanStatus.Timeout,
      PUPPET.types.ScanStatus.Cancel,
    ]

    const status: number = args[0]
    const qrcodeUrl: string = args[1]
    const wxid: string = args[2]
    const avatarUrl: string = args[3]
    const nickname: string = args[4]
    const phoneType: string = args[5]
    const phoneClientVer: number = args[6]
    const pairWaitTip: string = args[7]

    log.info(
      'PuppetXp',
      'onScan() data: %s',
      JSON.stringify(
        {
          avatarUrl,
          nickname,
          pairWaitTip,
          phoneClientVer: phoneClientVer.toString(16),
          phoneType,
          qrcodeUrl,
          status,
          wxid,
        }, null, 2))

    if (pairWaitTip) {
      log.warn('PuppetXp', 'onScan() pairWaitTip: "%s"', pairWaitTip)
    }

    this.scanEventData = {
      qrcode: qrcodeUrl,
      status: statusMap[args[0]] ?? PUPPET.types.ScanStatus.Unknown,
    }
    this.emit('scan', this.scanEventData)
  }

  private onHookRecvMsg (args: any) {
    //  console.info('onHookRecvMsg', args)
    let type = PUPPET.types.Message.Unknown
    let roomId = ''
    let toId = ''
    let talkerId = ''
    let text = String(args[2])
    const code = args[0]

    switch (code) {
      case 1:
        try {
          xml2js.parseString(String(args[4]), { explicitArray: false, ignoreAttrs: true }, function (err: any, json: any) {
            log.verbose('PuppetXp', 'xml2json err:%s', err)
            //  log.verbose('PuppetXp', 'json content:%s', JSON.stringify(json))
            if (json.msgsource && json.msgsource.atuserlist === 'atuserlist') {
              type = PUPPET.types.Message.GroupNote
            } else {
              type = PUPPET.types.Message.Text
            }
          })
        } catch (err) {
          console.error(err)
        }
        break
      case 3:
        type = PUPPET.types.Message.Image
        break
      case 4:
        type = PUPPET.types.Message.Video
        break
      case '5':
        type = PUPPET.types.Message.Url
        break
      case 34:
        type = PUPPET.types.Message.Audio
        break
      case 37:
        break
      case 40:
        break
      case 42:
        type = PUPPET.types.Message.Contact
        break
      case 43:
        type = PUPPET.types.Message.Video
        break
      case 47:
        type = PUPPET.types.Message.Emoticon
        try {
          readXml.read(text, function (errors: any, xmlResponse: any) {
            if (errors !== null) {
              log.error(errors)
              return
            }
            const xml2json = xmlResponse.msg.emoji.attributes()
            //  log.info('xml2json', xml2json)
            text = JSON.stringify(xml2json)
          })

        } catch (err) {
          console.error(err)
        }
        break
      case 48:
        type = PUPPET.types.Message.Location
        break
      case 49:
        try {
          xml2js.parseString(text, { explicitArray: false, ignoreAttrs: true }, function (err: any, json: { msg: { appmsg: { type: String } } }) {
            // console.info(err)
            // console.info(JSON.stringify(json))
            log.verbose('PuppetXp', 'xml2json err:%s', err)
            log.verbose('PuppetXp', 'json content:%s', JSON.stringify(json))
            switch (json.msg.appmsg.type) {
              case '5':
                type = PUPPET.types.Message.Url
                break
              case '4':
                type = PUPPET.types.Message.Url
                break
              case '1':
                type = PUPPET.types.Message.Url
                break
              case '6':
                type = PUPPET.types.Message.Attachment
                break
              case '19':
                type = PUPPET.types.Message.ChatHistory
                break
              case '33':
                type = PUPPET.types.Message.MiniProgram
                break
              case '2000':
                type = PUPPET.types.Message.Transfer
                break
              case '2001':
                type = PUPPET.types.Message.RedEnvelope
                break
              case '10002':
                type = PUPPET.types.Message.Recalled
                break
              default:
            }
          })
        } catch (err) {
          console.error(err)
        }
        break
      case 50:
        break
      case 51:
        break
      case 52:
        break
      case 53:
        type = PUPPET.types.Message.GroupNote
        break
      case 62:
        break
      case 9999:
        break
      case 10000:
        // 群事件
        //  type = PUPPET.types.Message.Unknown
        break
      case 10002:
        type = PUPPET.types.Message.Recalled
        break
      case 1000000000:
        type = PUPPET.types.Message.Post
        break
      default:
    }

    if (String(args[1]).split('@').length !== 2) {
      talkerId = String(args[1])
      toId = this.currentUserId
    } else {
      talkerId = String(args[3])
      roomId = String(args[1])
    }

    // revert talkerId and toId according to isMyMsg
    if (args[5] === 1) {
      toId = talkerId
      talkerId = this.selfInfo.id
    }

    const payload: PUPPET.payloads.Message = {
      id: cuid(),
      listenerId: toId,
      roomId,
      talkerId,
      text,
      timestamp: Date.now(),
      toId,
      type,
    }
    //  console.info('payloadType----------', PUPPET.types.Message[type])
    //  console.info('payload----------', payload)

    if (talkerId && (!this.contactStore[talkerId] || !this.contactStore[talkerId]?.name)) {
      void this.loadContactList()
    }

    if (roomId && (!this.roomStore[roomId] || !this.roomStore[roomId]?.topic)) {
      void this.loadRoomList()
    }

    try {
      if (code === 10000) {
        // 你邀请"瓦力"加入了群聊
        // "超超超哥"邀请"瓦力"加入了群聊
        // "luyuchao"邀请"瓦力"加入了群聊
        // "超超超哥"邀请你加入了群聊，群聊参与人还有：瓦力

        // 你将"瓦力"移出了群聊
        // 你被"luyuchao"移出群聊

        // 你修改群名为“瓦力专属”
        // 你修改群名为“大师是群主”
        // "luyuchao"修改群名为“北辰香麓欣麓园抗疫”

        const room = this.roomStore[roomId]
        //  console.info('room=========================', room)
        let topic = ''
        const oldTopic = room ? room.topic : ''

        if (text.indexOf('修改群名为') !== -1) {
          const arrInfo = text.split('修改群名为')
          let changer = this.selfInfo
          if (arrInfo[0] && room) {
            topic = arrInfo[1]?.split(/“|”|"/)[1] || ''
            //  topic = arrInfo[1] || ''
            this.roomStore[roomId] = room
            room.topic = topic
            if (arrInfo[0] === '你') {
              //  changer = this.selfInfo
            } else {
              const name = arrInfo[0].split(/“|”|"/)[1] || ''
              for (const i in this.contactStore) {
                if (this.contactStore[i] && this.contactStore[i]?.name === name) {
                  changer = this.contactStore[i]
                }
              }

            }
          }
          //  console.info(room)
          //  console.info(changer)
          //  console.info(oldTopic)
          //  console.info(topic)
          const changerId = changer.id
          this.emit('room-topic', { changerId, newTopic: topic, oldTopic, roomId })

        }
        if (text.indexOf('加入了群聊') !== -1) {
          const inviteeList = []
          let inviter = this.selfInfo
          const arrInfo = text.split(/邀请|加入了群聊/)

          if (arrInfo[0]) {
            topic = arrInfo[0]?.split(/“|”|"/)[1] || ''
            if (arrInfo[0] === '你') {
              //  changer = this.selfInfo
            } else {
              const name = arrInfo[0].split(/“|”|"/)[1] || ''
              for (const i in this.contactStore) {
                if (this.contactStore[i] && this.contactStore[i]?.name === name) {
                  inviter = this.contactStore[i]
                }
              }
            }
          }

          if (arrInfo[1]) {
            topic = arrInfo[1]?.split(/“|”|"/)[1] || ''
            if (arrInfo[1] === '你') {
              inviteeList.push(this.selfInfo.id)
            } else {
              const name = arrInfo[1].split(/“|”|"/)[1] || ''
              for (const i in this.contactStore) {
                if (this.contactStore[i] && this.contactStore[i]?.name === name) {
                  if (this.contactStore[i]?.id && room?.memberIdList.includes(this.contactStore[i]?.id || '')) {
                    inviteeList.push(this.contactStore[i]?.id)
                  }
                }
              }

            }
          }
          //  console.info(inviteeList)
          //  console.info(inviter)
          //  console.info(room)

          this.emit('room-join', { inviteeIdList: inviteeList, inviterId: inviter.id, roomId })
        }
      } else {
        this.messageStore[payload.id] = payload
        this.emit('message', { messageId: payload.id })
      }
    } catch (e) {
      console.error(e)
    }

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

  notSupported (name: string): void {
    log.info(`${name} is not supported by PuppetXp yet.`)
  }

  private async loadContactList () {
    const contactList = JSON.parse(await this.sidecar.getContact())

    for (const contactKey in contactList) {
      const contactInfo = contactList[contactKey]

      let contactType = PUPPET.types.Contact.Individual
      if (contactInfo.id.indexOf('gh_') !== -1) {
        contactType = PUPPET.types.Contact.Official
      }
      if (contactInfo.id.indexOf('@openim') !== -1) {
        contactType = PUPPET.types.Contact.Corporation
      }
      const contact = {
        alias: contactInfo.alias,
        avatar: contactInfo.avatarUrl,
        friend: true,
        gender: contactInfo.gender,
        id: contactInfo.id,
        name: contactInfo.name || 'Unknow',
        phone: [],
        type: contactType,
      }
      this.contactStore[contactInfo.id] = contact

    }
  }

  private async loadRoomList () {
    let roomList: any[] = []
    try {
      const ChatroomMemberInfo = await this.sidecar.getChatroomMemberInfo()
      roomList = JSON.parse(ChatroomMemberInfo)
    } catch (err) {
      console.error('loadRoomList fail:', err)
    }

    for (const roomKey in roomList) {
      const roomInfo = roomList[roomKey]

      // log.info(JSON.stringify(Object.keys(roomInfo)))

      const roomId = roomInfo.roomid
      if (roomId.indexOf('@chatroom') !== -1) {
        const roomMember = roomInfo.roomMember || []
        const topic = this.contactStore[roomId]?.name || ''
        const room = {
          adminIdList: [],
          avatar: '',
          external: false,
          id: roomId,
          memberIdList: roomMember,
          ownerId: '',
          topic,
        }
        this.roomStore[roomId] = room
        delete this.contactStore[roomId]
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
                name: memberNickName || 'Unknown',
                phone: [],
                type: PUPPET.types.Contact.Individual,
              }
              this.contactStore[memberId] = contact
            } catch (err) {
              console.error(err)
            }
          }
        }
      }

    }

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
    const WECHATY_ICON_PNG = 'data:image/png;base64,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'
    return FileBox.fromDataURL(WECHATY_ICON_PNG)
  }

  override async contactRawPayloadParser (payload: PUPPET.payloads.Contact) {
    // log.verbose('PuppetXp', 'contactRawPayloadParser(%s)', JSON.stringify(payload))
    return payload
  }

  override async contactRawPayload (id: string): Promise<PUPPET.payloads.Contact> {
    //  log.verbose('PuppetXp----------------------', 'contactRawPayload(%s,%s)', id, this.contactStore[id]?.name)
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
    const message = this.messageStore[messageId]
    return await XmlDecrypt(message?.text || '', message?.type || PUPPET.types.Message.Unknown)
  }

  override async messageImage (
    messageId: string,
    imageType: PUPPET.types.Image,
  ): Promise<FileBoxInterface> {

    log.info('PuppetXp', 'messageImage(%s, %s[%s])',
      messageId,
      imageType,
      PUPPET.types.Image[imageType],
    )

    const message = this.messageStore[messageId]
    let base64 = ''
    let fileName = ''
    let imagePath = ''
    let file:FileBoxInterface

    try {
      if (message?.text) {
        const picData = JSON.parse(message.text)
        const filePath = picData[imageType]
        const dataPath = rootPath + filePath    // 要解密的文件路径
        log.info(dataPath, true)

        //  如果请求的是大图等待2s
        if (imageType === PUPPET.types.Image.HD) {
          await wait(1500)
          if (!fs.existsSync(dataPath)) {
            await wait(1500)
          }
        }

        await fsPromise.access(dataPath)

        const imageInfo = ImageDecrypt(dataPath, messageId)
        // const imageInfo = ImageDecrypt('C:\\Users\\choogoo\\Documents\\WeChat Files\\wxid_pnza7m7kf9tq12\\FileStorage\\Image\\Thumb\\2022-05\\e83b2aea275460cd50352559e040a2f8_t.dat','cl34vez850000gkmw2macd3dw')

        console.info(dataPath, imageInfo.fileName, imageInfo.extension)
        base64 = imageInfo.base64
        fileName = `message-${messageId}-url-${imageType}.${imageInfo.extension}`
        file = FileBox.fromBase64(
          base64,
          fileName,
        )
        const paths = dataPath.split('\\')
        paths[paths.length - 1] = fileName
        imagePath = paths.join('\\')
        // console.debug(imagePath)
        await file.toFile(imagePath)
      }
    } catch (err) {
      console.error(err)
    }
    return FileBox.fromBase64(
      base64,
      fileName,
    )
  }

  override async messageRecall (
    messageId: string,
  ): Promise<boolean> {
    log.verbose('PuppetXp', 'messageRecall(%s)', messageId)
    this.notSupported('messageRecall')
    return false
  }

  override async messageFile (id: string): Promise<FileBoxInterface> {
    const message = this.messageStore[id]
    //  log.verbose('messageFile', String(message))
    //  log.info('messageFile:', message)
    let dataPath = ''
    let fileName = ''

    if (message?.type === PUPPET.types.Message.Image) {
      return this.messageImage(
        id,
        //  PUPPET.types.Image.Thumbnail,
        PUPPET.types.Image.HD,
      )
    }

    if (message?.type === PUPPET.types.Message.Attachment) {
      try {
        const parser = new xml2js.Parser(/* options */)
        const messageJson = await parser.parseStringPromise(message.text || '')
        // log.info(JSON.stringify(messageJson))

        const curDate = new Date()
        const year = curDate.getFullYear()
        let month: any = curDate.getMonth() + 1
        if (month < 10) {
          month = '0' + month
        }
        fileName = '\\' + messageJson.msg.appmsg[0].title[0]
        const filePath = `${this.selfInfo.id}\\FileStorage\\File\\${year}-${month}`
        dataPath = rootPath + filePath + fileName  // 要解密的文件路径
        // console.info(dataPath)
        return FileBox.fromFile(
          dataPath,
          fileName,
        )
      } catch (err) {
        console.error(err)
      }
    }

    if (message?.type === PUPPET.types.Message.Emoticon && message.text) {
      const text = JSON.parse(message.text)
      try {
        try {
          fileName = text.md5 + '.png'
          return FileBox.fromUrl(text.cdnurl, { name: fileName })
        } catch (err) {
          console.error(err)
        }
      } catch (err) {
        console.error(err)
      }
    }

    if ([ PUPPET.types.Message.Video, PUPPET.types.Message.Audio ].includes(message?.type || PUPPET.types.Message.Unknown)) {
      this.notSupported('Video/`Audio')
    }
    return FileBox.fromFile(
      dataPath,
      fileName,
    )

  }

  override async messageUrl (messageId: string): Promise<PUPPET.payloads.UrlLink> {
    log.verbose('PuppetXp', 'messageUrl(%s)', messageId)
    const message = this.messageStore[messageId]
    return await XmlDecrypt(message?.text || '', message?.type || PUPPET.types.Message.Unknown)
  }

  override async messageMiniProgram (messageId: string): Promise<PUPPET.payloads.MiniProgram> {
    log.verbose('PuppetXp', 'messageMiniProgram(%s)', messageId)
    const message = this.messageStore[messageId]
    return await XmlDecrypt(message?.text || '', message?.type || PUPPET.types.Message.Unknown)
  }

  override async messageLocation (messageId: string): Promise<PUPPET.payloads.Location> {
    log.verbose('PuppetXp', 'messageLocation(%s)', messageId)
    const message = this.messageStore[messageId]
    return await XmlDecrypt(message?.text || '', message?.type || PUPPET.types.Message.Unknown)
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
    log.verbose('filePath===============', filePath)
    await file.toFile(filePath, true)
    if (file.type === FileBoxType.Url) {
      try {
        await this.sidecar.sendPicMsg(conversationId, filePath)
        // fs.unlinkSync(filePath)
      } catch {
        fs.unlinkSync(filePath)
      }

    } else {
      // filePath = 'C:\\Users\\wechaty\\Documents\\GitHub\\wechat-openai-qa-bot\\data1652169999200.xls'
      try {
        await this.sidecar.sendPicMsg(conversationId, filePath)
        // fs.unlinkSync(filePath)
      } catch (err) {
        PUPPET.throwUnsupportedError(conversationId, file)
        fs.unlinkSync(filePath)
      }
    }
  }

  override async messageSendContact (
    conversationId: string,
    contactId: string,
  ): Promise<void> {
    log.verbose('PuppetXp', 'messageSendUrl(%s, %s)', conversationId, contactId)

    this.notSupported('SendContact')

    // const contact = this.mocker.MockContact.load(contactId)
    // return this.messageSend(conversationId, contact)
  }

  override async messageSendUrl (
    conversationId: string,
    urlLinkPayload: PUPPET.payloads.UrlLink,
  ): Promise<void> {
    log.verbose('PuppetXp', 'messageSendUrl(%s, %s)', conversationId, JSON.stringify(urlLinkPayload))
    this.notSupported('SendUrl')
    // const url = new UrlLink(urlLinkPayload)
    // return this.messageSend(conversationId, url)
  }

  override async messageSendMiniProgram (
    conversationId: string,
    miniProgramPayload: PUPPET.payloads.MiniProgram,
  ): Promise<void> {
    log.verbose('PuppetXp', 'messageSendMiniProgram(%s, %s)', conversationId, JSON.stringify(miniProgramPayload))

    const xmlstr = `<?xml version="1.0" encoding="UTF-8" ?>
     <msg>
       <fromusername>${this.selfInfo.id}</fromusername>
       <scene>0</scene>
       <appmsg appid="${miniProgramPayload.appid}">
         <title>${miniProgramPayload.title}</title>
         <action>view</action>
         <type>33</type>
         <showtype>0</showtype>
         <url>${miniProgramPayload.pagePath}</url>
         <thumburl>${miniProgramPayload.thumbUrl}</thumburl>
         <sourcedisplayname>${miniProgramPayload.description}</sourcedisplayname>
         <appattach>
           <totallen>0</totallen>
         </appattach>
         <weappinfo>
           <username>${miniProgramPayload.username}</username>
           <appid>${miniProgramPayload.appid}</appid>
           <type>1</type>
           <weappiconurl>${miniProgramPayload.iconUrl}</weappiconurl>
           <appservicetype>0</appservicetype>
           <shareId>2_wx65cc950f42e8fff1_875237370_${new Date().getTime()}_1</shareId>
         </weappinfo>
       </appmsg>
       <appinfo>
         <version>1</version>
         <appname>Window wechat</appname>
       </appinfo>
     </msg>
   `
    // const xmlstr=`<msg><fromusername>${this.selfInfo.id}</fromusername><scene>0</scene><commenturl></commenturl><appmsg appid="wx65cc950f42e8fff1" sdkver=""><title>腾讯出行服务｜加油代驾公交</title><des></des><action>view</action><type>33</type><showtype>0</showtype><content></content><url>https://mp.weixin.qq.com/mp/waerrpage?appid=wx65cc950f42e8fff1&amp;amp;type=upgrade&amp;amp;upgradetype=3#wechat_redirect</url><dataurl></dataurl><lowurl></lowurl><lowdataurl></lowdataurl><recorditem><![CDATA[]]></recorditem><thumburl>http://mmbiz.qpic.cn/mmbiz_png/NM1fK7leWGPaFnMAe95jbg4sZAI3fkEZWHq69CIk6zA00SGARbmsGTbgLnZUXFoRwjROelKicbSp9K34MaZBuuA/640?wx_fmt=png&amp;wxfrom=200</thumburl><messageaction></messageaction><extinfo></extinfo><sourceusername></sourceusername><sourcedisplayname>腾讯出行服务｜加油代驾公交</sourcedisplayname><commenturl></commenturl><appattach><totallen>0</totallen><attachid></attachid><emoticonmd5></emoticonmd5><fileext></fileext><aeskey></aeskey></appattach><weappinfo><pagepath></pagepath><username>gh_ad64296dc8bd@app</username><appid>wx65cc950f42e8fff1</appid><type>1</type><weappiconurl>http://mmbiz.qpic.cn/mmbiz_png/NM1fK7leWGPaFnMAe95jbg4sZAI3fkEZWHq69CIk6zA00SGARbmsGTbgLnZUXFoRwjROelKicbSp9K34MaZBuuA/640?wx_fmt=png&amp;wxfrom=200</weappiconurl><appservicetype>0</appservicetype><shareId>2_wx65cc950f42e8fff1_875237370_1644979747_1</shareId></weappinfo><websearch /></appmsg><appinfo><version>1</version><appname>Window wechat</appname></appinfo></msg>`
    log.info('SendMiniProgram is supported by xp, but only support send the MiniProgram-contact card.')
    await this.sidecar.SendMiniProgram('', conversationId, xmlstr)
  }

  override async messageSendLocation (
    conversationId: string,
    locationPayload: PUPPET.payloads.Location,
  ): Promise<void | string> {
    log.verbose('PuppetXp', 'messageSendLocation(%s, %s)', conversationId, JSON.stringify(locationPayload))
    this.notSupported('SendLocation')
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
      log.info('only Text message forward is supported by xp.')
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
    //  log.verbose('PuppetXp----------------------', 'roomRawPayload(%s%s)', id, this.roomStore[id]?.topic)
    if (this.roomStore[id]) {
      return this.roomStore[id] || {} as any
    } else {
      const room: PUPPET.payloads.Room = {
        adminIdList: [],
        id,
        memberIdList: [],
        topic: 'Unknown Room Topic',
      }
      return room
    }
  }

  override async roomList (): Promise<string[]> {
    log.verbose('PuppetXp', 'call roomList()')
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
    try {
      const roomRawPayload = await this.roomRawPayload(roomId)
      const memberIdList = roomRawPayload.memberIdList
      return memberIdList
    } catch (e) {
      log.error('roomMemberList()', e)
      return []
    }

  }

  override async roomMemberRawPayload (roomId: string, contactId: string): Promise<PUPPET.payloads.RoomMember> {
    log.verbose('PuppetXp', 'roomMemberRawPayload(%s, %s)', roomId, contactId)
    try {
      const contact = this.contactStore[contactId]
      const MemberRawPayload = {
        avatar: '',
        id: contactId,
        inviterId: contactId,   // "wxid_7708837087612",
        name: contact?.name || 'Unknow',
        roomAlias: contact?.name || '',
      }
      // console.info(MemberRawPayload)
      return MemberRawPayload
    } catch (e) {
      log.error('roomMemberRawPayload()', e)
      const member: PUPPET.payloads.RoomMember = {
        avatar: '',
        id: contactId,
        name: '',
      }
      return member
    }

  }

  override async roomMemberRawPayloadParser (rawPayload: PUPPET.payloads.RoomMember): Promise<PUPPET.payloads.RoomMember> {
    //  log.verbose('PuppetXp---------------------', 'roomMemberRawPayloadParser(%s)', rawPayload)
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
