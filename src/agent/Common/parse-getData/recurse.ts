import { getHeaderNodeAddress } from "../../Version/getAddressData/getAddress";
import { nodeList, contactList } from "../globalVariable/index";
import { readWideString } from "../CommonFn/readString";

const recurse = (node: any) => {
  const headerNodeAddress = getHeaderNodeAddress();
  if (headerNodeAddress.isNull()) {
    return;
  }

  if (node.equals(headerNodeAddress)) {
    return;
  }

  for (const item in nodeList) {
    if (node.equals(nodeList[item])) {
      return;
    }
  }

  nodeList.push(node);
  //wxid, format relates to registration method
  const wxid: string = readWideString(node.add(0x38));

  //custom id, if not set return null, and use wxid which should be custom id
  const wx_code: string =
    readWideString(node.add(0x4c)) || readWideString(node.add(0x38));

  //custom Nickname
  const name: string = readWideString(node.add(0x94));

  //alias aka 'remark' in wechat
  const alias: string = readWideString(node.add(0x80));

  //avatarUrl
  const avatar: string = readWideString(node.add(0x138));
  //const avatar = Memory.readUtf16String(node.add(0x138).readPointer())
  //contact gender
  const gender: number = node.add(0x18c).readU32();

  const contactJson = {
    id: wxid,
    code: wx_code,
    name: name,
    alias: alias,
    avatarUrl: avatar,
    gender: gender,
  };

  contactList.push(contactJson);

  const leftNode = node.add(0x0).readPointer();
  const centerNode = node.add(0x04).readPointer();
  const rightNode = node.add(0x08).readPointer();

  recurse(leftNode);
  recurse(centerNode);
  recurse(rightNode);

  const allContactJson = contactList;
  return allContactJson;
};
export { recurse };
