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
    shareRecordMgr: {
        WX_SHARE_RECORD_MGR_OFFSET: 0x78cb40,
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

    is_logged_in_offset: 0x1DDF9D4,
    hook_on_login_offset: 0x51B790,
    hook_on_logout_offset: 0x51C2C0,
    hook_get_login_qr_offset: 0x4B6020,
    hook_check_login_qr_offset: 0x478B90,
    hook_save_login_qr_info_offset: 0x3DB2E0,
    get_login_wnd_offset: 0x1DB96A4,
    get_qr_login_data_offset: 0x282160,
    get_qr_login_call_offset: 0x286930,

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

const initidStruct = ((str: string) => {
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

const initStruct = ((str: string) => {
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

const initmsgStruct = ((str: string) => {
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

const initAtMsgStruct = ((wxidStruct: any) => {
    let atStruct = null
    atStruct = Memory.alloc(0x10)

    atStruct.writePointer(wxidStruct).add(0x04)
        .writeU32(wxidStruct.toInt32() + 0x14).add(0x04)//0x14 = sizeof(wxid structure)
        .writeU32(wxidStruct.toInt32() + 0x14).add(0x04)
        .writeU32(0)
    return atStruct
})

const readStringPtr = (address: string | number) => {
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

const readWStringPtr = (address: string | number) => {
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

const readWideString: any = (address: any) => {
    return readWStringPtr(address).readUtf16String()
}

/*-----------------base-------------------------*/

// 获取微信版本号
const getWechatVersionFunction = (() => {
    const pattern = '55 8B ?? 83 ?? ?? A1 ?? ?? ?? ?? 83 ?? ?? 85 ?? 7F ?? 8D ?? ?? E8 ?? ?? ?? ?? 84 ?? 74 ?? 8B ?? ?? ?? 85 ?? 75 ?? E8 ?? ?? ?? ?? 0F ?? ?? 0D ?? ?? ?? ?? A3 ?? ?? ?? ?? A3 ?? ?? ?? ?? 8B ?? 5D C3'
    const results:any = Memory.scanSync(moduleLoad.base, moduleLoad.size, pattern)
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

// 检测是否已经登录
const checkLogin = () => {
    let success = -1
    const accout_service_addr = moduleBaseAddress.add(offset.WX_ACCOUNT_SERVICE_OFFSET)
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
    // console.log('isLoggedInFunction:', success)
    // 813746031、813746031、813746031

    return success
}

// 检查是否已登录—
const isLoggedInFunction = () => {
    let success = -1
    const accout_service_addr = moduleBaseAddress.add(offset.WX_ACCOUNT_SERVICE_OFFSET)
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
    // console.log('isLoggedInFunction:', success)
    // 813746031、813746031、813746031
    console.log('isLoggedInFunction:\n\n', success)
    return success
}

// 获取登录二维码
// const callLoginQrcodeFunction = ((forceRefresh = false) => {  
//   const json = getQrcodeLoginData()
//   if (!forceRefresh && json.uuid) {
//     return
//   }

//   const callAsm = Memory.alloc(Process.pageSize)
//   // const loginWnd = moduleBaseAddress.add(offset.get_login_wnd_offset).readPointer()
//   const loginWnd = moduleBaseAddress.add(offset.wx_login_url).readPointer()

//   Memory.patchCode(callAsm, Process.pageSize, code => {
//     var cw = new X86Writer(code, { pc: callAsm })
//     cw.putPushfx();
//     cw.putPushax();

//     cw.putMovRegAddress('ecx', loginWnd)
//     cw.putCallAddress(moduleBaseAddress.add(offset.wx_login_url))

//     cw.putPopax()
//     cw.putPopfx()
//     cw.putRet()
//     cw.flush()
//   })

//   const nativeativeFunction = new NativeFunction(ptr(callAsm), 'void', [])
//   nativeativeFunction()
// })

// 登出事件回调
// const hookLogoutEventCallback = (() => {
//   const nativeCallback = new NativeCallback(() => { }, 'void', ['int32'])
//   const nativeativeFunction = new NativeFunction(nativeCallback, 'void', ['int32'])
//   Interceptor.attach(moduleBaseAddress.add(wxOffsets.login.WX_LOGOUT_OFFSET), {
//     onEnter: function (args) {
//       const bySrv = args[0].toInt32()
//       setImmediate(() => nativeativeFunction(bySrv))
//     }
//   })
//   return nativeCallback
// })()

// 登录事件回调
const hookLoginEventCallback = (() => {
    const nativeCallback = new NativeCallback(() => { }, 'void', [])
    const nativeativeFunction = new NativeFunction(nativeCallback, 'void', [])
    Interceptor.attach(moduleBaseAddress.add(wxOffsets.login.WX_ACCOUNT_SERVICE_OFFSET), {
        onLeave: function (retval) {
            // console.log('hookLoginEventCallback:', retval)
            isLoggedInFunction()
            setImmediate(() => nativeativeFunction())
            return retval
        }
    })

    setTimeout(() => {
        if (isLoggedInFunction()) {
            setImmediate(() => nativeativeFunction())
        }
    }, 3000);

    return nativeCallback
})()

// 检查扫码登录回调
// const checkQRLoginNativeCallback = (() => {

//   const nativeCallback = new NativeCallback(() => { }, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'int32', 'pointer'])
//   const nativeativeFunction = new NativeFunction(nativeCallback, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'int32', 'pointer'])
//   // const json = {
//   //   status,
//   //   uuid,
//   //   wxid,
//   //   avatarUrl,
//   //   nickname,
//   //   phoneType,
//   //   phoneClientVer,
//   //   pairWaitTip,
//   // }

//   const callback = {
//     onLeave: function (retval) {
//       const json = getQrcodeLoginData()
//       if (json.status == 0) {
//         // 当状态为 0 时，即未扫码。而其他状态会触发另一个方法，拥有更多数据。
//         ret(json)
//       }
//       return retval
//     },
//   }

//   const ret = (json) => {
//     const arr = [
//       json.status || 0,
//       Memory.allocUtf8String(json.uuid ? `http://weixin.qq.com/x/${json.uuid}` : ''),
//       Memory.allocUtf8String(json.wxid || ''),
//       Memory.allocUtf8String(json.avatarUrl || ''),
//       Memory.allocUtf8String(json.nickname || ''),
//       Memory.allocUtf8String(json.phoneType || ''),
//       json.phoneClientVer || 0,
//       Memory.allocUtf8String(json.pairWaitTip || ''),
//     ]
//     setImmediate(() => nativeativeFunction(...arr))
//   }

//   Interceptor.attach(moduleBaseAddress.add(offset.hook_get_login_qr_offset), callback)
//   Interceptor.attach(moduleBaseAddress.add(offset.hook_check_login_qr_offset), callback)
//   Interceptor.attach(moduleBaseAddress.add(offset.hook_save_login_qr_info_offset), {
//     onEnter: function () {
//       const qrNotify = this.context['ebp'].sub(72)
//       const uuid = readString(qrNotify.add(4).readPointer())
//       const wxid = readString(qrNotify.add(8).readPointer())
//       const status = qrNotify.add(16).readUInt()
//       const avatarUrl = readString(qrNotify.add(24).readPointer())
//       const nickname = readString(qrNotify.add(28).readPointer())
//       const pairWaitTip = readString(qrNotify.add(32).readPointer())
//       const phoneClientVer = qrNotify.add(40).readUInt()
//       const phoneType = readString(qrNotify.add(44).readPointer())

//       const json = {
//         status,
//         uuid,
//         wxid,
//         avatarUrl,
//         nickname,
//         phoneType,
//         phoneClientVer,
//         pairWaitTip,
//       }
//       ret(json)
//     },
//     onLeave: function (retval) {
//       return retval
//     },
//   })

//   if (!isLoggedInFunction()) {
//     setTimeout(() => {
//       const json = getQrcodeLoginData()
//       ret(json)
//     }, 100);
//   }

//   return nativeCallback
// })()

// 获取登录二维码
const getQrcodeLoginData = () => {
    const getQRCodeLoginMgr = new NativeFunction(moduleBaseAddress.add(offset.wx_login_url), 'pointer', [])
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

// 准备就绪回调
const agentReadyCallback = (() => {
    const nativeCallback = new NativeCallback(() => { }, 'void', [])
    const nativeativeFunction = new NativeFunction(nativeCallback, 'void', [])

    setTimeout(() => {
        nativeativeFunction()
    }, 500);
    return nativeCallback
})()

// 获取登录二维码(登录地址)
const getLoginUrlFunction = (() => {
    const loginUrlAddr = moduleBaseAddress.add(offset.wx_login_url).readPointer()
    const loginUrl = "http://weixin.qq.com/x/" + loginUrlAddr.readUtf8String()
    return loginUrl
})

// 登出——未验证
function logout() {
    var success = -1;
    if (!checkLogin()) {
        return success;
    }

    // 这里需要替换为具体的基地址和偏移量
    var base_addr = moduleBaseAddress;
    var account_service_addr = base_addr.add(wxOffsets.login.WX_ACCOUNT_SERVICE_OFFSET);
    var logout_addr = base_addr.add(wxOffsets.login.WX_LOGOUT_OFFSET);

    // 创建对应的NativeFunction
    var account_service = new NativeFunction(account_service_addr, 'uint', []);
    var logout = new NativeFunction(logout_addr, 'uint', ['uint']);

    // 调用函数
    var ecx = account_service();
    success = logout(ecx);

    return success;
}

// 获取自己的信息
const getMyselfInfoFunction = (() => {

    let ptr = 0
    let wx_code: any = ''
    let wx_id: any = ''
    let wx_name = ''
    let head_img_url: any = ''

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
let memberNickBuffAsm:any = null
let nickRoomId:any = null
let nickMemberId:any = null
let nickBuff:any = null
const getChatroomMemberNickInfoFunction = ((memberId:string, roomId:string) => {

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

// 删除联系人——待验证
function delContact(wxid: any) {
    var success = -1;

    var base_addr = moduleBaseAddress; // 替换为具体的基地址值
    var sync_mgr_addr = base_addr.add(wxOffsets.syncMgr.WX_SYNC_MGR_OFFSET);
    var del_contact_addr = base_addr.add(wxOffsets.contact.WX_DO_DEL_CONTACT_OFFSET);

    // 假设Utils.WstringToUTF8已经在JavaScript中实现
    // var id_cstr = WstringToUTF8(wxid);
    var id_cstr = wxid;

    var id_ = Memory.allocUtf8String(id_cstr);
    var buff = Memory.alloc(0x10);

    // 创建对应的NativeFunction
    var sync_mgr = new NativeFunction(sync_mgr_addr, 'pointer', []);
    var del_contact = new NativeFunction(del_contact_addr, 'int', ['pointer']);

    // 调用函数
    var ecx = sync_mgr();
    // Memory.writePointer(buff.add(4), id_);
    success = del_contact(ecx);

    return success;
}

// 添加好友——待验证
function ddFriendByWxid(wxid: string, msg: string) {
    var success = -1;

    var base_addr = moduleBaseAddress; // 替换为具体的基地址值
    var contact_mgr_addr = base_addr.add(wxOffsets.contactMgr.WX_CONTACT_MGR_OFFSET);
    var verify_msg_addr = base_addr.add(wxOffsets.contact.WX_VERIFY_MSG_OFFSET);
    var set_value_addr = base_addr.add(wxOffsets.setChatMsgValue.WX_INIT_CHAT_MSG_OFFSET);
    var do_verify_user_addr = base_addr.add(wxOffsets.contact.WX_DO_VERIFY_USER_OFFSET);
    var fn1_addr = base_addr.add(0x7591b0);

    // 创建对应的NativeFunction
    var contact_mgr = new NativeFunction(contact_mgr_addr, 'uint', []);
    var verify_msg = new NativeFunction(verify_msg_addr, 'void', ['pointer', 'int', 'pointer']);
    var set_value = new NativeFunction(set_value_addr, 'void', ['pointer', 'int']);
    var do_verify_user = new NativeFunction(do_verify_user_addr, 'int', ['uint']);

    var user_id = Memory.allocUtf16String(wxid);
    var w_msg = Memory.allocUtf16String(msg);
    var instance = contact_mgr();

    var null_obj = Memory.alloc(0x18);
    // Memory.writeU8(null_obj, 0);
    // Memory.writeU8(null_obj.add(0x14), 0xF);
    // Memory.writeU8(null_obj.add(0x10), 0);

    verify_msg(w_msg, -1, null_obj);
    set_value(user_id, 2);
    success = do_verify_user(instance);

    return success;
}

// 好有验证信息
function verifyApply(v3: string, v4: string, permission: number) {
    var success = -1;

    var base_addr = moduleBaseAddress; // 替换为具体的基地址值
    var set_value_addr = base_addr.add(wxOffsets.setChatMsgValue.WX_INIT_CHAT_MSG_OFFSET);
    var verify_addr = base_addr.add(wxOffsets.contact.WX_VERIFY_OK_OFFSET);
    var new_helper_addr = base_addr.add(wxOffsets.contact.WX_NEW_ADD_FRIEND_HELPER_OFFSET);
    var free_helper_addr = base_addr.add(wxOffsets.contact.WX_FREE_ADD_FRIEND_HELPER_OFFSET);

    // 创建对应的NativeFunction
    var set_value = new NativeFunction(set_value_addr, 'void', ['pointer', 'int']);
    var verify = new NativeFunction(verify_addr, 'int', ['pointer', 'pointer', 'pointer', 'int', 'int']);
    var new_helper = new NativeFunction(new_helper_addr, 'void', ['pointer']);
    var free_helper = new NativeFunction(free_helper_addr, 'void', ['pointer']);

    var v4_str = Memory.allocUtf16String(v4);
    var v3_str = Memory.allocUtf16String(v3);
    var helper_obj = Memory.alloc(0x40);
    var nullbuffer = Memory.alloc(0x3CC);
    var flag = permission < 0 ? 0 : permission;

    // 调用函数
    new_helper(helper_obj);
    set_value(v4_str, 0x6);
    success = verify(helper_obj, nullbuffer, v3_str, flag, 0x6);
    free_helper(helper_obj);

    return success;
}

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
    const chatroomRecurse = (node: NativePointer, chatroomNodeList: any[], chatroomMemberList: any[]) => {
        const chatroomNodeAddress = getChatroomNodeAddress();
        if (chatroomNodeAddress.isNull() || node.equals(chatroomNodeAddress)) {
            return;
        }

        if (chatroomNodeList.some((n: any) => node.equals(n))) {
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

    const chatroomNodeList: never[] = [];
    const chatroomMemberList: never[] = [];
    const startNode = chatroomNodeAddress.add(0x0).readPointer();
    chatroomRecurse(startNode, chatroomNodeList, chatroomMemberList);

    return JSON.stringify(chatroomMemberList);
});

// 获取群成员昵称
const getChatroomMemberNickInfoFunction2 = ((memberId: any, roomId: any) => {
    let memberNickBuffAsm: any = null
    let nickRoomId: any = null
    let nickMemberId: any = null
    let nickBuff: any = null

    nickBuff = Memory.alloc(wxOffsets.chatRoom.WX_GET_MEMBER_NICKNAME_OFFSET)
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

    let nickname = readWideString(nickBuff)
    // 对nicname进行utf8编码
    // nickname = unescape(encodeURIComponent(nickname))
    console.log('----nickname', nickname)

    return readWideString(nickBuff)
})

const getChatroomMemberNickInfoFunction1 = ((memberId: string, roomId: string) => {
    console.log('getChatroomMemberNickInfoFunction', memberId, roomId)
    let memberNickBuffAsm: any = null
    let nickRoomId: any = null
    let nickMemberId: any = null
    let nickBuff = Memory.alloc(wxOffsets.chatRoom.WX_GET_MEMBER_NICKNAME_OFFSET)
    //const nickRetAddr = Memory.alloc(0x04)
    memberNickBuffAsm = Memory.alloc(Process.pageSize)
    //console.log('asm address----------',memberNickBuffAsm)
    nickRoomId = initidStruct(roomId)
    // console.log('nick room id',nickRoomId)
    nickMemberId = initStruct(memberId)
  
    console.log('nick nickMemberId id',nickMemberId)
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

// 添加群成员——待验证
function addMemberToChatRoom(chat_room_id: string, wxids: any[]) {
    var success = -1;

    // 假设 'base_addr_', 'WX_CHAT_ROOM_MGR_OFFSET', 
    // 'WX_ADD_MEMBER_TO_CHAT_ROOM_OFFSET', 和 'WX_INIT_CHAT_MSG_OFFSET' 已经定义

    var getChatRoomMgrAddr = moduleBaseAddress.add(wxOffsets.chatRoomMgr.WX_CHAT_ROOM_MGR_OFFSET);
    var addMemberAddr = moduleBaseAddress.add(wxOffsets.chatRoom.WX_ADD_MEMBER_TO_CHAT_ROOM_OFFSET);
    var initChatMsgAddr = moduleBaseAddress.add(wxOffsets.setChatMsgValue.WX_INIT_CHAT_MSG_OFFSET);

    // 创建 NativeFunction 实例
    var chatRoomMgr = new NativeFunction(getChatRoomMgrAddr, 'pointer', []);
    var addMember = new NativeFunction(addMemberAddr, 'int', ['pointer', 'pointer']);
    var initChatMsg = new NativeFunction(initChatMsgAddr, 'void', ['pointer']);

    var chatRoom = Memory.allocUtf16String(chat_room_id);
    initChatMsg(chatRoom);

    var temp = chatRoomMgr();
    var membersPtr = Memory.alloc(Process.pointerSize * wxids.length);

    wxids.forEach((wxid: string, index: number) => {
        var pwxid = Memory.allocUtf16String(wxid);
        membersPtr.add(Process.pointerSize * index).writePointer(pwxid);
    });

    success = addMember(temp, membersPtr);

    return success;
}

// 邀请群成员——待验证
function inviteMemberToChatRoom(roomId: string, wxids: any[]) {
    let success = -1;
    let chatRoom = Memory.allocUtf16String(roomId);
    let members = new Array(wxids.length);
    for (let i = 0; i < wxids.length; i++) {
        members[i] = Memory.allocUtf16String(wxids[i]);
    }

    const baseAddr = moduleBaseAddress; // Replace with actual base address
    const getChatRoomMgrAddr = baseAddr.add(wxOffsets.chatRoomMgr.WX_CHAT_ROOM_MGR_OFFSET);
    const addMemberAddr = baseAddr.add(wxOffsets.chatRoom.WX_ADD_MEMBER_TO_CHAT_ROOM_OFFSET);
    const initChatMsgAddr = baseAddr.add(wxOffsets.setChatMsgValue.WX_INIT_CHAT_MSG_OFFSET);
    const getShareRecordMgrAddr = baseAddr.add(wxOffsets.shareRecordMgr.WX_SHARE_RECORD_MGR_OFFSET);

    const fn1Addr = baseAddr.add(ptr('0x7f99d0'));
    const fn2Addr = baseAddr.add(ptr('0x78cef0'));
    const fn3Addr = baseAddr.add(ptr('0x7fa980'));
    const fn4Addr = baseAddr.add(ptr('0x755060'));
    const inviteAddr = baseAddr.add(ptr('0xbd1a00'));

    const sysAddr = Module.findExportByName("win32u.dll", "YOUR_EXPORTED_FUNCTION"); // Replace with actual function name
    const addrArray = [sysAddr, ptr('0')];

    // Define native functions using Frida's NativeFunction
    // Example: const yourFunction = new NativeFunction(fn1Addr, 'return_type', ['arg1_type', 'arg2_type', ...]);

    // Perform the necessary calls and operations as in the original C/C++ code
    // Example: yourFunction(arg1, arg2, ...);

    success = 1;
    return success;
}

// 发送文本消息
const sendMsgNativeFunction = ((talkerId: string, content: string) => {

    const txtAsm: any = Memory.alloc(Process.pageSize)
    //const buffwxid = Memory.alloc(0x20)


    let wxidPtr: any = Memory.alloc(talkerId.length * 2 + 2)
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
const sendAtMsgNativeFunction = ((roomId: any, text: string, contactId: any, nickname: string) => {
    let asmAtMsg: any = null
    asmAtMsg = Memory.alloc(Process.pageSize)
    let ecxBuffer = Memory.alloc(0x3b0)
    let roomid_: NativePointerValue, msg_: NativePointerValue, wxid_, atid_: NativePointerValue

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
const sendPicMsgNativeFunction = ((contactId: string, path: string) => {

    const picAsm: any = Memory.alloc(Process.pageSize)
    const buffwxid = Memory.alloc(0x20)
    const picbuff = Memory.alloc(0x2D8)

    let pathPtr = Memory.alloc(path.length * 2 + 1)
    pathPtr.writeUtf16String(path)

    let imagefilepath = Memory.alloc(0x24)
    imagefilepath.writePointer(pathPtr).add(0x04)
        .writeU32(path.length * 2).add(0x04)
        .writeU32(path.length * 2).add(0x04)

    let picWxidPtr: any = Memory.alloc(contactId.length * 2 + 1)
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

// 发送小程序--未实现
const SendMiniProgramNativeFunction = ((bg_path_str: string, contactId: string, xmlstr: any) => {
    // console.log("------------------------------------------------------");
    bg_path_str = "";

    var asmCode: any = Memory.alloc(Process.pageSize);
    var ECX_buf = Memory.alloc(0x300);
    var Buf_EAX = Memory.alloc(0x300);
    var buf_1 = Memory.alloc(0x300);
    var ptr_to_buf_1 = Memory.alloc(0x4).writePointer(buf_1);
    var buf_2 = Memory.alloc(0x300);

    var bg_path_Ptr = Memory.alloc(bg_path_str.length * 2 + 1)
    bg_path_Ptr.writeUtf16String(bg_path_str);
    var bg_path_Struct = Memory.alloc(0x14) // returns a NativePointer
    bg_path_Struct.writePointer(bg_path_Ptr).add(0x04)
        .writeU32(bg_path_str.length * 2).add(0x04)
        .writeU32(bg_path_str.length * 2).add(0x04)
        .writeU32(0).add(0x04)
        .writeU32(0);

    var send_wxid_str = JSON.parse(getMyselfInfoFunction()).id;
    // console.log(send_wxid_str)

    var send_wxid_Ptr = Memory.alloc(send_wxid_str.length * 2 + 1)
    send_wxid_Ptr.writeUtf16String(send_wxid_str);
    var send_wxid_Struct = Memory.alloc(0x14) // returns a NativePointer
    send_wxid_Struct.writePointer(send_wxid_Ptr).add(0x04)
        .writeU32(send_wxid_str.length * 2).add(0x04)
        .writeU32(send_wxid_str.length * 2).add(0x04)
        .writeU32(0).add(0x04)
        .writeU32(0);

    // var contactId="filehelper";
    var recv_wxid_Ptr = Memory.alloc(contactId.length * 2 + 1)
    recv_wxid_Ptr.writeUtf16String(contactId);
    var recv_wxid_Struct = Memory.alloc(0x14) // returns a NativePointer
    recv_wxid_Struct.writePointer(recv_wxid_Ptr).add(0x04)
        .writeU32(contactId.length * 2).add(0x04)
        .writeU32(contactId.length * 2).add(0x04)
        .writeU32(0).add(0x04)
        .writeU32(0);

    // var pXml=initidStruct('<msg><fromusername>'+send_wxid_str+'</fromusername><scene>0</scene><commenturl></commenturl><appmsg appid="wx65cc950f42e8fff1" sdkver=""><title>腾讯出行服务｜加油代驾公交</title><des></des><action>view</action><type>33</type><showtype>0</showtype><content></content><url>https://mp.weixin.qq.com/mp/waerrpage?appid=wx65cc950f42e8fff1&amp;amp;type=upgrade&amp;amp;upgradetype=3#wechat_redirect</url><dataurl></dataurl><lowurl></lowurl><lowdataurl></lowdataurl><recorditem><![CDATA[]]></recorditem><thumburl>http://mmbiz.qpic.cn/mmbiz_png/NM1fK7leWGPaFnMAe95jbg4sZAI3fkEZWHq69CIk6zA00SGARbmsGTbgLnZUXFoRwjROelKicbSp9K34MaZBuuA/640?wx_fmt=png&amp;wxfrom=200</thumburl><messageaction></messageaction><extinfo></extinfo><sourceusername></sourceusername><sourcedisplayname>腾讯出行服务｜加油代驾公交</sourcedisplayname><commenturl></commenturl><appattach><totallen>0</totallen><attachid></attachid><emoticonmd5></emoticonmd5><fileext></fileext><aeskey></aeskey></appattach><weappinfo><pagepath></pagepath><username>gh_ad64296dc8bd@app</username><appid>wx65cc950f42e8fff1</appid><type>1</type><weappiconurl>http://mmbiz.qpic.cn/mmbiz_png/NM1fK7leWGPaFnMAe95jbg4sZAI3fkEZWHq69CIk6zA00SGARbmsGTbgLnZUXFoRwjROelKicbSp9K34MaZBuuA/640?wx_fmt=png&amp;wxfrom=200</weappiconurl><appservicetype>0</appservicetype><shareId>2_wx65cc950f42e8fff1_875237370_1644979747_1</shareId></weappinfo><websearch /></appmsg><appinfo><version>1</version><appname>Window wechat</appname></appinfo></msg>');
    // console.log(xmlstr)
    var pXml = initidStruct(xmlstr)
    // console.log(pXml)
    // console.log(send_wxid_Struct);
    // console.log(recv_wxid_Struct);
    // console.log(pXml);
    // console.log("okkk");
    // console.log("------------------------------------------------------");

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

// 转发消息
// function forwardMsg(wxid, msgid) {
//   var success = 0;

//   // 假设DB.GetInstance().GetLocalIdByMsgId是一个已经在JavaScript中实现的函数
//   var db_index = 0;
//   var localid = GetLocalIdByMsgId(msgid, db_index);

//   if (localid === 0) return 0;

//   var base_addr = ptr('基地址值'); // 替换为具体的基地址值
//   var forward_msg_addr = base_addr.add('WX_FORWARD_MSG_OFFSET的值');
//   var init_chat_msg_addr = base_addr.add('WX_INIT_CHAT_MSG_OFFSET的值');

//   // 创建对应的NativeFunction
//   var init_chat_msg = new NativeFunction(init_chat_msg_addr, 'void', ['pointer', 'int', 'pointer']);
//   var forward_msg = new NativeFunction(forward_msg_addr, 'uchar', ['int']);

//   // 构造WeChatString对象
//   var WeChatString = Memory.allocUtf16String(wxid);

//   // 准备参数并调用函数
//   var stack = Memory.alloc(0x1c);
//   var edx = db_index;
//   var esi = WeChatString;

//   Memory.writePointer(stack, ptr(localid));
//   Memory.writePointer(stack.add(4), esi);
//   init_chat_msg(stack, edx, stack);

//   success = forward_msg(0);

//   return success;
// }

// 接收消息回调
const recvMsgNativeCallback = (() => {


    const nativeCallback = new NativeCallback(() => { }, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'int32'])
    const nativeativeFunction = new NativeFunction(nativeCallback, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'int32'])

    Interceptor.attach(
        moduleBaseAddress.add(offset.hook_point), {
        onEnter() {
            const addr = (this.context as any).ecx //0xc30-0x08
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
                let myContentPtr: any = null
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
                let myGroupMsgSenderIdPtr: any = null
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
                let myXmlContentPtr: any = null
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
