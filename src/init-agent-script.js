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
const offset = {
  node_offset: 0x1db9728,
  handle_offset: 0xe4,
  send_txt_call_offset: 0x3e3b80,
  hook_point: 0x40d3b1,
  chatroom_node_offset: 0xb08,
  nickname_offset: 0x1ddf534,
  wxid_offset: 0x1ddf4bc,
  head_img_url_offset: 0x1ddf7fc,
  is_logged_in_offset: 0x1DDF9D4,
  hook_on_login_offset: 0x51B790,
  hook_on_logout_offset: 0x51C2C0,
  hook_get_login_qr_offset: 0x4B6020,
  hook_check_login_qr_offset: 0x478B90,
  hook_save_login_qr_info_offset: 0x3DB2E0,
  get_login_wnd_offset: 0x1DB96A4,
  get_qr_login_data_offset: 0x282160,
  get_qr_login_call_offset: 0x286930,
  send_picmsg_call_offset1: 0x5ccb50,
  send_picmsg_call_offset2: 0x6f5c0,
  send_picmsg_call_offset3: 0x3e3490,
  send_attatch_call_offset1: 0x5ccb50,
  send_attatch_call_offset2: 0x5ccb10,
  send_attatch_call_offset3: 0x5ccb50,
  send_attatch_call_offset4: 0x5ccb50,
  send_attatch_call_offset5: 0x074c90,
  send_attatch_call_offset6: 0x2e2720,
  send_attatch_call_para: 0x19a7350,
  chatroom_member_nick_call_offset1: 0x558cb0,
  chatroom_member_nick_call_offset2: 0x3b0fe0,
  chatroom_member_nick_call_offset3: 0x55f6e0,
  chatroom_member_nick_call_offset4: 0x34cb10,
};
//3.3.0.115


/*------------------global-------------------------------------------*/
const availableVersion = 1661141107 ////3.3.0.115
const moduleBaseAddress = Module.getBaseAddress('WeChatWin.dll')
const moduleLoad = Module.load('WeChatWin.dll')
let currentVersion = 0

let nodeList = []  //for contact
let contactList = [] //for contact

let chatroomNodeList = [] //for chatroom
let chatroomMemberList = []//for chatroom
let loggedIn = false

/*------------------global-------------------------------------------*/

const getTestInfoFunction = (() => {
  const nativeativeFunction = new NativeFunction(ptr(0x4f230000), 'void', [])
  nativeativeFunction()

})

// get global data

const isLoggedInFunction = (() => {
  loggedIn = moduleBaseAddress.add(offset.is_logged_in_offset).readU32()
  return !!loggedIn
})

// get myself info

const getBaseNodeAddress = (() => {
  return moduleBaseAddress.add(offset.node_offset).readPointer()
})

const getHeaderNodeAddress = (() => {
  const baseAddress = getBaseNodeAddress()
  if (baseAddress.isNull()) {
    return baseAddress
  }
  return baseAddress.add(offset.handle_offset).readPointer()
})

const getChatroomNodeAddress = (() => {
  const baseAddress = getBaseNodeAddress()
  if (baseAddress.isNull()) {
    return baseAddress
  }
  return baseAddress.add(offset.chatroom_node_offset).readPointer()
})


const getMyselfInfoFunction = (() => {

  let ptr = 0
  let wx_code = ''
  let wx_id = ''
  let wx_name = ''
  let head_img_url = ''

  wx_id = readString(moduleBaseAddress.add(offset.wxid_offset))
  wx_code = wx_id

  wx_name = readString(moduleBaseAddress.add(offset.nickname_offset))
  head_img_url = readString(moduleBaseAddress.add(offset.head_img_url_offset))


  const myself = {
    id: wx_id,
    code: wx_code,
    name: wx_name,
    head_img_url: head_img_url,
  };

  return JSON.stringify(myself)

})
// chatroom member
const chatroomRecurse = ((node) => {
  const chatroomNodeAddress = getChatroomNodeAddress()
  if (chatroomNodeAddress.isNull()) { return }

  if (node.equals(chatroomNodeAddress)) { return }

  for (const item in chatroomNodeList) {
    if (node.equals(chatroomNodeList[item])) {
      return
    }
  }

  chatroomNodeList.push(node)
  const roomid = readWideString(node.add(0x10))

  const len = node.add(0x50).readU32()   //
  //const memberJson={}
  if (len > 4) {//
    const memberStr = readString(node.add(0x40))
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

// std::string
// const str = readStringPtr(ptr).readUtf8String()
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
  addr.readCString = () => { return addr.size ? addr.ptr._readCString(addr.size) : '' }
  addr.readAnsiString = () => { return addr.size ? addr.ptr._readAnsiString(addr.size) : '' }
  addr.readUtf8String = () => { return addr.size ? addr.ptr._readUtf8String(addr.size) : '' }

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
  addr.readUtf16String = () => { return addr.size ? addr.ptr._readUtf16String(addr.size * 2) : '' }

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

//contact
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

const getChatroomMemberInfoFunction = (() => {
  const chatroomNodeAddress = getChatroomNodeAddress()
  if (chatroomNodeAddress.isNull()) { return '[]' }

  const node = chatroomNodeAddress.add(0x0).readPointer()
  const ret = chatroomRecurse(node)

  const cloneRet = JSON.stringify(ret)
  chatroomNodeList.length = 0//empty
  chatroomMemberList.length = 0 //empty
  return cloneRet
})

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

const isSupported = checkSupportedFunction()

if (!isSupported) {
  throw new Error(`Wechat version not supported. \nWechat version: ${getWechatVersionStringFunction()}, supported version: ${getWechatVersionStringFunction(availableVersion)}`)
}

const getContactNativeFunction = (() => {
  const headerNodeAddress = getHeaderNodeAddress()
  if (headerNodeAddress.isNull()) { return '[]' }

  const node = headerNodeAddress.add(0x0).readPointer()
  const ret = recurse(node)

  /*for (let item in ret.contact){
    console.log(ret.contact[item].wxid,ret.contact[item].wx_code,ret.contact[item].name)
  }*/
  //console.log(ret.contact)
  const cloneRet = JSON.stringify(ret)
  nodeList.length = 0
  contactList.length = 0

  return cloneRet
})


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


/**
 * @Hook: recvMsg -> recvMsgNativeCallback
 */
const recvMsgNativeCallback = (() => {

  const nativeCallback = new NativeCallback(() => { }, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'int32'])
  const nativeativeFunction = new NativeFunction(nativeCallback, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'int32'])

  Interceptor.attach(
    moduleBaseAddress.add(offset.hook_point),
    {
      onEnter() {
        const addr = this.context.ebp.sub(0xc30)//0xc30-0x08
        const msgType = addr.add(0x38).readU32()
        const isMyMsg = addr.add(0x3C).readU32()//add isMyMsg

        if (msgType > 0) {

          const talkerIdPtr = addr.add(0x48).readPointer()
          //console.log('txt msg',talkerIdPtr.readUtf16String())
          const talkerIdLen = addr.add(0x48 + 0x04).readU32() * 2 + 2

          const myTalkerIdPtr = Memory.alloc(talkerIdLen)
          Memory.copy(myTalkerIdPtr, talkerIdPtr, talkerIdLen)


          let contentPtr = null
          let contentLen = 0
          let myContentPtr = null
          if (msgType == 3) {// pic path
            let thumbPtr = addr.add(0x198).readPointer();
            let hdPtr = addr.add(0x1ac).readPointer();
            let thumbPath = thumbPtr.readUtf16String();
            let hdPath = hdPtr.readUtf16String();
            let picData = [
              thumbPath,//  PUPPET.types.Image.Unknown
              thumbPath,//  PUPPET.types.Image.Thumbnail
              hdPath,//  PUPPET.types.Image.HD
              hdPath//  PUPPET.types.Image.Artwork
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
          if (groupMsgAddr == 0) {//weChatPublic is zero，type is 49

            myGroupMsgSenderIdPtr = Memory.alloc(0x10)
            myGroupMsgSenderIdPtr.writeUtf16String("null")

          } else {

            const groupMsgSenderIdPtr = addr.add(0x170).readPointer()
            const groupMsgSenderIdLen = addr.add(0x170 + 0x04).readU32() * 2 + 2
            myGroupMsgSenderIdPtr = Memory.alloc(groupMsgSenderIdLen)
            Memory.copy(myGroupMsgSenderIdPtr, groupMsgSenderIdPtr, groupMsgSenderIdLen)

          }

          const xmlNullPtr = addr.add(0x1d8).readU32()
          let myXmlContentPtr = null
          if (xmlNullPtr == 0) {

            myXmlContentPtr = Memory.alloc(0x10)
            myXmlContentPtr.writeUtf16String("null")

          } else {
            const xmlContentPtr = addr.add(0x1d8).readPointer()

            const xmlContentLen = addr.add(0x1d8 + 0x04).readU32() * 2 + 2
            myXmlContentPtr = Memory.alloc(xmlContentLen)
            Memory.copy(myXmlContentPtr, xmlContentPtr, xmlContentLen)
          }

          setImmediate(() => nativeativeFunction(msgType, myTalkerIdPtr, myContentPtr, myGroupMsgSenderIdPtr, myXmlContentPtr, isMyMsg))
        }
      }
    })
  return nativeCallback
})()


let msgStruct = null
let msgstrPtr = null
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


let retidStruct = null
let retidPtr = null
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

//get nick from chatroom
let nickRoomId = null
let nickMemberId = null
let nickStructPtr = null
let nickBuff = null
let memberNickBuffAsm = null
let nickRetAddr = null
const getChatroomMemberNickInfoFunction = ((memberId, roomId) => {

  nickBuff = Memory.alloc(0x7e4)
  nickRetAddr = Memory.alloc(0x04)
  memberNickBuffAsm = Memory.alloc(Process.pageSize)
  nickRoomId = initidStruct(roomId)
  nickMemberId = initStruct(memberId)
  nickStructPtr = initmsgStruct('')

  Memory.patchCode(memberNickBuffAsm, Process.pageSize, code => {
    var cw = new X86Writer(code, { pc: memberNickBuffAsm })
    cw.putPushfx();
    cw.putPushax();

    cw.putMovRegAddress('ebx', nickStructPtr)
    cw.putMovRegAddress('esi', nickMemberId)
    cw.putMovRegAddress('edi', nickRoomId)

    cw.putMovRegAddress('ecx', nickBuff)
    cw.putCallAddress(moduleBaseAddress.add(
      offset.chatroom_member_nick_call_offset1
    ))

    cw.putMovRegAddress('eax', nickBuff)
    cw.putPushReg('eax')
    cw.putPushReg('esi')
    cw.putCallAddress(moduleBaseAddress.add(
      offset.chatroom_member_nick_call_offset2
    ))

    cw.putMovRegReg('ecx', 'eax')
    cw.putCallAddress(moduleBaseAddress.add(
      offset.chatroom_member_nick_call_offset3
    ))

    cw.putPushU32(1)
    cw.putPushReg('ebx')
    cw.putMovRegReg('edx', 'edi')
    cw.putMovRegAddress('ecx', nickBuff)
    cw.putCallAddress(moduleBaseAddress.add(
      offset.chatroom_member_nick_call_offset4
    ))
    cw.putAddRegImm('esp', 0x08)
    cw.putMovNearPtrReg(nickRetAddr, 'ebx')
    cw.putPopax()
    cw.putPopfx()
    cw.putRet()
    cw.flush()

  })

  const nativeativeFunction = new NativeFunction(ptr(memberNickBuffAsm), 'void', [])
  nativeativeFunction()

  return readWideString(nickRetAddr.readPointer())

})

/**
* send attatch
*/
let attatchWxid = null
let attatchPath = null
let attatchPathPtr = null
let attatchAsm = null
let attatchBuf = null
let attatchEbp = null
let attatchEaxbuf = null
const sendAttatchMsgNativeFunction = ((contactId, path) => {

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
/*------------------send pic --------------------------*/
let buffwxid = null
let imagefilepath = null
let pathPtr = null
let picWxid = null
let picWxidPtr = null
let picAsm = null
let picbuff = null
const sendPicMsgNativeFunction = ((contactId, path) => {

  picAsm = Memory.alloc(Process.pageSize)
  buffwxid = Memory.alloc(0x20)
  picbuff = Memory.alloc(0x378)

  pathPtr = Memory.alloc(path.length * 2 + 1)
  pathPtr.writeUtf16String(path)

  imagefilepath = Memory.alloc(0x24)
  imagefilepath.writePointer(pathPtr).add(0x04)
    .writeU32(path.length * 2).add(0x04)
    .writeU32(path.length * 2).add(0x04)

  picWxidPtr = Memory.alloc(contactId.length * 2 + 1)
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
    cw.putMovRegAddress('eax', buffwxid)

    cw.putMovRegReg('ecx', 'esp')

    cw.putPushReg('eax')
    cw.putCallAddress(moduleBaseAddress.add(
      offset.send_picmsg_call_offset1
    ))

    cw.putMovRegAddress('ebx', imagefilepath)
    cw.putPushReg('ebx')

    cw.putMovRegAddress('eax', picWxid)
    cw.putPushReg('eax')

    cw.putMovRegAddress('eax', picbuff)
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
let asmAtMsg = null
let roomid_, msg_, wxid_, atid_
let ecxBuffer
const sendAtMsgNativeFunction = ((roomId, text, contactId) => {
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

  const atMsgNativeFunction = new NativeFunction(ptr(asmAtMsg), 'void', [])
  atMsgNativeFunction()
})

/**
* @Call: sendMsg -> agentSendMsg
*/
const sendMsgNativeFunction = (() => {
  //const asmBuffer   = Memory.alloc(/*0x5a8*/0x5f0) // magic number from wechat-bot (laozhang)
  const asmBuffer = Memory.alloc(0x5f0)
  const asmSendMsg = Memory.alloc(Process.pageSize)
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

  return (...args) => refHolder.sendMsg(...args)
})()


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



const agentReadyCallback = (() => {
  const nativeCallback = new NativeCallback(() => { }, 'void', [])
  const nativeativeFunction = new NativeFunction(nativeCallback, 'void', [])

  setTimeout(() => {
    nativeativeFunction()
  }, 500);
  return nativeCallback
})()
