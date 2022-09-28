import { initidStruct } from "../initStruct/all_init_Fn"
import { moduleBaseAddress,offset } from "../CommonData/data-offset"

let attatchWxid:any = null
let attatchPath:any  = null
let attatchPathPtr:any  = null
let attatchAsm:any  = null
let attatchBuf:any  = null
let attatchEbp:any  = null
let attatchEaxbuf:any  = null
const sendAttatchMsgNativeFunction = ((contactId:any , path:any ):void => {

  attatchAsm = Memory.alloc(Process.pageSize)
  attatchBuf = Memory.alloc(0x378)
  attatchEbp = Memory.alloc(0x04)
  attatchEaxbuf = Memory.alloc(0x14)

  attatchWxid = initidStruct(contactId)


  attatchPathPtr = Memory.alloc(path.length * 2 + 1)
  attatchPathPtr.writeUtf16String(path)

  attatchPath = Memory.alloc(0x28)
  attatchPath.writePointer(attatchPathPtr).add(0x04)
    .writeU32(path.length * 2).add(0x04)
    .writeU32(path.length * 2).add(0x04)

  Memory.patchCode(attatchAsm, Process.pageSize, code => {
    var cw = new X86Writer(code, { pc: attatchAsm })
    cw.putPushfx();
    cw.putPushax();

    cw.putSubRegImm('esp', 0x14)
    //mov byte ptr ss : [ebp - 0x6C] , 0x0
    //cw.putMovNearPtrReg(attatchEbp, 'ebp')
    //cw.putMovRegOffsetPtrU32('ebp', -0x6c, 0x0)
    //cw.putMovRegRegOffsetPtr('edx', 'ebp', -0x6c)

    //putShlRegU8(reg, immValue)

    cw.putMovRegAddress('ebx', attatchPath)
    cw.putMovRegAddress('eax', attatchEaxbuf)
    cw.putMovRegReg('ecx', 'esp')
    cw.putPushReg('eax')
    cw.putCallAddress(moduleBaseAddress.add(
      offset.send_attatch_call_offset1
    ))


    cw.putPushU32(0)
    cw.putSubRegImm('esp', 0x14)
    cw.putMovRegReg('ecx', 'esp')
    cw.putPushU32(-1)
    cw.putPushU32((moduleBaseAddress.add(offset.send_attatch_call_para)).toInt32())
    cw.putCallAddress(moduleBaseAddress.add(
      offset.send_attatch_call_offset2
    ))

    cw.putSubRegImm('esp', 0x14)
    cw.putMovRegReg('ecx', 'esp')
    cw.putPushU32(attatchPath.toInt32())
    cw.putCallAddress(moduleBaseAddress.add(
      offset.send_attatch_call_offset3
    ))

    cw.putSubRegImm('esp', 0x14)
    cw.putMovRegReg('ecx', 'esp')
    cw.putPushU32(attatchWxid.toInt32())
    cw.putCallAddress(moduleBaseAddress.add(
      offset.send_attatch_call_offset4
    ))

    cw.putMovRegAddress('eax', attatchBuf)
    cw.putPushReg('eax')
    cw.putCallAddress(moduleBaseAddress.add(
      offset.send_attatch_call_offset5
    ))

    cw.putMovRegReg('ecx', 'eax')
    cw.putCallAddress(moduleBaseAddress.add(
      offset.send_attatch_call_offset6
    ))

    cw.putPopax()
    cw.putPopfx()
    cw.putRet()
    cw.flush()

  })

  const nativeativeFunction = new NativeFunction(ptr(attatchAsm), 'void', [])
  nativeativeFunction()
})

export {
 attatchWxid,
 attatchPath,
 attatchPathPtr,
 attatchAsm,
 attatchBuf,
 attatchEbp,
 attatchEaxbuf,
 sendAttatchMsgNativeFunction
}
