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
import fs from 'fs'

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

  const basepath = 'examples/media/'
  /**
   * 发送文件
   */
  if (msg.text() === 'txt') {
    const newpath = basepath + 'test.txt'
    const fileBox = FileBox.fromFile(newpath)
    await msg.say(fileBox)
  }

  /**
   * 发送图片
   */
  if (msg.text() === 'jpg') {
    const newpath = 'https://github.com/wechaty/wechaty/blob/main/docs/images/bot-qr-code.png'
    const fileBox = FileBox.fromUrl(newpath)
    await msg.say(fileBox)
  }

  /**
   * 发送表情
   */
  if (msg.text() === 'gif') {
    const newpath = basepath + 'test.gif'
    const fileBox = FileBox.fromFile(newpath)
    await msg.say(fileBox)
  }

  /**
   * 发送视频
   */
  if (msg.text() === 'mp4') {
    const newpath = basepath + 'test.mp4'
    const fileBox = FileBox.fromFile(newpath)
    await msg.say(fileBox)
  }

  try {
    if (msg.type() === types.Message.Image || msg.type() === types.Message.Attachment || msg.type() === types.Message.Video || msg.type() === types.Message.Audio || msg.type() === types.Message.Emoticon) {
      const file = await msg.toFileBox()  // Save the media message as a FileBox
      const filePath = 'examples/file/' + file.name
      file.toFile(filePath)
      log.info(`Saved file: ${filePath}`)
    } else {
      // Log other non-text messages
      const logData = {
        date: new Date(),
        from: msg.talker().name(),
        text: msg.text(),
        type: msg.type(),
      }
      const logPath = 'examples/log/message.log'
      fs.appendFileSync(logPath, JSON.stringify(logData, null, 2) + '\n')
      log.info(`Logged message data to ${logPath}`)
    }
  } catch (e) {
    console.error(`Error handling message: ${e}`)
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
  const nameList = inviteeList.map(c => c.name()).join(',')
  log.info(`Room ${await room.topic()} got new member ${nameList}, invited by ${inviter}`)
})
bot.on('room-leave', async (room, leaverList, remover) => {
  const nameList = leaverList.map(c => c.name()).join(',')
  log.info(`Room ${await room.topic()} lost member ${nameList}, the remover is: ${remover}`)
})
bot.on('room-topic', async (room, topic, oldTopic, changer) => {
  log.info(`Room ${await room.topic()} topic changed from ${oldTopic} to ${topic} by ${changer.name()}`)
})
bot.on('room-invite', async roomInvitation => {
  log.info(JSON.stringify(roomInvitation))
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