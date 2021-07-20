/**
 * WeChat 3.2.1.121
 *  > Special thanks to: @cixingguangming55555 老张学技术
 *
 * Credit: https://github.com/cixingguangming55555/wechat-bot
 * Source: https://pan.baidu.com/s/1OmX2lxNOYHyGsl_3ByhsoA
 *        《源码3.2.1.121》提取码: 1rfa
 * WeChat: https://pan.baidu.com/share/init?surl=IHRM2OMvrLyuCz5MRbigGg
 *         微信：3.2.1.121 提取码: cscn
 */

//3.3.0.115
const offset={
   node_offset:0x1DB9728,
   handle_offset:0x28+0xbc,
   send_txt_call_offset:0x3E3B80,
   hook_point:0x40D3B1
}
//3.3.0.115



 const moduleBaseAddress = Module.getBaseAddress('WeChatWin.dll')
 const moduleLoad        = Module.load('WeChatWin.dll')
 
 const baseNodeAddress   = moduleBaseAddress.add(offset.node_offset).readPointer()
 const headerNodeAddress = baseNodeAddress.add(offset.handle_offset).readPointer()
 let nodeList=[]
 let contactList=[]
 const recurse = ((node) =>{
  
   if(node.equals(headerNodeAddress)){return}
 
   for (const item in nodeList){
     if(node.equals(nodeList[item])){  
        return
      }
   }

 
   nodeList.push(node)
   const wxid    = Memory.readUtf16String(node.add(0x38).readPointer());
   //const wx_code = Memory.readUtf16String(node.add(0x80).readPointer());
   const name = Memory.readUtf16String(node.add(0x94).readPointer());

   const contactJson={
     wxid:wxid,
     wx_code:wx_code,
     name:name
   }

   contactList.push(contactJson)

   const leftNode   = node.add(0x0).readPointer()
   const centerNode = node.add(0x04).readPointer()
   const rightNode  = node.add(0x08).readPointer()
   
   recurse(leftNode)
   recurse(centerNode)
   recurse(rightNode)
 
   const allContactJson={
     contact:contactList
   }
   
   return allContactJson
 
 })

 /*
 const scanNativeFunction=(()=>{
   const pattern='E8 ?? ?? ?? ?? 8D ?? ?? ?? ?? ?? E8 ?? ?? ?? ?? 8D ?? ?? E8 ?? ?? ?? ?? 8D ?? ?? ?? ?? ?? E8 ?? ?? ?? ?? 8D ?? ?? ?? ?? ?? E8 ?? ?? ?? ?? 8D ?? ?? ?? ?? ?? E8 ?? ?? ?? ?? 8D ?? ?? C7 ?? ?? ?? ?? ?? ?? E8 ?? ?? ?? ?? 8D ?? ?? E8'

  Memory.scan(moduleLoad.base, moduleLoad.size, pattern, {
    onMatch(address, size) {
      return 'stop'
    },
    onComplete() {
      console.log('Memory.scan() complete')
    }
  })  
  return ()=>{}

 })*/

 const getContactNativeFunction = (() => {
  const node = headerNodeAddress.add(0x0).readPointer()
  const ret = recurse(node)

  /*for (let item in ret.contact){
    console.log(ret.contact[item].wxid,ret.contact[item].wx_code,ret.contact[item].name)
  }*/
  //console.log(ret.contact)
  nodeList.length    = 0
  contactList.length = 0

  return ret
})

  
 /**
  * @Hook: recvMsg -> recvMsgNativeCallback
  */
const recvMsgNativeCallback = (() => {
  const nativeCallback      = new NativeCallback(() => {}, 'void', ['int32', 'pointer','pointer','pointer','pointer'])
  const nativeativeFunction = new NativeFunction(nativeCallback, 'void', ['int32', 'pointer','pointer','pointer','pointer'])

  Interceptor.attach(
    moduleBaseAddress.add(offset.hook_point),
    {
      onEnter() {
        const addr = this.context.ebp.sub(0xc28)//0xc30-0x08
        const msgType = addr.add(0x30).readU32()

        if (msgType>0){
        const talkerIdPtr = addr.add(0x40).readPointer()
        const contentPtr  = addr.add(0x68).readPointer()
        const groupMsgSenderIdPtr= addr.add(0x168).readPointer()
        const xmlContentPtr=addr.add(0x1d0).readPointer()

        setImmediate(() => nativeativeFunction(msgType,talkerIdPtr, contentPtr,groupMsgSenderIdPtr,xmlContentPtr))
      }
    }
  })
  return nativeCallback
})()

/**
 * @Call: sendMsg -> agentSendMsg
 */
const sendMsgNativeFunction = (() => {
  //const asmBuffer   = Memory.alloc(/*0x5a8*/0x5f0) // magic number from wechat-bot (laozhang)
  const asmBuffer   = Memory.alloc(0x5f0)
  const asmSendMsg  = Memory.alloc(Process.pageSize)

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

  let ins = Instruction.parse(asmSendMsg)
  for (let i=0; i<20; i++) {
    console.log(ins.address, '\t', ins.mnemonic, '\t', ins.opStr)
    ins = Instruction.parse(ins.next)
  }
  
  const asmNativeFunction = new NativeFunction(asmSendMsg, 'void', ['pointer', 'pointer'])

  const sendMsg = (
    talkerIdPtr,
    contentPtr,
  ) => {
    const talkerId  = talkerIdPtr.readUtf16String()
    const content   = contentPtr.readUtf16String()

    const sizeOfStringStruct = Process.pointerSize * 3 // + 0xd

    // allocate space for the struct
    const talkerIdStruct  = Memory.alloc(sizeOfStringStruct) // returns a NativePointer
    const contentStruct   = Memory.alloc(sizeOfStringStruct) // returns a NativePointer

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

  return (...args) => refHolder.sendMsg(...args)
})()

