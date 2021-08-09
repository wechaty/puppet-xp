# Wechaty Puppet XP

[![NPM](https://github.com/wechaty/wechaty-puppet-xp/workflows/NPM/badge.svg)](https://github.com/wechaty/wechaty/actions?query=workflow%3ANPM)
[![NPM Version](https://img.shields.io/npm/v/wechaty-puppet-xp?color=brightgreen)](https://www.npmjs.com/package/wechaty-puppet-xp)
[![npm (tag)](https://img.shields.io/npm/v/wechaty-puppet-xp/next.svg)](https://www.npmjs.com/package/wechaty-puppet-xp?activeTab=versions)

[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-brightgreen.svg)](https://github.com/wechaty/wechaty)
[![Powered by Sidecar](https://img.shields.io/badge/Powered%20By-Sidecar-red.svg)](https://github.com/huan/sidecar)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Downloads](https://img.shields.io/npm/dm/wechaty-puppet-xp.svg?style=flat-square)](https://www.npmjs.com/package/wechaty)
[![GitHub stars](https://img.shields.io/github/stars/wechaty/wechaty-puppet-xp.svg?label=github%20stars)](https://github.com/wechaty/wechaty)
[![Gitter](https://badges.gitter.im/wechaty/wechaty.svg)](https://gitter.im/wechaty/wechaty?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

![chatie puppet xp](https://camo.githubusercontent.com/6c7c7e10053c8e1936c084d17ea74c3437759fd1c4d3e02acca9256e2bfe9bb3/68747470733a2f2f692e6c6f6c692e6e65742f323032302f30352f30392f4858436c49663541324570554734752e706e67)

## WECHATY PUPPET YOUTH STAR

wechaty-puppet-xp is a local puppet for Wecaty:

1. If you are a user of Windows,You can use this puppet to implement your chatbot.
1. It's a completely free service and doesn't need token.

## GETTING STARTED

- STEP 1: Install wechat client in your Windows computer.
- STEP 2: Getting Started with TypeScript/JavaScript (RECOMMENDED)

## QUICK START

```sh
git clone https://github.com/wechaty/wechaty-puppet-xp.git
cd wechaty-puppet-xp
npm install
#
# Do not forget to install WeChat with requried version
#
```

| Run | Source code | Description |
| :------------- |:-------------| :-----|
| `npm start` | [examples/ding-dong-bot.ts](examples/ding-dong-bot.ts) | Puppet ding/dong |
| `npm run start:ripe` | [examples/ripe-wechaty.ts](examples/ripe-wechaty.ts) | Wechaty ding/dong |
| `npm run start:raw` | [examples/raw-sidecar.ts](examples/raw-sidecar.ts) | Sidecar ding/dong |

## HISTORY

### main v0.3

### v0.3.2

1. Added some support for classes Contact and Room
1. support bot.Contact.findAll()/bot.Contact.find(query)
1. support bot.Room.findAll()/bot.Room.find(query)

### v0.2 (July 23, 2021)

1. Code clean
1. Fix all unit tests
1. Run unit testings under Windows
1. Deploy to NPM with GitHub actions
1. [examples/ding-dong-bot.ts](examples/ding-dong-bot.ts) works on Windows!
1. [examples/raw-sidecar.ts](examples/raw-sidecar.ts) works on Windows!
1. [wechaty-getting-started](https://github.com/wechaty/wechaty-getting-started) supports `WECHATY_PUPPET=wechaty-puppet-xp` now.

### v0.0.1 (July 19, 2021)

Initial version.

## Author

1. Hua ZHANG [@cixingguangming55555](https://github.com/cixingguangming55555)
2. Yuchao LU [@atorber](https://github.com/atorber)

## Copyright & License

- Code & Docs © 2021 Wechaty Contributors
- Code released under the Apache-2.0 License
- Docs released under Creative Commons
