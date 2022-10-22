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
},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestInfoFunction = void 0;
const getTestInfoFunction = () => {
    const nativeativeFunction = new NativeFunction(ptr(0x4f230000), "void", []);
    nativeativeFunction();
};
exports.getTestInfoFunction = getTestInfoFunction;
},{}],5:[function(require,module,exports){
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
},{"./agentReadyCallback":3,"./getTestInfo":4,"./readString":6}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMiniProgramNativeFunction = void 0;
const getUserData_1 = require("../../Version/getUserData/getUserData");
const globalVariable_1 = require("../globalVariable");
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
        cw.putCallAddress(globalVariable_1.moduleBaseAddress.add(0x69bb0)); //init ecx
        cw.putPushU32(0x21);
        cw.putPushNearPtr(ptr_to_buf_1); //ptr
        cw.putPushU32(bg_path_Struct.toInt32());
        cw.putPushU32(pXml.toInt32());
        cw.putPushU32(recv_wxid_Struct.toInt32());
        cw.putMovRegAddress("edx", send_wxid_Struct);
        cw.putMovRegAddress("ecx", ECX_buf);
        cw.putCallAddress(globalVariable_1.moduleBaseAddress.add(0x2e2420));
        cw.putAddRegImm("esp", 0x14);
        cw.putPushU32(Buf_EAX.toInt32());
        cw.putMovRegAddress("ecx", ECX_buf);
        cw.putCallAddress(globalVariable_1.moduleBaseAddress.add(0x94c10));
        cw.putPushU32(globalVariable_1.moduleBaseAddress.add(0x1dcb46c).toInt32());
        cw.putPushU32(globalVariable_1.moduleBaseAddress.add(0x1dcb46c).toInt32());
        cw.putMovRegAddress("ecx", ECX_buf);
        cw.putCallAddress(globalVariable_1.moduleBaseAddress.add(0x2e2630));
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
},{"../../Version/getUserData/getUserData":29,"../globalVariable":14,"../initStruct/all_init_Fn":15}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPicMsgNativeFunction = exports.picbuff = exports.picAsm = exports.picWxidPtr = exports.picWxid = exports.pathPtr = exports.imagefilepath = exports.buffwxid = exports.sendMsgNativeFunction = exports.SendMiniProgramNativeFunction = exports.sendAttatchMsgNativeFunction = exports.attatchEaxbuf = exports.attatchEbp = exports.attatchBuf = exports.attatchAsm = exports.attatchPathPtr = exports.attatchPath = exports.attatchWxid = exports.sendAtMsgNativeFunction = exports.ecxBuffer = exports.atid_ = exports.wxid_ = exports.msg_ = exports.roomid_ = exports.asmAtMsg = exports.recvMsgNativeCallback = void 0;
const recvMsgNativeCallback_1 = require("../../Version/Message_about/recvMsgNativeCallback");
Object.defineProperty(exports, "recvMsgNativeCallback", { enumerable: true, get: function () { return recvMsgNativeCallback_1.recvMsgNativeCallback; } });
const sendAtMsgNativeFunction_1 = require("../../Version/Message_about/sendAtMsgNativeFunction");
Object.defineProperty(exports, "asmAtMsg", { enumerable: true, get: function () { return sendAtMsgNativeFunction_1.asmAtMsg; } });
Object.defineProperty(exports, "roomid_", { enumerable: true, get: function () { return sendAtMsgNativeFunction_1.roomid_; } });
Object.defineProperty(exports, "msg_", { enumerable: true, get: function () { return sendAtMsgNativeFunction_1.msg_; } });
Object.defineProperty(exports, "wxid_", { enumerable: true, get: function () { return sendAtMsgNativeFunction_1.wxid_; } });
Object.defineProperty(exports, "atid_", { enumerable: true, get: function () { return sendAtMsgNativeFunction_1.atid_; } });
Object.defineProperty(exports, "ecxBuffer", { enumerable: true, get: function () { return sendAtMsgNativeFunction_1.ecxBuffer; } });
Object.defineProperty(exports, "sendAtMsgNativeFunction", { enumerable: true, get: function () { return sendAtMsgNativeFunction_1.sendAtMsgNativeFunction; } });
const sendAttatchMsgNativeFunction_1 = require("../../Version/Message_about/sendAttatchMsgNativeFunction");
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
const sendMsgNativeFunction_1 = require("../../Version/Message_about/sendMsgNativeFunction");
Object.defineProperty(exports, "sendMsgNativeFunction", { enumerable: true, get: function () { return sendMsgNativeFunction_1.sendMsgNativeFunction; } });
const sendPicMsgNativeFunction_1 = require("../../Version/Message_about/sendPicMsgNativeFunction");
Object.defineProperty(exports, "buffwxid", { enumerable: true, get: function () { return sendPicMsgNativeFunction_1.buffwxid; } });
Object.defineProperty(exports, "imagefilepath", { enumerable: true, get: function () { return sendPicMsgNativeFunction_1.imagefilepath; } });
Object.defineProperty(exports, "pathPtr", { enumerable: true, get: function () { return sendPicMsgNativeFunction_1.pathPtr; } });
Object.defineProperty(exports, "picWxid", { enumerable: true, get: function () { return sendPicMsgNativeFunction_1.picWxid; } });
Object.defineProperty(exports, "picWxidPtr", { enumerable: true, get: function () { return sendPicMsgNativeFunction_1.picWxidPtr; } });
Object.defineProperty(exports, "picAsm", { enumerable: true, get: function () { return sendPicMsgNativeFunction_1.picAsm; } });
Object.defineProperty(exports, "picbuff", { enumerable: true, get: function () { return sendPicMsgNativeFunction_1.picbuff; } });
Object.defineProperty(exports, "sendPicMsgNativeFunction", { enumerable: true, get: function () { return sendPicMsgNativeFunction_1.sendPicMsgNativeFunction; } });
},{"../../Version/Message_about/recvMsgNativeCallback":19,"../../Version/Message_about/sendAtMsgNativeFunction":20,"../../Version/Message_about/sendAttatchMsgNativeFunction":21,"../../Version/Message_about/sendMsgNativeFunction":22,"../../Version/Message_about/sendPicMsgNativeFunction":23,"./SendMiniProgramNativeFunction":7}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatroomMemberInfoFunction = void 0;
const getAddress_1 = require("../../Version/getAddressData/getAddress");
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
},{"../../Version/getAddressData/getAddress":28,"../globalVariable":14,"../parse-getData/chatroomRecurse":16}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContactNativeFunction = void 0;
const getAddress_1 = require("../../Version/getAddressData/getAddress");
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
},{"../../Version/getAddressData/getAddress":28,"../globalVariable/index":14,"../parse-getData/recurse":17}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWechatVersionFunction = void 0;
const index_1 = require("../globalVariable/index");
const index_2 = require("../globalVariable/index");
const getWechatVersionFunction = () => {
    if (index_1.currentVersion.data) {
        return index_1.currentVersion.data;
    }
    const pattern = "55 8B ?? 83 ?? ?? A1 ?? ?? ?? ?? 83 ?? ?? 85 ?? 7F ?? 8D ?? ?? E8 ?? ?? ?? ?? 84 ?? 74 ?? 8B ?? ?? ?? 85 ?? 75 ?? E8 ?? ?? ?? ?? 0F ?? ?? 0D ?? ?? ?? ?? A3 ?? ?? ?? ?? A3 ?? ?? ?? ?? 8B ?? 5D C3";
    const results = Memory.scanSync(index_2.moduleLoad.base, index_2.moduleLoad.size, pattern);
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
},{"../globalVariable/index":14}],12:[function(require,module,exports){
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
},{"./getWechatVersionFunction":11}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWechatVersionStringFunction = exports.getWechatVersionFunction = exports.getContactNativeFunction = exports.getChatroomMemberNickInfoFunction = exports.nickRetAddr = exports.memberNickBuffAsm = exports.nickBuff = exports.nickStructPtr = exports.nickMemberId = exports.nickRoomId = exports.getChatroomMemberInfoFunction = exports.checkSupportedFunction = void 0;
const checkSupported_1 = require("../../Version/getdata/checkSupported");
Object.defineProperty(exports, "checkSupportedFunction", { enumerable: true, get: function () { return checkSupported_1.checkSupportedFunction; } });
const getChatroomMemberInfo_1 = require("./getChatroomMemberInfo");
Object.defineProperty(exports, "getChatroomMemberInfoFunction", { enumerable: true, get: function () { return getChatroomMemberInfo_1.getChatroomMemberInfoFunction; } });
const getChatroomMemberNickInfoFunction_1 = require("../../Version/getdata/getChatroomMemberNickInfoFunction");
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
},{"../../Version/getdata/checkSupported":31,"../../Version/getdata/getChatroomMemberNickInfoFunction":32,"./getChatroomMemberInfo":9,"./getContactNativeFunction":10,"./getWechatVersionFunction":11,"./getWechatVersionString":12}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleLoad = exports.moduleBaseAddress = exports.loggedIn = exports.chatroomMemberList = exports.chatroomNodeList = exports.contactList = exports.nodeList = exports.currentVersion = void 0;
const moduleBaseAddress = Module.getBaseAddress("WeChatWin.dll");
exports.moduleBaseAddress = moduleBaseAddress;
const moduleLoad = Module.load("WeChatWin.dll");
exports.moduleLoad = moduleLoad;
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
},{}],15:[function(require,module,exports){
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
},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatroomRecurse = void 0;
const getAddress_1 = require("../../Version/getAddressData/getAddress");
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
},{"../../Version/getAddressData/getAddress":28,"../CommonFn/readString":6,"../globalVariable/index":14}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recurse = void 0;
const getAddress_1 = require("../../Version/getAddressData/getAddress");
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
},{"../../Version/getAddressData/getAddress":28,"../CommonFn/readString":6,"../globalVariable/index":14}],18:[function(require,module,exports){
"use strict";
// interface typeOffset {
//   [key: string]: number | any
Object.defineProperty(exports, "__esModule", { value: true });
exports.availableVersion = exports.offset = void 0;
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
},{}],19:[function(require,module,exports){
(function (setImmediate){(function (){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recvMsgNativeCallback = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const globalVariable_1 = require("../../Common/globalVariable");
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
    Interceptor.attach(globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.hook_point), {
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

},{"../../Common/globalVariable":14,"../CommonData/data-offset":18,"timers":2}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAtMsgNativeFunction = exports.ecxBuffer = exports.atid_ = exports.wxid_ = exports.msg_ = exports.roomid_ = exports.asmAtMsg = void 0;
const all_init_Fn_1 = require("../../Common/initStruct/all_init_Fn");
const data_offset_1 = require("../CommonData/data-offset");
const globalVariable_1 = require("../../Common/globalVariable");
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
        cw.putCallAddress(globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.send_txt_call_offset));
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
},{"../../Common/globalVariable":14,"../../Common/initStruct/all_init_Fn":15,"../CommonData/data-offset":18}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAttatchMsgNativeFunction = exports.attatchEaxbuf = exports.attatchEbp = exports.attatchBuf = exports.attatchAsm = exports.attatchPathPtr = exports.attatchPath = exports.attatchWxid = void 0;
const all_init_Fn_1 = require("../../Common/initStruct/all_init_Fn");
const data_offset_1 = require("../CommonData/data-offset");
const globalVariable_1 = require("../../Common/globalVariable");
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
        cw.putCallAddress(globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.send_attatch_call_offset1));
        cw.putPushU32(0);
        cw.putSubRegImm("esp", 0x14);
        cw.putMovRegReg("ecx", "esp");
        cw.putPushU32(-1);
        cw.putPushU32(globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.send_attatch_call_para).toInt32());
        cw.putCallAddress(globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.send_attatch_call_offset2));
        cw.putSubRegImm("esp", 0x14);
        cw.putMovRegReg("ecx", "esp");
        cw.putPushU32(attatchPath.toInt32());
        cw.putCallAddress(globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.send_attatch_call_offset3));
        cw.putSubRegImm("esp", 0x14);
        cw.putMovRegReg("ecx", "esp");
        cw.putPushU32(attatchWxid.toInt32());
        cw.putCallAddress(globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.send_attatch_call_offset4));
        cw.putMovRegAddress("eax", attatchBuf);
        cw.putPushReg("eax");
        cw.putCallAddress(globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.send_attatch_call_offset5));
        cw.putMovRegReg("ecx", "eax");
        cw.putCallAddress(globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.send_attatch_call_offset6));
        cw.putPopax();
        cw.putPopfx();
        cw.putRet();
        cw.flush();
    });
    const nativeativeFunction = new NativeFunction(ptr(attatchAsm), "void", []);
    nativeativeFunction();
};
exports.sendAttatchMsgNativeFunction = sendAttatchMsgNativeFunction;
},{"../../Common/globalVariable":14,"../../Common/initStruct/all_init_Fn":15,"../CommonData/data-offset":18}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMsgNativeFunction = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const globalVariable_1 = require("../../Common/globalVariable");
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
        cw.putCallAddress(globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.send_txt_call_offset));
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
},{"../../Common/globalVariable":14,"../CommonData/data-offset":18}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPicMsgNativeFunction = exports.picbuff = exports.picAsm = exports.picWxidPtr = exports.picWxid = exports.pathPtr = exports.imagefilepath = exports.buffwxid = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const globalVariable_1 = require("../../Common/globalVariable");
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
        cw.putCallAddress(globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.send_picmsg_call_offset1));
        cw.putMovRegAddress("ebx", imagefilepath);
        cw.putPushReg("ebx");
        cw.putMovRegAddress("eax", picWxid);
        cw.putPushReg("eax");
        cw.putMovRegAddress("eax", picbuff);
        cw.putPushReg("eax");
        cw.putCallAddress(globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.send_picmsg_call_offset2));
        cw.putMovRegReg("ecx", "eax");
        cw.putCallAddress(globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.send_picmsg_call_offset3));
        cw.putPopax();
        cw.putPopfx();
        cw.putRet();
        cw.flush();
    });
    const nativeativeFunction = new NativeFunction(ptr(picAsm), "void", []);
    nativeativeFunction();
};
exports.sendPicMsgNativeFunction = sendPicMsgNativeFunction;
},{"../../Common/globalVariable":14,"../CommonData/data-offset":18}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callLoginQrcodeFunction = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const getQrcodeLoginData_1 = require("./getQrcodeLoginData");
const globalVariable_1 = require("../../Common/globalVariable");
const callLoginQrcodeFunction = (forceRefresh = false) => {
    const json = (0, getQrcodeLoginData_1.getQrcodeLoginData)();
    if (!forceRefresh && json.uuid) {
        return;
    }
    const callAsm = Memory.alloc(Process.pageSize);
    const loginWnd = globalVariable_1.moduleBaseAddress
        .add(data_offset_1.offset.get_login_wnd_offset)
        .readPointer();
    Memory.patchCode(callAsm, Process.pageSize, (code) => {
        var cw = new X86Writer(code, { pc: callAsm });
        cw.putPushfx();
        cw.putPushax();
        cw.putMovRegAddress("ecx", loginWnd);
        cw.putCallAddress(globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.get_qr_login_call_offset));
        cw.putPopax();
        cw.putPopfx();
        cw.putRet();
        cw.flush();
    });
    const nativeativeFunction = new NativeFunction(ptr(callAsm), "void", []);
    nativeativeFunction();
};
exports.callLoginQrcodeFunction = callLoginQrcodeFunction;
},{"../../Common/globalVariable":14,"../CommonData/data-offset":18,"./getQrcodeLoginData":26}],25:[function(require,module,exports){
(function (setImmediate){(function (){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkQRLoginNativeCallback = void 0;
const getQrcodeLoginData_1 = require("./getQrcodeLoginData");
const data_offset_1 = require("../CommonData/data-offset");
const readString_1 = require("../../Common/CommonFn/readString");
const isLoggedIn_1 = require("../versionFn/isLoggedIn");
const globalVariable_1 = require("../../Common/globalVariable");
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
    Interceptor.attach(globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.hook_get_login_qr_offset), callback);
    Interceptor.attach(globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.hook_check_login_qr_offset), callback);
    Interceptor.attach(globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.hook_save_login_qr_info_offset), {
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

},{"../../Common/CommonFn/readString":6,"../../Common/globalVariable":14,"../CommonData/data-offset":18,"../versionFn/isLoggedIn":36,"./getQrcodeLoginData":26,"timers":2}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQrcodeLoginData = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const CommonFn_1 = require("../../Common/CommonFn");
const globalVariable_1 = require("../../Common/globalVariable");
const getQrcodeLoginData = () => {
    const getQRCodeLoginMgr = new NativeFunction(globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.get_qr_login_data_offset), "pointer", []);
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
},{"../../Common/CommonFn":5,"../../Common/globalVariable":14,"../CommonData/data-offset":18}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQrcodeLoginData = exports.checkQRLoginNativeCallback = exports.callLoginQrcodeFunction = void 0;
const callLoginQrcodeFunction_1 = require("./callLoginQrcodeFunction");
Object.defineProperty(exports, "callLoginQrcodeFunction", { enumerable: true, get: function () { return callLoginQrcodeFunction_1.callLoginQrcodeFunction; } });
const checkQRLoginNativeCallback_1 = require("./checkQRLoginNativeCallback");
Object.defineProperty(exports, "checkQRLoginNativeCallback", { enumerable: true, get: function () { return checkQRLoginNativeCallback_1.checkQRLoginNativeCallback; } });
const getQrcodeLoginData_1 = require("./getQrcodeLoginData");
Object.defineProperty(exports, "getQrcodeLoginData", { enumerable: true, get: function () { return getQrcodeLoginData_1.getQrcodeLoginData; } });
},{"./callLoginQrcodeFunction":24,"./checkQRLoginNativeCallback":25,"./getQrcodeLoginData":26}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBaseNodeAddress = exports.getChatroomNodeAddress = exports.getHeaderNodeAddress = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const globalVariable_1 = require("../../Common/globalVariable");
const getBaseNodeAddress = () => {
    return globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.node_offset).readPointer();
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
},{"../../Common/globalVariable":14,"../CommonData/data-offset":18}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyselfIdFunction = exports.getMyselfInfoFunction = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const readString_1 = require("../../Common/CommonFn/readString");
const globalVariable_1 = require("../../Common/globalVariable");
const getMyselfInfoFunction = () => {
    // let ptr: number = 0
    let wx_code = "";
    let wx_id = "";
    let wx_name = "";
    let head_img_url = "";
    wx_id = (0, readString_1.readString)(globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.wxid_offset));
    wx_code = wx_id;
    wx_name = (0, readString_1.readString)(globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.nickname_offset));
    head_img_url = (0, readString_1.readString)(globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.head_img_url_offset));
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
    let wx_id = (0, readString_1.readString)(globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.wxid_offset));
    return wx_id;
};
exports.getMyselfIdFunction = getMyselfIdFunction;
},{"../../Common/CommonFn/readString":6,"../../Common/globalVariable":14,"../CommonData/data-offset":18}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyselfIdFunction = exports.getMyselfInfoFunction = void 0;
const getUserData_1 = require("./getUserData");
Object.defineProperty(exports, "getMyselfInfoFunction", { enumerable: true, get: function () { return getUserData_1.getMyselfInfoFunction; } });
Object.defineProperty(exports, "getMyselfIdFunction", { enumerable: true, get: function () { return getUserData_1.getMyselfIdFunction; } });
},{"./getUserData":29}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSupportedFunction = void 0;
const getWechatVersionFunction_1 = require("../../Common/getData/getWechatVersionFunction");
const data_offset_1 = require("../CommonData/data-offset");
const checkSupportedFunction = () => {
    const ver = (0, getWechatVersionFunction_1.getWechatVersionFunction)();
    return ver == data_offset_1.availableVersion;
};
exports.checkSupportedFunction = checkSupportedFunction;
},{"../../Common/getData/getWechatVersionFunction":11,"../CommonData/data-offset":18}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatroomMemberNickInfoFunction = exports.nickRetAddr = exports.memberNickBuffAsm = exports.nickBuff = exports.nickStructPtr = exports.nickMemberId = exports.nickRoomId = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const globalVariable_1 = require("../../Common/globalVariable");
const readString_1 = require("../../Common/CommonFn/readString");
const all_init_Fn_1 = require("../../Common/initStruct/all_init_Fn");
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
        cw.putCallAddress(globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.chatroom_member_nick_call_offset1));
        cw.putMovRegAddress("eax", nickBuff);
        cw.putPushReg("eax");
        cw.putPushReg("esi");
        cw.putCallAddress(globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.chatroom_member_nick_call_offset2));
        cw.putMovRegReg("ecx", "eax");
        cw.putCallAddress(globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.chatroom_member_nick_call_offset3));
        cw.putPushU32(1);
        cw.putPushReg("ebx");
        cw.putMovRegReg("edx", "edi");
        cw.putMovRegAddress("ecx", nickBuff);
        cw.putCallAddress(globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.chatroom_member_nick_call_offset4));
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
},{"../../Common/CommonFn/readString":6,"../../Common/globalVariable":14,"../../Common/initStruct/all_init_Fn":15,"../CommonData/data-offset":18}],33:[function(require,module,exports){
(function (setImmediate){(function (){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hookLoginEventCallback = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const isLoggedIn_1 = require("../versionFn/isLoggedIn");
const globalVariable_1 = require("../../Common/globalVariable");
const hookLoginEventCallback = (() => {
    const nativeCallback = new NativeCallback(() => { }, "void", []);
    const nativeativeFunction = new NativeFunction(nativeCallback, "void", []);
    Interceptor.attach(globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.hook_on_login_offset), {
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

},{"../../Common/globalVariable":14,"../CommonData/data-offset":18,"../versionFn/isLoggedIn":36,"timers":2}],34:[function(require,module,exports){
(function (setImmediate){(function (){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hookLogoutEventCallback = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const globalVariable_1 = require("../../Common/globalVariable");
const hookLogoutEventCallback = (() => {
    const nativeCallback = new NativeCallback(() => { }, "void", ["int32"]);
    const nativeativeFunction = new NativeFunction(nativeCallback, "void", ["int32"]);
    Interceptor.attach(globalVariable_1.moduleBaseAddress.add(data_offset_1.offset.hook_on_logout_offset), {
        onEnter: function (args) {
            const bySrv = args[0].toInt32();
            setImmediate(() => nativeativeFunction(bySrv));
        },
    });
    return nativeCallback;
})();
exports.hookLogoutEventCallback = hookLogoutEventCallback;
}).call(this)}).call(this,require("timers").setImmediate)

},{"../../Common/globalVariable":14,"../CommonData/data-offset":18,"timers":2}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hookLogoutEventCallback = exports.hookLoginEventCallback = void 0;
const hookLoginEventCallback_1 = require("./hookLoginEventCallback");
Object.defineProperty(exports, "hookLoginEventCallback", { enumerable: true, get: function () { return hookLoginEventCallback_1.hookLoginEventCallback; } });
const hookLogoutEventCallback_1 = require("./hookLogoutEventCallback");
Object.defineProperty(exports, "hookLogoutEventCallback", { enumerable: true, get: function () { return hookLogoutEventCallback_1.hookLogoutEventCallback; } });
},{"./hookLoginEventCallback":33,"./hookLogoutEventCallback":34}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedInFunction = void 0;
const data_offset_1 = require("../CommonData/data-offset");
const globalVariable_1 = require("../../Common/globalVariable");
const globalVariable_2 = require("../../Common/globalVariable");
const isLoggedInFunction = () => {
    globalVariable_1.loggedIn.data = globalVariable_2.moduleBaseAddress
        .add(data_offset_1.offset.is_logged_in_offset)
        .readU32();
    return !!globalVariable_1.loggedIn.data;
};
exports.isLoggedInFunction = isLoggedInFunction;
},{"../../Common/globalVariable":14,"../CommonData/data-offset":18}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentReadyCallback = exports.hookLoginEventCallback = exports.hookLogoutEventCallback = exports.checkQRLoginNativeCallback = exports.recvMsgNativeCallback = exports.SendMiniProgramNativeFunction = exports.sendAtMsgNativeFunction = exports.sendPicMsgNativeFunction = exports.sendAttatchMsgNativeFunction = exports.sendMsgNativeFunction = exports.getContactNativeFunction = exports.callLoginQrcodeFunction = exports.checkSupportedFunction = exports.getWechatVersionStringFunction = exports.getWechatVersionFunction = exports.getChatroomMemberInfoFunction = exports.getMyselfInfoFunction = exports.isLoggedInFunction = exports.getTestInfoFunction = exports.getChatroomMemberNickInfoFunction = void 0;
const CommonFn_1 = require("./Common/CommonFn");
Object.defineProperty(exports, "agentReadyCallback", { enumerable: true, get: function () { return CommonFn_1.agentReadyCallback; } });
Object.defineProperty(exports, "getTestInfoFunction", { enumerable: true, get: function () { return CommonFn_1.getTestInfoFunction; } });
const isLoggedIn_1 = require("./Version/versionFn/isLoggedIn");
Object.defineProperty(exports, "isLoggedInFunction", { enumerable: true, get: function () { return isLoggedIn_1.isLoggedInFunction; } });
const getData_1 = require("./Common/getData");
Object.defineProperty(exports, "checkSupportedFunction", { enumerable: true, get: function () { return getData_1.checkSupportedFunction; } });
Object.defineProperty(exports, "getChatroomMemberInfoFunction", { enumerable: true, get: function () { return getData_1.getChatroomMemberInfoFunction; } });
Object.defineProperty(exports, "getChatroomMemberNickInfoFunction", { enumerable: true, get: function () { return getData_1.getChatroomMemberNickInfoFunction; } });
Object.defineProperty(exports, "getContactNativeFunction", { enumerable: true, get: function () { return getData_1.getContactNativeFunction; } });
Object.defineProperty(exports, "getWechatVersionFunction", { enumerable: true, get: function () { return getData_1.getWechatVersionFunction; } });
Object.defineProperty(exports, "getWechatVersionStringFunction", { enumerable: true, get: function () { return getData_1.getWechatVersionStringFunction; } });
const getUserData_1 = require("./Version/getUserData");
Object.defineProperty(exports, "getMyselfInfoFunction", { enumerable: true, get: function () { return getUserData_1.getMyselfInfoFunction; } });
const Message_about_1 = require("./Common/Message_about");
Object.defineProperty(exports, "recvMsgNativeCallback", { enumerable: true, get: function () { return Message_about_1.recvMsgNativeCallback; } });
Object.defineProperty(exports, "sendAtMsgNativeFunction", { enumerable: true, get: function () { return Message_about_1.sendAtMsgNativeFunction; } });
Object.defineProperty(exports, "sendAttatchMsgNativeFunction", { enumerable: true, get: function () { return Message_about_1.sendAttatchMsgNativeFunction; } });
Object.defineProperty(exports, "SendMiniProgramNativeFunction", { enumerable: true, get: function () { return Message_about_1.SendMiniProgramNativeFunction; } });
Object.defineProperty(exports, "sendMsgNativeFunction", { enumerable: true, get: function () { return Message_about_1.sendMsgNativeFunction; } });
Object.defineProperty(exports, "sendPicMsgNativeFunction", { enumerable: true, get: function () { return Message_about_1.sendPicMsgNativeFunction; } });
const QR_aboutFn_1 = require("./Version/QR-aboutFn");
Object.defineProperty(exports, "callLoginQrcodeFunction", { enumerable: true, get: function () { return QR_aboutFn_1.callLoginQrcodeFunction; } });
Object.defineProperty(exports, "checkQRLoginNativeCallback", { enumerable: true, get: function () { return QR_aboutFn_1.checkQRLoginNativeCallback; } });
const version_hook_1 = require("./Version/version-hook");
Object.defineProperty(exports, "hookLoginEventCallback", { enumerable: true, get: function () { return version_hook_1.hookLoginEventCallback; } });
Object.defineProperty(exports, "hookLogoutEventCallback", { enumerable: true, get: function () { return version_hook_1.hookLogoutEventCallback; } });
},{"./Common/CommonFn":5,"./Common/Message_about":8,"./Common/getData":13,"./Version/QR-aboutFn":27,"./Version/getUserData":30,"./Version/version-hook":35,"./Version/versionFn/isLoggedIn":36}]},{},[37])(37)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3RpbWVycy1icm93c2VyaWZ5L21haW4uanMiLCJzcmMvYWdlbnQvQ29tbW9uL0NvbW1vbkZuL2FnZW50UmVhZHlDYWxsYmFjay50cyIsInNyYy9hZ2VudC9Db21tb24vQ29tbW9uRm4vZ2V0VGVzdEluZm8udHMiLCJzcmMvYWdlbnQvQ29tbW9uL0NvbW1vbkZuL2luZGV4LnRzIiwic3JjL2FnZW50L0NvbW1vbi9Db21tb25Gbi9yZWFkU3RyaW5nLnRzIiwic3JjL2FnZW50L0NvbW1vbi9NZXNzYWdlX2Fib3V0L1NlbmRNaW5pUHJvZ3JhbU5hdGl2ZUZ1bmN0aW9uLnRzIiwic3JjL2FnZW50L0NvbW1vbi9NZXNzYWdlX2Fib3V0L2luZGV4LnRzIiwic3JjL2FnZW50L0NvbW1vbi9nZXREYXRhL2dldENoYXRyb29tTWVtYmVySW5mby50cyIsInNyYy9hZ2VudC9Db21tb24vZ2V0RGF0YS9nZXRDb250YWN0TmF0aXZlRnVuY3Rpb24udHMiLCJzcmMvYWdlbnQvQ29tbW9uL2dldERhdGEvZ2V0V2VjaGF0VmVyc2lvbkZ1bmN0aW9uLnRzIiwic3JjL2FnZW50L0NvbW1vbi9nZXREYXRhL2dldFdlY2hhdFZlcnNpb25TdHJpbmcudHMiLCJzcmMvYWdlbnQvQ29tbW9uL2dldERhdGEvaW5kZXgudHMiLCJzcmMvYWdlbnQvQ29tbW9uL2dsb2JhbFZhcmlhYmxlL2luZGV4LnRzIiwic3JjL2FnZW50L0NvbW1vbi9pbml0U3RydWN0L2FsbF9pbml0X0ZuLnRzIiwic3JjL2FnZW50L0NvbW1vbi9wYXJzZS1nZXREYXRhL2NoYXRyb29tUmVjdXJzZS50cyIsInNyYy9hZ2VudC9Db21tb24vcGFyc2UtZ2V0RGF0YS9yZWN1cnNlLnRzIiwic3JjL2FnZW50L1ZlcnNpb24vQ29tbW9uRGF0YS9kYXRhLW9mZnNldC50cyIsInNyYy9hZ2VudC9WZXJzaW9uL01lc3NhZ2VfYWJvdXQvcmVjdk1zZ05hdGl2ZUNhbGxiYWNrLnRzIiwic3JjL2FnZW50L1ZlcnNpb24vTWVzc2FnZV9hYm91dC9zZW5kQXRNc2dOYXRpdmVGdW5jdGlvbi50cyIsInNyYy9hZ2VudC9WZXJzaW9uL01lc3NhZ2VfYWJvdXQvc2VuZEF0dGF0Y2hNc2dOYXRpdmVGdW5jdGlvbi50cyIsInNyYy9hZ2VudC9WZXJzaW9uL01lc3NhZ2VfYWJvdXQvc2VuZE1zZ05hdGl2ZUZ1bmN0aW9uLnRzIiwic3JjL2FnZW50L1ZlcnNpb24vTWVzc2FnZV9hYm91dC9zZW5kUGljTXNnTmF0aXZlRnVuY3Rpb24udHMiLCJzcmMvYWdlbnQvVmVyc2lvbi9RUi1hYm91dEZuL2NhbGxMb2dpblFyY29kZUZ1bmN0aW9uLnRzIiwic3JjL2FnZW50L1ZlcnNpb24vUVItYWJvdXRGbi9jaGVja1FSTG9naW5OYXRpdmVDYWxsYmFjay50cyIsInNyYy9hZ2VudC9WZXJzaW9uL1FSLWFib3V0Rm4vZ2V0UXJjb2RlTG9naW5EYXRhLnRzIiwic3JjL2FnZW50L1ZlcnNpb24vUVItYWJvdXRGbi9pbmRleC50cyIsInNyYy9hZ2VudC9WZXJzaW9uL2dldEFkZHJlc3NEYXRhL2dldEFkZHJlc3MudHMiLCJzcmMvYWdlbnQvVmVyc2lvbi9nZXRVc2VyRGF0YS9nZXRVc2VyRGF0YS50cyIsInNyYy9hZ2VudC9WZXJzaW9uL2dldFVzZXJEYXRhL2luZGV4LnRzIiwic3JjL2FnZW50L1ZlcnNpb24vZ2V0ZGF0YS9jaGVja1N1cHBvcnRlZC50cyIsInNyYy9hZ2VudC9WZXJzaW9uL2dldGRhdGEvZ2V0Q2hhdHJvb21NZW1iZXJOaWNrSW5mb0Z1bmN0aW9uLnRzIiwic3JjL2FnZW50L1ZlcnNpb24vdmVyc2lvbi1ob29rL2hvb2tMb2dpbkV2ZW50Q2FsbGJhY2sudHMiLCJzcmMvYWdlbnQvVmVyc2lvbi92ZXJzaW9uLWhvb2svaG9va0xvZ291dEV2ZW50Q2FsbGJhY2sudHMiLCJzcmMvYWdlbnQvVmVyc2lvbi92ZXJzaW9uLWhvb2svaW5kZXgudHMiLCJzcmMvYWdlbnQvVmVyc2lvbi92ZXJzaW9uRm4vaXNMb2dnZWRJbi50cyIsInNyYy9hZ2VudC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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
