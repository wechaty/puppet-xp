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
}                         from 'sidecar'

import { WeChatSidecar }  from '../src/wechat-sidecar.js'

async function main () {
  console.info('WeChat Sidecar starting...')

  const sidecar = new WeChatSidecar()
  await attach(sidecar)

  console.info('WeChat Sidecar started.')

  sidecar.on('hook', async ({ method, args }) => {
    if (method !== 'recvMsg') {
      return
    }

    console.info('recvMsg:', args)

    if (args instanceof Error) {
      console.error(args)
      return
    }

    const toId  = String(args[1])
    const text      = String(args[2])
    const talkerId = String(args[3])

    console.info('recvMsg: talkerId =', talkerId)
    console.info('recvMsg: text =', text)

    if (talkerId && text === 'ding') {
      console.info('recvMsg: ding found, reply dong')
      await sidecar.sendMsg(toId, 'dong')
      // await sidecar.sendAtMsg(toId, 'dong',talkerId)
    }

  })

  const clean = async () => {
    console.info('Sidecar detaching...')
    await detach(sidecar)
  }

  process.on('SIGINT',  clean)
  process.on('SIGTERM', clean)
}

main()
  .catch(console.error)
