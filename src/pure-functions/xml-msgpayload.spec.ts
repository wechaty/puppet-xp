#!/usr/bin/env -S ts-node --project tsconfig.cjs.json

import { test } from 'tstest'

import { XmlDecrypt } from './xml-msgpayload.js'

test('CJS: codeRoot()', async t => {
  t.ok(XmlDecrypt, 'should exist XmlDecrypt')
})
