/**
 *   Sidecar - https://github.com/huan/sidecar
 *
 *   @copyright 2021 Huan LI (李卓桓) <https://github.com/huan>
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
import fs from 'fs'
import path from 'path'

import {
  Sidecar,
  SidecarBody,
  Call,
  Hook,
  ParamType,
  Ret,
  agentTarget,
  // attach,
  // detach,
}                 from 'sidecar'

import { codeRoot } from './cjs.js'
// import { WeChatVersion } from './agents/winapi-sidecar.js'

const scriptPath =  path.join(
  codeRoot,
  'src',
  'init-agent-script.js',
)

const initAgentScript = fs.readFileSync(scriptPath, 'utf-8')

// console.info('XpSidecar initAgentScript:', XpSidecar.initAgentScript)

@Sidecar('WeChat.exe', initAgentScript)
class WeChatSidecar extends SidecarBody {

  @Call(agentTarget('getMyselfInfoFunction'))
  getMyselfInfo ():Promise<string> { return Ret() }

  @Call(agentTarget('sendMsgNativeFunction'))
  sendMsg (
    contactId: string,
    text: string,
  ): Promise<number> { return Ret(contactId, text) }

  @Hook(agentTarget('recvMsgNativeCallback'))
  recvMsg (
    @ParamType('int32', 'U32') msgType: number,
    @ParamType('pointer', 'Utf16String') contactId: string,
    @ParamType('pointer', 'Utf16String') text: string,
    @ParamType('pointer', 'Utf16String') groupMsgSenderId: string,
    @ParamType('pointer', 'Utf16String') xmlContent: string,
    @ParamType('int32', 'U32') isMyMsg: number, // add isMyMsg type
  ) { return Ret(msgType, contactId, text, groupMsgSenderId, xmlContent, isMyMsg) }

}

export { WeChatSidecar }
