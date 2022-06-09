const LoadLibraryAAddr = Module.findExportByName(
  'Kernel32.dll',
  'LoadLibraryA',
)
const LoadLibraryA = new NativeFunction(LoadLibraryAAddr, 'int', ['pointer'])

const GetFileVersionInfoSizeAAddr = Module.findExportByName(
  'version.dll',
  'GetFileVersionInfoSizeA',
)
const GetFileVersionInfoSizeA = new NativeFunction(
  GetFileVersionInfoSizeAAddr,
  'int',
  ['pointer', 'pointer'],
)

const GetFileVersionInfoAAddr = Module.findExportByName(
  'version.dll',
  'GetFileVersionInfoA',
)

const GetFileVersionInfoA = new NativeFunction(
  GetFileVersionInfoAAddr,
  'int',
  ['pointer', 'uint', 'uint', 'pointer'],
)

const VerQueryValueAAddr = Module.findExportByName(
  'version.dll',
  'VerQueryValueA',
)
const VerQueryValueA = new NativeFunction(VerQueryValueAAddr, 'int', [
  'pointer',
  'pointer',
  'pointer',
  'pointer',
])

const WINAPI = {
  LoadLibraryA,
  GetFileVersionInfoSizeA,
  GetFileVersionInfoA,
  VerQueryValueA,
}

function getPEVersion (peFileName) {
  console.info('getPEVersion .................................................')

  const filename = Memory.allocAnsiString(peFileName)
  const Handle = Memory.alloc(4)
  Handle.writeUInt(0)
  let size = Number(GetFileVersionInfoSizeA(filename, Handle))
  if (!size) return ''

  const data = Memory.alloc(size + 1)
  let succeed = GetFileVersionInfoA(filename, 0, size, data)

  if (!succeed) return ''
  const subBlock = Memory.allocAnsiString(
    '\\StringFileInfo\\080404b0\\FileVersion',
  )
  const lplpBuf = Memory.alloc(4)
  const bufLen = Memory.alloc(4)
  bufLen.writeUInt(0)
  succeed = VerQueryValueA(data, subBlock, lplpBuf, bufLen)
  size = bufLen.readUInt()

  if (size <= 0) return ''
  const verBuf = lplpBuf.readPointer()
  console.info('getPEVersion ...', verBuf.readCString())
  return verBuf.readCString()
}

const getWechatVersion =async () => {
  const DllName = 'WeChatWin.dll'
  return await getPEVersion(DllName)
}
