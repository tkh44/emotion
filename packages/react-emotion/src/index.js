/* global codegen */
import { createElement, Component } from 'react'
import { memoize } from 'emotion-utils'
import { css, getRegisteredStyles } from 'emotion'
import { channel, contextTypes } from '../../emotion-theming/src/utils'

export * from 'emotion'

function setTheme(theme) {
  this.setState({ theme })
}

function componentWillMount() {
  if (this.context[channel] !== undefined) {
    this.unsubscribe = this.context[channel].subscribe(setTheme.bind(this))
  }
}
function componentWillUnmount() {
  if (this.unsubscribe !== undefined) {
    this.context[channel].unsubscribe(this.unsubscribe)
  }
}

const reactPropsRegex = codegen.require('./props')
const testOmitPropsOnStringTag = memoize(key => reactPropsRegex.test(key))
const testOmitPropsOnComponent = key => key !== 'theme' && key !== 'innerRef'
const testAlwaysTrue = () => true

const omitAssign = function(testFn, target) {
  let i = 2
  let length = arguments.length
  for (; i < length; i++) {
    let source = arguments[i]
    let key
    for (key in source) {
      if (testFn(key)) {
        target[key] = source[key]
      }
    }
  }
  return target
}

const createStyled = (tag, options: { e: string, label: string }) => {
  if (process.env.NODE_ENV !== 'production') {
    if (tag === undefined) {
      throw new Error(
        'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.'
      )
    }
  }
  let staticClassName
  let identifierName
  if (options !== undefined) {
    staticClassName = options.e
    identifierName = options.label
  }
  const isReal = tag.__emotion_real === tag
  const baseTag =
    staticClassName === undefined ? (isReal && tag.__emotion_base) || tag : tag

  const omitFn =
    typeof baseTag === 'string' &&
    baseTag.charAt(0) === baseTag.charAt(0).toLowerCase()
      ? testOmitPropsOnStringTag
      : testOmitPropsOnComponent

  return (strings, ...interpolations) => {
    let styles = (isReal && tag.__emotion_styles) || []
    if (identifierName !== undefined) {
      styles = styles.concat(`label:${identifierName};`)
    }
    if (staticClassName === undefined) {
      if (strings == null || strings.raw === undefined) {
        styles = styles.concat(strings, interpolations)
      } else {
        styles = interpolations.reduce(
          (array, interp, i) => array.concat(interp, strings[i + 1]),
          styles.concat(strings[0])
        )
      }
    }

    class Styled extends Component {
      render() {
        const { props, state } = this
        this.mergedProps = omitAssign(testAlwaysTrue, {}, props, {
          theme: (state && state.theme) || props.theme || {}
        })

        let className = ''
        let classInterpolations = []

        if (props.className) {
          if (staticClassName === undefined) {
            className += getRegisteredStyles(
              classInterpolations,
              props.className
            )
          } else {
            className += `${props.className} `
          }
        }
        if (staticClassName === undefined) {
          className += css.apply(this, styles.concat(classInterpolations))
        } else {
          className += staticClassName
        }

        return createElement(
          baseTag,
          omitAssign(omitFn, {}, props, { className, ref: props.innerRef })
        )
      }
    }
    Styled.prototype.componentWillMount = componentWillMount
    Styled.prototype.componentWillUnmount = componentWillUnmount
    Styled.displayName =
      identifierName !== undefined
        ? identifierName
        : `Styled(${typeof baseTag === 'string'
            ? baseTag
            : baseTag.displayName || baseTag.name || 'Component'})`

    Styled.contextTypes = contextTypes
    Styled.__emotion_styles = styles
    Styled.__emotion_base = baseTag
    Styled.__emotion_real = Styled

    Styled.withComponent = nextTag => {
      return createStyled(nextTag, options)(styles)
    }

    return Styled
  }
}

export default createStyled
