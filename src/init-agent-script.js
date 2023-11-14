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

//https://blog.csdn.net/iloveitvm/article/details/109119687  frida学习

//const { isNullishCoalesce } = require("typescript")

//3.9.2.23

const offset = {


  hook_point: 0xd19a0b, //3.9.2.23

  myselfinfo: {
    offset: 0x2FFD484, //老版本微信号偏移，后面的地址，都要在这个偏移上增加
    //wxid_len:0x10,
    head_img_url: 0x2D8,
    head_img_url_len: 0x2E8,
    wx_nick_name: 0x10C,
    wxcode_new: 0x64, //新版本微信号
    //wxcode_len:0x74
    wxid_len_offset: 0x4D4
  },

  contactInfo: {
    nodeOffset: 0x2FFDD7C,
    nodeRootOffset: 0x64
  },
  chatroomInfo: {
    nodeOffset: 0x2FFDDC8,
    nodeRootOffset: 0x8c8
  },
  sendTxtMsg: {
    callOffset: 0xCE6C80
  },
  sendPicMsg: {
    call1: 0x768140,
    call2: 0xf59e40,
    call3: 0xce6640
  }
};



/*------------------global-------------------------------------------*/
const availableVersion = 1661534743 ////3.9.2.23  ==0x63090217

const moduleBaseAddress = Module.getBaseAddress('WeChatWin.dll')
const moduleLoad = Module.load('WeChatWin.dll')
//1575CF98


/*---------------base -------------------------*/

let retidPtr=null
let retidStruct=null
const initidStruct = ((str) => {

  retidPtr = Memory.alloc(str.length * 2 + 1)
  retidPtr.writeUtf16String(str)

  retidStruct = Memory.alloc(0x14) // returns a NativePointer

  retidStruct
    .writePointer(retidPtr).add(0x04)
    .writeU32(str.length * 2).add(0x04)
    .writeU32(str.length * 2).add(0x04)
    .writeU32(0).add(0x04)
    .writeU32(0)

  return retidStruct
})

let retPtr = null
let retStruct = null
const initStruct = ((str) => {

  retPtr = Memory.alloc(str.length * 2 + 1)
  retPtr.writeUtf16String(str)

  retStruct = Memory.alloc(0x14) // returns a NativePointer

  retStruct
    .writePointer(retPtr).add(0x04)
    .writeU32(str.length * 2).add(0x04)
    .writeU32(str.length * 2).add(0x04)
    .writeU32(0).add(0x04)
    .writeU32(0)

  return retStruct
})

let msgstrPtr=null
let msgStruct=null
const initmsgStruct = ((str) => {
  msgstrPtr = Memory.alloc(str.length * 2 + 1)
  msgstrPtr.writeUtf16String(str)

  msgStruct = Memory.alloc(0x14) // returns a NativePointer

  msgStruct
    .writePointer(msgstrPtr).add(0x04)
    .writeU32(str.length * 2).add(0x04)
    .writeU32(str.length * 2).add(0x04)
    .writeU32(0).add(0x04)
    .writeU32(0)

  return msgStruct
})

let atStruct = null
const initAtMsgStruct = ((wxidStruct) => {

  atStruct = Memory.alloc(0x10)

  atStruct.writePointer(wxidStruct).add(0x04)
    .writeU32(wxidStruct.toInt32() + 0x14).add(0x04)//0x14 = sizeof(wxid structure)
    .writeU32(wxidStruct.toInt32() + 0x14).add(0x04)
    .writeU32(0)
  return atStruct
})
const readStringPtr = (address) => {
  const addr = ptr(address)
  const size = addr.add(16).readU32()
  const capacity = addr.add(20).readU32()
  addr.ptr = addr
  addr.size = size
  addr.capacity = capacity
  if (capacity > 15 && !addr.readPointer().isNull()) {
    addr.ptr = addr.readPointer()
  }
  addr.ptr._readCString = addr.ptr.readCString
  addr.ptr._readAnsiString = addr.ptr.readAnsiString
  addr.ptr._readUtf8String = addr.ptr.readUtf8String
  addr.readCString = () => {
    return addr.size ? addr.ptr._readCString(addr.size) : ''
  }
  addr.readAnsiString = () => {
    return addr.size ? addr.ptr._readAnsiString(addr.size) : ''
  }
  addr.readUtf8String = () => {
    return addr.size ? addr.ptr._readUtf8String(addr.size) : ''
  }

  // console.log('readStringPtr() address:',address,' -> str ptr:', addr.ptr, 'size:', addr.size, 'capacity:', addr.capacity)
  // console.log('readStringPtr() str:' , addr.readUtf8String())
  // console.log('readStringPtr() address:', addr,'dump:', addr.readByteArray(24))

  return addr
}

// std::wstring
// const wstr = readWStringPtr(ptr).readUtf16String()
const readWStringPtr = (address) => {
  const addr = ptr(address)
  const size = addr.add(4).readU32()
  const capacity = addr.add(8).readU32()
  addr.ptr = addr.readPointer()
  addr.size = size
  addr.capacity = capacity
  addr.ptr._readUtf16String = addr.ptr.readUtf16String
  addr.readUtf16String = () => {
    return addr.size ? addr.ptr._readUtf16String(addr.size * 2) : ''
  }

  // console.log('readWStringPtr() address:',address,' -> ptr:', addr.ptr, 'size:', addr.size, 'capacity:', addr.capacity)
  // console.log('readWStringPtr() str:' ,  `"${addr.readUtf16String()}"`,'\n',addr.ptr.readByteArray(addr.size*2+2),'\n')
  // console.log('readWStringPtr() address:', addr,'dump:', addr.readByteArray(16),'\n')

  return addr
}

const readString = (address) => {
  return readStringPtr(address).readUtf8String()
}

const readWideString = (address) => {
  return readWStringPtr(address).readUtf16String()
}


/*-----------------base-------------------------*/

let currentVersion = 0

let nodeList = [] //for contact
let contactList = [] //for contact

let chatroomNodeList = [] //for chatroom
let chatroomMemberList = [] //for chatroom
let loggedIn = false



const getWechatVersionFunction = (() => {
  if (currentVersion) {
    return currentVersion
  }
  const pattern = '55 8B ?? 83 ?? ?? A1 ?? ?? ?? ?? 83 ?? ?? 85 ?? 7F ?? 8D ?? ?? E8 ?? ?? ?? ?? 84 ?? 74 ?? 8B ?? ?? ?? 85 ?? 75 ?? E8 ?? ?? ?? ?? 0F ?? ?? 0D ?? ?? ?? ?? A3 ?? ?? ?? ?? A3 ?? ?? ?? ?? 8B ?? 5D C3'
  const results = Memory.scanSync(moduleLoad.base, moduleLoad.size, pattern)
  if (results.length == 0) {
    return 0
  }
  const addr = results[0].address
  const ret = addr.add(0x07).readPointer()
  const ver = ret.add(0x0).readU32()
  currentVersion = ver
  return ver
})

// 011
const getWechatVersionStringFunction = ((ver = getWechatVersionFunction()) => {
  if (!ver) {
    return '0.0.0.0'
  }
  const vers = []
  vers.push((ver >> 24) & 255 - 0x60)
  vers.push((ver >> 16) & 255)
  vers.push((ver >> 8) & 255)
  vers.push(ver & 255)
  return vers.join('.')
})

const checkSupportedFunction = (() => {
  const ver = getWechatVersionFunction()
  return ver == availableVersion
})

// 019
const recvMsgNativeCallback = (() => {


  const nativeCallback = new NativeCallback(() => {}, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'int32'])
  const nativeativeFunction = new NativeFunction(nativeCallback, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'int32'])

  Interceptor.attach(
    moduleBaseAddress.add(offset.hook_point), {
      onEnter() {
        const addr = this.context.ecx //0xc30-0x08
        const msgType = addr.add(0x38).readU32()
        const isMyMsg = addr.add(0x3C).readU32() //add isMyMsg

        if (msgType > 0) {

          const talkerIdPtr = addr.add(0x48).readPointer()
          //console.log('txt msg',talkerIdPtr.readUtf16String())
          const talkerIdLen = addr.add(0x48 + 0x04).readU32() * 2 + 2

          const myTalkerIdPtr = Memory.alloc(talkerIdLen)
          Memory.copy(myTalkerIdPtr, talkerIdPtr, talkerIdLen)


          let contentPtr = null
          let contentLen = 0
          let myContentPtr = null
          if (msgType == 3) { // pic path
            let thumbPtr = addr.add(0x198).readPointer();
            let hdPtr = addr.add(0x1ac).readPointer();
            let thumbPath = thumbPtr.readUtf16String();
            let hdPath = hdPtr.readUtf16String();
            let picData = [
              thumbPath, //  PUPPET.types.Image.Unknown
              thumbPath, //  PUPPET.types.Image.Thumbnail
              hdPath, //  PUPPET.types.Image.HD
              hdPath //  PUPPET.types.Image.Artwork
            ]
            let content = JSON.stringify(picData);
            myContentPtr = Memory.allocUtf16String(content);
          } else {
            contentPtr = addr.add(0x70).readPointer()
            contentLen = addr.add(0x70 + 0x04).readU32() * 2 + 2
            myContentPtr = Memory.alloc(contentLen)
            Memory.copy(myContentPtr, contentPtr, contentLen)
          }

          //  console.log('----------------------------------------')
          //  console.log(msgType)
          //  console.log(contentPtr.readUtf16String())
          //  console.log('----------------------------------------')
          const groupMsgAddr = addr.add(0x174).readU32() //* 2 + 2
          let myGroupMsgSenderIdPtr = null
          if (groupMsgAddr == 0) { //weChatPublic is zero，type is 49

            myGroupMsgSenderIdPtr = Memory.alloc(0x10)
            myGroupMsgSenderIdPtr.writeUtf16String("null")

          } else {

            const groupMsgSenderIdPtr = addr.add(0x174).readPointer()
            const groupMsgSenderIdLen = addr.add(0x174 + 0x04).readU32() * 2 + 2
            myGroupMsgSenderIdPtr = Memory.alloc(groupMsgSenderIdLen)
            Memory.copy(myGroupMsgSenderIdPtr, groupMsgSenderIdPtr, groupMsgSenderIdLen)

          }

          const xmlNullPtr = addr.add(0x1f0).readU32() //3.9.2.23
          let myXmlContentPtr = null
          if (xmlNullPtr == 0) {

            myXmlContentPtr = Memory.alloc(0x10)
            myXmlContentPtr.writeUtf16String("null")

          } else {
            const xmlContentPtr = addr.add(0x1f0).readPointer() //3.9.2.23

            const xmlContentLen = addr.add(0x1f0 + 0x04).readU32() * 2 + 2
            myXmlContentPtr = Memory.alloc(xmlContentLen)
            Memory.copy(myXmlContentPtr, xmlContentPtr, xmlContentLen)
          }

          setImmediate(() => nativeativeFunction(msgType, myTalkerIdPtr, myContentPtr, myGroupMsgSenderIdPtr, myXmlContentPtr, isMyMsg))
        }
      }
    })
  return nativeCallback
})()


const getBaseNodeAddress = (() => {
  return moduleBaseAddress.add(offset.contactInfo.nodeOffset).readPointer()
})

// 004
const getHeaderNodeAddress = (() => {
  const baseAddress = getBaseNodeAddress()
  //console.log('baseAddress',baseAddress)
  if (baseAddress.isNull()) {
    return baseAddress
  }

  //console.log('HeaderNodeAddress',baseAddress.add(offset.handle_offset).readPointer())
  return baseAddress.add(offset.contactInfo.nodeRootOffset).readPointer()
})

const getMyselfInfoFunction = (() => {

  let ptr = 0
  let wx_code = ''
  let wx_id = ''
  let wx_name = ''
  let head_img_url = ''

  const base = moduleBaseAddress.add(offset.myselfinfo.offset)
  const wxid_len = base.add(offset.myselfinfo.wxid_len_offset).readU32()

  if (wxid_len === 0x13) { // 新版本微信
    wx_id = base.readPointer().readAnsiString(wxid_len)
    wx_code = base.add(offset.myselfinfo.wxcode_new).readAnsiString()
  } else {
    wx_id = readString(base)
    wx_code = wx_id
  }


  wx_name = readString(base.add(offset.myselfinfo.wx_nick_name))
  const img_addr = base.add(offset.myselfinfo.head_img_url).readPointer()
  const img_len = base.add(offset.myselfinfo.head_img_url_len).readU32()

  head_img_url = img_addr.readAnsiString(img_len)

  const myself = {
    id: wx_id,
    code: wx_code,
    name: wx_name,
    head_img_url: head_img_url,
  };

  return JSON.stringify(myself)

})


const recurseNew = ((node) => {
  const headerNodeAddress = getHeaderNodeAddress()
  if (headerNodeAddress.isNull()) {
    return
  }

  if (node.equals(headerNodeAddress)) {
    return
  }

  for (const item in nodeList) {
    if (node.equals(nodeList[item])) {
      return
    }
  }


  nodeList.push(node)
  const id = readString(node.add(0x8))
  //wxid, format relates to registration method
  const wxid = readWideString(node.add(0x30))
  //console.log('-----------',wxid)


  //custom id, if not set return null, and use wxid which should be custom id
  //const wx_code = readWideString(node.add(0x4c)) || readWideString(node.add(0x38))

  //custom Nickname
  const name = readWideString(node.add(0x8c))

  //alias aka 'remark' in wechat
  //const alias = readWideString(node.add(0x80))

  //avatarUrl
  //const avatar = readWideString(node.add(0x138))
  //const avatar = Memory.readUtf16String(node.add(0x138).readPointer())
  //contact gender
  //const gender = node.add(0x18C).readU32()

  const contactJson = {
    id1: id,
    id: wxid,
    name: name,
    /*code: wx_code,
    name: name,
    alias: alias,
    avatarUrl: avatar,
    gender: gender,*/
  }

  contactList.push(contactJson)

  const leftNode = node.add(0x0).readPointer()
  const centerNode = node.add(0x04).readPointer()
  //const rightNode = node.add(0x08).readPointer()

  recurseNew(leftNode)
  recurseNew(centerNode)
  //recurse(rightNode)

  const allContactJson = contactList
  return allContactJson

})


const getContactNativeFunction = (() => {
  const headerNodeAddress = getHeaderNodeAddress()
  //console.log('headerNodeAddress',headerNodeAddress)

  if (headerNodeAddress.isNull()) {
    return '[]'
  }

  const node = headerNodeAddress.add(0x0).readPointer()
  const ret = recurseNew(node)

  //console.log(ret)

  console.log('getContactNativeFunction:', ret.length)
  /*for (let item of ret){
    console.log(JSON.stringify(item))
  }*/
  //console.log(ret.contact)
  const cloneRet = JSON.stringify(ret)
  nodeList.length = 0
  contactList.length = 0

  return cloneRet
})


const getChatroomNodeAddress = (() => {
  const baseAddress = moduleBaseAddress.add(offset.chatroomInfo.nodeOffset).readPointer()
  if (baseAddress.isNull()) {
    return baseAddress
  }
  return baseAddress.add(offset.chatroomInfo.nodeRootOffset).readPointer()
})

const chatroomRecurse = ((node) => {
  const chatroomNodeAddress = getChatroomNodeAddress()
  if (chatroomNodeAddress.isNull()) {
    return
  }

  if (node.equals(chatroomNodeAddress)) {
    return
  }

  for (const item in chatroomNodeList) {
    if (node.equals(chatroomNodeList[item])) {
      return
    }
  }

  chatroomNodeList.push(node)
  const roomid = readWideString(node.add(0x10))

  const len = node.add(0x54).readU32() //
  //const memberJson={}
  if (len > 4) { //
    const memberStr = readString(node.add(0x44))
    if (memberStr.length > 0) {
      const memberList = memberStr.split(/[\\^][G]/)
      const memberJson = {
        roomid: roomid,
        roomMember: memberList
      }

      chatroomMemberList.push(memberJson)
    }

  }

  const leftNode = node.add(0x0).readPointer()
  const centerNode = node.add(0x04).readPointer()
  const rightNode = node.add(0x08).readPointer()

  chatroomRecurse(leftNode)
  chatroomRecurse(centerNode)
  chatroomRecurse(rightNode)

  const allChatroomMemberJson = chatroomMemberList
  return allChatroomMemberJson
})

const getChatroomMemberInfoFunction = (() => {
  const chatroomNodeAddress = getChatroomNodeAddress()
  if (chatroomNodeAddress.isNull()) {
    return '[]'
  }

  const node = chatroomNodeAddress.add(0x0).readPointer()
  const ret = chatroomRecurse(node)

  const cloneRet = JSON.stringify(ret)
  chatroomNodeList.length = 0 //empty
  chatroomMemberList.length = 0 //empty
  return cloneRet
})



/**
 * sendMsgNativeFunction
 * send text message
 * @param {string} talkerId = wxid or roomid
 * @param {string} content 
 */
const sendMsgNativeFunction = ((talkerId, content) => {

  const txtAsm = Memory.alloc(Process.pageSize)
  //const buffwxid = Memory.alloc(0x20)


  let wxidPtr = Memory.alloc(talkerId.length * 2 + 2)
  wxidPtr.writeUtf16String(talkerId)

  let picWxid = Memory.alloc(0x0c)
  picWxid.writePointer(ptr(wxidPtr)).add(0x04)
    .writeU32(talkerId.length * 2).add(0x04)
    .writeU32(talkerId.length * 2).add(0x04)

  let contentPtr = Memory.alloc(content.length * 2 + 2)
  contentPtr.writeUtf16String(content)

  const sizeOfStringStruct = Process.pointerSize * 5
  let contentStruct = Memory.alloc(sizeOfStringStruct)

  contentStruct
    .writePointer(contentPtr).add(0x4)
    .writeU32(content.length).add(0x4)
    .writeU32(content.length * 2)


  const ecxBuffer = Memory.alloc(0x2d8)

  Memory.patchCode(txtAsm, Process.pageSize, code => {
    var cw = new X86Writer(code, {
      pc: txtAsm
    })
    cw.putPushfx()
    cw.putPushax()

    cw.putPushU32(0x0)
    cw.putPushU32(0x0)
    cw.putPushU32(0x0)
    cw.putPushU32(0x1)
    cw.putPushU32(0x0)

    //cw.putMovRegReg

    cw.putMovRegAddress('eax', contentStruct)
    cw.putPushReg('eax')

    cw.putMovRegAddress('edx', picWxid) //room_id

    cw.putMovRegAddress('ecx', ecxBuffer)
    cw.putCallAddress(moduleBaseAddress.add(
      offset.sendTxtMsg.callOffset
    ))

    cw.putAddRegImm('esp', 0x18)
    cw.putPopax()
    cw.putPopfx()
    cw.putRet()
    cw.flush()

  })

  console.log('----------txtAsm', txtAsm)
  const nativeativeFunction = new NativeFunction(ptr(txtAsm), 'void', [])
  nativeativeFunction()

})


let asmAtMsg = null
let roomid_, msg_, wxid_, atid_
let ecxBuffer
const sendAtMsgNativeFunction = ((roomId, text, contactId,nickname) => {

  asmAtMsg = Memory.alloc(Process.pageSize)
  ecxBuffer = Memory.alloc(0x3b0)

  const atContent = '@'+nickname+' '+text

  roomid_ = initStruct(roomId)
  wxid_ = initidStruct(contactId)
  msg_ = initmsgStruct(atContent)
  atid_ = initAtMsgStruct(wxid_)

  Memory.patchCode(asmAtMsg, Process.pageSize, code => {
    var cw = new X86Writer(code, {
      pc: asmAtMsg
    })
    cw.putPushfx()
    cw.putPushax()

    cw.putPushU32(0x0)
    cw.putPushU32(0x0)
    cw.putPushU32(0x0)
    cw.putPushU32(0x1)
    //cw.putPushU32(0x0)
    cw.putMovRegAddress('eax', atid_)
    cw.putPushReg('eax')

    //cw.putMovRegReg

    cw.putMovRegAddress('eax', msg_)
    cw.putPushReg('eax')

    cw.putMovRegAddress('edx', roomid_) //room_id

    cw.putMovRegAddress('ecx', ecxBuffer)
    cw.putCallAddress(moduleBaseAddress.add(
      offset.sendTxtMsg.callOffset
    ))

    cw.putAddRegImm('esp', 0x18)
    cw.putPopax()
    cw.putPopfx()
    cw.putRet()
    cw.flush()

  })

  //console.log('----------txtAsm', asmAtMsg)
  const nativeativeFunction = new NativeFunction(ptr(asmAtMsg), 'void', [])
  nativeativeFunction()

})

/**
 * 
 * @param {*} contactId 
 * @param {*} path 
 */
const sendPicMsgNativeFunction = ((contactId, path) => {

  const picAsm = Memory.alloc(Process.pageSize)
  const buffwxid = Memory.alloc(0x20)
  const picbuff = Memory.alloc(0x2D8)

  let pathPtr = Memory.alloc(path.length * 2 + 1)
  pathPtr.writeUtf16String(path)

  let imagefilepath = Memory.alloc(0x24)
  imagefilepath.writePointer(pathPtr).add(0x04)
    .writeU32(path.length * 2).add(0x04)
    .writeU32(path.length * 2).add(0x04)

  let picWxidPtr = Memory.alloc(contactId.length * 2 + 1)
  picWxidPtr.writeUtf16String(contactId)

  let picWxid = Memory.alloc(0x0c)
  picWxid.writePointer(ptr(picWxidPtr)).add(0x04)
    .writeU32(contactId.length * 2).add(0x04)
    .writeU32(contactId.length * 2).add(0x04)


  //const test_offset1 = 0x701DC0;
  Memory.patchCode(picAsm, Process.pageSize, code => {
    var cw = new X86Writer(code, {
      pc: picAsm
    })
    cw.putPushfx();
    cw.putPushax();
    cw.putCallAddress(moduleBaseAddress.add(
      offset.sendPicMsg.call1
    ))
    cw.putMovRegReg('edx', 'eax') //缓存

    cw.putSubRegImm('esp', 0x14)
    cw.putMovRegAddress('eax', buffwxid)
    cw.putMovRegReg('ecx', 'esp')
    cw.putMovRegAddress('edi', imagefilepath)
    cw.putPushReg('eax')
    cw.putCallAddress(moduleBaseAddress.add(
      offset.sendPicMsg.call2
    ))

    cw.putMovRegReg('ecx', 'edx')
    cw.putMovRegAddress('eax', picWxid) //=lea
    cw.putMovRegAddress('edi', imagefilepath)
    cw.putPushReg('edi')
    cw.putPushReg('eax')
    cw.putMovRegAddress('eax', picbuff)
    cw.putPushReg('eax')

    cw.putMovRegAddress('edi', picWxid) //edi 
    cw.putCallAddress(moduleBaseAddress.add(
      offset.sendPicMsg.call3
    ))



    cw.putPopax()
    cw.putPopfx()
    cw.putRet()
    cw.flush()

  })

  //console.log('----------picAsm',picAsm)
  const nativeativeFunction = new NativeFunction(ptr(picAsm), 'void', [])
  nativeativeFunction()

})




let memberNickBuffAsm = null
let nickRoomId = null
let nickMemberId = null
let nickBuff = null
const getChatroomMemberNickInfoFunction = ((memberId, roomId) => {

  nickBuff = Memory.alloc(0x7e4)
  //const nickRetAddr = Memory.alloc(0x04)
  memberNickBuffAsm = Memory.alloc(Process.pageSize)
  //console.log('asm address----------',memberNickBuffAsm)
  nickRoomId = initidStruct(roomId)
  //console.log('nick room id',nickRoomId)
  nickMemberId = initStruct(memberId)

  //console.log('nick nickMemberId id',nickMemberId)
  //const nickStructPtr = initmsgStruct('')

  Memory.patchCode(memberNickBuffAsm, Process.pageSize, code => {
    var cw = new X86Writer(code, {
      pc: memberNickBuffAsm
    })
    cw.putPushfx()
    cw.putPushax()
    cw.putMovRegAddress('edi', nickRoomId)
    cw.putMovRegAddress('eax', nickBuff)
    cw.putMovRegReg('edx', 'edi')
    cw.putPushReg('eax')
    cw.putMovRegAddress('ecx', nickMemberId)
    cw.putCallAddress(moduleBaseAddress.add(0xC06F10))
    cw.putAddRegImm('esp', 0x04)
    cw.putPopax()
    cw.putPopfx()
    cw.putRet()
    cw.flush()

  })

  const nativeativeFunction = new NativeFunction(ptr(memberNickBuffAsm), 'void', [])
  nativeativeFunction()

  const nickname = readWideString(nickBuff)
  // console.log('----nickname', nickname)
  return readWideString(nickBuff)
})

const isLoggedInFunction = (() => {
  // loggedIn = moduleBaseAddress.add(offset.is_logged_in_offset).readU32()
  // return !!loggedIn
  return true
})