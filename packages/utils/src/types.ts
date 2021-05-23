import type { StyleSheet } from '@emotion/sheet'

export type RegisteredCache = Record<string, string>

export type Interpolation = any

export type SerializedStyles = {
  name: string,
  styles: string,
  map?: string,
  next?: SerializedStyles
}

export type EmotionCache = {
  inserted: Record<string, string | boolean>,
  registered: RegisteredCache,
  sheet: StyleSheet,
  key: string,
  compat?: true,
  nonce?: string,
  insert: (
    selector: string,
    serialized: SerializedStyles,
    sheet: StyleSheet,
    shouldCache: boolean
  ) => string | void
}
