/**
 * Wechaty - Conversational RPA SDK for Chatbot Makers.
 *  - https://github.com/wechaty/wechaty
 */
 import {
  Contact,
  Message,
  ScanStatus,
  Wechaty,
  log,
}                  from 'wechaty'

import { PuppetXp } from '../src/puppet-xp'
import { FileBox }  from 'file-box'

function onScan (qrcode: string, status: ScanStatus) {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    const qrcodeImageUrl = [
      'https://wechaty.js.org/qrcode/',
      encodeURIComponent(qrcode),
    ].join('')

    log.info('StarterBot', 'onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl)
  } else {
    log.info('StarterBot', 'onScan: %s(%s)', ScanStatus[status], status)
  }
}

function onLogin (user: Contact) {
  log.info('StarterBot', '%s login', user)
}

function onLogout (user: Contact) {
  log.info('StarterBot', '%s logout', user)
}

async function onMessage (msg: Message) {
  log.info('StarterBot', msg.toString())
  const talker = msg.talker()
  // console.debug(talker)
  // const alias = await talker.alias()
  // console.info(alias)
  const name = talker.name()
  console.info(name)
  const room = msg.room()
  // console.debug(room)
  if (msg.text() === 'ding') {
    await msg.say('dong')
  }
  if (msg.text() === 'at' && room) {
    const mentionIdList = []
    mentionIdList.push(talker)
    console.debug(mentionIdList)
    await room.say('hi',...mentionIdList)
  }
  if (room) {
    // const member =await room.memberAll(name)
    // console.debug('member-------------------------------',member)
    if (msg.text() === 'f') {
      const c = await bot.Contact.find({id: 'tyutluyc'})
      if (c) {
        await msg.forward(c)
      }
    }
  }


  if (msg.text() === 'p') {
    const fileBox1 = FileBox.fromUrl('http://pic.linecg.com/uploads/file/contents/2019/095d7772e8a0b1b.jpg')
    await msg.say(fileBox1)
  }

  if (msg.text() === 'c') {
    const contactList = await bot.Contact.findAll()
    console.debug(contactList)
  }

  if (msg.text() === 'r') {
    const roomList = await bot.Room.findAll()
    console.debug(roomList)
  }
}

const puppet = new PuppetXp()
const bot = new Wechaty({
  name: 'ding-dong-bot',
  puppet,
  // puppetOptions: {
  //   token: 'xxx',
  // }
})

bot.on('scan',    onScan)
bot.on('login',   onLogin)
bot.on('logout',  onLogout)
bot.on('message', onMessage)

bot.start()
  .then(() => {
    log.info('StarterBot', 'Starter Bot Started.')
  })
  .catch(e => log.error('StarterBot', e))
