import { getChatroomNodeAddress } from "../../Version/getAddressData/getAddress";
import { chatroomRecurse } from "../parse-getData/chatroomRecurse";
import { chatroomNodeList,chatroomMemberList } from "../globalVariable";

const getChatroomMemberInfoFunction: Function = (): string => {
  const chatroomNodeAddress: NativePointer = getChatroomNodeAddress();
  if (chatroomNodeAddress.isNull()) {
    return "[]";
  }

  const node = chatroomNodeAddress.add(0x0).readPointer();
  const ret = chatroomRecurse(node);

  const cloneRet = JSON.stringify(ret);
  chatroomNodeList.length = 0; //empty
  chatroomMemberList.length = 0; //empty
  return cloneRet;
};

export { getChatroomMemberInfoFunction };
