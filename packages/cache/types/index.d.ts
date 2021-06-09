// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 3.7
import { EmotionCache } from '@emotion/utils'

export { EmotionCache }

export interface StylisElement {
  type: string
  value: string
  props: Array<string>
  root: StylisElement | null
  children: Array<StylisElement>
  line: number
  column: number
  length: number
  return: string
}
export type StylisPluginCallback = (
  element: StylisElement,
  index: number,
  children: Array<StylisElement>,
  callback: StylisPluginCallback
) => string | undefined

export type StylisPlugin = (
  element: StylisElement,
  index: number,
  children: Array<StylisElement>,
  callback: StylisPluginCallback
) => string | undefined

export interface Options {
  nonce?: string
  stylisPlugins?: Array<StylisPlugin>
  key: string
  container?: HTMLElement
  speedy?: boolean
  prepend?: boolean
}

export default function createCache(options: Options): EmotionCache
