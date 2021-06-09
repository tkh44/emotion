// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 2.8

import { EmotionCache, Options } from '@emotion/cache'
import { CSSInterpolation } from '@emotion/serialize'
import { StyleSheet } from '@emotion/sheet'

export {
  CSSInterpolation,
  ArrayCSSInterpolation,
  ComponentSelector,
  CSSObject
} from '@emotion/serialize'

export { EmotionCache, Options }

export interface ArrayClassNamesArg extends ReadonlyArray<ClassNamesArg> {}
export type ClassNamesArg =
  | undefined
  | null
  | string
  | boolean
  | { [className: string]: boolean | null | undefined }
  | ArrayClassNamesArg

export interface CSSStyleSheet extends StyleSheet {
  speedy(value: boolean): void
}

export interface Emotion {
  css(template: TemplateStringsArray, ...args: Array<CSSInterpolation>): string
  css(...args: Array<CSSInterpolation>): string
  cx(...classNames: Array<ClassNamesArg>): string
  flush(): void
  hydrate(ids: ReadonlyArray<string>): void
  injectGlobal(
    template: TemplateStringsArray,
    ...args: Array<CSSInterpolation>
  ): void
  injectGlobal(...args: Array<CSSInterpolation>): void
  keyframes(
    template: TemplateStringsArray,
    ...args: Array<CSSInterpolation>
  ): string
  keyframes(...args: Array<CSSInterpolation>): string
  sheet: CSSStyleSheet
  cache: EmotionCache
  merge(className: string): string
  getRegisteredStyles(
    registeredStyles: ReadonlyArray<string>,
    className: string
  ): string
}

export default function createEmotion(options?: Options): Emotion
