/* eslint-disable no-console */

/**
 *   Wechaty - https://github.com/wechaty/wechaty
 *
 *   @copyright 2021 Wechaty Contributors <https://github.com/wechaty>
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
import {
  attach,
  detach,
} from 'sidecar'

import {
  WeChatSidecar,
  // XpSidecar
} from '../src/wechat-sidecar.js'

async function main () {
  console.info('WeChat Sidecar starting...')
  // new XpSidecar({ wechatVersion: '3.9.2.23' })

  const sidecar = new WeChatSidecar()
  await attach(sidecar)

  console.info('WeChat Sidecar started.')

  const ver = await sidecar.getWeChatVersion()
  const verStr = await sidecar.getWechatVersionString()
  const isSupported = await sidecar.checkSupported()
  console.info(`\nWeChat Version: ${ver} -> ${verStr} , Supported: ${isSupported}\n`)

  const isLoggedIn = await sidecar.isLoggedIn()
  const myselfInfo = await sidecar.getMyselfInfo()
  console.info(`当前登陆账号信息: ${myselfInfo}`)

  const loginUrl = await sidecar.getLoginUrl()
  console.info(`登陆二维码地址loginUrl: ${loginUrl}`)

  // const contact = await sidecar.getChatroomMemberInfo()
  // //console.log(contact)
  // for (const item of JSON.parse(contact)) {
  //   for(const wxid of item.roomMember){
  //     //console.log(wxid)
  //     if(wxid === 'tyutluyc'){
  //       const nick = await sidecar.getChatroomMemberNickInfo(wxid,item.roomid)
  //       console.log('wxid:====',wxid,"==nick:===",nick)
  //     }
  //   }

  // }

  sidecar.on('hook', ({ method, args }) => {
    // console.log(`onhook事件消息：${new Date().toLocaleString()}\n`, method, JSON.stringify(args))
    console.log(`onhook事件消息：${new Date().toLocaleString()}`, method)
    switch (method) {
      case 'recvMsg':{
        void onRecvMsg(args)
        break
      }
      case 'checkQRLogin':
        void onScan(args)
        break
      case 'loginEvent':{
        if (!isLoggedIn) {
          let loginRes = false
          sidecar.isLoggedIn().then(res => {
            loginRes = res
            if (loginRes) {
              void onLogin()
            }
            return res
          }).catch(e => {
            console.error('登录状态检查失败:', e)
          })
        }
        break
      }
      case 'agentReady':
        console.log('agentReady...')
        break
      case 'logoutEvent':
        onLogout(args[0] as number)
        break
      default:
        console.info('onHook没有匹配到处理方法:', method, JSON.stringify(args))
        break
    }
  })

  const onLogin = async () => {
    console.info('登陆事件触发')
    console.info(`登陆状态: ${isLoggedIn}`)
    // await sidecar.sendMsg('filehelper', 'Sidecar is ready!')
    const contacts = await sidecar.getContact()
    // console.log(`contacts: ${contacts}`)
    const contactsJSON = JSON.parse(contacts)
    console.log('contacts列表:', contactsJSON.length)

    for (const contact of contactsJSON) {
      if (!contact.name) {
        console.info('好友:', JSON.stringify(contact))
      }
    }

    const roomList = await sidecar.getChatroomMemberInfo()
    // console.log(`roomList: ${roomList}`)
    const roomListJSON = JSON.parse(roomList)
    console.log('roomList列表:', roomListJSON.length)
    // for (const room of roomListJSON) {
    //   console.info('room:', room)
    // }
    // await sidecar.sendAtMsg('21341182572@chatroom', new Date().toLocaleString(), 'atorber', '超哥');

  }

  const onLogout = (bySrv: number) => {
    console.info('登出事件触发:', bySrv)
    console.info(`You are logged out${bySrv ? ' because you were kicked by server.' : ''}.`)
  }

  const onScan = (args: any) => {
    const status: number = args[0]
    const qrcodeUrl: string = args[1]
    const wxid: string = args[2]
    const avatarUrl: string = args[3]
    const nickname: string = args[4]
    const phoneType: string = args[5]
    const phoneClientVer: number = args[6]
    const pairWaitTip: string = args[7]

    const json = {
      avatarUrl,
      nickname,
      pairWaitTip,
      phoneClientVer,
      phoneType,
      qrcodeUrl,
      status,
      wxid,
    }

    console.info('onScan', JSON.stringify(json, null, 2))
  }

  const onRecvMsg = async (args: any) => {
    console.info('onRecvMsg事件触发:', JSON.stringify(args))

    if (args instanceof Error) {
      console.error('onRecvMsg: 参数错误 Error', args)
      return
    }

    const toId = String(args[1])
    const text = String(args[2])
    const talkerId = String(args[3])

    // const nickname = await sidecar.GetContactOrChatRoomNickname(talkerId)
    // console.log('发言人昵称：', nickname)

    const talker = await sidecar.getChatroomMemberNickInfo(talkerId, toId)
    console.log('发言人：', talker)
    if (talkerId && text === 'ding') {
      console.info('叮咚测试: ding found, reply dong')
      await sidecar.sendMsg(toId, 'dong')
      // await sidecar.sendAtMsg(toId, 'dong',talkerId)
    }
  }

  const clean =  () => {
    console.info('Sidecar detaching...')
    void detach(sidecar)
  }

  process.on('SIGINT', clean)
  process.on('SIGTERM', clean)
}

main()
  .catch(e => {
    console.error('主函数运行失败:', e)
  })
