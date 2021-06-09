import * as React from 'react'
import { CSSInterpolation } from '@emotion/serialize'

type CreateStyledComponent = (
  ...styles: any
) => React.FunctionComponent<any> & {
  withComponent: (component: any) => React.FunctionComponent<any>
}

type BaseStyled = (tag: React.ElementType) => CreateStyledComponent

type Styled = BaseStyled & {
  View: CreateStyledComponent
  Text: CreateStyledComponent
  Image: CreateStyledComponent
}

interface ICss {
  (template: TemplateStringsArray, ...args: Array<CSSInterpolation>): {
    [key: string]: any
  }
  (...args: Array<CSSInterpolation>): { [key: string]: any }
}

export type css = ICss

declare const styled: Styled
export default styled
