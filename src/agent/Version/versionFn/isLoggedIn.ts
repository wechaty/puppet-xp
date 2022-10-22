import { offset } from "../CommonData/data-offset";
import { loggedIn } from "../../Common/globalVariable";
import { moduleBaseAddress } from "../../Common/globalVariable";
const isLoggedInFunction: Function = (): boolean => {
  loggedIn.data = moduleBaseAddress
    .add(offset.is_logged_in_offset)
    .readU32() as unknown as boolean;
  return !!loggedIn.data;
};

export { isLoggedInFunction };
