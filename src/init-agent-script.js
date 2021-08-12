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

//const { isNullishCoalesce } = require("typescript")

//3.3.0.115
const offset={
   node_offset:0x1DB9728,
   handle_offset:0xe4,
   send_txt_call_offset:0x3E3B80,
   hook_point:0x40D3B1,
   chatroom_node_offset:0xb08,
   personal_offset:0x1DDF534,
   send_picmsg_call_offset1:0x5CCB50,
   send_picmsg_call_offset2:0x6F5C0,
   send_picmsg_call_offset3:0x3E3490
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

  const sign = moduleBaseAddress.add(offset.personal_offset+0x174).readU32()
  let   wx_code      = ''
  let   wx_id        = ''
  let   wx_name      = ''

  if(sign == 0){//old version
    wx_id   = Memory.readAnsiString(moduleBaseAddress.add(offset.personal_offset+0x41c))
    wx_code = Memory.readAnsiString(moduleBaseAddress.add(offset.personal_offset+0x41c))

  }else{
    wx_id   = Memory.readAnsiString(moduleBaseAddress.add(offset.personal_offset+0x41c).readPointer())
    wx_code = Memory.readAnsiString(moduleBaseAddress.add(offset.personal_offset+0x164))
  }

  const nick_sign = moduleBaseAddress.add(offset.personal_offset+0x14).readU32()
  if(nick_sign == 0xF){
    wx_name = Memory.readUtf8String(moduleBaseAddress.add(offset.personal_offset))
  }else{
    wx_name = Memory.readUtf8String(moduleBaseAddress.add(offset.personal_offset).readPointer())
  }
  
  const myself = {
      id:wx_id,
      code:wx_code,
      name:wx_name
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

  const allChatroomMemberJson = chatroomMemberList
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
     id:wxid,
     code:wx_code,
     name:name
   }

   contactList.push(contactJson)

   const leftNode   = node.add(0x0).readPointer()
   const centerNode = node.add(0x04).readPointer()
   const rightNode  = node.add(0x08).readPointer()
   
   recurse(leftNode)
   recurse(centerNode)
   recurse(rightNode)
 
   const allContactJson=contactList
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

let msgStruct=null
let msgstrPtr=null
const initmsgStruct = ( (str) => {
    msgstrPtr = Memory.alloc(str.length*2 + 1)
    msgstrPtr.writeUtf16String(str)

    msgStruct  = Memory.alloc(0x14) // returns a NativePointer

    msgStruct
    .writePointer(msgstrPtr).add(0x04)
    .writeU32(str.length * 2).add(0x04)
    .writeU32(str.length * 2).add(0x04)
    .writeU32(0).add(0x04)
    .writeU32(0)

    return msgStruct
})


let retidStruct=null
let retidPtr   =null
const initidStruct = ( (str) => {

    retidPtr = Memory.alloc(str.length*2 + 1)
    retidPtr.writeUtf16String(str)

    retidStruct  = Memory.alloc(0x14) // returns a NativePointer

    retidStruct
    .writePointer(retidPtr).add(0x04)
    .writeU32(str.length * 2).add(0x04)
    .writeU32(str.length * 2).add(0x04)
    .writeU32(0).add(0x04)
    .writeU32(0)

    return retidStruct
})

let retPtr=null
let retStruct = null
const initStruct = ( (str) => {

    retPtr = Memory.alloc(str.length*2 + 1)
    retPtr.writeUtf16String(str)

    retStruct  = Memory.alloc(0x14) // returns a NativePointer

    retStruct
    .writePointer(retPtr).add(0x04)
    .writeU32(str.length * 2).add(0x04)
    .writeU32(str.length * 2).add(0x04)
    .writeU32(0).add(0x04)
    .writeU32(0)

    return retStruct
})

/**
 * at msg structure
 */
let atStruct=null
const initAtMsgStruct = ( (wxidStruct) => {
  
    atStruct = Memory.alloc(0x10)

    atStruct.writePointer(wxidStruct).add(0x04)
    .writeU32(wxidStruct.toInt32()+0x14).add(0x04)//0x14 = sizeof(wxid structure)
    .writeU32(wxidStruct.toInt32()+0x14).add(0x04)
    .writeU32(0)
    return atStruct
})

let buffwxid      = null
let imagefilepath = null
let pathPtr       = null
let picWxid       = null
let picWxidPtr    = null
let picAsm        = null
let picbuff       = null
const sendPicMsgNativeFunction = ( (contactId,path)=> {

  picAsm        = Memory.alloc(Process.pageSize)
  buffwxid      = Memory.alloc(0x20)
  picbuff       = Memory.alloc(0x378)

  pathPtr       = Memory.alloc(path.length * 2 + 1)
  pathPtr.writeUtf16String(path)

  imagefilepath = Memory.alloc(0x24)
  imagefilepath.writePointer(pathPtr).add(0x04)
  .writeU32(path.length * 2).add(0x04)
  .writeU32(path.length * 2).add(0x04)

  picWxidPtr    = Memory.alloc(contactId.length * 2 + 1)
  picWxidPtr.writeUtf16String(contactId)

  picWxid = Memory.alloc(0x0c)
  picWxid.writePointer(ptr(picWxidPtr)).add(0x04)
  .writeU32(contactId.length * 2).add(0x04)
  .writeU32(contactId.length * 2).add(0x04)

  Memory.patchCode(picAsm, Process.pageSize, code => {
    var cw = new X86Writer(code, { pc: picAsm })
    cw.putPushfx();
    cw.putPushax();

    cw.putSubRegImm('esp', 0x14)			
    cw.putMovRegAddress('eax',buffwxid)

    cw.putMovRegReg('ecx', 'esp')

    cw.putPushReg('eax')
    cw.putCallAddress(moduleBaseAddress.add(
      offset.send_picmsg_call_offset1
    ))
    
    cw.putMovRegAddress('ebx',imagefilepath)
    cw.putPushReg('ebx')

    cw.putMovRegAddress('eax',picWxid)
    cw.putPushReg('eax')

    cw.putMovRegAddress('eax',picbuff)
    cw.putPushReg('eax')
    cw.putCallAddress(moduleBaseAddress.add(
      offset.send_picmsg_call_offset2
    ))

    cw.putMovRegReg('ecx', 'eax')
    cw.putCallAddress(moduleBaseAddress.add(
      offset.send_picmsg_call_offset3
    ))
    cw.putPopax()
    cw.putPopfx()
    cw.putRet()
    cw.flush()

  })

  const nativeativeFunction = new NativeFunction(ptr(picAsm), 'void', [])
  nativeativeFunction()

})
/**
 * send at msg
 */
let asmAtMsg=null
let roomid_,msg_,wxid_,atid_
let ecxBuffer
const sendAtMsgNativeFunction = ( (roomId,text,contactId) => {
  asmAtMsg    = Memory.alloc(Process.pageSize)
  ecxBuffer   = Memory.alloc(0x5f0)

  
  roomid_ = initStruct(roomId)
  wxid_   = initidStruct(contactId)
  msg_    = initmsgStruct(text)
  atid_   = initAtMsgStruct(wxid_)

  Memory.patchCode(asmAtMsg, Process.pageSize, code => {
    var cw = new X86Writer(code, { pc: asmAtMsg })
    //cw.putMovRegAddress('eax',roomid)
    
    cw.putPushfx();
    cw.putPushax();

    cw.putPushU32(1)  // push

    cw.putMovRegAddress('edi',atid_)
    cw.putMovRegAddress('ebx',msg_)//msg_

    cw.putPushReg('edi')  
    cw.putPushReg('ebx')

    //cw.putMovRegRegOffsetPtr('edx', 'ebp', 0x10)//at wxid
    cw.putMovRegAddress('edx',roomid_)//room_id

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

  const atMsgNativeFunction = new NativeFunction(ptr(asmAtMsg), 'void', [])
  atMsgNativeFunction()
})

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

  /*let ins = Instruction.parse(asmSendMsg)
  for (let i=0; i<20; i++) {
    console.log(ins.address, '\t', ins.mnemonic, '\t', ins.opStr)
    ins = Instruction.parse(ins.next)
  }*/
  
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
    asmBuffer,
    asmSendMsg,
    asmNativeFunction,
    sendMsg,
  }

  return (...args) => refHolder.sendMsg(...args)
})()

