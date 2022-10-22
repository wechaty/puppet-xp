// interface typeOffset {
//   [key: string]: number | any

// }
const offset = {
  node_offset: 0x1db9728,
  handle_offset: 0xe4,
  send_txt_call_offset: 0x3e3b80,
  hook_point: 0x40d3b1,
  chatroom_node_offset: 0xb08,
  nickname_offset: 0x1ddf534,
  wxid_offset: 0x1ddf4bc,
  head_img_url_offset: 0x1ddf7fc,
  is_logged_in_offset: 0x1ddf9d4,
  hook_on_login_offset: 0x51b790,
  hook_on_logout_offset: 0x51c2c0,
  hook_get_login_qr_offset: 0x4b6020,
  hook_check_login_qr_offset: 0x478b90,
  hook_save_login_qr_info_offset: 0x3db2e0,
  get_login_wnd_offset: 0x1db96a4,
  get_qr_login_data_offset: 0x282160,
  get_qr_login_call_offset: 0x286930,
  send_picmsg_call_offset1: 0x5ccb50,
  send_picmsg_call_offset2: 0x6f5c0,
  send_picmsg_call_offset3: 0x3e3490,
  send_attatch_call_offset1: 0x5ccb50,
  send_attatch_call_offset2: 0x5ccb10,
  send_attatch_call_offset3: 0x5ccb50,
  send_attatch_call_offset4: 0x5ccb50,
  send_attatch_call_offset5: 0x074c90,
  send_attatch_call_offset6: 0x2e2720,
  send_attatch_call_para: 0x19a7350,
  chatroom_member_nick_call_offset1: 0x558cb0,
  chatroom_member_nick_call_offset2: 0x3b0fe0,
  chatroom_member_nick_call_offset3: 0x55f6e0,
  chatroom_member_nick_call_offset4: 0x34cb10,
};
//3.3.0.115

/*------------------global-------------------------------------------*/
const availableVersion: number = 1661141107; ////3.3.0.115

// let currentVersion: number = 0
// let currentVersion = {
//   data: 0,
// };

// let nodeList: any[] = []; //for contact
// let contactList: any[] = []; //for contact

// let chatroomNodeList: Array<string | number | any> = []; //for chatroom
// let chatroomMemberList: Array<string | number | any> = []; //for chatroom
// // let loggedIn: boolean = false
// let loggedIn = {
//   date: false,
// };

export {
  offset,
  availableVersion,
};
