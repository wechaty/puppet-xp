/**
 * WeChat 3.9.10.27
 * 
 */

const getStringByStrAddr = (addr: any) => {
  const strLength = addr.add(8).readU32();
  // console.log('strLength:', strLength)
  return strLength ? addr.readPointer().readUtf16String(strLength) : '';
}

const readWideString = (address: any) => {
  return readWStringPtr(address).readUtf16String()
}

// 将字符串转换为 Uint8Array
function stringToUint8Array(str: string) {
  const utf8 = unescape(encodeURIComponent(str));
  const arr = new Uint8Array(utf8.length);
  for (let i = 0; i < utf8.length; i++) {
    arr[i] = utf8.charCodeAt(i);
  }
  return arr;
}

interface WeChatMessage {
  // 发送者的用户标识
  fromUser: string;

  // 接收者的用户标识
  toUser?: string;

  room?: string;

  // 消息内容，这里提供的是 XML 格式的数据
  content: string;

  // 消息签名，包含了一些描述和验证信息
  signature: string;

  // 消息的唯一识别码
  msgId: string;

  // 消息的序列号
  msgSequence: number;

  // 消息的创建时间戳
  createTime: number;

  // 全文展示的标记，这里为空字符串，具体情况需要根据实际的业务逻辑确定
  displayFullContent: string;

  // 消息的类型，这里为 3，具体指代意义在业务中确定
  type: number;

  base64Img?: string;
  isSelf?: boolean;
}

function ReadWeChatStr(addr: any) {
  // console.log("addr: " + addr);
  addr = ptr(addr);
  var len = addr.add(0x10).readS64(); // 使用 ptr的`.readS64`方法
  // console.log("len: " + len);

  if (len == 0) return "";

  var max_len = addr.add(0x18).readS64();
  // console.log("max_len: " + max_len);
  let res = ''
  if ((max_len.or(0xF)).equals(0xF)) {
    res = addr.readUtf8String(len);

  } else {
    var char_from_user = addr.readPointer();
    res = char_from_user.readUtf8String(len);
  }
  // console.log("res: " + res);
  return res;
}

const writeWStringPtr = (str: string) => {
  // console.log(`输入字符串内容: ${str}`);
  const strLength = str.length;
  // console.log(`字符串长度: ${strLength}`);

  // 计算UTF-16编码的字节长度（每个字符2个字节）
  const utf16Length = strLength * 2;

  // 计算我们需要为字符串对象结构分配的总内存空间，结构包含：指针 (Process.pointerSize) + 长度 (4 bytes) + 容量 (4 bytes)
  const structureSize = Process.pointerSize + 4 + 4;

  // 为字符串数据和结构体分配连续的内存空间
  const totalSize = utf16Length + 2 + structureSize; // +2 用于 null 终止符
  const basePointer = Memory.alloc(totalSize);

  // 将结构体指针定位到分配的内存起始位置
  const structurePointer = basePointer;
  // console.log(`字符串分配空间内存指针: ${structurePointer}`);

  // 将字符串数据指针定位到结构体之后的位置
  const stringDataPointer = basePointer.add(structureSize);
  // console.log(`字符串保存地址指针: ${stringDataPointer}`);

  // 将 JavaScript 字符串转换成 UTF-16 编码格式，并写入分配的内存空间
  stringDataPointer.writeUtf16String(str);
  // console.log(`写入字符串到地址: ${stringDataPointer.readUtf16String()}`);

  // 检查分配的内存内容
  const allocatedMemoryContent = stringDataPointer.readUtf16String();
  // console.log(`检查分配的内存内容: ${allocatedMemoryContent}`);

  // 在分配的内存空间中写入字符串对象的信息
  // 写入字符串数据指针
  structurePointer.writePointer(stringDataPointer);
  // console.log(`写入字符串地址存放指针: ${structurePointer.readPointer()}`);
  // console.log(`写入字符串内容确认: ${structurePointer.readPointer().readUtf16String()}`);

  // 写入字符串长度（确保是长度，不包含 null 终止符）
  structurePointer.add(Process.pointerSize).writeU32(strLength);
  // console.log(`写入字符串长度指针: ${structurePointer.add(Process.pointerSize)}`);

  // 写入字符串容量，这里我们假设容量和长度是相同的
  structurePointer.add(Process.pointerSize + 4).writeU32(strLength);
  // console.log(`写入字符串容量指针: ${structurePointer.add(Process.pointerSize + 4)}`);

  // console.log(`写入字符串内容再次确认: ${structurePointer.readPointer().readUtf16String()}`);
  // console.log(`写入字符地址再次确认: ${structurePointer.readPointer()}`);
  // console.log(`读取32位测试: ${structurePointer.readPointer().readS32()}`);
  // console.log(`return写入字符串结构体: ${structurePointer}`);

  // 返回分配的结构体表面的起始地址
  return structurePointer;
};

const readWStringPtr = (addr: any) => {
  // console.log(`input读取字符串地址指针4: ${addr}`);
  // console.log(`读取字符串内容指针4: ${addr.readPointer().readUtf16String()}`);
  const stringPointer = addr.readPointer();
  // console.log(`读取数据指针地址1: ${stringPointer}`);
  // console.log(`读取数据指针内容1: ${stringPointer.readUtf16String()}`);

  const size = addr.add(Process.pointerSize).readU32();
  // console.log(`读取字符串长度: ${size}`);

  const capacity = addr.add(Process.pointerSize + 4).readU32();
  // console.log(`读取字符串容量: ${capacity}`);

  return {
    ptr: stringPointer,
    size: size,
    capacity: capacity,
    readUtf16String: () => {
      // UTF-16字符串长度需要乘以2，因为每个字符占2个字节
      const content = size ? stringPointer.readUtf16String()?.replace(/\0+$/, '') : '';
      // console.log(`读取字符串内容: ${content}`);
      return content;
    }
  };
};

/*
偏移地址
*/
const offsets = {
  // kDoAddMsg: 0x23D2B10, // done
  kDoAddMsg: 0x2205510,
  kGetAccountServiceMgr: 0x1C1FE90, // done
  kSyncMsg: 0xc39680,
  kSyncMsgNext: 0xc39680,
  kGetSendMessageMgr: 0x1C1E690, // done
  kSendTextMsg: 0x238DDD0, // done
  kFreeChatMsg: 0x1C1FF10, // done
  // const uint64_t kGetContactMgr = 0x1C0BDE0;
  kGetContactMgr: 0x1C0BDE0,
  // const uint64_t kSearchContactMgr = 0x2065F80;
  kSearchContactMgr: 0x2065F80,
  // const uint64_t kChatRoomMgr = 0x1C4E200;
  kChatRoomMgr: 0x1C4E200,
  // const uint64_t kOpLogMgr = 0x1C193C0;
  kOpLogMgr: 0x1C193C0,
  // const uint64_t kSnsTimeLineMgr = 0x2E6B110;
  kSnsTimeLineMgr: 0x2E6B110,
  // const uint64_t kCDNServicecs = 0x1CAE4E0;
  kCDNServicecs: 0x1CAE4E0,
  // const uint64_t kAccountServiceMgr = 0x1C1FE90;
  kAccountServiceMgr: 0x1C1FE90,

  // const uint64_t kGetAppDataSavePath = 0x26A7780;
  kGetAppDataSavePath: 0x26A7780, // done
  // const uint64_t kGetCurrentDataPath = 0x2314E40;
  kGetCurrentDataPath: 0x2314E40, // done

  // const uint64_t kNewContact = 0x25E3650;
  kNewContact: 0x25E3650,
  // const uint64_t kFreeContact = 0x25E3D00;
  kFreeContact: 0x25E3D00,
  // const uint64_t kGetContact = 0x225F950;
  kGetContact: 0x225F950,
  // const uint64_t kDelContact = 0x2263490;
  kDelContact: 0x2263490,
  // const uint64_t kGetContactList = 0x2265540;
  kGetContactList: 0x2265540,
  // const uint64_t kRemarkContact = 0x22550D0;
  kRemarkContact: 0x22550D0,
  // const uint64_t kBlackContact = 0x2255310;
  kBlackContact: 0x2255310,
  // const uint64_t kGetContactCardContent = 0x2200BB0;
  kGetContactCardContent: 0x2200BB0,

  // const uint64_t kVerifyUser = 0x225C340;								// ContactMgr::doVerifyUser 
  kVerifyUser: 0x225C340,
  // const uint64_t kStartSearchFromScene = 0x2370010;					//SearchContactMgr::StartSearchFromScene
  kStartSearchFromScene: 0x2370010,
  // const uint64_t kNetSceneGetContact = 0x225D060;						//new NetSceneBatchGetContact (id:%d)
  kNetSceneGetContact: 0x225D060,
  // const uint64_t kNetSceneGetContactLabelList = 0x2245F00;            //NetSceneGetContactLabelList::NetSceneGetContactLabelList

  // const uint64_t kSceneCenter = 0x1CDD710;
  // const uint64_t kSceneNetSceneBase = 0x2454EB0;

  // const uint64_t kNewContactLabelIdStruct = 0x2189150;
  // const uint64_t kNetSceneAddContactLabel = 0x245BE40;                //NetSceneAddContactLabel::NetSceneAddContactLabel
  // const uint64_t kNetSceneDelContactLabel = 0x248F410;      

  // const uint64_t kNetSceneModifyContactLabel = 0x250C480;

  // const uint64_t kSendMessageMgr = 0x1C1E690;
  // const uint64_t kAppMsgMgr = 0x1C23630;

  // const uint64_t kSendTextMsg = 0x238DDD0;
  // const uint64_t kSendImageMsg = 0x2383560;
  kSendImageMsg: 0x2383560,
  // const uint64_t kSendFileMsg = 0x21969E0;
  // const uint64_t kSendPatMsg = 0x2D669B0;
  kSendPatMsg: 0x2D669B0,
  // const uint64_t kFreeChatMsg = 0x1C1FF10;
  // const uint64_t kNewChatMsg = 0x1C28800;
  kNewChatMsg: 0x1C28800,
  // const uint64_t kCreateChatRoom = 0x221AF50;
  // const uint64_t kChatRoomInfoConstructor = 0x25CF470;
  // const uint64_t kGetChatRoomDetailInfo = 0x222BEA0;
  // const uint64_t kGetChatroomMemberDetail = 0x2226C80;
  // const uint64_t kDoAddMemberToChatRoom = 0x221B8A0;
  // const uint64_t kDoDelMemberFromChatRoom = 0x221BEE0;
  // const uint64_t kInviteMemberToChatRoom = 0x221B280;
  // const uint64_t kQuitAndDelChatRoom = 0x2225EF0;
  // const uint64_t kModChatRoomTopic = 0x2364610;
  // const uint64_t kGetA8Key = 0x24ABD40;

  // const uint64_t kTimelineGetFirstPage = 0x2EFE660;
  // const uint64_t kTimelineGetNextPage = 0x2EFEC00;
  // const uint64_t kSnsObjectDetail = 0x2EFDEC0;
  // const uint64_t kSnsObjectLike = 0x2F113D0;
  // const uint64_t kSnsObjectOp = 0x2F13670;
  // const uint64_t kSnsObjectDoComment = 0x2EFD0F0;

  // const uint64_t kStartupDownloadMedia = 0x2596780;

  // const uint64_t kDoAddMsg = 0x23D2B10;
  // const uint64_t kJSLogin =  0x27826A0;
  // const uint64_t kTenPayTransferConfirm = 0x304C700;

  // const uint64_t kSceneCenterStartTask = 0x2454F70;					//must do scene after auth
  // const uint64_t kMessageLoop = 0x397B400;							//Chrome.MessageLoopProblem (__int64 a1, __int64 a2)
  // const uint64_t kWMDestroy = 0x2119240;	
}

const moduleBaseAddress = Module.getBaseAddress('WeChatWin.dll')

/*---------------------ContactSelf---------------------*/
/*
获取登录二维码
*/
async function contactSelfQRCode() { }

/*
获取自己的签名
*/
async function contactSelfSignature(signature: string): Promise<void> { }

/* 
获取自己的信息 3.9.10.27
*/
const contactSelfInfo = () => {

  var success = -1;
  var out: any = {};

  // 确定相关函数的地址
  var accountServiceAddr = moduleBaseAddress.add(offsets.kGetAccountServiceMgr);
  var getAppDataSavePathAddr = moduleBaseAddress.add(offsets.kGetAppDataSavePath);
  var getCurrentDataPathAddr = moduleBaseAddress.add(offsets.kGetCurrentDataPath);

  // Funcion hooks (使用Interceptor.attach可以替代这些函数，下面只是示例)
  var GetService = new NativeFunction(accountServiceAddr, 'pointer', []);
  var GetDataSavePath = new NativeFunction(getAppDataSavePathAddr, 'void', ['pointer']);
  var GetCurrentDataPath = new NativeFunction(getCurrentDataPathAddr, 'void', ['pointer']);

  var serviceAddr = GetService();

  // 必要的辅助函数
  function readWeChatString(addr: NativePointer, offset: number) {
    if (addr.add(offset).readU32() === 0 || addr.add(offset + 0x10).readU32() === 0) {
      return '';
    }
    var stringAddr = addr.add(offset);
    if (stringAddr.add(0x18).readU32() === 0xF) {
      return stringAddr.readUtf8String(addr.add(offset + 0x10).readU32());
    } else {
      return stringAddr.readPointer().readUtf8String(addr.add(offset + 0x10).readU32());
    }
  }

  // 使用辅助函数来模版处理字符串读取
  if (!serviceAddr.isNull()) {
    out.wxid = ReadWeChatStr(serviceAddr.add(0x80));
    out.account = readWeChatString(serviceAddr, 0x108);
    out.mobile = readWeChatString(serviceAddr, 0x128);
    out.signature = readWeChatString(serviceAddr, 0x148);

    if (serviceAddr.add(0x148).readU32() === 0 || serviceAddr.add(0x148 + 0x10).readU32() === 0) {

      out.signature = '';

    } else {

      if (serviceAddr.add(0x148 + 0x18).readU32() === 0xF) {

        out.signature = serviceAddr.add(0x148).readUtf8String(serviceAddr.add(0x148 + 0x10).readU32());

      } else {

        out.signature = serviceAddr.add(0x148).readPointer().readUtf8String(serviceAddr.add(0x148 + 0x10).readU32());

      }

    }


    if (serviceAddr.add(0x168).readU32() === 0 || serviceAddr.add(0x168 + 0x10).readU32() === 0) {

    } else {

      if (serviceAddr.add(0x168 + 0x18).readU32() === 0xF) {

        out.country = serviceAddr.add(0x168).readUtf8String(serviceAddr.add(0x168 + 0x10).readU32());

      } else {

        out.country = serviceAddr.add(0x168).readPointer().readUtf8String(serviceAddr.add(0x168 + 0x10).readU32());

      }

    }

    if (serviceAddr.add(0x188).readU32() === 0 || serviceAddr.add(0x188 + 0x10).readU32() === 0) {

      out.province = '';

    } else {
      if (serviceAddr.add(0x188 + 0x18).readU32() === 0xF) {
        out.province = serviceAddr.add(0x188).readUtf8String(serviceAddr.add(0x188 + 0x10).readU32());
      } else {
        out.province = serviceAddr.add(0x188).readPointer().readUtf8String(serviceAddr.add(0x188 + 0x10).readU32());
      }
    }

    if (serviceAddr.add(0x1A8).readU32() === 0 || serviceAddr.add(0x1A8 + 0x10).readU32() === 0) {
      out.city = '';
    } else {
      if (serviceAddr.add(0x1A8 + 0x18).readU32() === 0xF) {
        out.city = serviceAddr.add(0x1A8).readUtf8String(serviceAddr.add(0x1A8 + 0x10).readU32());
      } else {
        out.city = serviceAddr.add(0x1A8).readPointer().readUtf8String(serviceAddr.add(0x1A8 + 0x10).readU32());
      }
    }

    if (serviceAddr.add(0x1E8).readU32() === 0 || serviceAddr.add(0x1E8 + 0x10).readU32() === 0) {
      out.name = '';
    } else {
      if (serviceAddr.add(0x1E8 + 0x18).readU32() === 0xF) {
        out.name = serviceAddr.add(0x1E8).readUtf8String(serviceAddr.add(0x1E8 + 0x10).readU32());
      } else {
        out.name = serviceAddr.add(0x1E8).readPointer().readUtf8String(serviceAddr.add(0x1E8 + 0x10).readU32());
      }
    }

    if (serviceAddr.add(0x450).readU32() === 0 || serviceAddr.add(0x450 + 0x10).readU32() === 0) {
      out.head_img = '';
    } else {
      out.head_img = serviceAddr.add(0x450).readPointer().readUtf8String(serviceAddr.add(0x450 + 0x10).readU32());
    }

    if (serviceAddr.add(0x7B8).readU32() === 0 || serviceAddr.add(0x7B8 + 0x10).readU32() === 0) {
      out.public_key = '';
    } else {
      out.public_key = serviceAddr.add(0x7B8).readPointer().readUtf8String(serviceAddr.add(0x7B8 + 0x10).readU32());
    }

    if (serviceAddr.add(0x7D8).readU32() === 0 || serviceAddr.add(0x7D8 + 0x10).readU32() === 0) {
      out.private_key = '';
    } else {
      out.private_key = serviceAddr.add(0x7D8).readPointer().readUtf8String(serviceAddr.add(0x7D8 + 0x10).readU32());
    }

  }

  // console.log('out:', JSON.stringify(out, null, 2))

  const myself = {
    id: out.wxid,
    code: out.account,
    name: out.name,
    head_img_url: out.head_img,
  }
  // const myselfJson = JSON.stringify(myself, null, 2)
  // console.log('myselfJson:', myselfJson)
  return myself

}
// console.log('myselfInfo:', contactSelfInfo())

/*---------------------Contact---------------------*/
/*
获取联系人列表 3.9.10.27
*/
const contactList = () => {
  // 使用NativeFunction调用相关函数
  const getContactMgrInstance = new NativeFunction(
    moduleBaseAddress.add(offsets.kGetContactMgr),
    'pointer', []
  );
  const getContactListFunction = new NativeFunction(
    moduleBaseAddress.add(offsets.kGetContactList),
    'int64', ['pointer', 'pointer']
  );

  // 获取联系人管理器的实例
  const contactMgrInstance = getContactMgrInstance();

  // 准备用于存储联系人信息的数组
  const contacts: any[] = [];
  const contactVecPlaceholder: any = Memory.alloc(Process.pointerSize * 3);
  contactVecPlaceholder.writePointer(ptr(0));  // 初始化指针数组

  const success = getContactListFunction(contactMgrInstance, contactVecPlaceholder);
  console.log('success:', success)
  // 现在需要处理contactVecPlaceholder指向的数据

  // // 注意: 下面的代码是假设代码，实际操作需要根据contactVec的具体结构来进行调整
  const contactVecPtr = contactVecPlaceholder.readU32();

  console.log('contactVecPtr:', contactVecPtr)

  // 解析联系人信息
  if (success) {
    const contactPtr = contactVecPlaceholder;
    let start = contactPtr.readPointer();
    const end = contactPtr.add(Process.pointerSize * 2).readPointer();

    const CONTACT_SIZE = 0x6A8; // 假设每个联系人数据结构的大小

    while (start.compare(end) < 0) {
      console.log('\n\n')
      try {
        const contact = parseContact(start);
        console.log('contact:', JSON.stringify(contact, null, 2))

        if (contact.id) {
          contacts.push(contact);
        }
      } catch (error) {
        console.log('error:', error)
      }
      start = start.add(CONTACT_SIZE);
      console.log('contacts.length:', contacts.length)
    }
  }
  console.log('contacts size:', contacts.length)
  // const contactsString = JSON.stringify(contacts)
  // console.log('contacts:', contactsString)
  return contacts;
};

// console.log('contactList:', contactList())

/*
获取联系人详情
*/
async function contactRawPayload(id: string) {
}

function parseContact(start: any) {
  // console.log('contactPtr:', contactPtr)

  // mmString   UserName;			//0x10  + 0x20
  const UserName = start.add(0x10 + 0x20).readPointer().readUtf16String();
  console.log('UserName:', UserName)
  // mmString   Alias;				//0x30  + 0x20
  const Alias = start.add(0x30 + 0x20).readPointer().readUtf16String();
  console.log('Alias:', Alias)
  // mmString   EncryptUserName;		//0x50  + 0x20
  // const EncryptUserName = start.add(0x50 + 0x20).readPointer().readUtf16String();
  // console.log('EncryptUserName:', EncryptUserName)
  // int32_t	   DelFlag;				//0x70  + 0x4
  const DelFlag = start.add(0x70).readU32();
  console.log('DelFlag:', DelFlag)
  // int32_t    Type;				//0x74  + 0x4
  const Type = start.add(0x74 + 0x4).readU32();
  console.log('Type:', Type)
  // int32_t    VerifyFlag;			//0x78  + 0x4
  // int32_t	   _0x7C;				//0x7C  + 0x4
  // mmString   Remark;				//0x80  + 0x20
  const Remark = start.add(0x80 + 0x20).readPointer().readUtf16String();
  console.log('Remark:', Remark)
  // mmString   NickName;			//0xA0  + 0x20
  const NickName = start.add(0xA0 + 0x20).readPointer().readUtf16String();
  console.log('NickName:', NickName)
  // mmString   LabelIDList;			//0xC0  + 0x20
  const LabelIDList = start.add(0xC0 + 0x20).readPointer().readUtf16String();
  console.log('LabelIDList:', LabelIDList)
  // mmString   DomainList;			//0xE0  + 0x20
  // int64_t    ChatRoomType;		//0x100 + 0x8
  const ChatRoomType = start.add(0x100).readPointer().readUtf16String();
  console.log('ChatRoomType:', ChatRoomType)
  // mmString   PYInitial;			//0x108 + 0x20
  const PYInitial = start.add(0x108 + 0x20).readPointer().readUtf16String();
  console.log('PYInitial:', PYInitial)
  // mmString   QuanPin;				//0x128 + 0x20
  const QuanPin = start.add(0x128 + 0x20).readPointer().readUtf16String();
  console.log('QuanPin:', QuanPin)
  // mmString   RemarkPYInitial;		//0x148 + 0x20
  // mmString   RemarkQuanPin;		//0x168 + 0x20
  // mmString   BigHeadImgUrl;		//0x188 + 0x20
  const BigHeadImgUrl = start.add(0x188 + 0x20).readPointer().readUtf16String();
  console.log('BigHeadImgUrl:', BigHeadImgUrl)
  // mmString   SmallHeadImgUrl;		//0x1A8 + 0x20
  const SmallHeadImgUrl = start.add(0x1A8 + 0x20).readPointer().readUtf16String();
  console.log('SmallHeadImgUrl:', SmallHeadImgUrl)
  // mmString   _HeadImgMd5;			//0x1C8 + 0x20 //�����ʽ��һ����Ҫ���� ֻռλ

  // //int64_t  ChatRoomNotify;      //0x1E8
  const ChatRoomNotify = start.add(0x1E8).readPointer().readUtf16String();
  console.log('ChatRoomNotify:', ChatRoomNotify)
  // char       _0x1E8[24];			//0x1E8 + 0x18
  // mmString   ExtraBuf;			//0x200 + 0x20
  const ExtraBuf = start.add(0x200 + 0x20).readPointer().readUtf16String();
  console.log('ExtraBuf:', ExtraBuf)

  // int32_t    ImgFlag;			   //0x220 + 0x4
  const ImgFlag = start.add(0x220).readU32();
  console.log('ImgFlag:', ImgFlag)
  // int32_t    Sex;				   //0x224 + 0x4
  const Sex = start.add(0x224).readU32();
  console.log('Sex', Sex)
  // int32_t    ContactType;		   //0x228 + 0x4
  const ContactType = start.add(0x228).readU32();
  console.log('ContactType:', ContactType)
  // int32_t   _0x22C;			   //0x22c + 0x4

  // mmString  Weibo;				//0x230 + 0x20
  // int32_t   WeiboFlag;			//0x250 + 0x4
  // int32_t   _0x254;				//0x254 + 0x4

  // mmString  WeiboNickname;		//0x258 + 0x20
  const WeiboNickname = start.add(0x258 + 0x20).readPointer().readUtf16String();
  console.log('WeiboNickname:', WeiboNickname)

  // int32_t  PersonalCard;		   //0x278 + 0x4
  // int32_t  _0x27C;			   //0x27c + 0x4

  // mmString  Signature;		  //0x280 + 0x20
  // mmString  Country;			  //0x2A0 + 0x20
  const Country = start.add(0x2A0 + 0x20).readPointer().readUtf16String();
  console.log('Country:', Country)

  // std::vector<mmString>  PhoneNumberList; //0x2C0 + 0x18

  // mmString  Province;				//0x2D8 + 0x20
  const Province = start.add(0x2D8 + 0x20).readPointer().readUtf16String();
  console.log('Province:', Province)
  // mmString  City;					//0x2F8 + 0x20
  const City = start.add(0x2F8 + 0x20).readPointer().readUtf16String();
  console.log('City:', City)
  // int32_t   Source;				//0x318 + 0x4
  const Source = start.add(0x318).readU32();
  console.log('Source:', Source)
  // int32_t   _0x31C;				//0x31C + 0x4

  // mmString  VerifyInfo;			//0x320 + 0x20
  // mmString  RemarkDesc;		   //0x340 + 0x20
  // mmString  RemarkImgUrl;		   //0x360 + 0x20

  // int32_t   BitMask;			  //0x380 + 0x4
  // int32_t   BitVal;			  //0x384 + 0x4
  // int32_t   AddContactScene;	  //0x388 + 0x4
  // int32_t   HasWeiXinHdHeadImg; //0x38c + 0x4
  // int32_t   Level;			  //0x390 + 0x4
  // int32_t   _0x394;			  //0x394 + 0x4

  // mmString  VerifyContent;      //0x398 + 0x20
  const VerifyContent = start.add(0x398 + 0x20).readPointer().readUtf16String();
  console.log('VerifyContent:', VerifyContent)
  // int32_t  AlbumStyle;	      //0x3B8 + 0x4
  // int32_t  AlbumFlag;			  //0x3BC + 0x4
  // mmString AlbumBGImgID;		  //0x3C0 + 0x20

  // int64_t  _0x3E0;			 //0x3E0 + 0x8

  // int32_t  SnsFlag;			//0x3E8	+ 0x4
  // int32_t  _0x3EC;			//0x3EC + 0x4

  // mmString  SnsBGImgID;		//0x3F0 + 0x20

  // int64_t  SnsBGObjectID;		//0x410 + 0x8

  // int32_t  SnsFlagEx;			//0x418 + 0x4
  // int32_t  _0x41C;			//0x41C + 0x4

  // mmString IDCardNum;			//0x420 + 0x20
  const IDCardNum = start.add(0x420 + 0x20).readPointer().readUtf16String();
  console.log('IDCardNum:', IDCardNum)
  // mmString RealName;			//0x440 + 0x20
  const RealName = start.add(0x440 + 0x20).readPointer().readUtf16String();

  // mmString MobileHash;		//0x460 + 0x20
  // mmString MobileFullHash;    //0x480 + 0x20

  // mmString ExtInfo;			//0x4A0 + 0x20
  const ExtInfo = start.add(0x4A0 + 0x20).readPointer().readUtf16String();
  console.log('ExtInfo:', ExtInfo)
  // mmString _0x4C0;		    //0x4C0 + 0x20

  // mmString CardImgUrl;	    //0x4EO + 0x20
  const CardImgUrl = start.add(0x4E0 + 0x20).readPointer().readUtf16String();
  console.log('CardImgUrl:', CardImgUrl)
  // char _res[0x1A8];           //0x500 + 

  const contact = {
    id: UserName,
    custom_account: UserName,
    del_flag: DelFlag,
    type: Type,
    verify_flag: VerifyContent,
    alias: Alias || '', // 20字节
    name: NickName, // 64字节
    pinyin: QuanPin, // 20字节
    pinyin_all: QuanPin, // 20字节
  };
  return contact;

}

/*---------------------Room---------------------*/
/*
获取群列表
*/
async function roomList() { }

/*
解散群
*/
async function roomDel(
  roomId: string,
  contactId: string,
) {
  return roomId
}

/*
获取群头像
*/
async function roomAvatar(roomId: string) {
  return ''
}

/*
加入群
*/
async function roomAdd(
  roomId: string,
  contactId: string,
) {

}

/*
设置群名称
*/
async function roomTopic(roomId: string, topic: string) { }

/*
创建群
*/
async function roomCreate(
  contactIdList: string[],
  topic: string,
) {

  return 'mock_room_id'
}

/*
退出群
*/
async function roomQuit(roomId: string): Promise<void> {

}

/*
获取群二维码
*/
async function roomQRCode(roomId: string): Promise<string> {
  return roomId + ' mock qrcode'
}

/*
获取群成员列表
*/
async function roomMemberList(roomId: string) {
}

/*---------------------Room Invitation---------------------*/
/*
接受群邀请
*/
async function roomInvitationAccept(roomInvitationId: string) { }

/*
获取群邀请
*/
async function roomInvitationRawPayload(roomInvitationId: string): Promise<any> { }

/*---------------------Friendship---------------------*/
/*
获取好友请求
*/
async function friendshipRawPayload(id: string): Promise<any> {
  return { id } as any
}

/*
手机号搜索好友
*/
async function friendshipSearchPhone(
  phone: string,
): Promise<null | string> {
  return null
}

/*
微信号搜索好友
*/
async function friendshipSearchWeixin(
  weixin: string,
): Promise<null | string> {
  return null
}

/*
发送好友请求
*/
async function friendshipAdd(
  contactId: string,
  hello: string,
): Promise<void> { }

/*
接受好友请求
*/
async function friendshipAccept(
  friendshipId: string,
): Promise<void> { }

/*---------------------Tag---------------------*/
/*
联系人标签添加
*/
async function tagContactAdd(
  tagId: string,
  contactId: string,
): Promise<void> { }

/*
联系人标签移除
*/
async function tagContactRemove(
  tagId: string,
  contactId: string,
): Promise<void> { }

/*
联系人标签删除
*/
async function tagContactDelete(
  tagId: string,
): Promise<void> { }

/*
联系人标签列表
*/
async function tagContactList(
  contactId?: string,
): Promise<string[]> {
  return []
}

/*
获取群成员详情
*/
async function roomMemberRawPayload(roomId: string, contactId: string) { }

/*
设置群公告
*/
async function roomAnnounce(roomId: string, text?: string): Promise<void | string> {
  if (text) {
    return
  }
  return 'mock announcement for ' + roomId
}

/*---------------------Message---------------------*/
/*
发送文本消息 3.9.10.27
*/
const messageSendText = (contactId: string, text: string) => {
  // console.log('\n\n');
  let to_user: any = null
  let text_msg: any = null
  // const to_user = Memory.alloc(wxid.length * 2 + 2)
  // to_user.writeUtf16String(wxid)
  // to_user = new WeChatString(wxid).getMemoryAddress();
  // console.log('wxid:', wxid)
  to_user = writeWStringPtr(contactId);
  // console.log('to_user wxid :', readWStringPtr(to_user).readUtf16String());

  // const text_msg = Memory.alloc(msg.length * 2 + 2)
  // text_msg.writeUtf16String(msg)
  // text_msg = new WeChatString(msg).getMemoryAddress();

  text_msg = writeWStringPtr(text);
  // console.log('text_msg msg:', readWStringPtr(text_msg).readUtf16String());
  // console.log('\n\n');

  var send_message_mgr_addr = moduleBaseAddress.add(offsets.kGetSendMessageMgr);
  var send_text_msg_addr = moduleBaseAddress.add(offsets.kSendTextMsg);
  var free_chat_msg_addr = moduleBaseAddress.add(offsets.kFreeChatMsg);

  var chat_msg = Memory.alloc(0x460 * Process.pointerSize); // 在frida中分配0x460字节的内存
  chat_msg.writeByteArray(Array(0x460 * Process.pointerSize).fill(0)); // 清零分配的内存

  var temp = Memory.alloc(3 * Process.pointerSize); // 分配临时数组内存
  temp.writeByteArray(Array(3 * Process.pointerSize).fill(0)); // 初始化数组

  // 定义函数原型并实例化 NativeFunction 对象
  var mgr = new NativeFunction(send_message_mgr_addr, 'void', []);
  var send = new NativeFunction(send_text_msg_addr, 'uint64', ['pointer', 'pointer', 'pointer', 'pointer', 'int64', 'int64', 'int64', 'int64']);
  var free = new NativeFunction(free_chat_msg_addr, 'void', ['pointer']);

  // 调用发送消息管理器初始化
  mgr();

  // 发送文本消息 
  // console.log('chat_msg:', chat_msg);
  // console.log('to_user:', to_user);
  // console.log('text_msg:', text_msg);
  // console.log('temp:', temp);
  var success = send(chat_msg, to_user, text_msg, temp, 1, 1, 0, 0);

  console.log('sendText success:', success);

  // 释放ChatMsg内存
  free(chat_msg);

  return Number(success) > 0 ? 1 : 0; // 与C++代码保持一致，这里返回0（虽然在C++中这里应该是成功与否的指示符）
}
// messageSendText('filehelper', 'hello world')

/*
发送图片消息
*/
async function messageSendFile(
  conversationId: string,
  file: any,
): Promise<void> {


}

/*
发送联系人名片
*/
async function messageSendContact(
  conversationId: string,
  contactId: string,
): Promise<void> {

}

/*
发送链接消息
*/
async function messageSendUrl(
  conversationId: string,
  urlLinkPayload: any,
): Promise<void> {
}

/*
发送小程序消息
*/
async function messageSendMiniProgram(
  conversationId: string,
  miniProgramPayload: any,
): Promise<void> {

}

/*
发送位置消息
*/
async function messageSendLocation(
  conversationId: string,
  locationPayload: any,
): Promise<void | string> {
}

/*
转发消息
*/
async function messageForward(
  conversationId: string,
  messageId: string,
): Promise<void> {

}

/*
拍一拍消息
*/
const sendPatMsg = (roomId: any, contactId: any) => {
  // 定义一个NativeFunction来代表 SendPatMsg 函数
  const SendPatMsg = new NativeFunction(
    moduleBaseAddress.add(offsets.kSendPatMsg),
    'int64', // 假设返回类型为int64
    ['pointer', 'pointer', 'int64']
  );

  // 现在，我们需要一种方式来创建WeChatWString类的实例并将其传递给SendPatMsg。
  // 这里的createWeChatWString函数是一个假设函数，需要你根据WeChatWString的实际内存结构来实现。
  const roomIdStrPointer = writeWStringPtr(roomId);
  const wxidStrPointer = writeWStringPtr(contactId);

  const arg3 = Memory.alloc(0x8);
  arg3.writeU64(0x0);

  try {
    // 调用 SendPatMsg 函数
    const result: any = SendPatMsg(roomIdStrPointer, wxidStrPointer, 0);
    console.log("SendPatMsg 调用结果: ", result);
  } catch (e) {
    console.error("SendPatMsg 调用失败: ", e);
  }
}

// sendPatMsg('21341182572@chatroom', 'tyutluyc')

// 调试：监听函数调用
Interceptor.attach(
  moduleBaseAddress.add(offsets.kSendPatMsg), {
  onEnter(args) {
    try {
      // 参数打印
      console.log("sendImageMsg called with args: " + args[0] + ", " + args[1] + ", " + args[2] + ", " + args[3] + ", " + args[4] + ", " + args[5] + ", " + args[6] + ", " + args[7]);
      console.log('sendImageMsg roomId:', readWStringPtr(args[0]).readUtf16String());
      console.log('sendImageMsg contactId:', readWStringPtr(args[1]).readUtf16String());
      console.log('sendImageMsg arg2:', args[2].readS32());
      console.log('sendImageMsg arg3:', args[3].readUtf16String());
      console.log('sendImageMsg arg4:', args[4].readS32());
      console.log('sendImageMsg arg5:', args[5]);
      console.log('sendImageMsg arg6:', args[6]);
      console.log('sendImageMsg arg7:', args[7]);

    } catch (e: any) {
      console.error('接收消息回调失败：', e)
      throw new Error(e)
    }
  },
})

/*---------------------Hook---------------------*/
/*
接收消息回调 3.9.10.27
*/
const recvMsgNativeCallback = (() => {

  const nativeCallback = new NativeCallback(() => { }, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'int32'])
  const nativeativeFunction = new NativeFunction(nativeCallback, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'int32'])

  try {
    Interceptor.attach(
      moduleBaseAddress.add(offsets.kDoAddMsg), {
      onEnter(args) {
        try {
          // 参数打印
          // console.log("doAddMsg called with args: " + args[0] + ", " + args[1] + ", " + args[2]);

          // 调用处理函数
          const msg = HandleSyncMsg(args[0], args[1], args[2]);
          // console.log("msg: " + JSON.stringify(msg, null, 2));
          let room = ''
          let talkerId = ''
          let content = ''
          const signature = msg.signature
          const msgType = msg.type

          if (msg.fromUser.indexOf('@') !== -1) {
            room = msg.fromUser
          } else if (msg.toUser && msg.toUser.indexOf('@') !== -1) {
            room = msg.toUser
          }

          if (room && msg.toUser) {

            talkerId = msg.toUser
            content = msg.content

          } else {
            talkerId = msg.fromUser
            content = msg.content
          }


          const myContentPtr = Memory.alloc(content.length * 2 + 1)
          myContentPtr.writeUtf16String(content)

          const myTalkerIdPtr = Memory.alloc(talkerId.length * 2 + 1)
          myTalkerIdPtr.writeUtf16String(talkerId)

          const myGroupMsgSenderIdPtr = Memory.alloc(room.length * 2 + 1)
          myGroupMsgSenderIdPtr.writeUtf16String(room)

          const myXmlContentPtr = Memory.alloc(signature.length * 2 + 1)
          myXmlContentPtr.writeUtf16String(signature)

          const isMyMsg = msg.isSelf? 1 : 0
          const newMsg = {
            msgType, talkerId, content, room, signature, isMyMsg
          }
          console.log('agent 回调消息:', JSON.stringify(newMsg))
          setImmediate(() => nativeativeFunction(msgType, myTalkerIdPtr, myContentPtr, myGroupMsgSenderIdPtr, myXmlContentPtr, isMyMsg))

        } catch (e: any) {
          console.error('接收消息回调失败：', e)
          throw new Error(e)
        }
      },
    })
    return nativeCallback
  } catch (e) {
    console.error('回调消息失败：')
    return null
  }

})()

function HandleSyncMsg(param1: NativePointer, param2: any, param3: any) {
  // console.log("HandleSyncMsg called with param2: " + param2);
  // findIamgePathAddr(param2)

  /* Receive Message:
      Hook,  call, msgId, type, isSelf, ts, roomId, content, wxid, sign, thumb, extra, msgXml */
  // { 0x00, 0x2205510, 0x30, 0x38, 0x3C, 0x44, 0x48, 0x88, 0x240, 0x260, 0x280, 0x2A0, 0x308 },

  const msg: WeChatMessage = {
    fromUser: '',
    toUser: '',
    content: '',
    signature: '',
    msgId: '',
    msgSequence: 0,
    createTime: 0,
    displayFullContent: '',
    type: 0,
    isSelf: false,
  }

  msg.msgId = param2.add(0x30).readS64() // 消息ID
  // console.log("msg.msgId: " + msg.msgId);
  msg.type = param2.add(0x38).readS32(); // 消息类型
  // console.log("msg.type: " + msg.type);
  msg.isSelf = param2.add(0x3C).readS32() === 1; // 是否自己发送的消息
  // console.log("msg.isSelf: " + msg.isSelf);
  msg.createTime = param2.add(0x44).readS32() // 创建时间
  // console.log("msg.createTime: " + msg.createTime);
  msg.content = readWideString(param2.add(0x88)) // 消息内容
  // console.log("msg.content: " + msg.content);
  msg.toUser = readWideString(param2.add(0x240)) // 消息签名
  // console.log("msg.toUser: " + msg.toUser);
  msg.fromUser = readWideString(param2.add(0x48)) // 发送者
  // console.log("msg.fromUser: " + msg.fromUser);
  msg.signature = ReadWeChatStr(param2.add(0x260)) // 消息签名
  // console.log("msg.signature: " + msg.signature);

  const msgXml = getStringByStrAddr(param2.add(0x308)) // 消息签名
  // console.log("msg.msgXml: " + msgXml);

  // 根据消息类型处理图片消息
  if (msg['type'] == 3) {
    const thumb = getStringByStrAddr(param2.add(0x280)) // 消息签名
    // console.log("msg.thumb: " + thumb);

    const extra = getStringByStrAddr(param2.add(0x2A0)) // 消息签名
    // console.log("msg.extra: " + extra);
    // const img = ReadSKBuiltinBuffer(param2.add(0x40).readS64()); // 读取图片数据
    // console.log("img: " + img);
    // msg.base64Img = img; // 将图片数据编码为Base64字符串
    // findIamgePathAddr(param2)
    msg.base64Img = ''
    msg.content = JSON.stringify([
      thumb, //  PUPPET.types.Image.Unknown
      thumb, //  PUPPET.types.Image.Thumbnail
      extra, //  PUPPET.types.Image.HD
      extra, //  PUPPET.types.Image.Artwork
    ])

  }
  // console.log("HandleSyncMsg msg: " + JSON.stringify(msg, null, 2));
  return msg;
}

// 调试：监听函数调试
Interceptor.attach(
  moduleBaseAddress.add(offsets.kDoAddMsg), {
  onEnter(args) {
    try {
      // 参数打印
      // console.log("doAddMsg called with args: " + args[0] + ", " + args[1] + ", " + args[2]);
      // findIamgePathAddr(args[0])
      HandleSyncMsg(args[0], args[1], args[2]);
    } catch (e: any) {
      console.error('接收消息回调失败：', e)
      throw new Error(e)
    }
  },
})
