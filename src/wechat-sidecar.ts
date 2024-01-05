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

type WeChatVersion = {
  wechatVersion: string,
}

class XpSidecar {

  private supportedVersions = {
    v330115:'3.3.0.115',
    v360000:'3.6.0.18',
    v39223:'3.9.2.23',
  }

  static currentVersion = '3.9.2.23'
  static scriptPath =  path.join(
    codeRoot,
    'src',
    'init-agent-script.js',
  )

  static initAgentScript = fs.readFileSync(XpSidecar.scriptPath, 'utf-8')

  constructor (options?:WeChatVersion) {
    console.info('XpSidecar constructor()', options)
    if (options?.wechatVersion) {
      XpSidecar.currentVersion = options.wechatVersion
    }
    console.info('XpSidecar currentVersion:', XpSidecar.currentVersion)
    let scriptPath = path.join(
      codeRoot,
      'src',
      'agents',
      'agent-script-3.6.0.18.js',
    )
    try {
      switch (XpSidecar.currentVersion) {
        case this.supportedVersions.v330115:
          scriptPath = path.join(
            codeRoot,
            'src',
            'agents',
            'agent-script-3.3.0.115.js',
          )
          break
        case this.supportedVersions.v360000:
          scriptPath = path.join(
            codeRoot,
            'src',
            'agents',
            'agent-script-3.6.0.18.js',
          )
          break
        case this.supportedVersions.v39223:
          scriptPath = path.join(
            codeRoot,
            'src',
            'agents',
            'agent-script-3.9.2.23.js',
          )
          break
        default:
          console.error(`Wechat version not supported. \nWechat version: ${XpSidecar.currentVersion}, supported version: ${JSON.stringify(this.supportedVersions)}`)
          throw new Error(`Wechat version not supported. \nWechat version: ${XpSidecar.currentVersion}, supported version: ${JSON.stringify(this.supportedVersions)}`)
      }
      console.info('XpSidecar initAgentScript path:', scriptPath)
      XpSidecar.initAgentScript = fs.readFileSync(scriptPath, 'utf-8')
    } catch (e) {}
  }

  setinitAgentScript () {
    XpSidecar.initAgentScript = fs.readFileSync(path.join(
      codeRoot,
      'src',
      `init-agent-script-${XpSidecar.currentVersion}.js`,
    ), 'utf-8')
  }

}

// console.info('XpSidecar initAgentScript:', XpSidecar.initAgentScript)

@Sidecar('WeChat.exe', XpSidecar.initAgentScript)
class WeChatSidecar extends SidecarBody {

  // @Call(agentTarget('getTestInfoFunction'))
  // getTestInfo ():Promise<string> { return Ret() }

  @Call(agentTarget('getLoginUrlFunction'))
  getLoginUrl ():Promise<string> { return Ret() }

  @Call(agentTarget('getChatroomMemberNickInfoFunction'))
  getChatroomMemberNickInfo (
    memberId: string,
    roomId: string,
  ): Promise<string> { return Ret(memberId, roomId) }

  @Call(agentTarget('isLoggedInFunction'))
  isLoggedIn ():Promise<boolean> { return Ret() }

  @Call(agentTarget('getMyselfInfoFunction'))
  getMyselfInfo ():Promise<string> { return Ret() }

  @Call(agentTarget('GetContactOrChatRoomNickname'))
  GetContactOrChatRoomNickname (
    wxId: string,
  ): Promise<string> { return Ret(wxId) }

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

  @Hook(agentTarget('hookLogoutEventCallback'))
  logoutEvent (
    @ParamType('int32', 'U32') bySrv: number,
  ) { return Ret(bySrv) }

  @Hook(agentTarget('hookLoginEventCallback'))
  loginEvent (
  ) { return Ret() }

  @Hook(agentTarget('agentReadyCallback'))
  agentReady (
  ) { return Ret() }

}

export { WeChatSidecar, XpSidecar }
