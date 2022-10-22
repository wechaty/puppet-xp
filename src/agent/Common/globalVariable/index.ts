
const moduleBaseAddress: NativePointer = Module.getBaseAddress("WeChatWin.dll");
const moduleLoad: Module = Module.load("WeChatWin.dll");
let currentVersion:{data:number} = {
  data: 0,
};

let nodeList: any[] = []; //for contact
let contactList: any[] = []; //for contact

let chatroomNodeList: Array<string | number | any> = []; //for chatroom
let chatroomMemberList: Array<string | number | any> = []; //for chatroom
// let loggedIn: boolean = false
let loggedIn:{data:boolean} = {
  data: false,
};

export {
  currentVersion,
  nodeList,
  contactList,
  chatroomNodeList,
  chatroomMemberList,
  loggedIn,
  moduleBaseAddress,
  moduleLoad

}
