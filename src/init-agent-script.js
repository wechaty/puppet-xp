(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.puppetXp = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
// interface typeOffset {
//   [key: string]: number | any
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggedIn = exports.chatroomMemberList = exports.chatroomNodeList = exports.contactList = exports.nodeList = exports.currentVersion = exports.moduleLoad = exports.moduleBaseAddress = exports.availableVersion = exports.offset = void 0;
// }
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
exports.offset = offset;
//3.3.0.115
/*------------------global-------------------------------------------*/
const availableVersion = 1661141107; ////3.3.0.115
exports.availableVersion = availableVersion;
const moduleBaseAddress = Module.getBaseAddress('WeChatWin.dll');
exports.moduleBaseAddress = moduleBaseAddress;
const moduleLoad = Module.load('WeChatWin.dll');
exports.moduleLoad = moduleLoad;
// let currentVersion: number = 0
let currentVersion = {
    date: 0
};
exports.currentVersion = currentVersion;
let nodeList = []; //for contact
exports.nodeList = nodeList;
let contactList = []; //for contact
exports.contactList = contactList;
let chatroomNodeList = []; //for chatroom
exports.chatroomNodeList = chatroomNodeList;
let chatroomMemberList = []; //for chatroom
exports.chatroomMemberList = chatroomMemberList;
// let loggedIn: boolean = false
let loggedIn = {
    date: false
};
exports.loggedIn = loggedIn;
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggedIn = exports.chatroomMemberList = exports.chatroomNodeList = exports.contactList = exports.nodeList = exports.currentVersion = exports.moduleLoad = exports.moduleBaseAddress = exports.availableVersion = exports.offset = void 0;
const data_offset_1 = require("./data-offset");
Object.defineProperty(exports, "offset", { enumerable: true, get: function () { return data_offset_1.offset; } });
Object.defineProperty(exports, "availableVersion", { enumerable: true, get: function () { return data_offset_1.availableVersion; } });
Object.defineProperty(exports, "moduleBaseAddress", { enumerable: true, get: function () { return data_offset_1.moduleBaseAddress; } });
Object.defineProperty(exports, "moduleLoad", { enumerable: true, get: function () { return data_offset_1.moduleLoad; } });
Object.defineProperty(exports, "currentVersion", { enumerable: true, get: function () { return data_offset_1.currentVersion; } });
Object.defineProperty(exports, "nodeList", { enumerable: true, get: function () { return data_offset_1.nodeList; } });
Object.defineProperty(exports, "contactList", { enumerable: true, get: function () { return data_offset_1.contactList; } });
Object.defineProperty(exports, "chatroomNodeList", { enumerable: true, get: function () { return data_offset_1.chatroomNodeList; } });
Object.defineProperty(exports, "chatroomMemberList", { enumerable: true, get: function () { return data_offset_1.chatroomMemberList; } });
Object.defineProperty(exports, "loggedIn", { enumerable: true, get: function () { return data_offset_1.loggedIn; } });
},{"./data-offset":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentReadyCallback = void 0;
const agentReadyCallback = (() => {
    const nativeCallback = new NativeCallback(() => { }, 'void', []);
    const nativeativeFunction = new NativeFunction(nativeCallback, 'void', []);
    setTimeout(() => {
        nativeativeFunction();
    }, 500);
    return nativeCallback;
})();
exports.agentReadyCallback = agentReadyCallback;
},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestInfoFunction = void 0;
const getTestInfoFunction = (() => {
    const nativeativeFunction = new NativeFunction(ptr(0x4f230000), 'void', []);
    nativeativeFunction();
});
exports.getTestInfoFunction = getTestInfoFunction;
},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedInFunction = exports.getTestInfoFunction = exports.agentReadyCallback = exports.readStringPtr = exports.readWStringPtr = exports.readWideString = exports.readString = void 0;
const readString_1 = require("./readString");
Object.defineProperty(exports, "readString", { enumerable: true, get: function () { return readString_1.readString; } });
Object.defineProperty(exports, "readWideString", { enumerable: true, get: function () { return readString_1.readWideString; } });
Object.defineProperty(exports, "readWStringPtr", { enumerable: true, get: function () { return readString_1.readWStringPtr; } });
Object.defineProperty(exports, "readStringPtr", { enumerable: true, get: function () { return readString_1.readStringPtr; } });
const agentReadyCallback_1 = require("./agentReadyCallback");
Object.defineProperty(exports, "agentReadyCallback", { enumerable: true, get: function () { return agentReadyCallback_1.agentReadyCallback; } });
const getTestInfo_1 = require("./getTestInfo");
Object.defineProperty(exports, "getTestInfoFunction", { enumerable: true, get: function () { return getTestInfo_1.getTestInfoFunction; } });
const isLoggedIn_1 = require("./isLoggedIn");
Object.defineProperty(exports, "isLoggedInFunction", { enumerable: true, get: function () { return isLoggedIn_1.isLoggedInFunction; } });
},{"./agentReadyCallback":3,"./getTestInfo":4,"./isLoggedIn":6,"./readString":7}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedInFunction = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const data_offset_2 = require("../CommonData/data-offset");
const isLoggedInFunction = (() => {
    data_offset_2.loggedIn.date = data_offset_1.moduleBaseAddress.add(data_offset_1.offset.is_logged_in_offset).readU32();
    return !!data_offset_2.loggedIn.date;
});
exports.isLoggedInFunction = isLoggedInFunction;
},{"../CommonData/data-offset":1}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readStringPtr = exports.readWStringPtr = exports.readWideString = exports.readString = void 0;
const readStringPtr = (address) => {
    const addr = ptr(address);
    const size = addr.add(16).readU32();
    const capacity = addr.add(20).readU32();
    addr.ptr = addr;
    addr.size = size;
    addr.capacity = capacity;
    if (capacity > 15 && !addr.readPointer().isNull()) {
        addr.ptr = addr.readPointer();
    }
    addr.ptr._readCString = addr.ptr.readCString;
    addr.ptr._readAnsiString = addr.ptr.readAnsiString;
    addr.ptr._readUtf8String = addr.ptr.readUtf8String;
    addr.readCString = () => { return addr.size ? addr.ptr._readCString(addr.size) : ''; };
    addr.readAnsiString = () => { return addr.size ? addr.ptr._readAnsiString(addr.size) : ''; };
    addr.readUtf8String = () => { return addr.size ? addr.ptr._readUtf8String(addr.size) : ''; };
    // console.log('readStringPtr() address:',address,' -> str ptr:', addr.ptr, 'size:', addr.size, 'capacity:', addr.capacity)
    // console.log('readStringPtr() str:' , addr.readUtf8String())
    // console.log('readStringPtr() address:', addr,'dump:', addr.readByteArray(24))
    return addr;
};
exports.readStringPtr = readStringPtr;
const readString = (address) => {
    return readStringPtr(address).readUtf8String();
};
exports.readString = readString;
const readWStringPtr = (address) => {
    const addr = ptr(address);
    const size = addr.add(4).readU32();
    const capacity = addr.add(8).readU32();
    addr.ptr = addr.readPointer();
    addr.size = size;
    addr.capacity = capacity;
    addr.ptr._readUtf16String = addr.ptr.readUtf16String;
    addr.readUtf16String = () => { return addr.size ? addr.ptr._readUtf16String(addr.size * 2) : ''; };
    // console.log('readWStringPtr() address:',address,' -> ptr:', addr.ptr, 'size:', addr.size, 'capacity:', addr.capacity)
    // console.log('readWStringPtr() str:' ,  `"${addr.readUtf16String()}"`,'\n',addr.ptr.readByteArray(addr.size*2+2),'\n')
    // console.log('readWStringPtr() address:', addr,'dump:', addr.readByteArray(16),'\n')
    return addr;
};
exports.readWStringPtr = readWStringPtr;
const readWideString = (address) => {
    return readWStringPtr(address).readUtf16String();
};
exports.readWideString = readWideString;
},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMiniProgramNativeFunction = void 0;
const getUserData_1 = require("../getUserData/getUserData");
const data_offset_1 = require("../CommonData/data-offset");
const all_init_Fn_1 = require("../initStruct/all_init_Fn");
const SendMiniProgramNativeFunction = ((bg_path_str, contactId, xmlstr) => {
    // console.log("------------------------------------------------------");
    bg_path_str = "";
    var asmCode = Memory.alloc(Process.pageSize);
    var ECX_buf = Memory.alloc(0x300);
    var Buf_EAX = Memory.alloc(0x300);
    var buf_1 = Memory.alloc(0x300);
    var ptr_to_buf_1 = Memory.alloc(0x4).writePointer(buf_1);
    // var buf_2=Memory.alloc(0x300);
    var bg_path_Ptr = Memory.alloc(bg_path_str.length * 2 + 1);
    bg_path_Ptr.writeUtf16String(bg_path_str);
    var bg_path_Struct = Memory.alloc(0x14); // returns a NativePointer
    bg_path_Struct.writePointer(bg_path_Ptr).add(0x04)
        .writeU32(bg_path_str.length * 2).add(0x04)
        .writeU32(bg_path_str.length * 2).add(0x04)
        .writeU32(0).add(0x04)
        .writeU32(0);
    var send_wxid_str = JSON.parse((0, getUserData_1.getMyselfInfoFunction)()).id;
    // console.log(send_wxid_str)
    var send_wxid_Ptr = Memory.alloc(send_wxid_str.length * 2 + 1);
    send_wxid_Ptr.writeUtf16String(send_wxid_str);
    var send_wxid_Struct = Memory.alloc(0x14); // returns a NativePointer
    send_wxid_Struct.writePointer(send_wxid_Ptr).add(0x04)
        .writeU32(send_wxid_str.length * 2).add(0x04)
        .writeU32(send_wxid_str.length * 2).add(0x04)
        .writeU32(0).add(0x04)
        .writeU32(0);
    // var contactId="filehelper";
    var recv_wxid_Ptr = Memory.alloc(contactId.length * 2 + 1);
    recv_wxid_Ptr.writeUtf16String(contactId);
    var recv_wxid_Struct = Memory.alloc(0x14); // returns a NativePointer
    recv_wxid_Struct.writePointer(recv_wxid_Ptr).add(0x04)
        .writeU32(contactId.length * 2).add(0x04)
        .writeU32(contactId.length * 2).add(0x04)
        .writeU32(0).add(0x04)
        .writeU32(0);
    // var pXml=initidStruct('<msg><fromusername>'+send_wxid_str+'</fromusername><scene>0</scene><commenturl></commenturl><appmsg appid="wx65cc950f42e8fff1" sdkver=""><title>腾讯出行服务｜加油代驾公交</title><des></des><action>view</action><type>33</type><showtype>0</showtype><content></content><url>https://mp.weixin.qq.com/mp/waerrpage?appid=wx65cc950f42e8fff1&amp;amp;type=upgrade&amp;amp;upgradetype=3#wechat_redirect</url><dataurl></dataurl><lowurl></lowurl><lowdataurl></lowdataurl><recorditem><![CDATA[]]></recorditem><thumburl>http://mmbiz.qpic.cn/mmbiz_png/NM1fK7leWGPaFnMAe95jbg4sZAI3fkEZWHq69CIk6zA00SGARbmsGTbgLnZUXFoRwjROelKicbSp9K34MaZBuuA/640?wx_fmt=png&amp;wxfrom=200</thumburl><messageaction></messageaction><extinfo></extinfo><sourceusername></sourceusername><sourcedisplayname>腾讯出行服务｜加油代驾公交</sourcedisplayname><commenturl></commenturl><appattach><totallen>0</totallen><attachid></attachid><emoticonmd5></emoticonmd5><fileext></fileext><aeskey></aeskey></appattach><weappinfo><pagepath></pagepath><username>gh_ad64296dc8bd@app</username><appid>wx65cc950f42e8fff1</appid><type>1</type><weappiconurl>http://mmbiz.qpic.cn/mmbiz_png/NM1fK7leWGPaFnMAe95jbg4sZAI3fkEZWHq69CIk6zA00SGARbmsGTbgLnZUXFoRwjROelKicbSp9K34MaZBuuA/640?wx_fmt=png&amp;wxfrom=200</weappiconurl><appservicetype>0</appservicetype><shareId>2_wx65cc950f42e8fff1_875237370_1644979747_1</shareId></weappinfo><websearch /></appmsg><appinfo><version>1</version><appname>Window wechat</appname></appinfo></msg>');
    // console.log(xmlstr)
    var pXml = (0, all_init_Fn_1.initidStruct)(xmlstr);
    // console.log(pXml)
    // console.log(send_wxid_Struct);
    // console.log(recv_wxid_Struct);
    // console.log(pXml);
    // console.log("okkk");
    // console.log("------------------------------------------------------");
    Memory.patchCode(asmCode, Process.pageSize, code => {
        var cw = new X86Writer(code, { pc: asmCode });
        cw.putPushfx();
        cw.putPushax();
        cw.putMovRegReg('ecx', 'ecx');
        cw.putMovRegAddress('ecx', ECX_buf);
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(0x69BB0)); //init ecx
        cw.putPushU32(0x21);
        cw.putPushNearPtr(ptr_to_buf_1); //ptr
        cw.putPushU32(bg_path_Struct.toInt32());
        cw.putPushU32(pXml.toInt32());
        cw.putPushU32(recv_wxid_Struct.toInt32());
        cw.putMovRegAddress('edx', send_wxid_Struct);
        cw.putMovRegAddress('ecx', ECX_buf);
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(0x2E2420));
        cw.putAddRegImm('esp', 0x14);
        cw.putPushU32(Buf_EAX.toInt32());
        cw.putMovRegAddress('ecx', ECX_buf);
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(0x94C10));
        cw.putPushU32(data_offset_1.moduleBaseAddress.add(0x1DCB46C).toInt32());
        cw.putPushU32(data_offset_1.moduleBaseAddress.add(0x1DCB46C).toInt32());
        cw.putMovRegAddress('ecx', ECX_buf);
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(0x2E2630));
        cw.putAddRegImm('esp', 0x8);
        cw.putPopax();
        cw.putPopfx();
        cw.putRet();
        cw.flush();
    });
    const nativeativeFunction = new NativeFunction(ptr(asmCode), 'void', []);
    nativeativeFunction();
});
exports.SendMiniProgramNativeFunction = SendMiniProgramNativeFunction;
},{"../CommonData/data-offset":1,"../getUserData/getUserData":28,"../initStruct/all_init_Fn":30}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPicMsgNativeFunction = exports.picbuff = exports.picAsm = exports.picWxidPtr = exports.picWxid = exports.pathPtr = exports.imagefilepath = exports.buffwxid = exports.sendMsgNativeFunction = exports.SendMiniProgramNativeFunction = exports.sendAttatchMsgNativeFunction = exports.attatchEaxbuf = exports.attatchEbp = exports.attatchBuf = exports.attatchAsm = exports.attatchPathPtr = exports.attatchPath = exports.attatchWxid = exports.sendAtMsgNativeFunction = exports.ecxBuffer = exports.atid_ = exports.wxid_ = exports.msg_ = exports.roomid_ = exports.asmAtMsg = exports.recvMsgNativeCallback = void 0;
const recvMsgNativeCallback_1 = require("./recvMsgNativeCallback");
Object.defineProperty(exports, "recvMsgNativeCallback", { enumerable: true, get: function () { return recvMsgNativeCallback_1.recvMsgNativeCallback; } });
const sendAtMsgNativeFunction_1 = require("./sendAtMsgNativeFunction");
Object.defineProperty(exports, "asmAtMsg", { enumerable: true, get: function () { return sendAtMsgNativeFunction_1.asmAtMsg; } });
Object.defineProperty(exports, "roomid_", { enumerable: true, get: function () { return sendAtMsgNativeFunction_1.roomid_; } });
Object.defineProperty(exports, "msg_", { enumerable: true, get: function () { return sendAtMsgNativeFunction_1.msg_; } });
Object.defineProperty(exports, "wxid_", { enumerable: true, get: function () { return sendAtMsgNativeFunction_1.wxid_; } });
Object.defineProperty(exports, "atid_", { enumerable: true, get: function () { return sendAtMsgNativeFunction_1.atid_; } });
Object.defineProperty(exports, "ecxBuffer", { enumerable: true, get: function () { return sendAtMsgNativeFunction_1.ecxBuffer; } });
Object.defineProperty(exports, "sendAtMsgNativeFunction", { enumerable: true, get: function () { return sendAtMsgNativeFunction_1.sendAtMsgNativeFunction; } });
const sendAttatchMsgNativeFunction_1 = require("./sendAttatchMsgNativeFunction");
Object.defineProperty(exports, "attatchWxid", { enumerable: true, get: function () { return sendAttatchMsgNativeFunction_1.attatchWxid; } });
Object.defineProperty(exports, "attatchPath", { enumerable: true, get: function () { return sendAttatchMsgNativeFunction_1.attatchPath; } });
Object.defineProperty(exports, "attatchPathPtr", { enumerable: true, get: function () { return sendAttatchMsgNativeFunction_1.attatchPathPtr; } });
Object.defineProperty(exports, "attatchAsm", { enumerable: true, get: function () { return sendAttatchMsgNativeFunction_1.attatchAsm; } });
Object.defineProperty(exports, "attatchBuf", { enumerable: true, get: function () { return sendAttatchMsgNativeFunction_1.attatchBuf; } });
Object.defineProperty(exports, "attatchEbp", { enumerable: true, get: function () { return sendAttatchMsgNativeFunction_1.attatchEbp; } });
Object.defineProperty(exports, "attatchEaxbuf", { enumerable: true, get: function () { return sendAttatchMsgNativeFunction_1.attatchEaxbuf; } });
Object.defineProperty(exports, "sendAttatchMsgNativeFunction", { enumerable: true, get: function () { return sendAttatchMsgNativeFunction_1.sendAttatchMsgNativeFunction; } });
const SendMiniProgramNativeFunction_1 = require("./SendMiniProgramNativeFunction");
Object.defineProperty(exports, "SendMiniProgramNativeFunction", { enumerable: true, get: function () { return SendMiniProgramNativeFunction_1.SendMiniProgramNativeFunction; } });
const sendMsgNativeFunction_1 = require("./sendMsgNativeFunction");
Object.defineProperty(exports, "sendMsgNativeFunction", { enumerable: true, get: function () { return sendMsgNativeFunction_1.sendMsgNativeFunction; } });
const sendPicMsgNativeFunction_1 = require("./sendPicMsgNativeFunction");
Object.defineProperty(exports, "buffwxid", { enumerable: true, get: function () { return sendPicMsgNativeFunction_1.buffwxid; } });
Object.defineProperty(exports, "imagefilepath", { enumerable: true, get: function () { return sendPicMsgNativeFunction_1.imagefilepath; } });
Object.defineProperty(exports, "pathPtr", { enumerable: true, get: function () { return sendPicMsgNativeFunction_1.pathPtr; } });
Object.defineProperty(exports, "picWxid", { enumerable: true, get: function () { return sendPicMsgNativeFunction_1.picWxid; } });
Object.defineProperty(exports, "picWxidPtr", { enumerable: true, get: function () { return sendPicMsgNativeFunction_1.picWxidPtr; } });
Object.defineProperty(exports, "picAsm", { enumerable: true, get: function () { return sendPicMsgNativeFunction_1.picAsm; } });
Object.defineProperty(exports, "picbuff", { enumerable: true, get: function () { return sendPicMsgNativeFunction_1.picbuff; } });
Object.defineProperty(exports, "sendPicMsgNativeFunction", { enumerable: true, get: function () { return sendPicMsgNativeFunction_1.sendPicMsgNativeFunction; } });
},{"./SendMiniProgramNativeFunction":8,"./recvMsgNativeCallback":10,"./sendAtMsgNativeFunction":11,"./sendAttatchMsgNativeFunction":12,"./sendMsgNativeFunction":13,"./sendPicMsgNativeFunction":14}],10:[function(require,module,exports){
(function (setImmediate){(function (){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recvMsgNativeCallback = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const recvMsgNativeCallback = (() => {
    const nativeCallback = new NativeCallback(() => { }, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'int32']);
    const nativeativeFunction = new NativeFunction(nativeCallback, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'int32']);
    Interceptor.attach(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.hook_point), {
        onEnter() {
            const a = this.context;
            // const addr = this.context.ebp.sub(0xc30)//0xc30-0x08
            const addr = a.ebp.sub(0xc30); //0xc30-0x08
            const msgType = addr.add(0x38).readU32();
            const isMyMsg = addr.add(0x3C).readU32(); //add isMyMsg
            if (msgType > 0) {
                const talkerIdPtr = addr.add(0x48).readPointer();
                //console.log('txt msg',talkerIdPtr.readUtf16String())
                const talkerIdLen = addr.add(0x48 + 0x04).readU32() * 2 + 2;
                const myTalkerIdPtr = Memory.alloc(talkerIdLen);
                Memory.copy(myTalkerIdPtr, talkerIdPtr, talkerIdLen);
                let contentPtr = null;
                let contentLen = 0;
                let myContentPtr = null;
                if (msgType == 3) { // pic path
                    let thumbPtr = addr.add(0x198).readPointer();
                    let hdPtr = addr.add(0x1ac).readPointer();
                    let thumbPath = thumbPtr.readUtf16String();
                    let hdPath = hdPtr.readUtf16String();
                    let picData = [
                        thumbPath,
                        thumbPath,
                        hdPath,
                        hdPath //  PUPPET.types.Image.Artwork
                    ];
                    let content = JSON.stringify(picData);
                    myContentPtr = Memory.allocUtf16String(content);
                }
                else {
                    contentPtr = addr.add(0x70).readPointer();
                    contentLen = addr.add(0x70 + 0x04).readU32() * 2 + 2;
                    myContentPtr = Memory.alloc(contentLen);
                    Memory.copy(myContentPtr, contentPtr, contentLen);
                }
                //  console.log('----------------------------------------')
                //  console.log(msgType)
                //  console.log(contentPtr.readUtf16String())
                //  console.log('----------------------------------------')
                const groupMsgAddr = addr.add(0x170).readU32(); //* 2 + 2
                let myGroupMsgSenderIdPtr = null;
                if (groupMsgAddr == 0) { //weChatPublic is zero，type is 49
                    myGroupMsgSenderIdPtr = Memory.alloc(0x10);
                    myGroupMsgSenderIdPtr.writeUtf16String("null");
                }
                else {
                    const groupMsgSenderIdPtr = addr.add(0x170).readPointer();
                    const groupMsgSenderIdLen = addr.add(0x170 + 0x04).readU32() * 2 + 2;
                    myGroupMsgSenderIdPtr = Memory.alloc(groupMsgSenderIdLen);
                    Memory.copy(myGroupMsgSenderIdPtr, groupMsgSenderIdPtr, groupMsgSenderIdLen);
                }
                const xmlNullPtr = addr.add(0x1d8).readU32();
                let myXmlContentPtr = null;
                if (xmlNullPtr == 0) {
                    myXmlContentPtr = Memory.alloc(0x10);
                    myXmlContentPtr.writeUtf16String("null");
                }
                else {
                    const xmlContentPtr = addr.add(0x1d8).readPointer();
                    const xmlContentLen = addr.add(0x1d8 + 0x04).readU32() * 2 + 2;
                    myXmlContentPtr = Memory.alloc(xmlContentLen);
                    Memory.copy(myXmlContentPtr, xmlContentPtr, xmlContentLen);
                }
                setImmediate(() => nativeativeFunction(msgType, myTalkerIdPtr, myContentPtr, myGroupMsgSenderIdPtr, myXmlContentPtr, isMyMsg));
            }
        }
    });
    return nativeCallback;
})();
exports.recvMsgNativeCallback = recvMsgNativeCallback;
}).call(this)}).call(this,require("timers").setImmediate)

},{"../CommonData/data-offset":1,"timers":39}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAtMsgNativeFunction = exports.ecxBuffer = exports.atid_ = exports.wxid_ = exports.msg_ = exports.roomid_ = exports.asmAtMsg = void 0;
const all_init_Fn_1 = require("../initStruct/all_init_Fn");
const data_offset_1 = require("../CommonData/data-offset");
let asmAtMsg = null;
exports.asmAtMsg = asmAtMsg;
let roomid_, msg_, wxid_, atid_;
exports.roomid_ = roomid_;
exports.msg_ = msg_;
exports.wxid_ = wxid_;
exports.atid_ = atid_;
let ecxBuffer;
exports.ecxBuffer = ecxBuffer;
const sendAtMsgNativeFunction = ((roomId, text, contactId) => {
    exports.asmAtMsg = asmAtMsg = Memory.alloc(Process.pageSize);
    exports.ecxBuffer = ecxBuffer = Memory.alloc(0x5f0);
    exports.roomid_ = roomid_ = (0, all_init_Fn_1.initStruct)(roomId);
    exports.wxid_ = wxid_ = (0, all_init_Fn_1.initidStruct)(contactId);
    exports.msg_ = msg_ = (0, all_init_Fn_1.initmsgStruct)(text);
    exports.atid_ = atid_ = (0, all_init_Fn_1.initAtMsgStruct)(wxid_);
    Memory.patchCode(asmAtMsg, Process.pageSize, code => {
        var cw = new X86Writer(code, { pc: asmAtMsg });
        //cw.putMovRegAddress('eax',roomid)
        cw.putPushfx();
        cw.putPushax();
        cw.putPushU32(1); // push
        cw.putMovRegAddress('edi', atid_);
        cw.putMovRegAddress('ebx', msg_); //msg_
        cw.putPushReg('edi');
        cw.putPushReg('ebx');
        //cw.putMovRegRegOffsetPtr('edx', 'ebp', 0x10)//at wxid
        cw.putMovRegAddress('edx', roomid_); //room_id
        cw.putMovRegAddress('ecx', ecxBuffer);
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.send_txt_call_offset));
        cw.putAddRegImm('esp', 0xc);
        cw.putPopax();
        cw.putPopfx();
        cw.putRet();
        cw.flush();
    });
    const atMsgNativeFunction = new NativeFunction(ptr(asmAtMsg), 'void', []);
    atMsgNativeFunction();
});
exports.sendAtMsgNativeFunction = sendAtMsgNativeFunction;
},{"../CommonData/data-offset":1,"../initStruct/all_init_Fn":30}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAttatchMsgNativeFunction = exports.attatchEaxbuf = exports.attatchEbp = exports.attatchBuf = exports.attatchAsm = exports.attatchPathPtr = exports.attatchPath = exports.attatchWxid = void 0;
const all_init_Fn_1 = require("../initStruct/all_init_Fn");
const data_offset_1 = require("../CommonData/data-offset");
let attatchWxid = null;
exports.attatchWxid = attatchWxid;
let attatchPath = null;
exports.attatchPath = attatchPath;
let attatchPathPtr = null;
exports.attatchPathPtr = attatchPathPtr;
let attatchAsm = null;
exports.attatchAsm = attatchAsm;
let attatchBuf = null;
exports.attatchBuf = attatchBuf;
let attatchEbp = null;
exports.attatchEbp = attatchEbp;
let attatchEaxbuf = null;
exports.attatchEaxbuf = attatchEaxbuf;
const sendAttatchMsgNativeFunction = ((contactId, path) => {
    exports.attatchAsm = attatchAsm = Memory.alloc(Process.pageSize);
    exports.attatchBuf = attatchBuf = Memory.alloc(0x378);
    exports.attatchEbp = attatchEbp = Memory.alloc(0x04);
    exports.attatchEaxbuf = attatchEaxbuf = Memory.alloc(0x14);
    exports.attatchWxid = attatchWxid = (0, all_init_Fn_1.initidStruct)(contactId);
    exports.attatchPathPtr = attatchPathPtr = Memory.alloc(path.length * 2 + 1);
    attatchPathPtr.writeUtf16String(path);
    exports.attatchPath = attatchPath = Memory.alloc(0x28);
    attatchPath.writePointer(attatchPathPtr).add(0x04)
        .writeU32(path.length * 2).add(0x04)
        .writeU32(path.length * 2).add(0x04);
    Memory.patchCode(attatchAsm, Process.pageSize, code => {
        var cw = new X86Writer(code, { pc: attatchAsm });
        cw.putPushfx();
        cw.putPushax();
        cw.putSubRegImm('esp', 0x14);
        //mov byte ptr ss : [ebp - 0x6C] , 0x0
        //cw.putMovNearPtrReg(attatchEbp, 'ebp')
        //cw.putMovRegOffsetPtrU32('ebp', -0x6c, 0x0)
        //cw.putMovRegRegOffsetPtr('edx', 'ebp', -0x6c)
        //putShlRegU8(reg, immValue)
        cw.putMovRegAddress('ebx', attatchPath);
        cw.putMovRegAddress('eax', attatchEaxbuf);
        cw.putMovRegReg('ecx', 'esp');
        cw.putPushReg('eax');
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.send_attatch_call_offset1));
        cw.putPushU32(0);
        cw.putSubRegImm('esp', 0x14);
        cw.putMovRegReg('ecx', 'esp');
        cw.putPushU32(-1);
        cw.putPushU32((data_offset_1.moduleBaseAddress.add(data_offset_1.offset.send_attatch_call_para)).toInt32());
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.send_attatch_call_offset2));
        cw.putSubRegImm('esp', 0x14);
        cw.putMovRegReg('ecx', 'esp');
        cw.putPushU32(attatchPath.toInt32());
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.send_attatch_call_offset3));
        cw.putSubRegImm('esp', 0x14);
        cw.putMovRegReg('ecx', 'esp');
        cw.putPushU32(attatchWxid.toInt32());
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.send_attatch_call_offset4));
        cw.putMovRegAddress('eax', attatchBuf);
        cw.putPushReg('eax');
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.send_attatch_call_offset5));
        cw.putMovRegReg('ecx', 'eax');
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.send_attatch_call_offset6));
        cw.putPopax();
        cw.putPopfx();
        cw.putRet();
        cw.flush();
    });
    const nativeativeFunction = new NativeFunction(ptr(attatchAsm), 'void', []);
    nativeativeFunction();
});
exports.sendAttatchMsgNativeFunction = sendAttatchMsgNativeFunction;
},{"../CommonData/data-offset":1,"../initStruct/all_init_Fn":30}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMsgNativeFunction = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const sendMsgNativeFunction = (() => {
    //const asmBuffer   = Memory.alloc(/*0x5a8*/0x5f0) // magic number from wechat-bot (laozhang)
    const asmBuffer = Memory.alloc(0x5f0);
    const asmSendMsg = Memory.alloc(Process.pageSize);
    Memory.patchCode(asmSendMsg, Process.pageSize, code => {
        var cw = new X86Writer(code, { pc: asmSendMsg });
        cw.putPushReg('ebp');
        cw.putMovRegReg('ebp', 'esp');
        cw.putPushax();
        cw.putPushfx();
        cw.putPushU32(1); // push
        cw.putPushU32(0); // push
        cw.putMovRegRegOffsetPtr('ebx', 'ebp', 0xc); // arg 1
        cw.putPushReg('ebx'); // push
        cw.putMovRegRegOffsetPtr('edx', 'ebp', 0x8); // arg 0
        cw.putMovRegAddress('ecx', asmBuffer);
        //0x3b56a0 3.2.1.121
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.send_txt_call_offset));
        cw.putAddRegImm('esp', 0xc);
        cw.putPopfx();
        cw.putPopax();
        cw.putMovRegRegPtr('esp', 'ebp'); // Huan(202107): why use RegRegPtr? (RegRet will fail)
        cw.putPopReg('ebp');
        cw.putRet();
        cw.flush();
    });
    /*let ins = Instruction.parse(asmSendMsg)
    for (let i=0; i<20; i++) {
      console.log(ins.address, '\t', ins.mnemonic, '\t', ins.opStr)
      ins = Instruction.parse(ins.next)
    }*/
    const asmNativeFunction = new NativeFunction(asmSendMsg, 'void', ['pointer', 'pointer']);
    const sendMsg = (talkerId, content) => {
        const talkerIdPtr = Memory.alloc(talkerId.length * 2 + 1);
        const contentPtr = Memory.alloc(content.length * 2 + 1);
        talkerIdPtr.writeUtf16String(talkerId);
        contentPtr.writeUtf16String(content);
        const sizeOfStringStruct = Process.pointerSize * 5; // + 0xd
        // allocate space for the struct
        const talkerIdStruct = Memory.alloc(sizeOfStringStruct); // returns a NativePointer
        const contentStruct = Memory.alloc(sizeOfStringStruct); // returns a NativePointer
        talkerIdStruct
            .writePointer(talkerIdPtr).add(0x4)
            .writeU32(talkerId.length).add(0x4)
            .writeU32(talkerId.length * 2);
        contentStruct
            .writePointer(contentPtr).add(0x4)
            .writeU32(content.length).add(0x4)
            .writeU32(content.length * 2);
        asmNativeFunction(talkerIdStruct, contentStruct);
    };
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
    };
    return (...args) => refHolder.sendMsg(...args); //ci  chu  bu zhi  dao dui cuo   // as [talkerId:any,content:any]
})();
exports.sendMsgNativeFunction = sendMsgNativeFunction;
},{"../CommonData/data-offset":1}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPicMsgNativeFunction = exports.picbuff = exports.picAsm = exports.picWxidPtr = exports.picWxid = exports.pathPtr = exports.imagefilepath = exports.buffwxid = void 0;
const data_offset_1 = require("../CommonData/data-offset");
let buffwxid = null;
exports.buffwxid = buffwxid;
let imagefilepath = null;
exports.imagefilepath = imagefilepath;
let pathPtr = null;
exports.pathPtr = pathPtr;
let picWxid = null;
exports.picWxid = picWxid;
let picWxidPtr = null;
exports.picWxidPtr = picWxidPtr;
let picAsm = null;
exports.picAsm = picAsm;
let picbuff = null;
exports.picbuff = picbuff;
const sendPicMsgNativeFunction = ((contactId, path) => {
    exports.picAsm = picAsm = Memory.alloc(Process.pageSize);
    exports.buffwxid = buffwxid = Memory.alloc(0x20);
    exports.picbuff = picbuff = Memory.alloc(0x378);
    exports.pathPtr = pathPtr = Memory.alloc(path.length * 2 + 1);
    pathPtr.writeUtf16String(path);
    exports.imagefilepath = imagefilepath = Memory.alloc(0x24);
    imagefilepath.writePointer(pathPtr).add(0x04)
        .writeU32(path.length * 2).add(0x04)
        .writeU32(path.length * 2).add(0x04);
    exports.picWxidPtr = picWxidPtr = Memory.alloc(contactId.length * 2 + 1);
    picWxidPtr.writeUtf16String(contactId);
    exports.picWxid = picWxid = Memory.alloc(0x0c);
    picWxid.writePointer(ptr(picWxidPtr)).add(0x04)
        .writeU32(contactId.length * 2).add(0x04)
        .writeU32(contactId.length * 2).add(0x04);
    Memory.patchCode(picAsm, Process.pageSize, code => {
        var cw = new X86Writer(code, { pc: picAsm });
        cw.putPushfx();
        cw.putPushax();
        cw.putSubRegImm('esp', 0x14);
        cw.putMovRegAddress('eax', buffwxid);
        cw.putMovRegReg('ecx', 'esp');
        cw.putPushReg('eax');
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.send_picmsg_call_offset1));
        cw.putMovRegAddress('ebx', imagefilepath);
        cw.putPushReg('ebx');
        cw.putMovRegAddress('eax', picWxid);
        cw.putPushReg('eax');
        cw.putMovRegAddress('eax', picbuff);
        cw.putPushReg('eax');
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.send_picmsg_call_offset2));
        cw.putMovRegReg('ecx', 'eax');
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.send_picmsg_call_offset3));
        cw.putPopax();
        cw.putPopfx();
        cw.putRet();
        cw.flush();
    });
    const nativeativeFunction = new NativeFunction(ptr(picAsm), 'void', []);
    nativeativeFunction();
});
exports.sendPicMsgNativeFunction = sendPicMsgNativeFunction;
},{"../CommonData/data-offset":1}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callLoginQrcodeFunction = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const getQrcodeLoginData_1 = require("./getQrcodeLoginData");
const callLoginQrcodeFunction = ((forceRefresh = false) => {
    const json = (0, getQrcodeLoginData_1.getQrcodeLoginData)();
    if (!forceRefresh && json.uuid) {
        return;
    }
    const callAsm = Memory.alloc(Process.pageSize);
    const loginWnd = data_offset_1.moduleBaseAddress.add(data_offset_1.offset.get_login_wnd_offset).readPointer();
    Memory.patchCode(callAsm, Process.pageSize, code => {
        var cw = new X86Writer(code, { pc: callAsm });
        cw.putPushfx();
        cw.putPushax();
        cw.putMovRegAddress('ecx', loginWnd);
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.get_qr_login_call_offset));
        cw.putPopax();
        cw.putPopfx();
        cw.putRet();
        cw.flush();
    });
    const nativeativeFunction = new NativeFunction(ptr(callAsm), 'void', []);
    nativeativeFunction();
});
exports.callLoginQrcodeFunction = callLoginQrcodeFunction;
},{"../CommonData/data-offset":1,"./getQrcodeLoginData":17}],16:[function(require,module,exports){
(function (setImmediate){(function (){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkQRLoginNativeCallback = void 0;
const getQrcodeLoginData_1 = require("./getQrcodeLoginData");
const data_offset_1 = require("../CommonData/data-offset");
const readString_1 = require("../CommonFn/readString");
const isLoggedIn_1 = require("../CommonFn/isLoggedIn");
const checkQRLoginNativeCallback = (() => {
    const nativeCallback = new NativeCallback(() => { }, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'int32', 'pointer']);
    const nativeativeFunction = new NativeFunction(nativeCallback, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'int32', 'pointer']);
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
            const json = (0, getQrcodeLoginData_1.getQrcodeLoginData)();
            if (json.status == 0) {
                // 当状态为 0 时，即未扫码。而其他状态会触发另一个方法，拥有更多数据。
                ret(json);
            }
            return retval;
        },
    };
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
        ];
        setImmediate(() => nativeativeFunction(...arr));
    };
    Interceptor.attach(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.hook_get_login_qr_offset), callback);
    Interceptor.attach(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.hook_check_login_qr_offset), callback);
    Interceptor.attach(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.hook_save_login_qr_info_offset), {
        onEnter: function () {
            const qrNotify = this.context['ebp'].sub(72); //zijiadaima  as keyof cpucontext
            const uuid = (0, readString_1.readString)(qrNotify.add(4).readPointer());
            const wxid = (0, readString_1.readString)(qrNotify.add(8).readPointer());
            const status = qrNotify.add(16).readUInt();
            const avatarUrl = (0, readString_1.readString)(qrNotify.add(24).readPointer());
            const nickname = (0, readString_1.readString)(qrNotify.add(28).readPointer());
            const pairWaitTip = (0, readString_1.readString)(qrNotify.add(32).readPointer());
            const phoneClientVer = qrNotify.add(40).readUInt();
            const phoneType = (0, readString_1.readString)(qrNotify.add(44).readPointer());
            const json = {
                status,
                uuid,
                wxid,
                avatarUrl,
                nickname,
                phoneType,
                phoneClientVer,
                pairWaitTip,
            };
            ret(json);
        },
        onLeave: function (retval) {
            return retval;
        },
    });
    if (!(0, isLoggedIn_1.isLoggedInFunction)()) {
        setTimeout(() => {
            const json = (0, getQrcodeLoginData_1.getQrcodeLoginData)();
            ret(json);
        }, 100);
    }
    return nativeCallback;
})();
exports.checkQRLoginNativeCallback = checkQRLoginNativeCallback;
}).call(this)}).call(this,require("timers").setImmediate)

},{"../CommonData/data-offset":1,"../CommonFn/isLoggedIn":6,"../CommonFn/readString":7,"./getQrcodeLoginData":17,"timers":39}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQrcodeLoginData = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const CommonFn_1 = require("../CommonFn");
const getQrcodeLoginData = () => {
    const getQRCodeLoginMgr = new NativeFunction(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.get_qr_login_data_offset), 'pointer', []);
    const qlMgr = getQRCodeLoginMgr();
    const json = {
        status: 0,
        uuid: '',
        wxid: '',
        avatarUrl: '',
    };
    if (!qlMgr.isNull()) {
        json.uuid = (0, CommonFn_1.readString)(qlMgr.add(8));
        json.status = qlMgr.add(40).readUInt();
        json.wxid = (0, CommonFn_1.readString)(qlMgr.add(44));
        json.avatarUrl = (0, CommonFn_1.readString)(qlMgr.add(92));
    }
    return json;
};
exports.getQrcodeLoginData = getQrcodeLoginData;
},{"../CommonData/data-offset":1,"../CommonFn":5}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQrcodeLoginData = exports.checkQRLoginNativeCallback = exports.callLoginQrcodeFunction = void 0;
const callLoginQrcodeFunction_1 = require("./callLoginQrcodeFunction");
Object.defineProperty(exports, "callLoginQrcodeFunction", { enumerable: true, get: function () { return callLoginQrcodeFunction_1.callLoginQrcodeFunction; } });
const checkQRLoginNativeCallback_1 = require("./checkQRLoginNativeCallback");
Object.defineProperty(exports, "checkQRLoginNativeCallback", { enumerable: true, get: function () { return checkQRLoginNativeCallback_1.checkQRLoginNativeCallback; } });
const getQrcodeLoginData_1 = require("./getQrcodeLoginData");
Object.defineProperty(exports, "getQrcodeLoginData", { enumerable: true, get: function () { return getQrcodeLoginData_1.getQrcodeLoginData; } });
},{"./callLoginQrcodeFunction":15,"./checkQRLoginNativeCallback":16,"./getQrcodeLoginData":17}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBaseNodeAddress = exports.getChatroomNodeAddress = exports.getHeaderNodeAddress = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const getBaseNodeAddress = (() => {
    return data_offset_1.moduleBaseAddress.add(data_offset_1.offset.node_offset).readPointer();
});
exports.getBaseNodeAddress = getBaseNodeAddress;
// 获取联系人数据的树根节点地址
const getHeaderNodeAddress = (() => {
    const baseAddress = getBaseNodeAddress();
    if (baseAddress.isNull()) {
        return baseAddress;
    }
    return baseAddress.add(data_offset_1.offset.handle_offset).readPointer();
});
exports.getHeaderNodeAddress = getHeaderNodeAddress;
// 获取群数据的树根节点地址
const getChatroomNodeAddress = (() => {
    const baseAddress = getBaseNodeAddress();
    if (baseAddress.isNull()) {
        return baseAddress;
    }
    return baseAddress.add(data_offset_1.offset.chatroom_node_offset).readPointer();
});
exports.getChatroomNodeAddress = getChatroomNodeAddress;
},{"../CommonData/data-offset":1}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBaseNodeAddress = exports.getChatroomNodeAddress = exports.getHeaderNodeAddress = void 0;
const getAddress_1 = require("./getAddress");
Object.defineProperty(exports, "getHeaderNodeAddress", { enumerable: true, get: function () { return getAddress_1.getHeaderNodeAddress; } });
Object.defineProperty(exports, "getChatroomNodeAddress", { enumerable: true, get: function () { return getAddress_1.getChatroomNodeAddress; } });
Object.defineProperty(exports, "getBaseNodeAddress", { enumerable: true, get: function () { return getAddress_1.getBaseNodeAddress; } });
},{"./getAddress":19}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSupportedFunction = void 0;
const getWechatVersionFunction_1 = require("./getWechatVersionFunction");
const data_offset_1 = require("../CommonData/data-offset");
const checkSupportedFunction = (() => {
    const ver = (0, getWechatVersionFunction_1.getWechatVersionFunction)();
    return ver == data_offset_1.availableVersion;
});
exports.checkSupportedFunction = checkSupportedFunction;
},{"../CommonData/data-offset":1,"./getWechatVersionFunction":25}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatroomMemberInfoFunction = void 0;
const getAddress_1 = require("../getAddressData/getAddress");
const chatroomRecurse_1 = require("../parse-getData/chatroomRecurse");
const data_offset_1 = require("../CommonData/data-offset");
const getChatroomMemberInfoFunction = (() => {
    const chatroomNodeAddress = (0, getAddress_1.getChatroomNodeAddress)();
    if (chatroomNodeAddress.isNull()) {
        return '[]';
    }
    const node = chatroomNodeAddress.add(0x0).readPointer();
    const ret = (0, chatroomRecurse_1.chatroomRecurse)(node);
    const cloneRet = JSON.stringify(ret);
    data_offset_1.chatroomNodeList.length = 0; //empty
    data_offset_1.chatroomMemberList.length = 0; //empty
    return cloneRet;
});
exports.getChatroomMemberInfoFunction = getChatroomMemberInfoFunction;
},{"../CommonData/data-offset":1,"../getAddressData/getAddress":19,"../parse-getData/chatroomRecurse":32}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatroomMemberNickInfoFunction = exports.nickRetAddr = exports.memberNickBuffAsm = exports.nickBuff = exports.nickStructPtr = exports.nickMemberId = exports.nickRoomId = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const readString_1 = require("../CommonFn/readString");
const all_init_Fn_1 = require("../initStruct/all_init_Fn");
let nickRoomId = null;
exports.nickRoomId = nickRoomId;
let nickMemberId = null;
exports.nickMemberId = nickMemberId;
let nickStructPtr = null;
exports.nickStructPtr = nickStructPtr;
let nickBuff = null;
exports.nickBuff = nickBuff;
let memberNickBuffAsm = null;
exports.memberNickBuffAsm = memberNickBuffAsm;
let nickRetAddr = null;
exports.nickRetAddr = nickRetAddr;
const getChatroomMemberNickInfoFunction = ((memberId, roomId) => {
    exports.nickBuff = nickBuff = Memory.alloc(0x7e4);
    exports.nickRetAddr = nickRetAddr = Memory.alloc(0x04);
    exports.memberNickBuffAsm = memberNickBuffAsm = Memory.alloc(Process.pageSize);
    exports.nickRoomId = nickRoomId = (0, all_init_Fn_1.initidStruct)(roomId);
    exports.nickMemberId = nickMemberId = (0, all_init_Fn_1.initStruct)(memberId);
    exports.nickStructPtr = nickStructPtr = (0, all_init_Fn_1.initmsgStruct)('');
    Memory.patchCode(memberNickBuffAsm, Process.pageSize, code => {
        var cw = new X86Writer(code, { pc: memberNickBuffAsm });
        cw.putPushfx();
        cw.putPushax();
        cw.putMovRegAddress('ebx', nickStructPtr);
        cw.putMovRegAddress('esi', nickMemberId);
        cw.putMovRegAddress('edi', nickRoomId);
        cw.putMovRegAddress('ecx', nickBuff);
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.chatroom_member_nick_call_offset1));
        cw.putMovRegAddress('eax', nickBuff);
        cw.putPushReg('eax');
        cw.putPushReg('esi');
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.chatroom_member_nick_call_offset2));
        cw.putMovRegReg('ecx', 'eax');
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.chatroom_member_nick_call_offset3));
        cw.putPushU32(1);
        cw.putPushReg('ebx');
        cw.putMovRegReg('edx', 'edi');
        cw.putMovRegAddress('ecx', nickBuff);
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.chatroom_member_nick_call_offset4));
        cw.putAddRegImm('esp', 0x08);
        cw.putMovNearPtrReg(nickRetAddr, 'ebx');
        cw.putPopax();
        cw.putPopfx();
        cw.putRet();
        cw.flush();
    });
    const nativeativeFunction = new NativeFunction(ptr(memberNickBuffAsm), 'void', []);
    nativeativeFunction();
    return (0, readString_1.readWideString)(nickRetAddr.readPointer());
});
exports.getChatroomMemberNickInfoFunction = getChatroomMemberNickInfoFunction;
},{"../CommonData/data-offset":1,"../CommonFn/readString":7,"../initStruct/all_init_Fn":30}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContactNativeFunction = void 0;
const getAddress_1 = require("../getAddressData/getAddress");
const data_offset_1 = require("../CommonData/data-offset");
const recurse_1 = require("../parse-getData/recurse");
const getContactNativeFunction = (() => {
    const headerNodeAddress = (0, getAddress_1.getHeaderNodeAddress)();
    if (headerNodeAddress.isNull()) {
        return '[]';
    }
    const node = headerNodeAddress.add(0x0).readPointer();
    const ret = (0, recurse_1.recurse)(node);
    /*for (let item in ret.contact){
      console.log(ret.contact[item].wxid,ret.contact[item].wx_code,ret.contact[item].name)
    }*/
    //console.log(ret.contact)
    const cloneRet = JSON.stringify(ret);
    data_offset_1.nodeList.length = 0;
    data_offset_1.contactList.length = 0;
    return cloneRet;
});
exports.getContactNativeFunction = getContactNativeFunction;
},{"../CommonData/data-offset":1,"../getAddressData/getAddress":19,"../parse-getData/recurse":34}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWechatVersionFunction = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const getWechatVersionFunction = (() => {
    if (data_offset_1.currentVersion.date) {
        return data_offset_1.currentVersion.date;
    }
    const pattern = '55 8B ?? 83 ?? ?? A1 ?? ?? ?? ?? 83 ?? ?? 85 ?? 7F ?? 8D ?? ?? E8 ?? ?? ?? ?? 84 ?? 74 ?? 8B ?? ?? ?? 85 ?? 75 ?? E8 ?? ?? ?? ?? 0F ?? ?? 0D ?? ?? ?? ?? A3 ?? ?? ?? ?? A3 ?? ?? ?? ?? 8B ?? 5D C3';
    const results = Memory.scanSync(data_offset_1.moduleLoad.base, data_offset_1.moduleLoad.size, pattern);
    if (results.length == 0) {
        return 0;
    }
    const addr = results[0].address;
    const ret = addr.add(0x07).readPointer();
    const ver = ret.add(0x0).readU32();
    data_offset_1.currentVersion.date = ver;
    return ver;
});
exports.getWechatVersionFunction = getWechatVersionFunction;
},{"../CommonData/data-offset":1}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWechatVersionStringFunction = void 0;
const getWechatVersionFunction_1 = require("./getWechatVersionFunction");
const getWechatVersionStringFunction = ((ver = (0, getWechatVersionFunction_1.getWechatVersionFunction)()) => {
    if (!ver) {
        return '0.0.0.0';
    }
    const vers = [];
    vers.push((ver >> 24) & 255 - 0x60);
    vers.push((ver >> 16) & 255);
    vers.push((ver >> 8) & 255);
    vers.push(ver & 255);
    return vers.join('.');
});
exports.getWechatVersionStringFunction = getWechatVersionStringFunction;
},{"./getWechatVersionFunction":25}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWechatVersionStringFunction = exports.getWechatVersionFunction = exports.getContactNativeFunction = exports.getChatroomMemberNickInfoFunction = exports.nickRetAddr = exports.memberNickBuffAsm = exports.nickBuff = exports.nickStructPtr = exports.nickMemberId = exports.nickRoomId = exports.getChatroomMemberInfoFunction = exports.checkSupportedFunction = void 0;
const checkSupported_1 = require("./checkSupported");
Object.defineProperty(exports, "checkSupportedFunction", { enumerable: true, get: function () { return checkSupported_1.checkSupportedFunction; } });
const getChatroomMemberInfo_1 = require("./getChatroomMemberInfo");
Object.defineProperty(exports, "getChatroomMemberInfoFunction", { enumerable: true, get: function () { return getChatroomMemberInfo_1.getChatroomMemberInfoFunction; } });
const getChatroomMemberNickInfoFunction_1 = require("./getChatroomMemberNickInfoFunction");
Object.defineProperty(exports, "nickRoomId", { enumerable: true, get: function () { return getChatroomMemberNickInfoFunction_1.nickRoomId; } });
Object.defineProperty(exports, "nickMemberId", { enumerable: true, get: function () { return getChatroomMemberNickInfoFunction_1.nickMemberId; } });
Object.defineProperty(exports, "nickStructPtr", { enumerable: true, get: function () { return getChatroomMemberNickInfoFunction_1.nickStructPtr; } });
Object.defineProperty(exports, "nickBuff", { enumerable: true, get: function () { return getChatroomMemberNickInfoFunction_1.nickBuff; } });
Object.defineProperty(exports, "memberNickBuffAsm", { enumerable: true, get: function () { return getChatroomMemberNickInfoFunction_1.memberNickBuffAsm; } });
Object.defineProperty(exports, "nickRetAddr", { enumerable: true, get: function () { return getChatroomMemberNickInfoFunction_1.nickRetAddr; } });
Object.defineProperty(exports, "getChatroomMemberNickInfoFunction", { enumerable: true, get: function () { return getChatroomMemberNickInfoFunction_1.getChatroomMemberNickInfoFunction; } });
const getContactNativeFunction_1 = require("./getContactNativeFunction");
Object.defineProperty(exports, "getContactNativeFunction", { enumerable: true, get: function () { return getContactNativeFunction_1.getContactNativeFunction; } });
const getWechatVersionFunction_1 = require("./getWechatVersionFunction");
Object.defineProperty(exports, "getWechatVersionFunction", { enumerable: true, get: function () { return getWechatVersionFunction_1.getWechatVersionFunction; } });
const getWechatVersionString_1 = require("./getWechatVersionString");
Object.defineProperty(exports, "getWechatVersionStringFunction", { enumerable: true, get: function () { return getWechatVersionString_1.getWechatVersionStringFunction; } });
},{"./checkSupported":21,"./getChatroomMemberInfo":22,"./getChatroomMemberNickInfoFunction":23,"./getContactNativeFunction":24,"./getWechatVersionFunction":25,"./getWechatVersionString":26}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyselfIdFunction = exports.getMyselfInfoFunction = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const readString_1 = require("../CommonFn/readString");
const getMyselfInfoFunction = (() => {
    // let ptr: number = 0
    let wx_code = '';
    let wx_id = '';
    let wx_name = '';
    let head_img_url = '';
    wx_id = (0, readString_1.readString)(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.wxid_offset));
    wx_code = wx_id;
    wx_name = (0, readString_1.readString)(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.nickname_offset));
    head_img_url = (0, readString_1.readString)(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.head_img_url_offset));
    const myself = {
        id: wx_id,
        code: wx_code,
        name: wx_name,
        head_img_url: head_img_url,
    };
    return JSON.stringify(myself);
});
exports.getMyselfInfoFunction = getMyselfInfoFunction;
const getMyselfIdFunction = (() => {
    let wx_id = (0, readString_1.readString)(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.wxid_offset));
    return wx_id;
});
exports.getMyselfIdFunction = getMyselfIdFunction;
},{"../CommonData/data-offset":1,"../CommonFn/readString":7}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyselfIdFunction = exports.getMyselfInfoFunction = void 0;
const getUserData_1 = require("./getUserData");
Object.defineProperty(exports, "getMyselfInfoFunction", { enumerable: true, get: function () { return getUserData_1.getMyselfInfoFunction; } });
Object.defineProperty(exports, "getMyselfIdFunction", { enumerable: true, get: function () { return getUserData_1.getMyselfIdFunction; } });
},{"./getUserData":28}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAtMsgStruct = exports.atStruct = exports.initStruct = exports.retStruct = exports.retPtr = exports.initidStruct = exports.retidPtr = exports.retidStruct = exports.initmsgStruct = exports.msgstrPtr = exports.msgStruct = void 0;
let msgStruct = null;
exports.msgStruct = msgStruct;
let msgstrPtr = null;
exports.msgstrPtr = msgstrPtr;
const initmsgStruct = ((str) => {
    exports.msgstrPtr = msgstrPtr = Memory.alloc(str.length * 2 + 1);
    msgstrPtr.writeUtf16String(str);
    exports.msgStruct = msgStruct = Memory.alloc(0x14); // returns a NativePointer
    msgStruct
        .writePointer(msgstrPtr).add(0x04)
        .writeU32(str.length * 2).add(0x04)
        .writeU32(str.length * 2).add(0x04)
        .writeU32(0).add(0x04)
        .writeU32(0);
    return msgStruct;
});
exports.initmsgStruct = initmsgStruct;
let retidStruct = null;
exports.retidStruct = retidStruct;
let retidPtr = null;
exports.retidPtr = retidPtr;
const initidStruct = ((str) => {
    exports.retidPtr = retidPtr = Memory.alloc(str.length * 2 + 1);
    retidPtr.writeUtf16String(str);
    exports.retidStruct = retidStruct = Memory.alloc(0x14); // returns a NativePointer
    retidStruct
        .writePointer(retidPtr).add(0x04)
        .writeU32(str.length * 2).add(0x04)
        .writeU32(str.length * 2).add(0x04)
        .writeU32(0).add(0x04)
        .writeU32(0);
    return retidStruct;
});
exports.initidStruct = initidStruct;
let retPtr = null;
exports.retPtr = retPtr;
let retStruct = null;
exports.retStruct = retStruct;
const initStruct = ((str) => {
    exports.retPtr = retPtr = Memory.alloc(str.length * 2 + 1);
    retPtr.writeUtf16String(str);
    exports.retStruct = retStruct = Memory.alloc(0x14); // returns a NativePointer
    retStruct
        .writePointer(retPtr).add(0x04)
        .writeU32(str.length * 2).add(0x04)
        .writeU32(str.length * 2).add(0x04)
        .writeU32(0).add(0x04)
        .writeU32(0);
    return retStruct;
});
exports.initStruct = initStruct;
let atStruct = null;
exports.atStruct = atStruct;
const initAtMsgStruct = ((wxidStruct) => {
    exports.atStruct = atStruct = Memory.alloc(0x10);
    atStruct.writePointer(wxidStruct).add(0x04)
        .writeU32(wxidStruct.toInt32() + 0x14).add(0x04) //0x14 = sizeof(wxid structure)
        .writeU32(wxidStruct.toInt32() + 0x14).add(0x04)
        .writeU32(0);
    return atStruct;
});
exports.initAtMsgStruct = initAtMsgStruct;
},{}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAtMsgStruct = exports.atStruct = exports.initStruct = exports.retStruct = exports.retPtr = exports.initidStruct = exports.retidPtr = exports.retidStruct = exports.initmsgStruct = exports.msgstrPtr = exports.msgStruct = void 0;
const all_init_Fn_1 = require("./all_init_Fn");
Object.defineProperty(exports, "msgStruct", { enumerable: true, get: function () { return all_init_Fn_1.msgStruct; } });
Object.defineProperty(exports, "msgstrPtr", { enumerable: true, get: function () { return all_init_Fn_1.msgstrPtr; } });
Object.defineProperty(exports, "initmsgStruct", { enumerable: true, get: function () { return all_init_Fn_1.initmsgStruct; } });
Object.defineProperty(exports, "retidStruct", { enumerable: true, get: function () { return all_init_Fn_1.retidStruct; } });
Object.defineProperty(exports, "retidPtr", { enumerable: true, get: function () { return all_init_Fn_1.retidPtr; } });
Object.defineProperty(exports, "initidStruct", { enumerable: true, get: function () { return all_init_Fn_1.initidStruct; } });
Object.defineProperty(exports, "retPtr", { enumerable: true, get: function () { return all_init_Fn_1.retPtr; } });
Object.defineProperty(exports, "retStruct", { enumerable: true, get: function () { return all_init_Fn_1.retStruct; } });
Object.defineProperty(exports, "initStruct", { enumerable: true, get: function () { return all_init_Fn_1.initStruct; } });
Object.defineProperty(exports, "atStruct", { enumerable: true, get: function () { return all_init_Fn_1.atStruct; } });
Object.defineProperty(exports, "initAtMsgStruct", { enumerable: true, get: function () { return all_init_Fn_1.initAtMsgStruct; } });
},{"./all_init_Fn":30}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatroomRecurse = void 0;
const getAddress_1 = require("../getAddressData/getAddress");
const data_offset_1 = require("../CommonData/data-offset");
const readString_1 = require("../CommonFn/readString");
const chatroomRecurse = ((node) => {
    const chatroomNodeAddress = (0, getAddress_1.getChatroomNodeAddress)();
    //bianjiepanduan
    if (chatroomNodeAddress.isNull()) {
        return;
    }
    if (node.equals(chatroomNodeAddress)) {
        return;
    }
    for (const item in data_offset_1.chatroomNodeList) {
        if (node.equals(data_offset_1.chatroomNodeList[item])) {
            return;
        }
    }
    data_offset_1.chatroomNodeList.push(node);
    const roomid = (0, readString_1.readWideString)(node.add(0x10));
    const len = node.add(0x50).readU32(); //fanhui32fudianshu
    //const memberJson={}
    if (len > 4) { //
        const memberStr = (0, readString_1.readString)(node.add(0x40));
        if (memberStr.length > 0) {
            const memberList = memberStr.split(/[\\^][G]/);
            const memberJson = {
                roomid: roomid,
                roomMember: memberList
            };
            data_offset_1.chatroomMemberList.push(memberJson);
        }
    }
    const leftNode = node.add(0x0).readPointer();
    const centerNode = node.add(0x04).readPointer();
    const rightNode = node.add(0x08).readPointer();
    chatroomRecurse(leftNode);
    chatroomRecurse(centerNode);
    chatroomRecurse(rightNode);
    const allChatroomMemberJson = data_offset_1.chatroomMemberList;
    return allChatroomMemberJson;
});
exports.chatroomRecurse = chatroomRecurse;
},{"../CommonData/data-offset":1,"../CommonFn/readString":7,"../getAddressData/getAddress":19}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recurse = exports.chatroomRecurse = void 0;
const chatroomRecurse_1 = require("./chatroomRecurse");
Object.defineProperty(exports, "chatroomRecurse", { enumerable: true, get: function () { return chatroomRecurse_1.chatroomRecurse; } });
const recurse_1 = require("./recurse");
Object.defineProperty(exports, "recurse", { enumerable: true, get: function () { return recurse_1.recurse; } });
},{"./chatroomRecurse":32,"./recurse":34}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recurse = void 0;
const getAddress_1 = require("../getAddressData/getAddress");
const data_offset_1 = require("../CommonData/data-offset");
const readString_1 = require("../CommonFn/readString");
const recurse = ((node) => {
    const headerNodeAddress = (0, getAddress_1.getHeaderNodeAddress)();
    if (headerNodeAddress.isNull()) {
        return;
    }
    if (node.equals(headerNodeAddress)) {
        return;
    }
    for (const item in data_offset_1.nodeList) {
        if (node.equals(data_offset_1.nodeList[item])) {
            return;
        }
    }
    data_offset_1.nodeList.push(node);
    //wxid, format relates to registration method
    const wxid = (0, readString_1.readWideString)(node.add(0x38));
    //custom id, if not set return null, and use wxid which should be custom id
    const wx_code = (0, readString_1.readWideString)(node.add(0x4c)) || (0, readString_1.readWideString)(node.add(0x38));
    //custom Nickname
    const name = (0, readString_1.readWideString)(node.add(0x94));
    //alias aka 'remark' in wechat
    const alias = (0, readString_1.readWideString)(node.add(0x80));
    //avatarUrl
    const avatar = (0, readString_1.readWideString)(node.add(0x138));
    //const avatar = Memory.readUtf16String(node.add(0x138).readPointer())
    //contact gender
    const gender = node.add(0x18C).readU32();
    const contactJson = {
        id: wxid,
        code: wx_code,
        name: name,
        alias: alias,
        avatarUrl: avatar,
        gender: gender,
    };
    data_offset_1.contactList.push(contactJson);
    const leftNode = node.add(0x0).readPointer();
    const centerNode = node.add(0x04).readPointer();
    const rightNode = node.add(0x08).readPointer();
    recurse(leftNode);
    recurse(centerNode);
    recurse(rightNode);
    const allContactJson = data_offset_1.contactList;
    return allContactJson;
});
exports.recurse = recurse;
},{"../CommonData/data-offset":1,"../CommonFn/readString":7,"../getAddressData/getAddress":19}],35:[function(require,module,exports){
(function (setImmediate){(function (){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hookLoginEventCallback = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const isLoggedIn_1 = require("../CommonFn/isLoggedIn");
const hookLoginEventCallback = (() => {
    const nativeCallback = new NativeCallback(() => { }, 'void', []);
    const nativeativeFunction = new NativeFunction(nativeCallback, 'void', []);
    Interceptor.attach(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.hook_on_login_offset), {
        onLeave: function (retval) {
            (0, isLoggedIn_1.isLoggedInFunction)();
            setImmediate(() => nativeativeFunction());
            return retval;
        }
    });
    setTimeout(() => {
        if ((0, isLoggedIn_1.isLoggedInFunction)()) {
            setImmediate(() => nativeativeFunction());
        }
    }, 500);
    return nativeCallback;
})();
exports.hookLoginEventCallback = hookLoginEventCallback;
}).call(this)}).call(this,require("timers").setImmediate)

},{"../CommonData/data-offset":1,"../CommonFn/isLoggedIn":6,"timers":39}],36:[function(require,module,exports){
(function (setImmediate){(function (){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hookLogoutEventCallback = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const hookLogoutEventCallback = (() => {
    const nativeCallback = new NativeCallback(() => { }, 'void', ['int32']);
    const nativeativeFunction = new NativeFunction(nativeCallback, 'void', ['int32']);
    Interceptor.attach(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.hook_on_logout_offset), {
        onEnter: function (args) {
            const bySrv = args[0].toInt32();
            setImmediate(() => nativeativeFunction(bySrv));
        }
    });
    return nativeCallback;
})();
exports.hookLogoutEventCallback = hookLogoutEventCallback;
}).call(this)}).call(this,require("timers").setImmediate)

},{"../CommonData/data-offset":1,"timers":39}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hookLogoutEventCallback = exports.hookLoginEventCallback = void 0;
const hookLoginEventCallback_1 = require("./hookLoginEventCallback");
Object.defineProperty(exports, "hookLoginEventCallback", { enumerable: true, get: function () { return hookLoginEventCallback_1.hookLoginEventCallback; } });
const hookLogoutEventCallback_1 = require("./hookLogoutEventCallback");
Object.defineProperty(exports, "hookLogoutEventCallback", { enumerable: true, get: function () { return hookLogoutEventCallback_1.hookLogoutEventCallback; } });
},{"./hookLoginEventCallback":35,"./hookLogoutEventCallback":36}],38:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],39:[function(require,module,exports){
(function (setImmediate,clearImmediate){(function (){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this)}).call(this,require("timers").setImmediate,require("timers").clearImmediate)

},{"process/browser.js":38,"timers":39}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.msg_ = exports.roomid_ = exports.asmAtMsg = exports.recvMsgNativeCallback = exports.initAtMsgStruct = exports.atStruct = exports.initStruct = exports.retStruct = exports.retPtr = exports.initidStruct = exports.retidPtr = exports.retidStruct = exports.initmsgStruct = exports.msgstrPtr = exports.msgStruct = exports.getMyselfIdFunction = exports.getMyselfInfoFunction = exports.getWechatVersionStringFunction = exports.getWechatVersionFunction = exports.getContactNativeFunction = exports.getChatroomMemberNickInfoFunction = exports.nickRetAddr = exports.memberNickBuffAsm = exports.nickBuff = exports.nickStructPtr = exports.nickMemberId = exports.nickRoomId = exports.getChatroomMemberInfoFunction = exports.checkSupportedFunction = exports.getBaseNodeAddress = exports.getChatroomNodeAddress = exports.getHeaderNodeAddress = exports.isLoggedInFunction = exports.getTestInfoFunction = exports.agentReadyCallback = exports.readStringPtr = exports.readWStringPtr = exports.readWideString = exports.readString = exports.chatroomMemberList = exports.chatroomNodeList = exports.contactList = exports.nodeList = exports.currentversion = exports.moduleLoad = exports.moduleBaseAddress = exports.availableVersion = exports.offset = exports.currentVersion = exports.loggedIn = void 0;
exports.hookLogoutEventCallback = exports.hookLoginEventCallback = exports.getQrcodeLoginData = exports.checkQRLoginNativeCallback = exports.callLoginQrcodeFunction = exports.recurse = exports.chatroomRecurse = exports.sendPicMsgNativeFunction = exports.picbuff = exports.picAsm = exports.picWxidPtr = exports.picWxid = exports.pathPtr = exports.imagefilepath = exports.buffwxid = exports.sendMsgNativeFunction = exports.SendMiniProgramNativeFunction = exports.sendAttatchMsgNativeFunction = exports.attatchEaxbuf = exports.attatchEbp = exports.attatchBuf = exports.attatchAsm = exports.attatchPathPtr = exports.attatchPath = exports.attatchWxid = exports.sendAtMsgNativeFunction = exports.ecxBuffer = exports.atid_ = exports.wxid_ = void 0;
const CommonData_1 = require("../../module/CommonData"); //"..//CommonData";
Object.defineProperty(exports, "offset", { enumerable: true, get: function () { return CommonData_1.offset; } });
Object.defineProperty(exports, "availableVersion", { enumerable: true, get: function () { return CommonData_1.availableVersion; } });
Object.defineProperty(exports, "moduleBaseAddress", { enumerable: true, get: function () { return CommonData_1.moduleBaseAddress; } });
Object.defineProperty(exports, "moduleLoad", { enumerable: true, get: function () { return CommonData_1.moduleLoad; } });
Object.defineProperty(exports, "nodeList", { enumerable: true, get: function () { return CommonData_1.nodeList; } });
Object.defineProperty(exports, "contactList", { enumerable: true, get: function () { return CommonData_1.contactList; } });
Object.defineProperty(exports, "chatroomNodeList", { enumerable: true, get: function () { return CommonData_1.chatroomNodeList; } });
Object.defineProperty(exports, "chatroomMemberList", { enumerable: true, get: function () { return CommonData_1.chatroomMemberList; } });
const CommonFn_1 = require("../../module/CommonFn");
Object.defineProperty(exports, "readString", { enumerable: true, get: function () { return CommonFn_1.readString; } });
Object.defineProperty(exports, "readWideString", { enumerable: true, get: function () { return CommonFn_1.readWideString; } });
Object.defineProperty(exports, "readWStringPtr", { enumerable: true, get: function () { return CommonFn_1.readWStringPtr; } });
Object.defineProperty(exports, "readStringPtr", { enumerable: true, get: function () { return CommonFn_1.readStringPtr; } });
Object.defineProperty(exports, "agentReadyCallback", { enumerable: true, get: function () { return CommonFn_1.agentReadyCallback; } });
Object.defineProperty(exports, "getTestInfoFunction", { enumerable: true, get: function () { return CommonFn_1.getTestInfoFunction; } });
Object.defineProperty(exports, "isLoggedInFunction", { enumerable: true, get: function () { return CommonFn_1.isLoggedInFunction; } });
const getAddressData_1 = require("../../module/getAddressData");
Object.defineProperty(exports, "getHeaderNodeAddress", { enumerable: true, get: function () { return getAddressData_1.getHeaderNodeAddress; } });
Object.defineProperty(exports, "getChatroomNodeAddress", { enumerable: true, get: function () { return getAddressData_1.getChatroomNodeAddress; } });
Object.defineProperty(exports, "getBaseNodeAddress", { enumerable: true, get: function () { return getAddressData_1.getBaseNodeAddress; } });
const getData_1 = require("../../module/getData");
Object.defineProperty(exports, "checkSupportedFunction", { enumerable: true, get: function () { return getData_1.checkSupportedFunction; } });
Object.defineProperty(exports, "getChatroomMemberInfoFunction", { enumerable: true, get: function () { return getData_1.getChatroomMemberInfoFunction; } });
Object.defineProperty(exports, "nickRoomId", { enumerable: true, get: function () { return getData_1.nickRoomId; } });
Object.defineProperty(exports, "nickMemberId", { enumerable: true, get: function () { return getData_1.nickMemberId; } });
Object.defineProperty(exports, "nickStructPtr", { enumerable: true, get: function () { return getData_1.nickStructPtr; } });
Object.defineProperty(exports, "nickBuff", { enumerable: true, get: function () { return getData_1.nickBuff; } });
Object.defineProperty(exports, "memberNickBuffAsm", { enumerable: true, get: function () { return getData_1.memberNickBuffAsm; } });
Object.defineProperty(exports, "nickRetAddr", { enumerable: true, get: function () { return getData_1.nickRetAddr; } });
Object.defineProperty(exports, "getChatroomMemberNickInfoFunction", { enumerable: true, get: function () { return getData_1.getChatroomMemberNickInfoFunction; } });
Object.defineProperty(exports, "getContactNativeFunction", { enumerable: true, get: function () { return getData_1.getContactNativeFunction; } });
Object.defineProperty(exports, "getWechatVersionFunction", { enumerable: true, get: function () { return getData_1.getWechatVersionFunction; } });
Object.defineProperty(exports, "getWechatVersionStringFunction", { enumerable: true, get: function () { return getData_1.getWechatVersionStringFunction; } });
const getUserData_1 = require("../../module/getUserData");
Object.defineProperty(exports, "getMyselfInfoFunction", { enumerable: true, get: function () { return getUserData_1.getMyselfInfoFunction; } });
Object.defineProperty(exports, "getMyselfIdFunction", { enumerable: true, get: function () { return getUserData_1.getMyselfIdFunction; } });
const initStruct_1 = require("../../module/initStruct");
Object.defineProperty(exports, "msgStruct", { enumerable: true, get: function () { return initStruct_1.msgStruct; } });
Object.defineProperty(exports, "msgstrPtr", { enumerable: true, get: function () { return initStruct_1.msgstrPtr; } });
Object.defineProperty(exports, "initmsgStruct", { enumerable: true, get: function () { return initStruct_1.initmsgStruct; } });
Object.defineProperty(exports, "retidStruct", { enumerable: true, get: function () { return initStruct_1.retidStruct; } });
Object.defineProperty(exports, "retidPtr", { enumerable: true, get: function () { return initStruct_1.retidPtr; } });
Object.defineProperty(exports, "initidStruct", { enumerable: true, get: function () { return initStruct_1.initidStruct; } });
Object.defineProperty(exports, "retPtr", { enumerable: true, get: function () { return initStruct_1.retPtr; } });
Object.defineProperty(exports, "retStruct", { enumerable: true, get: function () { return initStruct_1.retStruct; } });
Object.defineProperty(exports, "initStruct", { enumerable: true, get: function () { return initStruct_1.initStruct; } });
Object.defineProperty(exports, "atStruct", { enumerable: true, get: function () { return initStruct_1.atStruct; } });
Object.defineProperty(exports, "initAtMsgStruct", { enumerable: true, get: function () { return initStruct_1.initAtMsgStruct; } });
const Message_about_1 = require("../../module/Message_about");
Object.defineProperty(exports, "recvMsgNativeCallback", { enumerable: true, get: function () { return Message_about_1.recvMsgNativeCallback; } });
Object.defineProperty(exports, "asmAtMsg", { enumerable: true, get: function () { return Message_about_1.asmAtMsg; } });
Object.defineProperty(exports, "roomid_", { enumerable: true, get: function () { return Message_about_1.roomid_; } });
Object.defineProperty(exports, "msg_", { enumerable: true, get: function () { return Message_about_1.msg_; } });
Object.defineProperty(exports, "wxid_", { enumerable: true, get: function () { return Message_about_1.wxid_; } });
Object.defineProperty(exports, "atid_", { enumerable: true, get: function () { return Message_about_1.atid_; } });
Object.defineProperty(exports, "ecxBuffer", { enumerable: true, get: function () { return Message_about_1.ecxBuffer; } });
Object.defineProperty(exports, "sendAtMsgNativeFunction", { enumerable: true, get: function () { return Message_about_1.sendAtMsgNativeFunction; } });
Object.defineProperty(exports, "attatchWxid", { enumerable: true, get: function () { return Message_about_1.attatchWxid; } });
Object.defineProperty(exports, "attatchPath", { enumerable: true, get: function () { return Message_about_1.attatchPath; } });
Object.defineProperty(exports, "attatchPathPtr", { enumerable: true, get: function () { return Message_about_1.attatchPathPtr; } });
Object.defineProperty(exports, "attatchAsm", { enumerable: true, get: function () { return Message_about_1.attatchAsm; } });
Object.defineProperty(exports, "attatchBuf", { enumerable: true, get: function () { return Message_about_1.attatchBuf; } });
Object.defineProperty(exports, "attatchEbp", { enumerable: true, get: function () { return Message_about_1.attatchEbp; } });
Object.defineProperty(exports, "attatchEaxbuf", { enumerable: true, get: function () { return Message_about_1.attatchEaxbuf; } });
Object.defineProperty(exports, "sendAttatchMsgNativeFunction", { enumerable: true, get: function () { return Message_about_1.sendAttatchMsgNativeFunction; } });
Object.defineProperty(exports, "SendMiniProgramNativeFunction", { enumerable: true, get: function () { return Message_about_1.SendMiniProgramNativeFunction; } });
Object.defineProperty(exports, "sendMsgNativeFunction", { enumerable: true, get: function () { return Message_about_1.sendMsgNativeFunction; } });
Object.defineProperty(exports, "buffwxid", { enumerable: true, get: function () { return Message_about_1.buffwxid; } });
Object.defineProperty(exports, "imagefilepath", { enumerable: true, get: function () { return Message_about_1.imagefilepath; } });
Object.defineProperty(exports, "pathPtr", { enumerable: true, get: function () { return Message_about_1.pathPtr; } });
Object.defineProperty(exports, "picWxid", { enumerable: true, get: function () { return Message_about_1.picWxid; } });
Object.defineProperty(exports, "picWxidPtr", { enumerable: true, get: function () { return Message_about_1.picWxidPtr; } });
Object.defineProperty(exports, "picAsm", { enumerable: true, get: function () { return Message_about_1.picAsm; } });
Object.defineProperty(exports, "picbuff", { enumerable: true, get: function () { return Message_about_1.picbuff; } });
Object.defineProperty(exports, "sendPicMsgNativeFunction", { enumerable: true, get: function () { return Message_about_1.sendPicMsgNativeFunction; } });
const parse_getData_1 = require("../../module/parse-getData");
Object.defineProperty(exports, "chatroomRecurse", { enumerable: true, get: function () { return parse_getData_1.chatroomRecurse; } });
Object.defineProperty(exports, "recurse", { enumerable: true, get: function () { return parse_getData_1.recurse; } });
const QR_aboutFn_1 = require("../../module/QR-aboutFn");
Object.defineProperty(exports, "callLoginQrcodeFunction", { enumerable: true, get: function () { return QR_aboutFn_1.callLoginQrcodeFunction; } });
Object.defineProperty(exports, "checkQRLoginNativeCallback", { enumerable: true, get: function () { return QR_aboutFn_1.checkQRLoginNativeCallback; } });
Object.defineProperty(exports, "getQrcodeLoginData", { enumerable: true, get: function () { return QR_aboutFn_1.getQrcodeLoginData; } });
const version_hook_1 = require("../../module/version-hook");
Object.defineProperty(exports, "hookLoginEventCallback", { enumerable: true, get: function () { return version_hook_1.hookLoginEventCallback; } });
Object.defineProperty(exports, "hookLogoutEventCallback", { enumerable: true, get: function () { return version_hook_1.hookLogoutEventCallback; } });
let currentVersion = CommonData_1.currentVersion.date;
exports.currentVersion = currentVersion;
exports.currentversion = currentVersion;
let loggedIn = CommonData_1.loggedIn.date;
exports.loggedIn = loggedIn;
},{"../../module/CommonData":2,"../../module/CommonFn":5,"../../module/Message_about":9,"../../module/QR-aboutFn":18,"../../module/getAddressData":20,"../../module/getData":27,"../../module/getUserData":29,"../../module/initStruct":31,"../../module/parse-getData":33,"../../module/version-hook":37}]},{},[40])(40)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtb2R1bGUvQ29tbW9uRGF0YS9kYXRhLW9mZnNldC50cyIsIm1vZHVsZS9Db21tb25EYXRhL2luZGV4LnRzIiwibW9kdWxlL0NvbW1vbkZuL2FnZW50UmVhZHlDYWxsYmFjay50cyIsIm1vZHVsZS9Db21tb25Gbi9nZXRUZXN0SW5mby50cyIsIm1vZHVsZS9Db21tb25Gbi9pbmRleC50cyIsIm1vZHVsZS9Db21tb25Gbi9pc0xvZ2dlZEluLnRzIiwibW9kdWxlL0NvbW1vbkZuL3JlYWRTdHJpbmcudHMiLCJtb2R1bGUvTWVzc2FnZV9hYm91dC9TZW5kTWluaVByb2dyYW1OYXRpdmVGdW5jdGlvbi50cyIsIm1vZHVsZS9NZXNzYWdlX2Fib3V0L2luZGV4LnRzIiwibW9kdWxlL01lc3NhZ2VfYWJvdXQvcmVjdk1zZ05hdGl2ZUNhbGxiYWNrLnRzIiwibW9kdWxlL01lc3NhZ2VfYWJvdXQvc2VuZEF0TXNnTmF0aXZlRnVuY3Rpb24udHMiLCJtb2R1bGUvTWVzc2FnZV9hYm91dC9zZW5kQXR0YXRjaE1zZ05hdGl2ZUZ1bmN0aW9uLnRzIiwibW9kdWxlL01lc3NhZ2VfYWJvdXQvc2VuZE1zZ05hdGl2ZUZ1bmN0aW9uLnRzIiwibW9kdWxlL01lc3NhZ2VfYWJvdXQvc2VuZFBpY01zZ05hdGl2ZUZ1bmN0aW9uLnRzIiwibW9kdWxlL1FSLWFib3V0Rm4vY2FsbExvZ2luUXJjb2RlRnVuY3Rpb24udHMiLCJtb2R1bGUvUVItYWJvdXRGbi9jaGVja1FSTG9naW5OYXRpdmVDYWxsYmFjay50cyIsIm1vZHVsZS9RUi1hYm91dEZuL2dldFFyY29kZUxvZ2luRGF0YS50cyIsIm1vZHVsZS9RUi1hYm91dEZuL2luZGV4LnRzIiwibW9kdWxlL2dldEFkZHJlc3NEYXRhL2dldEFkZHJlc3MudHMiLCJtb2R1bGUvZ2V0QWRkcmVzc0RhdGEvaW5kZXgudHMiLCJtb2R1bGUvZ2V0RGF0YS9jaGVja1N1cHBvcnRlZC50cyIsIm1vZHVsZS9nZXREYXRhL2dldENoYXRyb29tTWVtYmVySW5mby50cyIsIm1vZHVsZS9nZXREYXRhL2dldENoYXRyb29tTWVtYmVyTmlja0luZm9GdW5jdGlvbi50cyIsIm1vZHVsZS9nZXREYXRhL2dldENvbnRhY3ROYXRpdmVGdW5jdGlvbi50cyIsIm1vZHVsZS9nZXREYXRhL2dldFdlY2hhdFZlcnNpb25GdW5jdGlvbi50cyIsIm1vZHVsZS9nZXREYXRhL2dldFdlY2hhdFZlcnNpb25TdHJpbmcudHMiLCJtb2R1bGUvZ2V0RGF0YS9pbmRleC50cyIsIm1vZHVsZS9nZXRVc2VyRGF0YS9nZXRVc2VyRGF0YS50cyIsIm1vZHVsZS9nZXRVc2VyRGF0YS9pbmRleC50cyIsIm1vZHVsZS9pbml0U3RydWN0L2FsbF9pbml0X0ZuLnRzIiwibW9kdWxlL2luaXRTdHJ1Y3QvaW5kZXgudHMiLCJtb2R1bGUvcGFyc2UtZ2V0RGF0YS9jaGF0cm9vbVJlY3Vyc2UudHMiLCJtb2R1bGUvcGFyc2UtZ2V0RGF0YS9pbmRleC50cyIsIm1vZHVsZS9wYXJzZS1nZXREYXRhL3JlY3Vyc2UudHMiLCJtb2R1bGUvdmVyc2lvbi1ob29rL2hvb2tMb2dpbkV2ZW50Q2FsbGJhY2sudHMiLCJtb2R1bGUvdmVyc2lvbi1ob29rL2hvb2tMb2dvdXRFdmVudENhbGxiYWNrLnRzIiwibW9kdWxlL3ZlcnNpb24taG9vay9pbmRleC50cyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qcyIsInNyYy9hZ2VudC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQSx5QkFBeUI7QUFDekIsZ0NBQWdDOzs7QUFFaEMsSUFBSTtBQUNKLE1BQU0sTUFBTSxHQUFHO0lBQ2IsV0FBVyxFQUFFLFNBQVM7SUFDdEIsYUFBYSxFQUFFLElBQUk7SUFDbkIsb0JBQW9CLEVBQUUsUUFBUTtJQUM5QixVQUFVLEVBQUUsUUFBUTtJQUNwQixvQkFBb0IsRUFBRSxLQUFLO0lBQzNCLGVBQWUsRUFBRSxTQUFTO0lBQzFCLFdBQVcsRUFBRSxTQUFTO0lBQ3RCLG1CQUFtQixFQUFFLFNBQVM7SUFDOUIsbUJBQW1CLEVBQUUsU0FBUztJQUM5QixvQkFBb0IsRUFBRSxRQUFRO0lBQzlCLHFCQUFxQixFQUFFLFFBQVE7SUFDL0Isd0JBQXdCLEVBQUUsUUFBUTtJQUNsQywwQkFBMEIsRUFBRSxRQUFRO0lBQ3BDLDhCQUE4QixFQUFFLFFBQVE7SUFDeEMsb0JBQW9CLEVBQUUsU0FBUztJQUMvQix3QkFBd0IsRUFBRSxRQUFRO0lBQ2xDLHdCQUF3QixFQUFFLFFBQVE7SUFDbEMsd0JBQXdCLEVBQUUsUUFBUTtJQUNsQyx3QkFBd0IsRUFBRSxPQUFPO0lBQ2pDLHdCQUF3QixFQUFFLFFBQVE7SUFDbEMseUJBQXlCLEVBQUUsUUFBUTtJQUNuQyx5QkFBeUIsRUFBRSxRQUFRO0lBQ25DLHlCQUF5QixFQUFFLFFBQVE7SUFDbkMseUJBQXlCLEVBQUUsUUFBUTtJQUNuQyx5QkFBeUIsRUFBRSxRQUFRO0lBQ25DLHlCQUF5QixFQUFFLFFBQVE7SUFDbkMsc0JBQXNCLEVBQUUsU0FBUztJQUNqQyxpQ0FBaUMsRUFBRSxRQUFRO0lBQzNDLGlDQUFpQyxFQUFFLFFBQVE7SUFDM0MsaUNBQWlDLEVBQUUsUUFBUTtJQUMzQyxpQ0FBaUMsRUFBRSxRQUFRO0NBQzVDLENBQUM7QUF3QkEsd0JBQU07QUF2QlIsV0FBVztBQUdYLHVFQUF1RTtBQUN2RSxNQUFNLGdCQUFnQixHQUFXLFVBQVUsQ0FBQSxDQUFDLGFBQWE7QUFvQnZELDRDQUFnQjtBQW5CbEIsTUFBTSxpQkFBaUIsR0FBa0IsTUFBTSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQTtBQW9CN0UsOENBQWlCO0FBbkJuQixNQUFNLFVBQVUsR0FBVyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBb0JyRCxnQ0FBVTtBQW5CWixpQ0FBaUM7QUFDakMsSUFBSSxjQUFjLEdBQUc7SUFDbEIsSUFBSSxFQUFFLENBQUM7Q0FDVCxDQUFBO0FBaUJDLHdDQUFjO0FBZmhCLElBQUksUUFBUSxHQUFVLEVBQUUsQ0FBQSxDQUFFLGFBQWE7QUFnQnJDLDRCQUFRO0FBZlYsSUFBSSxXQUFXLEdBQVUsRUFBRSxDQUFBLENBQUMsYUFBYTtBQWdCdkMsa0NBQVc7QUFkYixJQUFJLGdCQUFnQixHQUFpQyxFQUFFLENBQUEsQ0FBQyxjQUFjO0FBZXBFLDRDQUFnQjtBQWRsQixJQUFJLGtCQUFrQixHQUFpQyxFQUFFLENBQUEsQ0FBQSxjQUFjO0FBZXJFLGdEQUFrQjtBQWRwQixnQ0FBZ0M7QUFDaEMsSUFBSSxRQUFRLEdBQUU7SUFDWixJQUFJLEVBQUMsS0FBSztDQUNYLENBQUE7QUFZQyw0QkFBUTs7Ozs7QUNyRVYsK0NBV3NCO0FBR3BCLHVGQWJBLG9CQUFNLE9BYUE7QUFDTixpR0FiQSw4QkFBZ0IsT0FhQTtBQUNoQixrR0FiQSwrQkFBaUIsT0FhQTtBQUNqQiwyRkFiQSx3QkFBVSxPQWFBO0FBQ1YsK0ZBYkEsNEJBQWMsT0FhQTtBQUNkLHlGQWJBLHNCQUFRLE9BYUE7QUFDUiw0RkFiQSx5QkFBVyxPQWFBO0FBQ1gsaUdBYkEsOEJBQWdCLE9BYUE7QUFDaEIsbUdBYkEsZ0NBQWtCLE9BYUE7QUFDbEIseUZBYkEsc0JBQVEsT0FhQTs7Ozs7QUN2QlYsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLEdBQWdDLEVBQUU7SUFDNUQsTUFBTSxjQUFjLEdBQStCLElBQUksY0FBYyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDNUYsTUFBTSxtQkFBbUIsR0FBNkIsSUFBSSxjQUFjLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUVwRyxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsbUJBQW1CLEVBQUUsQ0FBQTtJQUN2QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDUixPQUFPLGNBQWMsQ0FBQTtBQUN2QixDQUFDLENBQUMsRUFBRSxDQUFBO0FBR0YsZ0RBQWtCOzs7OztBQ1ZwQixNQUFNLG1CQUFtQixHQUFhLENBQUMsR0FBUyxFQUFFO0lBQ2hELE1BQU0sbUJBQW1CLEdBQWEsSUFBSSxjQUFjLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUNyRixtQkFBbUIsRUFBRSxDQUFBO0FBRXZCLENBQUMsQ0FBQyxDQUFBO0FBR0Esa0RBQW1COzs7OztBQ1JyQiw2Q0FLcUI7QUFPakIsMkZBWEYsdUJBQVUsT0FXRTtBQUNWLCtGQVhGLDJCQUFjLE9BV0U7QUFDZCwrRkFYRiwyQkFBYyxPQVdFO0FBQ2QsOEZBWEYsMEJBQWEsT0FXRTtBQVRqQiw2REFBMEQ7QUFVdEQsbUdBVkssdUNBQWtCLE9BVUw7QUFUdEIsK0NBQW9EO0FBVWhELG9HQVZLLGlDQUFtQixPQVVMO0FBVHZCLDZDQUFrRDtBQVU5QyxtR0FWSywrQkFBa0IsT0FVTDs7Ozs7QUNsQnRCLDJEQUFrRTtBQUNsRSwyREFBb0Q7QUFDcEQsTUFBTSxrQkFBa0IsR0FBYSxDQUFDLEdBQVksRUFBRTtJQUNsRCxzQkFBUSxDQUFDLElBQUksR0FBRywrQkFBaUIsQ0FBQyxHQUFHLENBQUMsb0JBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU8sRUFBd0IsQ0FBQTtJQUNqRyxPQUFPLENBQUMsQ0FBQyxzQkFBUSxDQUFDLElBQUksQ0FBQTtBQUN4QixDQUFDLENBQUMsQ0FBQTtBQUdBLGdEQUFrQjs7Ozs7QUNQcEIsTUFBTSxhQUFhLEdBQUcsQ0FBQyxPQUFZLEVBQU8sRUFBRTtJQUMxQyxNQUFNLElBQUksR0FBUSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDOUIsTUFBTSxJQUFJLEdBQVcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUMzQyxNQUFNLFFBQVEsR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQy9DLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFBO0lBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7SUFDaEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7SUFDeEIsSUFBSSxRQUFRLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ2pELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO0tBQzlCO0lBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUE7SUFDNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUE7SUFDbEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUE7SUFDbEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLEVBQUUsR0FBRyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFBO0lBQ3JGLElBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxFQUFFLEdBQUcsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQTtJQUMzRixJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsRUFBRSxHQUFHLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUE7SUFFM0YsMkhBQTJIO0lBQzNILDhEQUE4RDtJQUM5RCxnRkFBZ0Y7SUFFaEYsT0FBTyxJQUFJLENBQUE7QUFDYixDQUFDLENBQUE7QUErQkMsc0NBQWE7QUE3QmYsTUFBTSxVQUFVLEdBQUcsQ0FBQyxPQUFZLEVBQVUsRUFBRTtJQUMxQyxPQUFPLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQTtBQUNoRCxDQUFDLENBQUE7QUF3QkMsZ0NBQVU7QUF0QlosTUFBTSxjQUFjLEdBQUcsQ0FBQyxPQUFZLEVBQU8sRUFBRTtJQUMzQyxNQUFNLElBQUksR0FBUSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDOUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUNsQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ3RDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO0lBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO0lBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUE7SUFDcEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxHQUFHLEVBQUUsR0FBRyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFBO0lBRWpHLHdIQUF3SDtJQUN4SCx3SEFBd0g7SUFDeEgsc0ZBQXNGO0lBRXRGLE9BQU8sSUFBSSxDQUFBO0FBQ2IsQ0FBQyxDQUFBO0FBU0Msd0NBQWM7QUFQaEIsTUFBTSxjQUFjLEdBQUcsQ0FBQyxPQUFZLEVBQVUsRUFBRTtJQUM5QyxPQUFPLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQTtBQUNsRCxDQUFDLENBQUE7QUFJQyx3Q0FBYzs7Ozs7QUNwRGhCLDREQUFtRTtBQUNuRSwyREFBOEQ7QUFDOUQsMkRBQXlEO0FBRXpELE1BQU0sNkJBQTZCLEdBQUcsQ0FBQyxDQUFDLFdBQWUsRUFBQyxTQUFhLEVBQUMsTUFBVSxFQUFFLEVBQUU7SUFDbEYseUVBQXlFO0lBQ3pFLFdBQVcsR0FBQyxFQUFFLENBQUM7SUFFZixJQUFJLE9BQU8sR0FBSyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvQyxJQUFJLE9BQU8sR0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLElBQUksT0FBTyxHQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsSUFBSSxLQUFLLEdBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixJQUFJLFlBQVksR0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2RCxpQ0FBaUM7SUFFakMsSUFBSSxXQUFXLEdBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUN4RCxXQUFXLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDMUMsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLDBCQUEwQjtJQUNsRSxjQUFjLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7U0FDL0MsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztTQUMxQyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1NBQzFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1NBQ3JCLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVmLElBQUksYUFBYSxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBQSxtQ0FBcUIsR0FBRSxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3pELDZCQUE2QjtJQUU3QixJQUFJLGFBQWEsR0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQzVELGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM5QyxJQUFJLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQywwQkFBMEI7SUFDcEUsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7U0FDbkQsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztTQUM1QyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1NBQzVDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1NBQ3JCLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVoQiw4QkFBOEI7SUFDN0IsSUFBSSxhQUFhLEdBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUN4RCxhQUFhLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUMsSUFBSSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUMsMEJBQTBCO0lBQ3BFLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1NBQ25ELFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7U0FDeEMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztTQUN4QyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztTQUNyQixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFZixpOENBQWk4QztJQUNqOEMsc0JBQXNCO0lBQ3RCLElBQUksSUFBSSxHQUFDLElBQUEsMEJBQVksRUFBQyxNQUFNLENBQUMsQ0FBQTtJQUM3QixvQkFBb0I7SUFDcEIsaUNBQWlDO0lBQ2pDLGlDQUFpQztJQUNqQyxxQkFBcUI7SUFDckIsdUJBQXVCO0lBQ3ZCLHlFQUF5RTtJQUV6RSxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFO1FBQ2pELElBQUksRUFBRSxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO1FBQzdDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNmLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNmLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzlCLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEMsRUFBRSxDQUFDLGNBQWMsQ0FBQywrQkFBaUIsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7UUFFN0QsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUdwQixFQUFFLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUcsS0FBSztRQUN4QyxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDOUIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRTFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUM3QyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLEVBQUUsQ0FBQyxjQUFjLENBQUMsK0JBQWlCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDbkQsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFFNUIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUNqQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLEVBQUUsQ0FBQyxjQUFjLENBQUMsK0JBQWlCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFbEQsRUFBRSxDQUFDLFVBQVUsQ0FBQywrQkFBaUIsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUMxRCxFQUFFLENBQUMsVUFBVSxDQUFDLCtCQUFpQixDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQzFELEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEMsRUFBRSxDQUFDLGNBQWMsQ0FBQywrQkFBaUIsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNuRCxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUUzQixFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDZCxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDZCxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDWixFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDYixDQUFDLENBQUMsQ0FBQTtJQUVGLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxjQUFjLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUN4RSxtQkFBbUIsRUFBRSxDQUFBO0FBR3ZCLENBQUMsQ0FBQyxDQUFBO0FBR0Esc0VBQTZCOzs7OztBQ3BHL0IsbUVBQWdFO0FBa0M5RCxzR0FsQ08sNkNBQXFCLE9Ba0NQO0FBakN2Qix1RUFRbUM7QUEwQmpDLHlGQWpDQSxrQ0FBUSxPQWlDQTtBQUNSLHdGQWpDQSxpQ0FBTyxPQWlDQTtBQUNQLHFGQWpDQSw4QkFBSSxPQWlDQTtBQUNKLHNGQWpDQSwrQkFBSyxPQWlDQTtBQUNMLHNGQWpDQSwrQkFBSyxPQWlDQTtBQUNMLDBGQWpDQSxtQ0FBUyxPQWlDQTtBQUNULHdHQWpDQSxpREFBdUIsT0FpQ0E7QUEvQnpCLGlGQVN3QztBQXVCdEMsNEZBL0JBLDBDQUFXLE9BK0JBO0FBQ1gsNEZBL0JBLDBDQUFXLE9BK0JBO0FBQ1gsK0ZBL0JBLDZDQUFjLE9BK0JBO0FBQ2QsMkZBL0JBLHlDQUFVLE9BK0JBO0FBQ1YsMkZBL0JBLHlDQUFVLE9BK0JBO0FBQ1YsMkZBL0JBLHlDQUFVLE9BK0JBO0FBQ1YsOEZBL0JBLDRDQUFhLE9BK0JBO0FBQ2IsNkdBL0JBLDJEQUE0QixPQStCQTtBQTdCOUIsbUZBQWdGO0FBOEI5RSw4R0E5Qk8sNkRBQTZCLE9BOEJQO0FBN0IvQixtRUFBZ0U7QUE4QjlELHNHQTlCTyw2Q0FBcUIsT0E4QlA7QUE3QnZCLHlFQVNtQztBQXFCakMseUZBN0JBLG1DQUFRLE9BNkJBO0FBQ1IsOEZBN0JBLHdDQUFhLE9BNkJBO0FBQ2Isd0ZBN0JBLGtDQUFPLE9BNkJBO0FBQ1Asd0ZBN0JBLGtDQUFPLE9BNkJBO0FBQ1AsMkZBN0JBLHFDQUFVLE9BNkJBO0FBQ1YsdUZBN0JBLGlDQUFNLE9BNkJBO0FBQ04sd0ZBN0JBLGtDQUFPLE9BNkJBO0FBQ1AseUdBN0JBLG1EQUF3QixPQTZCQTs7Ozs7O0FDM0QxQiwyREFBb0U7QUFFcEUsTUFBTSxxQkFBcUIsR0FBRyxDQUFDLEdBQUcsRUFBRTtJQUVsQyxNQUFNLGNBQWMsR0FBRyxJQUFJLGNBQWMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBQzVILE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxjQUFjLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUV0SSxXQUFXLENBQUMsTUFBTSxDQUNoQiwrQkFBaUIsQ0FBQyxHQUFHLENBQUMsb0JBQU0sQ0FBQyxVQUFVLENBQUMsRUFDeEM7UUFDRSxPQUFPO1lBQ0wsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQXlCLENBQUE7WUFDeEMsdURBQXVEO1lBQ3ZELE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBLENBQUEsWUFBWTtZQUV6QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQ3hDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUEsQ0FBQSxhQUFhO1lBRXJELElBQUksT0FBTyxHQUFHLENBQUMsRUFBRTtnQkFFZixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO2dCQUNoRCxzREFBc0Q7Z0JBQ3RELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBRTNELE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUE7Z0JBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQTtnQkFHcEQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFBO2dCQUNyQixJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUE7Z0JBQ2xCLElBQUksWUFBWSxHQUFPLElBQUksQ0FBQTtnQkFDM0IsSUFBSSxPQUFPLElBQUksQ0FBQyxFQUFFLEVBQUMsV0FBVztvQkFDNUIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDN0MsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDMUMsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGVBQWUsRUFBRSxDQUFDO29CQUMzQyxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7b0JBQ3JDLElBQUksT0FBTyxHQUFHO3dCQUNaLFNBQVM7d0JBQ1QsU0FBUzt3QkFDVCxNQUFNO3dCQUNOLE1BQU0sQ0FBQSw4QkFBOEI7cUJBQ3JDLENBQUE7b0JBQ0QsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDdEMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDakQ7cUJBQU07b0JBQ0wsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUE7b0JBQ3pDLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO29CQUNwRCxZQUFZLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTtvQkFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFBO2lCQUNsRDtnQkFFRCwyREFBMkQ7Z0JBQzNELHdCQUF3QjtnQkFDeEIsNkNBQTZDO2dCQUM3QywyREFBMkQ7Z0JBQzNELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUEsQ0FBQyxTQUFTO2dCQUN4RCxJQUFJLHFCQUFxQixHQUFPLElBQUksQ0FBQTtnQkFDcEMsSUFBSSxZQUFZLElBQUksQ0FBQyxFQUFFLEVBQUMsaUNBQWlDO29CQUV2RCxxQkFBcUIsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO29CQUMxQyxxQkFBcUIsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtpQkFFL0M7cUJBQU07b0JBRUwsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO29CQUN6RCxNQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7b0JBQ3BFLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtvQkFDekQsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxtQkFBbUIsRUFBRSxtQkFBbUIsQ0FBQyxDQUFBO2lCQUU3RTtnQkFFRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO2dCQUM1QyxJQUFJLGVBQWUsR0FBTyxJQUFJLENBQUE7Z0JBQzlCLElBQUksVUFBVSxJQUFJLENBQUMsRUFBRTtvQkFFbkIsZUFBZSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7b0JBQ3BDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtpQkFFekM7cUJBQU07b0JBQ0wsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtvQkFFbkQsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtvQkFDOUQsZUFBZSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUE7b0JBQzdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQTtpQkFDM0Q7Z0JBRUQsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLHFCQUFxQixFQUFFLGVBQWUsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO2FBQy9IO1FBQ0gsQ0FBQztLQUNGLENBQUMsQ0FBQTtJQUNKLE9BQU8sY0FBYyxDQUFBO0FBQ3ZCLENBQUMsQ0FBQyxFQUFFLENBQUE7QUFFSSxzREFBcUI7Ozs7Ozs7QUM3RjdCLDJEQUFpRztBQUNqRywyREFBb0U7QUFFcEUsSUFBSSxRQUFRLEdBQU8sSUFBSSxDQUFBO0FBaUR0Qiw0QkFBUTtBQWhEVCxJQUFJLE9BQVcsRUFBRSxJQUFRLEVBQUUsS0FBUyxFQUFFLEtBQVMsQ0FBQTtBQWlEOUMsMEJBQU87QUFDUCxvQkFBSTtBQUNKLHNCQUFLO0FBQ0wsc0JBQUs7QUFuRE4sSUFBSSxTQUFhLENBQUE7QUFvRGhCLDhCQUFTO0FBbkRWLE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyxDQUFDLE1BQVUsRUFBRSxJQUFRLEVBQUUsU0FBYSxFQUFFLEVBQUU7SUFDdkUsbUJBQUEsUUFBUSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3pDLG9CQUFBLFNBQVMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRy9CLGtCQUFBLE9BQU8sR0FBRyxJQUFBLHdCQUFVLEVBQUMsTUFBTSxDQUFDLENBQUE7SUFDNUIsZ0JBQUEsS0FBSyxHQUFHLElBQUEsMEJBQVksRUFBQyxTQUFTLENBQUMsQ0FBQTtJQUMvQixlQUFBLElBQUksR0FBRyxJQUFBLDJCQUFhLEVBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUIsZ0JBQUEsS0FBSyxHQUFHLElBQUEsNkJBQWUsRUFBQyxLQUFLLENBQUMsQ0FBQTtJQUU5QixNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFO1FBQ2xELElBQUksRUFBRSxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO1FBQzlDLG1DQUFtQztRQUVuQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDZixFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFZixFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUUsT0FBTztRQUV6QixFQUFFLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQ2pDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUEsQ0FBQSxNQUFNO1FBRXRDLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDcEIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUVwQix1REFBdUQ7UUFDdkQsRUFBRSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQSxDQUFBLFNBQVM7UUFFNUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQTtRQUVyQyxFQUFFLENBQUMsY0FBYyxDQUFDLCtCQUFpQixDQUFDLEdBQUcsQ0FDckMsb0JBQU0sQ0FBQyxvQkFBb0IsQ0FDNUIsQ0FBQyxDQUFBO1FBQ0YsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFFM0IsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ2IsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ2IsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ1gsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ1osQ0FBQyxDQUFDLENBQUE7SUFFRixNQUFNLG1CQUFtQixHQUE2QixJQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ25HLG1CQUFtQixFQUFFLENBQUE7QUFDdkIsQ0FBQyxDQUFDLENBQUE7QUFTRCwwREFBdUI7Ozs7O0FDMUR4QiwyREFBd0Q7QUFDeEQsMkRBQW9FO0FBRXBFLElBQUksV0FBVyxHQUFPLElBQUksQ0FBQTtBQTZGekIsa0NBQVc7QUE1RlosSUFBSSxXQUFXLEdBQVEsSUFBSSxDQUFBO0FBNkYxQixrQ0FBVztBQTVGWixJQUFJLGNBQWMsR0FBUSxJQUFJLENBQUE7QUE2RjdCLHdDQUFjO0FBNUZmLElBQUksVUFBVSxHQUFRLElBQUksQ0FBQTtBQTZGekIsZ0NBQVU7QUE1RlgsSUFBSSxVQUFVLEdBQVEsSUFBSSxDQUFBO0FBNkZ6QixnQ0FBVTtBQTVGWCxJQUFJLFVBQVUsR0FBUSxJQUFJLENBQUE7QUE2RnpCLGdDQUFVO0FBNUZYLElBQUksYUFBYSxHQUFRLElBQUksQ0FBQTtBQTZGNUIsc0NBQWE7QUE1RmQsTUFBTSw0QkFBNEIsR0FBRyxDQUFDLENBQUMsU0FBYSxFQUFHLElBQVEsRUFBUSxFQUFFO0lBRXZFLHFCQUFBLFVBQVUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMzQyxxQkFBQSxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNoQyxxQkFBQSxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMvQix3QkFBQSxhQUFhLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUVsQyxzQkFBQSxXQUFXLEdBQUcsSUFBQSwwQkFBWSxFQUFDLFNBQVMsQ0FBQyxDQUFBO0lBR3JDLHlCQUFBLGNBQWMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ2xELGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUVyQyxzQkFBQSxXQUFXLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNoQyxXQUFXLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7U0FDL0MsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztTQUNuQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7SUFFdEMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsRUFBRTtRQUNwRCxJQUFJLEVBQUUsR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQTtRQUNoRCxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDZixFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFZixFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUM1QixzQ0FBc0M7UUFDdEMsd0NBQXdDO1FBQ3hDLDZDQUE2QztRQUM3QywrQ0FBK0M7UUFFL0MsNEJBQTRCO1FBRTVCLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUE7UUFDdkMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQTtRQUN6QyxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUM3QixFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3BCLEVBQUUsQ0FBQyxjQUFjLENBQUMsK0JBQWlCLENBQUMsR0FBRyxDQUNyQyxvQkFBTSxDQUFDLHlCQUF5QixDQUNqQyxDQUFDLENBQUE7UUFHRixFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2hCLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQzVCLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQzdCLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNqQixFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsK0JBQWlCLENBQUMsR0FBRyxDQUFDLG9CQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7UUFDL0UsRUFBRSxDQUFDLGNBQWMsQ0FBQywrQkFBaUIsQ0FBQyxHQUFHLENBQ3JDLG9CQUFNLENBQUMseUJBQXlCLENBQ2pDLENBQUMsQ0FBQTtRQUVGLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQzVCLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQzdCLEVBQUUsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7UUFDcEMsRUFBRSxDQUFDLGNBQWMsQ0FBQywrQkFBaUIsQ0FBQyxHQUFHLENBQ3JDLG9CQUFNLENBQUMseUJBQXlCLENBQ2pDLENBQUMsQ0FBQTtRQUVGLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQzVCLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQzdCLEVBQUUsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7UUFDcEMsRUFBRSxDQUFDLGNBQWMsQ0FBQywrQkFBaUIsQ0FBQyxHQUFHLENBQ3JDLG9CQUFNLENBQUMseUJBQXlCLENBQ2pDLENBQUMsQ0FBQTtRQUVGLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUE7UUFDdEMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNwQixFQUFFLENBQUMsY0FBYyxDQUFDLCtCQUFpQixDQUFDLEdBQUcsQ0FDckMsb0JBQU0sQ0FBQyx5QkFBeUIsQ0FDakMsQ0FBQyxDQUFBO1FBRUYsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDN0IsRUFBRSxDQUFDLGNBQWMsQ0FBQywrQkFBaUIsQ0FBQyxHQUFHLENBQ3JDLG9CQUFNLENBQUMseUJBQXlCLENBQ2pDLENBQUMsQ0FBQTtRQUVGLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUNiLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUNiLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUNYLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUVaLENBQUMsQ0FBQyxDQUFBO0lBRUYsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQzNFLG1CQUFtQixFQUFFLENBQUE7QUFDdkIsQ0FBQyxDQUFDLENBQUE7QUFVRCxvRUFBNEI7Ozs7O0FDdkc3QiwyREFBb0U7QUFDcEUsTUFBTSxxQkFBcUIsR0FBRyxDQUFDLEdBQUcsRUFBRTtJQUNsQyw2RkFBNkY7SUFDN0YsTUFBTSxTQUFTLEdBQWlCLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDbkQsTUFBTSxVQUFVLEdBQWlCLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQy9ELE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUU7UUFDcEQsSUFBSSxFQUFFLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUE7UUFFaEQsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNwQixFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUM3QixFQUFFLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDZCxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUE7UUFFZCxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUUsT0FBTztRQUN6QixFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUUsT0FBTztRQUV6QixFQUFFLENBQUMscUJBQXFCLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQSxDQUFDLFFBQVE7UUFDcEQsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFFLE9BQU87UUFFN0IsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUEsQ0FBQyxRQUFRO1FBQ3BELEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUE7UUFFckMsb0JBQW9CO1FBQ3BCLEVBQUUsQ0FBQyxjQUFjLENBQUMsK0JBQWlCLENBQUMsR0FBRyxDQUNyQyxvQkFBTSxDQUFDLG9CQUFvQixDQUM1QixDQUFDLENBQUE7UUFDRixFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUUzQixFQUFFLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDYixFQUFFLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDYixFQUFFLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQSxDQUFDLHNEQUFzRDtRQUN2RixFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ25CLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUVYLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNaLENBQUMsQ0FBQyxDQUFBO0lBRUY7Ozs7T0FJRztJQUVILE1BQU0saUJBQWlCLEdBQUcsSUFBSSxjQUFjLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFBO0lBRXhGLE1BQU0sT0FBTyxHQUFHLENBQ2QsUUFBWSxFQUNaLE9BQVcsRUFDWCxFQUFFO1FBQ0YsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUN6RCxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBRXZELFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN0QyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUE7UUFFcEMsTUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQSxDQUFDLFFBQVE7UUFFM0QsZ0NBQWdDO1FBQ2hDLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQSxDQUFDLDBCQUEwQjtRQUNsRixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUEsQ0FBQywwQkFBMEI7UUFFakYsY0FBYzthQUNYLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO2FBQ2xDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQzthQUNsQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUVoQyxhQUFhO2FBQ1YsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7YUFDakMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO2FBQ2pDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBRS9CLGlCQUFpQixDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsQ0FBQTtJQUNsRCxDQUFDLENBQUE7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxNQUFNLFNBQVMsR0FBRztRQUNoQixTQUFTO1FBQ1QsVUFBVTtRQUNWLGlCQUFpQjtRQUNqQixPQUFPO0tBQ1IsQ0FBQTtJQUVELE9BQU8sQ0FBQyxHQUFHLElBQVUsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQWtDLENBQUMsQ0FBQSxDQUFDLGlFQUFpRTtBQUN0SixDQUFDLENBQUMsRUFBRSxDQUFBO0FBRUYsc0RBQXFCOzs7OztBQzlGdkIsMkRBQW9FO0FBQ3BFLElBQUksUUFBUSxHQUFPLElBQUksQ0FBQTtBQXlFckIsNEJBQVE7QUF4RVYsSUFBSSxhQUFhLEdBQVEsSUFBSSxDQUFBO0FBeUUzQixzQ0FBYTtBQXhFZixJQUFJLE9BQU8sR0FBUSxJQUFJLENBQUE7QUF5RXJCLDBCQUFPO0FBeEVULElBQUksT0FBTyxHQUFRLElBQUksQ0FBQTtBQXlFckIsMEJBQU87QUF4RVQsSUFBSSxVQUFVLEdBQVEsSUFBSSxDQUFBO0FBeUV4QixnQ0FBVTtBQXhFWixJQUFJLE1BQU0sR0FBUSxJQUFJLENBQUE7QUF5RXBCLHdCQUFNO0FBeEVSLElBQUksT0FBTyxHQUFRLElBQUksQ0FBQTtBQXlFckIsMEJBQU87QUF4RVQsTUFBTSx3QkFBd0IsR0FBRyxDQUFDLENBQUMsU0FBYSxFQUFHLElBQVEsRUFBRyxFQUFFO0lBRTlELGlCQUFBLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN2QyxtQkFBQSxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM3QixrQkFBQSxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUU3QixrQkFBQSxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUMzQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUE7SUFFOUIsd0JBQUEsYUFBYSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDbEMsYUFBYSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1NBQzFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7U0FDbkMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBRXRDLHFCQUFBLFVBQVUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ25ELFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUV0QyxrQkFBQSxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM1QixPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7U0FDNUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztTQUN4QyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7SUFFM0MsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsRUFBRTtRQUNoRCxJQUFJLEVBQUUsR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTtRQUM1QyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDZixFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFZixFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUM1QixFQUFFLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBRXBDLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBRTdCLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDcEIsRUFBRSxDQUFDLGNBQWMsQ0FBQywrQkFBaUIsQ0FBQyxHQUFHLENBQ3JDLG9CQUFNLENBQUMsd0JBQXdCLENBQ2hDLENBQUMsQ0FBQTtRQUVGLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUE7UUFDekMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUVwQixFQUFFLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBQ25DLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7UUFFcEIsRUFBRSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUNuQyxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3BCLEVBQUUsQ0FBQyxjQUFjLENBQUMsK0JBQWlCLENBQUMsR0FBRyxDQUNyQyxvQkFBTSxDQUFDLHdCQUF3QixDQUNoQyxDQUFDLENBQUE7UUFFRixFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUM3QixFQUFFLENBQUMsY0FBYyxDQUFDLCtCQUFpQixDQUFDLEdBQUcsQ0FDckMsb0JBQU0sQ0FBQyx3QkFBd0IsQ0FDaEMsQ0FBQyxDQUFBO1FBQ0YsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ2IsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ2IsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ1gsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBRVosQ0FBQyxDQUFDLENBQUE7SUFFRixNQUFNLG1CQUFtQixHQUE0QixJQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ2hHLG1CQUFtQixFQUFFLENBQUE7QUFFdkIsQ0FBQyxDQUFDLENBQUE7QUFVQSw0REFBd0I7Ozs7O0FDakYxQiwyREFBb0U7QUFDcEUsNkRBQXlEO0FBRXpELE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyxDQUFDLFlBQVksR0FBRyxLQUFLLEVBQUUsRUFBRTtJQUN4RCxNQUFNLElBQUksR0FBRyxJQUFBLHVDQUFrQixHQUFFLENBQUE7SUFDakMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQzlCLE9BQU07S0FDUDtJQUVELE1BQU0sT0FBTyxHQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2xELE1BQU0sUUFBUSxHQUFHLCtCQUFpQixDQUFDLEdBQUcsQ0FBQyxvQkFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsV0FBVyxFQUFFLENBQUE7SUFFakYsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsRUFBRTtRQUNqRCxJQUFJLEVBQUUsR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTtRQUM3QyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDZixFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFZixFQUFFLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQ3BDLEVBQUUsQ0FBQyxjQUFjLENBQUMsK0JBQWlCLENBQUMsR0FBRyxDQUFDLG9CQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFBO1FBRXpFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUNiLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUNiLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUNYLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNaLENBQUMsQ0FBQyxDQUFBO0lBRUYsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ3hFLG1CQUFtQixFQUFFLENBQUE7QUFDdkIsQ0FBQyxDQUFDLENBQUE7QUFHQSwwREFBdUI7Ozs7OztBQy9CekIsNkRBQXlEO0FBQ3pELDJEQUFvRTtBQUNwRSx1REFBbUQ7QUFDbkQsdURBQTJEO0FBQzNELE1BQU0sMEJBQTBCLEdBQUcsQ0FBQyxHQUFHLEVBQUU7SUFFdkMsTUFBTSxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFBO0lBQ2xKLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxjQUFjLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFBO0lBQzVKLGlCQUFpQjtJQUNqQixZQUFZO0lBQ1osVUFBVTtJQUNWLFVBQVU7SUFDVixlQUFlO0lBQ2YsY0FBYztJQUNkLGVBQWU7SUFDZixvQkFBb0I7SUFDcEIsaUJBQWlCO0lBQ2pCLElBQUk7SUFFSixNQUFNLFFBQVEsR0FBRztRQUNmLE9BQU8sRUFBRSxVQUFVLE1BQVU7WUFDM0IsTUFBTSxJQUFJLEdBQUcsSUFBQSx1Q0FBa0IsR0FBRSxDQUFBO1lBQ2pDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQ3BCLHNDQUFzQztnQkFDdEMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO2FBQ1Y7WUFDRCxPQUFPLE1BQU0sQ0FBQTtRQUNmLENBQUM7S0FDRixDQUFBO0lBRUQsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFRLEVBQUUsRUFBRTtRQUN2QixNQUFNLEdBQUcsR0FBRztZQUNWLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQztZQUNoQixNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLDBCQUEwQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM5RSxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3ZDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7WUFDNUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztZQUMzQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDO1lBQzVDLElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQztZQUN4QixNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO1NBQ3RDLENBQUE7UUFDVixZQUFZLENBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ2pELENBQUMsQ0FBQTtJQUVELFdBQVcsQ0FBQyxNQUFNLENBQUMsK0JBQWlCLENBQUMsR0FBRyxDQUFDLG9CQUFNLENBQUMsd0JBQXdCLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUNwRixXQUFXLENBQUMsTUFBTSxDQUFDLCtCQUFpQixDQUFDLEdBQUcsQ0FBQyxvQkFBTSxDQUFDLDBCQUEwQixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDdEYsV0FBVyxDQUFDLE1BQU0sQ0FBQywrQkFBaUIsQ0FBQyxHQUFHLENBQUMsb0JBQU0sQ0FBQyw4QkFBOEIsQ0FBQyxFQUFFO1FBQy9FLE9BQU8sRUFBRTtZQUNQLE1BQU0sUUFBUSxHQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBeUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQSxDQUFBLGlDQUFpQztZQUNyRyxNQUFNLElBQUksR0FBRyxJQUFBLHVCQUFVLEVBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFBO1lBQ3RELE1BQU0sSUFBSSxHQUFHLElBQUEsdUJBQVUsRUFBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUE7WUFDdEQsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtZQUMxQyxNQUFNLFNBQVMsR0FBRyxJQUFBLHVCQUFVLEVBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFBO1lBQzVELE1BQU0sUUFBUSxHQUFHLElBQUEsdUJBQVUsRUFBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUE7WUFDM0QsTUFBTSxXQUFXLEdBQUcsSUFBQSx1QkFBVSxFQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQTtZQUM5RCxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO1lBQ2xELE1BQU0sU0FBUyxHQUFHLElBQUEsdUJBQVUsRUFBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUE7WUFFNUQsTUFBTSxJQUFJLEdBQUc7Z0JBQ1gsTUFBTTtnQkFDTixJQUFJO2dCQUNKLElBQUk7Z0JBQ0osU0FBUztnQkFDVCxRQUFRO2dCQUNSLFNBQVM7Z0JBQ1QsY0FBYztnQkFDZCxXQUFXO2FBQ1osQ0FBQTtZQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNYLENBQUM7UUFDRCxPQUFPLEVBQUUsVUFBVSxNQUFNO1lBQ3ZCLE9BQU8sTUFBTSxDQUFBO1FBQ2YsQ0FBQztLQUNGLENBQUMsQ0FBQTtJQUVGLElBQUksQ0FBQyxJQUFBLCtCQUFrQixHQUFFLEVBQUU7UUFDekIsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLE1BQU0sSUFBSSxHQUFHLElBQUEsdUNBQWtCLEdBQUUsQ0FBQTtZQUNqQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDWCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDVDtJQUVELE9BQU8sY0FBYyxDQUFBO0FBQ3ZCLENBQUMsQ0FBQyxFQUFFLENBQUE7QUFFRixnRUFBMEI7Ozs7Ozs7QUNyRjVCLDJEQUFvRTtBQUNwRSwwQ0FBd0M7QUFDeEMsTUFBTSxrQkFBa0IsR0FBRyxHQUFHLEVBQUU7SUFDOUIsTUFBTSxpQkFBaUIsR0FBcUMsSUFBSSxjQUFjLENBQUMsK0JBQWlCLENBQUMsR0FBRyxDQUFDLG9CQUFNLENBQUMsd0JBQXdCLENBQUMsRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDckosTUFBTSxLQUFLLEdBQWtCLGlCQUFpQixFQUFFLENBQUE7SUFFaEQsTUFBTSxJQUFJLEdBQUc7UUFDWCxNQUFNLEVBQUUsQ0FBQztRQUNULElBQUksRUFBRSxFQUFFO1FBQ1IsSUFBSSxFQUFFLEVBQUU7UUFDUixTQUFTLEVBQUUsRUFBRTtLQUNkLENBQUE7SUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBQSxxQkFBVSxFQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDdEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFBLHFCQUFVLEVBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBQSxxQkFBVSxFQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtLQUMzQztJQUNELE9BQU8sSUFBSSxDQUFBO0FBQ2IsQ0FBQyxDQUFBO0FBR0MsZ0RBQWtCOzs7OztBQ3ZCcEIsdUVBQWlFO0FBSy9ELHdHQUxNLGlEQUF1QixPQUtOO0FBSnpCLDZFQUF5RTtBQUt2RSwyR0FMTyx1REFBMEIsT0FLUDtBQUo1Qiw2REFBeUQ7QUFLdkQsbUdBTE8sdUNBQWtCLE9BS1A7Ozs7O0FDUHBCLDJEQUFvRTtBQUVwRSxNQUFNLGtCQUFrQixHQUFhLENBQUMsR0FBa0IsRUFBRTtJQUN4RCxPQUFPLCtCQUFpQixDQUFDLEdBQUcsQ0FBQyxvQkFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO0FBQ2hFLENBQUMsQ0FBQyxDQUFBO0FBcUJBLGdEQUFrQjtBQXBCcEIsaUJBQWlCO0FBQ2pCLE1BQU0sb0JBQW9CLEdBQWEsQ0FBQyxHQUFXLEVBQUU7SUFDbkQsTUFBTSxXQUFXLEdBQUcsa0JBQWtCLEVBQUUsQ0FBQTtJQUN4QyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUN4QixPQUFPLFdBQVcsQ0FBQTtLQUNuQjtJQUNELE9BQU8sV0FBVyxDQUFDLEdBQUcsQ0FBQyxvQkFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO0FBQzVELENBQUMsQ0FBQyxDQUFBO0FBV0Esb0RBQW9CO0FBVnRCLGVBQWU7QUFDZixNQUFNLHNCQUFzQixHQUFhLENBQUMsR0FBa0IsRUFBRTtJQUM1RCxNQUFNLFdBQVcsR0FBa0Isa0JBQWtCLEVBQUUsQ0FBQTtJQUN2RCxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUN4QixPQUFPLFdBQVcsQ0FBQTtLQUNuQjtJQUNELE9BQU8sV0FBVyxDQUFDLEdBQUcsQ0FBQyxvQkFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsV0FBVyxFQUFFLENBQUE7QUFDbkUsQ0FBQyxDQUFDLENBQUE7QUFJQSx3REFBc0I7Ozs7O0FDeEJ4Qiw2Q0FJcUI7QUFHbkIscUdBTkEsaUNBQW9CLE9BTUE7QUFDcEIsdUdBTkEsbUNBQXNCLE9BTUE7QUFDdEIsbUdBTkEsK0JBQWtCLE9BTUE7Ozs7O0FDVHBCLHlFQUFzRTtBQUN0RSwyREFBNEQ7QUFDNUQsTUFBTSxzQkFBc0IsR0FBRyxDQUFDLEdBQVcsRUFBRTtJQUMzQyxNQUFNLEdBQUcsR0FBVSxJQUFBLG1EQUF3QixHQUFFLENBQUE7SUFDN0MsT0FBTyxHQUFHLElBQUksOEJBQWdCLENBQUE7QUFDaEMsQ0FBQyxDQUFDLENBQUE7QUFHQSx3REFBc0I7Ozs7O0FDUnhCLDZEQUFxRTtBQUNyRSxzRUFBa0U7QUFDbEUsMkRBQStFO0FBRS9FLE1BQU0sNkJBQTZCLEdBQWEsQ0FBQyxHQUFXLEVBQUU7SUFDNUQsTUFBTSxtQkFBbUIsR0FBa0IsSUFBQSxtQ0FBc0IsR0FBRSxDQUFBO0lBQ25FLElBQUksbUJBQW1CLENBQUMsTUFBTSxFQUFFLEVBQUU7UUFBRSxPQUFPLElBQUksQ0FBQTtLQUFFO0lBRWpELE1BQU0sSUFBSSxHQUFHLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUN2RCxNQUFNLEdBQUcsR0FBRyxJQUFBLGlDQUFlLEVBQUMsSUFBSSxDQUFDLENBQUE7SUFFakMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNwQyw4QkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBLENBQUEsT0FBTztJQUNsQyxnQ0FBa0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBLENBQUMsT0FBTztJQUNyQyxPQUFPLFFBQVEsQ0FBQTtBQUNqQixDQUFDLENBQUMsQ0FBQTtBQUdBLHNFQUE2Qjs7Ozs7QUNsQi9CLDJEQUFvRTtBQUNwRSx1REFBdUQ7QUFDdkQsMkRBQStFO0FBQy9FLElBQUksVUFBVSxHQUFPLElBQUksQ0FBQTtBQWtFeEIsZ0NBQVU7QUFqRVgsSUFBSSxZQUFZLEdBQU8sSUFBSSxDQUFBO0FBa0UxQixvQ0FBWTtBQWpFYixJQUFJLGFBQWEsR0FBTyxJQUFJLENBQUE7QUFrRTNCLHNDQUFhO0FBakVkLElBQUksUUFBUSxHQUFPLElBQUksQ0FBQTtBQWtFdEIsNEJBQVE7QUFqRVQsSUFBSSxpQkFBaUIsR0FBTyxJQUFJLENBQUE7QUFrRS9CLDhDQUFpQjtBQWpFbEIsSUFBSSxXQUFXLEdBQU8sSUFBSSxDQUFBO0FBa0V6QixrQ0FBVztBQWhFWixNQUFNLGlDQUFpQyxHQUFHLENBQUMsQ0FBQyxRQUFZLEVBQUUsTUFBVSxFQUFFLEVBQUU7SUFFdEUsbUJBQUEsUUFBUSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDOUIsc0JBQUEsV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDaEMsNEJBQUEsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDbEQscUJBQUEsVUFBVSxHQUFHLElBQUEsMEJBQVksRUFBQyxNQUFNLENBQUMsQ0FBQTtJQUNqQyx1QkFBQSxZQUFZLEdBQUcsSUFBQSx3QkFBVSxFQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ25DLHdCQUFBLGFBQWEsR0FBRyxJQUFBLDJCQUFhLEVBQUMsRUFBRSxDQUFDLENBQUE7SUFFakMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFO1FBQzNELElBQUksRUFBRSxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUE7UUFDdkQsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2YsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWYsRUFBRSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQTtRQUN6QyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFBO1FBQ3hDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUE7UUFFdEMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNwQyxFQUFFLENBQUMsY0FBYyxDQUFDLCtCQUFpQixDQUFDLEdBQUcsQ0FDckMsb0JBQU0sQ0FBQyxpQ0FBaUMsQ0FDekMsQ0FBQyxDQUFBO1FBRUYsRUFBRSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNwQyxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3BCLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDcEIsRUFBRSxDQUFDLGNBQWMsQ0FBQywrQkFBaUIsQ0FBQyxHQUFHLENBQ3JDLG9CQUFNLENBQUMsaUNBQWlDLENBQ3pDLENBQUMsQ0FBQTtRQUVGLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQzdCLEVBQUUsQ0FBQyxjQUFjLENBQUMsK0JBQWlCLENBQUMsR0FBRyxDQUNyQyxvQkFBTSxDQUFDLGlDQUFpQyxDQUN6QyxDQUFDLENBQUE7UUFFRixFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2hCLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDcEIsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDN0IsRUFBRSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNwQyxFQUFFLENBQUMsY0FBYyxDQUFDLCtCQUFpQixDQUFDLEdBQUcsQ0FDckMsb0JBQU0sQ0FBQyxpQ0FBaUMsQ0FDekMsQ0FBQyxDQUFBO1FBQ0YsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDNUIsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUN2QyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDYixFQUFFLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDYixFQUFFLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDWCxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUE7SUFFWixDQUFDLENBQUMsQ0FBQTtJQUVGLE1BQU0sbUJBQW1CLEdBQTZCLElBQUksY0FBYyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUM1RyxtQkFBbUIsRUFBRSxDQUFBO0lBRXJCLE9BQU8sSUFBQSwyQkFBYyxFQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFBO0FBRWxELENBQUMsQ0FBQyxDQUFBO0FBU0QsOEVBQWlDOzs7OztBQzFFbEMsNkRBQW1FO0FBQ25FLDJEQUFnRTtBQUNoRSxzREFBa0Q7QUFDbEQsTUFBTSx3QkFBd0IsR0FBRyxDQUFDLEdBQVUsRUFBRTtJQUM1QyxNQUFNLGlCQUFpQixHQUFHLElBQUEsaUNBQW9CLEdBQUUsQ0FBQTtJQUNoRCxJQUFJLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQUUsT0FBTyxJQUFJLENBQUE7S0FBRTtJQUUvQyxNQUFNLElBQUksR0FBTyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDekQsTUFBTSxHQUFHLEdBQUcsSUFBQSxpQkFBTyxFQUFDLElBQUksQ0FBQyxDQUFBO0lBRXpCOztPQUVHO0lBQ0gsMEJBQTBCO0lBQzFCLE1BQU0sUUFBUSxHQUFVLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDM0Msc0JBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO0lBQ25CLHlCQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtJQUV0QixPQUFPLFFBQVEsQ0FBQTtBQUNqQixDQUFDLENBQUMsQ0FBQTtBQUdBLDREQUF3Qjs7Ozs7QUN2QjFCLDJEQUFxRTtBQUVyRSxNQUFNLHdCQUF3QixHQUFHLENBQUMsR0FBVyxFQUFFO0lBQzdDLElBQUksNEJBQWMsQ0FBQyxJQUFJLEVBQUU7UUFDdkIsT0FBTyw0QkFBYyxDQUFDLElBQUksQ0FBQTtLQUMzQjtJQUNELE1BQU0sT0FBTyxHQUFHLG9NQUFvTSxDQUFBO0lBQ3BOLE1BQU0sT0FBTyxHQUFzQixNQUFNLENBQUMsUUFBUSxDQUFDLHdCQUFVLENBQUMsSUFBSSxFQUFFLHdCQUFVLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQzdGLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7UUFDdkIsT0FBTyxDQUFDLENBQUE7S0FDVDtJQUNELE1BQU0sSUFBSSxHQUFtQixPQUFPLENBQUMsQ0FBQyxDQUFFLENBQUMsT0FBTyxDQUFBO0lBQ2hELE1BQU0sR0FBRyxHQUFrQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQ3ZELE1BQU0sR0FBRyxHQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDekMsNEJBQWMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFBO0lBQ3pCLE9BQU8sR0FBRyxDQUFBO0FBQ1osQ0FBQyxDQUFDLENBQUE7QUFFQSw0REFBd0I7Ozs7O0FDbEIxQix5RUFBcUU7QUFFckUsTUFBTSw4QkFBOEIsR0FBRyxDQUFDLENBQUMsTUFBYyxJQUFBLG1EQUF3QixHQUFFLEVBQVMsRUFBRTtJQUMxRixJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ1IsT0FBTyxTQUFTLENBQUE7S0FDakI7SUFDRCxNQUFNLElBQUksR0FBRyxFQUFFLENBQUE7SUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUUsR0FBYyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQTtJQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFBO0lBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUE7SUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUE7SUFDcEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ3ZCLENBQUMsQ0FBQyxDQUFBO0FBR0Esd0VBQThCOzs7OztBQ2ZoQyxxREFBMEQ7QUFnQnhELHVHQWhCTyx1Q0FBc0IsT0FnQlA7QUFmeEIsbUVBQXdFO0FBZ0J0RSw4R0FoQk8scURBQTZCLE9BZ0JQO0FBZi9CLDJGQVE2QztBQVEzQywyRkFmQSw4Q0FBVSxPQWVBO0FBQ1YsNkZBZkEsZ0RBQVksT0FlQTtBQUNaLDhGQWZBLGlEQUFhLE9BZUE7QUFDYix5RkFmQSw0Q0FBUSxPQWVBO0FBQ1Isa0dBZkEscURBQWlCLE9BZUE7QUFDakIsNEZBZkEsK0NBQVcsT0FlQTtBQUNYLGtIQWZBLHFFQUFpQyxPQWVBO0FBYm5DLHlFQUFzRTtBQWNwRSx5R0FkTyxtREFBd0IsT0FjUDtBQWIxQix5RUFBc0U7QUFjcEUseUdBZE8sbURBQXdCLE9BY1A7QUFiMUIscUVBQTBFO0FBY3hFLCtHQWRPLHVEQUE4QixPQWNQOzs7OztBQzNCaEMsMkRBQW9FO0FBQ3BFLHVEQUFtRDtBQUNuRCxNQUFNLHFCQUFxQixHQUFhLENBQUMsR0FBVyxFQUFFO0lBRXBELHNCQUFzQjtJQUN0QixJQUFJLE9BQU8sR0FBVyxFQUFFLENBQUE7SUFDeEIsSUFBSSxLQUFLLEdBQVcsRUFBRSxDQUFBO0lBQ3RCLElBQUksT0FBTyxHQUFXLEVBQUUsQ0FBQTtJQUN4QixJQUFJLFlBQVksR0FBVyxFQUFFLENBQUE7SUFFN0IsS0FBSyxHQUFHLElBQUEsdUJBQVUsRUFBQywrQkFBaUIsQ0FBQyxHQUFHLENBQUMsb0JBQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFBO0lBQzdELE9BQU8sR0FBRyxLQUFLLENBQUE7SUFFZixPQUFPLEdBQUcsSUFBQSx1QkFBVSxFQUFDLCtCQUFpQixDQUFDLEdBQUcsQ0FBQyxvQkFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUE7SUFDbkUsWUFBWSxHQUFHLElBQUEsdUJBQVUsRUFBQywrQkFBaUIsQ0FBQyxHQUFHLENBQUMsb0JBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUE7SUFHNUUsTUFBTSxNQUFNLEdBQUc7UUFDYixFQUFFLEVBQUUsS0FBSztRQUNULElBQUksRUFBRSxPQUFPO1FBQ2IsSUFBSSxFQUFFLE9BQU87UUFDYixZQUFZLEVBQUUsWUFBWTtLQUMzQixDQUFDO0lBRUYsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBRS9CLENBQUMsQ0FBQyxDQUFBO0FBV0Esc0RBQXFCO0FBVHZCLE1BQU0sbUJBQW1CLEdBQWEsQ0FBQyxHQUFXLEVBQUU7SUFFbEQsSUFBSSxLQUFLLEdBQVcsSUFBQSx1QkFBVSxFQUFDLCtCQUFpQixDQUFDLEdBQUcsQ0FBQyxvQkFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUE7SUFFekUsT0FBTyxLQUFLLENBQUE7QUFFZCxDQUFDLENBQUMsQ0FBQTtBQUlBLGtEQUFtQjs7Ozs7QUN0Q3JCLCtDQUdzQjtBQUdwQixzR0FMQSxtQ0FBcUIsT0FLQTtBQUNyQixvR0FMQSxpQ0FBbUIsT0FLQTs7Ozs7QUNQckIsSUFBSSxTQUFTLEdBQU8sSUFBSSxDQUFBO0FBcUV0Qiw4QkFBUztBQXBFWCxJQUFJLFNBQVMsR0FBTyxJQUFJLENBQUE7QUFxRXRCLDhCQUFTO0FBcEVYLE1BQU0sYUFBYSxHQUFHLENBQUMsQ0FBQyxHQUFPLEVBQWdCLEVBQUU7SUFDL0Msb0JBQUEsU0FBUyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDNUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBRS9CLG9CQUFBLFNBQVMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUMsMEJBQTBCO0lBRXpELFNBQVM7U0FDTixZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztTQUNqQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1NBQ2xDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7U0FDbEMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7U0FDckIsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRWQsT0FBTyxTQUFTLENBQUE7QUFDbEIsQ0FBQyxDQUFDLENBQUE7QUF1REEsc0NBQWE7QUFyRGYsSUFBSSxXQUFXLEdBQXVCLElBQUksQ0FBQTtBQXNEeEMsa0NBQVc7QUFyRGIsSUFBSSxRQUFRLEdBQXVCLElBQUksQ0FBQTtBQXNEckMsNEJBQVE7QUFyRFYsTUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDLEdBQU8sRUFBZ0IsRUFBRTtJQUU5QyxtQkFBQSxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUMzQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUE7SUFFOUIsc0JBQUEsV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQywwQkFBMEI7SUFFM0QsV0FBVztTQUNSLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1NBQ2hDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7U0FDbEMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztTQUNsQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztTQUNyQixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFFZCxPQUFPLFdBQVcsQ0FBQTtBQUNwQixDQUFDLENBQUMsQ0FBQTtBQXVDQSxvQ0FBWTtBQXJDZCxJQUFJLE1BQU0sR0FBdUIsSUFBSSxDQUFBO0FBc0NuQyx3QkFBTTtBQXJDUixJQUFJLFNBQVMsR0FBcUIsSUFBSSxDQUFBO0FBc0NwQyw4QkFBUztBQXJDWCxNQUFNLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBTyxFQUFnQixFQUFFO0lBRTVDLGlCQUFBLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ3pDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUU1QixvQkFBQSxTQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLDBCQUEwQjtJQUV6RCxTQUFTO1NBQ04sWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7U0FDOUIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztTQUNsQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1NBQ2xDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1NBQ3JCLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUVkLE9BQU8sU0FBUyxDQUFBO0FBQ2xCLENBQUMsQ0FBQyxDQUFBO0FBdUJBLGdDQUFVO0FBckJaLElBQUksUUFBUSxHQUFxQixJQUFJLENBQUE7QUFzQm5DLDRCQUFRO0FBckJWLE1BQU0sZUFBZSxHQUFHLENBQUMsQ0FBQyxVQUFjLEVBQWdCLEVBQUU7SUFFeEQsbUJBQUEsUUFBUSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7SUFFN0IsUUFBUSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1NBQ3hDLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBLCtCQUErQjtTQUM5RSxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7U0FDL0MsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2QsT0FBTyxRQUFRLENBQUE7QUFDakIsQ0FBQyxDQUFDLENBQUE7QUFhQSwwQ0FBZTs7Ozs7QUMvRWpCLCtDQVlzQjtBQUlwQiwwRkFmQSx1QkFBUyxPQWVBO0FBQ1QsMEZBZkEsdUJBQVMsT0FlQTtBQUNULDhGQWZBLDJCQUFhLE9BZUE7QUFDYiw0RkFmQSx5QkFBVyxPQWVBO0FBQ1gseUZBZkEsc0JBQVEsT0FlQTtBQUNSLDZGQWZBLDBCQUFZLE9BZUE7QUFDWix1RkFmQSxvQkFBTSxPQWVBO0FBQ04sMEZBZkEsdUJBQVMsT0FlQTtBQUNULDJGQWZBLHdCQUFVLE9BZUE7QUFDVix5RkFmQSxzQkFBUSxPQWVBO0FBQ1IsZ0dBZkEsNkJBQWUsT0FlQTs7Ozs7QUMxQmpCLDZEQUFxRTtBQUNyRSwyREFBK0U7QUFDL0UsdURBQWtFO0FBRWxFLE1BQU0sZUFBZSxHQUFHLENBQUMsQ0FBQyxJQUFTLEVBQU8sRUFBRTtJQUMxQyxNQUFNLG1CQUFtQixHQUFHLElBQUEsbUNBQXNCLEdBQUUsQ0FBQTtJQUNwRCxnQkFBZ0I7SUFDaEIsSUFBSSxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUFFLE9BQU07S0FBRTtJQUU1QyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsRUFBRTtRQUFFLE9BQU07S0FBRTtJQUVoRCxLQUFLLE1BQU0sSUFBSSxJQUFJLDhCQUFnQixFQUFFO1FBQ25DLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyw4QkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQ3ZDLE9BQU07U0FDUDtLQUNGO0lBRUQsOEJBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzNCLE1BQU0sTUFBTSxHQUFRLElBQUEsMkJBQWMsRUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7SUFFbEQsTUFBTSxHQUFHLEdBQVcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQSxDQUFHLG1CQUFtQjtJQUNsRSxxQkFBcUI7SUFDckIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEVBQUMsRUFBRTtRQUNkLE1BQU0sU0FBUyxHQUFHLElBQUEsdUJBQVUsRUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDNUMsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN4QixNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQzlDLE1BQU0sVUFBVSxHQUFHO2dCQUNqQixNQUFNLEVBQUUsTUFBTTtnQkFDZCxVQUFVLEVBQUUsVUFBVTthQUN2QixDQUFBO1lBRUQsZ0NBQWtCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1NBQ3BDO0tBRUY7SUFFRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQzVDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDL0MsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUU5QyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDekIsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQzNCLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUUxQixNQUFNLHFCQUFxQixHQUFHLGdDQUFrQixDQUFBO0lBQ2hELE9BQU8scUJBQXFCLENBQUE7QUFDOUIsQ0FBQyxDQUFDLENBQUE7QUFHQSwwQ0FBZTs7Ozs7QUNoRGpCLHVEQUFtRDtBQU9qRCxnR0FQTyxpQ0FBZSxPQU9QO0FBTmpCLHVDQUFpQztBQU8vQix3RkFQTSxpQkFBTyxPQU9OOzs7OztBQ1RULDZEQUFtRTtBQUNuRSwyREFBZ0U7QUFDaEUsdURBQXdEO0FBRXhELE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtJQUM3QixNQUFNLGlCQUFpQixHQUFHLElBQUEsaUNBQW9CLEdBQUUsQ0FBQTtJQUNoRCxJQUFJLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQUUsT0FBTTtLQUFFO0lBRTFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1FBQUUsT0FBTTtLQUFFO0lBRTlDLEtBQUssTUFBTSxJQUFJLElBQUksc0JBQVEsRUFBRTtRQUMzQixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQy9CLE9BQU07U0FDUDtLQUNGO0lBR0Qsc0JBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDbkIsNkNBQTZDO0lBQzdDLE1BQU0sSUFBSSxHQUFXLElBQUEsMkJBQWMsRUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7SUFFbkQsMkVBQTJFO0lBQzNFLE1BQU0sT0FBTyxHQUFXLElBQUEsMkJBQWMsRUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksSUFBQSwyQkFBYyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtJQUV4RixpQkFBaUI7SUFDakIsTUFBTSxJQUFJLEdBQVcsSUFBQSwyQkFBYyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtJQUVuRCw4QkFBOEI7SUFDOUIsTUFBTSxLQUFLLEdBQVcsSUFBQSwyQkFBYyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtJQUVwRCxXQUFXO0lBQ1gsTUFBTSxNQUFNLEdBQVcsSUFBQSwyQkFBYyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQUN0RCxzRUFBc0U7SUFDdEUsZ0JBQWdCO0lBQ2hCLE1BQU0sTUFBTSxHQUFXLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUE7SUFFaEQsTUFBTSxXQUFXLEdBQUc7UUFDbEIsRUFBRSxFQUFFLElBQUk7UUFDUixJQUFJLEVBQUUsT0FBTztRQUNiLElBQUksRUFBRSxJQUFJO1FBQ1YsS0FBSyxFQUFFLEtBQUs7UUFDWixTQUFTLEVBQUUsTUFBTTtRQUNqQixNQUFNLEVBQUUsTUFBTTtLQUNmLENBQUE7SUFFRCx5QkFBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUU3QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQzVDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDL0MsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUU5QyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDakIsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ25CLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUVsQixNQUFNLGNBQWMsR0FBRyx5QkFBVyxDQUFBO0lBQ2xDLE9BQU8sY0FBYyxDQUFBO0FBRXZCLENBQUMsQ0FBQyxDQUFBO0FBRUEsMEJBQU87Ozs7OztBQzVEVCwyREFBb0U7QUFDcEUsdURBQTJEO0FBRTNELE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxHQUErQixFQUFFO0lBQy9ELE1BQU0sY0FBYyxHQUErQixJQUFJLGNBQWMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQzVGLE1BQU0sbUJBQW1CLEdBQTRCLElBQUksY0FBYyxDQUFDLGNBQWMsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDbkcsV0FBVyxDQUFDLE1BQU0sQ0FBQywrQkFBaUIsQ0FBQyxHQUFHLENBQUMsb0JBQU0sQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO1FBQ3JFLE9BQU8sRUFBRSxVQUFVLE1BQU07WUFDdkIsSUFBQSwrQkFBa0IsR0FBRSxDQUFBO1lBQ3BCLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUE7WUFDekMsT0FBTyxNQUFNLENBQUE7UUFDZixDQUFDO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLElBQUksSUFBQSwrQkFBa0IsR0FBRSxFQUFFO1lBQ3hCLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUE7U0FDMUM7SUFDSCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFUixPQUFPLGNBQWMsQ0FBQTtBQUN2QixDQUFDLENBQUMsRUFBRSxDQUFBO0FBR0Ysd0RBQXNCOzs7Ozs7OztBQ3hCeEIsMkRBQW9FO0FBRXBFLE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyxHQUFxQyxFQUFFO0lBQ3RFLE1BQU0sY0FBYyxHQUFxQyxJQUFJLGNBQWMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUN6RyxNQUFNLG1CQUFtQixHQUFtQyxJQUFJLGNBQWMsQ0FBQyxjQUFjLEVBQUUsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUNqSCxXQUFXLENBQUMsTUFBTSxDQUFDLCtCQUFpQixDQUFDLEdBQUcsQ0FBQyxvQkFBTSxDQUFDLHFCQUFxQixDQUFDLEVBQUU7UUFDdEUsT0FBTyxFQUFFLFVBQVUsSUFBSTtZQUNyQixNQUFNLEtBQUssR0FBVSxJQUFJLENBQUMsQ0FBQyxDQUFFLENBQUMsT0FBTyxFQUFFLENBQUE7WUFDdkMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7UUFDaEQsQ0FBQztLQUNGLENBQUMsQ0FBQTtJQUNGLE9BQU8sY0FBYyxDQUFBO0FBQ3ZCLENBQUMsQ0FBQyxFQUFFLENBQUE7QUFFSSwwREFBdUI7Ozs7Ozs7QUNkL0IscUVBQWtFO0FBSWhFLHVHQUpPLCtDQUFzQixPQUlQO0FBSHhCLHVFQUFvRTtBQUlsRSx3R0FKTyxpREFBdUIsT0FJUDs7QUNMekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDeExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzNFQSx3REFRdUQsQ0FBQSxtQkFBbUI7QUFtRXhFLHVGQTNFTyxtQkFBTSxPQTJFUDtBQUFFLGlHQTNFTyw2QkFBZ0IsT0EyRVA7QUFDeEIsa0dBM0VBLDhCQUFpQixPQTJFQTtBQUNqQiwyRkEzRUEsdUJBQVUsT0EyRUE7QUFFVix5RkEzRUEscUJBQVEsT0EyRUE7QUFDUiw0RkEzRUEsd0JBQVcsT0EyRUE7QUFDWCxpR0EzRUEsNkJBQWdCLE9BMkVBO0FBQ2hCLG1HQTNFQSwrQkFBa0IsT0EyRUE7QUF6RXBCLG9EQUtvRDtBQXFFbEQsMkZBMUVPLHFCQUFVLE9BMEVQO0FBQUksK0ZBMUVPLHlCQUFjLE9BMEVQO0FBQzVCLCtGQTFFQSx5QkFBYyxPQTBFQTtBQUNkLDhGQTFFQSx3QkFBYSxPQTBFQTtBQUNiLG1HQTFFQSw2QkFBa0IsT0EwRUE7QUFDbEIsb0dBMUVBLDhCQUFtQixPQTBFQTtBQUNuQixtR0ExRUEsNkJBQWtCLE9BMEVBO0FBekVwQixnRUFDMEQ7QUF5RXhELHFHQTFFTyxxQ0FBb0IsT0EwRVA7QUFBRyx1R0ExRU8sdUNBQXNCLE9BMEVQO0FBQzdDLG1HQTFFQSxtQ0FBa0IsT0EwRUE7QUF6RXBCLGtEQVUrRDtBQWdFN0QsdUdBMUVPLGdDQUFzQixPQTBFUDtBQUFDLDhHQTFFTyx1Q0FBNkIsT0EwRVA7QUFDcEQsMkZBMUVBLG9CQUFVLE9BMEVBO0FBQ1YsNkZBMUVBLHNCQUFZLE9BMEVBO0FBQ1osOEZBMUVBLHVCQUFhLE9BMEVBO0FBQ2IseUZBMUVBLGtCQUFRLE9BMEVBO0FBQ1Isa0dBMUVBLDJCQUFpQixPQTBFQTtBQUNqQiw0RkExRUEscUJBQVcsT0EwRUE7QUFDWCxrSEExRUEsMkNBQWlDLE9BMEVBO0FBQ2pDLHlHQTFFQSxrQ0FBd0IsT0EwRUE7QUFDeEIseUdBMUVBLGtDQUF3QixPQTBFQTtBQUN4QiwrR0ExRUEsd0NBQThCLE9BMEVBO0FBekVoQywwREFBcUY7QUEwRW5GLHNHQTFFTyxtQ0FBcUIsT0EwRVA7QUFBQyxvR0ExRU8saUNBQW1CLE9BMEVQO0FBekUzQyx3REFTbUQ7QUFpRWpELDBGQTFFTyxzQkFBUyxPQTBFUDtBQUFFLDBGQTFFTyxzQkFBUyxPQTBFUDtBQUNwQiw4RkExRUEsMEJBQWEsT0EwRUE7QUFDYiw0RkExRUEsd0JBQVcsT0EwRUE7QUFDWCx5RkExRUEscUJBQVEsT0EwRUE7QUFDUiw2RkExRUEseUJBQVksT0EwRUE7QUFDWix1RkExRUEsbUJBQU0sT0EwRUE7QUFDTiwwRkExRUEsc0JBQVMsT0EwRUE7QUFDVCwyRkExRUEsdUJBQVUsT0EwRUE7QUFDVix5RkExRUEscUJBQVEsT0EwRUE7QUFDUixnR0ExRUEsNEJBQWUsT0EwRUE7QUF6RWpCLDhEQXdCK0Q7QUFrRDdELHNHQTFFTyxxQ0FBcUIsT0EwRVA7QUFBQyx5RkExRU8sd0JBQVEsT0EwRVA7QUFDOUIsd0ZBMUVBLHVCQUFPLE9BMEVBO0FBQ1AscUZBMUVBLG9CQUFJLE9BMEVBO0FBQ0osc0ZBMUVBLHFCQUFLLE9BMEVBO0FBQ0wsc0ZBMUVBLHFCQUFLLE9BMEVBO0FBQ0wsMEZBMUVBLHlCQUFTLE9BMEVBO0FBQ1Qsd0dBMUVBLHVDQUF1QixPQTBFQTtBQUN2Qiw0RkExRUEsMkJBQVcsT0EwRUE7QUFDWCw0RkExRUEsMkJBQVcsT0EwRUE7QUFDWCwrRkExRUEsOEJBQWMsT0EwRUE7QUFDZCwyRkExRUEsMEJBQVUsT0EwRUE7QUFDViwyRkExRUEsMEJBQVUsT0EwRUE7QUFDViwyRkExRUEsMEJBQVUsT0EwRUE7QUFDViw4RkExRUEsNkJBQWEsT0EwRUE7QUFDYiw2R0ExRUEsNENBQTRCLE9BMEVBO0FBQzVCLDhHQTFFQSw2Q0FBNkIsT0EwRUE7QUFDN0Isc0dBMUVBLHFDQUFxQixPQTBFQTtBQUNyQix5RkExRUEsd0JBQVEsT0EwRUE7QUFDUiw4RkExRUEsNkJBQWEsT0EwRUE7QUFDYix3RkExRUEsdUJBQU8sT0EwRUE7QUFDUCx3RkExRUEsdUJBQU8sT0EwRUE7QUFDUCwyRkExRUEsMEJBQVUsT0EwRUE7QUFDVix1RkExRUEsc0JBQU0sT0EwRUE7QUFDTix3RkExRUEsdUJBQU8sT0EwRUE7QUFDUCx5R0ExRUEsd0NBQXdCLE9BMEVBO0FBekUxQiw4REFBcUU7QUEwRW5FLGdHQTFFTywrQkFBZSxPQTBFUDtBQUFDLHdGQTFFTyx1QkFBTyxPQTBFUDtBQXpFekIsd0RBQ3NEO0FBeUVwRCx3R0ExRU8sb0NBQXVCLE9BMEVQO0FBQUUsMkdBMUVPLHVDQUEwQixPQTBFUDtBQUNuRCxtR0ExRUEsK0JBQWtCLE9BMEVBO0FBekVwQiw0REFBMkY7QUEwRXpGLHVHQTFFTyxxQ0FBc0IsT0EwRVA7QUFBQyx3R0ExRU8sc0NBQXVCLE9BMEVQO0FBeEVoRCxJQUFJLGNBQWMsR0FBRywyQkFBYyxDQUFDLElBQUksQ0FBQTtBQUt0Qyx3Q0FBYztBQUlJLHdDQUFjO0FBUmxDLElBQUksUUFBUSxHQUFHLHFCQUFRLENBQUMsSUFBSSxDQUFBO0FBRzFCLDRCQUFRIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIifQ==
