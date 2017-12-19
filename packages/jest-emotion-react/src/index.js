// @flow
import * as css from 'css'
import {
  replaceClassNames,
  type ClassNameReplacer
} from './replace-class-names'
import type { Emotion } from 'create-emotion'

type Options = {
  classNameReplacer: ClassNameReplacer
}

function getNodes(node, nodes = []) {
  if (node.children) {
    node.children.forEach(child => getNodes(child, nodes))
  }

  if (typeof node === 'object') {
    nodes.push(node)
  }

  return nodes
}

function markNodes(nodes) {
  nodes.forEach(node => {
    node.withStyles = true
  })
}

function getSelectors(nodes) {
  return nodes.reduce(
    (selectors, node) => getSelectorsFromProps(selectors, node.props),
    []
  )
}

function getSelectorsFromProps(selectors, props) {
  const className = props.className || props.class
  if (className) {
    selectors = selectors.concat(className.split(' ').map(cn => `.${cn}`))
  }
  return selectors
}

function filterChildSelector(baseSelector) {
  if (baseSelector.slice(-1) === '>') {
    return baseSelector.slice(0, -1)
  }
  return baseSelector
}

function createSerializer(
  emotion: Emotion,
  { classNameReplacer }: Options = {}
) {
  // in case we add a key option
  const key = 'css'
  function test(val: *) {
    return (
      val && !val.withStyles && val.$$typeof === Symbol.for('react.test.json')
    )
  }

  function print(val: *, printer: Function) {
    const nodes = getNodes(val)
    markNodes(nodes)
    const selectors = getSelectors(nodes)
    const styles = getStyles(selectors)
    const printedVal = printer(val)
    if (styles) {
      return replaceClassNames(
        selectors,
        styles,
        printedVal,
        key,
        classNameReplacer
      )
    } else {
      return printedVal
    }
  }

  function getStyles(nodeSelectors) {
    const styles = Object.keys(
      emotion.caches.inserted
    ).reduce((style, current) => {
      if (emotion.caches.inserted[current] === true) {
        return style
      }
      return style + emotion.caches.inserted[current]
    }, '')
    let ast
    try {
      ast = css.parse(styles)
    } catch (e) {
      console.error(e)
      throw new Error(
        `There was an error parsing css in jest-emotion-react: "${styles}"`
      )
    }
    ast.stylesheet.rules = ast.stylesheet.rules.reduce(reduceRules, [])

    const ret = css.stringify(ast)
    return ret

    function reduceRules(rules, rule) {
      let shouldIncludeRule = false
      if (rule.type === 'rule') {
        shouldIncludeRule = rule.selectors.some(selector => {
          const baseSelector = filterChildSelector(
            selector.split(/:| |\./).filter(s => !!s)[0]
          )
          return nodeSelectors.some(
            sel => sel === baseSelector || sel === `.${baseSelector}`
          )
        })
      }
      if (rule.type === 'media' || rule.type === 'supports') {
        rule.rules = rule.rules.reduce(reduceRules, [])

        if (rule.rules.length) {
          shouldIncludeRule = true
        }
      }
      return shouldIncludeRule ? rules.concat(rule) : rules
    }
  }

  return { test, print }
}

module.exports = createSerializer
