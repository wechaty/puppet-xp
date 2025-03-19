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

const scriptPath =  path.join(
  codeRoot,
  'src',
  'init-agent-script.js',
)

const initAgentScript = fs.readFileSync(scriptPath, 'utf-8')

// console.info('XpSidecar initAgentScript:', XpSidecar.initAgentScript)

// 联系人接口，包含所有提供的属性
export interface ContactOrRoom {
  id: string;
  gender: number;
  type: number;
  name: string;
  avatar: string; // profile picture, optional
  address: string; // residential or mailing address, optional
  alias: string; // alias or nickname, optional
  city: string; // city of residence, optional
  friend?: boolean; // denotes if the contact is a friend
  province: string; // province of residence, optional
  signature?: string; // personal signature or motto, optional
  star?: boolean; // denotes if the contact is starred
  weixin: string; // WeChat handle, optional
  corporation: string; // associated company or organization, optional
  title: string; // job title or position, optional
  description: string; // a description for the contact, optional
  coworker: boolean; // denotes if the contact is a coworker
  phone: string[]; // list of phone numbers
}

@Sidecar('WeChat.exe', initAgentScript)
class WeChatSidecar extends SidecarBody {

  @Call(agentTarget('contactSelfInfo'))
  getMyselfInfo ():Promise<any> { return Ret() }

  @Call(agentTarget('contactList'))
  contactList ():Promise<ContactOrRoom[]> { return Ret() }

  @Call(agentTarget('roomList'))
  roomList ():Promise<ContactOrRoom[]> { return Ret() }

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
