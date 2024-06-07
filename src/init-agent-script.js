/**
 * WeChat 3.9.10.19
 *
 */
// 偏移地址,来自于wxhelper项目
var wxOffsets = {
    kGetAccountServiceMgr: 0x1c1fe70,
    kSyncMsg: 0xc39680,
    kSyncMsgNext: 0xc39680,
    kGetCurrentDataPath: 0x2315ea0,
    kGetAppDataSavePath: 0x26a7df0,
    kGetSendMessageMgr: 0x1c1e670,
    kSendTextMsg: 0x238ec70,
    kFreeChatMsg: 0x1c1fef0,
    shareRecordMgr: {
        WX_SHARE_RECORD_MGR_OFFSET: 0x78cb40
    },
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
        WX_ACCOUNT_SERVICE_OFFSET: 0x1c1fe70,
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
        WX_SEND_TEXT_OFFSET: 0x11de090
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
        SEND_APP_MSG_OFFSET: 0xfe7840
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
        WX_RECV_MSG_HOOK_OFFSET: 0x23d6f50,
        WX_RECV_MSG_HOOK_NEXT_OFFSET: 0xc39680,
        WX_SNS_HOOK_OFFSET: 0x14f9e15,
        WX_SNS_HOOK_NEXT_OFFSET: 0x14fa0a0
    },
    hookVoice: {
        WX_HOOK_VOICE_OFFSET: 0xd4d8d8,
        WX_HOOK_VOICE_NEXT_OFFSET: 0x203d130
    }
};
var moduleBaseAddress = Module.getBaseAddress('WeChatWin.dll');
// console.log('moduleBaseAddress:', moduleBaseAddress)
/* -----------------base------------------------- */
var writeWStringPtr = function (str) {
    console.log("\u8F93\u5165\u5B57\u7B26\u4E32\u5185\u5BB9: ".concat(str));
    var strLength = str.length;
    // console.log(`字符串长度: ${strLength}`);
    // 计算UTF-16编码的字节长度（每个字符2个字节）
    var utf16Length = strLength * 2;
    // 计算我们需要为字符串对象结构分配的总内存空间，结构包含：指针 (Process.pointerSize) + 长度 (4 bytes) + 容量 (4 bytes)
    var structureSize = Process.pointerSize + 4 + 4;
    // 为字符串数据和结构体分配连续的内存空间
    var totalSize = utf16Length + 2 + structureSize; // +2 用于 null 终止符
    var basePointer = Memory.alloc(totalSize);
    // 将结构体指针定位到分配的内存起始位置
    var structurePointer = basePointer;
    // console.log(`字符串分配空间内存指针: ${structurePointer}`);
    // 将字符串数据指针定位到结构体之后的位置
    var stringDataPointer = basePointer.add(structureSize);
    // console.log(`字符串保存地址指针: ${stringDataPointer}`);
    // 将 JavaScript 字符串转换成 UTF-16 编码格式，并写入分配的内存空间
    stringDataPointer.writeUtf16String(str);
    // console.log(`写入字符串到地址: ${stringDataPointer.readUtf16String()}`);
    // 检查分配的内存内容
    var allocatedMemoryContent = stringDataPointer.readUtf16String();
    // console.log(`检查分配的内存内容: ${allocatedMemoryContent}`);
    // 在分配的内存空间中写入字符串对象的信息
    // 写入字符串数据指针
    structurePointer.writePointer(stringDataPointer);
    // console.log(`写入字符串地址存放指针: ${structurePointer.readPointer()}`);
    // console.log(`写入字符串内容确认: ${structurePointer.readPointer().readUtf16String()}`);
    // 写入字符串长度（确保是长度，不包含 null 终止符）
    structurePointer.add(Process.pointerSize).writeU32(strLength);
    // console.log(`写入字符串长度指针: ${structurePointer.add(Process.pointerSize)}`);
    // 写入字符串容量，这里我们假设容量和长度是相同的
    structurePointer.add(Process.pointerSize + 4).writeU32(strLength);
    // console.log(`写入字符串容量指针: ${structurePointer.add(Process.pointerSize + 4)}`);
    // console.log(`写入字符串内容再次确认: ${structurePointer.readPointer().readUtf16String()}`);
    // console.log(`写入字符地址再次确认: ${structurePointer.readPointer()}`);
    // console.log(`读取32位测试: ${structurePointer.readPointer().readS32()}`);
    // console.log(`return写入字符串结构体: ${structurePointer}`);
    // 返回分配的结构体表面的起始地址
    return structurePointer;
};
var readWStringPtr = function (addr) {
    // console.log(`input读取字符串地址指针4: ${addr}`);
    // console.log(`读取字符串内容指针4: ${addr.readPointer().readUtf16String()}`);
    var stringPointer = addr.readPointer();
    // console.log(`读取数据指针地址1: ${stringPointer}`);
    // console.log(`读取数据指针内容1: ${stringPointer.readUtf16String()}`);
    var size = addr.add(Process.pointerSize).readU32();
    // console.log(`读取字符串长度: ${size}`);
    var capacity = addr.add(Process.pointerSize + 4).readU32();
    // console.log(`读取字符串容量: ${capacity}`);
    return {
        ptr: stringPointer,
        size: size,
        capacity: capacity,
        readUtf16String: function () {
            var _a;
            // UTF-16字符串长度需要乘以2，因为每个字符占2个字节
            var content = size ? (_a = stringPointer.readUtf16String()) === null || _a === void 0 ? void 0 : _a.replace(/\0+$/, '') : '';
            console.log("\u8BFB\u53D6\u5B57\u7B26\u4E32\u5185\u5BB9: ".concat(content));
            return content;
        }
    };
};
function ReadWeChatStr(addr) {
    // console.log("addr: " + addr);
    addr = ptr(addr);
    var len = addr.add(0x10).readS64(); // 使用 ptr的`.readS64`方法
    // console.log("len: " + len);
    if (len == 0)
        return "";
    var max_len = addr.add(0x18).readS64();
    // console.log("max_len: " + max_len);
    var res = '';
    if ((max_len.or(0xF)).equals(0xF)) {
        res = addr.readUtf8String(len);
    }
    else {
        var char_from_user = addr.readPointer();
        res = char_from_user.readUtf8String(len);
    }
    // console.log("res: " + res);
    return res;
}
function ReadSKBuiltinString(addr) {
    var inner_string = ptr(addr.add(0x8)).readS64();
    // console.log("inner_string: " + inner_string);
    // if (inner_string.isNull()) return "";
    return ReadWeChatStr(inner_string);
}
function HandleSyncMsg(param1, param2, param3) {
    // console.log("HandleSyncMsg called with param2: " + param2);
    var msg = {
        fromUser: '',
        toUser: '',
        content: '',
        signature: '',
        msgId: '',
        msgSequence: 0,
        createTime: 0,
        displayFullContent: '',
        type: 0
    };
    // 填充消息内容到JSON对象
    msg.fromUser = ReadSKBuiltinString(param2.add(0x18).readS64()); // 发送者
    msg.toUser = ReadSKBuiltinString(param2.add(0x28).readS64()); // 发送者
    msg.content = ReadSKBuiltinString(param2.add(0x30).readS64()); // 消息内容
    msg.signature = ReadWeChatStr(param2.add(0x48).readS64()); // 消息签名
    msg.msgId = param2.add(0x60).readS64(); // 消息ID
    msg.msgSequence = param2.add(0x5C).readS32(); // 消息序列号
    msg.createTime = param2.add(0x58).readS32(); // 创建时间
    msg.displayFullContent = ReadWeChatStr((param2.add(0x50).readS64())); // 是否展示完整内容
    msg.type = param2.add(0x24).readS32(); // 消息类型
    // 根据消息类型处理图片消息
    if (msg['type'] == 3) {
        // const img = ReadSKBuiltinBuffer(param2.add(0x40).readS64()); // 读取图片数据
        var img = ReadSKBuiltinString(param2.add(0x40).readS64()); // 读取图片数据
        console.log("img: " + img);
        msg.base64Img = img; // 将图片数据编码为Base64字符串
    }
    console.log("HandleSyncMsg msg: " + JSON.stringify(msg));
    return msg;
}
// 获取自己的信息
var getMyselfInfoFunction = function () {
    var success = -1;
    var out = {};
    // 确定相关函数的地址
    var accountServiceAddr = moduleBaseAddress.add(wxOffsets.kGetAccountServiceMgr);
    var getAppDataSavePathAddr = moduleBaseAddress.add(wxOffsets.kGetAppDataSavePath);
    var getCurrentDataPathAddr = moduleBaseAddress.add(wxOffsets.kGetCurrentDataPath);
    // Funcion hooks (使用Interceptor.attach可以替代这些函数，下面只是示例)
    var GetService = new NativeFunction(accountServiceAddr, 'pointer', []);
    var GetDataSavePath = new NativeFunction(getAppDataSavePathAddr, 'void', ['pointer']);
    var GetCurrentDataPath = new NativeFunction(getCurrentDataPathAddr, 'void', ['pointer']);
    var serviceAddr = GetService();
    // 必要的辅助函数
    function readWeChatString(addr, offset) {
        if (addr.add(offset).readU32() === 0 || addr.add(offset + 0x10).readU32() === 0) {
            return '';
        }
        var stringAddr = addr.add(offset);
        if (stringAddr.add(0x18).readU32() === 0xF) {
            return stringAddr.readUtf8String(addr.add(offset + 0x10).readU32());
        }
        else {
            return stringAddr.readPointer().readUtf8String(addr.add(offset + 0x10).readU32());
        }
    }
    // 使用辅助函数来模版处理字符串读取
    if (!serviceAddr.isNull()) {
        out.wxid = ReadWeChatStr(serviceAddr.add(0x80));
        out.account = readWeChatString(serviceAddr, 0x108);
        out.mobile = readWeChatString(serviceAddr, 0x128);
        out.signature = readWeChatString(serviceAddr, 0x148);
        // ... 其他属性按照相同的模式处理
        //     if (*(int64_t*)(service_addr + 0x148) == 0 ||
        //     *(int64_t*)(service_addr + 0x148 + 0x10) == 0) {
        if (serviceAddr.add(0x148).readU32() === 0 || serviceAddr.add(0x148 + 0x10).readU32() === 0) {
            //   out.signature = std::string();
            out.signature = '';
            // } else {
        }
        else {
            //   if (*(int64_t*)(service_addr + 0x148 + 0x18) == 0xF) {
            if (serviceAddr.add(0x148 + 0x18).readU32() === 0xF) {
                //     out.signature = std::string((char*)(service_addr + 0x148),
                //                                 *(int64_t*)(service_addr + 0x148 + 0x10));
                out.signature = serviceAddr.add(0x148).readUtf8String(serviceAddr.add(0x148 + 0x10).readU32());
                //   } else {
            }
            else {
                //     out.signature = std::string(*(char**)(service_addr + 0x148),
                //                                 *(int64_t*)(service_addr + 0x148 + 0x10));
                out.signature = serviceAddr.add(0x148).readPointer().readUtf8String(serviceAddr.add(0x148 + 0x10).readU32());
                //   }
            }
            // }
        }
        // if (*(int64_t*)(service_addr + 0x168) == 0 ||
        //     *(int64_t*)(service_addr + 0x168 + 0x10) == 0) {
        if (serviceAddr.add(0x168).readU32() === 0 || serviceAddr.add(0x168 + 0x10).readU32() === 0) {
            //   out.country = std::string();
            // } else {
        }
        else {
            //   if (*(int64_t*)(service_addr + 0x168 + 0x18) == 0xF) {
            if (serviceAddr.add(0x168 + 0x18).readU32() === 0xF) {
                //     out.country = std::string((char*)(service_addr + 0x168),
                //                               *(int64_t*)(service_addr + 0x168 + 0x10));
                out.country = serviceAddr.add(0x168).readUtf8String(serviceAddr.add(0x168 + 0x10).readU32());
                //   } else {
            }
            else {
                //     out.country = std::string(*(char**)(service_addr + 0x168),
                //                               *(int64_t*)(service_addr + 0x168 + 0x10));
                out.country = serviceAddr.add(0x168).readPointer().readUtf8String(serviceAddr.add(0x168 + 0x10).readU32());
                //   }
            }
            // }
        }
        // if (*(int64_t*)(service_addr + 0x188) == 0 ||
        //     *(int64_t*)(service_addr + 0x188 + 0x10) == 0) {
        if (serviceAddr.add(0x188).readU32() === 0 || serviceAddr.add(0x188 + 0x10).readU32() === 0) {
            //   out.province = std::string();
            out.province = '';
            // } else {
        }
        else {
            //   if (*(int64_t*)(service_addr + 0x188 + 0x18) == 0xF) {
            //     out.province = std::string((char*)(service_addr + 0x188),
            //                                *(int64_t*)(service_addr + 0x188 + 0x10));
            //   } else {
            //     out.province = std::string(*(char**)(service_addr + 0x188),
            //                                *(int64_t*)(service_addr + 0x188 + 0x10));
            //   }
            // }
            if (serviceAddr.add(0x188 + 0x18).readU32() === 0xF) {
                out.province = serviceAddr.add(0x188).readUtf8String(serviceAddr.add(0x188 + 0x10).readU32());
            }
            else {
                out.province = serviceAddr.add(0x188).readPointer().readUtf8String(serviceAddr.add(0x188 + 0x10).readU32());
            }
        }
        // if (*(int64_t*)(service_addr + 0x1A8) == 0 ||
        //     *(int64_t*)(service_addr + 0x1A8 + 0x10) == 0) {
        //   out.city = std::string();
        // } else {
        //   if (*(int64_t*)(service_addr + 0x1A8 + 0x18) == 0xF) {
        //     out.city = std::string((char*)(service_addr + 0x1A8),
        //                            *(int64_t*)(service_addr + 0x1A8 + 0x10));
        //   } else {
        //     out.city = std::string(*(char**)(service_addr + 0x1A8),
        //                            *(int64_t*)(service_addr + 0x1A8 + 0x10));
        //   }
        // }
        if (serviceAddr.add(0x1A8).readU32() === 0 || serviceAddr.add(0x1A8 + 0x10).readU32() === 0) {
            out.city = '';
        }
        else {
            if (serviceAddr.add(0x1A8 + 0x18).readU32() === 0xF) {
                out.city = serviceAddr.add(0x1A8).readUtf8String(serviceAddr.add(0x1A8 + 0x10).readU32());
            }
            else {
                out.city = serviceAddr.add(0x1A8).readPointer().readUtf8String(serviceAddr.add(0x1A8 + 0x10).readU32());
            }
        }
        // if (*(int64_t*)(service_addr + 0x1E8) == 0 ||
        //     *(int64_t*)(service_addr + 0x1E8 + 0x10) == 0) {
        //   out.name = std::string();
        // } else {
        //   if (*(int64_t*)(service_addr + 0x1E8 + 0x18) == 0xF) {
        //     out.name = std::string((char*)(service_addr + 0x1E8),
        //                            *(int64_t*)(service_addr + 0x1E8 + 0x10));
        //   } else {
        //     out.name = std::string(*(char**)(service_addr + 0x1E8),
        //                            *(int64_t*)(service_addr + 0x1E8 + 0x10));
        //   }
        // }
        if (serviceAddr.add(0x1E8).readU32() === 0 || serviceAddr.add(0x1E8 + 0x10).readU32() === 0) {
            out.name = '';
        }
        else {
            if (serviceAddr.add(0x1E8 + 0x18).readU32() === 0xF) {
                out.name = serviceAddr.add(0x1E8).readUtf8String(serviceAddr.add(0x1E8 + 0x10).readU32());
            }
            else {
                out.name = serviceAddr.add(0x1E8).readPointer().readUtf8String(serviceAddr.add(0x1E8 + 0x10).readU32());
            }
        }
        // if (*(int64_t*)(service_addr + 0x450) == 0 ||
        //     *(int64_t*)(service_addr + 0x450 + 0x10) == 0) {
        //   out.head_img = std::string();
        // } else {
        //   out.head_img = std::string(*(char**)(service_addr + 0x450),
        //                              *(int64_t*)(service_addr + 0x450 + 0x10));
        // }
        if (serviceAddr.add(0x450).readU32() === 0 || serviceAddr.add(0x450 + 0x10).readU32() === 0) {
            out.head_img = '';
        }
        else {
            out.head_img = serviceAddr.add(0x450).readPointer().readUtf8String(serviceAddr.add(0x450 + 0x10).readU32());
        }
        // if (*(int64_t*)(service_addr + 0x7B8) == 0 ||
        //     *(int64_t*)(service_addr + 0x7B8 + 0x10) == 0) {
        //   out.public_key = std::string();
        // } else {
        //   out.public_key = std::string(*(char**)(service_addr + 0x7B8),
        //                                *(int64_t*)(service_addr + 0x7B8 + 0x10));
        // }
        if (serviceAddr.add(0x7B8).readU32() === 0 || serviceAddr.add(0x7B8 + 0x10).readU32() === 0) {
            out.public_key = '';
        }
        else {
            out.public_key = serviceAddr.add(0x7B8).readPointer().readUtf8String(serviceAddr.add(0x7B8 + 0x10).readU32());
        }
        // if (*(int64_t*)(service_addr + 0x7D8) == 0 ||
        //     *(int64_t*)(service_addr + 0x7D8 + 0x10) == 0) {
        //   out.private_key = std::string();
        // } else {
        //   out.private_key = std::string(*(char**)(service_addr + 0x7D8),
        //                                 *(int64_t*)(service_addr + 0x7D8 + 0x10));
        // }
        if (serviceAddr.add(0x7D8).readU32() === 0 || serviceAddr.add(0x7D8 + 0x10).readU32() === 0) {
            out.private_key = '';
        }
        else {
            out.private_key = serviceAddr.add(0x7D8).readPointer().readUtf8String(serviceAddr.add(0x7D8 + 0x10).readU32());
        }
    }
    // console.log('out:', JSON.stringify(out, null, 2))
    var myself = {
        id: out.wxid,
        code: out.account,
        name: out.name,
        head_img_url: out.head_img
    };
    var myselfJson = JSON.stringify(myself, null, 2);
    // console.log('myselfJson:', myselfJson)
    return myselfJson;
};
var sendMsgNativeFunction = (function (contactId, text) {
    console.log('\n\n');
    console.log('sendMsgNativeFunction contactId:', contactId);
    var to_user = null;
    var text_msg = null;
    // const to_user = Memory.alloc(wxid.length * 2 + 2)
    // to_user.writeUtf16String(wxid)
    // to_user = new WeChatString(wxid).getMemoryAddress();
    // console.log('wxid:', wxid)
    to_user = writeWStringPtr(contactId);
    console.log('to_user wxid :', readWStringPtr(to_user).readUtf16String());
    // const text_msg = Memory.alloc(msg.length * 2 + 2)
    // text_msg.writeUtf16String(msg)
    // text_msg = new WeChatString(msg).getMemoryAddress();
    text_msg = writeWStringPtr(text);
    console.log('text_msg msg:', readWStringPtr(text_msg).readUtf16String());
    // console.log('\n\n');
    var send_message_mgr_addr = moduleBaseAddress.add(wxOffsets.kGetSendMessageMgr);
    var send_text_msg_addr = moduleBaseAddress.add(wxOffsets.kSendTextMsg);
    var free_chat_msg_addr = moduleBaseAddress.add(wxOffsets.kFreeChatMsg);
    console.log('send_message_mgr_addr:', send_message_mgr_addr);
    var chat_msg = Memory.alloc(0x460 * Process.pointerSize); // 在frida中分配0x460字节的内存
    chat_msg.writeByteArray(Array(0x460 * Process.pointerSize).fill(0)); // 清零分配的内存
    console.log('chat_msg:', chat_msg);
    var temp = Memory.alloc(3 * Process.pointerSize); // 分配临时数组内存
    temp.writeByteArray(Array(3 * Process.pointerSize).fill(0)); // 初始化数组
    console.log('temp:', temp);
    // 定义函数原型并实例化 NativeFunction 对象
    var mgr = new NativeFunction(send_message_mgr_addr, 'void', []);
    var sendMsg = new NativeFunction(send_text_msg_addr, 'uint64', ['pointer', 'pointer', 'pointer', 'pointer', 'int64', 'int64', 'int64', 'int64']);
    var free = new NativeFunction(free_chat_msg_addr, 'void', ['pointer']);
    console.log('mgr:', mgr);
    // 调用发送消息管理器初始化
    mgr();
    // 发送文本消息
    // console.log('chat_msg:', chat_msg);
    // console.log('to_user:', to_user);
    // console.log('text_msg:', text_msg);
    // console.log('temp:', temp);
    var success = sendMsg(chat_msg, to_user, text_msg, temp, 1, 1, 0, 0);
    console.log('sendText success:', success);
    // 释放ChatMsg内存
    free(chat_msg);
    console.log('sendMsgNativeFunction success:', success);
});
// 接收消息回调
/**
 * @Hook: recvMsg -> recvMsgNativeCallback
 */
var recvMsgNativeCallback = (function () {
    var nativeCallback = new NativeCallback(function () { }, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'int32']);
    var nativeativeFunction = new NativeFunction(nativeCallback, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'int32']);
    try {
        Interceptor.attach(moduleBaseAddress.add(wxOffsets.hookMsg.WX_RECV_MSG_HOOK_OFFSET), {
            onEnter: function (args) {
                try {
                    // 参数打印
                    // console.log("doAddMsg called with args: " + args[0] + ", " + args[1] + ", " + args[2]);
                    // 调用处理函数
                    var msg = HandleSyncMsg(args[0], args[1], args[2]);
                    // console.log("msg: " + JSON.stringify(msg, null, 2));
                    var room = '';
                    var talkerId = '';
                    var content = '';
                    var signature = msg.signature;
                    var msgType_1 = msg.type;
                    if (msg.fromUser.indexOf('@') !== -1) {
                        room = msg.fromUser;
                    }
                    else if (msg.toUser.indexOf('@') !== -1) {
                        room = msg.toUser;
                    }
                    if (room) {
                        var contentArr = msg.content.split(':\n');
                        // console.log('contentArr:', contentArr)
                        if (contentArr.length > 1) {
                            talkerId = contentArr[0];
                            content = msg.content.replace("".concat(contentArr[0], ":\n"), '');
                        }
                        else {
                            content = msg.content;
                        }
                    }
                    else {
                        talkerId = msg.fromUser;
                        content = msg.content;
                    }
                    var myContentPtr_1 = Memory.alloc(content.length * 2 + 1);
                    myContentPtr_1.writeUtf16String(content);
                    var myTalkerIdPtr_1 = Memory.alloc(talkerId.length * 2 + 1);
                    myTalkerIdPtr_1.writeUtf16String(talkerId);
                    var myGroupMsgSenderIdPtr_1 = Memory.alloc(room.length * 2 + 1);
                    myGroupMsgSenderIdPtr_1.writeUtf16String(room);
                    var myXmlContentPtr_1 = Memory.alloc(signature.length * 2 + 1);
                    myXmlContentPtr_1.writeUtf16String(signature);
                    var isMyMsg_1 = 0;
                    var newMsg = {
                        msgType: msgType_1,
                        talkerId: talkerId,
                        content: content,
                        room: room,
                        signature: signature,
                        isMyMsg: isMyMsg_1
                    };
                    console.log('回调消息:', JSON.stringify(newMsg));
                    setImmediate(function () { return nativeativeFunction(msgType_1, myTalkerIdPtr_1, myContentPtr_1, myGroupMsgSenderIdPtr_1, myXmlContentPtr_1, isMyMsg_1); });
                }
                catch (e) {
                    console.error('接收消息回调失败：', e);
                    // throw new Error(e)
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
rpc.exports = {
    sendMsgNativeFunction: function (contactId, text) {
        return sendMsgNativeFunction(contactId, text);
    },
    getMyselfInfoFunction: function () {
        return getMyselfInfoFunction();
    }
};
