import {offset,moduleBaseAddress} from "../CommonData/data-offset"
import { loggedIn } from "../CommonData/data-offset"
const isLoggedInFunction: Function = ((): boolean => {
  loggedIn.date = moduleBaseAddress.add(offset.is_logged_in_offset).readU32() as unknown as boolean
  return !!loggedIn.date
})

export {
  isLoggedInFunction
}
