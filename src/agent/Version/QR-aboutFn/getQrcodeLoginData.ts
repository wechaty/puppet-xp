import {  offset } from "../CommonData/data-offset";
import { readString } from "../../Common/CommonFn";
import { moduleBaseAddress } from "../../Common/globalVariable";
const getQrcodeLoginData = () => {
  const getQRCodeLoginMgr: NativeFunction<NativePointer, []> =
    new NativeFunction(
      moduleBaseAddress.add(offset.get_qr_login_data_offset),
      "pointer",
      []
    );
  const qlMgr: NativePointer = getQRCodeLoginMgr();

  const json = {
    status: 0,
    uuid: "",
    wxid: "",
    avatarUrl: "",
  };

  if (!qlMgr.isNull()) {
    json.uuid = readString(qlMgr.add(8));
    json.status = qlMgr.add(40).readUInt();
    json.wxid = readString(qlMgr.add(44));
    json.avatarUrl = readString(qlMgr.add(92));
  }
  return json;
};

export { getQrcodeLoginData };
