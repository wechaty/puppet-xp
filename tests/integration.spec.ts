#!/usr/bin/env node --no-warnings --loader ts-node/esm

import { test }  from 'tstest'

import { WechatyBuilder } from 'wechaty'

import {
  PuppetXp,
}                         from '../src/mod.js'

test('integration testing', async t => {
  const puppet = new PuppetXp()
  const wechaty = WechatyBuilder.build({ puppet })

  t.ok(wechaty, 'should instantiate wechaty with puppet mocker')
})
