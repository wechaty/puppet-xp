const agentReadyCallback = ((): NativeCallback<"void", []> => {
  const nativeCallback: NativeCallback<"void", []> = new NativeCallback(
    () => {},
    "void",
    []
  );
  const nativeativeFunction: NativeFunction<void, []> = new NativeFunction(
    nativeCallback,
    "void",
    []
  );

  setTimeout(() => {
    nativeativeFunction();
  }, 500);
  return nativeCallback;
})();

export { agentReadyCallback };
