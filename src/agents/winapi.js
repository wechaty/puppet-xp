// const LoadLibraryAAddr = Module.findExportByName(
//   'Kernel32.dll',
//   'LoadLibraryA',
// )
// const LoadLibraryA = new NativeFunction(LoadLibraryAAddr, 'int', ['pointer'])

// const GetFileVersionInfoSizeAAddr = Module.findExportByName(
//   'version.dll',
//   'GetFileVersionInfoSizeA',
// )
// const GetFileVersionInfoSizeA = new NativeFunction(
//   GetFileVersionInfoSizeAAddr,
//   'int',
//   ['pointer', 'pointer'],
// )

// const GetFileVersionInfoAAddr = Module.findExportByName(
//   'version.dll',
//   'GetFileVersionInfoA',
// )

// const GetFileVersionInfoA = new NativeFunction(
//   GetFileVersionInfoAAddr,
//   'int',
//   ['pointer', 'uint', 'uint', 'pointer'],
// )

// const VerQueryValueAAddr = Module.findExportByName(
//   'version.dll',
//   'VerQueryValueA',
// )
// const VerQueryValueA = new NativeFunction(VerQueryValueAAddr, 'int', [
//   'pointer',
//   'pointer',
//   'pointer',
//   'pointer',
// ])

// const WINAPI = {
//   LoadLibraryA,
//   GetFileVersionInfoSizeA,
//   GetFileVersionInfoA,
//   VerQueryValueA,
// }

// function getPEVersion (peFileName) {
//   console.info('getPEVersion .................................................')

//   const filename = Memory.allocAnsiString(peFileName)
//   const Handle = Memory.alloc(4)
//   Handle.writeUInt(0)
//   let size = Number(GetFileVersionInfoSizeA(filename, Handle))
//   if (!size) return ''

//   const data = Memory.alloc(size + 1)
//   let succeed = GetFileVersionInfoA(filename, 0, size, data)

//   if (!succeed) return ''
//   const subBlock = Memory.allocAnsiString(
//     '\\StringFileInfo\\080404b0\\FileVersion',
//   )
//   const lplpBuf = Memory.alloc(4)
//   const bufLen = Memory.alloc(4)
//   bufLen.writeUInt(0)
//   succeed = VerQueryValueA(data, subBlock, lplpBuf, bufLen)
//   size = bufLen.readUInt()

//   if (size <= 0) return ''
//   const verBuf = lplpBuf.readPointer()
//   console.info('getPEVersion ...', verBuf.readCString())
//   return verBuf.readCString()
// }

// const getWechatVersion =async () => {
//   const DllName = 'WeChatWin.dll'
//   return await getPEVersion(DllName)
// }

const moduleBaseAddress = Module.getBaseAddress('WeChatWin.dll')
const moduleLoad = Module.load('WeChatWin.dll')

const getWechatVersionFunction = (() => {
  const pattern = '55 8B ?? 83 ?? ?? A1 ?? ?? ?? ?? 83 ?? ?? 85 ?? 7F ?? 8D ?? ?? E8 ?? ?? ?? ?? 84 ?? 74 ?? 8B ?? ?? ?? 85 ?? 75 ?? E8 ?? ?? ?? ?? 0F ?? ?? 0D ?? ?? ?? ?? A3 ?? ?? ?? ?? A3 ?? ?? ?? ?? 8B ?? 5D C3'
  const results = Memory.scanSync(moduleLoad.base, moduleLoad.size, pattern)
  if (results.length == 0) {
    return 0
  }
  const addr = results[0].address
  const ret = addr.add(0x07).readPointer()
  const ver = ret.add(0x0).readU32()
  return ver
})

const getWechatVersionStringFunction = ((ver = getWechatVersionFunction()) => {
  if (!ver) {
    return '0.0.0.0'
  }
  const vers = []
  vers.push((ver >> 24) & 255 - 0x60)
  vers.push((ver >> 16) & 255)
  vers.push((ver >> 8) & 255)
  vers.push(ver & 255)
  return vers.join('.')
})

const agentReadyCallback = (() => {
  const nativeCallback = new NativeCallback(() => { }, 'void', [])
  const nativeativeFunction = new NativeFunction(nativeCallback, 'void', [])

  setTimeout(() => {
    nativeativeFunction()
  }, 500);
  return nativeCallback
})()