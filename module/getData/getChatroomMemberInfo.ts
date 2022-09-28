import { getChatroomNodeAddress } from "../getAddressData/getAddress"
import { chatroomRecurse } from "../parse-getData/chatroomRecurse"
import { chatroomNodeList,chatroomMemberList } from "../CommonData/data-offset"

const getChatroomMemberInfoFunction: Function = ((): string => {
  const chatroomNodeAddress: NativePointer = getChatroomNodeAddress()
  if (chatroomNodeAddress.isNull()) { return '[]' }

  const node = chatroomNodeAddress.add(0x0).readPointer()
  const ret = chatroomRecurse(node)

  const cloneRet = JSON.stringify(ret)
  chatroomNodeList.length = 0//empty
  chatroomMemberList.length = 0 //empty
  return cloneRet
})

export {
  getChatroomMemberInfoFunction
}
