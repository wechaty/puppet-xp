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
   handle_offset:0xe4,
   send_txt_call_offset:0x3E3B80,
   hook_point:0x40D3B1,
   chatroom_node_offset:0xb08
}
//3.3.0.115


/*------------------global-------------------------------------------*/
 const availableVersion  = 1661141107 ////3.3.0.115
 const moduleBaseAddress = Module.getBaseAddress('WeChatWin.dll')
 const moduleLoad        = Module.load('WeChatWin.dll')

 const baseNodeAddress    = moduleBaseAddress.add(offset.node_offset).readPointer()
 const headerNodeAddress  = baseNodeAddress.add(offset.handle_offset).readPointer()

 const chatroomNodeAddress= baseNodeAddress.add(offset.chatroom_node_offset).readPointer()

 let nodeList=[]  //for contact
 let contactList=[] //for contact

 let chatroomNodeList=[] //for chatroom
 let chatroomMemberList=[]//for chatroom

/*------------------global-------------------------------------------*/

// get myself info
const getMyselfInfoFunction = (() => {

  const sign = moduleBaseAddress.add(0x1DDF534+0x174).readU32()
  let   wx_code      = ''
  let   wx_id        = ''
  let   wx_name      = ''

  if(sign == 0){//old version
    wx_id   = Memory.readAnsiString(moduleBaseAddress.add(0x1DDF534+0x41c))
    wx_code = Memory.readAnsiString(moduleBaseAddress.add(0x1DDF534+0x41c))

  }else{
    wx_id   = Memory.readAnsiString(moduleBaseAddress.add(0x1DDF534+0x41c).readPointer())
    wx_code = Memory.readAnsiString(moduleBaseAddress.add(0x1DDF534+0x164))
  }

  const nick_sign = moduleBaseAddress.add(0x1DDF534+0x14).readU32()
  if(nick_sign == 0xF){
    wx_name = Memory.readUtf8String(moduleBaseAddress.add(0x1DDF534))
  }else{
    wx_name = Memory.readUtf8String(moduleBaseAddress.add(0x1DDF534).readPointer())
  }

  const myself = {
      wx_id:wx_id,
      wx_code:wx_code,
      wx_name:wx_name
  }

  return JSON.stringify(myself)

})
// chatroom member
 const chatroomRecurse = ((node)=>{
  if(node.equals(chatroomNodeAddress)){return}

  for (const item in chatroomNodeList){
    if(node.equals(chatroomNodeList[item])){
       return
     }
  }

  chatroomNodeList.push(node)
  const roomid = Memory.readUtf16String(node.add(0x10).readPointer())

  const len = Memory.readU32(node.add(0x50))   //
  //const memberJson={}
  if(len >4){//
    const memberStr = Memory.readAnsiString(node.add(0x40).readPointer(),len)
    if(memberStr.length>0){
        const memberList = memberStr.split(/[\\^][G]/)
        const memberJson ={
           roomid:roomid,
           roomMember:memberList
        }

        chatroomMemberList.push(memberJson)
    }

  }

  const leftNode   = node.add(0x0).readPointer()
  const centerNode = node.add(0x04).readPointer()
  const rightNode  = node.add(0x08).readPointer()

  chatroomRecurse(leftNode)
  chatroomRecurse(centerNode)
  chatroomRecurse(rightNode)

  const allChatroomMemberJson={
    chatroomMember:chatroomMemberList
  }
  return allChatroomMemberJson
 })



 //contact
 const recurse = ((node) =>{

   if(node.equals(headerNodeAddress)){return}

   for (const item in nodeList){
     if(node.equals(nodeList[item])){
        return
      }
   }


   nodeList.push(node)
   const wxid    = Memory.readUtf16String(node.add(0x38).readPointer())

   const sign    = node.add(0x4c+0x4).readU32()//
   let wx_code=''
   if(sign == 0){
     wx_code = Memory.readUtf16String(node.add(0x38).readPointer())
   }else{
     wx_code = Memory.readUtf16String(node.add(0x4c).readPointer())
   }


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

const getChatroomMemberInfoFunction = (() => {
  const node = chatroomNodeAddress.add(0x0).readPointer()
  const ret = chatroomRecurse(node)

  const cloneRet = JSON.stringify(ret)
  chatroomNodeList.length = 0//empty
  chatroomMemberList.length = 0 //empty
  return cloneRet
})

 const getWechatVersionFunction = (() => {
    const pattern ='55 8B ?? 83 ?? ?? A1 ?? ?? ?? ?? 83 ?? ?? 85 ?? 7F ?? 8D ?? ?? E8 ?? ?? ?? ?? 84 ?? 74 ?? 8B ?? ?? ?? 85 ?? 75 ?? E8 ?? ?? ?? ?? 0F ?? ?? 0D ?? ?? ?? ?? A3 ?? ?? ?? ?? A3 ?? ?? ?? ?? 8B ?? 5D C3'
    const results = Memory.scanSync(moduleLoad.base,moduleLoad.size,pattern)
    if(results.length > 0){
      const addr = results[0].address
      const ret  = addr.add(0x07).readPointer()
      const ver  = ret.add(0x0).readU32()
      if(ver == availableVersion){
        return true
      }
      else{
        return false
      }
    }
    return false
 })

 const getContactNativeFunction = (() => {
  const node = headerNodeAddress.add(0x0).readPointer()
  const ret = recurse(node)

  /*for (let item in ret.contact){
    console.log(ret.contact[item].wxid,ret.contact[item].wx_code,ret.contact[item].name)
  }*/
  //console.log(ret.contact)
  const cloneRet = JSON.stringify(ret)
  nodeList.length    = 0
  contactList.length = 0

  return cloneRet
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
    talkerId,
    content,
  ) => {
    const talkerIdPtr = Memory.alloc(talkerId.length * 2 + 1)
    const contentPtr  = Memory.alloc(content.length * 2 + 1)

    talkerIdPtr.writeUtf16String(talkerId)
    contentPtr.writeUtf16String(content)

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
    talkerIdPtr,
    contentPtr,
    asmBuffer,
    asmSendMsg,
    asmNativeFunction,
    sendMsg,
  }

  return (...args) => refHolder.sendMsg(...args)
})()

