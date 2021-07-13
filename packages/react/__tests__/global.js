// @flow
import 'test-utils/dev-mode'
import * as React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import {
  Global,
  keyframes,
  css,
  CacheProvider,
  ThemeProvider
} from '@emotion/react'
import createCache from '@emotion/cache'

// $FlowFixMe
console.error = jest.fn()

beforeEach(() => {
  // $FlowFixMe
  document.head.innerHTML = ''
  // $FlowFixMe
  document.body.innerHTML = `<div id="root"></div>`

  jest.resetAllMocks()
})

test('basic', () => {
  render(
    <CacheProvider value={createCache({ key: 'css' })}>
      <Global
        styles={[
          css`
            @import url('something.com/file.css');
          `,
          {
            html: {
              backgroundColor: 'hotpink'
            },
            h1: {
              animation: `${keyframes({
                'from,to': {
                  color: 'green'
                },
                '50%': {
                  color: 'hotpink'
                }
              })} 1s`
            },
            '@font-face': {
              fontFamily: 'some-name'
            }
          }
        ]}
      />
    </CacheProvider>,
    // $FlowFixMe
    document.getElementById('root')
  )
  expect(document.head).toMatchSnapshot()
  expect(document.body).toMatchSnapshot()
  unmountComponentAtNode(document.getElementById('root'))
  expect(document.head).toMatchSnapshot()
  expect(document.body).toMatchSnapshot()
})

test('updating more than 1 global rule', () => {
  const cache = createCache({ key: 'global-multiple-rules' })
  const renderComponent = ({ background, color }) =>
    render(
      <CacheProvider value={cache}>
        <Global styles={{ body: { background }, div: { color } }} />
      </CacheProvider>,
      // $FlowFixMe
      document.getElementById('root')
    )

  renderComponent({ background: 'white', color: 'black' })
  expect(document.head).toMatchSnapshot()
  renderComponent({ background: 'gray', color: 'white' })
  expect(document.head).toMatchSnapshot()
})

test('no React hook order violations', () => {
  const theme = { color: 'blue' }
  const cache = createCache({ key: 'context' })

  // $FlowFixMe
  const Comp = ({ flag }) => (
    <ThemeProvider theme={theme}>
      <CacheProvider value={cache}>
        <Global
          styles={
            flag &&
            (t => css`
              color: ${t.color};
            `)
          }
        />
      </CacheProvider>
    </ThemeProvider>
  )

  render(<Comp />, document.getElementById('root'))
  expect(console.error).not.toHaveBeenCalled()
  render(<Comp flag />, document.getElementById('root'))
  expect(console.error).not.toHaveBeenCalled()
})
