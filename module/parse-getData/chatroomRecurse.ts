import { getChatroomNodeAddress } from "../getAddressData/getAddress"
import { chatroomMemberList,chatroomNodeList } from "../CommonData/data-offset"
import { readString,readWideString } from "../CommonFn/readString"

const chatroomRecurse = ((node: any): any => {
  const chatroomNodeAddress = getChatroomNodeAddress()
  //bianjiepanduan
  if (chatroomNodeAddress.isNull()) { return }

  if (node.equals(chatroomNodeAddress)) { return }

  for (const item in chatroomNodeList) {
    if (node.equals(chatroomNodeList[item])) {
      return
    }
  }

  chatroomNodeList.push(node)
  const roomid: any = readWideString(node.add(0x10))

  const len: number = node.add(0x50).readU32()   //fanhui32fudianshu
  //const memberJson={}
  if (len > 4) {//
    const memberStr = readString(node.add(0x40))
    if (memberStr.length > 0) {
      const memberList = memberStr.split(/[\\^][G]/)
      const memberJson = {
        roomid: roomid,
        roomMember: memberList
      }

      chatroomMemberList.push(memberJson)
    }

  }

  const leftNode = node.add(0x0).readPointer()
  const centerNode = node.add(0x04).readPointer()
  const rightNode = node.add(0x08).readPointer()

  chatroomRecurse(leftNode)
  chatroomRecurse(centerNode)
  chatroomRecurse(rightNode)

  const allChatroomMemberJson = chatroomMemberList
  return allChatroomMemberJson
})

export {
  chatroomRecurse
}
