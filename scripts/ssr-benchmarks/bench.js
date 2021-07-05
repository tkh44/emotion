let React = require('react')
let styled = require('@emotion/styled').default
let { renderToString } = require('react-dom/server')
let Benchmark = require('benchmark')
let { jsx, css, CacheProvider, EmotionCacheContext } = require('@emotion/react')
let { createTriangle } = require('./triangle')
let { css: cssClassName } = require('@emotion/css')
let { renderStylesToString } = require('@emotion/server')
let createEmotionServer = require('create-emotion-server').default
let createCache = require('@emotion/cache').default
let { insertStyles } = require('@emotion/utils')

let Triangle = createTriangle(styled.div`
  position: absolute;
  cursor: pointer;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  border-top-width: 0;
  transform: translate(50%, 50%);
  margin-left: ${props => props.x + 'px'};
  margin-top: ${props => props.y + 'px'};
  border-right-width: ${props => props.size / 2 + 'px'};
  border-bottom-width: ${props => props.size / 2 + 'px'};
  border-left-width: ${props => props.size / 2 + 'px'};
  border-bottom-color: ${props => props.color};
`)

let CssPropTriangle = createTriangle(({ x, y, size, color, ...props }) => {
  return jsx('div', {
    css: css`
      position: absolute;
      cursor: pointer;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
      border-top-width: 0;
      transform: translate(50%, 50%);
      margin-left: ${x + 'px'};
      margin-top: ${y + 'px'};
      border-right-width: ${size / 2 + 'px'};
      border-bottom-width: ${size / 2 + 'px'};
      border-left-width: ${size / 2 + 'px'};
      border-bottom-color: ${color};
    `,
    ...props
  })
})

let CssFuncTriangle = createTriangle(({ x, y, size, color, ...props }) => {
  return React.createElement('div', {
    className: cssClassName`
      position: absolute;
      cursor: pointer;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
      border-top-width: 0;
      transform: translate(50%, 50%);
      margin-left: ${x + 'px'};
      margin-top: ${y + 'px'};
      border-right-width: ${size / 2 + 'px'};
      border-bottom-width: ${size / 2 + 'px'};
      border-left-width: ${size / 2 + 'px'};
      border-bottom-color: ${color};
    `,
    ...props
  })
})

let hasOwnProperty = Object.prototype.hasOwnProperty

let ExperimentTriangle = createTriangle(({ x, y, size, color, ...props }) => {
  let cache = EmotionCacheContext._currentValue

  let className = ''
  const serialized = css`
    position: absolute;
    cursor: pointer;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    border-top-width: 0;
    transform: translate(50%, 50%);
    margin-left: ${x + 'px'};
    margin-top: ${y + 'px'};
    border-right-width: ${size / 2 + 'px'};
    border-bottom-width: ${size / 2 + 'px'};
    border-left-width: ${size / 2 + 'px'};
    border-bottom-color: ${color};
  `
  const rules = insertStyles(cache, serialized, true)
  className += `${cache.key}-${serialized.name}`

  const newProps = {}
  for (let key in props) {
    if (hasOwnProperty.call(props, key)) {
      newProps[key] = props[key]
    }
  }

  newProps.className = className

  const ele = React.createElement('div', newProps)
  let serializedNames = serialized.name
  let next = serialized.next
  while (next !== undefined) {
    serializedNames += ' ' + next.name
    next = next.next
  }
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('style', {
      [`data-emotion-${cache.key}`]: serializedNames,
      dangerouslySetInnerHTML: { __html: rules },
      nonce: cache.sheet.nonce,
      key: 1
    }),
    ele
  )
})

const suite = new Benchmark.Suite('ssr', {
  onError: event => {
    console.log(event.target.error)
  },
  onStart: () => {
    console.log('\nStarting benchmarks...')
  }
})

suite
  .add('styled', () => {
    renderToString(React.createElement(Triangle, { s: 100, x: 0, y: 0 }))
  })
  .add('css prop', () => {
    renderToString(React.createElement(CssPropTriangle, { s: 100, x: 0, y: 0 }))
  })
  .add('css prop compat', () => {
    let cache = createCache()
    createEmotionServer(cache).renderStylesToString(
      renderToString(
        React.createElement(
          CacheProvider,
          { value: cache },
          React.createElement(CssPropTriangle, { s: 100, x: 0, y: 0 })
        )
      )
    )
  })
  .add('css func', () => {
    renderStylesToString(
      renderToString(
        React.createElement(CssFuncTriangle, { s: 100, x: 0, y: 0 })
      )
    )
  })
  .add('experiment', () => {
    let cache = createCache()
    renderToString(
      React.createElement(
        CacheProvider,
        { value: cache },
        React.createElement(ExperimentTriangle, { s: 100, x: 0, y: 0 })
      )
    )
  })
  .add('styled with random', () => {
    renderToString(
      React.createElement(Triangle, {
        s: 100,
        x: 0,
        y: 0,
        random: Math.random()
      })
    )
  })
  .add('css prop with random', () => {
    renderToString(
      React.createElement(CssPropTriangle, {
        s: 100,
        x: 0,
        y: 0,
        random: Math.random()
      })
    )
  })
  .add('css prop compat with random', () => {
    let cache = createCache()
    createEmotionServer(cache).renderStylesToString(
      renderToString(
        React.createElement(
          CacheProvider,
          { value: cache },
          React.createElement(CssPropTriangle, {
            s: 100,
            x: 0,
            y: 0,
            random: Math.random()
          })
        )
      )
    )
  })
  .add('css func with random', () => {
    renderStylesToString(
      renderToString(
        React.createElement(CssFuncTriangle, {
          s: 100,
          x: 0,
          y: 0,
          random: Math.random()
        })
      )
    )
  })
  .add('experiment with random', () => {
    let cache = createCache()
    renderToString(
      React.createElement(
        CacheProvider,
        { value: cache },
        React.createElement(ExperimentTriangle, {
          s: 100,
          x: 0,
          y: 0,
          random: Math.random()
        })
      )
    )
  })
  .on('cycle', event => {
    console.log(String(event.target))
  })
  .run()
