const readStringPtr = (address: any): any => {
  const addr: any = ptr(address);
  const size: number = addr.add(16).readU32();
  const capacity: number = addr.add(20).readU32();
  addr.ptr = addr;
  addr.size = size;
  addr.capacity = capacity;
  if (capacity > 15 && !addr.readPointer().isNull()) {
    addr.ptr = addr.readPointer();
  }
  addr.ptr._readCString = addr.ptr.readCString;
  addr.ptr._readAnsiString = addr.ptr.readAnsiString;
  addr.ptr._readUtf8String = addr.ptr.readUtf8String;
  addr.readCString = () => {
    return addr.size ? addr.ptr._readCString(addr.size) : "";
  };
  addr.readAnsiString = () => {
    return addr.size ? addr.ptr._readAnsiString(addr.size) : "";
  };
  addr.readUtf8String = () => {
    return addr.size ? addr.ptr._readUtf8String(addr.size) : "";
  };

  // console.log('readStringPtr() address:',address,' -> str ptr:', addr.ptr, 'size:', addr.size, 'capacity:', addr.capacity)
  // console.log('readStringPtr() str:' , addr.readUtf8String())
  // console.log('readStringPtr() address:', addr,'dump:', addr.readByteArray(24))

  return addr;
};

const readString = (address: any): string => {
  return readStringPtr(address).readUtf8String();
};

const readWStringPtr = (address: any): any => {
  const addr: any = ptr(address);
  const size = addr.add(4).readU32();
  const capacity = addr.add(8).readU32();
  addr.ptr = addr.readPointer();
  addr.size = size;
  addr.capacity = capacity;
  addr.ptr._readUtf16String = addr.ptr.readUtf16String;
  addr.readUtf16String = () => {
    return addr.size ? addr.ptr._readUtf16String(addr.size * 2) : "";
  };

  // console.log('readWStringPtr() address:',address,' -> ptr:', addr.ptr, 'size:', addr.size, 'capacity:', addr.capacity)
  // console.log('readWStringPtr() str:' ,  `"${addr.readUtf16String()}"`,'\n',addr.ptr.readByteArray(addr.size*2+2),'\n')
  // console.log('readWStringPtr() address:', addr,'dump:', addr.readByteArray(16),'\n')

  return addr;
};

const readWideString = (address: any): string => {
  return readWStringPtr(address).readUtf16String();
};

export { readString, readWideString, readWStringPtr, readStringPtr };
