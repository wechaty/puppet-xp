/**
 *  > Special thanks to: @cixingguangming55555 老张学技术
 *
 * Credit: https://github.com/cixingguangming55555/wechat-bot
 */

//https://blog.csdn.net/iloveitvm/article/details/109119687  frida学习

//const { isNullishCoalesce } = require("typescript")

// wechat:3.9.2.23

// 028 done
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

// 029 done
/*------------------global-------------------------------------------*/
const availableVersion = 1661534743 ////3.9.2.23  ==0x63090217

const moduleBaseAddress = Module.getBaseAddress('WeChatWin.dll')
const moduleLoad = Module.load('WeChatWin.dll')
// tbd
const g_EDIPtr = moduleBaseAddress.add(0x222f38c).readPointer().add(0xD70).readPointer()//
const g_EDIU32 = moduleBaseAddress.add(0x222f38c).readPointer().add(0xD70).readU32()
/*------------------global-------------------------------------------*/

/*---------------base -------------------------*/
// 030 done
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

// 031 done
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

// 032 done
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

// 034 done
/**
* at msg structure
*/
let atStruct = null
const initAtMsgStruct = ((wxidStruct) => {

  atStruct = Memory.alloc(0x10)

  atStruct.writePointer(wxidStruct).add(0x04)
    .writeU32(wxidStruct.toInt32() + 0x14).add(0x04)//0x14 = sizeof(wxid structure)
    .writeU32(wxidStruct.toInt32() + 0x14).add(0x04)
    .writeU32(0)
  return atStruct
})

// 033 tbd
let retidNullStruct = null
let retidNullPtr = null
const initNullIdStruct = ((str) => {

  retidNullPtr = Memory.alloc(str.length * 2 + 1)
  retidNullPtr.writeUtf16String(str)

  retidNullStruct = Memory.alloc(0x14) // returns a NativePointer

  retidNullStruct
    .writePointer(retidNullPtr).add(0x04)
    .writeU32(str.length * 2).add(0x04)
    .writeU32(str.length * 2).add(0x04)
    .writeU32(0).add(0x04)
    .writeU32(0)

  return retidNullStruct
})

// 035 done
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

// 036 done
const readString = (address) => {
  return readStringPtr(address).readUtf8String()
}

// 037 done
const readWideString = (address) => {
  return readWStringPtr(address).readUtf16String()
}
/*-----------------base-------------------------*/

// 041
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

/*-----------------base-------------------------*/

// 010 done
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

// 011 done
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

// 012 done
const checkSupportedFunction = (() => {
  const ver = getWechatVersionFunction()
  return ver == availableVersion
})

// 019 done
/**
 * @Hook: recvMsg -> recvMsgNativeCallback
 */
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
          const groupMsgAddr = addr.add(0x170).readU32() //* 2 + 2
          let myGroupMsgSenderIdPtr = null
          if (groupMsgAddr == 0) { //weChatPublic is zero，type is 49

            myGroupMsgSenderIdPtr = Memory.alloc(0x10)
            myGroupMsgSenderIdPtr.writeUtf16String("null")

          } else {

            const groupMsgSenderIdPtr = addr.add(0x170).readPointer()
            const groupMsgSenderIdLen = addr.add(0x170 + 0x04).readU32() * 2 + 2
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

// 003 done
const getBaseNodeAddress = (() => {
  return moduleBaseAddress.add(offset.contactInfo.nodeOffset).readPointer()
})

// 004 done
const getHeaderNodeAddress = (() => {
  const baseAddress = getBaseNodeAddress()
  //console.log('baseAddress',baseAddress)
  if (baseAddress.isNull()) {
    return baseAddress
  }

  //console.log('HeaderNodeAddress',baseAddress.add(offset.handle_offset).readPointer())
  return baseAddress.add(offset.contactInfo.nodeRootOffset).readPointer()
})

// 006 done
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

// 043 done
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

// 044 done
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

// 0xx done
const getChatroomNodeAddress = (() => {
  const baseAddress = moduleBaseAddress.add(offset.chatroomInfo.nodeOffset).readPointer()
  if (baseAddress.isNull()) {
    return baseAddress
  }
  return baseAddress.add(offset.chatroomInfo.nodeRootOffset).readPointer()
})

// 008chatroom member done
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

// 009 done
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

// 024 done
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

// 023 done
/**
* send at msg
*/
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

// 022 done
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

// 020 done
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
  console.log('----nickname', nickname)
  return readWideString(nickBuff)
})

/* 由此之后是3.9.2.23中缺失的未实现方法 */

// 038 初始化全局变量 tbd
let g_initTestAsm = null
let g_BufferEbp2C = null
let g_initECXU32 = null
let g_initECXPtr = null
let g_initEBXPtr = null
let g_initEBX = null

let g_attatchEBP210Buffer = null
let g_attatchPathPtr = null
let g_attatchPath = null
let g_attatchEBPAc = null
let g_attatchEBPAcBufPtr = null

let g_attatchContactIdPtr = null
//let g_attatchECXBuffer    = null
let g_attatchESIU32 = null

let g_initECXTempPtr = null
const initGlobal = ((contactId, attatchFile) => {

  //const base = moduleBaseAddress.add(0x222f38c).readPointer()
  //g_EDI = base.add(0xD70).readPointer()//0x438+0x938
  console.log('------------g_attatchEBPAc', g_attatchEBPAc)
  console.log('------------g_EDIU32', g_EDIU32)
  g_initTestAsm = Memory.alloc(Process.pageSize)
  console.log('------------address', g_initTestAsm)

  g_initECXPtr = g_EDIPtr.add(0xB80).readPointer().add(0x1640)
  g_initECXTempPtr = g_EDIPtr.add(0xB88).readPointer()
  g_initECXU32 = g_initECXPtr.toInt32()
  g_attatchESIU32 = g_EDIU32

  console.log('------------g_initECXU32', g_initECXU32)
  console.log('------------g_initESIU32', g_attatchESIU32)


  //console.log('==========g_initECXPtr',g_initECXPtr)
  //console.log('==========g_EDIU32',g_EDIU32)

  //g_attatchECXBuffer = Memory.alloc(0x1024)
  //Memory.copy(g_attatchECXBuffer, g_initECXPtr, 0x1024)

  g_BufferEbp2C = Memory.alloc(0x48)

  //g_initEBX        = moduleBaseAddress.add(0x2251724).readPointer().readPointer()
  //g_initEBXPtr     = Memory.alloc(0x14).writePointer(g_initEBX)
  //g_initEBXPtr.add(0x08).writePointer(g_BufferEbp2C)

  g_attatchPathPtr = Memory.alloc(attatchFile.length * 2 + 2)
  g_attatchPathPtr.writeUtf16String(attatchFile)

  g_attatchPath = Memory.alloc(0x28)
  g_attatchPath.writePointer(g_attatchPathPtr).add(0x04)
    .writeU32(attatchFile.length * 2).add(0x04)
    .writeU32(attatchFile.length * 2).add(0x04)
  /*---------------------------------ebp-210----------------*/
  g_attatchEBP210Buffer = Memory.alloc(0x48)
  g_attatchEBP210Buffer.writeU32(0x3)
  g_attatchEBP210Buffer.add(0x4).writePointer(g_attatchPathPtr)
  g_attatchEBP210Buffer.add(0x8).writeU32(attatchFile.length * 2)
  g_attatchEBP210Buffer.add(0xC).writeU32(attatchFile.length * 2)
  g_attatchEBP210Buffer.add(0x2C).writeU32(moduleBaseAddress.add(0x2ECE87).toInt32())
  //console.log('------------g_attatchEBP210Buffer',g_attatchEBP210Buffer)
  /*---------------------------------ebp-210----------------*/

  //g_attatchContactIdPtr = Memory.alloc(0x4)
  //g_attatchContactIdPtr.writeUtf16String(contactId)
  //console.log('------------g_attatchEBP210Buffer',g_attatchEBP210Buffer)
  g_attatchEBPAc = Memory.alloc(0x140)
  //g_attatchEBPAcBufPtr = Memory.alloc(0x100)
  //g_attatchEBPAc.writePointer(g_attatchEBP210Buffer)
  //g_attatchEBPAc.add(0x4).writePointer(g_attatchEBPAcBufPtr)
  //g_attatchEBPAc.add(0x8).writePointer(g_attatchEBPAcBufPtr)
  g_attatchEBPAc.add(0x10).writeU32(g_EDIU32)
  console.log('------------g_attatchEBPAc', g_attatchEBPAc)

  /*g_attatchECXBuffer.add(0x18).writePointer(g_attatchContactIdPtr)
  g_attatchECXBuffer.add(0x1C).writeU32(contactId.length*2)
                       .add(0x04).writeU32(contactId.length*2)*/



  //g_attatchESIU32 = g_EDI.toInt32()


  //console.log('------------g_attatchESIU32',g_attatchESIU32)
  //console.log('==========g_attatchECXBuffer',g_attatchECXBuffer)

  Memory.patchCode(g_initTestAsm, Process.pageSize, code => {
    var cw = new X86Writer(code, { pc: g_initTestAsm })
    cw.putPushfx()
    cw.putPushax()
    //cw.putMovRegAddress('eax', g_attatchEBP210Buffer)

    /*cw.putMovRegAddress('edi',g_EDIPtr)
    cw.putMovRegReg('esi','edi')
    cw.putMovRegAddress('eax',g_BufferEbp2C)
    cw.putMovRegAddress('ecx',g_initECXTempPtr)
    cw.putPushReg('eax')
    cw.putCallAddress(moduleBaseAddress.add(0x131bb0))*/

    //cw.putMovRegOffsetPtrU32('ebp', -20, 0)

    /*cw.putPushU32(0)
    cw.putMovRegAddress('eax', g_attatchPathPtr)
    cw.putPushReg('eax')
    cw.putPushU32(3)
    cw.putMovRegAddress('ecx', g_attatchEBP210Buffer)
    cw.putCallAddress(moduleBaseAddress.add(0x130220))*/


    /*cw.putMovRegAddress('edi', g_attatchEBPAc)//后面要用的的ebp-2c
    cw.putMovRegAddress('ecx', g_attatchEBP210Buffer)
    cw.putPushReg('ecx')
    cw.putMovRegU32('eax',0)
    cw.putPushReg('eax')//push eax
    cw.putMovRegReg('ecx', 'edi')
    cw.putMovRegAddress('esi',g_attatchPathPtr)
    cw.putCallAddress(moduleBaseAddress.add(0x138880))*/


    /*cw.putSubRegImm('esp',0x14)
    cw.putMovRegU32('ecx',g_initECXU32)
    cw.putMovRegU32('esi',g_attatchESIU32)
    cw.putMovRegAddress('eax', g_attatchEBPAc)
    cw.putPushReg('eax')
    cw.putCallAddress(moduleBaseAddress.add(0x173620))*/
    //cw.putCallAddress(moduleBaseAddress.add(0x522590))

    /** g_attatchEBPAc*/
    //cw.putMovRegNearPtr('eax', g_attatchEBPAc)
    //cw.putMovNearPtrReg(g_attatchEBPAc.add(0xc), 'eax')
    /** g_attatchEBPAc*/


    //cw.putMovRegAddress('ebx', g_initEBXPtr)
    //cw.putMovRegU32('edi', g_EDI.toInt32())
    //cw.putMovRegU32('esi', g_EDI.toInt32())
    /*cw.putMovRegU32('ecx', g_initECX)
    cw.putMovRegAddress('eax', g_BufferEbp2C)
    cw.putPushReg('eax')
    cw.putCallAddress(moduleBaseAddress.add(0x131BB0))*/

    cw.putPopax()
    cw.putPopfx()
    cw.putRet()
    cw.flush()

  })

  const nativeativeFunction = new NativeFunction(ptr(g_initTestAsm), 'void', [])
  nativeativeFunction()
})

// 039 
let g_personal_detail_ebx = null
let g_personal_detail_asm = null
let g_personal_wxid = null
let g_personal_wxid_ptr = null
const getOldTest = ((wxid) => {//personal detail

  g_personal_detail_asm = Memory.alloc(Process.pageSize)
  g_personal_detail_ebx = moduleBaseAddress.add(0x222F38C).readPointer().add(0xFB8).toInt32()

  g_personal_wxid_ptr = Memory.alloc(wxid.length * 2 + 2)
  g_personal_wxid_ptr.writeUtf16String(wxid)

  g_personal_wxid = Memory.alloc(0x14)
  g_personal_wxid.writePointer(ptr(g_personal_wxid_ptr)).add(0x04)
    .writeU32(wxid.length * 2).add(0x04)
    .writeU32(wxid.length * 2).add(0x08)

  console.log('-----------address----------', g_personal_detail_asm)

  Memory.patchCode(g_personal_detail_asm, Process.pageSize, code => {
    var cw = new X86Writer(code, { pc: g_personal_detail_asm })
    cw.putPushfx()
    cw.putPushax()

    cw.putCallAddress(moduleBaseAddress.add(0x9A000))

    //78BA9ACE | E8 2D05D6FF       | call wechatwin.7890A000            |
    cw.putMovRegU32('ebx', g_personal_detail_ebx)
    cw.putMovRegReg('esi', 'eax')
    cw.putPushReg('ebx')
    cw.putSubRegImm('esp', 0x14)
    cw.putMovRegAddress('eax', g_personal_wxid)
    cw.putMovRegReg('ecx', 'esp')
    cw.putPushReg('eax')
    cw.putCallAddress(moduleBaseAddress.add(0x701DC0))
    cw.putMovRegReg('ecx', 'esi')
    cw.putCallAddress(moduleBaseAddress.add(0x4024A0))

    cw.putPopax()
    cw.putPopfx()
    cw.putRet()
    cw.flush()

  })

  const nativeativeFunction = new NativeFunction(ptr(g_personal_detail_asm), 'void', [])
  nativeativeFunction()


})

// const writeLogNativeCallback = (() => {
//   const nativeCallback = new NativeCallback(() => { }, 'void', [])
//   const nativeCallFunction = new NativeFunction(nativeCallback, 'void', [])

//   Interceptor.attach(
//     moduleBaseAddress.add(0x7008A4),
//     {
//       onEnter() {
//         const addr = this.context.eax//.sub(0x114)//0xc30-0x08
//         if(addr >0){
//           const log = ptr(addr).readAnsiString()
//         }
//       }
//     })
//   return nativeCallback
// })()

// 040
/**
 * test call
 */
let attatchTestAsm = null
let attatchTestEbp2C = null
let attatchGlobalEDI = null
let attatchGlobalEDIB88 = null
let attatchTestEBX = null
let g_tempEcx = null
let attatchFirstECX = null
//let attatchFirstECX  = null
let gattatchFilePtr = null
let gattatchFile = null
let gattatchReceiveIdPtr = null
let gattatchReceiveId = null
let attatchEAX3B0Buf = null

let attatchESIbuf = null
const getWxTest = ((contactId, filePath) => {
  //const nativeativeFunction = new NativeFunction(ptr(addr), 'void', [])
  //nativeativeFunction()
  attatchTestAsm = Memory.alloc(Process.pageSize)
  console.log('----------------address', attatchTestAsm)
  attatchTestEbp2C = Memory.alloc(0xC)
  attatchGlobalEDI = moduleBaseAddress.add(0x222f38c).readPointer()
    .add(0x938).add(0x438).readPointer()
  attatchGlobalEDIB88 = attatchGlobalEDI.add(0xB88).readPointer()
  attatchTestEBX = Memory.alloc(0x4)
  attatchTestEBX.writePointer(attatchGlobalEDI)
  console.log('----------------attatchGlobalEDI', attatchGlobalEDI)
  console.log('----------------attatchGlobalEDIB88', attatchGlobalEDIB88)

  attatchFirstECX = Memory.alloc(0x28)
  //const attatchSecondEcx = Memory.alloc(0x14)

  const contactIdLength = contactId.length * 2 + 2//edx
  const contractIdActLength = contactId.length


  gattatchReceiveIdPtr = Memory.alloc(contactId.length * 2 + 2)
  gattatchReceiveIdPtr.writeUtf16String(contactId)

  gattatchReceiveId = Memory.alloc(0x14)
  gattatchReceiveId.writePointer(ptr(gattatchReceiveIdPtr)).add(0x04)
    .writeU32(contactId.length * 2).add(0x04)
    .writeU32(contactId.length * 2).add(0x08)
  //console.log('----------------attatchGlobalEDIB88',attatchGlobalEDIB88)
  //return
  /*console.log(hexdump(attatchTestEBX, {
    offset: 0,
    length: 0x40,
    header: true,
    ansi: true
   }))
  return*/

  gattatchFilePtr = Memory.alloc(filePath.length * 2 + 2)
  gattatchFilePtr.writeUtf16String(filePath)

  gattatchFile = Memory.alloc(0x14)
  gattatchFile.writePointer(ptr(gattatchFilePtr)).add(0x04)
    .writeU32(filePath.length * 2).add(0x04)
    .writeU32(filePath.length * 2).add(0x08)

  const attatchLastECX = moduleBaseAddress.add(0x222f170).toInt32()

  attatchEAX3B0Buf = Memory.alloc(0x3B0)

  g_tempEcx = Memory.alloc(0x4)
  //g_tempEcx1 = Memory.alloc(0x4)

  attatchESIbuf = Memory.alloc(0x100)
  attatchESIbuf.add(0x0).writeU32(3)
  attatchESIbuf.add(0x4).writePointer(gattatchFilePtr)
  attatchESIbuf.add(0x8).writeU32(filePath.length * 2)
  attatchESIbuf.add(0xc).writeU32(filePath.length * 2)

  Memory.patchCode(attatchTestAsm, Process.pageSize, code => {
    var cw = new X86Writer(code, { pc: attatchTestAsm })
    cw.putPushfx()
    cw.putPushax()
    //cw.putMovRegU32('edi',attatchGlobalEDI)


    cw.putMovRegAddress('esi', attatchESIbuf)

    cw.putMovRegAddress('ecx', attatchFirstECX.add(0x14))
    cw.putMovRegAddress('eax', gattatchFile)
    cw.putPushReg('eax')
    cw.putCallAddress(moduleBaseAddress.add(0x701DC0))


    cw.putMovRegAddress('ecx', attatchFirstECX)
    cw.putMovRegU32('eax', contactIdLength)
    cw.putPushReg('eax')
    cw.putPushU32(0)
    cw.putCallAddress(moduleBaseAddress.add(0x1a11c83))
    cw.putAddRegImm('esp', 0x8)

    cw.putMovRegReg('edx', 'eax')
    cw.putMovNearPtrReg(attatchFirstECX, 'edx')
    cw.putMovRegU32('edi', contactIdLength)
    cw.putPushReg('edi')
    cw.putMovRegAddress('eax', gattatchReceiveIdPtr)//ebp-58
    cw.putPushReg('eax')
    cw.putMovRegNearPtr('eax', attatchFirstECX)
    cw.putPushReg('eax')
    cw.putCallAddress(moduleBaseAddress.add(0x1a1047a))
    cw.putAddRegImm('esp', 0x0c)

    //cw.putMovRegNearPtr('ecx',attatchFirstECX)
    //cw.putAddRegImm('esp', 0x0c)
    //cw.putMovRegU32('edx', 0)
    //cw.putMovRegRegPtr('eax', 'ecx')
    //cw.putMovNearPtrReg(attatchFirstECX.add(0x04),'edi')
    cw.putMovRegU32('edi', contactId.length * 2)
    cw.putMovRegU32('ecx', attatchLastECX)
    cw.putMovRegAddress('eax', attatchEAX3B0Buf)
    cw.putPushReg('eax')
    cw.putCallAddress(moduleBaseAddress.add(0x392260))

    cw.putMovRegAddress('ecx', attatchEAX3B0Buf)
    cw.putCallAddress(moduleBaseAddress.add(0x94200))

    cw.putPopax()
    cw.putPopfx()
    cw.putRet()
    cw.flush()

  })

  const nativeativeFunction = new NativeFunction(ptr(attatchTestAsm), 'void', [])
  nativeativeFunction()


})

// 001
const getTestInfoFunction = ((addr) => {
  const nativeativeFunction = new NativeFunction(ptr(addr), 'void', [])
  nativeativeFunction()

  //00CFE484


  /*MemoryAccessMonitor.enable({base:ptr(addr),size:0x01}, {
    onAccess(details){
      console.log('============')
      console.log(details.operation)
      console.log(details.from)
      console.log(details.address)
      console.log('============')
    }
  })*/

})

// 002 
const isLoggedInFunction = (() => {
  loggedIn = moduleBaseAddress.add(offset.is_logged_in_offset).readU32()
  return !!loggedIn
})

// 007 获得当前账号信息
const getMyselfIdFunction = (() => {

  let wx_id = readString(moduleBaseAddress.add(offset.wxid_offset))

  return wx_id

})

//contact
// 042
const recurse = ((node) => {
  const headerNodeAddress = getHeaderNodeAddress()
  if (headerNodeAddress.isNull()) { return }

  if (node.equals(headerNodeAddress)) { return }

  for (const item in nodeList) {
    if (node.equals(nodeList[item])) {
      return
    }
  }


  nodeList.push(node)
  //wxid, format relates to registration method
  const wxid = readWideString(node.add(0x38))

  //custom id, if not set return null, and use wxid which should be custom id
  const wx_code = readWideString(node.add(0x4c)) || readWideString(node.add(0x38))

  //custom Nickname
  const name = readWideString(node.add(0x94))

  //alias aka 'remark' in wechat
  const alias = readWideString(node.add(0x80))

  //avatarUrl
  const avatar = readWideString(node.add(0x138))
  //const avatar = Memory.readUtf16String(node.add(0x138).readPointer())
  //contact gender
  const gender = node.add(0x18C).readU32()

  const contactJson = {
    id: wxid,
    code: wx_code,
    name: name,
    alias: alias,
    avatarUrl: avatar,
    gender: gender,
  }

  contactList.push(contactJson)

  const leftNode = node.add(0x0).readPointer()
  const centerNode = node.add(0x04).readPointer()
  const rightNode = node.add(0x08).readPointer()

  recurse(leftNode)
  recurse(centerNode)
  recurse(rightNode)

  const allContactJson = contactList
  return allContactJson

})

// 013 
const isSupported = checkSupportedFunction()

if (!isSupported) {
  throw new Error(`Wechat version not supported. \nWechat version: ${getWechatVersionStringFunction()}, supported version: ${getWechatVersionStringFunction(availableVersion)}`)
}

// 015
const hookLogoutEventCallback = (() => {
  const nativeCallback = new NativeCallback(() => { }, 'void', ['int32'])
  const nativeativeFunction = new NativeFunction(nativeCallback, 'void', ['int32'])
  Interceptor.attach(moduleBaseAddress.add(offset.hook_on_logout_offset), {
    onEnter: function (args) {
      const bySrv = args[0].toInt32()
      setImmediate(() => nativeativeFunction(bySrv))
    }
  })
  return nativeCallback
})()

// 016
const hookLoginEventCallback = (() => {
  const nativeCallback = new NativeCallback(() => { }, 'void', [])
  const nativeativeFunction = new NativeFunction(nativeCallback, 'void', [])
  Interceptor.attach(moduleBaseAddress.add(offset.hook_on_login_offset), {
    onLeave: function (retval) {
      isLoggedInFunction()
      setImmediate(() => nativeativeFunction())
      return retval
    }
  })

  setTimeout(() => {
    if (isLoggedInFunction()) {
      setImmediate(() => nativeativeFunction())
    }
  }, 500);

  return nativeCallback
})()

// 017
const checkQRLoginNativeCallback = (() => {

  const nativeCallback = new NativeCallback(() => { }, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'int32', 'pointer'])
  const nativeativeFunction = new NativeFunction(nativeCallback, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'int32', 'pointer'])
  // const json = {
  //   status,
  //   uuid,
  //   wxid,
  //   avatarUrl,
  //   nickname,
  //   phoneType,
  //   phoneClientVer,
  //   pairWaitTip,
  // }

  const callback = {
    onLeave: function (retval) {
      const json = getQrcodeLoginData()
      if (json.status == 0) {
        // 当状态为 0 时，即未扫码。而其他状态会触发另一个方法，拥有更多数据。
        ret(json)
      }
      return retval
    },
  }

  const ret = (json) => {
    const arr = [
      json.status || 0,
      Memory.allocUtf8String(json.uuid ? `http://weixin.qq.com/x/${json.uuid}` : ''),
      Memory.allocUtf8String(json.wxid || ''),
      Memory.allocUtf8String(json.avatarUrl || ''),
      Memory.allocUtf8String(json.nickname || ''),
      Memory.allocUtf8String(json.phoneType || ''),
      json.phoneClientVer || 0,
      Memory.allocUtf8String(json.pairWaitTip || ''),
    ]
    setImmediate(() => nativeativeFunction(...arr))
  }

  Interceptor.attach(moduleBaseAddress.add(offset.hook_get_login_qr_offset), callback)
  Interceptor.attach(moduleBaseAddress.add(offset.hook_check_login_qr_offset), callback)
  Interceptor.attach(moduleBaseAddress.add(offset.hook_save_login_qr_info_offset), {
    onEnter: function () {
      const qrNotify = this.context['ebp'].sub(72)
      const uuid = readString(qrNotify.add(4).readPointer())
      const wxid = readString(qrNotify.add(8).readPointer())
      const status = qrNotify.add(16).readUInt()
      const avatarUrl = readString(qrNotify.add(24).readPointer())
      const nickname = readString(qrNotify.add(28).readPointer())
      const pairWaitTip = readString(qrNotify.add(32).readPointer())
      const phoneClientVer = qrNotify.add(40).readUInt()
      const phoneType = readString(qrNotify.add(44).readPointer())

      const json = {
        status,
        uuid,
        wxid,
        avatarUrl,
        nickname,
        phoneType,
        phoneClientVer,
        pairWaitTip,
      }
      ret(json)
    },
    onLeave: function (retval) {
      return retval
    },
  })

  if (!isLoggedInFunction()) {
    setTimeout(() => {
      const json = getQrcodeLoginData()
      ret(json)
    }, 100);
  }

  return nativeCallback
})()

// 018
const getQrcodeLoginData = () => {
  const getQRCodeLoginMgr = new NativeFunction(moduleBaseAddress.add(offset.get_qr_login_data_offset), 'pointer', [])
  const qlMgr = getQRCodeLoginMgr()

  const json = {
    status: 0,
    uuid: '',
    wxid: '',
    avatarUrl: '',
  }

  if (!qlMgr.isNull()) {
    json.uuid = readString(qlMgr.add(8))
    json.status = qlMgr.add(40).readUInt()
    json.wxid = readString(qlMgr.add(44))
    json.avatarUrl = readString(qlMgr.add(92))
  }
  return json
}

// 045
/**
 * 20220504 writelog
 * 7A566D72 | FFB5 ECFEFFFF            | push dword ptr ss:[ebp-114]                      | 【3.6.0.18】写日志，这个里面就是日志内容
    7A566D78 | FFB5 E8FEFFFF            | push dword ptr ss:[ebp-118]                      |
 */
const writeLogNativeCallback = (() => {
  const nativeCallback = new NativeCallback(() => { }, 'void', [])
  const nativeCallFunction = new NativeFunction(nativeCallback, 'void', [])

  Interceptor.attach(
    moduleBaseAddress.add(0x1576D7E),
    {
      onEnter() {
        const addr = this.context.ebp.sub(0x114)//0xc30-0x08
        console.log('-------',addr)
        
      }
    })
  return nativeCallback
})()

// 046
let nickRoomIdV6 = null
let nullEdiWxidStructV6 = null
let nickMemberIdStructV6 = null
let memberNickBuffAsmV6 = null
let nickResultEdiV6 = null

const getChatroomMemberNickInfoV1Function = ((memberId, roomId) => {
  nickRoomIdV6 = initidStruct(roomId)
  nullEdiWxidStructV6 = initNullIdStruct('')
  nickMemberIdStructV6 = initStruct(memberId)
  memberNickBuffAsmV6 = Memory.alloc(Process.pageSize)
  console.log('-----', memberNickBuffAsmV6)

  const tmp = (moduleBaseAddress.add(
    offset.chatroom_member_nick_esi_offset_v6
  )).readU32()
  console.log('=======tmp', tmp)
  Memory.patchCode(memberNickBuffAsmV6, Process.pageSize, code => {
    var cw = new X86Writer(code, { pc: memberNickBuffAsmV6 })
    cw.putPushfx();
    cw.putPushax();

    cw.putMovRegAddress('edi', nullEdiWxidStructV6)
    cw.putMovRegAddress('eax', nickMemberIdStructV6)
    cw.putMovRegAddress('ebx', nickRoomIdV6)


    cw.putMovRegAddress('esi', ptr(tmp))
    cw.putPushReg('edi')
    cw.putPushReg('eax')
    cw.putPushReg('ebx')

    cw.putMovRegAddress('ecx', ptr(tmp))

    cw.putCallAddress(moduleBaseAddress.add(
      offset.chatroom_member_nick_call_offset_v6
    ))


    //cw.putMovNearPtrReg(nickResultEdiV6, 'edi')
    cw.putPopax()
    cw.putPopfx()
    cw.putRet()
    cw.flush()

  })

  const nativeativeFunction = new NativeFunction(ptr(memberNickBuffAsmV6), 'void', [])
  nativeativeFunction()

  console.log('---------nullEdiWxidStructV6', nullEdiWxidStructV6)
  const nickha = readWideString(nullEdiWxidStructV6)

  console.log('-----------------')
  console.log(nickha)
  console.log('-----------------')
  return readWideString(nullEdiWxidStructV6)
})

// 021
/**
* send attatch
*/
let attatchWxid = null
let attatchPath = null
let attatchPathPtr = null
let attatchAsm = null
let attatchBuf = null

let attatchReceiveIdPtr = null
let attatchReceiveId = null

let attatchSendId = null
let attatchSendIdPtr = null

/*
let attatchEbp2C = null
let attatchEDIPtr  = null
let attatchEDIU32  = null
let attatchECX  = null

let attatchEbp210 = null
let attatchEbpAc  = null*/

let attatchEbp11E8 = null
let attatchEbpCC = null
let attatchEbp368 = null
let attatchEAX = null

let sFileName = null
let fileNamePtr = null

let attatchEbp84 = null
let attatchECX = null


/**
 * 
param {78EDBC86 | 8B80 38040000            | mov eax,dword ptr ds:[eax+438]       |
78EDBC8C | 8BB0 800B0000            | mov esi,dword ptr ds:[eax+B80]       |} sendWxid 
*/
const sendAttatchMsgNativeFunction = ((contactId, senderId, path, filename, size) => {

  attatchAsm = Memory.alloc(Process.pageSize)
  console.log('--------------address', attatchAsm)

  fileNamePtr = Memory.alloc(filename.length * 2 + 2)
  fileNamePtr.writeUtf16String(filename)

  sFileName = Memory.alloc(0x14)
  sFileName.writePointer(ptr(fileNamePtr)).add(0x04)
    .writeU32(fileNamePtr.length * 2).add(0x04)
    .writeU32(fileNamePtr.length * 2).add(0x08)

  //const fileSize = size.toInt32()


  attatchReceiveIdPtr = Memory.alloc(contactId.length * 2 + 2)
  attatchReceiveIdPtr.writeUtf16String(contactId)

  attatchReceiveId = Memory.alloc(0x14)
  attatchReceiveId.writePointer(ptr(attatchReceiveIdPtr)).add(0x04)
    .writeU32(contactId.length * 2).add(0x04)
    .writeU32(contactId.length * 2).add(0x08)

  attatchSendIdPtr = Memory.alloc(senderId.length * 2 + 2)
  attatchSendIdPtr.writeUtf16String(senderId)

  attatchSendId = Memory.alloc(0x14)
  attatchSendId.writePointer(ptr(attatchSendIdPtr)).add(0x04)
    .writeU32(senderId.length * 2).add(0x04)
    .writeU32(senderId.length * 2).add(0x08)

  attatchPathPtr = Memory.alloc(path.length * 2 + 2)
  attatchPathPtr.writeUtf16String(path)

  attatchPath = Memory.alloc(0x28)
  attatchPath.writePointer(attatchPathPtr).add(0x04)
    .writeU32(path.length * 2).add(0x04)
    .writeU32(path.length * 2).add(0x04)

  attatchEbp11E8 = Memory.alloc(0xBE4)
  attatchEbpCC = Memory.alloc(0x14)
  attatchEbp368 = Memory.alloc(0x290)
  attatchEbp84 = Memory.alloc(0x18)
  attatchEAX = Memory.alloc(0x18)

  attatchECX = moduleBaseAddress.add(0x222f178).toInt32()

  //console.log('basename',path.basename(path))
  //return

  /**
   * -------------buffer-------------------------------
   */

  Memory.patchCode(attatchAsm, Process.pageSize, code => {
    var cw = new X86Writer(code, { pc: attatchAsm })
    cw.putPushfx()
    cw.putPushax()

    cw.putMovRegAddress('ecx', attatchEbp11E8)
    cw.putCallAddress(moduleBaseAddress.add(0xE1590))

    cw.putPushU32(-1)
    cw.putPushU32(moduleBaseAddress.add(0x1E1B3C0).toInt32())
    cw.putMovRegAddress('ecx', attatchEbp11E8.add(0x4))//11e4
    cw.putCallAddress(moduleBaseAddress.add(0x702410))//write appid
    // cw.putCallAddress(moduleBaseAddress.add(0x702410))//write appid

    /**
     * 78482B8D | 6A FF             | push FFFFFFFF                     |
       78482B8F | 68 B895E979       | push wechatwin.79E995B8           | 79E995B8:L"0"
       78482B94 | 8D8D 48EEFFFF     | lea ecx,dword ptr ss:[ebp-11B8]   |
       78482B9A | E8 71F83600       | call wechatwin.787F2410           | 此处继续写ebp-11b8
     */
    cw.putPushU32(-1)
    cw.putPushU32(moduleBaseAddress.add(0x1DA95B8).toInt32())
    cw.putMovRegAddress('ecx', attatchEbp11E8.add(0x30))//11B8
    cw.putCallAddress(moduleBaseAddress.add(0x702410))

    cw.putMovRegU32('eax', 0x6)
    cw.putMovNearPtrReg(attatchEbp11E8.add(0x80), 'eax')//1168
    cw.putMovRegU32('eax', size)//file size
    cw.putMovNearPtrReg(attatchEbp11E8.add(0x108), 'eax')//10e0


    cw.putMovRegAddress('eax', sFileName)
    cw.putPushReg('eax')
    cw.putMovRegAddress('ecx', attatchEbp11E8.add(0x44))//11a4=0x11e8-0x160
    cw.putCallAddress(moduleBaseAddress.add(0x702980))//write filename

    cw.putMovRegAddress('eax', attatchSendId)
    cw.putPushReg('eax')
    cw.putMovRegAddress('ecx', attatchEbp11E8.add(0x160))//1088=0x11e8-0x160
    cw.putCallAddress(moduleBaseAddress.add(0x702980))


    cw.putMovRegAddress('eax', attatchEbpCC)
    cw.putPushReg('eax')
    cw.putMovRegAddress('ecx', attatchEbp11E8)
    cw.putCallAddress(moduleBaseAddress.add(0x617C30))

    cw.putMovRegAddress('ecx', attatchEbp368)
    cw.putCallAddress(moduleBaseAddress.add(0x954F0))

    cw.putPushU32(-1)
    cw.putPushU32((moduleBaseAddress.add(0x1D8F248)).toInt32())
    cw.putMovRegAddress('ecx', attatchEbp84)
    cw.putCallAddress(moduleBaseAddress.add(0x701CD0))

    cw.putMovRegAddress('ecx', attatchPath)
    cw.putPushU32(0x6)
    cw.putMovRegAddress('edx', attatchEbp11E8.add(0x160))//1088
    //cw.putMovRegAddress('eax',attatchEAX)
    cw.putPushReg('ecx')
    cw.putPushReg('eax')

    cw.putMovRegAddress('eax', attatchEbpCC)
    cw.putPushReg('eax')

    cw.putMovRegAddress('eax', attatchReceiveId)
    cw.putPushReg('eax')

    cw.putMovRegAddress('ecx', attatchEbp368)
    cw.putCallAddress(moduleBaseAddress.add(0x391F80))
    cw.putAddRegImm('esp', 0x14)


    cw.putPushU32(moduleBaseAddress.add(0x223EC34).toInt32())
    cw.putPushU32(moduleBaseAddress.add(0x223EC34).toInt32())
    //cw.putMovRegU32('edx',0xAD0001)  两行代码都可以
    cw.putAddRegImm('edx', 0x1)
    cw.putMovRegAddress('ecx', attatchEbp368)
    cw.putCallAddress(moduleBaseAddress.add(0x392150))
    cw.putAddRegImm('esp', 0x8)



    //cw.putMovRegAddress('ecx', attatchEbp368)
    //cw.putCallAddress(moduleBaseAddress.add(0x63B4F0))
    // 7B53F178
    //cw.putMovRegU32('ecx', attatchEbpCC.add(0x3c).toInt32())//ebp-90
    //cw.putMovNearPtrReg(attatchEbpCC.add(0x64), 'eax')//ebp-68
    //cw.putAddRegImm('ecx', 0x8)
    //cw.putMovRegAddress('eax', attatchEbp368.add(0x64))//ebp-68

    //cw.putMovRegU32('ecx',attatchECX)
    //cw.putPushReg('eax')
    //cw.putMovRegAddress('eax', attatchEbpCC.add(0x40))//ebp-8c
    //cw.putPushReg('eax')
    //cw.putCallAddress(moduleBaseAddress.add(0xC9D30))
    //cw.putCallAddress(moduleBaseAddress.add(0x522590))
    //78483063 | E8 28F51800       | call wechatwin.78612590           |


    //78483039 | 8D8D 98FCFFFF     | lea ecx,dword ptr ss:[ebp-368]    |
    //7848303F | E8 AC842A00       | call wechatwin.7872B4F0           |
    //cw.putMovRegAddress('ecx', attatchEbp368)
    //cw.putCallAddress(moduleBaseAddress.add(0x63B4F0))

    //  78F33099 | 8D8D 34FFFFFF     | lea ecx,dword ptr ss:[ebp-CC]  |
    //78F3309F | E8 AC0FD0FF       | call wechatwin.78C34050        |

    //cw.putMovRegAddress('ecx',attatchEbpCC)
    //cw.putCallAddress(moduleBaseAddress.add(0x94050))

    /**
     * 78F3307F | 8B4D AC           | mov ecx,dword ptr ss:[ebp-54]  |
      78F33082 | 8D85 98FCFFFF     | lea eax,dword ptr ss:[ebp-368] |
      78F33088 | 50                | push eax                       |
      78F33089 | E8 82DACFFF       | call wechatwin.78C30B10        |
     
      cw.putMovRegAddress('ecx', attatchEbp54)
      cw.putMovRegAddress('eax', attatchEbp368)
      cw.putPushReg('eax')
      cw.putCallAddress(moduleBaseAddress.add(0x90B10))*/

    cw.putPopax()
    cw.putPopfx()
    cw.putRet()
    cw.flush()

  })

  const nativeativeFunction = new NativeFunction(ptr(attatchAsm), 'void', [])
  nativeativeFunction()
  /*console.log(hexdump(attatchEbp11E8.add(0x80), {
    offset: 0,
    length: 0x40,
    header: true,
    ansi: true
  }))*/
  //console.log('')
  /*console.log(hexdump(attatchEbpCC.add(0x160), {
    offset: 0,
    length: 0x64,
    header: true,
    ansi: true
  }))*/
  //console.log('-------',attatchEbp1C.readPointer())
  //console.log('-------',attatchEbp1C.add(0x4).readPointer())
  //console.log('-------',attatchEbp1C.add(0x8).readPointer())
})

// 025
const callLoginQrcodeFunction = ((forceRefresh = false) => {
  const json = getQrcodeLoginData()
  if (!forceRefresh && json.uuid) {
    return
  }

  const callAsm = Memory.alloc(Process.pageSize)
  const loginWnd = moduleBaseAddress.add(offset.get_login_wnd_offset).readPointer()

  Memory.patchCode(callAsm, Process.pageSize, code => {
    var cw = new X86Writer(code, { pc: callAsm })
    cw.putPushfx();
    cw.putPushax();

    cw.putMovRegAddress('ecx', loginWnd)
    cw.putCallAddress(moduleBaseAddress.add(offset.get_qr_login_call_offset))

    cw.putPopax()
    cw.putPopfx()
    cw.putRet()
    cw.flush()
  })

  const nativeativeFunction = new NativeFunction(ptr(callAsm), 'void', [])
  nativeativeFunction()
})


// 026
const agentReadyCallback = (() => {
  const nativeCallback = new NativeCallback(() => { }, 'void', [])
  const nativeativeFunction = new NativeFunction(nativeCallback, 'void', [])

  setTimeout(() => {
    nativeativeFunction()
  }, 500);
  return nativeCallback
})()

// 027
const SendMiniProgramNativeFunction = ((bg_path_str, send_wxid_str, recv_wxid_str, xmlstr) => {
  console.log("------------------------------------------------------");
  var asmCode = Memory.alloc(Process.pageSize);

  var ECX_buf = Memory.alloc(0x300);
  var Buf_EAX = Memory.alloc(0x300);
  var buf_1 = Memory.alloc(0x300);
  var ptr_to_buf_1 = Memory.alloc(0x4).writePointer(buf_1);
  var buf_2 = Memory.alloc(0x300);

  //  var bg_path_str="C:/aaaa.jpg";
  var bg_path_Ptr = Memory.alloc(bg_path_str.length * 2 + 1)
  bg_path_Ptr.writeUtf16String(bg_path_str);
  var bg_path_Struct = Memory.alloc(0x14) // returns a NativePointer
  bg_path_Struct.writePointer(bg_path_Ptr).add(0x04)
    .writeU32(bg_path_str.length * 2).add(0x04)
    .writeU32(bg_path_str.length * 2).add(0x04)
    .writeU32(0).add(0x04)
    .writeU32(0);

  // var send_wxid_str="wxid_4zr616ir6fi122";
  var send_wxid_Ptr = Memory.alloc(send_wxid_str.length * 2 + 1)
  send_wxid_Ptr.writeUtf16String(send_wxid_str);
  var send_wxid_Struct = Memory.alloc(0x14) // returns a NativePointer
  send_wxid_Struct.writePointer(send_wxid_Ptr).add(0x04)
    .writeU32(send_wxid_str.length * 2).add(0x04)
    .writeU32(send_wxid_str.length * 2).add(0x04)
    .writeU32(0).add(0x04)
    .writeU32(0);

  // var recv_wxid_str="filehelper";
  var recv_wxid_Ptr = Memory.alloc(recv_wxid_str.length * 2 + 1)
  recv_wxid_Ptr.writeUtf16String(recv_wxid_str);
  var recv_wxid_Struct = Memory.alloc(0x14) // returns a NativePointer
  recv_wxid_Struct.writePointer(recv_wxid_Ptr).add(0x04)
    .writeU32(recv_wxid_str.length * 2).add(0x04)
    .writeU32(recv_wxid_str.length * 2).add(0x04)
    .writeU32(0).add(0x04)
    .writeU32(0);

  // vvar pXml=initidStruct('<msg><fromusername>wxid_4zr616ir6fi122</fromusername><scene>0</scene><commenturl></commenturl><appmsg appid="wx65cc950f42e8fff1" sdkver=""><title>腾讯出行服务｜加油代驾公交</title><des></des><action>view</action><type>33</type><showtype>0</showtype><content></content><url>https://mp.weixin.qq.com/mp/waerrpage?appid=wx65cc950f42e8fff1&amp;amp;type=upgrade&amp;amp;upgradetype=3#wechat_redirect</url><dataurl></dataurl><lowurl></lowurl><lowdataurl></lowdataurl><recorditem><![CDATA[]]></recorditem><thumburl>http://mmbiz.qpic.cn/mmbiz_png/NM1fK7leWGPaFnMAe95jbg4sZAI3fkEZWHq69CIk6zA00SGARbmsGTbgLnZUXFoRwjROelKicbSp9K34MaZBuuA/640?wx_fmt=png&amp;wxfrom=200</thumburl><messageaction></messageaction><extinfo></extinfo><sourceusername></sourceusername><sourcedisplayname>腾讯出行服务｜加油代驾公交</sourcedisplayname><commenturl></commenturl><appattach><totallen>0</totallen><attachid></attachid><emoticonmd5></emoticonmd5><fileext></fileext><aeskey></aeskey></appattach><weappinfo><pagepath></pagepath><username>gh_ad64296dc8bd@app</username><appid>wx65cc950f42e8fff1</appid><type>1</type><weappiconurl>http://mmbiz.qpic.cn/mmbiz_png/NM1fK7leWGPaFnMAe95jbg4sZAI3fkEZWHq69CIk6zA00SGARbmsGTbgLnZUXFoRwjROelKicbSp9K34MaZBuuA/640?wx_fmt=png&amp;wxfrom=200</weappiconurl><appservicetype>0</appservicetype><shareId>2_wx65cc950f42e8fff1_875237370_1644979747_1</shareId></weappinfo><websearch /></appmsg><appinfo><version>1</version><appname>Window wechat</appname></appinfo></msg>');

  var pXml = initidStruct(xmlstr)

  console.log(send_wxid_Struct);
  console.log(recv_wxid_Struct);
  console.log(pXml);
  console.log("okkk");

  console.log("------------------------------------------------------");

  Memory.patchCode(asmCode, Process.pageSize, code => {
    var cw = new X86Writer(code, { pc: asmCode })
    cw.putPushfx();
    cw.putPushax();
    cw.putMovRegReg('ecx', 'ecx');
    cw.putMovRegAddress('ecx', ECX_buf);
    cw.putCallAddress(moduleBaseAddress.add(0x69BB0)); //init ecx

    cw.putPushU32(0x21);


    cw.putPushNearPtr(ptr_to_buf_1);   //ptr
    cw.putPushU32(bg_path_Struct.toInt32());
    cw.putPushU32(pXml.toInt32());
    cw.putPushU32(recv_wxid_Struct.toInt32());

    cw.putMovRegAddress('edx', send_wxid_Struct);
    cw.putMovRegAddress('ecx', ECX_buf);
    cw.putCallAddress(moduleBaseAddress.add(0x2E2420));
    cw.putAddRegImm('esp', 0x14)

    cw.putPushU32(Buf_EAX.toInt32());
    cw.putMovRegAddress('ecx', ECX_buf);
    cw.putCallAddress(moduleBaseAddress.add(0x94C10));

    cw.putPushU32(moduleBaseAddress.add(0x1DCB46C).toInt32());
    cw.putPushU32(moduleBaseAddress.add(0x1DCB46C).toInt32());
    cw.putMovRegAddress('ecx', ECX_buf);
    cw.putCallAddress(moduleBaseAddress.add(0x2E2630));
    cw.putAddRegImm('esp', 0x8)

    cw.putPopax();
    cw.putPopfx();
    cw.putRet();
    cw.flush();
  })

  const nativeativeFunction = new NativeFunction(ptr(asmCode), 'void', [])
  nativeativeFunction()


})