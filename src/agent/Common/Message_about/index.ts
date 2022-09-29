import { recvMsgNativeCallback } from "../../Version/Message_about/recvMsgNativeCallback";
import {
  asmAtMsg,
  roomid_,
  msg_,
  wxid_,
  atid_,
  ecxBuffer,
  sendAtMsgNativeFunction,
} from "../../Version/Message_about/sendAtMsgNativeFunction";
import {
  attatchWxid,
  attatchPath,
  attatchPathPtr,
  attatchAsm,
  attatchBuf,
  attatchEbp,
  attatchEaxbuf,
  sendAttatchMsgNativeFunction,
} from "../../Version/Message_about/sendAttatchMsgNativeFunction";
import { SendMiniProgramNativeFunction } from "./SendMiniProgramNativeFunction";
import { sendMsgNativeFunction } from "../../Version/Message_about/sendMsgNativeFunction";
import {
  buffwxid,
  imagefilepath,
  pathPtr,
  picWxid,
  picWxidPtr,
  picAsm,
  picbuff,
  sendPicMsgNativeFunction,
} from "../../Version/Message_about/sendPicMsgNativeFunction";

export {
  recvMsgNativeCallback,
  asmAtMsg,
  roomid_,
  msg_,
  wxid_,
  atid_,
  ecxBuffer,
  sendAtMsgNativeFunction,
  attatchWxid,
  attatchPath,
  attatchPathPtr,
  attatchAsm,
  attatchBuf,
  attatchEbp,
  attatchEaxbuf,
  sendAttatchMsgNativeFunction,
  SendMiniProgramNativeFunction,
  sendMsgNativeFunction,
  buffwxid,
  imagefilepath,
  pathPtr,
  picWxid,
  picWxidPtr,
  picAsm,
  picbuff,
  sendPicMsgNativeFunction,
};
