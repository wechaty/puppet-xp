import { offset,moduleBaseAddress } from "../CommonData/data-offset"
import { readString } from "../CommonFn/readString"
const getMyselfInfoFunction: Function = ((): string => {

  // let ptr: number = 0
  let wx_code: string = ''
  let wx_id: string = ''
  let wx_name: string = ''
  let head_img_url: string = ''

  wx_id = readString(moduleBaseAddress.add(offset.wxid_offset))
  wx_code = wx_id

  wx_name = readString(moduleBaseAddress.add(offset.nickname_offset))
  head_img_url = readString(moduleBaseAddress.add(offset.head_img_url_offset))


  const myself = {
    id: wx_id,
    code: wx_code,
    name: wx_name,
    head_img_url: head_img_url,
  };

  return JSON.stringify(myself)

})

const getMyselfIdFunction: Function = ((): string => {

  let wx_id: string = readString(moduleBaseAddress.add(offset.wxid_offset))

  return wx_id

})

export {
  getMyselfInfoFunction,
  getMyselfIdFunction
}
