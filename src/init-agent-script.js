/**
 * WeChat 3.9.2.23
 *  > Special thanks to: @cixingguangming55555 老张学技术
 * Credit: https://github.com/cixingguangming55555/wechat-bot
 */

//https://blog.csdn.net/iloveitvm/article/details/109119687  frida学习

// 偏移地址new
const wxOffsets = {
  snsDataMgr: {
    WX_SNS_DATA_MGR_OFFSET: 0xc39680,
  },
  chatRoomMgr: {
    WX_CHAT_ROOM_MGR_OFFSET: 0x78cf20,
  },
  contactMgr: {
    WX_CONTACT_MGR_OFFSET: 0x75a4a0,
  },
  syncMgr: {
    WX_SYNC_MGR_OFFSET: 0xa87fd0,
  },
  preDownloadMgr: {
    WX_GET_PRE_DOWNLOAD_MGR_OFFSET: 0x80f110,
  },
  chatMgr: {
    WX_CHAT_MGR_OFFSET: 0x792700,
  },
  videoMgr: {
    WX_VIDEO_MGR_OFFSET: 0x829820,
  },
  patMgr: {
    WX_PAT_MGR_OFFSET: 0x931730,
  },
  searchContactMgr: {
    WX_SEARCH_CONTACT_MGR_OFFSET: 0xa6cb00,
  },
  appMsgMgr: {
    WX_APP_MSG_MGR_OFFSET: 0x76ae20,
  },
  sendMessageMgr: {
    WX_SEND_MESSAGE_MGR_OFFSET: 0x768140,
  },
  setChatMsgValue: {
    WX_INIT_CHAT_MSG_OFFSET: 0xf59e40,
  },
  chatMsg: {
    WX_NEW_CHAT_MSG_OFFSET: 0x76f010,
    WX_FREE_CHAT_MSG_OFFSET: 0x756960,
    WX_FREE_CHAT_MSG_2_OFFSET: 0x6f4ea0,
    WX_FREE_CHAT_MSG_INSTANCE_COUNTER_OFFSET: 0x756e30,
  },
  sns: {
    WX_SNS_GET_FIRST_PAGE_OFFSET: 0x14e2140,
    WX_SNS_GET_NEXT_PAGE_OFFSET: 0x14e21e0,
  },
  chatRoom: {
    WX_GET_CHAT_ROOM_DETAIL_INFO_OFFSET: 0xbde090,
    WX_NEW_CHAT_ROOM_INFO_OFFSET: 0xe99c40,
    WX_FREE_CHAT_ROOM_INFO_OFFSET: 0xe99f40,
    WX_DEL_CHAT_ROOM_MEMBER_OFFSET: 0xbd22a0,
    WX_ADD_MEMBER_TO_CHAT_ROOM_OFFSET: 0xbd1dc0,
    WX_INIT_CHAT_ROOM_OFFSET: 0xe97890,
    WX_FREE_CHAT_ROOM_OFFSET: 0xe97ab0,
    WX_GET_MEMBER_FROM_CHAT_ROOM_OFFSET: 0xbdf260,
    WX_MOD_CHAT_ROOM_MEMBER_NICK_NAME_OFFSET: 0xbd9680,
    WX_TOP_MSG_OFFSET: 0xbe1840,
    WX_REMOVE_TOP_MSG_OFFSET: 0xbe1620,
    WX_GET_MEMBER_NICKNAME_OFFSET: 0xbdf3f0,
    WX_FREE_CONTACT_OFFSET: 0xea7880
  },
  wcpayinfo: {
    WX_NEW_WCPAYINFO_OFFSET: 0x7b2e60,
    WX_FREE_WCPAYINFO_OFFSET: 0x79c250,
    WX_CONFIRM_RECEIPT_OFFSET: 0x15e2c20
  },
  contact: {
    WX_CONTACT_GET_LIST_OFFSET: 0xc089f0,
    WX_CONTACT_DEL_OFFSET: 0xb9b3b0,
    WX_SET_VALUE_OFFSET: 0x1f80900,
    WX_DO_DEL_CONTACT_OFFSET: 0xca6480,
    WX_GET_CONTACT_OFFSET: 0xc04e00,
    WX_DO_VERIFY_USER_OFFSET: 0xc02100,
    WX_VERIFY_MSG_OFFSET: 0xf59d40,
    WX_VERIFY_OK_OFFSET: 0xa18bd0,
    WX_NEW_ADD_FRIEND_HELPER_OFFSET: 0xa17d50,
    WX_FREE_ADD_FRIEND_HELPER_OFFSET: 0xa17e70
  },
  pushAttachTask: {
    WX_PUSH_ATTACH_TASK_OFFSET: 0x82bb40,
    WX_FREE_CHAT_MSG_OFFSET: 0x756960,
    WX_GET_MGR_BY_PREFIX_LOCAL_ID_OFFSET: 0xbc0370,
    WX_GET_CURRENT_DATA_PATH_OFFSET: 0xc872c0,
    WX_APP_MSG_INFO_OFFSET: 0x7b3d20,
    WX_GET_APP_MSG_XML_OFFSET: 0xe628a0,
    WX_FREE_APP_MSG_INFO_OFFSET: 0x79d900,
    WX_PUSH_THUMB_TASK_OFFSET: 0x82ba40,
    WX_DOWNLOAD_VIDEO_IMG_OFFSET: 0xd46c30
  },
  // pat
  pat: {
    WX_SEND_PAT_MSG_OFFSET: 0x1421940,
    WX_RET_OFFSET: 0x1D58751,
  },
  // search hook
  searchHook: {
    WX_SEARCH_CONTACT_ERROR_CODE_HOOK_OFFSET: 0xe17054,
    WX_SEARCH_CONTACT_ERROR_CODE_HOOK_NEXT_OFFSET: 0xf57a20,
    WX_SEARCH_CONTACT_DETAIL_HOOK_OFFSET: 0xa8ceb0,
    WX_SEARCH_CONTACT_DETAIL_HOOK_NEXT_OFFSET: 0xa8d100,
    WX_SEARCH_CONTACT_OFFSET: 0xcd1510,
  },
  // login
  login: {
    WX_LOGIN_URL_OFFSET: 0x3040DE8,
    WX_LOGOUT_OFFSET: 0xe58870,
    WX_ACCOUNT_SERVICE_OFFSET: 0x768c80,
    WX_GET_APP_DATA_SAVE_PATH_OFFSET: 0xf3a610,
    WX_GET_CURRENT_DATA_PATH_OFFSET: 0xc872c0,
  },
  // forward
  forward: {
    WX_FORWARD_MSG_OFFSET: 0xce6730,
  },
  // send file
  sendFile: {
    WX_SEND_FILE_OFFSET: 0xb6d1f0,
  },
  // send image
  sendImage: {
    WX_SEND_IMAGE_OFFSET: 0xce6640,
  },
  // send text
  sendText: {
    WX_SEND_TEXT_OFFSET: 0xce6c80,
  },
  // ocr
  ocr: {
    WX_INIT_OBJ_OFFSET: 0x80a800,
    WX_OCR_MANAGER_OFFSET: 0x80f270,
    WX_DO_OCR_TASK_OFFSET: 0x13da3e0,
  },
  storage: {
    CONTACT_G_PINSTANCE_OFFSET: 0x2ffddc8,
    DB_MICRO_MSG_OFFSET: 0x68,
    DB_CHAT_MSG_OFFSET: 0x1C0,
    DB_MISC_OFFSET: 0x3D8,
    DB_EMOTION_OFFSET: 0x558,
    DB_MEDIA_OFFSET: 0x9B8,
    DB_BIZCHAT_MSG_OFFSET: 0x1120,
    DB_FUNCTION_MSG_OFFSET: 0x11B0,
    DB_NAME_OFFSET: 0x14,
    STORAGE_START_OFFSET: 0x13f8,
    STORAGE_END_OFFSET: 0x13fc,
    PUBLIC_MSG_MGR_OFFSET: 0x303df74,
    MULTI_DB_MSG_MGR_OFFSET: 0x30403b8,
    FAVORITE_STORAGE_MGR_OFFSET: 0x303fd40,
    FTS_FAVORITE_MGR_OFFSET: 0x2ffe908,
    OP_LOG_STORAGE_VFTABLE: 0x2AD3A20,
    CHAT_MSG_STORAGE_VFTABLE: 0x2AC10F0,
    CHAT_CR_MSG_STORAGE_VFTABLE: 0x2ABEF14,
    SESSION_STORAGE_VFTABLE: 0x2AD3578,
    APP_INFO_STORAGE_VFTABLE: 0x2ABCC58,
    HEAD_IMG_STORAGE_VFTABLE: 0x2ACD9DC,
    HEAD_IMG_URL_STORAGE_VFTABLE: 0x2ACDF70,
    BIZ_INFO_STORAGE_VFTABLE: 0x2ABD718,
    TICKET_INFO_STORAGE_VFTABLE: 0x2AD5400,
    CHAT_ROOM_STORAGE_VFTABLE: 0x2AC299C,
    CHAT_ROOM_INFO_STORAGE_VFTABLE: 0x2AC245C,
    MEDIA_STORAGE_VFTABLE: 0x2ACE998,
    NAME_2_ID_STORAGE_VFTABLE: 0x2AD222C,
    EMOTION_PACKAGE_STORAGE_VFTABLE: 0x2AC6400,
    EMOTION_STORAGE_VFTABLE: 0x2AC7018,
    BUFINFO_STORAGE_VFTABLE: 0x2AC3178,
    CUSTOM_EMOTION_STORAGE_VFTABLE: 0x2AC4E90,
    DEL_SESSIONINFO_STORAGE_VFTABLE: 0x2AC5F98,
    FUNCTION_MSG_STORAGE_VFTABLE: 0x2ACD10C,
    FUNCTION_MSG_TASK_STORAGE_VFTABLE: 0x2ACC5C8,
    REVOKE_MSG_STORAGE_VFTABLE: 0x2AD27BC
  },
  hookImage: {
    WX_HOOK_IMG_OFFSET: 0xd723dc,
    WX_HOOK_IMG_NEXT_OFFSET: 0xe91d90
  },
  hookLog: {
    WX_HOOK_LOG_OFFSET: 0xf57d67,
    WX_HOOK_LOG_NEXT_OFFSET: 0x240ea71
  },
  hookMsg: {
    WX_RECV_MSG_HOOK_OFFSET: 0xd19a0b,
    WX_RECV_MSG_HOOK_NEXT_OFFSET: 0x756960,
    WX_SNS_HOOK_OFFSET: 0x14f9e15,
    WX_SNS_HOOK_NEXT_OFFSET: 0x14fa0a0
  },
  hookVoice: {
    WX_HOOK_VOICE_OFFSET: 0xd4d8d8,
    WX_HOOK_VOICE_NEXT_OFFSET: 0x203d130,
    WX_SELF_ID_OFFSET: 0x2FFD484
  }
}

// 偏移地址
const offset = {

  hook_point: 0xd19a0b, //3.9.2.23

  wx_login_url: 0x3040DE8, //登录地址

  WX_ACCOUNT_SERVICE_OFFSET: 0x768c80,

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

// 当前支持的微信版本
const availableVersion = 1661534743 // 3.9.2.23  ==0x63090217

const moduleBaseAddress = Module.getBaseAddress('WeChatWin.dll')
const moduleLoad = Module.load('WeChatWin.dll')
//1575CF98

/*-----------------base-------------------------*/

const initidStruct = ((str) => {
  let retidPtr = null
  let retidStruct = null
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

const initStruct = ((str) => {
  let retPtr = null
  let retStruct = null
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

const initmsgStruct = ((str) => {
  let msgstrPtr = null
  let msgStruct = null
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

const initAtMsgStruct = ((wxidStruct) => {
  let atStruct = null
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

// 获取微信版本号
const getWechatVersionFunction = (() => {
  const pattern = '55 8B ?? 83 ?? ?? A1 ?? ?? ?? ?? 83 ?? ?? 85 ?? 7F ?? 8D ?? ?? E8 ?? ?? ?? ?? 84 ?? 74 ?? 8B ?? ?? ?? 85 ?? 75 ?? E8 ?? ?? ?? ?? 0F ?? ?? 0D ?? ?? ?? ?? A3 ?? ?? ?? ?? A3 ?? ?? ?? ?? 8B ?? 5D C3'
  const results = Memory.scanSync(moduleLoad.base, moduleLoad.size, pattern)
  if (results.length == 0) {
    return 0
  }
  const addr = results[0].address
  const ret = addr.add(0x07).readPointer()
  const ver = ret.add(0x0).readU32()
  return ver
})

// 获取微信版本号字符串
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

// 检查微信版本是否支持
const checkSupportedFunction = (() => {
  const ver = getWechatVersionFunction()
  return ver == availableVersion
})

// 检测是否已经登录，当前写死为true
const isLoggedInFunction = (() => {
  // loggedIn = moduleBaseAddress.add(offset.WX_ACCOUNT_SERVICE_OFFSET).readU32()
  // return !!loggedIn
  return true
})

// 检查是否已登录——未实现
const isLoggedInFunction2 = () => {
  let success = -1
  const accout_service_addr = moduleBaseAddress.add(offset.WX_ACCOUNT_SERVICE_OFFSET)
  const service_addr = accout_service_addr.readPointer()
  if(service_addr) {
    success = accout_service_addr.add(0x4C8).readU32()
  }
  console.log('isLoggedInFunction:', success)

  return success
}

// 获取登录二维码——未实现
const getLoginUrlFunction = (() => {
  console.info('GetLoginUrl...')
  const loginUrlAddr = moduleBaseAddress.add(offset.wx_login_url).readPointer()
  console.debug('loginUrlAddr:', loginUrlAddr)
  const loginUrl = "http://weixin.qq.com/x/" + loginUrlAddr.readAnsiString()
  console.info('GetLoginUrl:', loginUrl)
  return loginUrl
})

// 登出——未实现
const Logout = () => {
  let success = -1
  if (!CheckLogin()) {
    return success
  }
  const account_service_addr = moduleBaseAddress.add(offset.WX_ACCOUNT_SERVICE_OFFSET).readPointer()
  const logout_addr = moduleBaseAddress.add(offset.WX_LOGOUT_OFFSET).readPointer()
  success = logout_addr.call(account_service_addr, 0x0)
  return success
}

// 获取自己的信息
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

// 获取联系人列表
const getContactNativeFunction = (() => {

  // 内部函数：递归遍历节点
  function recurse(node, contactList, nodeList, headerNodeAddress) {
      if (node.isNull() || node.equals(headerNodeAddress)) {
          return;
      }

      for (const item of nodeList) {
          if (node.equals(item)) {
              return;
          }
      }

      nodeList.push(node);
      const wxid = readWideString(node.add(0x30));
      const name = readWideString(node.add(0x8c));
      const contactJson = {
          id: wxid,
          name: name,
      };
      contactList.push(contactJson);

      recurse(node.add(0x0).readPointer(), contactList, nodeList, headerNodeAddress);
      recurse(node.add(0x04).readPointer(), contactList, nodeList, headerNodeAddress);
  }

  // 获取头结点地址
  const baseAddress = moduleBaseAddress.add(offset.contactInfo.nodeOffset).readPointer();
  if (baseAddress.isNull()) {
      return '[]';
  }
  const headerNodeAddress = baseAddress.add(offset.contactInfo.nodeRootOffset).readPointer();

  const contactList = [];
  const nodeList = [];
  recurse(headerNodeAddress.add(0x0).readPointer(), contactList, nodeList, headerNodeAddress);

  return JSON.stringify(contactList);
});

// 获取群组列表
const getChatroomMemberInfoFunction = (() => {
  // 获取群组列表地址
  const getChatroomNodeAddress = () => {
    const baseAddress = moduleBaseAddress.add(offset.chatroomInfo.nodeOffset).readPointer();
    if (baseAddress.isNull()) {
      return baseAddress;
    }
    return baseAddress.add(offset.chatroomInfo.nodeRootOffset).readPointer();
  };

  // 递归遍历群组节点
  const chatroomRecurse = (node, chatroomNodeList, chatroomMemberList) => {
    const chatroomNodeAddress = getChatroomNodeAddress();
    if (chatroomNodeAddress.isNull() || node.equals(chatroomNodeAddress)) {
      return;
    }

    if (chatroomNodeList.some(n => node.equals(n))) {
      return;
    }

    chatroomNodeList.push(node);
    const roomid = readWideString(node.add(0x10));
    const len = node.add(0x54).readU32();
    if (len > 4) {
      const memberStr = readString(node.add(0x44));
      if (memberStr.length > 0) {
        const memberList = memberStr.split(/[\\^][G]/);
        chatroomMemberList.push({ roomid, roomMember: memberList });
      }
    }

    chatroomRecurse(node.add(0x0).readPointer(), chatroomNodeList, chatroomMemberList);
    chatroomRecurse(node.add(0x04).readPointer(), chatroomNodeList, chatroomMemberList);
    chatroomRecurse(node.add(0x08).readPointer(), chatroomNodeList, chatroomMemberList);
  };

  // 主函数逻辑
  const chatroomNodeAddress = getChatroomNodeAddress();
  if (chatroomNodeAddress.isNull()) {
    return '[]';
  }

  const chatroomNodeList = [];
  const chatroomMemberList = [];
  const startNode = chatroomNodeAddress.add(0x0).readPointer();
  chatroomRecurse(startNode, chatroomNodeList, chatroomMemberList);

  return JSON.stringify(chatroomMemberList);
});

// 获取群成员昵称
const getChatroomMemberNickInfoFunction = ((memberId, roomId) => {
  let memberNickBuffAsm = null
  let nickRoomId = null
  let nickMemberId = null
  let nickBuff = null

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

  // const nickname = readWideString(nickBuff)
  // console.log('----nickname', nickname)
  return readWideString(nickBuff)
})

// 发送文本消息
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

  // console.log('----------txtAsm', txtAsm)
  const nativeativeFunction = new NativeFunction(ptr(txtAsm), 'void', [])
  nativeativeFunction()

})

// 发送@消息
const sendAtMsgNativeFunction = ((roomId, text, contactId, nickname) => {
  let asmAtMsg = null
  asmAtMsg = Memory.alloc(Process.pageSize)
  let ecxBuffer = Memory.alloc(0x3b0)
  let roomid_, msg_, wxid_, atid_

  const atContent = '@' + nickname + ' ' + text

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

// 发送图片消息
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

// 接收消息回调
const recvMsgNativeCallback = (() => {


  const nativeCallback = new NativeCallback(() => { }, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'int32'])
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