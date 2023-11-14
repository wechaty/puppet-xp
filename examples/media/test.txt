# WECHATY-PUPPET-WECHAT4U [![NPM](https://github.com/wechaty/wechaty-puppet-wechat4u/actions/workflows/npm.yml/badge.svg)](https://github.com/wechaty/wechaty-puppet-wechat4u/actions/workflows/npm.yml)

[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-blue.svg)](https://github.com/chatie/wechaty)
[![NPM Version](https://badge.fury.io/js/wechaty-puppet-wechat4u.svg)](https://badge.fury.io/js/wechaty-puppet-wechat4u)
[![npm (tag)](https://img.shields.io/npm/v/wechaty-puppet-wechat4u/next.svg)](https://www.npmjs.com/package/wechaty-puppet-wechat4u?activeTab=versions)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![ES Modules](https://img.shields.io/badge/ES-Modules-brightgreen)](https://github.com/Chatie/tsconfig/issues/16)

![wechaty puppet wechat4u](https://wechaty.github.io/puppet-wechat4u/images/wechat4u-logo.png)

Wechat4u Puppet for Wechaty

See: [New Puppet - Plan to support `WECHATY_HEAD=WECHAT4U` #69](https://github.com/Chatie/wechaty/issues/69)

## ABOUT WECHAT4U

[Wechat4U](https://github.com/nodeWechat/wechat4u) is an excellent wechat bot framework that supports both Node.js & Browser, with rich features and an active community of experienced contributors.

## KNOWN LIMITATIONS

~~1. WeChat Account that registered after 2017 mignt not be able to login Web Wechat, so it can not use PuppetPuppeteer with Wechaty. Please make sure your WeChat Account can be able to login by visiting <https://wx.qq.com>~~
~~1. Web API can not create room and invite members to room since 2018.~~

UOS has support

更新 - 2023/02/10
目前使用 1.13.14 大多数使用者可能出现微信被官方封禁提醒，从已知收集的封禁情况，暂未有可解决方案。

猜测可能与近期ChatGPT结合本仓库实现个性化机器人导致相关封禁，请合理，谨慎使用本仓库。

If you want to break the above limitations, please consider to use a Wechaty Puppet other than using Web API, like [wechaty-puppet-padchat](https://github.com/lijiarui/wechaty-puppet-padchat).

Learn more about the Puppet at [Wechaty wiki: Puppet](https://github.com/Chatie/wechaty/wiki/Puppet)

## HISTORY

### v1.14.0 (April 21, 2023)

1.Stable version

2.Fix Contact isFriend

### v1.13.8 (Nov 22, 2022)

1.Fix Contact update

### v1.13.1 (Nov 18, 2022)

1.Support uos login

2.Refactor the code to support more event

### master v1.0 (Oct 30, 2021)

Release 1.0 of Wechaty Puppet for Wechat4u

### v0.20 (Sep 14, 2021)

1. ES Modules support

### v0.18 (Feb 20, 2021)

Fix `wechaty-puppet` dependencies

### v0.0.1 (Jun 30, 2018)

Init version

## MAINTAINERS

- [Leo Chen](https://wechaty.js.org/contributors/leochen-g/), [Project Admin](https://github.com/wechaty/puppet-wechat4u/pull/42#issuecomment-1324436596)
- [Huan](https://wechaty.js.org/contributors/huan/), Author of Puppet WeChat4U

## AUTHOR

[Huan LI](http://linkedin.com/in/zixia) \<zixia@zixia.net\>

<!-- markdownlint-disable MD033 -->
<a href="https://stackexchange.com/users/265499">
  <img src="https://stackexchange.com/users/flair/265499.png" width="208" height="58" alt="profile for zixia on Stack Exchange, a network of free, community-driven Q&amp;A sites" title="profile for zixia on Stack Exchange, a network of free, community-driven Q&amp;A sites">
</a>

## COPYRIGHT & LICENSE

- Code & Docs © 2018 Huan LI \<zixia@zixia.net\>
- Code released under the Apache-2.0 License
- Docs released under Creative Commons
