import { getWechatVersionFunction } from "./getWechatVersionFunction";

const getWechatVersionStringFunction = (
  ver: number = getWechatVersionFunction()
): string => {
  if (!ver) {
    return "0.0.0.0";
  }
  const vers = [];
  vers.push(((ver as number) >> 24) & (255 - 0x60));
  vers.push((ver >> 16) & 255);
  vers.push((ver >> 8) & 255);
  vers.push(ver & 255);
  return vers.join(".");
};

export { getWechatVersionStringFunction };
