// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 2.8

import { RegisteredCache, SerializedStyles } from '@emotion/utils'
import * as CSS from 'csstype'

export { RegisteredCache, SerializedStyles }

export type CSSProperties = CSS.PropertiesFallback<number | string>
export type CSSPropertiesWithMultiValues = {
  [K in keyof CSSProperties]:
    CSSProperties[K] extends string
      ? CSSProperties[K] | Array<CSSProperties[K]>
      : CSSProperties[K]
}

export type CSSPseudos = { [K in CSS.Pseudos]?: CSSObject }

export interface ArrayCSSInterpolation extends Array<CSSInterpolation> {}

export type InterpolationPrimitive =
  | null
  | undefined
  | boolean
  | number
  | string
  | ComponentSelector
  | Keyframes
  | SerializedStyles
  | CSSObject

export type CSSInterpolation = InterpolationPrimitive | ArrayCSSInterpolation

export interface CSSOthersObject {
  [propertiesName: string]: CSSInterpolation
}

export interface CSSObject
  extends CSSPropertiesWithMultiValues,
    CSSPseudos,
    CSSOthersObject {}

export interface ComponentSelector {
  __emotion_styles: any
}

export type Keyframes = {
  name: string
  styles: string
  anim: number
  toString: () => string
} & string

export interface ArrayInterpolation<Props>
  extends Array<Interpolation<Props>> {}

export interface FunctionInterpolation<Props> {
  (props: Props): Interpolation<Props>
}

export type Interpolation<Props> =
  | InterpolationPrimitive
  | ArrayInterpolation<Props>
  | FunctionInterpolation<Props>

export function serializeStyles<Props>(
  args: Array<TemplateStringsArray | Interpolation<Props>>,
  registered: RegisteredCache,
  props?: Props
): SerializedStyles
