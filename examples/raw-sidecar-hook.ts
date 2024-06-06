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

  sidecar.on('hook', ({ method, args }) => {
    // console.log(`onhook事件消息：${new Date().toLocaleString()}\n`, method, JSON.stringify(args))
    console.log(`onhook事件消息：${new Date().toLocaleString()}`, method)
    switch (method) {
      case 'recvMsg':{
        void onRecvMsg(args)
        break
      }
      case 'checkQRLogin':
        break
      case 'loginEvent':{
        break
      }
      case 'agentReady':
        console.log('agentReady...')
        break
      default:
        console.info('onHook没有匹配到处理方法:', method, JSON.stringify(args))
        break
    }
  })

  const onRecvMsg = async (args: any) => {
    console.info('onRecvMsg事件触发:', JSON.stringify(args))

    if (args instanceof Error) {
      console.error('onRecvMsg: 参数错误 Error', args)
      return
    }

    const toId = String(args[3])
    const text = String(args[2])
    const talkerId = String(args[1])

    // const nickname = await sidecar.GetContactOrChatRoomNickname(talkerId)
    // console.log('发言人昵称：', nickname)
    console.info('talkerId:', talkerId)
    console.info('toId:', toId)
    console.info('text:', text)
    if (talkerId && text === 'ding') {
      console.info('叮咚测试: ding found, reply dong')
      await sidecar.sendMsg(talkerId || toId, 'dong')
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
