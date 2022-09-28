
import { getHeaderNodeAddress } from "../getAddressData/getAddress"
import { nodeList,contactList } from "../CommonData/data-offset"
import { recurse } from "../parse-getData/recurse"
const getContactNativeFunction = (():string => {
  const headerNodeAddress = getHeaderNodeAddress()
  if (headerNodeAddress.isNull()) { return '[]' }

  const node:any = headerNodeAddress.add(0x0).readPointer()
  const ret = recurse(node)

  /*for (let item in ret.contact){
    console.log(ret.contact[item].wxid,ret.contact[item].wx_code,ret.contact[item].name)
  }*/
  //console.log(ret.contact)
  const cloneRet:string = JSON.stringify(ret)
  nodeList.length = 0
  contactList.length = 0

  return cloneRet
})

export {
  getContactNativeFunction
}
