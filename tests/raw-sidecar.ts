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


import * as path from 'path'
import * as fs from 'fs' 

 
import { WeChatSidecar } from '../src/wechat-sidecar.js'

async function main() {
  console.info('WeChat Sidecar starting...')

  const sidecar = new WeChatSidecar()
  await attach(sidecar)

  console.info('WeChat Sidecar started.')

  /*const isLoggedIn = await sidecar.isLoggedIn()
  console.info(`has Logged In: ${isLoggedIn}`)
  
  const myselfInfo = await sidecar.getMyselfInfo()
  console.info(`myInfo: ${myselfInfo}`)*/

  //await sidecar.getChatroomMemberNickInfo('zhanghua_cd','19607480188@chatroom')
  //const contactList = await sidecar.getContact()
  /*for(let item of contactList){
    console.log('----',item)
  }*/
  //await sidecar.sendPicMsg('23023281066@chatroom','C:\\temp\\1.jpg')
  //await sidecar.getTestInfo(0x153e0000)

  //const me = await sidecar.getMyselfInfo()
  //console.log('=======',me)
  
  //const fullFilePath = 'C:\\temp\\DumpStack.log'
  
  const fullFilePath = 'C:\\temp\\a.7z'

  const baseName     = path.basename(fullFilePath)
  const statsObj = fs.statSync(fullFilePath)
  const size = statsObj.size
  // await sidecar.sendAttatchMsg('23023281066@chatroom','zhanghua_cd',fullFilePath,baseName,size)
  
  //await sidecar.trunOnLog()
  //await sidecar.getWxTest('23023281066@chatroom',fullFilePath)
  //await sidecar.initGlobal('wxid_lbca2qnlir9h22',fullFilePath)
  //await sidecar.getOldTest('wxid_lbca2qnlir9h22')

 //await sidecar.getChatroomMemberNickInfo('zhanghua_cd','23023281066@chatroom')
  sidecar.on('hook', ({ method, args }) => {

    switch (method) {
      /*case 'writeLogMsg':
        onWriteLog()
        break;
      case 'recvMsg':
        void onRecvMsg(args)
        break
      case 'checkQRLogin':
        onScan(args)
        break
      case 'loginEvent':
        onLogin()
        break
      case 'logoutEvent':
        onLogout(args[0] as number)
        break*/

      default:
        console.info('onHook', method, JSON.stringify(args))
        break
    }

  })

  const onWriteLog = () =>{

  }

  const onLogin = () => {
    console.info('You are logged in.')
  }

  const onLogout = (bySrv: number) => {
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
    console.info('recvMsg:', args)

    if (args instanceof Error) {
      console.error(args)
      return
    }

    const toId = String(args[1])
    const text = String(args[2])
    const talkerId = String(args[3])

    console.info('recvMsg: talkerId =', talkerId)
    console.info('recvMsg: text =', text)

    if (talkerId && text === 'ding') {
      console.info('recvMsg: ding found, reply dong')
      await sidecar.sendMsg(toId, 'dong')
      // await sidecar.sendAtMsg(toId, 'dong',talkerId)
    }
  }

  const clean = async () => {
    console.info('Sidecar detaching...')
    await detach(sidecar)
  }

  process.on('SIGINT', clean)
  process.on('SIGTERM', clean)
}

main()
  .catch(console.error)
