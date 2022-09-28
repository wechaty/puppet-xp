import { initStruct,initidStruct,initmsgStruct,initAtMsgStruct } from "../initStruct/all_init_Fn"
import { moduleBaseAddress,offset } from "../CommonData/data-offset"

let asmAtMsg:any = null
let roomid_:any, msg_:any, wxid_:any, atid_:any
let ecxBuffer:any
const sendAtMsgNativeFunction = ((roomId:any, text:any, contactId:any) => {
  asmAtMsg = Memory.alloc(Process.pageSize)
  ecxBuffer = Memory.alloc(0x5f0)


  roomid_ = initStruct(roomId)
  wxid_ = initidStruct(contactId)
  msg_ = initmsgStruct(text)
  atid_ = initAtMsgStruct(wxid_)

  Memory.patchCode(asmAtMsg, Process.pageSize, code => {
    var cw = new X86Writer(code, { pc: asmAtMsg })
    //cw.putMovRegAddress('eax',roomid)

    cw.putPushfx();
    cw.putPushax();

    cw.putPushU32(1)  // push

    cw.putMovRegAddress('edi', atid_)
    cw.putMovRegAddress('ebx', msg_)//msg_

    cw.putPushReg('edi')
    cw.putPushReg('ebx')

    //cw.putMovRegRegOffsetPtr('edx', 'ebp', 0x10)//at wxid
    cw.putMovRegAddress('edx', roomid_)//room_id

    cw.putMovRegAddress('ecx', ecxBuffer)

    cw.putCallAddress(moduleBaseAddress.add(
      offset.send_txt_call_offset
    ))
    cw.putAddRegImm('esp', 0xc)

    cw.putPopax()
    cw.putPopfx()
    cw.putRet()
    cw.flush()
  })

  const atMsgNativeFunction: NativeFunction<void, []> = new NativeFunction(ptr(asmAtMsg), 'void', [])
  atMsgNativeFunction()
})

export {
 asmAtMsg ,
 roomid_,
 msg_,
 wxid_,
 atid_,
 ecxBuffer,
 sendAtMsgNativeFunction
}
