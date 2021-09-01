#!/usr/bin/env -S node --no-warnings --loader ts-node/esm

import { test } from 'tstest'

import {
  codeRoot,
}                 from './cjs.js'

test('ESM: codeRoot', async t => {
  t.ok(codeRoot, 'should exists "codeRoot"')
})
