import { moduleBaseAddress,offset } from "../CommonData/data-offset"
import { getQrcodeLoginData } from "./getQrcodeLoginData"

const callLoginQrcodeFunction = ((forceRefresh = false) => {
  const json = getQrcodeLoginData()
  if (!forceRefresh && json.uuid) {
    return
  }

  const callAsm:any = Memory.alloc(Process.pageSize)
  const loginWnd = moduleBaseAddress.add(offset.get_login_wnd_offset).readPointer()

  Memory.patchCode(callAsm, Process.pageSize, code => {
    var cw = new X86Writer(code, { pc: callAsm })
    cw.putPushfx();
    cw.putPushax();

    cw.putMovRegAddress('ecx', loginWnd)
    cw.putCallAddress(moduleBaseAddress.add(offset.get_qr_login_call_offset))

    cw.putPopax()
    cw.putPopfx()
    cw.putRet()
    cw.flush()
  })

  const nativeativeFunction = new NativeFunction(ptr(callAsm), 'void', [])
  nativeativeFunction()
})

export {
  callLoginQrcodeFunction
}
