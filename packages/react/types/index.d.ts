// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 3.7

import { EmotionCache } from '@emotion/cache'
import {
  ArrayInterpolation,
  ComponentSelector,
  CSSInterpolation,
  CSSObject,
  FunctionInterpolation,
  Interpolation,
  Keyframes,
  SerializedStyles
} from '@emotion/serialize'
import {
  ClassAttributes,
  Context,
  Provider,
  FC,
  ReactElement,
  ReactNode,
  Ref,
  createElement
} from 'react'
import { EmotionJSX } from './jsx-namespace'

export {
  ArrayInterpolation,
  ComponentSelector,
  CSSObject,
  EmotionCache,
  FunctionInterpolation,
  Interpolation,
  SerializedStyles
}

export * from './theming'
export * from './helper'

// tslint:disable-next-line: no-empty-interface
export interface Theme {}

export const ThemeContext: Context<object>
export const CacheProvider: Provider<EmotionCache>
export function withEmotionCache<Props, RefType = any>(
  func: (props: Props, context: EmotionCache, ref: Ref<RefType>) => ReactNode
): FC<Props & ClassAttributes<RefType>>

export function css(
  template: TemplateStringsArray,
  ...args: Array<CSSInterpolation>
): SerializedStyles
export function css(...args: Array<CSSInterpolation>): SerializedStyles

export interface GlobalProps {
  styles: Interpolation<Theme>
}

/**
 * @desc
 * JSX generic are supported only after TS@2.9
 */
export function Global(props: GlobalProps): ReactElement

export function keyframes(
  template: TemplateStringsArray,
  ...args: Array<CSSInterpolation>
): Keyframes
export function keyframes(...args: Array<CSSInterpolation>): Keyframes

export type ArrayClassNamesArg = Array<ClassNamesArg>
export type ClassNamesArg =
  | undefined
  | null
  | string
  | boolean
  | { [className: string]: boolean | null | undefined }
  | ArrayClassNamesArg

export interface ClassNamesContent {
  css(template: TemplateStringsArray, ...args: Array<CSSInterpolation>): string
  css(...args: Array<CSSInterpolation>): string
  cx(...args: Array<ClassNamesArg>): string
  theme: Theme
}
export interface ClassNamesProps {
  children(content: ClassNamesContent): ReactNode
}
/**
 * @desc
 * JSX generic are supported only after TS@2.9
 */
export function ClassNames(props: ClassNamesProps): ReactElement

export const jsx: typeof createElement
export namespace jsx {
  namespace JSX {
    interface Element extends EmotionJSX.Element {}
    interface ElementClass extends EmotionJSX.ElementClass {}
    interface ElementAttributesProperty
      extends EmotionJSX.ElementAttributesProperty {}
    interface ElementChildrenAttribute
      extends EmotionJSX.ElementChildrenAttribute {}
    type LibraryManagedAttributes<C, P> = EmotionJSX.LibraryManagedAttributes<
      C,
      P
    >
    interface IntrinsicAttributes extends EmotionJSX.IntrinsicAttributes {}
    interface IntrinsicClassAttributes<T>
      extends EmotionJSX.IntrinsicClassAttributes<T> {}
    type IntrinsicElements = EmotionJSX.IntrinsicElements
  }
}
