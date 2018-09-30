// @flow
import type { RegisteredCache, EmotionCache, SerializedStyles } from './types'

export const isBrowser = typeof document !== 'undefined'

export function getRegisteredStyles(
  registered: RegisteredCache,
  registeredStyles: string[],
  classNames: string
) {
  let rawClassName = ''

  classNames.split(' ').forEach(className => {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className])
    } else {
      rawClassName += `${className} `
    }
  })
  return rawClassName
}

export const insertStyles = (
  cache: EmotionCache,
  serialized: SerializedStyles,
  isStringTag: boolean
) => {
  let className = `${cache.key}-${serialized.name}`
  if (
    // we only need to add the styles to the registered cache if the
    // class name could be used further down
    // the tree but if it's a string tag, we know it won't
    // so we don't have to add it to registered cache.
    // this improves memory usage since we can avoid storing the whole style string
    (isStringTag === false ||
      // we need to always store it if we're in compat mode and
      // in node since emotion-server relies on whether a style is in
      // the registered cache to know whether a style is global or not
      // also, note that this check will be dead code eliminated in the browser
      (isBrowser === false && cache.compat !== undefined)) &&
    cache.registered[className] === undefined
  ) {
    cache.registered[className] = serialized.styles
  }
  if (cache.inserted[serialized.name] === undefined) {
    let stylesForSSR = ''
    let current = serialized
    do {
      let rules = cache.stylis(`.${className}`, current.styles)
      cache.inserted[current.name] = true

      if (process.env.NODE_ENV !== 'production' && current.map !== undefined) {
        for (let i = 0; i < rules.length; i++) {
          rules[i] += current.map
        }
      }
      if (isBrowser) {
        rules.forEach(cache.sheet.insert, cache.sheet)
      } else {
        let joinedRules = rules.join('')
        if (cache.compat === undefined) {
          // in regular mode, we don't set the styles on the inserted cache
          // since we don't need to and that would be wasting memory
          // we return them so that they are rendered in a style tag
          stylesForSSR += joinedRules
        } else {
          // in compat mode, we put the styles on the inserted cache so
          // that emotion-server can pull out the styles
          cache.inserted[current.name] = joinedRules
        }
      }
      current = current.next
    } while (current !== undefined)
    if (!isBrowser && stylesForSSR.length !== 0) {
      return stylesForSSR
    }
  }
}

export * from './types'
