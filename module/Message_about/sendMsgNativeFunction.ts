import { moduleBaseAddress,offset } from "../CommonData/data-offset"
const sendMsgNativeFunction = (() => {
  //const asmBuffer   = Memory.alloc(/*0x5a8*/0x5f0) // magic number from wechat-bot (laozhang)
  const asmBuffer:NativePointer = Memory.alloc(0x5f0)
  const asmSendMsg:NativePointer = Memory.alloc(Process.pageSize)
  Memory.patchCode(asmSendMsg, Process.pageSize, code => {
    var cw = new X86Writer(code, { pc: asmSendMsg })

    cw.putPushReg('ebp')
    cw.putMovRegReg('ebp', 'esp')
    cw.putPushax()
    cw.putPushfx()

    cw.putPushU32(1)  // push
    cw.putPushU32(0)  // push

    cw.putMovRegRegOffsetPtr('ebx', 'ebp', 0xc) // arg 1
    cw.putPushReg('ebx')  // push

    cw.putMovRegRegOffsetPtr('edx', 'ebp', 0x8) // arg 0
    cw.putMovRegAddress('ecx', asmBuffer)

    //0x3b56a0 3.2.1.121
    cw.putCallAddress(moduleBaseAddress.add(
      offset.send_txt_call_offset
    ))
    cw.putAddRegImm('esp', 0xc)

    cw.putPopfx()
    cw.putPopax()
    cw.putMovRegRegPtr('esp', 'ebp') // Huan(202107): why use RegRegPtr? (RegRet will fail)
    cw.putPopReg('ebp')
    cw.putRet()

    cw.flush()
  })

  /*let ins = Instruction.parse(asmSendMsg)
  for (let i=0; i<20; i++) {
    console.log(ins.address, '\t', ins.mnemonic, '\t', ins.opStr)
    ins = Instruction.parse(ins.next)
  }*/

  const asmNativeFunction = new NativeFunction(asmSendMsg, 'void', ['pointer', 'pointer'])

  const sendMsg = (
    talkerId:any,
    content:any,
  ) => {
    const talkerIdPtr = Memory.alloc(talkerId.length * 2 + 1)
    const contentPtr = Memory.alloc(content.length * 2 + 1)

    talkerIdPtr.writeUtf16String(talkerId)
    contentPtr.writeUtf16String(content)

    const sizeOfStringStruct = Process.pointerSize * 5 // + 0xd

    // allocate space for the struct
    const talkerIdStruct = Memory.alloc(sizeOfStringStruct) // returns a NativePointer
    const contentStruct = Memory.alloc(sizeOfStringStruct) // returns a NativePointer

    talkerIdStruct
      .writePointer(talkerIdPtr).add(0x4)
      .writeU32(talkerId.length).add(0x4)
      .writeU32(talkerId.length * 2)

    contentStruct
      .writePointer(contentPtr).add(0x4)
      .writeU32(content.length).add(0x4)
      .writeU32(content.length * 2)

    asmNativeFunction(talkerIdStruct, contentStruct)
  }

  /**
   * Best Practices
   *  https://frida.re/docs/best-practices/
   *
   * There is however a pitfall: the value returned by Memory.allocUtf8String() must be kept alive
   *  – it gets freed as soon as the JavaScript value gets garbage-collected.
   *
   * This means it needs to be kept alive for at least the duration of the function-call,
   *  and in some cases even longer; the exact semantics depend on how the API was designed.
   */
  const refHolder = {
    asmBuffer,
    asmSendMsg,
    asmNativeFunction,
    sendMsg,
  }

  return (...args:any[]) => refHolder.sendMsg(...args as [talkerId:any,content:any]) //ci  chu  bu zhi  dao dui cuo   // as [talkerId:any,content:any]
})()
export {
  sendMsgNativeFunction
}
