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

const supportedVersions = {
  v330115:'3.3.0.115',
  v360000:'3.6.0.18',
  v39223:'3.9.2.23',
}

// let initAgentScript = fs.readFileSync(path.join(
//   codeRoot,
//   'src',
//   'agents',
//   'agent-script-3.3.0.115.js',
// ), 'utf-8')

let initAgentScript = fs.readFileSync(path.join(
  codeRoot,
  'src',
  'init-agent-script.js',
), 'utf-8')

try {
  // const wechatVersion = new WeChatVersion()
  // await attach(wechatVersion)

  // const currentVersion = await wechatVersion.getWechatVersion()

  // console.info('currentVersion is ............................................... ：', currentVersion)

  // await detach(wechatVersion)

  const currentVersion = '3.9.2.23'

  switch (currentVersion) {
    case supportedVersions.v330115:
      initAgentScript = fs.readFileSync(path.join(
        codeRoot,
        'src',
        'agents',
        'agent-script-3.3.0.115.js',
      ), 'utf-8')
      break
    case supportedVersions.v360000:
      // initAgentScript = fs.readFileSync(path.join(
      //   codeRoot,
      //   'src',
      //   'agents',
      //   'agent-script-3.6.0.18.js',
      // ), 'utf-8')
      initAgentScript = fs.readFileSync(path.join(
        codeRoot,
        'src',
        'init-agent-script.js',
      ), 'utf-8')
      break
    case supportedVersions.v39223:
      // initAgentScript = fs.readFileSync(path.join(
      //   codeRoot,
      //   'src',
      //   'agents',
      //   'agent-script-3.6.0.18.js',
      // ), 'utf-8')
      initAgentScript = fs.readFileSync(path.join(
        codeRoot,
        'src',
        'init-agent-script.js',
      ), 'utf-8')
      break
    default:
      throw new Error(`Wechat version not supported. \nWechat version: ${currentVersion}, supported version: ${JSON.stringify(supportedVersions)}`)
  }
} catch (e) {}

@Sidecar('WeChat.exe', initAgentScript)
class WeChatSidecar extends SidecarBody {

  // @Call(agentTarget('getTestInfoFunction'))
  // getTestInfo ():Promise<string> { return Ret() }

  @Call(agentTarget('getChatroomMemberNickInfoFunction'))
  getChatroomMemberNickInfo (
    memberId: string,
    roomId: string,
  ): Promise<string> { return Ret(memberId, roomId) }

  @Call(agentTarget('isLoggedInFunction'))
  isLoggedIn ():Promise<boolean> { return Ret() }

  @Call(agentTarget('getMyselfInfoFunction'))
  getMyselfInfo ():Promise<string> { return Ret() }

  @Call(agentTarget('getChatroomMemberInfoFunction'))
  getChatroomMemberInfo ():Promise<string> { return Ret() }

  @Call(agentTarget('getWechatVersionFunction'))
  getWeChatVersion ():Promise<number> { return Ret() }

  @Call(agentTarget('getWechatVersionStringFunction'))
  getWechatVersionString ():Promise<string> { return Ret() }

  @Call(agentTarget('checkSupportedFunction'))
  checkSupported ():Promise<Boolean> { return Ret() }

  // @Call(agentTarget('callLoginQrcodeFunction'))
  // callLoginQrcode (
  //   forceRefresh: boolean,
  // ):Promise<null> { return Ret(forceRefresh) }

  @Call(agentTarget('getContactNativeFunction'))
  getContact ():Promise<string> { return Ret() }

  @Call(agentTarget('sendMsgNativeFunction'))
  sendMsg (
    contactId: string,
    text: string,
  ): Promise<string> { return Ret(contactId, text) }

  @Call(agentTarget('sendPicMsgNativeFunction'))
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

  @Call(agentTarget('SendMiniProgramNativeFunction'))
  SendMiniProgram (
    BgPathStr:string,
    contactId:string,
    xmlstr:string,
  ): Promise<string> { return Ret(BgPathStr, contactId, xmlstr) }

  @Hook(agentTarget('recvMsgNativeCallback'))
  recvMsg (
    @ParamType('int32', 'U32') msgType: number,
    @ParamType('pointer', 'Utf16String') contactId: string,
    @ParamType('pointer', 'Utf16String') text: string,
    @ParamType('pointer', 'Utf16String') groupMsgSenderId: string,
    @ParamType('pointer', 'Utf16String') xmlContent: string,
    @ParamType('int32', 'U32') isMyMsg: number, // add isMyMsg type
  ) { return Ret(msgType, contactId, text, groupMsgSenderId, xmlContent, isMyMsg) }

  // @Hook(agentTarget('checkQRLoginNativeCallback'))
  // checkQRLogin (
  //   @ParamType('int32', 'U32') status: number,
  //   @ParamType('pointer', 'Utf8String') qrcodeUrl: string,
  //   @ParamType('pointer', 'Utf8String') wxid: string,
  //   @ParamType('pointer', 'Utf8String') avatarUrl: string,
  //   @ParamType('pointer', 'Utf8String') nickname: string,
  //   @ParamType('pointer', 'Utf8String') phoneType: string,
  //   @ParamType('int32', 'U32') phoneClientVer: number,
  //   @ParamType('pointer', 'Utf8String') pairWaitTip: string,
  // ) { return Ret(status, qrcodeUrl, wxid, avatarUrl, nickname, phoneType, phoneClientVer, pairWaitTip) }

  // @Hook(agentTarget('hookLogoutEventCallback'))
  // logoutEvent (
  //   @ParamType('int32', 'U32') bySrv: number,
  // ) { return Ret(bySrv) }

  // @Hook(agentTarget('hookLoginEventCallback'))
  // loginEvent (
  // ) { return Ret() }

  // @Hook(agentTarget('agentReadyCallback'))
  // agentReady (
  // ) { return Ret() }

}

export { WeChatSidecar }
