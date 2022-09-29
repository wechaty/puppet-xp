import {
  agentReadyCallback,
  getTestInfoFunction,
} from "./Common/CommonFn";
import {  isLoggedInFunction} from "./Version/versionFn/isLoggedIn"
import {
  checkSupportedFunction,
  getChatroomMemberInfoFunction,
  getChatroomMemberNickInfoFunction,
  getContactNativeFunction,
  getWechatVersionFunction,
  getWechatVersionStringFunction,
} from "./Common/getData";
import { getMyselfInfoFunction } from "./Version/getUserData";

import {
  recvMsgNativeCallback,
  sendAtMsgNativeFunction,
  sendAttatchMsgNativeFunction,
  SendMiniProgramNativeFunction,
  sendMsgNativeFunction,
  sendPicMsgNativeFunction,
} from "./Common/Message_about";

import {
  callLoginQrcodeFunction,
  checkQRLoginNativeCallback,
} from "./Version/QR-aboutFn";
import {
  hookLoginEventCallback,
  hookLogoutEventCallback,
} from "./Version/version-hook";

export {
  getChatroomMemberNickInfoFunction,
  getTestInfoFunction,
  isLoggedInFunction,
  getMyselfInfoFunction,
  getChatroomMemberInfoFunction,
  getWechatVersionFunction,
  getWechatVersionStringFunction,
  checkSupportedFunction,
  callLoginQrcodeFunction,
  getContactNativeFunction,
  sendMsgNativeFunction,
  sendAttatchMsgNativeFunction,
  sendPicMsgNativeFunction,
  sendAtMsgNativeFunction,
  SendMiniProgramNativeFunction,
  recvMsgNativeCallback,
  checkQRLoginNativeCallback,
  hookLogoutEventCallback,
  hookLoginEventCallback,
  agentReadyCallback,
};
