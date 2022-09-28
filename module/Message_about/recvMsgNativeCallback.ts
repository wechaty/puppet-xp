import { moduleBaseAddress,offset } from "../CommonData/data-offset"

const recvMsgNativeCallback = (() => {

  const nativeCallback = new NativeCallback(() => { }, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'int32'])
  const nativeativeFunction = new NativeFunction(nativeCallback, 'void', ['int32', 'pointer', 'pointer', 'pointer', 'pointer', 'int32'])

  Interceptor.attach(
    moduleBaseAddress.add(offset.hook_point),
    {
      onEnter() {
        const a = this.context as Ia32CpuContext
        // const addr = this.context.ebp.sub(0xc30)//0xc30-0x08
        const addr = a.ebp.sub(0xc30)//0xc30-0x08

        const msgType = addr.add(0x38).readU32()
        const isMyMsg = addr.add(0x3C).readU32()//add isMyMsg

        if (msgType > 0) {

          const talkerIdPtr = addr.add(0x48).readPointer()
          //console.log('txt msg',talkerIdPtr.readUtf16String())
          const talkerIdLen = addr.add(0x48 + 0x04).readU32() * 2 + 2

          const myTalkerIdPtr = Memory.alloc(talkerIdLen)
          Memory.copy(myTalkerIdPtr, talkerIdPtr, talkerIdLen)


          let contentPtr = null
          let contentLen = 0
          let myContentPtr:any = null
          if (msgType == 3) {// pic path
            let thumbPtr = addr.add(0x198).readPointer();
            let hdPtr = addr.add(0x1ac).readPointer();
            let thumbPath = thumbPtr.readUtf16String();
            let hdPath = hdPtr.readUtf16String();
            let picData = [
              thumbPath,//  PUPPET.types.Image.Unknown
              thumbPath,//  PUPPET.types.Image.Thumbnail
              hdPath,//  PUPPET.types.Image.HD
              hdPath//  PUPPET.types.Image.Artwork
            ]
            let content = JSON.stringify(picData);
            myContentPtr = Memory.allocUtf16String(content);
          } else {
            contentPtr = addr.add(0x70).readPointer()
            contentLen = addr.add(0x70 + 0x04).readU32() * 2 + 2
            myContentPtr = Memory.alloc(contentLen)
            Memory.copy(myContentPtr, contentPtr, contentLen)
          }

          //  console.log('----------------------------------------')
          //  console.log(msgType)
          //  console.log(contentPtr.readUtf16String())
          //  console.log('----------------------------------------')
          const groupMsgAddr = addr.add(0x170).readU32() //* 2 + 2
          let myGroupMsgSenderIdPtr:any = null
          if (groupMsgAddr == 0) {//weChatPublic is zero，type is 49

            myGroupMsgSenderIdPtr = Memory.alloc(0x10)
            myGroupMsgSenderIdPtr.writeUtf16String("null")

          } else {

            const groupMsgSenderIdPtr = addr.add(0x170).readPointer()
            const groupMsgSenderIdLen = addr.add(0x170 + 0x04).readU32() * 2 + 2
            myGroupMsgSenderIdPtr = Memory.alloc(groupMsgSenderIdLen)
            Memory.copy(myGroupMsgSenderIdPtr, groupMsgSenderIdPtr, groupMsgSenderIdLen)

          }

          const xmlNullPtr = addr.add(0x1d8).readU32()
          let myXmlContentPtr:any = null
          if (xmlNullPtr == 0) {

            myXmlContentPtr = Memory.alloc(0x10)
            myXmlContentPtr.writeUtf16String("null")

          } else {
            const xmlContentPtr = addr.add(0x1d8).readPointer()

            const xmlContentLen = addr.add(0x1d8 + 0x04).readU32() * 2 + 2
            myXmlContentPtr = Memory.alloc(xmlContentLen)
            Memory.copy(myXmlContentPtr, xmlContentPtr, xmlContentLen)
          }

          setImmediate(() => nativeativeFunction(msgType, myTalkerIdPtr, myContentPtr, myGroupMsgSenderIdPtr, myXmlContentPtr, isMyMsg))
        }
      }
    })
  return nativeCallback
})()

export {recvMsgNativeCallback}
