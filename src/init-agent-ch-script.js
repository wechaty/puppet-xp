(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.puppetXp = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{"process/browser.js":1,"timers":2}],3:[function(require,module,exports){
"use strict";
// interface typeOffset {
//   [key: string]: number | any
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleLoad = exports.moduleBaseAddress = exports.availableVersion = exports.offset = void 0;
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
    is_logged_in_offset: 0x1ddf9d4,
    hook_on_login_offset: 0x51b790,
    hook_on_logout_offset: 0x51c2c0,
    hook_get_login_qr_offset: 0x4b6020,
    hook_check_login_qr_offset: 0x478b90,
    hook_save_login_qr_info_offset: 0x3db2e0,
    get_login_wnd_offset: 0x1db96a4,
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
const moduleBaseAddress = Module.getBaseAddress("WeChatWin.dll");
exports.moduleBaseAddress = moduleBaseAddress;
const moduleLoad = Module.load("WeChatWin.dll");
exports.moduleLoad = moduleLoad;
},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleLoad = exports.moduleBaseAddress = exports.availableVersion = exports.offset = void 0;
const data_offset_1 = require("./data-offset");
Object.defineProperty(exports, "offset", { enumerable: true, get: function () { return data_offset_1.offset; } });
Object.defineProperty(exports, "availableVersion", { enumerable: true, get: function () { return data_offset_1.availableVersion; } });
Object.defineProperty(exports, "moduleBaseAddress", { enumerable: true, get: function () { return data_offset_1.moduleBaseAddress; } });
Object.defineProperty(exports, "moduleLoad", { enumerable: true, get: function () { return data_offset_1.moduleLoad; } });
},{"./data-offset":3}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentReadyCallback = void 0;
const agentReadyCallback = (() => {
    const nativeCallback = new NativeCallback(() => { }, "void", []);
    const nativeativeFunction = new NativeFunction(nativeCallback, "void", []);
    setTimeout(() => {
        nativeativeFunction();
    }, 500);
    return nativeCallback;
})();
exports.agentReadyCallback = agentReadyCallback;
},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestInfoFunction = void 0;
const getTestInfoFunction = () => {
    const nativeativeFunction = new NativeFunction(ptr(0x4f230000), "void", []);
    nativeativeFunction();
};
exports.getTestInfoFunction = getTestInfoFunction;
},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestInfoFunction = exports.agentReadyCallback = exports.readStringPtr = exports.readWStringPtr = exports.readWideString = exports.readString = void 0;
const readString_1 = require("./readString");
Object.defineProperty(exports, "readString", { enumerable: true, get: function () { return readString_1.readString; } });
Object.defineProperty(exports, "readWideString", { enumerable: true, get: function () { return readString_1.readWideString; } });
Object.defineProperty(exports, "readWStringPtr", { enumerable: true, get: function () { return readString_1.readWStringPtr; } });
Object.defineProperty(exports, "readStringPtr", { enumerable: true, get: function () { return readString_1.readStringPtr; } });
const agentReadyCallback_1 = require("./agentReadyCallback");
Object.defineProperty(exports, "agentReadyCallback", { enumerable: true, get: function () { return agentReadyCallback_1.agentReadyCallback; } });
const getTestInfo_1 = require("./getTestInfo");
Object.defineProperty(exports, "getTestInfoFunction", { enumerable: true, get: function () { return getTestInfo_1.getTestInfoFunction; } });
},{"./agentReadyCallback":5,"./getTestInfo":6,"./readString":8}],8:[function(require,module,exports){
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
    addr.readCString = () => {
        return addr.size ? addr.ptr._readCString(addr.size) : "";
    };
    addr.readAnsiString = () => {
        return addr.size ? addr.ptr._readAnsiString(addr.size) : "";
    };
    addr.readUtf8String = () => {
        return addr.size ? addr.ptr._readUtf8String(addr.size) : "";
    };
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
    addr.readUtf16String = () => {
        return addr.size ? addr.ptr._readUtf16String(addr.size * 2) : "";
    };
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
},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMiniProgramNativeFunction = void 0;
const getUserData_1 = require("../getUserData/getUserData");
const data_offset_1 = require("../CommonData/data-offset");
const all_init_Fn_1 = require("../initStruct/all_init_Fn");
const SendMiniProgramNativeFunction = (bg_path_str, contactId, xmlstr) => {
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
    bg_path_Struct
        .writePointer(bg_path_Ptr)
        .add(0x04)
        .writeU32(bg_path_str.length * 2)
        .add(0x04)
        .writeU32(bg_path_str.length * 2)
        .add(0x04)
        .writeU32(0)
        .add(0x04)
        .writeU32(0);
    var send_wxid_str = JSON.parse((0, getUserData_1.getMyselfInfoFunction)()).id;
    // console.log(send_wxid_str)
    var send_wxid_Ptr = Memory.alloc(send_wxid_str.length * 2 + 1);
    send_wxid_Ptr.writeUtf16String(send_wxid_str);
    var send_wxid_Struct = Memory.alloc(0x14); // returns a NativePointer
    send_wxid_Struct
        .writePointer(send_wxid_Ptr)
        .add(0x04)
        .writeU32(send_wxid_str.length * 2)
        .add(0x04)
        .writeU32(send_wxid_str.length * 2)
        .add(0x04)
        .writeU32(0)
        .add(0x04)
        .writeU32(0);
    // var contactId="filehelper";
    var recv_wxid_Ptr = Memory.alloc(contactId.length * 2 + 1);
    recv_wxid_Ptr.writeUtf16String(contactId);
    var recv_wxid_Struct = Memory.alloc(0x14); // returns a NativePointer
    recv_wxid_Struct
        .writePointer(recv_wxid_Ptr)
        .add(0x04)
        .writeU32(contactId.length * 2)
        .add(0x04)
        .writeU32(contactId.length * 2)
        .add(0x04)
        .writeU32(0)
        .add(0x04)
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
    Memory.patchCode(asmCode, Process.pageSize, (code) => {
        var cw = new X86Writer(code, { pc: asmCode });
        cw.putPushfx();
        cw.putPushax();
        cw.putMovRegReg("ecx", "ecx");
        cw.putMovRegAddress("ecx", ECX_buf);
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(0x69bb0)); //init ecx
        cw.putPushU32(0x21);
        cw.putPushNearPtr(ptr_to_buf_1); //ptr
        cw.putPushU32(bg_path_Struct.toInt32());
        cw.putPushU32(pXml.toInt32());
        cw.putPushU32(recv_wxid_Struct.toInt32());
        cw.putMovRegAddress("edx", send_wxid_Struct);
        cw.putMovRegAddress("ecx", ECX_buf);
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(0x2e2420));
        cw.putAddRegImm("esp", 0x14);
        cw.putPushU32(Buf_EAX.toInt32());
        cw.putMovRegAddress("ecx", ECX_buf);
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(0x94c10));
        cw.putPushU32(data_offset_1.moduleBaseAddress.add(0x1dcb46c).toInt32());
        cw.putPushU32(data_offset_1.moduleBaseAddress.add(0x1dcb46c).toInt32());
        cw.putMovRegAddress("ecx", ECX_buf);
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(0x2e2630));
        cw.putAddRegImm("esp", 0x8);
        cw.putPopax();
        cw.putPopfx();
        cw.putRet();
        cw.flush();
    });
    const nativeativeFunction = new NativeFunction(ptr(asmCode), "void", []);
    nativeativeFunction();
};
exports.SendMiniProgramNativeFunction = SendMiniProgramNativeFunction;
},{"../CommonData/data-offset":3,"../getUserData/getUserData":28,"../initStruct/all_init_Fn":32}],10:[function(require,module,exports){
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
},{"./SendMiniProgramNativeFunction":9,"./recvMsgNativeCallback":11,"./sendAtMsgNativeFunction":12,"./sendAttatchMsgNativeFunction":13,"./sendMsgNativeFunction":14,"./sendPicMsgNativeFunction":15}],11:[function(require,module,exports){
(function (setImmediate){(function (){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recvMsgNativeCallback = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const recvMsgNativeCallback = (() => {
    const nativeCallback = new NativeCallback(() => { }, "void", [
        "int32",
        "pointer",
        "pointer",
        "pointer",
        "pointer",
        "int32",
    ]);
    const nativeativeFunction = new NativeFunction(nativeCallback, "void", [
        "int32",
        "pointer",
        "pointer",
        "pointer",
        "pointer",
        "int32",
    ]);
    Interceptor.attach(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.hook_point), {
        onEnter() {
            const a = this.context;
            // const addr = this.context.ebp.sub(0xc30)//0xc30-0x08
            const addr = a.ebp.sub(0xc30); //0xc30-0x08
            const msgType = addr.add(0x38).readU32();
            const isMyMsg = addr.add(0x3c).readU32(); //add isMyMsg
            if (msgType > 0) {
                const talkerIdPtr = addr.add(0x48).readPointer();
                //console.log('txt msg',talkerIdPtr.readUtf16String())
                const talkerIdLen = addr.add(0x48 + 0x04).readU32() * 2 + 2;
                const myTalkerIdPtr = Memory.alloc(talkerIdLen);
                Memory.copy(myTalkerIdPtr, talkerIdPtr, talkerIdLen);
                let contentPtr = null;
                let contentLen = 0;
                let myContentPtr = null;
                if (msgType == 3) {
                    // pic path
                    let thumbPtr = addr.add(0x198).readPointer();
                    let hdPtr = addr.add(0x1ac).readPointer();
                    let thumbPath = thumbPtr.readUtf16String();
                    let hdPath = hdPtr.readUtf16String();
                    let picData = [
                        thumbPath,
                        thumbPath,
                        hdPath,
                        hdPath, //  PUPPET.types.Image.Artwork
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
                if (groupMsgAddr == 0) {
                    //weChatPublic is zero，type is 49
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
        },
    });
    return nativeCallback;
})();
exports.recvMsgNativeCallback = recvMsgNativeCallback;
}).call(this)}).call(this,require("timers").setImmediate)

},{"../CommonData/data-offset":3,"timers":2}],12:[function(require,module,exports){
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
const sendAtMsgNativeFunction = (roomId, text, contactId) => {
    exports.asmAtMsg = asmAtMsg = Memory.alloc(Process.pageSize);
    exports.ecxBuffer = ecxBuffer = Memory.alloc(0x5f0);
    exports.roomid_ = roomid_ = (0, all_init_Fn_1.initStruct)(roomId);
    exports.wxid_ = wxid_ = (0, all_init_Fn_1.initidStruct)(contactId);
    exports.msg_ = msg_ = (0, all_init_Fn_1.initmsgStruct)(text);
    exports.atid_ = atid_ = (0, all_init_Fn_1.initAtMsgStruct)(wxid_);
    Memory.patchCode(asmAtMsg, Process.pageSize, (code) => {
        var cw = new X86Writer(code, { pc: asmAtMsg });
        //cw.putMovRegAddress('eax',roomid)
        cw.putPushfx();
        cw.putPushax();
        cw.putPushU32(1); // push
        cw.putMovRegAddress("edi", atid_);
        cw.putMovRegAddress("ebx", msg_); //msg_
        cw.putPushReg("edi");
        cw.putPushReg("ebx");
        //cw.putMovRegRegOffsetPtr('edx', 'ebp', 0x10)//at wxid
        cw.putMovRegAddress("edx", roomid_); //room_id
        cw.putMovRegAddress("ecx", ecxBuffer);
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.send_txt_call_offset));
        cw.putAddRegImm("esp", 0xc);
        cw.putPopax();
        cw.putPopfx();
        cw.putRet();
        cw.flush();
    });
    const atMsgNativeFunction = new NativeFunction(ptr(asmAtMsg), "void", []);
    atMsgNativeFunction();
};
exports.sendAtMsgNativeFunction = sendAtMsgNativeFunction;
},{"../CommonData/data-offset":3,"../initStruct/all_init_Fn":32}],13:[function(require,module,exports){
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
const sendAttatchMsgNativeFunction = (contactId, path) => {
    exports.attatchAsm = attatchAsm = Memory.alloc(Process.pageSize);
    exports.attatchBuf = attatchBuf = Memory.alloc(0x378);
    exports.attatchEbp = attatchEbp = Memory.alloc(0x04);
    exports.attatchEaxbuf = attatchEaxbuf = Memory.alloc(0x14);
    exports.attatchWxid = attatchWxid = (0, all_init_Fn_1.initidStruct)(contactId);
    exports.attatchPathPtr = attatchPathPtr = Memory.alloc(path.length * 2 + 1);
    attatchPathPtr.writeUtf16String(path);
    exports.attatchPath = attatchPath = Memory.alloc(0x28);
    attatchPath
        .writePointer(attatchPathPtr)
        .add(0x04)
        .writeU32(path.length * 2)
        .add(0x04)
        .writeU32(path.length * 2)
        .add(0x04);
    Memory.patchCode(attatchAsm, Process.pageSize, (code) => {
        var cw = new X86Writer(code, { pc: attatchAsm });
        cw.putPushfx();
        cw.putPushax();
        cw.putSubRegImm("esp", 0x14);
        //mov byte ptr ss : [ebp - 0x6C] , 0x0
        //cw.putMovNearPtrReg(attatchEbp, 'ebp')
        //cw.putMovRegOffsetPtrU32('ebp', -0x6c, 0x0)
        //cw.putMovRegRegOffsetPtr('edx', 'ebp', -0x6c)
        //putShlRegU8(reg, immValue)
        cw.putMovRegAddress("ebx", attatchPath);
        cw.putMovRegAddress("eax", attatchEaxbuf);
        cw.putMovRegReg("ecx", "esp");
        cw.putPushReg("eax");
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.send_attatch_call_offset1));
        cw.putPushU32(0);
        cw.putSubRegImm("esp", 0x14);
        cw.putMovRegReg("ecx", "esp");
        cw.putPushU32(-1);
        cw.putPushU32(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.send_attatch_call_para).toInt32());
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.send_attatch_call_offset2));
        cw.putSubRegImm("esp", 0x14);
        cw.putMovRegReg("ecx", "esp");
        cw.putPushU32(attatchPath.toInt32());
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.send_attatch_call_offset3));
        cw.putSubRegImm("esp", 0x14);
        cw.putMovRegReg("ecx", "esp");
        cw.putPushU32(attatchWxid.toInt32());
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.send_attatch_call_offset4));
        cw.putMovRegAddress("eax", attatchBuf);
        cw.putPushReg("eax");
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.send_attatch_call_offset5));
        cw.putMovRegReg("ecx", "eax");
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.send_attatch_call_offset6));
        cw.putPopax();
        cw.putPopfx();
        cw.putRet();
        cw.flush();
    });
    const nativeativeFunction = new NativeFunction(ptr(attatchAsm), "void", []);
    nativeativeFunction();
};
exports.sendAttatchMsgNativeFunction = sendAttatchMsgNativeFunction;
},{"../CommonData/data-offset":3,"../initStruct/all_init_Fn":32}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMsgNativeFunction = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const sendMsgNativeFunction = (() => {
    //const asmBuffer   = Memory.alloc(/*0x5a8*/0x5f0) // magic number from wechat-bot (laozhang)
    const asmBuffer = Memory.alloc(0x5f0);
    const asmSendMsg = Memory.alloc(Process.pageSize);
    Memory.patchCode(asmSendMsg, Process.pageSize, (code) => {
        var cw = new X86Writer(code, { pc: asmSendMsg });
        cw.putPushReg("ebp");
        cw.putMovRegReg("ebp", "esp");
        cw.putPushax();
        cw.putPushfx();
        cw.putPushU32(1); // push
        cw.putPushU32(0); // push
        cw.putMovRegRegOffsetPtr("ebx", "ebp", 0xc); // arg 1
        cw.putPushReg("ebx"); // push
        cw.putMovRegRegOffsetPtr("edx", "ebp", 0x8); // arg 0
        cw.putMovRegAddress("ecx", asmBuffer);
        //0x3b56a0 3.2.1.121
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.send_txt_call_offset));
        cw.putAddRegImm("esp", 0xc);
        cw.putPopfx();
        cw.putPopax();
        cw.putMovRegRegPtr("esp", "ebp"); // Huan(202107): why use RegRegPtr? (RegRet will fail)
        cw.putPopReg("ebp");
        cw.putRet();
        cw.flush();
    });
    /*let ins = Instruction.parse(asmSendMsg)
    for (let i=0; i<20; i++) {
      console.log(ins.address, '\t', ins.mnemonic, '\t', ins.opStr)
      ins = Instruction.parse(ins.next)
    }*/
    const asmNativeFunction = new NativeFunction(asmSendMsg, "void", [
        "pointer",
        "pointer",
    ]);
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
            .writePointer(talkerIdPtr)
            .add(0x4)
            .writeU32(talkerId.length)
            .add(0x4)
            .writeU32(talkerId.length * 2);
        contentStruct
            .writePointer(contentPtr)
            .add(0x4)
            .writeU32(content.length)
            .add(0x4)
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
},{"../CommonData/data-offset":3}],15:[function(require,module,exports){
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
const sendPicMsgNativeFunction = (contactId, path) => {
    exports.picAsm = picAsm = Memory.alloc(Process.pageSize);
    exports.buffwxid = buffwxid = Memory.alloc(0x20);
    exports.picbuff = picbuff = Memory.alloc(0x378);
    exports.pathPtr = pathPtr = Memory.alloc(path.length * 2 + 1);
    pathPtr.writeUtf16String(path);
    exports.imagefilepath = imagefilepath = Memory.alloc(0x24);
    imagefilepath
        .writePointer(pathPtr)
        .add(0x04)
        .writeU32(path.length * 2)
        .add(0x04)
        .writeU32(path.length * 2)
        .add(0x04);
    exports.picWxidPtr = picWxidPtr = Memory.alloc(contactId.length * 2 + 1);
    picWxidPtr.writeUtf16String(contactId);
    exports.picWxid = picWxid = Memory.alloc(0x0c);
    picWxid
        .writePointer(ptr(picWxidPtr))
        .add(0x04)
        .writeU32(contactId.length * 2)
        .add(0x04)
        .writeU32(contactId.length * 2)
        .add(0x04);
    Memory.patchCode(picAsm, Process.pageSize, (code) => {
        var cw = new X86Writer(code, { pc: picAsm });
        cw.putPushfx();
        cw.putPushax();
        cw.putSubRegImm("esp", 0x14);
        cw.putMovRegAddress("eax", buffwxid);
        cw.putMovRegReg("ecx", "esp");
        cw.putPushReg("eax");
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.send_picmsg_call_offset1));
        cw.putMovRegAddress("ebx", imagefilepath);
        cw.putPushReg("ebx");
        cw.putMovRegAddress("eax", picWxid);
        cw.putPushReg("eax");
        cw.putMovRegAddress("eax", picbuff);
        cw.putPushReg("eax");
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.send_picmsg_call_offset2));
        cw.putMovRegReg("ecx", "eax");
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.send_picmsg_call_offset3));
        cw.putPopax();
        cw.putPopfx();
        cw.putRet();
        cw.flush();
    });
    const nativeativeFunction = new NativeFunction(ptr(picAsm), "void", []);
    nativeativeFunction();
};
exports.sendPicMsgNativeFunction = sendPicMsgNativeFunction;
},{"../CommonData/data-offset":3}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callLoginQrcodeFunction = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const getQrcodeLoginData_1 = require("./getQrcodeLoginData");
const callLoginQrcodeFunction = (forceRefresh = false) => {
    const json = (0, getQrcodeLoginData_1.getQrcodeLoginData)();
    if (!forceRefresh && json.uuid) {
        return;
    }
    const callAsm = Memory.alloc(Process.pageSize);
    const loginWnd = data_offset_1.moduleBaseAddress
        .add(data_offset_1.offset.get_login_wnd_offset)
        .readPointer();
    Memory.patchCode(callAsm, Process.pageSize, (code) => {
        var cw = new X86Writer(code, { pc: callAsm });
        cw.putPushfx();
        cw.putPushax();
        cw.putMovRegAddress("ecx", loginWnd);
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.get_qr_login_call_offset));
        cw.putPopax();
        cw.putPopfx();
        cw.putRet();
        cw.flush();
    });
    const nativeativeFunction = new NativeFunction(ptr(callAsm), "void", []);
    nativeativeFunction();
};
exports.callLoginQrcodeFunction = callLoginQrcodeFunction;
},{"../CommonData/data-offset":3,"./getQrcodeLoginData":18}],17:[function(require,module,exports){
(function (setImmediate){(function (){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkQRLoginNativeCallback = void 0;
const getQrcodeLoginData_1 = require("./getQrcodeLoginData");
const data_offset_1 = require("../CommonData/data-offset");
const readString_1 = require("../CommonFn/readString");
const isLoggedIn_1 = require("../versionFn/isLoggedIn");
const checkQRLoginNativeCallback = (() => {
    const nativeCallback = new NativeCallback(() => { }, "void", [
        "int32",
        "pointer",
        "pointer",
        "pointer",
        "pointer",
        "pointer",
        "int32",
        "pointer",
    ]);
    const nativeativeFunction = new NativeFunction(nativeCallback, "void", [
        "int32",
        "pointer",
        "pointer",
        "pointer",
        "pointer",
        "pointer",
        "int32",
        "pointer",
    ]);
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
            Memory.allocUtf8String(json.uuid ? `http://weixin.qq.com/x/${json.uuid}` : ""),
            Memory.allocUtf8String(json.wxid || ""),
            Memory.allocUtf8String(json.avatarUrl || ""),
            Memory.allocUtf8String(json.nickname || ""),
            Memory.allocUtf8String(json.phoneType || ""),
            json.phoneClientVer || 0,
            Memory.allocUtf8String(json.pairWaitTip || ""),
        ];
        setImmediate(() => nativeativeFunction(...arr));
    };
    Interceptor.attach(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.hook_get_login_qr_offset), callback);
    Interceptor.attach(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.hook_check_login_qr_offset), callback);
    Interceptor.attach(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.hook_save_login_qr_info_offset), {
        onEnter: function () {
            const qrNotify = this.context["ebp"].sub(72); //zijiadaima  as keyof cpucontext
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

},{"../CommonData/data-offset":3,"../CommonFn/readString":8,"../versionFn/isLoggedIn":38,"./getQrcodeLoginData":18,"timers":2}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQrcodeLoginData = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const CommonFn_1 = require("../CommonFn");
const getQrcodeLoginData = () => {
    const getQRCodeLoginMgr = new NativeFunction(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.get_qr_login_data_offset), "pointer", []);
    const qlMgr = getQRCodeLoginMgr();
    const json = {
        status: 0,
        uuid: "",
        wxid: "",
        avatarUrl: "",
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
},{"../CommonData/data-offset":3,"../CommonFn":7}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQrcodeLoginData = exports.checkQRLoginNativeCallback = exports.callLoginQrcodeFunction = void 0;
const callLoginQrcodeFunction_1 = require("./callLoginQrcodeFunction");
Object.defineProperty(exports, "callLoginQrcodeFunction", { enumerable: true, get: function () { return callLoginQrcodeFunction_1.callLoginQrcodeFunction; } });
const checkQRLoginNativeCallback_1 = require("./checkQRLoginNativeCallback");
Object.defineProperty(exports, "checkQRLoginNativeCallback", { enumerable: true, get: function () { return checkQRLoginNativeCallback_1.checkQRLoginNativeCallback; } });
const getQrcodeLoginData_1 = require("./getQrcodeLoginData");
Object.defineProperty(exports, "getQrcodeLoginData", { enumerable: true, get: function () { return getQrcodeLoginData_1.getQrcodeLoginData; } });
},{"./callLoginQrcodeFunction":16,"./checkQRLoginNativeCallback":17,"./getQrcodeLoginData":18}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBaseNodeAddress = exports.getChatroomNodeAddress = exports.getHeaderNodeAddress = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const getBaseNodeAddress = () => {
    return data_offset_1.moduleBaseAddress.add(data_offset_1.offset.node_offset).readPointer();
};
exports.getBaseNodeAddress = getBaseNodeAddress;
// 获取联系人数据的树根节点地址
const getHeaderNodeAddress = () => {
    const baseAddress = getBaseNodeAddress();
    if (baseAddress.isNull()) {
        return baseAddress;
    }
    return baseAddress.add(data_offset_1.offset.handle_offset).readPointer();
};
exports.getHeaderNodeAddress = getHeaderNodeAddress;
// 获取群数据的树根节点地址
const getChatroomNodeAddress = () => {
    const baseAddress = getBaseNodeAddress();
    if (baseAddress.isNull()) {
        return baseAddress;
    }
    return baseAddress.add(data_offset_1.offset.chatroom_node_offset).readPointer();
};
exports.getChatroomNodeAddress = getChatroomNodeAddress;
},{"../CommonData/data-offset":3}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSupportedFunction = void 0;
const getWechatVersionFunction_1 = require("./getWechatVersionFunction");
const data_offset_1 = require("../CommonData/data-offset");
const checkSupportedFunction = () => {
    const ver = (0, getWechatVersionFunction_1.getWechatVersionFunction)();
    return ver == data_offset_1.availableVersion;
};
exports.checkSupportedFunction = checkSupportedFunction;
},{"../CommonData/data-offset":3,"./getWechatVersionFunction":25}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatroomMemberInfoFunction = void 0;
const getAddress_1 = require("../getAddressData/getAddress");
const chatroomRecurse_1 = require("../parse-getData/chatroomRecurse");
const globalVariable_1 = require("../globalVariable");
const getChatroomMemberInfoFunction = () => {
    const chatroomNodeAddress = (0, getAddress_1.getChatroomNodeAddress)();
    if (chatroomNodeAddress.isNull()) {
        return "[]";
    }
    const node = chatroomNodeAddress.add(0x0).readPointer();
    const ret = (0, chatroomRecurse_1.chatroomRecurse)(node);
    const cloneRet = JSON.stringify(ret);
    globalVariable_1.chatroomNodeList.length = 0; //empty
    globalVariable_1.chatroomMemberList.length = 0; //empty
    return cloneRet;
};
exports.getChatroomMemberInfoFunction = getChatroomMemberInfoFunction;
},{"../getAddressData/getAddress":20,"../globalVariable":30,"../parse-getData/chatroomRecurse":33}],23:[function(require,module,exports){
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
const getChatroomMemberNickInfoFunction = (memberId, roomId) => {
    exports.nickBuff = nickBuff = Memory.alloc(0x7e4);
    exports.nickRetAddr = nickRetAddr = Memory.alloc(0x04);
    exports.memberNickBuffAsm = memberNickBuffAsm = Memory.alloc(Process.pageSize);
    exports.nickRoomId = nickRoomId = (0, all_init_Fn_1.initidStruct)(roomId);
    exports.nickMemberId = nickMemberId = (0, all_init_Fn_1.initStruct)(memberId);
    exports.nickStructPtr = nickStructPtr = (0, all_init_Fn_1.initmsgStruct)("");
    Memory.patchCode(memberNickBuffAsm, Process.pageSize, (code) => {
        var cw = new X86Writer(code, { pc: memberNickBuffAsm });
        cw.putPushfx();
        cw.putPushax();
        cw.putMovRegAddress("ebx", nickStructPtr);
        cw.putMovRegAddress("esi", nickMemberId);
        cw.putMovRegAddress("edi", nickRoomId);
        cw.putMovRegAddress("ecx", nickBuff);
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.chatroom_member_nick_call_offset1));
        cw.putMovRegAddress("eax", nickBuff);
        cw.putPushReg("eax");
        cw.putPushReg("esi");
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.chatroom_member_nick_call_offset2));
        cw.putMovRegReg("ecx", "eax");
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.chatroom_member_nick_call_offset3));
        cw.putPushU32(1);
        cw.putPushReg("ebx");
        cw.putMovRegReg("edx", "edi");
        cw.putMovRegAddress("ecx", nickBuff);
        cw.putCallAddress(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.chatroom_member_nick_call_offset4));
        cw.putAddRegImm("esp", 0x08);
        cw.putMovNearPtrReg(nickRetAddr, "ebx");
        cw.putPopax();
        cw.putPopfx();
        cw.putRet();
        cw.flush();
    });
    const nativeativeFunction = new NativeFunction(ptr(memberNickBuffAsm), "void", []);
    nativeativeFunction();
    return (0, readString_1.readWideString)(nickRetAddr.readPointer());
};
exports.getChatroomMemberNickInfoFunction = getChatroomMemberNickInfoFunction;
},{"../CommonData/data-offset":3,"../CommonFn/readString":8,"../initStruct/all_init_Fn":32}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContactNativeFunction = void 0;
const getAddress_1 = require("../getAddressData/getAddress");
const index_1 = require("../globalVariable/index");
const recurse_1 = require("../parse-getData/recurse");
const getContactNativeFunction = () => {
    const headerNodeAddress = (0, getAddress_1.getHeaderNodeAddress)();
    if (headerNodeAddress.isNull()) {
        return "[]";
    }
    const node = headerNodeAddress.add(0x0).readPointer();
    const ret = (0, recurse_1.recurse)(node);
    /*for (let item in ret.contact){
      console.log(ret.contact[item].wxid,ret.contact[item].wx_code,ret.contact[item].name)
    }*/
    //console.log(ret.contact)
    const cloneRet = JSON.stringify(ret);
    index_1.nodeList.length = 0;
    index_1.contactList.length = 0;
    return cloneRet;
};
exports.getContactNativeFunction = getContactNativeFunction;
},{"../getAddressData/getAddress":20,"../globalVariable/index":30,"../parse-getData/recurse":34}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWechatVersionFunction = void 0;
const index_1 = require("../globalVariable/index");
const CommonData_1 = require("../CommonData");
const getWechatVersionFunction = () => {
    if (index_1.currentVersion.data) {
        return index_1.currentVersion.data;
    }
    const pattern = "55 8B ?? 83 ?? ?? A1 ?? ?? ?? ?? 83 ?? ?? 85 ?? 7F ?? 8D ?? ?? E8 ?? ?? ?? ?? 84 ?? 74 ?? 8B ?? ?? ?? 85 ?? 75 ?? E8 ?? ?? ?? ?? 0F ?? ?? 0D ?? ?? ?? ?? A3 ?? ?? ?? ?? A3 ?? ?? ?? ?? 8B ?? 5D C3";
    const results = Memory.scanSync(CommonData_1.moduleLoad.base, CommonData_1.moduleLoad.size, pattern);
    if (results.length == 0) {
        return 0;
    }
    const addr = results[0].address;
    const ret = addr.add(0x07).readPointer();
    const ver = ret.add(0x0).readU32();
    index_1.currentVersion.data = ver;
    return ver;
};
exports.getWechatVersionFunction = getWechatVersionFunction;
},{"../CommonData":4,"../globalVariable/index":30}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWechatVersionStringFunction = void 0;
const getWechatVersionFunction_1 = require("./getWechatVersionFunction");
const getWechatVersionStringFunction = (ver = (0, getWechatVersionFunction_1.getWechatVersionFunction)()) => {
    if (!ver) {
        return "0.0.0.0";
    }
    const vers = [];
    vers.push((ver >> 24) & (255 - 0x60));
    vers.push((ver >> 16) & 255);
    vers.push((ver >> 8) & 255);
    vers.push(ver & 255);
    return vers.join(".");
};
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
const getMyselfInfoFunction = () => {
    // let ptr: number = 0
    let wx_code = "";
    let wx_id = "";
    let wx_name = "";
    let head_img_url = "";
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
};
exports.getMyselfInfoFunction = getMyselfInfoFunction;
const getMyselfIdFunction = () => {
    let wx_id = (0, readString_1.readString)(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.wxid_offset));
    return wx_id;
};
exports.getMyselfIdFunction = getMyselfIdFunction;
},{"../CommonData/data-offset":3,"../CommonFn/readString":8}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyselfIdFunction = exports.getMyselfInfoFunction = void 0;
const getUserData_1 = require("./getUserData");
Object.defineProperty(exports, "getMyselfInfoFunction", { enumerable: true, get: function () { return getUserData_1.getMyselfInfoFunction; } });
Object.defineProperty(exports, "getMyselfIdFunction", { enumerable: true, get: function () { return getUserData_1.getMyselfIdFunction; } });
},{"./getUserData":28}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggedIn = exports.chatroomMemberList = exports.chatroomNodeList = exports.contactList = exports.nodeList = exports.currentVersion = void 0;
let currentVersion = {
    data: 0,
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
    data: false,
};
exports.loggedIn = loggedIn;
},{}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentReadyCallback = exports.hookLoginEventCallback = exports.hookLogoutEventCallback = exports.checkQRLoginNativeCallback = exports.recvMsgNativeCallback = exports.SendMiniProgramNativeFunction = exports.sendAtMsgNativeFunction = exports.sendPicMsgNativeFunction = exports.sendAttatchMsgNativeFunction = exports.sendMsgNativeFunction = exports.getContactNativeFunction = exports.callLoginQrcodeFunction = exports.checkSupportedFunction = exports.getWechatVersionStringFunction = exports.getWechatVersionFunction = exports.getChatroomMemberInfoFunction = exports.getMyselfInfoFunction = exports.isLoggedInFunction = exports.getTestInfoFunction = exports.getChatroomMemberNickInfoFunction = void 0;
const CommonFn_1 = require("./CommonFn");
Object.defineProperty(exports, "agentReadyCallback", { enumerable: true, get: function () { return CommonFn_1.agentReadyCallback; } });
Object.defineProperty(exports, "getTestInfoFunction", { enumerable: true, get: function () { return CommonFn_1.getTestInfoFunction; } });
const isLoggedIn_1 = require("./versionFn/isLoggedIn");
Object.defineProperty(exports, "isLoggedInFunction", { enumerable: true, get: function () { return isLoggedIn_1.isLoggedInFunction; } });
const getData_1 = require("./getData");
Object.defineProperty(exports, "checkSupportedFunction", { enumerable: true, get: function () { return getData_1.checkSupportedFunction; } });
Object.defineProperty(exports, "getChatroomMemberInfoFunction", { enumerable: true, get: function () { return getData_1.getChatroomMemberInfoFunction; } });
Object.defineProperty(exports, "getChatroomMemberNickInfoFunction", { enumerable: true, get: function () { return getData_1.getChatroomMemberNickInfoFunction; } });
Object.defineProperty(exports, "getContactNativeFunction", { enumerable: true, get: function () { return getData_1.getContactNativeFunction; } });
Object.defineProperty(exports, "getWechatVersionFunction", { enumerable: true, get: function () { return getData_1.getWechatVersionFunction; } });
Object.defineProperty(exports, "getWechatVersionStringFunction", { enumerable: true, get: function () { return getData_1.getWechatVersionStringFunction; } });
const getUserData_1 = require("./getUserData");
Object.defineProperty(exports, "getMyselfInfoFunction", { enumerable: true, get: function () { return getUserData_1.getMyselfInfoFunction; } });
const Message_about_1 = require("./Message_about");
Object.defineProperty(exports, "recvMsgNativeCallback", { enumerable: true, get: function () { return Message_about_1.recvMsgNativeCallback; } });
Object.defineProperty(exports, "sendAtMsgNativeFunction", { enumerable: true, get: function () { return Message_about_1.sendAtMsgNativeFunction; } });
Object.defineProperty(exports, "sendAttatchMsgNativeFunction", { enumerable: true, get: function () { return Message_about_1.sendAttatchMsgNativeFunction; } });
Object.defineProperty(exports, "SendMiniProgramNativeFunction", { enumerable: true, get: function () { return Message_about_1.SendMiniProgramNativeFunction; } });
Object.defineProperty(exports, "sendMsgNativeFunction", { enumerable: true, get: function () { return Message_about_1.sendMsgNativeFunction; } });
Object.defineProperty(exports, "sendPicMsgNativeFunction", { enumerable: true, get: function () { return Message_about_1.sendPicMsgNativeFunction; } });
const QR_aboutFn_1 = require("./QR-aboutFn");
Object.defineProperty(exports, "callLoginQrcodeFunction", { enumerable: true, get: function () { return QR_aboutFn_1.callLoginQrcodeFunction; } });
Object.defineProperty(exports, "checkQRLoginNativeCallback", { enumerable: true, get: function () { return QR_aboutFn_1.checkQRLoginNativeCallback; } });
const version_hook_1 = require("./version-hook");
Object.defineProperty(exports, "hookLoginEventCallback", { enumerable: true, get: function () { return version_hook_1.hookLoginEventCallback; } });
Object.defineProperty(exports, "hookLogoutEventCallback", { enumerable: true, get: function () { return version_hook_1.hookLogoutEventCallback; } });
},{"./CommonFn":7,"./Message_about":10,"./QR-aboutFn":19,"./getData":27,"./getUserData":29,"./version-hook":37,"./versionFn/isLoggedIn":38}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAtMsgStruct = exports.initStruct = exports.initidStruct = exports.initmsgStruct = void 0;
let msgStruct = null;
let msgstrPtr = null;
const initmsgStruct = (str) => {
    msgstrPtr = Memory.alloc(str.length * 2 + 1);
    msgstrPtr.writeUtf16String(str);
    msgStruct = Memory.alloc(0x14); // returns a NativePointer
    msgStruct
        .writePointer(msgstrPtr)
        .add(0x04)
        .writeU32(str.length * 2)
        .add(0x04)
        .writeU32(str.length * 2)
        .add(0x04)
        .writeU32(0)
        .add(0x04)
        .writeU32(0);
    return msgStruct;
};
exports.initmsgStruct = initmsgStruct;
let retidStruct = null;
let retidPtr = null;
const initidStruct = (str) => {
    retidPtr = Memory.alloc(str.length * 2 + 1);
    retidPtr.writeUtf16String(str);
    retidStruct = Memory.alloc(0x14); // returns a NativePointer
    retidStruct
        .writePointer(retidPtr)
        .add(0x04)
        .writeU32(str.length * 2)
        .add(0x04)
        .writeU32(str.length * 2)
        .add(0x04)
        .writeU32(0)
        .add(0x04)
        .writeU32(0);
    return retidStruct;
};
exports.initidStruct = initidStruct;
let retPtr = null;
let retStruct = null;
const initStruct = (str) => {
    retPtr = Memory.alloc(str.length * 2 + 1);
    retPtr.writeUtf16String(str);
    retStruct = Memory.alloc(0x14); // returns a NativePointer
    retStruct
        .writePointer(retPtr)
        .add(0x04)
        .writeU32(str.length * 2)
        .add(0x04)
        .writeU32(str.length * 2)
        .add(0x04)
        .writeU32(0)
        .add(0x04)
        .writeU32(0);
    return retStruct;
};
exports.initStruct = initStruct;
let atStruct = null;
const initAtMsgStruct = (wxidStruct) => {
    atStruct = Memory.alloc(0x10);
    atStruct
        .writePointer(wxidStruct)
        .add(0x04)
        .writeU32(wxidStruct.toInt32() + 0x14)
        .add(0x04) //0x14 = sizeof(wxid structure)
        .writeU32(wxidStruct.toInt32() + 0x14)
        .add(0x04)
        .writeU32(0);
    return atStruct;
};
exports.initAtMsgStruct = initAtMsgStruct;
},{}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatroomRecurse = void 0;
const getAddress_1 = require("../getAddressData/getAddress");
const index_1 = require("../globalVariable/index");
const readString_1 = require("../CommonFn/readString");
const chatroomRecurse = (node) => {
    const chatroomNodeAddress = (0, getAddress_1.getChatroomNodeAddress)();
    //bianjiepanduan
    if (chatroomNodeAddress.isNull()) {
        return;
    }
    if (node.equals(chatroomNodeAddress)) {
        return;
    }
    for (const item in index_1.chatroomNodeList) {
        if (node.equals(index_1.chatroomNodeList[item])) {
            return;
        }
    }
    index_1.chatroomNodeList.push(node);
    const roomid = (0, readString_1.readWideString)(node.add(0x10));
    const len = node.add(0x50).readU32(); //fanhui32fudianshu
    //const memberJson={}
    if (len > 4) {
        //
        const memberStr = (0, readString_1.readString)(node.add(0x40));
        if (memberStr.length > 0) {
            const memberList = memberStr.split(/[\\^][G]/);
            const memberJson = {
                roomid: roomid,
                roomMember: memberList,
            };
            index_1.chatroomMemberList.push(memberJson);
        }
    }
    const leftNode = node.add(0x0).readPointer();
    const centerNode = node.add(0x04).readPointer();
    const rightNode = node.add(0x08).readPointer();
    chatroomRecurse(leftNode);
    chatroomRecurse(centerNode);
    chatroomRecurse(rightNode);
    const allChatroomMemberJson = index_1.chatroomMemberList;
    return allChatroomMemberJson;
};
exports.chatroomRecurse = chatroomRecurse;
},{"../CommonFn/readString":8,"../getAddressData/getAddress":20,"../globalVariable/index":30}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recurse = void 0;
const getAddress_1 = require("../getAddressData/getAddress");
const index_1 = require("../globalVariable/index");
const readString_1 = require("../CommonFn/readString");
const recurse = (node) => {
    const headerNodeAddress = (0, getAddress_1.getHeaderNodeAddress)();
    if (headerNodeAddress.isNull()) {
        return;
    }
    if (node.equals(headerNodeAddress)) {
        return;
    }
    for (const item in index_1.nodeList) {
        if (node.equals(index_1.nodeList[item])) {
            return;
        }
    }
    index_1.nodeList.push(node);
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
    const gender = node.add(0x18c).readU32();
    const contactJson = {
        id: wxid,
        code: wx_code,
        name: name,
        alias: alias,
        avatarUrl: avatar,
        gender: gender,
    };
    index_1.contactList.push(contactJson);
    const leftNode = node.add(0x0).readPointer();
    const centerNode = node.add(0x04).readPointer();
    const rightNode = node.add(0x08).readPointer();
    recurse(leftNode);
    recurse(centerNode);
    recurse(rightNode);
    const allContactJson = index_1.contactList;
    return allContactJson;
};
exports.recurse = recurse;
},{"../CommonFn/readString":8,"../getAddressData/getAddress":20,"../globalVariable/index":30}],35:[function(require,module,exports){
(function (setImmediate){(function (){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hookLoginEventCallback = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const isLoggedIn_1 = require("../versionFn/isLoggedIn");
const hookLoginEventCallback = (() => {
    const nativeCallback = new NativeCallback(() => { }, "void", []);
    const nativeativeFunction = new NativeFunction(nativeCallback, "void", []);
    Interceptor.attach(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.hook_on_login_offset), {
        onLeave: function (retval) {
            (0, isLoggedIn_1.isLoggedInFunction)();
            setImmediate(() => nativeativeFunction());
            return retval;
        },
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

},{"../CommonData/data-offset":3,"../versionFn/isLoggedIn":38,"timers":2}],36:[function(require,module,exports){
(function (setImmediate){(function (){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hookLogoutEventCallback = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const hookLogoutEventCallback = (() => {
    const nativeCallback = new NativeCallback(() => { }, "void", ["int32"]);
    const nativeativeFunction = new NativeFunction(nativeCallback, "void", ["int32"]);
    Interceptor.attach(data_offset_1.moduleBaseAddress.add(data_offset_1.offset.hook_on_logout_offset), {
        onEnter: function (args) {
            const bySrv = args[0].toInt32();
            setImmediate(() => nativeativeFunction(bySrv));
        },
    });
    return nativeCallback;
})();
exports.hookLogoutEventCallback = hookLogoutEventCallback;
}).call(this)}).call(this,require("timers").setImmediate)

},{"../CommonData/data-offset":3,"timers":2}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hookLogoutEventCallback = exports.hookLoginEventCallback = void 0;
const hookLoginEventCallback_1 = require("./hookLoginEventCallback");
Object.defineProperty(exports, "hookLoginEventCallback", { enumerable: true, get: function () { return hookLoginEventCallback_1.hookLoginEventCallback; } });
const hookLogoutEventCallback_1 = require("./hookLogoutEventCallback");
Object.defineProperty(exports, "hookLogoutEventCallback", { enumerable: true, get: function () { return hookLogoutEventCallback_1.hookLogoutEventCallback; } });
},{"./hookLoginEventCallback":35,"./hookLogoutEventCallback":36}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedInFunction = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const globalVariable_1 = require("../globalVariable");
const isLoggedInFunction = () => {
    globalVariable_1.loggedIn.data = data_offset_1.moduleBaseAddress
        .add(data_offset_1.offset.is_logged_in_offset)
        .readU32();
    return !!globalVariable_1.loggedIn.data;
};
exports.isLoggedInFunction = isLoggedInFunction;
},{"../CommonData/data-offset":3,"../globalVariable":30}]},{},[31])(31)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3RpbWVycy1icm93c2VyaWZ5L21haW4uanMiLCJzcmMvYWdlbnQvQ29tbW9uRGF0YS9kYXRhLW9mZnNldC50cyIsInNyYy9hZ2VudC9Db21tb25EYXRhL2luZGV4LnRzIiwic3JjL2FnZW50L0NvbW1vbkZuL2FnZW50UmVhZHlDYWxsYmFjay50cyIsInNyYy9hZ2VudC9Db21tb25Gbi9nZXRUZXN0SW5mby50cyIsInNyYy9hZ2VudC9Db21tb25Gbi9pbmRleC50cyIsInNyYy9hZ2VudC9Db21tb25Gbi9yZWFkU3RyaW5nLnRzIiwic3JjL2FnZW50L01lc3NhZ2VfYWJvdXQvU2VuZE1pbmlQcm9ncmFtTmF0aXZlRnVuY3Rpb24udHMiLCJzcmMvYWdlbnQvTWVzc2FnZV9hYm91dC9pbmRleC50cyIsInNyYy9hZ2VudC9NZXNzYWdlX2Fib3V0L3JlY3ZNc2dOYXRpdmVDYWxsYmFjay50cyIsInNyYy9hZ2VudC9NZXNzYWdlX2Fib3V0L3NlbmRBdE1zZ05hdGl2ZUZ1bmN0aW9uLnRzIiwic3JjL2FnZW50L01lc3NhZ2VfYWJvdXQvc2VuZEF0dGF0Y2hNc2dOYXRpdmVGdW5jdGlvbi50cyIsInNyYy9hZ2VudC9NZXNzYWdlX2Fib3V0L3NlbmRNc2dOYXRpdmVGdW5jdGlvbi50cyIsInNyYy9hZ2VudC9NZXNzYWdlX2Fib3V0L3NlbmRQaWNNc2dOYXRpdmVGdW5jdGlvbi50cyIsInNyYy9hZ2VudC9RUi1hYm91dEZuL2NhbGxMb2dpblFyY29kZUZ1bmN0aW9uLnRzIiwic3JjL2FnZW50L1FSLWFib3V0Rm4vY2hlY2tRUkxvZ2luTmF0aXZlQ2FsbGJhY2sudHMiLCJzcmMvYWdlbnQvUVItYWJvdXRGbi9nZXRRcmNvZGVMb2dpbkRhdGEudHMiLCJzcmMvYWdlbnQvUVItYWJvdXRGbi9pbmRleC50cyIsInNyYy9hZ2VudC9nZXRBZGRyZXNzRGF0YS9nZXRBZGRyZXNzLnRzIiwic3JjL2FnZW50L2dldERhdGEvY2hlY2tTdXBwb3J0ZWQudHMiLCJzcmMvYWdlbnQvZ2V0RGF0YS9nZXRDaGF0cm9vbU1lbWJlckluZm8udHMiLCJzcmMvYWdlbnQvZ2V0RGF0YS9nZXRDaGF0cm9vbU1lbWJlck5pY2tJbmZvRnVuY3Rpb24udHMiLCJzcmMvYWdlbnQvZ2V0RGF0YS9nZXRDb250YWN0TmF0aXZlRnVuY3Rpb24udHMiLCJzcmMvYWdlbnQvZ2V0RGF0YS9nZXRXZWNoYXRWZXJzaW9uRnVuY3Rpb24udHMiLCJzcmMvYWdlbnQvZ2V0RGF0YS9nZXRXZWNoYXRWZXJzaW9uU3RyaW5nLnRzIiwic3JjL2FnZW50L2dldERhdGEvaW5kZXgudHMiLCJzcmMvYWdlbnQvZ2V0VXNlckRhdGEvZ2V0VXNlckRhdGEudHMiLCJzcmMvYWdlbnQvZ2V0VXNlckRhdGEvaW5kZXgudHMiLCJzcmMvYWdlbnQvZ2xvYmFsVmFyaWFibGUvaW5kZXgudHMiLCJzcmMvYWdlbnQvaW5kZXgudHMiLCJzcmMvYWdlbnQvaW5pdFN0cnVjdC9hbGxfaW5pdF9Gbi50cyIsInNyYy9hZ2VudC9wYXJzZS1nZXREYXRhL2NoYXRyb29tUmVjdXJzZS50cyIsInNyYy9hZ2VudC9wYXJzZS1nZXREYXRhL3JlY3Vyc2UudHMiLCJzcmMvYWdlbnQvdmVyc2lvbi1ob29rL2hvb2tMb2dpbkV2ZW50Q2FsbGJhY2sudHMiLCJzcmMvYWdlbnQvdmVyc2lvbi1ob29rL2hvb2tMb2dvdXRFdmVudENhbGxiYWNrLnRzIiwic3JjL2FnZW50L3ZlcnNpb24taG9vay9pbmRleC50cyIsInNyYy9hZ2VudC92ZXJzaW9uRm4vaXNMb2dnZWRJbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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
