import fs from 'fs'

let xorCache:string|null = null
// let xor = '9a9a'   // 异或值(十六进制)
// xor = hexToBin(xor)

const xorLen = 2

function ImageDecrypt (dataPath: string, messageId: string) {
  // 读取文件，获取到十六进制数据
  try {
    const data = fs.readFileSync(dataPath, 'hex')
    const res = handleEncrypted(data)   // 解密后的十六进制数据
    const extension = getNameExtension(res.substring(0, 4))
    // console.debug(extension)
    const imageInfo = {
      base64: Buffer.from(res, 'hex').toString('base64'),
      extension,
      fileName: `message-${messageId}-url-thumb.${extension}`,
    }
    // console.debug(imageInfo)
    return imageInfo
  } catch (err) {
    console.error(err)
  }
  throw new Error('ImageDecrypt fail')
  // return {}
  // fs.readFile(dataPath, { encoding: 'hex' }, function (err, data) {
  //     if (err) {
  //         console.log(err);
  //     } else {
  //         var res = handleEncrypted(data);
  //         var extension = getNameExtension(res.substring(0, 2));
  //         console.debug(extension)
  //         var hex = Buffer.from(res, 'hex');
  //         console.debug(hex)
  //         fs.writeFile(resPath + extension, hex, function (err) {
  //             if (err) {
  //                 console.log('出错：', err);
  //             }
  //             console.timeEnd('完成，耗时');
  //         })
  //         const imageInfo = {
  //             base64: res,
  //             fileName: messageId + '.' + extension
  //         }
  //         console.debug(imageInfo)
  //         return imageInfo
  //     }
  // })
}

// 解密加密数据
function handleEncrypted (strEncrypted: string) {
  // 先获取异或值(仅限于jpg文件)
  const code = getXor(strEncrypted.substring(0, 4))
  const strLength = strEncrypted.length
  let source = ''
  const list = []
  for (let i = 0; i < strLength; i = i + xorLen) {
    const str = strEncrypted.substring(0, xorLen)
    strEncrypted = strEncrypted.substring(xorLen)
    const res = hexXor(str, code)
    list.push(res)
  }
  source = list.join('')
  // console.debug(source)
  return source
}

// 获取异或值
/**
 *
 * @param str strEncrypted.substring(0, 4)
 * @return xor
 */
function getXor (str: string): string {
  if (typeof xorCache === 'string') {
    return xorCache
  }
  const str01 = str.substring(0, 2)
  const str23 = str.substring(2)
  for (const head of dataHead) {
    const h = head.hex
    const h01 = h.substring(0, 2)
    const h23 = h.substring(2)
    const code = hexXor(h01, str01)
    const testResult = hexXor(str23, code)
    if (testResult === h23) {
      xorCache = code
      return xorCache
    }
  }
  throw new Error('getXor error')
}
void getXor

// 获取文件名后缀
function getNameExtension (hex: string) {
  // console.debug(hex)
  const res = dataHead.find(function (item) {
    return item.hex === hex
  })!.name
  return res
}

// 十六进制转二进制
function hexToBin (str: string) {
  const hexArray = [
    { bin: '0000', hex: '0' },
    { bin: '0001', hex: '1' },
    { bin: '0010', hex: '2' },
    { bin: '0011', hex: '3' },
    { bin: '0100', hex: '4' },
    { bin: '0101', hex: '5' },
    { bin: '0110', hex: '6' },
    { bin: '0111', hex: '7' },
    { bin: '1000', hex: '8' },
    { bin: '1001', hex: '9' },
    { bin: '1010', hex: 'a' },
    { bin: '1011', hex: 'b' },
    { bin: '1100', hex: 'c' },
    { bin: '1101', hex: 'd' },
    { bin: '1110', hex: 'e' },
    { bin: '1111', hex: 'f' },
  ] as const
  let value = ''
  for (let i = 0; i < str.length; i++) {
    value += hexArray.find(function (item) {
      return item.hex === str[i]
    })!.bin
  }
  return value
}

// 二进制转十六进制
function binToHex (str: string) {
  const hexArray = [
    { bin: '0000', hex: '0' },
    { bin: '0001', hex: '1' },
    { bin: '0010', hex: '2' },
    { bin: '0011', hex: '3' },
    { bin: '0100', hex: '4' },
    { bin: '0101', hex: '5' },
    { bin: '0110', hex: '6' },
    { bin: '0111', hex: '7' },
    { bin: '1000', hex: '8' },
    { bin: '1001', hex: '9' },
    { bin: '1010', hex: 'a' },
    { bin: '1011', hex: 'b' },
    { bin: '1100', hex: 'c' },
    { bin: '1101', hex: 'd' },
    { bin: '1110', hex: 'e' },
    { bin: '1111', hex: 'f' },
  ]
  let value = ''
  const list: string[] = []
  while (str.length > 4) {
    list.push(str.substring(0, 4))
    str = str.substring(4)
  }
  list.push(str)
  for (let i = 0; i < list.length; i++) {
    value += hexArray.find(function (item) {
      return item.bin === list[i]
    })!.hex
  }
  return value
}

// 获取计算结果
// function getResult (a: string) {
//   const A = hexToBin(a)
//   const B = xor
//   let d = ''
//   for (let i = 0; i < A.length; i++) {
//     if (A[i] === B[i]) {
//       d = d.concat('0')
//     } else {
//       d = d.concat('1')
//     }
//   }
//   return binToHex(d)
// }

function hexXor (a: string, b: string) {
  const A = hexToBin(a)
  const B = hexToBin(b)
  let d = ''
  for (let i = 0; i < A.length; i++) {
    if (A[i] === B[i]) {
      d = d.concat('0')
    } else {
      d = d.concat('1')
    }
  }
  return binToHex(d)
}

// 扩展名-十六进制表
const dataHead = [
  {
    hex: 'ffd8',
    name: 'jpg',
  },
  {
    hex: '8950',
    name: 'png',
  },
  {
    hex: '4749',
    name: 'gif',
  },
  {
    hex: '424d',
    name: 'bmp',
  },
]

export {
  ImageDecrypt,
}
