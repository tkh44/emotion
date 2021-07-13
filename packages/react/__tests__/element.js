// @flow
/** @jsx jsx */
import 'test-utils/dev-mode'
import { render } from 'react-dom'
import { jsx, css, CacheProvider, ThemeProvider } from '@emotion/react'
import createCache from '@emotion/cache'

// $FlowFixMe
console.error = jest.fn()

beforeEach(() => {
  // $FlowFixMe
  document.head.innerHTML = ''
  // $FlowFixMe
  document.body.innerHTML = `<div id="root"></div>`

  jest.clearAllMocks()
})

describe('EmotionElement', () => {
  test('no React hook order violations', () => {
    const theme = { color: 'blue' }
    const cache = createCache({ key: 'context' })

    // $FlowFixMe
    const Comp = ({ flag }) => (
      <ThemeProvider theme={theme}>
        <CacheProvider value={cache}>
          <div
            css={
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
})
