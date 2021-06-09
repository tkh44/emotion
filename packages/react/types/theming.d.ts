// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 3.7

import * as React from 'react'
import { Theme } from '@emotion/react'
import { DistributiveOmit, PropsOf } from './helper'

export interface ThemeProviderProps {
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme)
  children?: React.ReactNode
}

export interface ThemeProvider {
  (props: ThemeProviderProps): React.ReactElement
}

export type withTheme = <
  C extends React.ComponentType<React.ComponentProps<C>>
>(
  component: C
) => React.FC<DistributiveOmit<PropsOf<C>, 'theme'> & { theme?: Theme }>

export function useTheme(): Theme

export const ThemeProvider: ThemeProvider

export const withTheme: withTheme

export type WithTheme<P, T> = P extends { theme: infer Theme }
  ? P & { theme: Exclude<Theme, undefined> }
  : P & { theme: T }
