import { offset } from "../CommonData/data-offset";
import { moduleBaseAddress } from "../../Common/globalVariable";
const hookLogoutEventCallback = ((): NativeCallback<"void", ["int32"]> => {
  const nativeCallback: NativeCallback<"void", ["int32"]> = new NativeCallback(
    () => {},
    "void",
    ["int32"]
  );
  const nativeativeFunction: NativeFunction<void, [number]> =
    new NativeFunction(nativeCallback, "void", ["int32"]);
  Interceptor.attach(moduleBaseAddress.add(offset.hook_on_logout_offset), {
    onEnter: function (args) {
      const bySrv: number = args[0]!.toInt32();
      setImmediate(() => nativeativeFunction(bySrv));
    },
  });
  return nativeCallback;
})();

export { hookLogoutEventCallback };
