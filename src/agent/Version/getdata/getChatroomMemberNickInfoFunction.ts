import { offset } from "../CommonData/data-offset";
import{ moduleBaseAddress}from "../../Common/globalVariable"
import { readWideString } from "../../Common/CommonFn/readString";
import {
  initidStruct,
  initStruct,
  initmsgStruct,
} from "../../Common/initStruct/all_init_Fn";
let nickRoomId: any = null;
let nickMemberId: any = null;
let nickStructPtr: any = null;
let nickBuff: any = null;
let memberNickBuffAsm: any = null;
let nickRetAddr: any = null;

const getChatroomMemberNickInfoFunction = (memberId: any, roomId: any) => {
  nickBuff = Memory.alloc(0x7e4);
  nickRetAddr = Memory.alloc(0x04);
  memberNickBuffAsm = Memory.alloc(Process.pageSize);
  nickRoomId = initidStruct(roomId);
  nickMemberId = initStruct(memberId);
  nickStructPtr = initmsgStruct("");

  Memory.patchCode(memberNickBuffAsm, Process.pageSize, (code) => {
    var cw = new X86Writer(code, { pc: memberNickBuffAsm });
    cw.putPushfx();
    cw.putPushax();

    cw.putMovRegAddress("ebx", nickStructPtr);
    cw.putMovRegAddress("esi", nickMemberId);
    cw.putMovRegAddress("edi", nickRoomId);

    cw.putMovRegAddress("ecx", nickBuff);
    cw.putCallAddress(
      moduleBaseAddress.add(offset.chatroom_member_nick_call_offset1)
    );

    cw.putMovRegAddress("eax", nickBuff);
    cw.putPushReg("eax");
    cw.putPushReg("esi");
    cw.putCallAddress(
      moduleBaseAddress.add(offset.chatroom_member_nick_call_offset2)
    );

    cw.putMovRegReg("ecx", "eax");
    cw.putCallAddress(
      moduleBaseAddress.add(offset.chatroom_member_nick_call_offset3)
    );

    cw.putPushU32(1);
    cw.putPushReg("ebx");
    cw.putMovRegReg("edx", "edi");
    cw.putMovRegAddress("ecx", nickBuff);
    cw.putCallAddress(
      moduleBaseAddress.add(offset.chatroom_member_nick_call_offset4)
    );
    cw.putAddRegImm("esp", 0x08);
    cw.putMovNearPtrReg(nickRetAddr, "ebx");
    cw.putPopax();
    cw.putPopfx();
    cw.putRet();
    cw.flush();
  });

  const nativeativeFunction: NativeFunction<void, []> = new NativeFunction(
    ptr(memberNickBuffAsm),
    "void",
    []
  );
  nativeativeFunction();

  return readWideString(nickRetAddr.readPointer());
};

export {
  nickRoomId,
  nickMemberId,
  nickStructPtr,
  nickBuff,
  memberNickBuffAsm,
  nickRetAddr,
  getChatroomMemberNickInfoFunction,
};
