// @flow
import { type EmotionCache } from '@emotion/utils'
import * as React from 'react'
import { useContext, forwardRef } from 'react'
import createCache from '@emotion/cache'
import { isBrowser } from './utils'

export let EmotionCacheContext: React.Context<EmotionCache | null> =
  /* #__PURE__ */ React.createContext(
    // we're doing this to avoid preconstruct's dead code elimination in this one case
    // because this module is primarily intended for the browser and node
    // but it's also required in react native and similar environments sometimes
    // and we could have a special build just for that
    // but this is much easier and the native packages
    // might use a different theme context in the future anyway
    typeof HTMLElement !== 'undefined'
      ? /* #__PURE__ */ createCache({ key: 'css' })
      : null
  )

export let CacheProvider = EmotionCacheContext.Provider

let withEmotionCache = function withEmotionCache<Props, Ref: React.Ref<*>>(
  func: (props: Props, cache: EmotionCache, ref: Ref) => React.Node
): React.AbstractComponent<Props> {
  // $FlowFixMe
  return forwardRef((props: Props, ref: Ref) => {
    // the cache will never be null in the browser
    let cache = ((useContext(EmotionCacheContext): any): EmotionCache)

    return func(props, cache, ref)
  })
}

if (!isBrowser) {
  withEmotionCache = function withEmotionCache<Props>(
    func: (props: Props, cache: EmotionCache) => React.Node
  ): React.StatelessFunctionalComponent<Props> {
    return (props: Props) => {
      let cache = useContext(EmotionCacheContext)
      if (cache === null) {
        // yes, we're potentially creating this on every render
        // it doesn't actually matter though since it's only on the server
        // so there will only every be a single render
        // that could change in the future because of suspense and etc. but for now,
        // this works and i don't want to optimise for a future thing that we aren't sure about
        cache = createCache({ key: 'css' })
        return (
          <EmotionCacheContext.Provider value={cache}>
            {func(props, cache)}
          </EmotionCacheContext.Provider>
        )
      } else {
        return func(props, cache)
      }
    }
  }
}

export { withEmotionCache }
