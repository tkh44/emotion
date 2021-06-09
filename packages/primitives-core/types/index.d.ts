import * as React from 'react'
import { CSSInterpolation } from '@emotion/serialize'

interface CreateStyledOptions {
  getShouldForwardProp: (cmp: React.ElementType) => (prop: string) => boolean
}

interface StyledOptions {
  shouldForwardProp?: (prop: string) => boolean
}

type CreateStyledComponent = (
  ...styles: any
) => React.FunctionComponent<any> & {
  withComponent: (component: any) => React.FunctionComponent<any>
}

type BaseStyled = (
  tag: React.ElementType,
  options?: StyledOptions
) => CreateStyledComponent

interface ICss {
  (template: TemplateStringsArray, ...args: Array<CSSInterpolation>): {
    [key: string]: any
  }
  (...args: Array<CSSInterpolation>): { [key: string]: any }
}

/**
 * createStyled also accepts a platform specific `StyleSheet` method (e.g. `import { StyleSheet } from 'react-native'`)
 * for creating styles. It returns a function to which primitives can be assigned for example - `View`, `Text`, and it returns a styled component.
 *
 * @param StyleSheet
 * @param createStyledOptions
 */
export function createStyled(
  StyleSheet: any,
  createStyledOptions?: CreateStyledOptions
): BaseStyled

/**
 * createCss accepts a platform specific `StyleSheet` method（e.g. `import { StyleSheet } from 'react-native'`)
 * for creating styles, and returns a function which accepts styles via string template literal and object literal notation.
 *
 * @param StyleSheet
 */
export function createCss(StyleSheet: any): ICss
