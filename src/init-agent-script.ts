/* eslint-disable sort-keys */
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-undef */

/**
 * WeChat 3.9.2.23
 *  > Special thanks to: @cixingguangming55555 老张学技术
 * Credit: https://github.com/cixingguangming55555/wechat-bot
 */

// https://blog.csdn.net/iloveitvm/article/details/109119687  frida学习

// 偏移地址,来自于wxhelper项目
const wxOffsets = {
  shareRecordMgr: {
    WX_SHARE_RECORD_MGR_OFFSET: 0x78cb40
  },
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
    WX_GET_MEMBER_NICKNAME_OFFSET: 0xbdf3f0, // 0xbdf3f0 0xb703f0
    WX_FREE_CONTACT_OFFSET: 0xea7880,
  },
  wcpayinfo: {
    WX_NEW_WCPAYINFO_OFFSET: 0x7b2e60,
    WX_FREE_WCPAYINFO_OFFSET: 0x79c250,
    WX_CONFIRM_RECEIPT_OFFSET: 0x15e2c20,
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
    WX_FREE_ADD_FRIEND_HELPER_OFFSET: 0xa17e70,
    WX_MOD_REMARK_OFFSET: 0xbfd5e0,
    WX_HEAD_IMAGE_MGR_OFFSET:0x807b00,
    QUERY_THEN_DOWNLOAD_OFFSET:0xc63470
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
    WX_DOWNLOAD_VIDEO_IMG_OFFSET: 0xd46c30,
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
  myselfInfo: {
    WX_SELF_ID_OFFSET: 0x2FFD484,
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
    WX_SEND_TEXT_OFFSET: 0xCE6C80,
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
    REVOKE_MSG_STORAGE_VFTABLE: 0x2AD27BC,
  },
  hookImage: {
    WX_HOOK_IMG_OFFSET: 0xd723dc,
    WX_HOOK_IMG_NEXT_OFFSET: 0xe91d90,
  },
  hookLog: {
    WX_HOOK_LOG_OFFSET: 0xf57d67,
    WX_HOOK_LOG_NEXT_OFFSET: 0x240ea71,
  },
  hookMsg: {
    WX_RECV_MSG_HOOK_OFFSET: 0xd19a0b,
    WX_RECV_MSG_HOOK_NEXT_OFFSET: 0x756960,
    WX_SNS_HOOK_OFFSET: 0x14f9e15,
    WX_SNS_HOOK_NEXT_OFFSET: 0x14fa0a0,
  },
  hookVoice: {
    WX_HOOK_VOICE_OFFSET: 0xd4d8d8,
    WX_HOOK_VOICE_NEXT_OFFSET: 0x203d130,
  },
}

// 当前支持的微信版本
const availableVersion = 1661534743 // 3.9.2.23  ==0x63090217

const moduleBaseAddress = Module.getBaseAddress('WeChatWin.dll')
const moduleLoad = Module.load('WeChatWin.dll')
// console.log('moduleBaseAddress:', moduleBaseAddress)

/* -----------------base------------------------- */
let retidPtr:any=null
let retidStruct:any=null
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

let retPtr: any = null
let retStruct: any = null
const initStruct = ((str: any) => {
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

let msgstrPtr: any = null
let msgStruct: any = null
const initmsgStruct = (str: any) => {
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
}

let atStruct: any = null
const initAtMsgStruct = (wxidStruct: any) => {
  atStruct = Memory.alloc(0x10)

  atStruct.writePointer(wxidStruct).add(0x04)
    .writeU32(wxidStruct.toInt32() + 0x14).add(0x04)// 0x14 = sizeof(wxid structure)
    .writeU32(wxidStruct.toInt32() + 0x14).add(0x04)
    .writeU32(0)
  return atStruct
}

const readStringPtr = (address: any) => {
  const addr: any = ptr(address)
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

const readWStringPtr = (address: any) => {
  const addr: any = ptr(address)
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

const readString = (address: any) => {
  return readStringPtr(address).readUtf8String()
}

const readWideString = (address: any) => {
  return readWStringPtr(address).readUtf16String()
}

/* -----------------base------------------------- */

// 获取微信版本号
const getWechatVersionFunction = () => {
  const pattern = '55 8B ?? 83 ?? ?? A1 ?? ?? ?? ?? 83 ?? ?? 85 ?? 7F ?? 8D ?? ?? E8 ?? ?? ?? ?? 84 ?? 74 ?? 8B ?? ?? ?? 85 ?? 75 ?? E8 ?? ?? ?? ?? 0F ?? ?? 0D ?? ?? ?? ?? A3 ?? ?? ?? ?? A3 ?? ?? ?? ?? 8B ?? 5D C3'
  const results: any = Memory.scanSync(moduleLoad.base, moduleLoad.size, pattern)
  if (results.length === 0) {
    return 0
  }
  const addr = results[0].address
  const ret = addr.add(0x07).readPointer()
  const ver = ret.add(0x0).readU32()
  return ver
}

// 获取微信版本号字符串
const getWechatVersionStringFunction = () => {
  const ver: number = getWechatVersionFunction()
  if (!ver) {
    return '0.0.0.0'
  }
  const vers: number[] = []
  vers.push((ver >> 24) & 255 - 0x60)
  vers.push((ver >> 16) & 255)
  vers.push((ver >> 8) & 255)
  vers.push(ver & 255)
  return vers.join('.')
}

// 检查微信版本是否支持
const checkSupportedFunction = () => {
  const ver = getWechatVersionFunction()
  return ver === availableVersion
}

// 检查是否已登录—
const isLoggedInFunction = () => {
  let success = -1
  const accout_service_addr = moduleBaseAddress.add(wxOffsets.login.WX_ACCOUNT_SERVICE_OFFSET)
  const callFunction = new NativeFunction(accout_service_addr, 'pointer', [])
  const service_addr = callFunction()

  // console.log('service_addr:', service_addr)

  try {
    if (!service_addr.isNull()) {
      const loginStatusAddress = service_addr.add(0x4E0)
      success = loginStatusAddress.readU32()
    }
  } catch (e: any) {
    throw new Error(e)
  }
  // console.log('isLoggedInFunction结果:', success)
  // 813746031、813746031、813746031

  return success
}

// 登录事件回调,登陆状态下每3s检测一次，非登陆状态下不间断检测且每3s打印一次状态，直到登陆成功
const hookLoginEventCallback = (() => {
  const nativeCallback = new NativeCallback(() => { }, 'void', [])
  const nativeativeFunction = new NativeFunction(nativeCallback, 'void', [])
  Interceptor.attach(moduleBaseAddress.add(wxOffsets.login.WX_ACCOUNT_SERVICE_OFFSET), {
    onLeave: function (retval) {
      // console.log('hookLoginEventCallback:', retval)
      const isLoggedIn = isLoggedInFunction()
      if (isLoggedIn !== 1) {
        console.log('当前登陆状态:', isLoggedIn)
        setImmediate(() => nativeativeFunction())
      }
      return retval
    },
  })

  const checkLoginStatus = () => {
    const isLoggedIn = isLoggedInFunction()
    // console.log('当前登陆状态:', isLoggedIn);
    if (isLoggedIn !== 1) {
      setImmediate(() => nativeativeFunction())
      setTimeout(checkLoginStatus, 3000)  // 每3秒检查一次，直到登陆成功
    } else {
      setImmediate(() => nativeativeFunction())
    }
  }

  setTimeout(checkLoginStatus, 3000)  // 初始延迟3秒启动

  return nativeCallback
})()

// 登出事件回调
const hookLogoutEventCallback = (() => {
  const nativeCallback = new NativeCallback(() => { }, 'void', ['int32'])
  const nativeativeFunction = new NativeFunction(nativeCallback, 'void', ['int32'])

  try {
    Interceptor.attach(moduleBaseAddress.add(wxOffsets.login.WX_LOGOUT_OFFSET), {
      onEnter: function (args: any) {
        try {
          console.log('已登出:', args[0].toInt32())
          const bySrv = args[0].toInt32()
          setImmediate(() => nativeativeFunction(bySrv))
        } catch (e: any) {
          console.error('登出回调失败：', e)
          throw new Error(e)
        }
      },
    })
    return nativeCallback
  } catch (e) {
    console.error('登出回调失败：', e)
    return null
  }

})()

// 获取登录二维码
const getQrcodeLoginData = () => {
  const getQRCodeLoginMgr = new NativeFunction(moduleBaseAddress.add(wxOffsets.login.WX_LOGIN_URL_OFFSET), 'pointer', [])
  const qlMgr = getQRCodeLoginMgr()

  const json: any = {
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

let isReady = false
// 准备就绪回调
const agentReadyCallback = (() => {
  const nativeCallback = new NativeCallback(() => { }, 'void', [])
  const nativeativeFunction = new NativeFunction(nativeCallback, 'void', [])
  const checkLoginStatus = () => {
    const isLoggedIn = isLoggedInFunction()
    // console.log('当前登陆状态:', isLoggedIn);
    // 如果已经登陆则执行回调
    if (isLoggedIn === 1) {
      if (!isReady) {
        setImmediate(() => nativeativeFunction())
        isReady = true
      }
      setTimeout(checkLoginStatus, 3000)  // 每3秒检查一次，直到登陆成功

    }
  }

  setTimeout(checkLoginStatus, 3000)  // 初始延迟3秒启动
  return nativeCallback
})()

// 获取登录二维码(登录地址)
const getLoginUrlFunction = () => {
  const loginUrlAddr = moduleBaseAddress.add(wxOffsets.login.WX_LOGIN_URL_OFFSET).readPointer()
  const loginUrl = 'http://weixin.qq.com/x/' + loginUrlAddr.readUtf8String()
  return loginUrl
}

// 获取自己的信息
const getMyselfInfoFunction = () => {

  // const ptr = 0
  let wx_code: any = ''
  let wx_id: any = ''
  let wx_name: any = ''
  let head_img_url: any = ''

  const base = moduleBaseAddress.add(wxOffsets.myselfInfo.WX_SELF_ID_OFFSET)
  const wxid_len = base.add(0x4D4).readU32()

  if (wxid_len === 0x13) { // 新版本微信
    wx_id = base.readPointer().readAnsiString(wxid_len)
    wx_code = base.add(0x64).readAnsiString()
  } else {
    wx_id = readString(base)
    wx_code = wx_id
  }

  wx_name = readString(base.add(0x10C))
  const img_addr = base.add(0x2D8).readPointer()
  const img_len = base.add(0x2E8).readU32()

  head_img_url = img_addr.readAnsiString(img_len)

  const myself = {
    id: wx_id,
    code: wx_code,
    name: wx_name,
    head_img_url,
  }
  const myselfJson = JSON.stringify(myself)
  // console.log('myselfJson:', myselfJson)
  return myselfJson

}

class SelfInfoInner {
  wxid!: string
  account!: string
  mobile!: string
  signature!: string
  country!: string
  province!: string
  city!: string
  name!: string
  head_img!: string
  db_key!: string
  data_save_path!: string
  current_data_path!: string
}

// 获取联系人列表
const getContactNativeFunction = (): string => {
  // 基地址和偏移量需要根据目标程序实际情况调整
  // console.log('moduleBaseAddress:', moduleBaseAddress)
  const getInstanceAddr = moduleBaseAddress.add(
    wxOffsets.contactMgr.WX_CONTACT_MGR_OFFSET,
  );
  // console.log('getInstanceAddr:', getInstanceAddr)
  const contactGetListAddr = moduleBaseAddress.add(
    wxOffsets.contact.WX_CONTACT_GET_LIST_OFFSET,
  );

  // 准备用于存储联系人信息的数组
  const contacts: any[] = [];
  const contactPtr: any = Memory.alloc(Process.pointerSize * 3);
  contactPtr.writePointer(ptr(0));  // 初始化指针数组

  // 分配内存并编写汇编代码
  const asmCode = Memory.alloc(Process.pageSize);
  try {
    Memory.patchCode(asmCode, Process.pageSize, code => {
      const cw = new X86Writer(code, { pc: asmCode });

      // 模拟 C++ 中的内联汇编操作
      cw.putPushfx();
      cw.putPushax();
      // console.log('call getInstanceAddr:', getInstanceAddr)
      cw.putCallAddress(getInstanceAddr);
      // console.log('called getInstanceAddr:', getInstanceAddr)
      cw.putMovRegAddress('ecx', contactPtr);
      // console.log('putLeaRegAddress:', contactPtr)

      cw.putPushReg('ecx');
      // console.log('putPushReg:', 'ecx')
      cw.putMovRegReg('ecx', 'eax');
      // console.log('call contactGetListAddr:', contactGetListAddr)
      cw.putCallAddress(contactGetListAddr);
      cw.putXorRegReg('eax', 'eax'); // 将 EAX 寄存器清零
      cw.putMovRegReg('ecx', 'eax');

      cw.putPopax();
      cw.putPopfx();
      cw.putRet();

      cw.flush();
    });
  } catch (e) {
    console.error('Error during assembly code construction:', e);
    return '';
  }

  // 执行汇编代码
  let success = -1;
  try {
    const nativeFunction = new NativeFunction(asmCode, 'int', []);
    success = nativeFunction();
    // console.log('success:', success)
  } catch (e) {
    console.error('Error during function execution:', e);
    return '';
  }

  // 解析联系人信息
  if (success) {
    let start = contactPtr.readPointer();
    const end = contactPtr.add(Process.pointerSize * 2).readPointer();
    const CONTACT_SIZE = 0x438; // 假设每个联系人数据结构的大小

    while (start.compare(end) < 0) {
      const contact = {
        id: start.add(0x10).readPointer().readUtf16String(),
        custom_account: start.add(0x24).readPointer().readUtf16String(),
        del_flag: start.add(0x4c).readU32(),
        type: start.add(0x50).readU32(),
        verify_flag: start.add(0x54).readU32(),
        alias: start.add(0x58).readPointer().readUtf16String() || '', // 20字节
        name: start.add(0x6c).readPointer().readUtf16String(), // 64字节
        pinyin: start.add(0xAC).readPointer().readUtf16String(), // 20字节
        pinyin_all: start.add(0xC0).readPointer().readUtf16String(), // 20字节
      };

      // if(contact.alias){
      //   console.log('contact:', JSON.stringify(contact))
      // }

      if (contact.name) {
        contacts.push(contact);
      }
      start = start.add(CONTACT_SIZE);
    }
  }
  // console.log('contacts size:', contacts.length)
  const contactsString = JSON.stringify(contacts)
  // console.log('contacts:', contactsString)
  return contactsString;
};

// 未完成，设置备注
let contact: any = null
let content: any = null
const modifyContactRemark = (wxid, remark) => {
  const base_addr = moduleBaseAddress; // 假设基础地址已经定义好
  contact = initidStruct(wxid);
  content = initStruct(remark);
  const mod_addr = base_addr.add(wxOffsets.contact.WX_MOD_REMARK_OFFSET); // 替换为实际偏移量
  const modifyContactRemarkAsm: any = Memory.alloc(Process.pageSize);

  Memory.patchCode(modifyContactRemarkAsm, Process.pageSize, code => {
    const writer = new X86Writer(code, { pc: modifyContactRemarkAsm });
    writer.putPushax();
    writer.putPushfx();
    // writer.putMovRegAddress('eax', content);
    writer.putPushReg('eax');
    // writer.putMovRegAddress('eax', contact);
    writer.putPushReg('eax');
    // console.log('begin call mod_addr:', mod_addr)
    writer.putCallAddress(mod_addr);
    writer.putPopfx();
    writer.putPopax();
    writer.flush();
    // console.log('end call mod_addr:', mod_addr)
  });
  // console.log('txtAsm:', modifyContactRemarkAsm)
  const nativeFunction = new NativeFunction(ptr(modifyContactRemarkAsm), 'void', []);
  // console.log('nativeFunction:', nativeFunction)
  try {
    const success = nativeFunction();
    // console.log('设置备注好友备注结果:', success)
    return success;
  } catch (e) {
    // console.error('[设置好友备注]Error during modifyContactRemark nativeFunction function execution:', e);
    return false;
  }

};
// 示例调用
// modifyContactRemark("ledongmao", "超哥2");

// 获取群组列表
const getChatroomMemberInfoFunction = () => {
  // 获取群组列表地址
  const getChatroomNodeAddress = () => {
    const baseAddress = moduleBaseAddress.add(wxOffsets.storage.CONTACT_G_PINSTANCE_OFFSET).readPointer()
    if (baseAddress.isNull()) {
      return baseAddress
    }
    return baseAddress.add(0x8c8).readPointer()
  }

  // 递归遍历群组节点
  const chatroomRecurse = (node: NativePointer, chatroomNodeList: any[], chatroomMemberList: any[]) => {
    const chatroomNodeAddress = getChatroomNodeAddress()
    if (chatroomNodeAddress.isNull() || node.equals(chatroomNodeAddress)) {
      return
    }

    if (chatroomNodeList.some((n: any) => node.equals(n))) {
      return
    }

    chatroomNodeList.push(node)
    const roomid = readWideString(node.add(0x10))
    // try{
    //   console.log('获取群信息...', roomid)
    //   GetMemberFromChatRoom(roomid)
    // }catch(e){
    //   console.error('获取群信息失败：', e)
    // }
    const len = node.add(0x54).readU32()
    if (len > 4) {
      const memberStr: any = readString(node.add(0x44))
      if (memberStr.length > 0) {
        const admin = readWideString(node.add(0x74))
        // console.log('获取到的admin', admin)
        const memberList = memberStr.split(/[\\^][G]/)
        chatroomMemberList.push({ roomid, roomMember: memberList, admin })
      }
    }

    chatroomRecurse(node.add(0x0).readPointer(), chatroomNodeList, chatroomMemberList)
    chatroomRecurse(node.add(0x04).readPointer(), chatroomNodeList, chatroomMemberList)
    chatroomRecurse(node.add(0x08).readPointer(), chatroomNodeList, chatroomMemberList)
  }

  // 主函数逻辑
  const chatroomNodeAddress = getChatroomNodeAddress()
  if (chatroomNodeAddress.isNull()) {
    return '[]'
  }

  const chatroomNodeList: never[] = []
  const chatroomMemberList: never[] = []
  const startNode = chatroomNodeAddress.add(0x0).readPointer()
  chatroomRecurse(startNode, chatroomNodeList, chatroomMemberList)
  let results = '[]'
  try {
    results = JSON.stringify(chatroomMemberList)
    // console.log('群组列表：', results)
  } catch (e) {
    console.log('格式转换错误：', 'e')
  }
  return results
}

// 获取群成员昵称
let memberNickBuffAsm: any = null
let nickRoomId: any = null
let nickMemberId: any = null
let nickBuff: any = null
const getChatroomMemberNickInfoFunction = ((memberId: any, roomId: any) => {
  // console.log('Function called with wxid:', memberId, 'chatRoomId:', roomId);
  nickBuff = Memory.alloc(0x7e4)
  //const nickRetAddr = Memory.alloc(0x04)
  memberNickBuffAsm = Memory.alloc(Process.pageSize)
  //console.log('asm address----------',memberNickBuffAsm)
  nickRoomId = initidStruct(roomId)
  //console.log('nick room id',nickRoomId)
  nickMemberId = initidStruct(memberId)

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
    // console.log('moduleBaseAddress', moduleBaseAddress)
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
  // console.log('--------------------------nickname', nickname)
  return nickname
})
// getChatroomMemberNickInfoFunction('xxx', 'xxx@chatroom')

// 未完成，移除群成员
/**21:17:43 ERR SidecarBody [SCRIPT_MESSAGRE_HANDLER_SYMBOL]() MessageType.Error: Error: stack overflow
    at deleteMemberFromChatRoom (/script1.js:899)
    at <eval> (/script1.js:903)
file:///C:/Users/Administrator/Documents/GitHub/puppet-xp/node_modules/sidecar/src/sidecar-body/sidecar-body.ts:400
          const e = new Error(message.description)
                    ^
Error: Error: stack overflow
    at WeChatSidecar.[scriptMessageHandler] (file:///C:/Users/Administrator/Documents/GitHub/puppet-xp/node_modules/sidecar/src/sidecar-body/sidecar-body.ts:400:21
)
    at C:\Users\Administrator\Documents\GitHub\puppet-xp\node_modules\frida\dist\script.js:95:21
----- Agent Script Internal -----
Error: stack overflow
    at deleteMemberFromChatRoom (/script1.js:899)
    at <eval> (/script1.js:903) */
const delMemberFromChatRoom = (chat_room_id, wxids) => {
  // console.log('chat_room_id:', chat_room_id, 'wxids:', wxids);
  const base_addr = moduleBaseAddress; // 请替换为实际的基础地址
  const chat_room = Memory.allocUtf16String(chat_room_id);
  const members = wxids.map(id => Memory.allocUtf16String(id));
  const membersBuffer = Memory.alloc(Process.pointerSize * (members.length + 2));
  membersBuffer.writePointer(NULL);
  membersBuffer.add(Process.pointerSize).writePointer(membersBuffer.add(Process.pointerSize * 2));

  for (let i = 0; i < members.length; i++) {
    membersBuffer.add(Process.pointerSize * (2 + i)).writePointer(members[i]);
  }

  const get_chat_room_mgr_addr = base_addr.add(wxOffsets.chatRoomMgr.WX_CHAT_ROOM_MGR_OFFSET);
  const del_member_addr = base_addr.add(wxOffsets.chatRoom.WX_DEL_CHAT_ROOM_MEMBER_OFFSET);
  const init_chat_msg_addr = base_addr.add(wxOffsets.setChatMsgValue.WX_INIT_CHAT_MSG_OFFSET);
  const delMemberFromChatRoomAsm: any = Memory.alloc(Process.pageSize);

  Memory.patchCode(delMemberFromChatRoomAsm, Process.pageSize, code => {
    const writer = new X86Writer(code, { pc: delMemberFromChatRoomAsm });
    writer.putPushax();
    writer.putPushfx();
    writer.putCallAddress(get_chat_room_mgr_addr);
    writer.putSubRegImm('esp', 0x14);
    writer.putMovRegReg('esi', 'eax');
    writer.putMovRegAddress('ecx', chat_room);
    writer.putPushReg('edi');
    writer.putCallAddress(init_chat_msg_addr);
    writer.putMovRegReg('ecx', 'esi');
    writer.putMovRegAddress('eax', membersBuffer.add(Process.pointerSize));
    writer.putPushReg('eax');
    writer.putCallAddress(del_member_addr);
    writer.putMovRegReg('eax', 'esi');
    writer.putPopfx();
    writer.putPopax();
    writer.flush();
  });

  // 调用刚才写入的汇编代码
  const nativeFunction = new NativeFunction(ptr(delMemberFromChatRoomAsm), 'void', []);
  try {
    const success = nativeFunction();
    // console.log('success:', success);
    return success;
  } catch (e) {
    // console.error('[踢出群聊]Error during delMemberFromChatRoom nativeFunction function execution:', e);
    return false;

  }
};
// delMemberFromChatRoom('21341182572@chatroom', ['ledongmao'])

// 未完成，添加群成员
/**21:16:16 ERR SidecarBody [SCRIPT_MESSAGRE_HANDLER_SYMBOL]() MessageType.Error: Error: stack overflow
    at addMemberToChatRoom (/script1.js:946)
    at <eval> (/script1.js:949)
file:///C:/Users/Administrator/Documents/GitHub/puppet-xp/node_modules/sidecar/src/sidecar-body/sidecar-body.ts:400
          const e = new Error(message.description)
                    ^
Error: Error: stack overflow
    at WeChatSidecar.[scriptMessageHandler] (file:///C:/Users/Administrator/Documents/GitHub/puppet-xp/node_modules/sidecar/src/sidecar-body/sidecar-body.ts:400:21
)
    at C:\Users\Administrator\Documents\GitHub\puppet-xp\node_modules\frida\dist\script.js:95:21
----- Agent Script Internal -----
Error: stack overflow
    at addMemberToChatRoom (/script1.js:946)
    at <eval> (/script1.js:949) */
const addMemberToChatRoom = (chat_room_id, wxids) => {
  const base_addr = moduleBaseAddress; // 假设基础地址已经定义好
  const chat_room = Memory.allocUtf16String(chat_room_id);
  const members = wxids.map(id => Memory.allocUtf16String(id));
  const membersBuffer = Memory.alloc(Process.pointerSize * (members.length + 2));
  membersBuffer.writePointer(NULL);
  membersBuffer.add(Process.pointerSize).writePointer(membersBuffer.add(Process.pointerSize * 2));

  for (let i = 0; i < members.length; i++) {
    membersBuffer.add(Process.pointerSize * (2 + i)).writePointer(members[i]);
  }

  const get_chat_room_mgr_addr = base_addr.add(wxOffsets.chatRoomMgr.WX_CHAT_ROOM_MGR_OFFSET);
  const add_member_addr = base_addr.add(wxOffsets.chatRoom.WX_ADD_MEMBER_TO_CHAT_ROOM_OFFSET);
  const init_chat_msg_addr = base_addr.add(wxOffsets.setChatMsgValue.WX_INIT_CHAT_MSG_OFFSET);
  const txtAsm: any = Memory.alloc(Process.pageSize);

  Memory.patchCode(txtAsm, Process.pageSize, code => {
    const writer = new X86Writer(code, { pc: txtAsm });
    writer.putPushax();
    writer.putPushfx();
    writer.putCallAddress(get_chat_room_mgr_addr);
    writer.putSubRegImm('esp', 0x8);
    writer.putMovRegReg('ebx', 'eax'); // 存储 get_chat_room_mgr_addr 调用的结果到 EBX
    const tempPtr = Memory.alloc(8); // 分配 8 字节以包含 tempPtr 和 tempPtr + 4
    writer.putMovRegU32('eax', 0x0);
    writer.putMovRegAddress('ecx', tempPtr);
    writer.putMovRegPtrReg('ecx', 'eax'); // 将 EAX (0x0) 写入 tempPtr 指向的地址
    writer.putLeaRegRegOffset('ecx', 'ecx', 4); // 加载 tempPtr + 4 的地址到 ECX
    writer.putMovRegPtrReg('ecx', 'eax'); // 将 EAX (0x0) 写入 ECX 指向的地址（tempPtr + 4）
    writer.putTestRegReg('esi', 'esi');
    writer.putSubRegImm('esp', 0x14);
    writer.putMovRegAddress('ecx', chat_room);
    writer.putPushReg('eax');
    writer.putCallAddress(init_chat_msg_addr);
    writer.putMovRegReg('ecx', 'ebx'); // 使用 EBX 替代 temp
    writer.putMovRegAddress('eax', membersBuffer.add(Process.pointerSize));
    writer.putPushReg('eax');
    writer.putCallAddress(add_member_addr);
    writer.putPopfx();
    writer.putPopax();
    writer.flush();
  });

  const nativeFunction = new NativeFunction(ptr(txtAsm), 'void', []);
  try {
    const success = nativeFunction();
    console.log('success:', success);
    return success;
  } catch (e) {
    console.error('[添加群成员]Error during addMemberToChatRoom nativeFunction function execution:', e);
    return false;

  }
};
// addMemberToChatRoom('21341182572@chatroom', ['ledongmao'])

// 邀请群成员
/**21:30:53 ERR SidecarBody [SCRIPT_MESSAGRE_HANDLER_SYMBOL]() MessageType.Error: Error: access violation accessing 0x2538fc20
    at inviteMemberToChatRoom (/script1.js:1040)
    at <eval> (/script1.js:1043)
file:///C:/Users/Administrator/Documents/GitHub/puppet-xp/node_modules/sidecar/src/sidecar-body/sidecar-body.ts:400
          const e = new Error(message.description)
                    ^
Error: Error: access violation accessing 0x2538fc20
    at WeChatSidecar.[scriptMessageHandler] (file:///C:/Users/Administrator/Documents/GitHub/puppet-xp/node_modules/sidecar/src/sidecar-body/sidecar-body.ts:400:21
)
    at C:\Users\Administrator\Documents\GitHub\puppet-xp\node_modules\frida\dist\script.js:95:21
----- Agent Script Internal -----
Error: access violation accessing 0x2538fc20
    at inviteMemberToChatRoom (/script1.js:1040)
    at <eval> (/script1.js:1043) */
const inviteMemberToChatRoom = (chat_room_id, wxids) => {
  console.log('chat_room_id:', chat_room_id, 'wxids:', wxids);
  const base_addr = moduleBaseAddress; // 假设基础地址已经定义好
  const chat_room = Memory.allocUtf16String(chat_room_id);
  const members = wxids.map(id => Memory.allocUtf16String(id));
  const membersBuffer = Memory.alloc(Process.pointerSize * (members.length + 2));
  membersBuffer.writePointer(NULL);
  membersBuffer.add(Process.pointerSize).writePointer(membersBuffer.add(Process.pointerSize * 2));

  for (let i = 0; i < members.length; i++) {
    membersBuffer.add(Process.pointerSize * (2 + i)).writePointer(members[i]);
  }

  const get_chat_room_mgr_addr = base_addr.add(wxOffsets.chatRoomMgr.WX_CHAT_ROOM_MGR_OFFSET);
  const invite_addr = base_addr.add(0xbd1a00); // 示例偏移量
  const get_share_record_mgr_addr = base_addr.add(wxOffsets.shareRecordMgr.WX_SHARE_RECORD_MGR_OFFSET);
  const init_chat_msg_addr = base_addr.add(wxOffsets.setChatMsgValue.WX_INIT_CHAT_MSG_OFFSET);
  const fn1 = base_addr.add(0x7f99d0); // 示例偏移量
  const fn2 = base_addr.add(0x78cef0); // 示例偏移量
  const fn3 = base_addr.add(0x7fa980); // 示例偏移量
  const fn4 = base_addr.add(0x755060); // 示例偏移量

  const sys_addr = base_addr.add(0x116C); // 示例偏移量
  const addr = Memory.alloc(Process.pointerSize * 2);
  addr.writePointer(sys_addr);
  addr.add(Process.pointerSize).writePointer(NULL);

  const txtAsm: any = Memory.alloc(Process.pageSize);

  Memory.patchCode(txtAsm, Process.pageSize, code => {
    const writer = new X86Writer(code, { pc: txtAsm });
    writer.putPushax();
    writer.putPushfx();
    writer.putCallAddress(get_share_record_mgr_addr);
    writer.putMovRegAddress('ecx', addr);
    writer.putPushReg('ecx');
    writer.putMovRegReg('ecx', 'eax');
    writer.putCallAddress(fn1);
    writer.putCallAddress(get_chat_room_mgr_addr);
    writer.putSubRegImm('esp', 0x8);
    writer.putMovRegAddress('eax', addr);
    writer.putMovRegAddress('ecx', txtAsm.add(8)); // 使用 txtAsm 的一部分来模拟栈
    writer.putPushReg('eax');
    writer.putCallAddress(fn2);
    writer.putSubRegImm('esp', 0x14);
    writer.putMovRegAddress('ecx', txtAsm.add(24)); // 使用 txtAsm 的另一部分来模拟栈
    writer.putMovRegAddress('eax', chat_room);
    writer.putPushReg('eax');
    writer.putCallAddress(init_chat_msg_addr);
    writer.putMovRegAddress('eax', membersBuffer.add(Process.pointerSize));
    writer.putPushReg('eax');
    writer.putCallAddress(invite_addr);
    writer.putCallAddress(get_share_record_mgr_addr);
    writer.putPushU32(0x0);
    writer.putPushU32(0x1);
    writer.putMovRegReg('ecx', 'eax');
    writer.putCallAddress(fn3);
    writer.putMovRegAddress('ecx', addr);
    writer.putCallAddress(fn4);
    writer.putPopfx();
    writer.putPopax();
    writer.flush();
  });

  const nativeFunction = new NativeFunction(ptr(txtAsm), 'void', []);
  try {
    const success = nativeFunction();
    return success;
  } catch (e) {
    console.error('[邀请进群]Error during inviteMemberToChatRoom nativeFunction function execution:', e);
    return false;
  }
};

// inviteMemberToChatRoom('21341182572@chatroom', ['ledongmao'])

// 发送文本消息
const sendMsgNativeFunction = (talkerId: any, content: any) => {

  const txtAsm: any = Memory.alloc(Process.pageSize)
  // const buffwxid = Memory.alloc(0x20)

  const wxidPtr: any = Memory.alloc(talkerId.length * 2 + 2)
  wxidPtr.writeUtf16String(talkerId)

  const picWxid = Memory.alloc(0x0c)
  picWxid.writePointer(ptr(wxidPtr)).add(0x04)
    .writeU32(talkerId.length * 2).add(0x04)
    .writeU32(talkerId.length * 2).add(0x04)

  const contentPtr = Memory.alloc(content.length * 2 + 2)
  contentPtr.writeUtf16String(content)

  const sizeOfStringStruct = Process.pointerSize * 5
  const contentStruct = Memory.alloc(sizeOfStringStruct)

  contentStruct
    .writePointer(contentPtr).add(0x4)
    .writeU32(content.length).add(0x4)
    .writeU32(content.length * 2)

  const ecxBuffer = Memory.alloc(0x2d8)

  Memory.patchCode(txtAsm, Process.pageSize, code => {
    const cw = new X86Writer(code, {
      pc: txtAsm,
    })
    cw.putPushfx()
    cw.putPushax()

    cw.putPushU32(0x0)
    cw.putPushU32(0x0)
    cw.putPushU32(0x0)
    cw.putPushU32(0x1)
    cw.putPushU32(0x0)

    // cw.putMovRegReg

    cw.putMovRegAddress('eax', contentStruct)
    cw.putPushReg('eax')

    cw.putMovRegAddress('edx', picWxid) // room_id

    cw.putMovRegAddress('ecx', ecxBuffer)
    cw.putCallAddress(moduleBaseAddress.add(
      wxOffsets.sendText.WX_SEND_TEXT_OFFSET,
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

}

// 发送@消息
let asmAtMsg:any = null
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
      wxOffsets.sendText.WX_SEND_TEXT_OFFSET
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

// sendAtMsgNativeFunction('21341182572@chatroom', new Date().toLocaleString(), 'ledongmao', '超哥')

// 发送图片消息
const sendPicMsgNativeFunction = (contactId: string, path: string) => {

  const picAsm: any = Memory.alloc(Process.pageSize)
  const buffwxid = Memory.alloc(0x20)
  const picbuff = Memory.alloc(0x2D8)

  const pathPtr = Memory.alloc(path.length * 2 + 1)
  pathPtr.writeUtf16String(path)

  const imagefilepath = Memory.alloc(0x24)
  imagefilepath.writePointer(pathPtr).add(0x04)
    .writeU32(path.length * 2).add(0x04)
    .writeU32(path.length * 2).add(0x04)

  const picWxidPtr: any = Memory.alloc(contactId.length * 2 + 1)
  picWxidPtr.writeUtf16String(contactId)

  const picWxid = Memory.alloc(0x0c)
  picWxid.writePointer(ptr(picWxidPtr)).add(0x04)
    .writeU32(contactId.length * 2).add(0x04)
    .writeU32(contactId.length * 2).add(0x04)

  // const test_offset1 = 0x701DC0;
  Memory.patchCode(picAsm, Process.pageSize, code => {
    const cw = new X86Writer(code, {
      pc: picAsm,
    })
    cw.putPushfx()
    cw.putPushax()
    cw.putCallAddress(moduleBaseAddress.add(
      wxOffsets.sendMessageMgr.WX_SEND_MESSAGE_MGR_OFFSET,
    ))
    cw.putMovRegReg('edx', 'eax') // 缓存

    cw.putSubRegImm('esp', 0x14)
    cw.putMovRegAddress('eax', buffwxid)
    cw.putMovRegReg('ecx', 'esp')
    cw.putMovRegAddress('edi', imagefilepath)
    cw.putPushReg('eax')
    cw.putCallAddress(moduleBaseAddress.add(
      wxOffsets.setChatMsgValue.WX_INIT_CHAT_MSG_OFFSET,
    ))

    cw.putMovRegReg('ecx', 'edx')
    cw.putMovRegAddress('eax', picWxid) //= lea
    cw.putMovRegAddress('edi', imagefilepath)
    cw.putPushReg('edi')
    cw.putPushReg('eax')
    cw.putMovRegAddress('eax', picbuff)
    cw.putPushReg('eax')

    cw.putMovRegAddress('edi', picWxid) // edi
    cw.putCallAddress(moduleBaseAddress.add(
      wxOffsets.sendImage.WX_SEND_IMAGE_OFFSET,
    ))

    cw.putPopax()
    cw.putPopfx()
    cw.putRet()
    cw.flush()

  })

  // console.log('----------picAsm',picAsm)
  const nativeativeFunction = new NativeFunction(ptr(picAsm), 'void', [])
  nativeativeFunction()

}

// 接收消息回调
const recvMsgNativeCallback = (() => {

  const nativeCallback = new NativeCallback(() => { }, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'int32'])
  const nativeativeFunction = new NativeFunction(nativeCallback, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'int32'])

  try {
    Interceptor.attach(
      moduleBaseAddress.add(wxOffsets.hookMsg.WX_RECV_MSG_HOOK_OFFSET), {
      onEnter() {
        try {
          const addr = (this.context as any).ecx // 0xc30-0x08
          const msgType = addr.add(0x38).readU32()
          const isMyMsg = addr.add(0x3C).readU32() // add isMyMsg

          if (msgType > 0) {

            const talkerIdPtr = addr.add(0x48).readPointer()
            // console.log('txt msg',talkerIdPtr.readUtf16String())
            const talkerIdLen = addr.add(0x48 + 0x04).readU32() * 2 + 2

            const myTalkerIdPtr = Memory.alloc(talkerIdLen)
            Memory.copy(myTalkerIdPtr, talkerIdPtr, talkerIdLen)

            let contentPtr: any = null
            let contentLen = 0
            let myContentPtr: any = null
            console.log('msgType', msgType)

            if (msgType === 3) { // pic path
              const thumbPtr = addr.add(0x19c).readPointer()
              const hdPtr = addr.add(0x1b0).readPointer()
              const thumbPath = thumbPtr.readUtf16String()
              const hdPath = hdPtr.readUtf16String()
              const picData = [
                thumbPath, //  PUPPET.types.Image.Unknown
                thumbPath, //  PUPPET.types.Image.Thumbnail
                hdPath, //  PUPPET.types.Image.HD
                hdPath, //  PUPPET.types.Image.Artwork
              ]
              const content = JSON.stringify(picData)
              console.log('pic msg', content)
              myContentPtr = Memory.allocUtf16String(content)
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
            let myGroupMsgSenderIdPtr: any = null
            if (groupMsgAddr === 0) { // weChatPublic is zero，type is 49

              myGroupMsgSenderIdPtr = Memory.alloc(0x10)
              myGroupMsgSenderIdPtr.writeUtf16String('null')

            } else {

              const groupMsgSenderIdPtr = addr.add(0x174).readPointer()
              const groupMsgSenderIdLen = addr.add(0x174 + 0x04).readU32() * 2 + 2
              myGroupMsgSenderIdPtr = Memory.alloc(groupMsgSenderIdLen)
              Memory.copy(myGroupMsgSenderIdPtr, groupMsgSenderIdPtr, groupMsgSenderIdLen)

            }

            const xmlNullPtr = addr.add(0x1f0).readU32() // 3.9.2.23
            let myXmlContentPtr: any = null
            if (xmlNullPtr === 0) {

              myXmlContentPtr = Memory.alloc(0x10)
              myXmlContentPtr.writeUtf16String('null')

            } else {
              const xmlContentPtr = addr.add(0x1f0).readPointer() // 3.9.2.23

              const xmlContentLen = addr.add(0x1f0 + 0x04).readU32() * 2 + 2
              myXmlContentPtr = Memory.alloc(xmlContentLen)
              Memory.copy(myXmlContentPtr, xmlContentPtr, xmlContentLen)
            }

            setImmediate(() => nativeativeFunction(msgType, myTalkerIdPtr, myContentPtr, myGroupMsgSenderIdPtr, myXmlContentPtr, isMyMsg))
          }
        } catch (e: any) {
          console.error('接收消息回调失败：', e)
          throw new Error(e)
        }
      },
    })
    return nativeCallback
  } catch (e) {
    console.error('回调消息失败：')
    return null
  }

})()
