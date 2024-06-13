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

// 用户账号名称接口定义
export interface AccountInfo {
  id: string; // UserName 类型需要您自行定义
  custom_account?: string; // 可选的账号名称
  del_flag: string; // 删除标志
  type: number; // 类型
  verify_flag: number; // 验证标志
  alias?: string; // 别名，可选
  name: string; // 昵称
  pinyin: string; // 拼音
  pinyin_all?: string; // 全拼，可选
}

@Sidecar('WeChat.exe', initAgentScript)
class WeChatSidecar extends SidecarBody {

  @Call(agentTarget('contactSelfInfo'))
  getMyselfInfo ():Promise<any> { return Ret() }

  @Call(agentTarget('contactList'))
  contactList ():Promise<AccountInfo[]> { return Ret() }

  @Call(agentTarget('messageSendText'))
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
