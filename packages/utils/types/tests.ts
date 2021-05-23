/* eslint-disable */
import {
  getRegisteredStyles,
  insertStyles,
  isBrowser
} from '@emotion/utils'

import {
  EmotionCache,
  RegisteredCache,
} from '@emotion/utils/dist/declarations/src/types'

import { EmotionCache as OldEmotionCache, RegisteredCache as OldRegisteredCache } from "./old"

declare const testCache: EmotionCache
declare const testRegisteredCache: RegisteredCache

const oldEmotionCache: OldEmotionCache = testCache
const oldRegisteredCache: OldRegisteredCache = testRegisteredCache

getRegisteredStyles(testRegisteredCache, [], 'abc')
getRegisteredStyles(testRegisteredCache, [], 'abc def')
getRegisteredStyles(testRegisteredCache, [], 'dead end')
getRegisteredStyles(testRegisteredCache, ['color: red;'], 'black parade')
// @ts-expect-error
getRegisteredStyles()
// @ts-expect-error
getRegisteredStyles(testRegisteredCache)

insertStyles(
  testCache,
  {
    name: 'abc',
    styles: 'color: green;background: red;'
  },
  false
)
// @ts-expect-error
insertStyles()
// @ts-expect-error
insertStyles(testCache)
// @ts-expect-error
insertStyles(testCache, {})
// @ts-expect-error
insertStyles(testCache, {
  name: 'abc',
  styles: 'font-size: 18px;'
})

const test0: boolean = isBrowser
// @ts-expect-error
const test1: number = isBrowser
