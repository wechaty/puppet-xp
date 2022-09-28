import { moduleBaseAddress,offset } from "../CommonData/data-offset"
import { isLoggedInFunction } from "../CommonFn/isLoggedIn"

const hookLoginEventCallback = ((): NativeCallback<"void", []> => {
  const nativeCallback: NativeCallback<"void", []> = new NativeCallback(() => { }, 'void', [])
  const nativeativeFunction:NativeFunction<void, []> = new NativeFunction(nativeCallback, 'void', [])
  Interceptor.attach(moduleBaseAddress.add(offset.hook_on_login_offset), {
    onLeave: function (retval) {
      isLoggedInFunction()
      setImmediate(() => nativeativeFunction())
      return retval
    }
  })

  setTimeout(() => {
    if (isLoggedInFunction()) {
      setImmediate(() => nativeativeFunction())
    }
  }, 500);

  return nativeCallback
})()

export {
  hookLoginEventCallback
}
