// @flow
import * as React from 'react'
import { withEmotionCache } from './context'
import { ThemeContext } from './theming'
import { insertStyles } from '@emotion/utils'
import { isBrowser } from './utils'

import { StyleSheet } from '@emotion/sheet'
import { serializeStyles } from '@emotion/serialize'

type Styles = Object | Array<Object>

type GlobalProps = {
  +styles: Styles | (Object => Styles)
}

let warnedAboutCssPropForGlobal = false

// maintain place over rerenders.
// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag

export let Global: React.AbstractComponent<
  GlobalProps
> = /* #__PURE__ */ withEmotionCache((props: GlobalProps, cache) => {
  if (
    process.env.NODE_ENV !== 'production' &&
    !warnedAboutCssPropForGlobal && // check for className as well since the user is
    // probably using the custom createElement which
    // means it will be turned into a className prop
    // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
    (props.className || props.css)
  ) {
    console.error(
      "It looks like you're using the css prop on Global, did you mean to use the styles prop instead?"
    )
    warnedAboutCssPropForGlobal = true
  }
  let styles = props.styles

  let serialized = serializeStyles(
    [styles],
    undefined,
    typeof styles === 'function' || Array.isArray(styles)
      ? React.useContext(ThemeContext)
      : undefined
  )

  if (!isBrowser) {
    let serializedNames = serialized.name
    let serializedStyles = serialized.styles
    let next = serialized.next
    while (next !== undefined) {
      serializedNames += ' ' + next.name
      serializedStyles += next.styles
      next = next.next
    }

    let shouldCache = cache.compat === true

    let rules = cache.insert(
      ``,
      { name: serializedNames, styles: serializedStyles },
      cache.sheet,
      shouldCache
    )

    if (shouldCache) {
      return null
    }

    return (
      <style
        {...{
          [`data-emotion`]: `${cache.key}-global ${serializedNames}`,
          dangerouslySetInnerHTML: { __html: rules },
          nonce: cache.sheet.nonce
        }}
      />
    )
  }

  // yes, i know this hook is used conditionally
  // but it is based on a constant that will never change at runtime
  // it's effectively like having two implementations and switching them out
  // so it's not actually breaking anything
  React.useLayoutEffect(
    () => {
      const key = `${cache.key}-global`

      let sheet = new StyleSheet({
        key,
        nonce: cache.sheet.nonce,
        container: cache.sheet.container,
        speedy: cache.sheet.isSpeedy
      })
      // $FlowFixMe
      let node: HTMLStyleElement | null = document.querySelector(
        `style[data-emotion="${key} ${serialized.name}"]`
      )
      if (cache.sheet.tags.length) {
        sheet.before = cache.sheet.tags[0]
      }
      if (node !== null) {
        // clear the hash so this node won't be recognizable as rehydratable by other <Global/>s
        node.setAttribute('data-emotion', key)
        sheet.hydrate([node])
      } else {
        if (serialized.next !== undefined) {
          // insert keyframes
          insertStyles(cache, serialized.next, true)
        }
        cache.insert(``, serialized, sheet, false)
      }

      return () => {
        sheet.flush()
      }
    },
    [cache, serialized.name]
  )

  return null
})

if (process.env.NODE_ENV !== 'production') {
  Global.displayName = 'EmotionGlobal'
}
