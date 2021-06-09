// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 3.7

/// <reference types="node" />
import { EmotionCache } from '@emotion/utils'

export interface EmotionCritical {
  html: string
  ids: Array<string>
  css: string
}

export interface EmotionCriticalToChunks {
  html: string
  styles: Array<{ key: string; ids: Array<string>; css: string }>
}

export interface EmotionServer {
  extractCritical(html: string): EmotionCritical
  extractCriticalToChunks(html: string): EmotionCriticalToChunks
  renderStylesToString(html: string): string
  renderStylesToNodeStream(): NodeJS.ReadWriteStream
  constructStyleTagsFromChunks(criticalData: EmotionCriticalToChunks): string
}

export default function createEmotionServer(cache: EmotionCache): EmotionServer
