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
}                         from 'frida-sidecar'

import { WeChatSidecar }  from '../src/wechat-sidecar'

async function main () {
  console.info('WeChat Sidecar starting...')

  const sidecar = new WeChatSidecar()
  await attach(sidecar)

  console.info('WeChat Sidecar started.')

  sidecar.on('recvMsg', async args => {
    if (args instanceof Error) {
      console.error(args)
      return
    }

    // const toId      = String(args[1])
    const text      = String(args[2])
    const talkerId  = String(args[3])

    /**
     * The world's famous ding-dong bot.
     */
    if (talkerId && text === 'ding') {
      await sidecar.sendMsg(talkerId, 'dong')
    }

  })

  const clean = () => detach(sidecar)

  process.on('SIGINT',  clean)
  process.on('SIGTERM', clean)
}

main()
  .catch(console.error)
