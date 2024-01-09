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
var wxOffsets = {
    snsDataMgr: {
        WX_SNS_DATA_MGR_OFFSET: 0xc39680
    },
    chatRoomMgr: {
        WX_CHAT_ROOM_MGR_OFFSET: 0x78cf20
    },
    contactMgr: {
        WX_CONTACT_MGR_OFFSET: 0x75a4a0
    },
    syncMgr: {
        WX_SYNC_MGR_OFFSET: 0xa87fd0
    },
    preDownloadMgr: {
        WX_GET_PRE_DOWNLOAD_MGR_OFFSET: 0x80f110
    },
    chatMgr: {
        WX_CHAT_MGR_OFFSET: 0x792700
    },
    videoMgr: {
        WX_VIDEO_MGR_OFFSET: 0x829820
    },
    patMgr: {
        WX_PAT_MGR_OFFSET: 0x931730
    },
    searchContactMgr: {
        WX_SEARCH_CONTACT_MGR_OFFSET: 0xa6cb00
    },
    appMsgMgr: {
        WX_APP_MSG_MGR_OFFSET: 0x76ae20
    },
    sendMessageMgr: {
        WX_SEND_MESSAGE_MGR_OFFSET: 0x768140
    },
    setChatMsgValue: {
        WX_INIT_CHAT_MSG_OFFSET: 0xf59e40
    },
    chatMsg: {
        WX_NEW_CHAT_MSG_OFFSET: 0x76f010,
        WX_FREE_CHAT_MSG_OFFSET: 0x756960,
        WX_FREE_CHAT_MSG_2_OFFSET: 0x6f4ea0,
        WX_FREE_CHAT_MSG_INSTANCE_COUNTER_OFFSET: 0x756e30
    },
    sns: {
        WX_SNS_GET_FIRST_PAGE_OFFSET: 0x14e2140,
        WX_SNS_GET_NEXT_PAGE_OFFSET: 0x14e21e0
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
        WX_RET_OFFSET: 0x1D58751
    },
    // search hook
    searchHook: {
        WX_SEARCH_CONTACT_ERROR_CODE_HOOK_OFFSET: 0xe17054,
        WX_SEARCH_CONTACT_ERROR_CODE_HOOK_NEXT_OFFSET: 0xf57a20,
        WX_SEARCH_CONTACT_DETAIL_HOOK_OFFSET: 0xa8ceb0,
        WX_SEARCH_CONTACT_DETAIL_HOOK_NEXT_OFFSET: 0xa8d100,
        WX_SEARCH_CONTACT_OFFSET: 0xcd1510
    },
    // login
    login: {
        WX_LOGIN_URL_OFFSET: 0x3040DE8,
        WX_LOGOUT_OFFSET: 0xe58870,
        WX_ACCOUNT_SERVICE_OFFSET: 0x768c80,
        WX_GET_APP_DATA_SAVE_PATH_OFFSET: 0xf3a610,
        WX_GET_CURRENT_DATA_PATH_OFFSET: 0xc872c0
    },
    myselfInfo: {
        WX_SELF_ID_OFFSET: 0x2FFD484
    },
    // forward
    forward: {
        WX_FORWARD_MSG_OFFSET: 0xce6730
    },
    // send file
    sendFile: {
        WX_SEND_FILE_OFFSET: 0xb6d1f0
    },
    // send image
    sendImage: {
        WX_SEND_IMAGE_OFFSET: 0xce6640
    },
    // send text
    sendText: {
        WX_SEND_TEXT_OFFSET: 0xce6c80
    },
    // ocr
    ocr: {
        WX_INIT_OBJ_OFFSET: 0x80a800,
        WX_OCR_MANAGER_OFFSET: 0x80f270,
        WX_DO_OCR_TASK_OFFSET: 0x13da3e0
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
        WX_HOOK_VOICE_NEXT_OFFSET: 0x203d130
    }
};
// 当前支持的微信版本
var availableVersion = 1661534743; // 3.9.2.23  ==0x63090217
var moduleBaseAddress = Module.getBaseAddress('WeChatWin.dll');
var moduleLoad = Module.load('WeChatWin.dll');
console.log('moduleBaseAddress:', moduleBaseAddress);
/* -----------------base------------------------- */
var initidStruct = function (str) {
    var retidPtr = null;
    var retidStruct = null;
    retidPtr = Memory.alloc(str.length * 2 + 1);
    retidPtr.writeUtf16String(str);
    retidStruct = Memory.alloc(0x14); // returns a NativePointer
    retidStruct
        .writePointer(retidPtr).add(0x04)
        .writeU32(str.length * 2).add(0x04)
        .writeU32(str.length * 2).add(0x04)
        .writeU32(0).add(0x04)
        .writeU32(0);
    return retidStruct;
};
var initStruct = function (str) {
    var retPtr = null;
    var retStruct = null;
    retPtr = Memory.alloc(str.length * 2 + 1);
    retPtr.writeUtf16String(str);
    retStruct = Memory.alloc(0x14); // returns a NativePointer
    retStruct
        .writePointer(retPtr).add(0x04)
        .writeU32(str.length * 2).add(0x04)
        .writeU32(str.length * 2).add(0x04)
        .writeU32(0).add(0x04)
        .writeU32(0);
    return retStruct;
};
var initmsgStruct = function (str) {
    var msgstrPtr = null;
    var msgStruct = null;
    msgstrPtr = Memory.alloc(str.length * 2 + 1);
    msgstrPtr.writeUtf16String(str);
    msgStruct = Memory.alloc(0x14); // returns a NativePointer
    msgStruct
        .writePointer(msgstrPtr).add(0x04)
        .writeU32(str.length * 2).add(0x04)
        .writeU32(str.length * 2).add(0x04)
        .writeU32(0).add(0x04)
        .writeU32(0);
    return msgStruct;
};
var initAtMsgStruct = function (wxidStruct) {
    var atStruct = null;
    atStruct = Memory.alloc(0x10);
    atStruct.writePointer(wxidStruct).add(0x04)
        .writeU32(wxidStruct.toInt32() + 0x14).add(0x04) // 0x14 = sizeof(wxid structure)
        .writeU32(wxidStruct.toInt32() + 0x14).add(0x04)
        .writeU32(0);
    return atStruct;
};
var readStringPtr = function (address) {
    var addr = ptr(address);
    var size = addr.add(16).readU32();
    var capacity = addr.add(20).readU32();
    addr.ptr = addr;
    addr.size = size;
    addr.capacity = capacity;
    if (capacity > 15 && !addr.readPointer().isNull()) {
        addr.ptr = addr.readPointer();
    }
    addr.ptr._readCString = addr.ptr.readCString;
    addr.ptr._readAnsiString = addr.ptr.readAnsiString;
    addr.ptr._readUtf8String = addr.ptr.readUtf8String;
    addr.readCString = function () {
        return addr.size ? addr.ptr._readCString(addr.size) : '';
    };
    addr.readAnsiString = function () {
        return addr.size ? addr.ptr._readAnsiString(addr.size) : '';
    };
    addr.readUtf8String = function () {
        return addr.size ? addr.ptr._readUtf8String(addr.size) : '';
    };
    // console.log('readStringPtr() address:',address,' -> str ptr:', addr.ptr, 'size:', addr.size, 'capacity:', addr.capacity)
    // console.log('readStringPtr() str:' , addr.readUtf8String())
    // console.log('readStringPtr() address:', addr,'dump:', addr.readByteArray(24))
    return addr;
};
var readWStringPtr = function (address) {
    var addr = ptr(address);
    var size = addr.add(4).readU32();
    var capacity = addr.add(8).readU32();
    addr.ptr = addr.readPointer();
    addr.size = size;
    addr.capacity = capacity;
    addr.ptr._readUtf16String = addr.ptr.readUtf16String;
    addr.readUtf16String = function () {
        return addr.size ? addr.ptr._readUtf16String(addr.size * 2) : '';
    };
    // console.log('readWStringPtr() address:',address,' -> ptr:', addr.ptr, 'size:', addr.size, 'capacity:', addr.capacity)
    // console.log('readWStringPtr() str:' ,  `"${addr.readUtf16String()}"`,'\n',addr.ptr.readByteArray(addr.size*2+2),'\n')
    // console.log('readWStringPtr() address:', addr,'dump:', addr.readByteArray(16),'\n')
    return addr;
};
var readString = function (address) {
    return readStringPtr(address).readUtf8String();
};
var readWideString = function (address) {
    return readWStringPtr(address).readUtf16String();
};
/* -----------------base------------------------- */
// 获取微信版本号
var getWechatVersionFunction = function () {
    var pattern = '55 8B ?? 83 ?? ?? A1 ?? ?? ?? ?? 83 ?? ?? 85 ?? 7F ?? 8D ?? ?? E8 ?? ?? ?? ?? 84 ?? 74 ?? 8B ?? ?? ?? 85 ?? 75 ?? E8 ?? ?? ?? ?? 0F ?? ?? 0D ?? ?? ?? ?? A3 ?? ?? ?? ?? A3 ?? ?? ?? ?? 8B ?? 5D C3';
    var results = Memory.scanSync(moduleLoad.base, moduleLoad.size, pattern);
    if (results.length === 0) {
        return 0;
    }
    var addr = results[0].address;
    var ret = addr.add(0x07).readPointer();
    var ver = ret.add(0x0).readU32();
    return ver;
};
// 获取微信版本号字符串
var getWechatVersionStringFunction = function () {
    var ver = getWechatVersionFunction();
    if (!ver) {
        return '0.0.0.0';
    }
    var vers = [];
    vers.push((ver >> 24) & 255 - 0x60);
    vers.push((ver >> 16) & 255);
    vers.push((ver >> 8) & 255);
    vers.push(ver & 255);
    return vers.join('.');
};
// 检查微信版本是否支持
var checkSupportedFunction = function () {
    var ver = getWechatVersionFunction();
    return ver === availableVersion;
};
// 检查是否已登录—
var isLoggedInFunction = function () {
    var success = -1;
    var accout_service_addr = moduleBaseAddress.add(wxOffsets.login.WX_ACCOUNT_SERVICE_OFFSET);
    var callFunction = new NativeFunction(accout_service_addr, 'pointer', []);
    var service_addr = callFunction();
    // console.log('service_addr:', service_addr)
    try {
        if (!service_addr.isNull()) {
            var loginStatusAddress = service_addr.add(0x4E0);
            success = loginStatusAddress.readU32();
        }
    }
    catch (e) {
        throw new Error(e);
    }
    // console.log('isLoggedInFunction结果:', success)
    // 813746031、813746031、813746031
    return success;
};
// 登录事件回调,登陆状态下每3s检测一次，非登陆状态下不间断检测且每3s打印一次状态，直到登陆成功
var hookLoginEventCallback = (function () {
    var nativeCallback = new NativeCallback(function () { }, 'void', []);
    var nativeativeFunction = new NativeFunction(nativeCallback, 'void', []);
    Interceptor.attach(moduleBaseAddress.add(wxOffsets.login.WX_ACCOUNT_SERVICE_OFFSET), {
        onLeave: function (retval) {
            // console.log('hookLoginEventCallback:', retval)
            var isLoggedIn = isLoggedInFunction();
            if (isLoggedIn !== 1) {
                console.log('当前登陆状态:', isLoggedIn);
                setImmediate(function () { return nativeativeFunction(); });
            }
            return retval;
        }
    });
    var checkLoginStatus = function () {
        var isLoggedIn = isLoggedInFunction();
        // console.log('当前登陆状态:', isLoggedIn);
        if (isLoggedIn !== 1) {
            setImmediate(function () { return nativeativeFunction(); });
            setTimeout(checkLoginStatus, 3000); // 每3秒检查一次，直到登陆成功
        }
        else {
            setImmediate(function () { return nativeativeFunction(); });
        }
    };
    setTimeout(checkLoginStatus, 3000); // 初始延迟3秒启动
    return nativeCallback;
})();
// 登出事件回调
var hookLogoutEventCallback = (function () {
    var nativeCallback = new NativeCallback(function () { }, 'void', ['int32']);
    var nativeativeFunction = new NativeFunction(nativeCallback, 'void', ['int32']);
    try {
        Interceptor.attach(moduleBaseAddress.add(wxOffsets.login.WX_LOGOUT_OFFSET), {
            onEnter: function (args) {
                try {
                    console.log('已登出:', args[0].toInt32());
                    var bySrv_1 = args[0].toInt32();
                    setImmediate(function () { return nativeativeFunction(bySrv_1); });
                }
                catch (e) {
                    console.error('登出回调失败：', e);
                    throw new Error(e);
                }
            }
        });
        return nativeCallback;
    }
    catch (e) {
        console.error('登出回调失败：', e);
        return null;
    }
})();
// 获取登录二维码
var getQrcodeLoginData = function () {
    var getQRCodeLoginMgr = new NativeFunction(moduleBaseAddress.add(wxOffsets.login.WX_LOGIN_URL_OFFSET), 'pointer', []);
    var qlMgr = getQRCodeLoginMgr();
    var json = {
        status: 0,
        uuid: '',
        wxid: '',
        avatarUrl: ''
    };
    if (!qlMgr.isNull()) {
        json.uuid = readString(qlMgr.add(8));
        json.status = qlMgr.add(40).readUInt();
        json.wxid = readString(qlMgr.add(44));
        json.avatarUrl = readString(qlMgr.add(92));
    }
    return json;
};
var isReady = false;
// 准备就绪回调
var agentReadyCallback = (function () {
    var nativeCallback = new NativeCallback(function () { }, 'void', []);
    var nativeativeFunction = new NativeFunction(nativeCallback, 'void', []);
    var checkLoginStatus = function () {
        var isLoggedIn = isLoggedInFunction();
        // console.log('当前登陆状态:', isLoggedIn);
        // 如果已经登陆则执行回调
        if (isLoggedIn === 1) {
            if (!isReady) {
                setImmediate(function () { return nativeativeFunction(); });
                isReady = true;
            }
            setTimeout(checkLoginStatus, 3000); // 每3秒检查一次，直到登陆成功
        }
    };
    setTimeout(checkLoginStatus, 3000); // 初始延迟3秒启动
    return nativeCallback;
})();
// 获取登录二维码(登录地址)
var getLoginUrlFunction = function () {
    var loginUrlAddr = moduleBaseAddress.add(wxOffsets.login.WX_LOGIN_URL_OFFSET).readPointer();
    var loginUrl = 'http://weixin.qq.com/x/' + loginUrlAddr.readUtf8String();
    return loginUrl;
};
// 获取自己的信息
var getMyselfInfoFunction = function () {
    // const ptr = 0
    var wx_code = '';
    var wx_id = '';
    var wx_name = '';
    var head_img_url = '';
    var base = moduleBaseAddress.add(wxOffsets.myselfInfo.WX_SELF_ID_OFFSET);
    var wxid_len = base.add(0x4D4).readU32();
    if (wxid_len === 0x13) { // 新版本微信
        wx_id = base.readPointer().readAnsiString(wxid_len);
        wx_code = base.add(0x64).readAnsiString();
    }
    else {
        wx_id = readString(base);
        wx_code = wx_id;
    }
    wx_name = readString(base.add(0x10C));
    var img_addr = base.add(0x2D8).readPointer();
    var img_len = base.add(0x2E8).readU32();
    head_img_url = img_addr.readAnsiString(img_len);
    var myself = {
        id: wx_id,
        code: wx_code,
        name: wx_name,
        head_img_url: head_img_url
    };
    var myselfJson = JSON.stringify(myself);
    // console.log('myselfJson:', myselfJson)
    return myselfJson;
};
var SelfInfoInner = /** @class */ (function () {
    function SelfInfoInner() {
    }
    return SelfInfoInner;
}());
// 获取联系人列表
var getContactNativeFunction = function () {
    // 基地址和偏移量需要根据目标程序实际情况调整
    // console.log('moduleBaseAddress:', moduleBaseAddress)
    var getInstanceAddr = moduleBaseAddress.add(wxOffsets.contactMgr.WX_CONTACT_MGR_OFFSET);
    // console.log('getInstanceAddr:', getInstanceAddr)
    var contactGetListAddr = moduleBaseAddress.add(wxOffsets.contact.WX_CONTACT_GET_LIST_OFFSET);
    // 准备用于存储联系人信息的数组
    var contacts = [];
    var contactPtr = Memory.alloc(Process.pointerSize * 3);
    contactPtr.writePointer(ptr(0)); // 初始化指针数组
    // 分配内存并编写汇编代码
    var asmCode = Memory.alloc(Process.pageSize);
    try {
        Memory.patchCode(asmCode, Process.pageSize, function (code) {
            var cw = new X86Writer(code, { pc: asmCode });
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
    }
    catch (e) {
        console.error('Error during assembly code construction:', e);
        return '';
    }
    // 执行汇编代码
    var success = -1;
    try {
        var nativeFunction = new NativeFunction(asmCode, 'int', []);
        success = nativeFunction();
        // console.log('success:', success)
    }
    catch (e) {
        console.error('Error during function execution:', e);
        return '';
    }
    // 解析联系人信息
    if (success) {
        var start = contactPtr.readPointer();
        var end = contactPtr.add(Process.pointerSize * 2).readPointer();
        var CONTACT_SIZE = 0x438; // 假设每个联系人数据结构的大小
        while (start.compare(end) < 0) {
            var contact = {
                wxid: start.add(0x10).readPointer().readUtf16String(),
                custom_account: start.add(0x24).readPointer().readUtf16String(),
                name: start.add(0x6c).readPointer().readUtf16String(),
                pinyin: start.add(0xAC).readPointer().readUtf16String(),
                pinyin_all: start.add(0xC0).readPointer().readUtf16String(),
                del_flag: start.add(0x4c).readU32(),
                type: start.add(0x50).readU32(),
                verify_flag: start.add(0x54).readU32(),
                alias: start.add(0x8c).readPointer().readUtf16String() || undefined
            };
            contacts.push(contact);
            start = start.add(CONTACT_SIZE);
        }
    }
    // console.log('contacts size:', contacts.length)
    var contactsString = JSON.stringify(contacts);
    // console.log('contacts:', contactsString)
    return contactsString;
};
// 获取群组列表
var getChatroomMemberInfoFunction = function () {
    // 获取群组列表地址
    var getChatroomNodeAddress = function () {
        var baseAddress = moduleBaseAddress.add(wxOffsets.storage.CONTACT_G_PINSTANCE_OFFSET).readPointer();
        if (baseAddress.isNull()) {
            return baseAddress;
        }
        return baseAddress.add(0x8c8).readPointer();
    };
    // 递归遍历群组节点
    var chatroomRecurse = function (node, chatroomNodeList, chatroomMemberList) {
        var chatroomNodeAddress = getChatroomNodeAddress();
        if (chatroomNodeAddress.isNull() || node.equals(chatroomNodeAddress)) {
            return;
        }
        if (chatroomNodeList.some(function (n) { return node.equals(n); })) {
            return;
        }
        chatroomNodeList.push(node);
        var roomid = readWideString(node.add(0x10));
        // try{
        //   console.log('获取群信息...', roomid)
        //   GetMemberFromChatRoom(roomid)
        // }catch(e){
        //   console.error('获取群信息失败：', e)
        // }
        var len = node.add(0x54).readU32();
        if (len > 4) {
            var memberStr = readString(node.add(0x44));
            if (memberStr.length > 0) {
                var admin = readWideString(node.add(0x74));
                // console.log('获取到的admin', admin)
                var memberList = memberStr.split(/[\\^][G]/);
                chatroomMemberList.push({ roomid: roomid, roomMember: memberList, admin: admin });
            }
        }
        chatroomRecurse(node.add(0x0).readPointer(), chatroomNodeList, chatroomMemberList);
        chatroomRecurse(node.add(0x04).readPointer(), chatroomNodeList, chatroomMemberList);
        chatroomRecurse(node.add(0x08).readPointer(), chatroomNodeList, chatroomMemberList);
    };
    // 主函数逻辑
    var chatroomNodeAddress = getChatroomNodeAddress();
    if (chatroomNodeAddress.isNull()) {
        return '[]';
    }
    var chatroomNodeList = [];
    var chatroomMemberList = [];
    var startNode = chatroomNodeAddress.add(0x0).readPointer();
    chatroomRecurse(startNode, chatroomNodeList, chatroomMemberList);
    var results = '[]';
    try {
        results = JSON.stringify(chatroomMemberList);
        // console.log('群组列表：', results)
    }
    catch (e) {
        console.log('格式转换错误：', 'e');
    }
    return results;
};
// 发送文本消息
var sendMsgNativeFunction = function (talkerId, content) {
    var txtAsm = Memory.alloc(Process.pageSize);
    // const buffwxid = Memory.alloc(0x20)
    var wxidPtr = Memory.alloc(talkerId.length * 2 + 2);
    wxidPtr.writeUtf16String(talkerId);
    var picWxid = Memory.alloc(0x0c);
    picWxid.writePointer(ptr(wxidPtr)).add(0x04)
        .writeU32(talkerId.length * 2).add(0x04)
        .writeU32(talkerId.length * 2).add(0x04);
    var contentPtr = Memory.alloc(content.length * 2 + 2);
    contentPtr.writeUtf16String(content);
    var sizeOfStringStruct = Process.pointerSize * 5;
    var contentStruct = Memory.alloc(sizeOfStringStruct);
    contentStruct
        .writePointer(contentPtr).add(0x4)
        .writeU32(content.length).add(0x4)
        .writeU32(content.length * 2);
    var ecxBuffer = Memory.alloc(0x2d8);
    Memory.patchCode(txtAsm, Process.pageSize, function (code) {
        var cw = new X86Writer(code, {
            pc: txtAsm
        });
        cw.putPushfx();
        cw.putPushax();
        cw.putPushU32(0x0);
        cw.putPushU32(0x0);
        cw.putPushU32(0x0);
        cw.putPushU32(0x1);
        cw.putPushU32(0x0);
        // cw.putMovRegReg
        cw.putMovRegAddress('eax', contentStruct);
        cw.putPushReg('eax');
        cw.putMovRegAddress('edx', picWxid); // room_id
        cw.putMovRegAddress('ecx', ecxBuffer);
        cw.putCallAddress(moduleBaseAddress.add(wxOffsets.sendText.WX_SEND_TEXT_OFFSET));
        cw.putAddRegImm('esp', 0x18);
        cw.putPopax();
        cw.putPopfx();
        cw.putRet();
        cw.flush();
    });
    // console.log('----------txtAsm', txtAsm)
    var nativeativeFunction = new NativeFunction(ptr(txtAsm), 'void', []);
    nativeativeFunction();
};
// 发送@消息
var sendAtMsgNativeFunction = function (roomId, text, contactId, nickname) {
    var asmAtMsg = null;
    asmAtMsg = Memory.alloc(Process.pageSize);
    var ecxBuffer = Memory.alloc(0x3b0);
    var atContent = '@' + nickname + ' ' + text;
    var roomid_ = initStruct(roomId);
    var wxid_ = initidStruct(contactId);
    var msg_ = initmsgStruct(atContent);
    var atid_ = initAtMsgStruct(wxid_);
    Memory.patchCode(asmAtMsg, Process.pageSize, function (code) {
        var cw = new X86Writer(code, {
            pc: asmAtMsg
        });
        cw.putPushfx();
        cw.putPushax();
        cw.putPushU32(0x0);
        cw.putPushU32(0x0);
        cw.putPushU32(0x0);
        cw.putPushU32(0x1);
        // cw.putPushU32(0x0)
        cw.putMovRegAddress('eax', atid_);
        cw.putPushReg('eax');
        // cw.putMovRegReg
        cw.putMovRegAddress('eax', msg_);
        cw.putPushReg('eax');
        cw.putMovRegAddress('edx', roomid_); // room_id
        cw.putMovRegAddress('ecx', ecxBuffer);
        cw.putCallAddress(moduleBaseAddress.add(wxOffsets.sendText.WX_SEND_TEXT_OFFSET));
        cw.putAddRegImm('esp', 0x18);
        cw.putPopax();
        cw.putPopfx();
        cw.putRet();
        cw.flush();
    });
    // console.log('----------txtAsm', asmAtMsg)
    var nativeativeFunction = new NativeFunction(ptr(asmAtMsg), 'void', []);
    nativeativeFunction();
};
// 发送图片消息
var sendPicMsgNativeFunction = function (contactId, path) {
    var picAsm = Memory.alloc(Process.pageSize);
    var buffwxid = Memory.alloc(0x20);
    var picbuff = Memory.alloc(0x2D8);
    var pathPtr = Memory.alloc(path.length * 2 + 1);
    pathPtr.writeUtf16String(path);
    var imagefilepath = Memory.alloc(0x24);
    imagefilepath.writePointer(pathPtr).add(0x04)
        .writeU32(path.length * 2).add(0x04)
        .writeU32(path.length * 2).add(0x04);
    var picWxidPtr = Memory.alloc(contactId.length * 2 + 1);
    picWxidPtr.writeUtf16String(contactId);
    var picWxid = Memory.alloc(0x0c);
    picWxid.writePointer(ptr(picWxidPtr)).add(0x04)
        .writeU32(contactId.length * 2).add(0x04)
        .writeU32(contactId.length * 2).add(0x04);
    // const test_offset1 = 0x701DC0;
    Memory.patchCode(picAsm, Process.pageSize, function (code) {
        var cw = new X86Writer(code, {
            pc: picAsm
        });
        cw.putPushfx();
        cw.putPushax();
        cw.putCallAddress(moduleBaseAddress.add(wxOffsets.sendMessageMgr.WX_SEND_MESSAGE_MGR_OFFSET));
        cw.putMovRegReg('edx', 'eax'); // 缓存
        cw.putSubRegImm('esp', 0x14);
        cw.putMovRegAddress('eax', buffwxid);
        cw.putMovRegReg('ecx', 'esp');
        cw.putMovRegAddress('edi', imagefilepath);
        cw.putPushReg('eax');
        cw.putCallAddress(moduleBaseAddress.add(wxOffsets.setChatMsgValue.WX_INIT_CHAT_MSG_OFFSET));
        cw.putMovRegReg('ecx', 'edx');
        cw.putMovRegAddress('eax', picWxid); //= lea
        cw.putMovRegAddress('edi', imagefilepath);
        cw.putPushReg('edi');
        cw.putPushReg('eax');
        cw.putMovRegAddress('eax', picbuff);
        cw.putPushReg('eax');
        cw.putMovRegAddress('edi', picWxid); // edi
        cw.putCallAddress(moduleBaseAddress.add(wxOffsets.sendImage.WX_SEND_IMAGE_OFFSET));
        cw.putPopax();
        cw.putPopfx();
        cw.putRet();
        cw.flush();
    });
    // console.log('----------picAsm',picAsm)
    var nativeativeFunction = new NativeFunction(ptr(picAsm), 'void', []);
    nativeativeFunction();
};
// 接收消息回调
var recvMsgNativeCallback = (function () {
    var nativeCallback = new NativeCallback(function () { }, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'int32']);
    var nativeativeFunction = new NativeFunction(nativeCallback, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'int32']);
    try {
        Interceptor.attach(moduleBaseAddress.add(wxOffsets.hookMsg.WX_RECV_MSG_HOOK_OFFSET), {
            onEnter: function () {
                try {
                    var addr = this.context.ecx; // 0xc30-0x08
                    var msgType_1 = addr.add(0x38).readU32();
                    var isMyMsg_1 = addr.add(0x3C).readU32(); // add isMyMsg
                    if (msgType_1 > 0) {
                        var talkerIdPtr = addr.add(0x48).readPointer();
                        // console.log('txt msg',talkerIdPtr.readUtf16String())
                        var talkerIdLen = addr.add(0x48 + 0x04).readU32() * 2 + 2;
                        var myTalkerIdPtr_1 = Memory.alloc(talkerIdLen);
                        Memory.copy(myTalkerIdPtr_1, talkerIdPtr, talkerIdLen);
                        var contentPtr = null;
                        var contentLen = 0;
                        var myContentPtr_1 = null;
                        if (msgType_1 === 3) { // pic path
                            var thumbPtr = addr.add(0x198).readPointer();
                            var hdPtr = addr.add(0x1ac).readPointer();
                            var thumbPath = thumbPtr.readUtf16String();
                            var hdPath = hdPtr.readUtf16String();
                            var picData = [
                                thumbPath,
                                thumbPath,
                                hdPath,
                                hdPath, //  PUPPET.types.Image.Artwork
                            ];
                            var content = JSON.stringify(picData);
                            myContentPtr_1 = Memory.allocUtf16String(content);
                        }
                        else {
                            contentPtr = addr.add(0x70).readPointer();
                            contentLen = addr.add(0x70 + 0x04).readU32() * 2 + 2;
                            myContentPtr_1 = Memory.alloc(contentLen);
                            Memory.copy(myContentPtr_1, contentPtr, contentLen);
                        }
                        //  console.log('----------------------------------------')
                        //  console.log(msgType)
                        //  console.log(contentPtr.readUtf16String())
                        //  console.log('----------------------------------------')
                        var groupMsgAddr = addr.add(0x174).readU32(); //* 2 + 2
                        var myGroupMsgSenderIdPtr_1 = null;
                        if (groupMsgAddr === 0) { // weChatPublic is zero，type is 49
                            myGroupMsgSenderIdPtr_1 = Memory.alloc(0x10);
                            myGroupMsgSenderIdPtr_1.writeUtf16String('null');
                        }
                        else {
                            var groupMsgSenderIdPtr = addr.add(0x174).readPointer();
                            var groupMsgSenderIdLen = addr.add(0x174 + 0x04).readU32() * 2 + 2;
                            myGroupMsgSenderIdPtr_1 = Memory.alloc(groupMsgSenderIdLen);
                            Memory.copy(myGroupMsgSenderIdPtr_1, groupMsgSenderIdPtr, groupMsgSenderIdLen);
                        }
                        var xmlNullPtr = addr.add(0x1f0).readU32(); // 3.9.2.23
                        var myXmlContentPtr_1 = null;
                        if (xmlNullPtr === 0) {
                            myXmlContentPtr_1 = Memory.alloc(0x10);
                            myXmlContentPtr_1.writeUtf16String('null');
                        }
                        else {
                            var xmlContentPtr = addr.add(0x1f0).readPointer(); // 3.9.2.23
                            var xmlContentLen = addr.add(0x1f0 + 0x04).readU32() * 2 + 2;
                            myXmlContentPtr_1 = Memory.alloc(xmlContentLen);
                            Memory.copy(myXmlContentPtr_1, xmlContentPtr, xmlContentLen);
                        }
                        setImmediate(function () { return nativeativeFunction(msgType_1, myTalkerIdPtr_1, myContentPtr_1, myGroupMsgSenderIdPtr_1, myXmlContentPtr_1, isMyMsg_1); });
                    }
                }
                catch (e) {
                    console.error('接收消息回调失败：', e);
                    throw new Error(e);
                }
            }
        });
        return nativeCallback;
    }
    catch (e) {
        console.error('回调消息失败：');
        return null;
    }
})();
// 获取群成员昵称
var getChatroomMemberNickInfoFunction = (function (memberId, roomId) {
    console.log('Function called with wxid:', memberId, 'chatRoomId:', roomId);
    var memberNickBuffAsm = null;
    var nickRoomId = null;
    var nickMemberId = null;
    var nickBuff = null;
    nickBuff = Memory.alloc(0x7e4);
    //const nickRetAddr = Memory.alloc(0x04)
    memberNickBuffAsm = Memory.alloc(Process.pageSize);
    //console.log('asm address----------',memberNickBuffAsm)
    nickRoomId = initidStruct(roomId);
    //console.log('nick room id',nickRoomId)
    nickMemberId = initStruct(memberId);
    //console.log('nick nickMemberId id',nickMemberId)
    //const nickStructPtr = initmsgStruct('')
    Memory.patchCode(memberNickBuffAsm, Process.pageSize, function (code) {
        var cw = new X86Writer(code, {
            pc: memberNickBuffAsm
        });
        cw.putPushfx();
        cw.putPushax();
        cw.putMovRegAddress('edi', nickRoomId);
        cw.putMovRegAddress('eax', nickBuff);
        cw.putMovRegReg('edx', 'edi');
        cw.putPushReg('eax');
        cw.putMovRegAddress('ecx', nickMemberId);
        console.log('moduleBaseAddress', moduleBaseAddress);
        cw.putCallAddress(moduleBaseAddress.add(0xC06F10));
        cw.putAddRegImm('esp', 0x04);
        cw.putPopax();
        cw.putPopfx();
        cw.putRet();
        cw.flush();
    });
    var nativeativeFunction = new NativeFunction(ptr(memberNickBuffAsm), 'void', []);
    nativeativeFunction();
    console.log('nickBuff:', nickBuff);
    var nickname = readWideString(nickBuff);
    console.log('----nickname', nickname);
    return nickname;
});
getChatroomMemberNickInfoFunction('tyutluyc', '21341182572@chatroom');
var getChatroomMemberNickInfoFunction1 = function (wxid, chatRoomId) {
    console.log('Function called with wxid:', wxid, 'chatRoomId:', chatRoomId);
    var base_addr = moduleBaseAddress; // 替换为实际的基地址
    var WX_CHAT_ROOM_MGR_OFFSET = wxOffsets.chatRoomMgr.WX_CHAT_ROOM_MGR_OFFSET; // 替换为实际的偏移量
    var WX_GET_MEMBER_NICKNAME_OFFSET = wxOffsets.chatRoom.WX_GET_MEMBER_NICKNAME_OFFSET; // 替换为实际的偏移量
    var WX_CONTACT_MGR_OFFSET = wxOffsets.contactMgr.WX_CONTACT_MGR_OFFSET; // 替换为实际的偏移量
    var WX_GET_CONTACT_OFFSET = wxOffsets.contact.WX_GET_CONTACT_OFFSET; // 替换为实际的偏移量
    var WX_FREE_CONTACT_OFFSET = wxOffsets.chatRoom.WX_FREE_CONTACT_OFFSET; // 替换为实际的偏移量
    // 准备函数地址
    var get_chat_room_mgr_addr = base_addr.add(WX_CHAT_ROOM_MGR_OFFSET);
    var get_nickname_addr = base_addr.add(WX_GET_MEMBER_NICKNAME_OFFSET);
    var contact_mgr_addr = base_addr.add(WX_CONTACT_MGR_OFFSET);
    var get_contact_addr = base_addr.add(WX_GET_CONTACT_OFFSET);
    var free_contact_addr = base_addr.add(WX_FREE_CONTACT_OFFSET);
    // 准备内存空间
    var chat_room = Memory.allocUtf16String(chatRoomId);
    var member_id = Memory.allocUtf16String(wxid);
    var nickname = Memory.allocUtf16String(''); // 初始化为空的 WeChatString
    var buffer = Memory.alloc(0x440); // 分配用于存储姓名的缓冲区
    var name = '';
    // 使用 X86Writer 编写内联汇编
    var asmCode = Memory.alloc(Process.pageSize);
    try {
        Memory.patchCode(asmCode, Process.pageSize, function (code) {
            var cw = new X86Writer(code, { pc: asmCode });
            console.log('保存寄存器状态');
            cw.putPushax();
            cw.putPushfx();
            console.log('调用 get_chat_room_mgr_addr:', get_chat_room_mgr_addr);
            cw.putCallAddress(get_chat_room_mgr_addr);
            console.log('将 nickname 地址移动到 ecx:', nickname);
            cw.putMovRegAddress('ecx', nickname);
            console.log('将 ecx 压栈');
            cw.putPushReg('ecx');
            console.log('将 member_id 地址移动到 ecx:', member_id);
            cw.putMovRegAddress('ecx', member_id);
            console.log('将 ecx 压栈');
            cw.putPushReg('ecx');
            console.log('将 chat_room 地址移动到 ecx:', chat_room);
            cw.putMovRegAddress('ecx', chat_room);
            console.log('将 ecx 压栈');
            cw.putPushReg('ecx');
            console.log('将 eax 移动到 ecx');
            cw.putMovRegReg('ecx', 'eax');
            console.log('调用 get_nickname_addr:', get_nickname_addr);
            cw.putCallAddress(get_nickname_addr);
            console.log('恢复寄存器状态');
            cw.putPopfx();
            cw.putPopax();
            console.log('返回');
            cw.putRet();
            cw.flush();
        });
        console.log('调用汇编代码的第一部分');
        var nativeFunction = new NativeFunction(asmCode, 'void', []);
        nativeFunction();
    }
    catch (e) {
        console.error('执行第一部分汇编代码时出错:', e);
    }
    if (nickname.readPointer().isNull() || nickname.readPointer().equals(ptr(0))) {
        console.log('昵称指针为空，调用汇编代码的第二部分');
        try {
            Memory.patchCode(asmCode, Process.pageSize, function (code) {
                var cw = new X86Writer(code, { pc: asmCode });
                cw.putPushfx();
                cw.putPushax();
                // 第二部分汇编
                cw.putCallAddress(contact_mgr_addr);
                cw.putMovRegAddress('ecx', buffer);
                cw.putPushReg('ecx');
                cw.putMovRegAddress('ecx', member_id);
                cw.putPushReg('ecx');
                cw.putMovRegReg('ecx', 'eax');
                cw.putCallAddress(get_contact_addr);
                cw.putPopax();
                cw.putPopfx();
                cw.putRet();
                cw.flush();
            });
            var nativeFunction = new NativeFunction(asmCode, 'void', []);
            nativeFunction();
        }
        catch (e) {
            console.error('执行第二部分汇编代码时出错:', e);
        }
        try {
            name = buffer.add(0x6C).readUtf16String();
            console.log('从联系人管理器中找到姓名:', name);
        }
        catch (e) {
            console.error('从缓冲区读取姓名时出错:', e);
        }
        try {
            var freeChatRoom = new NativeFunction(free_contact_addr, 'void', ['pointer']);
            freeChatRoom(buffer);
        }
        catch (e) {
            console.error('清理资源时出错:', e);
        }
    }
    else {
        console.log('昵称指针非空，直接读取昵称');
        try {
            name = nickname.readPointer().readUtf16String();
            console.log('从聊天室管理器中找到姓名:', name);
        }
        catch (e) {
            console.error('从昵称指针读取姓名时出错:', e);
        }
    }
    console.log('最终姓名:', name);
    return name;
};
