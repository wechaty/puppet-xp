var fs = require("fs");

var xor = '88888888';   //异或值(十六进制)
xor = hexToBin(xor);

var xorLen = 2;

function ImageDecrypt(dataPath, messageId) {
    //读取文件，获取到十六进制数据
    try {
        const data = fs.readFileSync(dataPath, 'hex')
        var res = handleEncrypted(data);   //解密后的十六进制数据
        var extension = getNameExtension(res.substring(0, 2));
        // console.debug(extension)
        const imageInfo = {
            base64: res,
            fileName: `message-${messageId}-url-thumb.${extension}`
        }
        // console.debug(imageInfo)
        return imageInfo
    } catch (err) {
        console.error(err)
    }
    return {}
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

//解密加密数据
function handleEncrypted(strEncrypted) {
    //先获取异或值(仅限于jpg文件)
    // getXor(strEncrypted.substring(0, 4));
    let strLength = strEncrypted.length;
    var source = '';
    var list = [];
    for (var i = 0; i < strLength; i = i + xorLen) {
        var str = strEncrypted.substring(0, xorLen);
        strEncrypted = strEncrypted.substring(xorLen);
        var res = getResult(str);
        list.push(res);
    }
    source = list.join('');
    // console.debug(source)
    return source;
}

//获取异或值
function getXor(str) {
    xor = 'ffd8';
    xor = getResult(str);
    return;
}

//获取文件名后缀
function getNameExtension(hex) {
    // console.debug(hex)
    var res = dataHead.find(function (item) {
        return item.hex === hex;
    }).name
    return res;
}

//十六进制转二进制
function hexToBin(str) {
    let hex_array = [{ hex: '0', bin: "0000" }, { hex: '1', bin: "0001" }, { hex: '2', bin: "0010" }, { hex: '3', bin: "0011" }, { hex: '4', bin: "0100" }, { hex: '5', bin: "0101" }, { hex: '6', bin: "0110" }, { hex: '7', bin: "0111" },
    { hex: '8', bin: "1000" }, { hex: '9', bin: "1001" }, { hex: 'a', bin: "1010" }, { hex: 'b', bin: "1011" }, { hex: 'c', bin: "1100" }, { hex: 'd', bin: "1101" }, { hex: 'e', bin: "1110" }, { hex: 'f', bin: "1111" }];
    let value = "";
    for (let i = 0; i < str.length; i++) {
        value += hex_array.find(function (item) {
            return item.hex == str[i];
        }).bin;
    }
    return value;
}

//二进制转十六进制
function binToHex(str) {
    let hex_array = [{ hex: '0', bin: "0000" }, { hex: '1', bin: "0001" }, { hex: '2', bin: "0010" }, { hex: '3', bin: "0011" }, { hex: '4', bin: "0100" }, { hex: '5', bin: "0101" }, { hex: '6', bin: "0110" }, { hex: '7', bin: "0111" },
    { hex: '8', bin: "1000" }, { hex: '9', bin: "1001" }, { hex: 'a', bin: "1010" }, { hex: 'b', bin: "1011" }, { hex: 'c', bin: "1100" }, { hex: 'd', bin: "1101" }, { hex: 'e', bin: "1110" }, { hex: 'f', bin: "1111" }];
    let value = '';
    let list = [];
    while (str.length > 4) {
        list.push(str.substring(0, 4));
        str = str.substring(4);
    }
    list.push(str);
    for (let i = 0; i < list.length; i++) {
        value += hex_array.find(function (item) {
            return item.bin == list[i];
        }).hex;
    }
    return value;
}

//获取计算结果
function getResult(a) {
    let A = hexToBin(a);
    let B = xor;
    let d = "";
    for (let i = 0; i < A.length; i++) {
        if (A[i] === B[i]) {
            d = d.concat('0');
        } else {
            d = d.concat('1');
        }
    }
    return binToHex(d);
}

//扩展名-十六进制表
var dataHead = [
    {
        name: 'jpg',
        hex: 'ff'
    },
    {
        name: 'png',
        hex: '89'
    },
    {
        name: 'gif',
        hex: '47'
    },
    {
        name: 'bmp',
        hex: '42'
    }
]

module.exports = {
    ImageDecrypt
}