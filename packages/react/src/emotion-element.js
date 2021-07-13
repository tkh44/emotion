// @flow
import * as React from 'react'
import { withEmotionCache } from './context'
import { ThemeContext } from './theming'
import { getRegisteredStyles, insertStyles } from '@emotion/utils'
import { hasOwnProperty, isBrowser } from './utils'
import { serializeStyles } from '@emotion/serialize'

// those identifiers come from error stacks, so they have to be valid JS identifiers
// thus we only need to replace what is a valid character for JS, but not for CSS
const sanitizeIdentifier = (identifier: string) =>
  identifier.replace(/\$/g, '-')

let typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__'

let labelPropName = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__'

export const createEmotionProps = (type: React.ElementType, props: Object) => {
  if (
    process.env.NODE_ENV !== 'production' &&
    typeof props.css === 'string' &&
    // check if there is a css declaration
    props.css.indexOf(':') !== -1
  ) {
    throw new Error(
      `Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css\`${props.css}\``
    )
  }

  let newProps: any = {}

  for (let key in props) {
    if (hasOwnProperty.call(props, key)) {
      newProps[key] = props[key]
    }
  }

  newProps[typePropName] = type

  if (process.env.NODE_ENV !== 'production') {
    const error = new Error()
    if (error.stack) {
      // chrome
      let match = error.stack.match(
        /at (?:Object\.|Module\.|)(?:jsx|createEmotionProps).*\n\s+at (?:Object\.|)([A-Z][A-Za-z0-9$]+) /
      )
      if (!match) {
        // safari and firefox
        match = error.stack.match(/.*\n([A-Z][A-Za-z0-9$]+)@/)
      }
      if (match) {
        newProps[labelPropName] = sanitizeIdentifier(match[1])
      }
    }
  }

  return newProps
}

let Emotion = /* #__PURE__ */ withEmotionCache<any, any>(
  (props, cache, ref) => {
    let cssProp = props.css

    // so that using `css` from `emotion` and passing the result to the css prop works
    // not passing the registered cache to serializeStyles because it would
    // make certain babel optimisations not possible
    if (
      typeof cssProp === 'string' &&
      cache.registered[cssProp] !== undefined
    ) {
      cssProp = cache.registered[cssProp]
    }

    let type = props[typePropName]
    let registeredStyles = [cssProp]
    let className = ''

    if (typeof props.className === 'string') {
      className = getRegisteredStyles(
        cache.registered,
        registeredStyles,
        props.className
      )
    } else if (props.className != null) {
      className = `${props.className} `
    }

    let serialized = serializeStyles(
      registeredStyles,
      undefined,
      React.useContext(ThemeContext)
    )

    if (
      process.env.NODE_ENV !== 'production' &&
      serialized.name.indexOf('-') === -1
    ) {
      let labelFromStack = props[labelPropName]
      if (labelFromStack) {
        serialized = serializeStyles([
          serialized,
          'label:' + labelFromStack + ';'
        ])
      }
    }
    const rules = insertStyles(cache, serialized, typeof type === 'string')
    className += `${cache.key}-${serialized.name}`

    const newProps = {}
    for (let key in props) {
      if (
        hasOwnProperty.call(props, key) &&
        key !== 'css' &&
        key !== typePropName &&
        (process.env.NODE_ENV === 'production' || key !== labelPropName)
      ) {
        newProps[key] = props[key]
      }
    }
    newProps.ref = ref
    newProps.className = className

    const ele = React.createElement(type, newProps)
    if (!isBrowser && rules !== undefined) {
      let serializedNames = serialized.name
      let next = serialized.next
      while (next !== undefined) {
        serializedNames += ' ' + next.name
        next = next.next
      }
      return (
        <>
          <style
            {...{
              [`data-emotion`]: `${cache.key} ${serializedNames}`,
              dangerouslySetInnerHTML: { __html: rules },
              nonce: cache.sheet.nonce
            }}
          />
          {ele}
        </>
      )
    }
    return ele
  }
)

if (process.env.NODE_ENV !== 'production') {
  Emotion.displayName = 'EmotionCssPropInternal'
}

export default Emotion
