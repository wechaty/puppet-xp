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
  type,
} from 'wechaty'

import { PuppetXp } from '../src/puppet-xp.js'

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

async function onLogin (user: Contact) {
  log.info('StarterBot', '%s login', user)
  const roomList = await bot.Room.findAll()
  console.info(roomList.length)
}

function onLogout (user: Contact) {
  log.info('StarterBot', '%s logout', user)
}

async function onMessage (msg: Message) {
  log.info('StarterBot', msg.toString())
  if (msg.text() === 'ding') {
    await msg.say('dong')
  }
  if (msg.type() === type.Message.Image) {
    setTimeout(msg.wechaty.wrapAsync(
      async function () {
        const imginfo = await msg.toFileBox()
        console.info(imginfo)
      },
    ), 500)
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

bot.start()
  .then(() => {
    return log.info('StarterBot', 'Starter Bot Started.')
  })
  .catch(console.error)
