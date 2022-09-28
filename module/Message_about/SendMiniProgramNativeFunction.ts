import { getMyselfInfoFunction } from "../getUserData/getUserData";
import { moduleBaseAddress } from "../CommonData/data-offset";
import { initidStruct } from "../initStruct/all_init_Fn";

const SendMiniProgramNativeFunction = ((bg_path_str:any,contactId:any,xmlstr:any) => {
  // console.log("------------------------------------------------------");
  bg_path_str="";

  var asmCode:any=Memory.alloc(Process.pageSize);
  var ECX_buf=Memory.alloc(0x300);
  var Buf_EAX=Memory.alloc(0x300);
  var buf_1=Memory.alloc(0x300);
  var ptr_to_buf_1=Memory.alloc(0x4).writePointer(buf_1);
  // var buf_2=Memory.alloc(0x300);

  var bg_path_Ptr=Memory.alloc(bg_path_str.length * 2 + 1)
  bg_path_Ptr.writeUtf16String(bg_path_str);
  var bg_path_Struct = Memory.alloc(0x14) // returns a NativePointer
  bg_path_Struct.writePointer(bg_path_Ptr).add(0x04)
    .writeU32(bg_path_str.length * 2).add(0x04)
    .writeU32(bg_path_str.length * 2).add(0x04)
    .writeU32(0).add(0x04)
    .writeU32(0);

  var send_wxid_str=JSON.parse(getMyselfInfoFunction()).id;
  // console.log(send_wxid_str)

  var send_wxid_Ptr=Memory.alloc(send_wxid_str.length * 2 + 1)
  send_wxid_Ptr.writeUtf16String(send_wxid_str);
  var send_wxid_Struct = Memory.alloc(0x14) // returns a NativePointer
  send_wxid_Struct.writePointer(send_wxid_Ptr).add(0x04)
    .writeU32(send_wxid_str.length * 2).add(0x04)
    .writeU32(send_wxid_str.length * 2).add(0x04)
    .writeU32(0).add(0x04)
    .writeU32(0);

 // var contactId="filehelper";
  var recv_wxid_Ptr=Memory.alloc(contactId.length * 2 + 1)
  recv_wxid_Ptr.writeUtf16String(contactId);
  var recv_wxid_Struct = Memory.alloc(0x14) // returns a NativePointer
  recv_wxid_Struct.writePointer(recv_wxid_Ptr).add(0x04)
    .writeU32(contactId.length * 2).add(0x04)
    .writeU32(contactId.length * 2).add(0x04)
    .writeU32(0).add(0x04)
    .writeU32(0);

  // var pXml=initidStruct('<msg><fromusername>'+send_wxid_str+'</fromusername><scene>0</scene><commenturl></commenturl><appmsg appid="wx65cc950f42e8fff1" sdkver=""><title>腾讯出行服务｜加油代驾公交</title><des></des><action>view</action><type>33</type><showtype>0</showtype><content></content><url>https://mp.weixin.qq.com/mp/waerrpage?appid=wx65cc950f42e8fff1&amp;amp;type=upgrade&amp;amp;upgradetype=3#wechat_redirect</url><dataurl></dataurl><lowurl></lowurl><lowdataurl></lowdataurl><recorditem><![CDATA[]]></recorditem><thumburl>http://mmbiz.qpic.cn/mmbiz_png/NM1fK7leWGPaFnMAe95jbg4sZAI3fkEZWHq69CIk6zA00SGARbmsGTbgLnZUXFoRwjROelKicbSp9K34MaZBuuA/640?wx_fmt=png&amp;wxfrom=200</thumburl><messageaction></messageaction><extinfo></extinfo><sourceusername></sourceusername><sourcedisplayname>腾讯出行服务｜加油代驾公交</sourcedisplayname><commenturl></commenturl><appattach><totallen>0</totallen><attachid></attachid><emoticonmd5></emoticonmd5><fileext></fileext><aeskey></aeskey></appattach><weappinfo><pagepath></pagepath><username>gh_ad64296dc8bd@app</username><appid>wx65cc950f42e8fff1</appid><type>1</type><weappiconurl>http://mmbiz.qpic.cn/mmbiz_png/NM1fK7leWGPaFnMAe95jbg4sZAI3fkEZWHq69CIk6zA00SGARbmsGTbgLnZUXFoRwjROelKicbSp9K34MaZBuuA/640?wx_fmt=png&amp;wxfrom=200</weappiconurl><appservicetype>0</appservicetype><shareId>2_wx65cc950f42e8fff1_875237370_1644979747_1</shareId></weappinfo><websearch /></appmsg><appinfo><version>1</version><appname>Window wechat</appname></appinfo></msg>');
  // console.log(xmlstr)
  var pXml=initidStruct(xmlstr)
  // console.log(pXml)
  // console.log(send_wxid_Struct);
  // console.log(recv_wxid_Struct);
  // console.log(pXml);
  // console.log("okkk");
  // console.log("------------------------------------------------------");

  Memory.patchCode(asmCode, Process.pageSize, code => {
    var cw = new X86Writer(code, { pc: asmCode })
    cw.putPushfx();
    cw.putPushax();
    cw.putMovRegReg('ecx', 'ecx');
    cw.putMovRegAddress('ecx', ECX_buf);
    cw.putCallAddress(moduleBaseAddress.add(0x69BB0)); //init ecx

    cw.putPushU32(0x21);


    cw.putPushNearPtr(ptr_to_buf_1);   //ptr
    cw.putPushU32(bg_path_Struct.toInt32());
    cw.putPushU32(pXml.toInt32());
    cw.putPushU32(recv_wxid_Struct.toInt32());

    cw.putMovRegAddress('edx', send_wxid_Struct);
    cw.putMovRegAddress('ecx', ECX_buf);
    cw.putCallAddress(moduleBaseAddress.add(0x2E2420));
    cw.putAddRegImm('esp', 0x14)

    cw.putPushU32(Buf_EAX.toInt32());
    cw.putMovRegAddress('ecx', ECX_buf);
    cw.putCallAddress(moduleBaseAddress.add(0x94C10));

    cw.putPushU32(moduleBaseAddress.add(0x1DCB46C).toInt32());
    cw.putPushU32(moduleBaseAddress.add(0x1DCB46C).toInt32());
    cw.putMovRegAddress('ecx', ECX_buf);
    cw.putCallAddress(moduleBaseAddress.add(0x2E2630));
    cw.putAddRegImm('esp', 0x8)

    cw.putPopax();
    cw.putPopfx();
    cw.putRet();
    cw.flush();
  })

  const nativeativeFunction = new NativeFunction(ptr(asmCode), 'void', [])
  nativeativeFunction()


})

export {
  SendMiniProgramNativeFunction
}
