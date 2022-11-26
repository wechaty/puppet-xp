import fs from 'fs'
import os from 'os'
const userInfo = os.userInfo()
const rootPath = `${userInfo.homedir}\\Documents\\WeChat Files\\`

const curDate = new Date()
const year = curDate.getFullYear()
let month = curDate.getMonth() + 1
if (month < 10) {
    month = '0' + month
}

var dir = 'C:\/Users\/Administrator\/Documents\/WeChat Files\/wxid_0o1t51l3f57221\/FileStorage\/Video\/2022-11'
console.debug(dir)

const files = fs.readdirSync(dir);

for (let i = 0; i < files.length; i++) {
    const fileName = files[i]
    if (fileName.indexOf('.mp4')) {
        const time = fs.statSync(dir + '/' + fileName).mtime.getTime()
        console.debug(time)
    }
}
