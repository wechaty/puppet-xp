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
import qrcodeTerminal from 'qrcode-terminal'

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
