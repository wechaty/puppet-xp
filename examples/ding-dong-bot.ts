/**
 *   Wechaty - https://github.com/chatie/wechaty
 *
 *   @copyright 2016-2018 Huan LI <zixia@zixia.net>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */
import {
  EventLogoutPayload,
  EventLoginPayload,
  EventScanPayload,
  EventErrorPayload,
  EventMessagePayload,
}                         from 'wechaty-puppet'

const qrcode = require('qrcode-terminal')

import {
  PuppetXp,
  mock,
}               from '../src/mod'

const mocker = new mock.Mocker()
mocker.use(mock.SimpleEnvironment())

/**
 *
 * 1. Declare your Bot!
 *
 */
const puppet = new PuppetXp({ mocker })

/**
 *
 * 2. Register event handlers for Bot
 *
 */

puppet
  .on('logout', onLogout)
  .on('login',  onLogin)
  .on('scan',   onScan)
  .on('error',  onError)
  .on('message', onMessage)

/**
 *
 * 3. Start the bot!
 *
 */
puppet.start()
  .catch(async e => {
    console.error('Bot start() fail:', e)
    await puppet.stop()
    process.exit(-1)
  })

/**
 *
 * 4. You are all set. ;-]
 *
 */

/**
 *
 * 5. Define Event Handler Functions for:
 *  `scan`, `login`, `logout`, `error`, and `message`
 *
 */
function onScan (payload: EventScanPayload) {
  if (payload.qrcode) {
    qrcode.generate(payload.qrcode, { small: true })

    const qrcodeImageUrl = [
      'https://wechaty.js.org/qrcode/',
      payload.qrcode,
    ].join('')
    console.info(`[${payload.status}] ${qrcodeImageUrl}\nScan QR Code above to log in: `)
  } else {
    console.info(`[${payload.status}]`)
  }
}

function onLogin (payload: EventLoginPayload) {
  console.info(`${payload.contactId} login`)
}

function onLogout (payload: EventLogoutPayload) {
  console.info(`${payload.contactId} logouted`)
}

function onError (payload: EventErrorPayload) {
  console.error('Bot error:', payload.data)
  /*
  if (bot.logonoff()) {
    bot.say('Wechaty error: ' + e.message).catch(console.error)
  }
  */
}

/**
 *
 * 6. The most important handler is for:
 *    dealing with Messages.
 *
 */
async function onMessage (payload: EventMessagePayload) {
  const msgPayload = await puppet.messagePayload(payload.messageId)
  if ((/ding/.test(msgPayload.text || '') )) {
    await puppet.messageSendText(msgPayload.fromId!, 'dong')
  }
}

/**
 *
 * 7. Output the Welcome Message
 *
 */
const welcome = `
Puppet Version: ${puppet.version()}

Please wait... I'm trying to login in...

`
console.info(welcome)
