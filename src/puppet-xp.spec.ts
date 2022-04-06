#!/usr/bin/env node --no-warnings --loader ts-node/esm

import { test } from 'tstest'

import { PuppetXp } from './puppet-xp.js'

class PuppetXpTest extends PuppetXp {
}

test.skip('PuppetXp perfect restart testing', async (t) => {
  const puppet = new PuppetXpTest()
  try {

    for (let i = 0; i < 3; i++) {
      await puppet.start()
      t.ok(puppet.state.active(), 'should be turned on after start()')

      await puppet.stop()
      t.ok(puppet.state.inactive(), 'should be turned off after stop()')

      t.pass('start/stop-ed at #' + i)
    }

    t.pass('PuppetXp() perfect restart pass.')
  } catch (e) {
    t.fail(e as any)
  }
})
