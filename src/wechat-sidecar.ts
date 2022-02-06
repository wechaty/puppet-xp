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
}                 from 'sidecar'

import { codeRoot } from './cjs.js'

const initAgentScript = fs.readFileSync(path.join(
  codeRoot,
  'src',
  'init-agent-script.js',
), 'utf-8')

@Sidecar('WeChat.exe', initAgentScript)
class WeChatSidecar extends SidecarBody {

  @Call(agentTarget('getTestInfoFunction'))
  getTestInfo ():Promise<string> { return Ret() }

  @Call(agentTarget('getChatroomMemberNickInfoFunction'))
  getChatroomMemberNickInfo (
    memberId: string,
    roomId: string,
  ): Promise<string> { return Ret(memberId, roomId) }

  @Call(agentTarget('getMyselfInfoFunction'))
  getMyselfInfo ():Promise<string> { return Ret() }

  @Call(agentTarget('getChatroomMemberInfoFunction'))
  getChatroomMemberInfo ():Promise<string> { return Ret() }

  @Call(agentTarget('getWechatVersionFunction'))
  getWeChatVersion ():Promise<Boolean> { return Ret() }

  @Call(agentTarget('getContactNativeFunction'))
  getContact ():Promise<string> { return Ret() }

  @Call(agentTarget('sendMsgNativeFunction'))
  sendMsg (
    contactId: string,
    text: string,
  ): Promise<string> { return Ret(contactId, text) }

  @Call(agentTarget('sendAttatchMsgNativeFunction'))
  sendAttatchMsg (
    contactId: string,
    path: string,
  ): Promise<string> { return Ret(contactId, path) }

  @Call(agentTarget('sendPicMsgNativeFunction'))
  sendPicMsg (
    contactId: string,
    path: string,
  ): Promise<string> { return Ret(contactId, path) }

  @Call(agentTarget('sendAtMsgNativeFunction'))
  sendAtMsg (
    roomId:string,
    text: string,
    contactId: string,
  ): Promise<string> { return Ret(roomId, text, contactId) }

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
