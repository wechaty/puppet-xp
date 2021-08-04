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
import {
  Sidecar,
  SidecarBody,
  Call,
  Hook,
  ParamType,
  RetType,
  Ret,

  agentTarget,
}                 from 'frida-sidecar'

import fs from 'fs'

const initAgentScript = fs.readFileSync(require.resolve(
  './init-agent-script.js'
)).toString()

@Sidecar('WeChat.exe', initAgentScript)
class WeChatSidecar extends SidecarBody {

  @Call(agentTarget('getChatroomMemberInfoFunction'))
  @RetType('pointer')
  getChatroomMemberInfo ():Promise<string> { return Ret() }

  @Call(agentTarget('getWechatVersionFunction'))
  @RetType('bool')
  getWeChatVersion ():Promise<Boolean> { return Ret() }
  
  @Call(agentTarget('getContactNativeFunction'))
  @RetType('pointer')
  getContact ():Promise<string> { return Ret() }

  @Call(agentTarget('sendMsgNativeFunction'))
  @RetType('void')
  sendMsg (
    @ParamType('pointer', 'Utf16String') contactId: string,
    @ParamType('pointer', 'Utf16String') text: string,
  ): Promise<string> { return Ret(contactId, text) }

  @Hook(agentTarget('recvMsgNativeCallback'))
  recvMsg (
    @ParamType('int32', 'U32') msgType: number,
    @ParamType('pointer', 'Utf16String') contactId: string,
    @ParamType('pointer', 'Utf16String') text: string,
    @ParamType('pointer', 'Utf16String') groupMsgSenderId: string,
    @ParamType('pointer', 'Utf16String') xmlContent: string,
  ) { return Ret(msgType, contactId, text, groupMsgSenderId, xmlContent) }

}

export { WeChatSidecar }
