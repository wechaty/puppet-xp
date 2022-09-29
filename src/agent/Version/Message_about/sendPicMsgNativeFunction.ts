import { offset } from "../CommonData/data-offset";
import {moduleBaseAddress} from "../../Common/globalVariable"

let buffwxid: any = null;
let imagefilepath: any = null;
let pathPtr: any = null;
let picWxid: any = null;
let picWxidPtr: any = null;
let picAsm: any = null;
let picbuff: any = null;
const sendPicMsgNativeFunction = (contactId: any, path: any) => {
  picAsm = Memory.alloc(Process.pageSize);
  buffwxid = Memory.alloc(0x20);
  picbuff = Memory.alloc(0x378);

  pathPtr = Memory.alloc(path.length * 2 + 1);
  pathPtr.writeUtf16String(path);

  imagefilepath = Memory.alloc(0x24);
  imagefilepath
    .writePointer(pathPtr)
    .add(0x04)
    .writeU32(path.length * 2)
    .add(0x04)
    .writeU32(path.length * 2)
    .add(0x04);

  picWxidPtr = Memory.alloc(contactId.length * 2 + 1);
  picWxidPtr.writeUtf16String(contactId);

  picWxid = Memory.alloc(0x0c);
  picWxid
    .writePointer(ptr(picWxidPtr))
    .add(0x04)
    .writeU32(contactId.length * 2)
    .add(0x04)
    .writeU32(contactId.length * 2)
    .add(0x04);

  Memory.patchCode(picAsm, Process.pageSize, (code) => {
    var cw = new X86Writer(code, { pc: picAsm });
    cw.putPushfx();
    cw.putPushax();

    cw.putSubRegImm("esp", 0x14);
    cw.putMovRegAddress("eax", buffwxid);

    cw.putMovRegReg("ecx", "esp");

    cw.putPushReg("eax");
    cw.putCallAddress(moduleBaseAddress.add(offset.send_picmsg_call_offset1));

    cw.putMovRegAddress("ebx", imagefilepath);
    cw.putPushReg("ebx");

    cw.putMovRegAddress("eax", picWxid);
    cw.putPushReg("eax");

    cw.putMovRegAddress("eax", picbuff);
    cw.putPushReg("eax");
    cw.putCallAddress(moduleBaseAddress.add(offset.send_picmsg_call_offset2));

    cw.putMovRegReg("ecx", "eax");
    cw.putCallAddress(moduleBaseAddress.add(offset.send_picmsg_call_offset3));
    cw.putPopax();
    cw.putPopfx();
    cw.putRet();
    cw.flush();
  });

  const nativeativeFunction: NativeFunction<void, []> = new NativeFunction(
    ptr(picAsm),
    "void",
    []
  );
  nativeativeFunction();
};

export {
  buffwxid,
  imagefilepath,
  pathPtr,
  picWxid,
  picWxidPtr,
  picAsm,
  picbuff,
  sendPicMsgNativeFunction,
};
