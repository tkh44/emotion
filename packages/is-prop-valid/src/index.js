// @flow
import memoize from '@emotion/memoize'

declare var codegen: { require: string => string }

const reactProps = JSON.parse(codegen.require('./props'))
const reactPropsRegex = /^(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*)$/

const isPropValid = /* #__PURE__ */ memoize(prop => {
  const chars =
    prop.charCodeAt(0) === 111 /* o */ &&
    prop.charCodeAt(1) === 110 /* n */ &&
    prop.charCodeAt(2) < 91 /* Z+1 */

  const inProps = reactProps[prop] === true
  const inRegex = reactPropsRegex.test(prop)

  return chars || inProps || inRegex
})

export default isPropValid
