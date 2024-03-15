// frida -n WeChat.exe -l frida.js
// 偏移地址,来自于wxhelper项目
const log = {
  info: (a: any, b: any) => {
    let text = ''
    for (let i = 0; i < a.length + 4; i++) {
      text += '-'
    }
    text += ''
    console.log(text)
    console.log(`${a}`)
    // console.log(text)
    console.log(b)
    console.log(text)
  },
  error: (a: any, b: any) => {
    console.error(a, b)
  },

}

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
    WX_HEAD_IMAGE_MGR_OFFSET: 0x807b00,
    QUERY_THEN_DOWNLOAD_OFFSET: 0xc63470
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
  sendLink: {
    NEW_MM_READ_ITEM_OFFSET: 0x76e630,
    FREE_MM_READ_ITEM_OFFSET: 0x76da30,
    FREE_MM_READ_ITEM_2_OFFSET: 0x76e350,
    FORWARD_PUBLIC_MSG_OFFSET: 0xb73000
  },
  sendApp: {
    // send app msg
    // #define NEW_SHARE_APP_MSG_REQ_OFFSET 0xfb9890
    NEW_SHARE_APP_MSG_REQ_OFFSET: 0xfb9890,
    // #define FREE_SHARE_APP_MSG_REQ_OFFSET 0xfbc0d0
    FREE_SHARE_APP_MSG_REQ_OFFSET: 0xfbc0d0,
    // #define FREE_SHARE_APP_MSG_REQ_OFFSET 0xfbab40
    NEW_SHARE_APP_MSG_INFO_OFFSET: 0xfbab40,
    // #define NEW_WA_UPDATABLE_MSG_INFO_OFFSET 0x7b3290
    NEW_WA_UPDATABLE_MSG_INFO_OFFSET: 0x7b3290,
    // #define FREE_WA_UPDATABLE_MSG_INFO_OFFSET 0x79ca10
    FREE_WA_UPDATABLE_MSG_INFO_OFFSET: 0x79ca10,
    // #define SEND_APP_MSG_OFFSET 0xfe7840
    SEND_APP_MSG_OFFSET: 0xfe7840,
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
const moduleBaseAddress = Module.getBaseAddress('WeChatWin.dll')
const moduleLoad = Module.load('WeChatWin.dll')
console.log('baseAddr:', moduleBaseAddress)
// console.log('moduleLoad', moduleLoad)

/* -----------------base------------------------- */
let retidPtr: any = null
let retidStruct: any = null
const initidStruct = ((str: string | any[]) => {

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

const readStringPtr = (address: number) => {
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

const readWStringPtr = (address: number) => {
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

const readByteArray = (address: any) => {
  return readStringPtr(address).readByteArray(16)
}

const readWideString = (address: any) => {
  return readWStringPtr(address).readUtf16String()
}

const createWeChatString = (s: string) => {
  // 分配内存为 WeChatString 结构体：ptr (4 bytes), length (4 bytes), max_length (4 bytes), c_ptr (4 bytes), c_len (4 bytes)
  const stringStruct = Memory.alloc(Process.pointerSize * 5);
  const stringLength = s.length;
  const stringMaxLen = stringLength * 2;
  const stringBuffer = Memory.allocUtf16String(s); // 为字符串数据分配内存并将字符串写入其中。

  // 构造 WeChatString 结构
  stringStruct.writePointer(stringBuffer);                     // ptr
  stringStruct.add(Process.pointerSize).writeU32(stringLength); // length
  stringStruct.add(Process.pointerSize * 2).writeU32(stringMaxLen); // max_length
  // c_ptr 和 c_len 可以保持默认的0值，不需要写入。

  return stringStruct;
}

const readWeChatString = (address: any) => {
  const ptr = address.readPointer();
  const len = address.add(Process.pointerSize).readU32();
  return ptr.readUtf16String(len);
}

// ok，发送文本消息
const sendMsgNativeFunction = (talkerId: string, content: string) => {

  // const buffwxid = Memory.alloc(0x20)

  // const wxidPtr: any = Memory.alloc(talkerId.length * 2 + 2)
  // wxidPtr.writeUtf16String(talkerId)
  // const wxidStruct = Memory.alloc(0x0c)
  // wxidStruct.writePointer(ptr(wxidPtr)).add(0x04)
  //   .writeU32(talkerId.length * 2).add(0x04)
  //   .writeU32(talkerId.length * 2).add(0x04)

  const wxidStruct = initidStruct(talkerId)

  // const contentPtr = Memory.alloc(content.length * 2 + 2)
  // contentPtr.writeUtf16String(content)
  // const contentStruct = Memory.alloc(Process.pointerSize * 5)
  // contentStruct
  //   .writePointer(contentPtr).add(0x4)
  //   .writeU32(content.length).add(0x4)
  //   .writeU32(content.length * 2)

  const contentStruct = initStruct(content)
  const ecxBuffer = Memory.alloc(0x2d8)
  const successPtr = Memory.alloc(4)

  const txtAsm: any = Memory.alloc(Process.pageSize)
  Memory.patchCode(txtAsm, Process.pageSize, code => {
    const cw = new X86Writer(code, {
      pc: txtAsm,
    })
    // PUSHFD
    cw.putPushfx()
    cw.putPushax()
    // CALL       send_message_mgr_addr
    // PUSH       0x0
    // PUSH       0x0
    // PUSH       0x0
    // PUSH       0x1
    // PUSH       0x0
    cw.putPushU32(0x0)
    cw.putPushU32(0x0)
    cw.putPushU32(0x0)
    cw.putPushU32(0x1)
    cw.putPushU32(0x0)
    // MOV        EAX,msg_pptr
    cw.putMovRegAddress('eax', contentStruct)
    // PUSH       EAX
    cw.putPushReg('eax')
    // LEA        EDX,to_user
    cw.putMovRegAddress('edx', wxidStruct) // room_id
    // LEA        ECX,chat_msg
    cw.putMovRegAddress('ecx', ecxBuffer)
    // CALL       send_text_msg_addr 
    cw.putCallAddress(moduleBaseAddress.add(
      wxOffsets.sendText.WX_SEND_TEXT_OFFSET,
    ))
    cw.putMovNearPtrReg(successPtr, 'eax')
    // MOV        success,EAX
    // ADD        ESP,0x18
    cw.putAddRegImm('esp', 0x18)
    // LEA        ECX,chat_msg        
    // CALL       free_chat_msg_addr

    // POPFD
    // POPAD
    cw.putPopax()
    cw.putPopfx()
    cw.putRet()
    cw.flush()

  })

  // console.log('----------txtAsm', txtAsm)
  const nativeativeFunction = new NativeFunction(ptr(txtAsm), 'void', [])
  try {
    nativeativeFunction()
    console.log('[发送消息] successPtr:', successPtr.readS32())
  } catch (e) {
    log.error('[发送消息]Error:', e)
  }
}

// sendMsgNativeFunction('ledongmao', new Date().toLocaleString() + '测试发送文本消息')

// 发送link消息——未完成，无报错信息但没有发送成功
let toUser: NativePointerValue, wTitle: NativePointerValue, wUrl: NativePointerValue, wThumburl: NativePointerValue, wSender: NativePointerValue, wName: NativePointerValue, wDigest: NativePointerValue
const sendLinkMsgNativeFunction = (wxid: string, title: string, url: string, thumburl: string, senderId: string, senderName: string, digest: string) => {
  console.log('Function called with wxid:', wxid, 'title:', title, 'url:', url, 'thumburl:', thumburl, 'senderId:', senderId, 'senderName:', senderName, 'digest:', digest);
  // int success = -1;
  let success = -1;
  const successPtr = Memory.alloc(4);
  successPtr.writeS32(-1)

  const successPtr1 = Memory.alloc(4);
  successPtr1.writeS32(-1)

  // DWORD init_chat_msg_addr = base_addr_ + WX_INIT_CHAT_MSG_OFFSET;
  const init_chat_msg_addr = moduleBaseAddress.add(wxOffsets.setChatMsgValue.WX_INIT_CHAT_MSG_OFFSET); // 这些偏移量需要替换为实际的偏移量
  // DWORD app_msg_mgr_addr = base_addr_ + WX_APP_MSG_MGR_OFFSET;
  const app_msg_mgr_addr = moduleBaseAddress.add(wxOffsets.appMsgMgr.WX_APP_MSG_MGR_OFFSET);
  // DWORD new_item_addr = base_addr_ + NEW_MM_READ_ITEM_OFFSET;
  const new_item_addr = moduleBaseAddress.add(wxOffsets.sendLink.NEW_MM_READ_ITEM_OFFSET);
  // DWORD free_item_2_addr = base_addr_ + FREE_MM_READ_ITEM_2_OFFSET;
  const free_item_2_addr = moduleBaseAddress.add(wxOffsets.sendLink.FREE_MM_READ_ITEM_2_OFFSET);
  // DWORD forward_public_msg_addr = base_addr_ + FORWARD_PUBLIC_MSG_OFFSET;
  const forward_public_msg_addr = moduleBaseAddress.add(wxOffsets.sendLink.FORWARD_PUBLIC_MSG_OFFSET);

  // char buff[0x238] = {0};
  const buffSize = 0x238;
  const buff = Memory.alloc(buffSize);
  // 初始化整个区域为0
  for (let i = 0; i < buffSize; i++) {
    buff.add(i).writeU8(0x00);
  }
  // 调用 newItemAddr 函数初始化 buff
  const txtAsm1: any = Memory.alloc(Process.pageSize)
  Memory.patchCode(txtAsm1, Process.pageSize, code => {
    const writer = new X86Writer(code, {
      pc: txtAsm1,
    })
    //   PUSHAD
    //   PUSHFD
    writer.putPushfx();
    writer.putPushax();
    //   LEA        ECX,buff
    writer.putMovRegAddress('ecx', buff);
    //   CALL       new_item_addr
    writer.putCallAddress(new_item_addr);
    writer.putMovNearPtrReg(successPtr, 'eax'); // 调试打印结果
    //   POPFD
    //   POPAD
    writer.putPopax();
    writer.putPopfx();
    writer.putRet()
    writer.flush();
  })

  log.info('[call] newItemAddr res:', successPtr.readS32());

  // console.log('----------txtAsm', txtAsm)
  const newItem = new NativeFunction(txtAsm1, 'void', [])
  newItem()

  // const newItem = new NativeFunction(newItemAddr, 'void', ['pointer']);
  // console.log('newItem:', newItem);
  // newItem(buff);
  // console.log('buff1:', buff);

  // 创建WeChatString对象
  // WeChatString to_user(wxid);
  toUser = initStruct(wxid);
  // WeChatString wtitle(title);
  wTitle = initStruct(title);

  // WeChatString wurl(url);
  wUrl = initStruct(url);

  // WeChatString wthumburl(thumburl);
  wThumburl = initStruct(thumburl);

  // WeChatString wsender(senderId);
  wSender = initStruct(senderId);

  // WeChatString wname(senderName);
  wName = initStruct(senderName);

  // WeChatString wdigest(digest);
  wDigest = initStruct(digest);


  console.log('toUser:', toUser, 'wTitle:', wTitle, 'wUrl:', wUrl, 'wThumburl:', wThumburl, 'wSender:', wSender, 'wName:', wName, 'wDigest:', wDigest);
  // 将WeChatString对象的地址复制到buff中的相应位置
  // 注意：这里的偏移量需要根据实际的结构体布局调整

  // 假设wTitle, wUrl, wThumburl, wDigest, wSender, wName已经按WeChatString结构创建并分配了内存
  buff.add(0x4).writeByteArray(readByteArray(wTitle));
  buff.add(0x2C).writeByteArray(readByteArray(wUrl));
  buff.add(0x6C).writeByteArray(readByteArray(wThumburl));
  buff.add(0x94).writeByteArray(readByteArray(wDigest));
  buff.add(0x1A0).writeByteArray(readByteArray(wSender));
  buff.add(0x1B4).writeByteArray(readByteArray(wName));

  // 调用其他函数完成消息的转发
  try {

    // 调用 newItemAddr 函数初始化 buff
    const txtAsm2 = Memory.alloc(Process.pageSize)
    console.log('txtAsm2:', txtAsm2);
    Memory.patchCode(txtAsm2, Process.pageSize, code => {
      const writer = new X86Writer(code, {
        pc: txtAsm2,
      })

      //   PUSHAD
      //   PUSHFD
      writer.putPushax();
      writer.putPushfx();
      // CALL       app_msg_mgr_addr
      console.log('appMsgMgrAddr:', app_msg_mgr_addr);
      writer.putCallAddress(app_msg_mgr_addr);
      writer.putMovNearPtrReg(successPtr1, 'eax');
      // LEA        ECX,buff
      writer.putMovRegAddress('ecx', buff);
      // PUSH       ECX
      writer.putPushReg('ecx');
      // SUB        ESP,0x14
      writer.putSubRegImm('esp', 0x14);
      // MOV        EDI,EAX
      writer.putMovRegReg('edi', 'eax');
      // MOV        ECX,ESP
      writer.putMovRegReg('ecx', 'esp');
      // LEA        EBX,to_user
      writer.putMovRegAddress('ebx', toUser);
      // PUSH       EBX
      writer.putPushReg('ebx'); // PUSH EBX
      // CALL       init_chat_msg_addr   
      console.log('initChatMsgAddr:', init_chat_msg_addr);
      writer.putCallAddress(init_chat_msg_addr);
      writer.putMovNearPtrReg(successPtr1, 'eax');
      // MOV        ECX,EDI
      writer.putMovRegReg('ecx', 'edi');
      // CALL       forward_public_msg_addr
      writer.putCallAddress(forward_public_msg_addr);
      // MOV        success,EAX
      writer.putMovNearPtrReg(successPtr1, 'eax');
      // ADD        EBX,0x14
      writer.putAddRegImm('ebx', 0x14);
      // LEA        ECX,buff
      writer.putMovRegAddress('ecx', buff);
      // PUSH       0x0
      writer.putPushU32(0x0);
      // CALL       free_item_2_addr
      // console.log('freeItem2Addr:', free_item_2_addr);
      writer.putCallAddress(free_item_2_addr);
      writer.putMovNearPtrReg(successPtr1, 'eax');

      console.log('writer end');
      // POPFD
      // POPAD
      writer.putPopfx();
      writer.putPopax();
      writer.putRet()
      writer.flush();
      console.log('writer flush');
    })

    // console.log('----------txtAsm2', txtAsm2)
    const newItem1 = new NativeFunction(txtAsm2, 'void', [])
    newItem1()
    success = successPtr1.readU32();
    log.info('[发送link消息]success:', success);
    return success;
  } catch (e) {
    log.error('[发送link消息]Error during sendLinkMsgNativeFunction function execution:', e);
    return false;
  }
}

sendLinkMsgNativeFunction('ledongmao', '标题是测试', 'https://www.json.cn', 'https://wechaty.js.org/assets/logo.png', 'wxid_0o1t51l3f57221', '大师', '这是描述...')

// ok
const checkLogin = () => {
  let success = -1;
  const accout_service_addr = moduleBaseAddress.add(wxOffsets.login.WX_ACCOUNT_SERVICE_OFFSET);
  // const service_addr = null;
  // __asm {
  //     PUSHAD 
  //     CALL       accout_service_addr                          
  //     MOV        service_addr,EAX
  //     POPAD
  // }
  // if (service_addr) {
  //   success = *(DWORD *)(service_addr + 0x4E0);
  // }
  // 创建原生函数对象，此处假设该函数返回'pointer'并且不需要输入参数
  let getAccountService = new NativeFunction(accout_service_addr, 'pointer', []);

  // 调用原生函数并获取服务地址
  let service_addr = getAccountService();

  // 判断服务地址是否有效
  if (!service_addr.isNull()) {
    // 成功获取账户服务地址，现在访问0x4E0偏移的值
    // 注意：针对返回的地址，必须使用正确的类型，这里假设它是DWORD
    success = service_addr.add(0x4E0).readU32();
  }
  console.log('[当前登录状态]checkLogin success:', success === 1 ? '已登录' : '未登录');
  // 返回获得的状态值
  return success;
}

const login = checkLogin()
console.log('login:', login)

// 移除群成员——未完成,2024-03-13，报错信息Error during delMemberFromChatRoom nativeFunction function execution: Error: access violation accessing 0x53
const DelMemberFromChatRoom = (chat_room_id: string, wxids: string[]) => {
  // int ChatRoomMgr::DelMemberFromChatRoom(wchar_t* chat_room_id, wchar_t** wxids,
  //   int len) {
    const len = wxids.length;
// int success = 0;
let success = 0;
const successPtr = Memory.alloc(4);
successPtr.writeS32(0);

// WeChatString chat_room(chat_room_id);
const chat_room = initidStruct(chat_room_id);
// vector<WeChatString> members;
// VectorInner* list = (VectorInner*)&members;
// DWORD members_ptr = (DWORD)&list->start;
// 创建一个 NativePointer 对象来模拟 `members` 的内存
const members = Memory.alloc(Process.pointerSize * 3); // std::vector 在内存中通常有三个指针：start, finish, end_of_storage
// 创建一个 NativePointer 对象来模拟 `list` 的内存
const list = members;
// 获取 `list->start` 的地址
const members_ptr = list;

// for (int i = 0; i < len; i++) {
// WeChatString pwxid(wxids[i]);
// members.push_back(pwxid);
// }

for (let i = 0; i < len; i++) {
  const pwxid = initidStruct(wxids[i]);
  // members.push_back(pwxid);
  members.writePointer(pwxid);
}

// DWORD get_chat_room_mgr_addr = base_addr_ + WX_CHAT_ROOM_MGR_OFFSET;
const get_chat_room_mgr_addr = moduleBaseAddress.add(wxOffsets.chatRoomMgr.WX_CHAT_ROOM_MGR_OFFSET);
// DWORD del_member_addr = base_addr_ + WX_DEL_CHAT_ROOM_MEMBER_OFFSET;
const del_member_addr = moduleBaseAddress.add(wxOffsets.chatRoom.WX_DEL_CHAT_ROOM_MEMBER_OFFSET);
// DWORD init_chat_msg_addr = base_addr_ + WX_INIT_CHAT_MSG_OFFSET;
const init_chat_msg_addr = moduleBaseAddress.add(wxOffsets.setChatMsgValue.WX_INIT_CHAT_MSG_OFFSET);

const txtAsm: any = Memory.alloc(Process.pageSize)

Memory.patchCode(txtAsm, Process.pageSize, code => {
  const cw = new X86Writer(code, {
    pc: txtAsm,
  })

  // PUSHAD
  // PUSHFD
  cw.putPushfx()
  cw.putPushax()
  // CALL       get_chat_room_mgr_addr   
  cw.putCallAddress(get_chat_room_mgr_addr)                           
  // SUB        ESP,0x14
  cw.putSubRegImm('esp', 0x14)
  // MOV        ESI,EAX
  cw.putMovRegReg('esi', 'eax')
  // MOV        ECX,ESP
  cw.putMovRegReg('ecx', 'esp')
  // LEA        EDI,chat_room
  cw.putMovRegAddress('edi', chat_room)
  // PUSH       EDI
  cw.putPushReg('edi')
  // CALL       init_chat_msg_addr   
  cw.putCallAddress(init_chat_msg_addr) 
  // MOV        ECX,ESI
  cw.putMovRegReg('ecx', 'esi')
  // MOV        EAX,dword ptr[members_ptr]
  cw.putMovRegNearPtr('eax', members_ptr)
  // PUSH       EAX
  cw.putPushReg('eax')
  // CALL       del_member_addr 
  cw.putCallAddress(del_member_addr)  
  // MOV        success,EAX    
  cw.putMovNearPtrReg(successPtr, 'eax')    
  // POPFD
  // POPAD
  cw.putPopax()
  cw.putPopfx()
  cw.putRet()
  cw.flush()
})

const nativeFunction = new NativeFunction(ptr(txtAsm), 'void', [])
try {
  nativeFunction()
  success = successPtr.readS32()
  console.log('[移除群成员]successPtr:', successPtr.readS32())
} catch (e) {
  log.error('[移除群成员]Error:', e)
}
// }

}

DelMemberFromChatRoom('21341182572@chatroom', ['ledongmao'])

// 添加好友——未完成，报错信息：Error: Error: access violation accessing 0x680b8c08
const addFriendByWxid = (wxid: string, msg: string) => {
  // int success = -1;
  let success = -1;
  const successPtr = Memory.alloc(4);
  successPtr.writeS32(-1)
  const successPtr1 = Memory.alloc(4);
  successPtr1.writeS32(-1)

  // DWORD contact_mgr_addr = base_addr_ + WX_CONTACT_MGR_OFFSET;
  const contact_mgr_addr = moduleBaseAddress.add(wxOffsets.contactMgr.WX_CONTACT_MGR_OFFSET);
  // DWORD verify_msg_addr = base_addr_ + WX_VERIFY_MSG_OFFSET;
  const verify_msg_addr = moduleBaseAddress.add(wxOffsets.contact.WX_VERIFY_MSG_OFFSET);
  // DWORD set_value_addr = base_addr_ + WX_INIT_CHAT_MSG_OFFSET;
  const set_value_addr = moduleBaseAddress.add(wxOffsets.setChatMsgValue.WX_INIT_CHAT_MSG_OFFSET);
  // DWORD do_verify_user_addr = base_addr_ + WX_DO_VERIFY_USER_OFFSET;
  const do_verify_user_addr = moduleBaseAddress.add(wxOffsets.contact.WX_DO_VERIFY_USER_OFFSET);
  // DWORD fn1_addr = base_addr_ + 0x7591b0;
  const fn1_addr = moduleBaseAddress.add(0x7591b0);
  // WeChatString user_id(wxid);
  const user_id = initidStruct(wxid);
  // WeChatString w_msg(msg);
  const w_msg = initmsgStruct(msg);
  console.log('user_id:', user_id, 'w_msg:', w_msg)
  console.log('user_id:', readWideString(user_id), 'w_msg:', readWideString(w_msg))

  // DWORD instance =0;
  const instance = -1;
  let instancePtr = Memory.alloc(4);
  instancePtr.writeS32(instance)

  let instancePtr1 = Memory.alloc(4);
  instancePtr1.writeS32(instance)

  // Unkown null_obj={0,0,0,0,0,0xF};
  const null_obj = Memory.alloc(0x18);
  //    EDI,0xE  ESI,0   all
  //    EDI,0xE  ESI,8   only chat
  //    EDI,0xE  ESI,1   no let look 
  //    EDI,0xE  ESI,2   no look 

  const txtAsm: any = Memory.alloc(Process.pageSize)
  Memory.patchCode(txtAsm, Process.pageSize, code => {
    const cw = new X86Writer(code, {
      pc: txtAsm,
    })

    // PUSHAD
    // PUSHFD
    cw.putPushfx()
    cw.putPushax()
    // CALL       contact_mgr_addr    
    cw.putCallAddress(contact_mgr_addr)
    // MOV        dword ptr [instance],EAX    
    cw.putMovNearPtrReg(instancePtr, 'eax')
    console.log('call contact_mgr_addr res:', instancePtr.readU32())
    // MOV        EDI,0xE
    cw.putMovRegU32('edi', 0xE)
    // MOV        ESI,0x8
    cw.putMovRegU32('esi', 0x8)
    // MOV        EAX,0x2  
    cw.putMovRegU32('eax', 0x2)
    // SUB        ESP,0x18   
    cw.putSubRegImm('esp', 0x18)
    // MOV        EAX,ESP
    cw.putMovRegReg('eax', 'esp')
    // MOV        dword ptr ds:[EAX],0  
    cw.putMovRegOffsetPtrU32('eax', 0x0, 0)
    // MOV        dword ptr ds:[EAX+0x14],0xF
    cw.putMovRegOffsetPtrU32('eax', 0x14, 0xF)
    // MOV        dword ptr ds:[EAX+0x10],0 
    cw.putMovRegOffsetPtrU32('eax', 0x10, 0)
    // MOV        byte ptr ds:[EAX],0  
    cw.putBytes('66 C7 00 00');
    // SUB        ESP,0x18
    cw.putSubRegImm('esp', 0x18)
    // LEA        EAX,null_obj   
    cw.putMovRegAddress('eax', null_obj)
    // MOV        ECX,ESP
    cw.putMovRegReg('ecx', 'esp')
    // PUSH       EAX    
    cw.putPushReg('eax')
    // CALL       fn1_addr    
    cw.putCallAddress(fn1_addr)
    cw.putMovNearPtrReg(successPtr, 'eax')
    console.log('call fn1_addr res:', successPtr.readU32())
    // PUSH       ESI
    cw.putPushReg('esi')
    // PUSH       EDI
    cw.putPushReg('edi')
    // MOV        EAX,w_msg       
    cw.putMovRegAddress('eax', w_msg)
    cw.putMovNearPtrReg(successPtr, 'eax')
    console.log('w_msg 入参:', readWideString(w_msg))
    // SUB        ESP,0x14
    cw.putSubRegImm('esp', 0x14)
    // MOV        ECX,ESP
    cw.putMovRegReg('ecx', 'esp')
    // PUSH       -0x1
    cw.putPushU32(-0x1)
    // PUSH       EAX
    cw.putPushReg('eax')
    cw.putMovNearPtrReg(successPtr, 'eax')
    console.log('call verify_msg_addr input:', successPtr.readU32())
    // CALL       verify_msg_addr  
    cw.putCallAddress(verify_msg_addr)
    cw.putMovNearPtrReg(successPtr, 'eax')
    console.log('call verify_msg_addr res:', successPtr.readU32())
    // PUSH       0x2
    cw.putPushU32(0x2)
    // LEA        EAX,user_id
    cw.putMovRegAddress('eax', user_id)
    // SUB        ESP,0x14
    cw.putSubRegImm('esp', 0x14)
    // MOV        ECX,ESP
    cw.putMovRegReg('ecx', 'esp')
    // PUSH       EAX
    cw.putPushReg('eax')
    // CALL       set_value_addr    
    cw.putCallAddress(set_value_addr)
    // MOV        ECX,dword ptr [instance] 
    cw.putMovRegAddress('ecx', instancePtr)
    // CALL       do_verify_user_addr   
    cw.putCallAddress(do_verify_user_addr)
    // MOV        success,EAX  
    cw.putMovNearPtrReg(successPtr1, 'eax')
    console.log('call do_verify_user_addr res:', successPtr1.readS32())
    // */    
    // POPFD         
    // POPAD
    cw.putPopax()
    cw.putPopfx()
    cw.putRet()
    cw.flush()
    console.log('cw.flush();')
  })

  console.log('[添加好友]txtAsm', txtAsm)
  const nativeativeFunction = new NativeFunction(ptr(txtAsm), 'void', [])
  try {
    nativeativeFunction()
    console.log('instancePtr:', instancePtr.readU32())
    console.log('instancePtr1:', instancePtr1.readU32())
    console.log('successPtr1:', successPtr1.readS32())
    success = successPtr.readU32()
    console.log('[添加好友]success:', success)
    return success
  } catch (e) {
    log.error('[添加好友]Error:', e)
    return false
  }
}

addFriendByWxid('ledongmao', '你好，我是测试好友')

// ok,设置联系人备注——done,2024-03-13，call和实现方法来源于ttttupup/wxhelper项目
const modifyContactRemarkFunction = (contactId: string, text: string) => {

  // int success = -1;
  let success = -1;
  const successPtr = Memory.alloc(4);
  successPtr.writeS32(success)

  // WeChatString contact(wxid);
  const contactPtr: any = initidStruct(contactId);
  // WeChatString content(remark);
  const contentPtr: any = initStruct(text);
  // DWORD mod__addr = base_addr_ + WX_MOD_REMARK_OFFSET;
  const mod__addr = moduleBaseAddress.add(
    wxOffsets.contact.WX_MOD_REMARK_OFFSET,
  );

  const txtAsm: any = Memory.alloc(Process.pageSize)
  Memory.patchCode(txtAsm, Process.pageSize, code => {
    const writer = new X86Writer(code, {
      pc: txtAsm,
    })
    //     PUSHAD
    //     PUSHFD
    writer.putPushfx();
    writer.putPushax();
    //     LEA        EAX,content
    writer.putMovRegAddress('eax', contentPtr);
    //     PUSH       EAX
    writer.putPushReg('eax');
    //     LEA        EAX,contact
    writer.putMovRegAddress('eax', contactPtr);
    //     PUSH       EAX
    writer.putPushReg('eax');
    //     CALL       mod__addr   
    writer.putCallAddress(mod__addr);
    writer.putMovNearPtrReg(successPtr, 'eax')

    //     POPFD
    //     POPAD
    writer.putPopax();
    writer.putPopfx();
    writer.putRet()
    writer.flush();

  })

  // console.log('----------txtAsm', txtAsm)
  const nativeativeFunction = new NativeFunction(ptr(txtAsm), 'void', [])
  try {
    nativeativeFunction()
    console.log('[设置联系人备注] successPtr:', successPtr.readS32())
  } catch (e) {
    log.error('[设置联系人备注]Error:', e)
  }

}

// modifyContactRemarkFunction("ledongmao", "超哥" + new Date().getHours()+ new Date().getMinutes());

// 改写自ttttupup/wxhelper项目
const SendText = (wxid: string, msg: string) => {
  // int success = -1;
  let success = -1;
  let successPtr = Memory.alloc(4);
  successPtr.writeS32(-1);

  // WeChatString to_user(wxid);
  const to_user = initidStruct(wxid);
  // WeChatString text_msg(msg);
  // wchar_t** msg_pptr = &text_msg.ptr;
  const text_msg = initmsgStruct(msg);
  const msg_pptr = ptr(text_msg);

  // DWORD send_message_mgr_addr = base_addr_ + WX_SEND_MESSAGE_MGR_OFFSET;
  const send_message_mgr_addr = moduleBaseAddress.add(wxOffsets.sendMessageMgr.WX_SEND_MESSAGE_MGR_OFFSET);
  // DWORD send_text_msg_addr = base_addr_ + WX_SEND_TEXT_OFFSET;
  const send_text_msg_addr = moduleBaseAddress.add(wxOffsets.sendText.WX_SEND_TEXT_OFFSET);
  // DWORD free_chat_msg_addr = base_addr_ + WX_FREE_CHAT_MSG_OFFSET;
  const free_chat_msg_addr = moduleBaseAddress.add(wxOffsets.chatMsg.WX_FREE_CHAT_MSG_OFFSET);
  // char chat_msg[0x2D8] = {0};
  const chat_msg = Memory.alloc(0x2d8);

  const txtAsm: any = Memory.alloc(Process.pageSize)
  Memory.patchCode(txtAsm, Process.pageSize, code => {
    const cw = new X86Writer(code, {
      pc: txtAsm,
    })
    // PUSHAD
    // PUSHFD
    cw.putPushfx();
    cw.putPushax();
    // CALL       send_message_mgr_addr
    cw.putCallAddress(send_message_mgr_addr);
    // PUSH       0x0
    cw.putPushU32(0x0);
    // PUSH       0x0
    cw.putPushU32(0x0);
    // PUSH       0x0
    cw.putPushU32(0x0);
    // PUSH       0x1
    cw.putPushU32(0x1);
    // PUSH       0x0
    cw.putPushU32(0x0);
    // MOV        EAX,msg_pptr
    cw.putMovRegAddress('eax', msg_pptr);
    // PUSH       EAX
    cw.putPushReg('eax');
    // LEA        EDX,to_user
    cw.putMovRegAddress('edx', to_user);
    // LEA        ECX,chat_msg
    cw.putMovRegAddress('ecx', chat_msg);
    // CALL       send_text_msg_addr 
    cw.putCallAddress(send_text_msg_addr);
    // MOV        success,EAX
    cw.putMovNearPtrReg(successPtr, 'eax');
    // ADD        ESP,0x18
    cw.putAddRegImm('esp', 0x18);
    // LEA        ECX,chat_msg   
    cw
    // CALL       free_chat_msg_addr
    // cw.putCallAddress(free_chat_msg_addr);
    // POPFD
    // POPAD
    cw.putPopax();
    cw.putPopfx();
    cw.putRet()
    cw.flush();
  })

  const nativeativeFunction = new NativeFunction(ptr(txtAsm), 'void', [])
  try {
    nativeativeFunction()
    success = successPtr.readS32()
    console.log('[发送消息] successPtr:', success)
  } catch (e) {
    log.error('[发送消息]Error:', e)
  }
  return success;
}

// SendText('ledongmao', '测试发送文本消息')

// 改写自ttttupup/wxhelper项目，发送@消息，可以发送但没有@效果
const SendAtText = (chat_room_id: string, wxids: string[], len: number, msg: string) => {
  // int SendMessageMgr::SendAtText(wchar_t* chat_room_id, wchar_t** wxids, int len,
  //   wchar_t* msg) {
  // int success = -1;
  let success = -1;
  let successPtr = Memory.alloc(4);
  successPtr.writeS32(-1);

  // WeChatString  * at_users = new WeChatString[len+1];
  const at_users = Memory.alloc(Process.pointerSize * (len + 1));
  // std::wstring at_msg = L"";
  let at_msg = '';
  // int number =0;
  let number = 0;
  // for (int i = 0; i < len; i++) {
  // std::wstring nickname;
  // if (!lstrcmpiW((wchar_t *)wxids[i], (wchar_t *)L"notify@all")) {
  // nickname = L"所有人";
  // } else {
  // ContactMgr contact{base_addr_};
  // nickname = contact.GetContactOrChatRoomNickname(wxids[i]);
  // }

  // WeChatString temp = {0};
  // temp.ptr = (wchar_t *)wxids[i];
  // temp.length = wcslen((wchar_t *)wxids[i]);
  // temp.max_length = wcslen((wchar_t *)wxids[i]) * 2;
  // memcpy(&at_users[number], &temp, sizeof(WeChatString));
  // at_msg = at_msg + L"@" + nickname + L" ";
  // number++;
  // }
  for (let i = 0; i < len; i++) {
    const wxid = wxids[i];
    let nickname = '';
    if (wxid === 'notify@all') {
      nickname = '所有人';
    } else {
      nickname = readWideString(initidStruct(wxid));
    }
    const temp = initidStruct(wxid);
    at_users.add(Process.pointerSize * number).writePointer(temp);
    at_msg += '@' + nickname + ' ';
    number++;
  }

  // if (number < 1){
  // return success;
  // }
  if (number < 1) {
    return success;
  }

  // using wstring = basic_string<wchar_t, char_traits<wchar_t>, allocator<wchar_t>>;
  // std::wstring origin(msg); 
  const origin = msg;

  // at_msg += origin;
  at_msg += origin;

  // AtInner at_list = {0};
  const at_list = Memory.alloc(0x0c);

  // at_list.start = (DWORD)at_users;
  at_list.add(0x00).writePointer(at_users);

  // at_list.finsh = (DWORD)&at_users[number];
  at_list.add(0x04).writePointer(at_users.add(Process.pointerSize * number));
  // at_list.end = (DWORD)&at_users[number];
  at_list.add(0x08).writePointer(at_users.add(Process.pointerSize * number));
  // WeChatString to_user(chat_room_id);
  const to_user = initidStruct(chat_room_id);
  // WeChatString text_msg((wchar_t *)at_msg.c_str());
  const text_msg = initmsgStruct(at_msg);
  // wchar_t **msg_pptr = &text_msg.ptr;
  const msg_pptr = ptr(text_msg);

  // DWORD send_message_mgr_addr = base_addr_ + WX_SEND_MESSAGE_MGR_OFFSET;
  const send_message_mgr_addr = moduleBaseAddress.add(wxOffsets.sendMessageMgr.WX_SEND_MESSAGE_MGR_OFFSET);
  // DWORD send_text_msg_addr = base_addr_ + WX_SEND_TEXT_OFFSET;
  const send_text_msg_addr = moduleBaseAddress.add(wxOffsets.sendText.WX_SEND_TEXT_OFFSET);
  // DWORD free_chat_msg_addr = base_addr_ + WX_FREE_CHAT_MSG_OFFSET;
  const free_chat_msg_addr = moduleBaseAddress.add(wxOffsets.chatMsg.WX_FREE_CHAT_MSG_OFFSET);

  // char chat_msg[0x2D8] = {0};
  const chat_msg = Memory.alloc(0x2d8);

  const txtAsm: any = Memory.alloc(Process.pageSize)

  Memory.patchCode(txtAsm, Process.pageSize, code => {
    const cw = new X86Writer(code, {
      pc: txtAsm,
    })
    // PUSHAD
    // PUSHFD
    cw.putPushfx();
    cw.putPushax();
    // CALL       send_message_mgr_addr
    cw.putCallAddress(send_message_mgr_addr);
    // PUSH       0x0
    cw.putPushU32(0x0);
    // PUSH       0x0
    cw.putPushU32(0x0);
    // PUSH       0x0
    cw.putPushU32(0x0);
    // PUSH       0x1
    cw.putPushU32(0x1);
    // LEA        EAX,at_list
    cw.putMovRegAddress('eax', at_list);
    // PUSH       EAX
    cw.putPushReg('eax');
    // MOV        EAX,msg_pptr
    cw.putMovRegAddress('eax', msg_pptr);
    // PUSH       EAX
    cw.putPushReg('eax');
    // LEA        EDX,to_user
    cw.putMovRegAddress('edx', to_user);
    // LEA        ECX,chat_msg
    cw.putMovRegAddress('ecx', chat_msg);
    // CALL       send_text_msg_addr 
    cw.putCallAddress(send_text_msg_addr);
    // MOV        success,EAX
    cw.putMovNearPtrReg(successPtr, 'eax');
    // ADD        ESP,0x18
    cw.putAddRegImm('esp', 0x18);
    // LEA        ECX,chat_msg    
    cw.putMovRegAddress('ecx', chat_msg);
    // CALL       free_chat_msg_addr
    cw.putCallAddress(free_chat_msg_addr);
    // POPFD
    // POPAD
    cw.putPopax();
    cw.putPopfx();
    cw.putRet()
    cw.flush();
  });


  // SPDLOG_INFO("SendText  code = {}",success);
  const nativeativeFunction = new NativeFunction(ptr(txtAsm), 'void', [])
  try {
    nativeativeFunction()
    success = successPtr.readS32()
    console.log('[发送AT消息] successPtr:', success)
  } catch (e) {
    log.error('[发送AT消息]Error:', e)
  }
  return success;

  // }
}

// SendAtText('21341182572@chatroom', ['notify@all'], 1, '测试发送文本消息')
