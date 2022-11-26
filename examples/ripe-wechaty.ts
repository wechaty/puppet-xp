/**
 * Wechaty - Conversational RPA SDK for Chatbot Makers.
 *  - https://github.com/wechaty/wechaty
 */
import {
  Contact,
  Message,
  ScanStatus,
  WechatyBuilder,
  log,
  types,
} from 'wechaty'
import { FileBox } from 'file-box'

import { PuppetXp } from '../src/puppet-xp.js'
import qrcodeTerminal from 'qrcode-terminal'
import timersPromise from 'timers/promises'

function onScan (qrcode: string, status: ScanStatus) {
  if (qrcode) {
    const qrcodeImageUrl = [
      'https://wechaty.js.org/qrcode/',
      encodeURIComponent(qrcode),
    ].join('')
    console.info('StarterBot', 'onScan: %s(%s) - %s', status, qrcodeImageUrl)

    qrcodeTerminal.generate(qrcode, { small: true })  // show qrcode on console
    console.info(`[${status}] ${qrcode}\nScan QR Code above to log in: `)
  } else {
    console.info(`[${status}]`)
  }
}

async function onLogin (user: Contact) {
  log.info('StarterBot', '%s login', user)
  const roomList = await bot.Room.findAll()
  console.info(roomList.length)
  const contactList = await bot.Contact.findAll()
  console.info(contactList.length)
}

function onLogout (user: Contact) {
  log.info('StarterBot', '%s logout', user)
}

async function onMessage (msg: Message) {
  log.info('StarterBot', msg.toString())
  if (msg.text() === 'ding') {
    await msg.say('dong')
  }
  if (msg.type() === types.Message.Image) {
    const img = await msg.toImage()
    const thumbFile = await img.thumbnail()
    log.info('thumbFile', thumbFile.name)
    await thumbFile.toFile(`${process.cwd()}/cache/${thumbFile.name}`, true)

    // await timersPromise.setTimeout(3000)
    // console.info(img)
    const hdFile = await img.hd()
    log.info('hdFile', hdFile.name)
    await hdFile.toFile(`${process.cwd()}/cache/${hdFile.name}`, true)
    // setTimeout(msg.wechaty.wrapAsync(
    //   async function () {
    //     const imginfo = await msg.toFileBox()
    //     console.info(imginfo)
    //   },
    // ), 500)
  }
  if (msg.type() === types.Message.Emoticon) {
    const emoticon = await msg.toFileBox()
    await emoticon.toFile(`${process.cwd()}/cache/${emoticon.name}`, true)
    await timersPromise.setTimeout(1000)
    console.info(emoticon)
    // setTimeout(msg.wechaty.wrapAsync(
    //   async function () {
    //     const imginfo = await msg.toFileBox()
    //     console.info(imginfo)
    //   },
    // ), 500)
  }
  if (msg.text() === 'file') {
    const newpath = 'C:\\Users\\wechaty\\Documents\\GitHub\\wechat-openai-qa-bot\\cache\\data1652178575294.xls'

    log.info('newpath==================================', newpath)
    const fileBox = FileBox.fromFile(newpath)
    await msg.say(fileBox)
  }
}

const puppet = new PuppetXp()
const bot = WechatyBuilder.build({
  name: 'ding-dong-bot',
  puppet,
})

bot.on('scan', onScan)
bot.on('login', onLogin)
bot.on('logout', onLogout)
bot.on('message', onMessage)
bot.on('room-join', async (room, inviteeList, inviter) => {
  // "超超超哥"邀请"瓦力"加入了群聊
  // "超超超哥"邀请你加入了群聊，群聊参与人还有：瓦力
  // "luyuchao"邀请"瓦力"加入了群聊
  // 你邀请"瓦力"加入了群聊
  const nameList = inviteeList.map(c => c.name()).join(',')
  log.info(`Room ${await room.topic()} got new member ${nameList}, invited by ${inviter}`)
})
bot.on('room-leave', async (room, leaverList, remover) => {
  // 你被"luyuchao"移出群聊
  // 你将"瓦力"移出了群聊
  const nameList = leaverList.map(c => c.name()).join(',')
  log.info(`Room ${await room.topic()} lost member ${nameList}, the remover is: ${remover}`)
})
bot.on('room-topic', async (room, topic, oldTopic, changer) => {
  // "luyuchao"修改群名为“北辰香麓欣麓园抗疫”
  // 你修改群名为“大师是群主”
  log.info(`Room ${await room.topic()} topic changed from ${oldTopic} to ${topic} by ${changer.name()}`)
})
bot.on('room-invite', async roomInvitation => {
  log.info(JSON.stringify(roomInvitation))
  // "超超超哥"邀请你加入了群聊，群聊参与人还有：瓦力
  try {
    log.info('received room-invite event.')
    await roomInvitation.accept()
  } catch (e) {
    console.error(e)
  }
})

bot.start()
  .then(() => {
    return log.info('StarterBot', 'Starter Bot Started.')
  })
  .catch(console.error)
