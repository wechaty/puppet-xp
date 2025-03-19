var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * WeChat 3.9.10.27
 *
 */
var _this = this;
/* -----------------base------------------------- */
var retidPtr = null;
var retidStruct = null;
var initidStruct = (function (str) {
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
});
var retPtr = null;
var retStruct = null;
var initStruct = (function (str) {
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
});
var msgstrPtr = null;
var msgStruct = null;
var initmsgStruct = function (str) {
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
var atStruct = null;
var initAtMsgStruct = function (wxidStruct) {
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
var readString = function (address) {
    return readStringPtr(address).readUtf8String();
};
var readWideString = function (address) {
    return readWStringPtr(address).readUtf16String();
};
var writeWStringPtr = function (str) {
    // console.log(`输入字符串内容: ${str}`);
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
            // console.log(`读取字符串内容: ${content}`);
            return content;
        }
    };
};
//   string GetStringByStrAddr(UINT64 addr)
// {
//     size_t strLength = GET_DWORD(addr + 8);
//     return strLength ? string(GET_STRING(addr), strLength) : string();
// }
var getStringByStrAddr = function (addr) {
    var strLength = addr.add(8).readU32();
    // console.log('strLength:', strLength)
    return strLength ? addr.readPointer().readUtf16String(strLength) : '';
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
    console.log("addr: " + addr);
    var inner_string = ptr(addr.add(0x8)).readS64();
    console.log("inner_string: " + inner_string);
    // if (inner_string.isNull()) return "";
    return ReadWeChatStr(inner_string);
}
var findIamgePathAddr = function (param2) {
    var len = 0x180;
    console.log('param2:', param2);
    console.log('len:', len);
    var path = '';
    var isPath = false;
    for (var i = 0; i < len; i++) {
        var offset = (i + 1) + 0x280 * 0;
        console.log('offset:', offset);
        try {
            path = ReadSKBuiltinString(param2.add(offset).readS64()); // 发送者
            isPath = hasPath(path);
            if (isPath) {
                console.log('ReadSKBuiltinString offset:', offset);
                console.log('path:', path);
                break;
            }
        }
        catch (error) {
            // console.error('error:', error)
        }
        try {
            path = ReadWeChatStr(param2.add(offset).readS64()); // 消息签名
            isPath = hasPath(path);
            if (isPath) {
                console.log('ReadWeChatStr offset:', offset);
                console.log('path:', path);
                break;
            }
        }
        catch (error) {
            // console.error('error:', error)
        }
    }
};
var hasPath = function (path) {
    // return path.indexOf('Thumb') !== -1
    if (path && path.length > 0) {
        console.log('path is :', path);
    }
    return false;
};
// 接收消息
function uint8ArrayToString(arr) {
    var utf8 = Array.from(arr).map(function (byte) { return String.fromCharCode(byte); }).join('');
    return decodeURIComponent(escape(utf8));
}
// 将字符串转换为 Uint8Array
function stringToUint8Array(str) {
    var utf8 = unescape(encodeURIComponent(str));
    var arr = new Uint8Array(utf8.length);
    for (var i = 0; i < utf8.length; i++) {
        arr[i] = utf8.charCodeAt(i);
    }
    return arr;
}
// 读取流数据
var readAll = function (input) { return __awaiter(_this, void 0, void 0, function () {
    var chunks, size, chunk, i, isEnd, receivedData, message, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                chunks = [];
                size = 1024;
                i = 0;
                isEnd = false;
                _a.label = 1;
            case 1:
                if (!!isEnd) return [3 /*break*/, 6];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, input.read(size)
                    // console.log('chunk:', chunk);
                    // console.log('chunk.byteLength:', chunk.byteLength);
                    // 示例接收数据
                ];
            case 3:
                chunk = _a.sent();
                receivedData = new Uint8Array(chunk);
                message = uint8ArrayToString(receivedData);
                chunks.push(message);
                if (chunk.byteLength < size) {
                    isEnd = true;
                    return [3 /*break*/, 6];
                }
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error('Failed to read chunk:', error_1);
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 1];
            case 6: return [2 /*return*/, chunks.join('')];
        }
    });
}); };
/*
偏移地址
*/
var offsets = {
    // kDoAddMsg: 0x23D2B10, // done
    kDoAddMsg: 0x2205510,
    kGetAccountServiceMgr: 0x1C1FE90,
    kSyncMsg: 0xc39680,
    kSyncMsgNext: 0xc39680,
    kGetSendMessageMgr: 0x1C1E690,
    kSendTextMsg: 0x238DDD0,
    kFreeChatMsg: 0x1C1FF10,
    // const uint64_t kGetContactMgr = 0x1C0BDE0;
    kGetContactMgr: 0x1C0BDE0,
    // const uint64_t kSearchContactMgr = 0x2065F80;
    kSearchContactMgr: 0x2065F80,
    // const uint64_t kChatRoomMgr = 0x1C4E200;
    kChatRoomMgr: 0x1C4E200,
    // const uint64_t kOpLogMgr = 0x1C193C0;
    kOpLogMgr: 0x1C193C0,
    // const uint64_t kSnsTimeLineMgr = 0x2E6B110;
    kSnsTimeLineMgr: 0x2E6B110,
    // const uint64_t kCDNServicecs = 0x1CAE4E0;
    kCDNServicecs: 0x1CAE4E0,
    // const uint64_t kAccountServiceMgr = 0x1C1FE90;
    kAccountServiceMgr: 0x1C1FE90,
    // const uint64_t kGetAppDataSavePath = 0x26A7780;
    kGetAppDataSavePath: 0x26A7780,
    // const uint64_t kGetCurrentDataPath = 0x2314E40;
    kGetCurrentDataPath: 0x2314E40,
    // const uint64_t kNewContact = 0x25E3650;
    kNewContact: 0x25E3650,
    // const uint64_t kFreeContact = 0x25E3D00;
    kFreeContact: 0x25E3D00,
    // const uint64_t kGetContact = 0x225F950;
    kGetContact: 0x225F950,
    // const uint64_t kDelContact = 0x2263490;
    kDelContact: 0x2263490,
    // const uint64_t kGetContactList = 0x2265540;
    kGetContactList: 0x2265540,
    // const uint64_t kRemarkContact = 0x22550D0;
    kRemarkContact: 0x22550D0,
    // const uint64_t kBlackContact = 0x2255310;
    kBlackContact: 0x2255310,
    // const uint64_t kGetContactCardContent = 0x2200BB0;
    kGetContactCardContent: 0x2200BB0,
    // const uint64_t kVerifyUser = 0x225C340;								// ContactMgr::doVerifyUser 
    kVerifyUser: 0x225C340,
    // const uint64_t kStartSearchFromScene = 0x2370010;					//SearchContactMgr::StartSearchFromScene
    kStartSearchFromScene: 0x2370010,
    // const uint64_t kNetSceneGetContact = 0x225D060;						//new NetSceneBatchGetContact (id:%d)
    kNetSceneGetContact: 0x225D060,
    // const uint64_t kNetSceneGetContactLabelList = 0x2245F00;            //NetSceneGetContactLabelList::NetSceneGetContactLabelList
    // const uint64_t kSceneCenter = 0x1CDD710;
    // const uint64_t kSceneNetSceneBase = 0x2454EB0;
    // const uint64_t kNewContactLabelIdStruct = 0x2189150;
    // const uint64_t kNetSceneAddContactLabel = 0x245BE40;                //NetSceneAddContactLabel::NetSceneAddContactLabel
    // const uint64_t kNetSceneDelContactLabel = 0x248F410;      
    // const uint64_t kNetSceneModifyContactLabel = 0x250C480;
    // const uint64_t kSendMessageMgr = 0x1C1E690;
    // const uint64_t kAppMsgMgr = 0x1C23630;
    // const uint64_t kSendTextMsg = 0x238DDD0;
    // const uint64_t kSendImageMsg = 0x2383560;
    kSendImageMsg: 0x2383560,
    // const uint64_t kSendFileMsg = 0x21969E0;
    // const uint64_t kSendPatMsg = 0x2D669B0;
    kSendPatMsg: 0x2D669B0,
    // const uint64_t kFreeChatMsg = 0x1C1FF10;
    // const uint64_t kNewChatMsg = 0x1C28800;
    kNewChatMsg: 0x1C28800
};
var moduleBaseAddress = Module.getBaseAddress('WeChatWin.dll');
var selfInfo = {};
/*---------------------ContactSelf---------------------*/
/*
获取登录二维码
*/
function contactSelfQRCode() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
/*
获取自己的信息 3.9.10.27
*/
var contactSelfInfo = function () {
    var success = -1;
    var out = {};
    // 确定相关函数的地址
    var accountServiceAddr = moduleBaseAddress.add(offsets.kGetAccountServiceMgr);
    var getAppDataSavePathAddr = moduleBaseAddress.add(offsets.kGetAppDataSavePath);
    var getCurrentDataPathAddr = moduleBaseAddress.add(offsets.kGetCurrentDataPath);
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
        if (serviceAddr.add(0x148).readU32() === 0 || serviceAddr.add(0x148 + 0x10).readU32() === 0) {
            out.signature = '';
        }
        else {
            if (serviceAddr.add(0x148 + 0x18).readU32() === 0xF) {
                out.signature = serviceAddr.add(0x148).readUtf8String(serviceAddr.add(0x148 + 0x10).readU32());
            }
            else {
                out.signature = serviceAddr.add(0x148).readPointer().readUtf8String(serviceAddr.add(0x148 + 0x10).readU32());
            }
        }
        if (serviceAddr.add(0x168).readU32() === 0 || serviceAddr.add(0x168 + 0x10).readU32() === 0) {
        }
        else {
            if (serviceAddr.add(0x168 + 0x18).readU32() === 0xF) {
                out.country = serviceAddr.add(0x168).readUtf8String(serviceAddr.add(0x168 + 0x10).readU32());
            }
            else {
                out.country = serviceAddr.add(0x168).readPointer().readUtf8String(serviceAddr.add(0x168 + 0x10).readU32());
            }
        }
        if (serviceAddr.add(0x188).readU32() === 0 || serviceAddr.add(0x188 + 0x10).readU32() === 0) {
            out.province = '';
        }
        else {
            if (serviceAddr.add(0x188 + 0x18).readU32() === 0xF) {
                out.province = serviceAddr.add(0x188).readUtf8String(serviceAddr.add(0x188 + 0x10).readU32());
            }
            else {
                out.province = serviceAddr.add(0x188).readPointer().readUtf8String(serviceAddr.add(0x188 + 0x10).readU32());
            }
        }
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
        if (serviceAddr.add(0x450).readU32() === 0 || serviceAddr.add(0x450 + 0x10).readU32() === 0) {
            out.head_img = '';
        }
        else {
            out.head_img = serviceAddr.add(0x450).readPointer().readUtf8String(serviceAddr.add(0x450 + 0x10).readU32());
        }
        if (serviceAddr.add(0x7B8).readU32() === 0 || serviceAddr.add(0x7B8 + 0x10).readU32() === 0) {
            out.public_key = '';
        }
        else {
            out.public_key = serviceAddr.add(0x7B8).readPointer().readUtf8String(serviceAddr.add(0x7B8 + 0x10).readU32());
        }
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
        gender: 1,
        type: out.type,
        name: out.name,
        coworker: true,
        avatar: out.head_img,
        address: '',
        alias: '',
        city: out.city,
        province: out.province,
        weixin: out.account,
        corporation: '',
        title: '',
        description: '',
        phone: [out.mobile]
    };
    return myself;
};
selfInfo = contactSelfInfo();
// console.log('call contactSelfInfo res:\n', JSON.stringify(contactSelfInfo(), null, 2))
/*---------------------Contact---------------------*/
/*
获取联系人列表 3.9.10.27
*/
var contactList = function () {
    // 使用NativeFunction调用相关函数
    var getContactMgrInstance = new NativeFunction(moduleBaseAddress.add(offsets.kGetContactMgr), 'pointer', []);
    var getContactListFunction = new NativeFunction(moduleBaseAddress.add(offsets.kGetContactList), 'int64', ['pointer', 'pointer']);
    // 获取联系人管理器的实例
    var contactMgrInstance = getContactMgrInstance();
    // 准备用于存储联系人信息的数组
    var contacts = [];
    var contactVecPlaceholder = Memory.alloc(Process.pointerSize * 3);
    contactVecPlaceholder.writePointer(ptr(0)); // 初始化指针数组
    var success = getContactListFunction(contactMgrInstance, contactVecPlaceholder);
    var contactVecPtr = contactVecPlaceholder.readU32();
    // 解析联系人信息
    if (success) {
        var contactPtr = contactVecPlaceholder;
        var start = contactPtr.readPointer();
        var end = contactPtr.add(Process.pointerSize * 2).readPointer();
        var CONTACT_SIZE = 0x6A8; // 假设每个联系人数据结构的大小
        while (start.compare(end) < 0) {
            try {
                // console.log('start:', start)
                var contact = parseContact(start);
                // console.log('contact:', JSON.stringify(contact, null, 2))
                if (contact.id && (!contact.id.endsWith('chatroom'))) {
                    contacts.push(contact);
                }
            }
            catch (error) {
                console.log('contactList() error:', error);
            }
            start = start.add(CONTACT_SIZE);
        }
    }
    return contacts;
};
// console.log('call contactList() res:\n', JSON.stringify(contactList().length))
// 解析联系人信息，信息不准确
function parseContact(start) {
    // console.log('contactPtr:', contactPtr)
    /* Get Contacts:
    call1, call2, wxId, Code, Remark,Name, Gender, Country, Province, City*/
    // { 0x75A4A0, 0xC089F0, 0x10, 0x24, 0x58, 0x6C, 0x0E, 0x00, 0x00, 0x00 },
    var temp = {
        wxid: readWideString(start.add(0x10)),
        custom_account: readWideString(start.add(0x30)),
        encrypt_name: readWideString(start.add(0x50)),
        remark: readWideString(start.add(0x80)),
        remark_pinyin: readWideString(start.add(0x148)),
        remark_pinyin_all: readWideString(start.add(0x168)),
        label_ids: readWideString(start.add(0xc0)),
        nickname: readWideString(start.add(0xA0)),
        pinyin: readWideString(start.add(0x108)),
        pinyin_all: readWideString(start.add(0x128)),
        verify_flag: start.add(0x70).readS32(),
        type: start.add(0x74).readS32(),
        reserved1: start.add(0x1F0).readS32(),
        reserved2: start.add(0x1F4).readS32()
    };
    // console.log('temp:', JSON.stringify(temp, null, 2))
    var info = {};
    /*
    // mmString   UserName;			//0x10  + 0x20
    info.UserName = start.add(0x10 + 0x20).readPointer().readUtf16String();
    // mmString   Alias;				//0x30  + 0x20
    info.Alias = start.add(0x30 + 0x20).readPointer().readUtf16String();
    // mmString   EncryptUserName;		//0x50  + 0x20
    // const EncryptUserName = start.add(0x50 + 0x20).readPointer().readUtf16String();
    // console.log('EncryptUserName:', EncryptUserName)
    // int32_t	   DelFlag;				//0x70  + 0x4
    info.DelFlag = start.add(0x70).readU32();
    // int32_t    Type;				//0x74  + 0x4
    info.Type = start.add(0x74 + 0x4).readU32();
    // int32_t    VerifyFlag;			//0x78  + 0x4
    // int32_t	   _0x7C;				//0x7C  + 0x4
    // mmString   Remark;				//0x80  + 0x20
    info.Remark = start.add(0x80 + 0x20).readPointer().readUtf16String();
    // mmString   NickName;			//0xA0  + 0x20
    info.NickName = start.add(0xA0 + 0x20).readPointer().readUtf16String();
    // mmString   LabelIDList;			//0xC0  + 0x20
    info.LabelIDList = start.add(0xC0 + 0x20).readPointer().readUtf16String();
    // mmString   DomainList;			//0xE0  + 0x20
    // int64_t    ChatRoomType;		//0x100 + 0x8
    info.ChatRoomType = start.add(0x100).readPointer().readUtf16String();
    // mmString   PYInitial;			//0x108 + 0x20
    info.PYInitial = start.add(0x108 + 0x20).readPointer().readUtf16String();
    // mmString   QuanPin;				//0x128 + 0x20
    info.QuanPin = start.add(0x128 + 0x20).readPointer().readUtf16String();
    // mmString   RemarkPYInitial;		//0x148 + 0x20
    // mmString   RemarkQuanPin;		//0x168 + 0x20
    // mmString   BigHeadImgUrl;		//0x188 + 0x20
    info.BigHeadImgUrl = start.add(0x188 + 0x20).readPointer().readUtf16String();
    // mmString   SmallHeadImgUrl;		//0x1A8 + 0x20
    info.SmallHeadImgUrl = start.add(0x1A8 + 0x20).readPointer().readUtf16String();
    // mmString   _HeadImgMd5;			//0x1C8 + 0x20 //�����ʽ��һ����Ҫ���� ֻռλ
  
    // //int64_t  ChatRoomNotify;      //0x1E8
    info.ChatRoomNotify = start.add(0x1E8).readPointer().readUtf16String();
    // char       _0x1E8[24];			//0x1E8 + 0x18
    // mmString   ExtraBuf;			//0x200 + 0x20
    info.ExtraBuf = start.add(0x200 + 0x20).readPointer().readUtf16String();
  
    // int32_t    ImgFlag;			   //0x220 + 0x4
    info.ImgFlag = start.add(0x220).readU32();
    // int32_t    Sex;				   //0x224 + 0x4
    info.Sex = start.add(0x224).readU32();
    // int32_t    ContactType;		   //0x228 + 0x4
    info.ContactType = start.add(0x228).readU32();
    // int32_t   _0x22C;			   //0x22c + 0x4
  
    // mmString  Weibo;				//0x230 + 0x20
    // int32_t   WeiboFlag;			//0x250 + 0x4
    // int32_t   _0x254;				//0x254 + 0x4
  
    // mmString  WeiboNickname;		//0x258 + 0x20
    info.WeiboNickname = start.add(0x258 + 0x20).readPointer().readUtf16String();
  
    // int32_t  PersonalCard;		   //0x278 + 0x4
    // int32_t  _0x27C;			   //0x27c + 0x4
  
    // mmString  Signature;		  //0x280 + 0x20
    // mmString  Country;			  //0x2A0 + 0x20
    info.Country = start.add(0x2A0 + 0x20).readPointer().readUtf16String();
  
    // std::vector<mmString>  PhoneNumberList; //0x2C0 + 0x18
  
    // mmString  Province;				//0x2D8 + 0x20
    info.Province = start.add(0x2D8 + 0x20).readPointer().readUtf16String();
    // mmString  City;					//0x2F8 + 0x20
    info.City = start.add(0x2F8 + 0x20).readPointer().readUtf16String();
    // int32_t   Source;				//0x318 + 0x4
    info.Source = start.add(0x318).readU32();
    // int32_t   _0x31C;				//0x31C + 0x4
  
    // mmString  VerifyInfo;			//0x320 + 0x20
    // mmString  RemarkDesc;		   //0x340 + 0x20
    // mmString  RemarkImgUrl;		   //0x360 + 0x20
  
    // int32_t   BitMask;			  //0x380 + 0x4
    // int32_t   BitVal;			  //0x384 + 0x4
    // int32_t   AddContactScene;	  //0x388 + 0x4
    // int32_t   HasWeiXinHdHeadImg; //0x38c + 0x4
    // int32_t   Level;			  //0x390 + 0x4
    // int32_t   _0x394;			  //0x394 + 0x4
  
    // mmString  VerifyContent;      //0x398 + 0x20
    info.VerifyContent = start.add(0x398 + 0x20).readPointer().readUtf16String();
    // int32_t  AlbumStyle;	      //0x3B8 + 0x4
    // int32_t  AlbumFlag;			  //0x3BC + 0x4
    // mmString AlbumBGImgID;		  //0x3C0 + 0x20
  
    // int64_t  _0x3E0;			 //0x3E0 + 0x8
  
    // int32_t  SnsFlag;			//0x3E8	+ 0x4
    // int32_t  _0x3EC;			//0x3EC + 0x4
  
    // mmString  SnsBGImgID;		//0x3F0 + 0x20
  
    // int64_t  SnsBGObjectID;		//0x410 + 0x8
  
    // int32_t  SnsFlagEx;			//0x418 + 0x4
    // int32_t  _0x41C;			//0x41C + 0x4
  
    // mmString IDCardNum;			//0x420 + 0x20
    info.IDCardNum = start.add(0x420 + 0x20).readPointer().readUtf16String();
    // mmString RealName;			//0x440 + 0x20
    info.RealName = start.add(0x440 + 0x20).readPointer().readUtf16String();
  
    // mmString MobileHash;		//0x460 + 0x20
    // mmString MobileFullHash;    //0x480 + 0x20
  
    // mmString ExtInfo;			//0x4A0 + 0x20
    info.ExtInfo = start.add(0x4A0 + 0x20).readPointer().readUtf16String();
    // mmString _0x4C0;		    //0x4C0 + 0x20
  
    // mmString CardImgUrl;	    //0x4EO + 0x20
    info.CardImgUrl = start.add(0x4E0 + 0x20).readPointer().readUtf16String();
    // char _res[0x1A8];           //0x500 +
  
    // console.log('contact info:', JSON.stringify(info, null, 2))
  
    */
    var contact = {
        id: temp.wxid,
        gender: 1,
        type: temp.type,
        name: temp.nickname,
        friend: true,
        star: false,
        coworker: temp.wxid.indexOf('@openim') > -1,
        avatar: info.SmallHeadImgUrl,
        address: info.Province + info.City,
        alias: info.Alias,
        city: info.City,
        province: info.Province,
        weixin: temp.custom_account,
        corporation: '',
        title: '',
        description: '',
        phone: []
    };
    return contact;
}
/*
获取联系人详情
*/
function contactRawPayload(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
/*---------------------Room---------------------*/
/*
获取群列表
*/
function roomList() {
    // 使用NativeFunction调用相关函数
    var getContactMgrInstance = new NativeFunction(moduleBaseAddress.add(offsets.kGetContactMgr), 'pointer', []);
    var getContactListFunction = new NativeFunction(moduleBaseAddress.add(offsets.kGetContactList), 'int64', ['pointer', 'pointer']);
    // 获取联系人管理器的实例
    var contactMgrInstance = getContactMgrInstance();
    // 准备用于存储联系人信息的数组
    var contacts = [];
    var contactVecPlaceholder = Memory.alloc(Process.pointerSize * 3);
    contactVecPlaceholder.writePointer(ptr(0)); // 初始化指针数组
    var success = getContactListFunction(contactMgrInstance, contactVecPlaceholder);
    var contactVecPtr = contactVecPlaceholder.readU32();
    // 解析联系人信息
    if (success) {
        var contactPtr = contactVecPlaceholder;
        var start = contactPtr.readPointer();
        var end = contactPtr.add(Process.pointerSize * 2).readPointer();
        var CONTACT_SIZE = 0x6A8; // 假设每个联系人数据结构的大小
        while (start.compare(end) < 0) {
            try {
                // console.log('start:', start)
                var contact = parseContact(start);
                // console.log('contact:', JSON.stringify(contact, null, 2))
                if (contact.id && (contact.id.endsWith('chatroom'))) {
                    contacts.push(contact);
                }
            }
            catch (error) {
                console.log('contactList() error:', error);
            }
            start = start.add(CONTACT_SIZE);
        }
    }
    return contacts;
}
;
// console.log('call roomList() res:\n', JSON.stringify(roomList().length))
/*
解散群
*/
function roomDel(roomId, contactId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, roomId];
        });
    });
}
/*
获取群头像
*/
function roomAvatar(roomId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, ''];
        });
    });
}
/*
加入群
*/
function roomAdd(roomId, contactId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
/*
设置群名称
*/
function roomTopic(roomId, topic) {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
/*
创建群
*/
function roomCreate(contactIdList, topic) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, 'mock_room_id'];
        });
    });
}
/*
退出群
*/
function roomQuit(roomId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
/*
获取群二维码
*/
function roomQRCode(roomId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, roomId + ' mock qrcode'];
        });
    });
}
/*
获取群成员列表
*/
function roomMemberList(roomId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
/*---------------------Room Invitation---------------------*/
/*
接受群邀请
*/
function roomInvitationAccept(roomInvitationId) {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
/*
获取群邀请
*/
function roomInvitationRawPayload(roomInvitationId) {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
/*---------------------Friendship---------------------*/
/*
获取好友请求
*/
function friendshipRawPayload(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, { id: id }];
        });
    });
}
/*
手机号搜索好友
*/
function friendshipSearchPhone(phone) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, null];
        });
    });
}
/*
微信号搜索好友
*/
function friendshipSearchWeixin(weixin) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, null];
        });
    });
}
/*
发送好友请求
*/
function friendshipAdd(contactId, hello) {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
/*
接受好友请求
*/
function friendshipAccept(friendshipId) {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
/*---------------------Tag---------------------*/
/*
联系人标签添加
*/
function tagContactAdd(tagId, contactId) {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
/*
联系人标签移除
*/
function tagContactRemove(tagId, contactId) {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
/*
联系人标签删除
*/
function tagContactDelete(tagId) {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
/*
联系人标签列表
*/
function tagContactList(contactId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, []];
        });
    });
}
/*
获取群成员详情
*/
function roomMemberRawPayload(roomId, contactId) {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
/*
设置群公告
*/
function roomAnnounce(roomId, text) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (text) {
                return [2 /*return*/];
            }
            return [2 /*return*/, 'mock announcement for ' + roomId];
        });
    });
}
/*---------------------Message---------------------*/
/*
发送文本消息 3.9.10.27
*/
var messageSendText = function (contactId, text) {
    var to_user = null;
    var text_msg = null;
    to_user = writeWStringPtr(contactId);
    text_msg = writeWStringPtr(text);
    var send_message_mgr_addr = moduleBaseAddress.add(offsets.kGetSendMessageMgr);
    var send_text_msg_addr = moduleBaseAddress.add(offsets.kSendTextMsg);
    var free_chat_msg_addr = moduleBaseAddress.add(offsets.kFreeChatMsg);
    var chat_msg = Memory.alloc(0x460 * Process.pointerSize); // 在frida中分配0x460字节的内存
    chat_msg.writeByteArray(Array(0x460 * Process.pointerSize).fill(0)); // 清零分配的内存
    var temp = Memory.alloc(3 * Process.pointerSize); // 分配临时数组内存
    temp.writeByteArray(Array(3 * Process.pointerSize).fill(0)); // 初始化数组
    // 定义函数原型并实例化 NativeFunction 对象
    var mgr = new NativeFunction(send_message_mgr_addr, 'void', []);
    var send = new NativeFunction(send_text_msg_addr, 'uint64', ['pointer', 'pointer', 'pointer', 'pointer', 'int64', 'int64', 'int64', 'int64']);
    var free = new NativeFunction(free_chat_msg_addr, 'void', ['pointer']);
    // 调用发送消息管理器初始化
    mgr();
    // 发送文本消息 
    var success = send(chat_msg, to_user, text_msg, temp, 1, 1, 0, 0);
    console.log('sendText success:', success);
    // 释放ChatMsg内存
    free(chat_msg);
    return Number(success) > 0 ? 1 : 0; // 与C++代码保持一致，这里返回0（虽然在C++中这里应该是成功与否的指示符）
};
// messageSendText('filehelper', 'hello world')
/*
发送图片消息
*/
function messageSendFile(conversationId, file) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
/*
发送联系人名片
*/
function messageSendContact(conversationId, contactId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
/*
发送链接消息
*/
function messageSendUrl(conversationId, urlLinkPayload) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
/*
发送小程序消息
*/
function messageSendMiniProgram(conversationId, miniProgramPayload) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
/*
发送位置消息
*/
function messageSendLocation(conversationId, locationPayload) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
/*
转发消息
*/
function messageForward(conversationId, messageId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
/*
拍一拍消息
*/
var sendPatMsg = function (roomId, contactId) {
    // 定义一个NativeFunction来代表 SendPatMsg 函数
    var SendPatMsg = new NativeFunction(moduleBaseAddress.add(offsets.kSendPatMsg), 'int64', // 假设返回类型为int64
    ['pointer', 'pointer', 'int64']);
    // 现在，我们需要一种方式来创建WeChatWString类的实例并将其传递给SendPatMsg。
    // 这里的createWeChatWString函数是一个假设函数，需要你根据WeChatWString的实际内存结构来实现。
    var roomIdStrPointer = writeWStringPtr(roomId);
    var wxidStrPointer = writeWStringPtr(contactId);
    var arg3 = Memory.alloc(0x8);
    arg3.writeU64(0x0);
    try {
        // 调用 SendPatMsg 函数
        var result = SendPatMsg(roomIdStrPointer, wxidStrPointer, 0);
        console.log("SendPatMsg 调用结果: ", result);
    }
    catch (e) {
        console.error("SendPatMsg 调用失败: ", e);
    }
};
// sendPatMsg('21341182572@chatroom', 'tyutluyc')
// 调试：监听函数调用
Interceptor.attach(moduleBaseAddress.add(offsets.kSendPatMsg), {
    onEnter: function (args) {
        try {
            // 参数打印
            console.log("sendImageMsg called with args: " + args[0] + ", " + args[1] + ", " + args[2] + ", " + args[3] + ", " + args[4] + ", " + args[5] + ", " + args[6] + ", " + args[7]);
            console.log('sendImageMsg roomId:', readWStringPtr(args[0]).readUtf16String());
            console.log('sendImageMsg contactId:', readWStringPtr(args[1]).readUtf16String());
            console.log('sendImageMsg arg2:', args[2].readS32());
            console.log('sendImageMsg arg3:', args[3].readUtf16String());
            console.log('sendImageMsg arg4:', args[4].readS32());
            console.log('sendImageMsg arg5:', args[5]);
            console.log('sendImageMsg arg6:', args[6]);
            console.log('sendImageMsg arg7:', args[7]);
        }
        catch (e) {
            console.error('接收消息回调失败：', e);
            throw new Error(e);
        }
    }
});
/*---------------------Hook---------------------*/
/*
接收消息回调 3.9.10.27
*/
var recvMsgNativeCallback = (function () {
    var nativeCallback = new NativeCallback(function () { }, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'int32']);
    var nativeativeFunction = new NativeFunction(nativeCallback, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'int32']);
    try {
        Interceptor.attach(moduleBaseAddress.add(offsets.kDoAddMsg), {
            onEnter: function (args) {
                try {
                    // 参数打印
                    // console.log("doAddMsg called with args: " + args[0] + ", " + args[1] + ", " + args[2]);
                    // 调用处理函数
                    var msg = HandleSyncMsg(args[0], args[1], args[2]);
                    // console.log("msg: " + JSON.stringify(msg, null, 2));
                    var room = '';
                    var talkerId = '';
                    var listenerId = '';
                    var text = msg.content;
                    var signature = msg.signature;
                    var msgType_1 = msg.type;
                    var isSelf = msg.isSelf;
                    var filename = '';
                    if (msg.fromUser.indexOf('@') !== -1) {
                        room = msg.fromUser;
                    }
                    else if (msg.toUser && msg.toUser.indexOf('@') !== -1) {
                        room = msg.toUser;
                        talkerId = msg.fromUser;
                    }
                    if (room && msg.toUser) {
                        talkerId = msg.toUser;
                    }
                    else if (room && !msg.toUser) {
                        talkerId = '';
                    }
                    else {
                        if (msg.isSelf) {
                            talkerId = '';
                            listenerId = msg.fromUser;
                        }
                        else {
                            talkerId = msg.fromUser;
                        }
                    }
                    if (msgType_1 === 3) {
                        filename = JSON.parse(msg.content)[0];
                    }
                    if (msgType_1 === 49) {
                        var content = msg.content;
                        // <title>example_upsert.json</title>\n        <des></des>\n        <action>view</action>\n        <type>6</type>\n   
                        // 使用正则提取出文件名和type
                        var subType = content.match(/<type>(\d+)<\/type>/);
                        if (subType && subType[1] === '6') {
                            var filenames = content.match(/<title>(.*)<\/title>/);
                            if (filenames) {
                                var curTime = new Date();
                                filename = "".concat(selfInfo.id, "\\FileStorage\\File\\").concat(curTime.getFullYear(), "-").concat(curTime.getMonth() < 9 ? '0' : '').concat(curTime.getMonth() + 1, "\\").concat(filenames[1]);
                                console.log('filename:', filename);
                            }
                        }
                    }
                    var message = {
                        id: msg.msgId,
                        filename: filename,
                        text: text,
                        timestamp: msg.createTime,
                        type: msgType_1,
                        talkerId: talkerId,
                        roomId: room,
                        mentionIds: [],
                        listenerId: listenerId,
                        isSelf: isSelf
                    };
                    // console.log('message:', JSON.stringify(message, null, 2))
                    // send(message)
                    var myContentPtr_1 = Memory.alloc(text.length * 2 + 1);
                    myContentPtr_1.writeUtf16String(text);
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
                        text: text,
                        room: room,
                        signature: signature,
                        isMyMsg: isMyMsg_1
                    };
                    // console.log('agent 回调消息:', JSON.stringify(newMsg))
                    setImmediate(function () { return nativeativeFunction(msgType_1, myTalkerIdPtr_1, myContentPtr_1, myGroupMsgSenderIdPtr_1, myXmlContentPtr_1, isMyMsg_1); });
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
function HandleSyncMsg(param1, param2, param3) {
    // console.log("HandleSyncMsg called with param2: " + param2);
    // findIamgePathAddr(param2)
    /* Receive Message:
        Hook,  call, msgId, type, isSelf, ts, roomId, content, wxid, sign, thumb, extra, msgXml */
    // { 0x00, 0x2205510, 0x30, 0x38, 0x3C, 0x44, 0x48, 0x88, 0x240, 0x260, 0x280, 0x2A0, 0x308 },
    var msg = {
        fromUser: '',
        toUser: '',
        content: '',
        signature: '',
        msgId: '',
        msgSequence: 0,
        createTime: 0,
        displayFullContent: '',
        type: 0,
        isSelf: false
    };
    msg.msgId = param2.add(0x30).readS64(); // 消息ID
    // console.log("msg.msgId: " + msg.msgId);
    msg.type = param2.add(0x38).readS32(); // 消息类型
    // console.log("msg.type: " + msg.type);
    msg.isSelf = param2.add(0x3C).readS32() === 1; // 是否自己发送的消息
    // console.log("msg.isSelf: " + msg.isSelf);
    msg.createTime = param2.add(0x44).readS32(); // 创建时间
    // console.log("msg.createTime: " + msg.createTime);
    msg.content = readWideString(param2.add(0x88)); // 消息内容
    // console.log("msg.content: " + msg.content);
    msg.toUser = readWideString(param2.add(0x240)); // 消息签名
    // console.log("msg.toUser: " + msg.toUser);
    msg.fromUser = readWideString(param2.add(0x48)); // 发送者
    // console.log("msg.fromUser: " + msg.fromUser);
    msg.signature = ReadWeChatStr(param2.add(0x260)); // 消息签名
    // console.log("msg.signature: " + msg.signature);
    var msgXml = getStringByStrAddr(param2.add(0x308)); // 消息签名
    // console.log("msg.msgXml: " + msgXml);
    // 根据消息类型处理图片消息
    if (msg['type'] == 3) {
        var thumb = getStringByStrAddr(param2.add(0x280)); // 消息签名
        // console.log("msg.thumb: " + thumb);
        var extra = getStringByStrAddr(param2.add(0x2A0)); // 消息签名
        // console.log("msg.extra: " + extra);
        // const img = ReadSKBuiltinBuffer(param2.add(0x40).readS64()); // 读取图片数据
        // console.log("img: " + img);
        // msg.base64Img = img; // 将图片数据编码为Base64字符串
        // findIamgePathAddr(param2)
        msg.base64Img = '';
        msg.content = JSON.stringify([
            thumb,
            thumb,
            extra,
            extra, //  PUPPET.types.Image.Artwork
        ]);
    }
    // console.log("HandleSyncMsg msg: " + JSON.stringify(msg, null, 2));
    return msg;
}
/*---------------------send&recv---------------------*/
function onMessage(message) {
    console.log("agent onMessage:", JSON.stringify(message, null, 2));
}
recv(onMessage);
rpc.exports = {
    callFunction: function (contactId, text) {
        return messageSendText(contactId, text);
    }
};
