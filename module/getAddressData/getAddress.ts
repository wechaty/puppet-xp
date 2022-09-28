import { offset,moduleBaseAddress } from "../CommonData/data-offset"

const getBaseNodeAddress: Function = ((): NativePointer => {
  return moduleBaseAddress.add(offset.node_offset).readPointer()
})
// 获取联系人数据的树根节点地址
const getHeaderNodeAddress: Function = ((): string => {
  const baseAddress = getBaseNodeAddress()
  if (baseAddress.isNull()) {
    return baseAddress
  }
  return baseAddress.add(offset.handle_offset).readPointer()
})
// 获取群数据的树根节点地址
const getChatroomNodeAddress: Function = ((): NativePointer => {
  const baseAddress: NativePointer = getBaseNodeAddress()
  if (baseAddress.isNull()) {
    return baseAddress
  }
  return baseAddress.add(offset.chatroom_node_offset).readPointer()
})

export {
  getHeaderNodeAddress,
  getChatroomNodeAddress,
  getBaseNodeAddress
}
