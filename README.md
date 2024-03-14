# Wechaty Puppet XP

[![Join Wechaty Discord Developer Community](https://img.shields.io/discord/916984413944967180?logo=discord&style=flat)](https://discord.gg/uE8Tb77VBm)
[![NPM](https://github.com/wechaty/wechaty-puppet-xp/workflows/NPM/badge.svg)](https://github.com/wechaty/wechaty/actions?query=workflow%3ANPM)
[![NPM Version](https://img.shields.io/npm/v/wechaty-puppet-xp?color=brightgreen)](https://www.npmjs.com/package/wechaty-puppet-xp)
[![npm (tag)](https://img.shields.io/npm/v/wechaty-puppet-xp/next.svg)](https://www.npmjs.com/package/wechaty-puppet-xp?activeTab=versions)
[![ES Modules](https://img.shields.io/badge/ES-Modules-brightgreen)](https://github.com/Chatie/tsconfig/issues/16)

[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-brightgreen.svg)](https://github.com/wechaty/wechaty)
[![Powered by Sidecar](https://img.shields.io/badge/Powered%20By-Sidecar-red.svg)](https://github.com/huan/sidecar)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Downloads](https://img.shields.io/npm/dm/wechaty-puppet-xp.svg?style=flat-square)](https://www.npmjs.com/package/wechaty)
[![GitHub stars](https://img.shields.io/github/stars/wechaty/wechaty-puppet-xp.svg?label=github%20stars)](https://github.com/wechaty/wechaty)
[![Gitter](https://badges.gitter.im/wechaty/wechaty.svg)](https://gitter.im/wechaty/wechaty?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

<img src="https://github.com/atorber/puppet-xp/assets/19552906/ac34b791-bfff-4beb-9631-088939d40465" alt="chatie puppet xp" width="300" height="300" align="bottom" />

- Official website: <https://wechaty.js.org/docs/puppet-providers/xp>
- Join XP Discord: <https://discord.gg/uE8Tb77VBm>

## WECHATY PUPPET YOUTH STAR

wechaty-puppet-xp is a local puppet for Wechaty:

1. If you are a user of Windows,You can use this puppet to implement your chatbot.
1. It's a completely free service and doesn't need token.

## GETTING STARTED

- STEP 1: Install wechat client in your Windows computer.

> 1.13.0+ is the latest version, only support WeChat v3.9.2.23. Note to use the npm package that matches the WeChat version.

- STEP 2: Login the wechat client on the computer.
- STEP 3: Getting Started with TypeScript/JavaScript (RECOMMENDED).

```sh
git clone https://github.com/wechaty/wechaty-puppet-xp.git
cd wechaty-puppet-xp

# 安装依赖
npm install

# 启动程序
npm start
#
# Do not forget to install WeChat with requried version and login.
#
```

| Run | Source code | Description |
| :------------- |:-------------| :-----|
| `npm start` | [examples/ding-dong-bot.ts](examples/ding-dong-bot.ts) | Puppet ding/dong |
| `npm run start:ripe` | [examples/ripe-wechaty.ts](examples/ripe-wechaty.ts) | Wechaty ding/dong |
| `npm run start:raw` | [examples/raw-sidecar.ts](examples/raw-sidecar.ts) | Sidecar ding/dong |

## RUNNING WHITH NPM

puppet-xp also have already released the installation package on NPM. Running with NPM and more examples can be referred to [wechaty-puppet-xp-getting-started](https://github.com/atorber/wechaty-puppet-xp-getting-started).

## PUPPET COMPARISON

XP is a young puppet,it keeps growing and improving.

版本|3.3.0.115|3.6.0.18|3.9.2.23|
:---|:---|:---|:---|
**<消息>**|
接收文本|✅|✅|✅
接收图片|✅|✅|✅
接收文件|✅|✅|✅
接收动图|✅|✅|✅
接收表情|✅|✅|✅
接收小程序卡片|✅|✅|✅
接收联系人卡片|✅|✅|✅
接收位置卡片|✅|✅|✅
发送文本|✅|✅|✅
发送图片|✅|✅|✅
发送文件|✅|✅|✅
发送动图|✅|✅|✅
**<群组>**|
@群成员|✅|✅|✅
群列表|✅|✅|✅
群成员列表|✅|✅|✅
群详情|✅|✅|✅
进群提示|✅|✅|✅
**<联系人>**|
好友列表|✅|✅|✅
好友详情|✅|✅|✅
**<其他>**|
登录事件|✅|✅|✅
扫码登录|||✅

## VERSION SUPPORT

Note: You need to install an NPM version that matches your WeChat client version.

puppet-xp|wechat|npm install|
|:---|:---|:---|
|1.3.x|[WeChat-v3.9.2.23](https://github.com/tom-snow/wechat-windows-versions/releases/download/v3.9.2.23/WeChatSetup-3.9.2.23.exe)|npm i wechaty-puppet-xp@next|
|1.12.7|[WeChat-v3.6.0.18](https://github.com/tom-snow/wechat-windows-versions/releases/download/v3.6.0.18/WeChatSetup-3.6.0.18.exe)|npm i wechaty-puppet-xp@1.12.7|
|1.11.14|[WeChat-v3.3.0.115](https://github.com/wechaty/wechaty-puppet-xp/releases/download/v0.5/WeChatSetup-v3.3.0.115.exe)|npm i wechaty-puppet-xp@1.11.14|

## HISTORY

### next v1.13.9

1. Add setting for contact remark
2. Optimize sample code

### v1.13.0 (September 21, 2023)

1. This version start to support WeChat v3.9.2.23,need to update WeChat on your pc to 3.9.2.23
2. [WeChatSetup-v3.9.2.23.exe](https://github.com/tom-snow/wechat-windows-versions/releases/download/v3.9.2.23/WeChatSetup-3.9.2.23.exe)

### main v1.12.7 (November 22, 2022)

1. This version start to support WeChat v3.6.0.18,need to update WeChat on your pc to 3.6.0.18
2. [WeChatSetup-v3.6.0.18.exe](https://github.com/tom-snow/wechat-windows-versions/releases/download/v3.6.0.18/WeChatSetup-3.6.0.18.exe)

### v1.11.14

the last version base WeChat 3.3.0.115, next version will support WeChat 3.6.0.18

### v1.0

wechaty 1.xx support

### v0.5

1. ES Module support
2. [WeChatSetup-v3.3.0.115.exe](https://github.com/wechaty/wechaty-puppet-xp/releases/download/v0.5/WeChatSetup-v3.3.0.115.exe)

### v0.4.7 (Aug 15, 2021)

1. Support send files.
2. Support forward text message.

### v0.4.2 (Aug 10, 2021)

Support room.say(text, ...mentionList), you can at RoomMember.

### v0.4 (Aug 9, 2021)

1. Added some support for classes Contact and Room
1. Support bot.Contact.findAll()/bot.Contact.find(query)
1. Support bot.Room.findAll()/bot.Room.find(query)

### v0.2 (July 23, 2021)

1. Code clean
1. Fix all unit tests
1. Run unit testings under Windows
1. Deploy to NPM with GitHub actions
1. [examples/ding-dong-bot.ts](examples/ding-dong-bot.ts) works on Windows!
1. [examples/raw-sidecar.ts](examples/raw-sidecar.ts) works on Windows!
1. [wechaty-getting-started](https://github.com/wechaty/wechaty-getting-started) supports `WECHATY_PUPPET=wechaty-puppet-xp` now.

### v0.0.1 (July 19, 2021)

Initial version: <https://wechaty.js.org/docs/puppet-providers/xp>

Blogs:

- [喜讯：使用Windows微信桌面版协议登录，wechaty免费版协议即将登场, @atorber, Jul 05, 2021](https://wechaty.js.org/2021/07/05/puppet-laozhang-wechat-bot/)
- [全新的Windows puppet项目wechaty-puppet-xp启动, @atorber, Jul 13, 2021](https://wechaty.js.org/2021/07/13/wechaty-puppet-xp-start-up/)
- [code如诗，bot如歌，由Wechaty引发的一个小白冒险之旅, @老张学技术, Jul 05, 2021](https://wechaty.js.org/2021/07/05/code-like-poetry-bot-like-song/)

## Author

1. Hua ZHANG [@cixingguangming55555](https://github.com/cixingguangming55555)
2. Yuchao LU [@atorber](https://github.com/atorber)

## Copyright & License

- Code & Docs © 2021 Wechaty Contributors
- Code released under the Apache-2.0 License
- Docs released under Creative Commons
