import { getQrcodeLoginData } from "./getQrcodeLoginData";
import {  offset } from "../CommonData/data-offset";
import { readString } from "../../Common/CommonFn/readString";
import { isLoggedInFunction } from "../versionFn/isLoggedIn";
import { moduleBaseAddress } from "../../Common/globalVariable";
const checkQRLoginNativeCallback = (() => {
  const nativeCallback = new NativeCallback(() => {}, "void", [
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
    onLeave: function (retval: any) {
      const json = getQrcodeLoginData();
      if (json.status == 0) {
        // 当状态为 0 时，即未扫码。而其他状态会触发另一个方法，拥有更多数据。
        ret(json);
      }
      return retval;
    },
  };

  const ret = (json: any) => {
    const arr = [
      json.status || 0,
      Memory.allocUtf8String(
        json.uuid ? `http://weixin.qq.com/x/${json.uuid}` : ""
      ),
      Memory.allocUtf8String(json.wxid || ""),
      Memory.allocUtf8String(json.avatarUrl || ""),
      Memory.allocUtf8String(json.nickname || ""),
      Memory.allocUtf8String(json.phoneType || ""),
      json.phoneClientVer || 0,
      Memory.allocUtf8String(json.pairWaitTip || ""),
    ] as const;
    setImmediate(() => nativeativeFunction(...arr));
  };

  Interceptor.attach(
    moduleBaseAddress.add(offset.hook_get_login_qr_offset),
    callback
  );
  Interceptor.attach(
    moduleBaseAddress.add(offset.hook_check_login_qr_offset),
    callback
  );
  Interceptor.attach(
    moduleBaseAddress.add(offset.hook_save_login_qr_info_offset),
    {
      onEnter: function () {
        const qrNotify: any = this.context["ebp" as keyof CpuContext].sub(72); //zijiadaima  as keyof cpucontext
        const uuid = readString(qrNotify.add(4).readPointer());
        const wxid = readString(qrNotify.add(8).readPointer());
        const status = qrNotify.add(16).readUInt();
        const avatarUrl = readString(qrNotify.add(24).readPointer());
        const nickname = readString(qrNotify.add(28).readPointer());
        const pairWaitTip = readString(qrNotify.add(32).readPointer());
        const phoneClientVer = qrNotify.add(40).readUInt();
        const phoneType = readString(qrNotify.add(44).readPointer());

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
    }
  );

  if (!isLoggedInFunction()) {
    setTimeout(() => {
      const json = getQrcodeLoginData();
      ret(json);
    }, 100);
  }

  return nativeCallback;
})();
export { checkQRLoginNativeCallback };
