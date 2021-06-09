// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 3.7

export interface Options {
  nonce?: string
  key: string
  container: HTMLElement
  speedy?: boolean
  prepend?: boolean
}

export class StyleSheet {
  isSpeedy: boolean
  ctr: number
  tags: Array<HTMLStyleElement>
  container: HTMLElement
  key: string
  nonce?: string
  before?: Element | null
  constructor(options?: Options)
  insert(rule: string): void
  flush(): void
  hydrate(nodes: Array<HTMLStyleElement>): void
}
