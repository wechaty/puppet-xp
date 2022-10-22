let msgStruct: any = null;
let msgstrPtr: any = null;
const initmsgStruct = (str: any): NativePointer => {
  msgstrPtr = Memory.alloc(str.length * 2 + 1);
  msgstrPtr.writeUtf16String(str);

  msgStruct = Memory.alloc(0x14); // returns a NativePointer

  msgStruct
    .writePointer(msgstrPtr)
    .add(0x04)
    .writeU32(str.length * 2)
    .add(0x04)
    .writeU32(str.length * 2)
    .add(0x04)
    .writeU32(0)
    .add(0x04)
    .writeU32(0);

  return msgStruct;
};

let retidStruct: NativePointer | any = null;
let retidPtr: NativePointer | any = null;
const initidStruct = (str: any): NativePointer => {
  retidPtr = Memory.alloc(str.length * 2 + 1);
  retidPtr.writeUtf16String(str);

  retidStruct = Memory.alloc(0x14); // returns a NativePointer

  retidStruct
    .writePointer(retidPtr)
    .add(0x04)
    .writeU32(str.length * 2)
    .add(0x04)
    .writeU32(str.length * 2)
    .add(0x04)
    .writeU32(0)
    .add(0x04)
    .writeU32(0);

  return retidStruct;
};

let retPtr: NativePointer | any = null;
let retStruct: NativePointer | any = null;
const initStruct = (str: any): NativePointer => {
  retPtr = Memory.alloc(str.length * 2 + 1);
  retPtr.writeUtf16String(str);

  retStruct = Memory.alloc(0x14); // returns a NativePointer

  retStruct
    .writePointer(retPtr)
    .add(0x04)
    .writeU32(str.length * 2)
    .add(0x04)
    .writeU32(str.length * 2)
    .add(0x04)
    .writeU32(0)
    .add(0x04)
    .writeU32(0);

  return retStruct;
};

let atStruct: NativePointer | any = null;
const initAtMsgStruct = (wxidStruct: any): NativePointer => {
  atStruct = Memory.alloc(0x10);

  atStruct
    .writePointer(wxidStruct)
    .add(0x04)
    .writeU32(wxidStruct.toInt32() + 0x14)
    .add(0x04) //0x14 = sizeof(wxid structure)
    .writeU32(wxidStruct.toInt32() + 0x14)
    .add(0x04)
    .writeU32(0);
  return atStruct;
};

export {
  // msgStruct,
  // msgstrPtr,
  initmsgStruct,
  // retidStruct,
  // retidPtr,
  initidStruct,
  // retPtr,
  // retStruct,
  initStruct,
  // atStruct,
  initAtMsgStruct,
};
