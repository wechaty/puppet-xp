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
  console.debug(talker)
  // const alias = await talker.alias()
  // console.info(alias)
  const name = talker.name()
  console.info(name)
  const room = msg.room()
  console.debug(room)
  if (msg.text() === 'ding') {
    await msg.say('dong')
  }
  if (msg.text() === 'dong' && room) {
    const mentionIdList = []
    mentionIdList.push(talker)
    console.info(mentionIdList)
    await room.say('ding',...mentionIdList)
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
