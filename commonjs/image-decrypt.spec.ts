#!/usr/bin/env -S ts-node --project tsconfig.cjs.json

import { test } from 'tstest'

import { ImageDecrypt } from './image-decrypt'

test('CJS: codeRoot()', async t => {
  t.ok(ImageDecrypt, 'should exist ImageDecrypt')
})
