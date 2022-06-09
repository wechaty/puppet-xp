const LoadLibraryA_addr = Module.findExportByName(
  'Kernel32.dll',
  'LoadLibraryA',
)
const LoadLibraryA = new NativeFunction(LoadLibraryA_addr, 'int', ['pointer'])

const GetFileVersionInfoSizeA_addr = Module.findExportByName(
  'version.dll',
  'GetFileVersionInfoSizeA',
)
const GetFileVersionInfoSizeA = new NativeFunction(
  GetFileVersionInfoSizeA_addr,
  'int',
  ['pointer', 'pointer'],
)

const GetFileVersionInfoA_addr = Module.findExportByName(
  'version.dll',
  'GetFileVersionInfoA',
)
const GetFileVersionInfoA = new NativeFunction(
  GetFileVersionInfoA_addr,
  'int',
  ['pointer', 'uint', 'uint', 'pointer'],
)

const VerQueryValueA_addr = Module.findExportByName(
  'version.dll',
  'VerQueryValueA',
)
const VerQueryValueA = new NativeFunction(VerQueryValueA_addr, 'int', [
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
  return verBuf.readCString()
}

export default getPEVersion

export {
  getPEVersion
}

// module.exports = {
//   getPEVersion,
// }
