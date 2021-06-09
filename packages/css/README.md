# @emotion/css

The [@emotion/css](https://www.npmjs.com/package/@emotion/css) package is framework agnostic and the simplest way to use Emotion.

## Table of Contents

- [Quick Start](#quick-start)
- [API](#api)
  - [Generate Class Names — `css`](#css)
  - [Global Styles — `injectGlobal`](#global-styles)
  - [Animation Keyframes — `keyframes`](#animation-keyframes)
  - [Composing Class Names — `cx`](#cx)
- [Custom Instances](#custom-instances)
- [Server Side Rendering](#server-side-rendering)
- [Babel Plugin](https://emotion.sh/docs/@emotion/babel-plugin)

## Quick Start

Get up and running with a single import.

```bash
npm install --save @emotion/css
```

```javascript
import { css } from '@emotion/css'

const app = document.getElementById('root')
const myStyle = css`
  color: rebeccapurple;
`
app.classList.add(myStyle)
```

## API

### css

The `css` function accepts styles as a template literal, object, or array of objects and returns a class name. It is the foundation of emotion.

#### String Styles

```jsx
// @live
import { css } from '@emotion/css'

const color = 'darkgreen'

render(
  <div
    className={css`
      background-color: hotpink;
      &:hover {
        color: ${color};
      }
    `}
  >
    This has a hotpink background.
  </div>
)
```

#### Object Styles

```jsx
// @live
import { css } from '@emotion/css'

const color = 'darkgreen'

render(
  <div
    className={css({
      backgroundColor: 'hotpink',
      '&:hover': {
        color
      }
    })}
  >
    This has a hotpink background.
  </div>
)
```

#### Array of Object Styles

```jsx
// @live
import { css } from '@emotion/css'

const color = 'darkgreen'
const isDanger = true

render(
  <div
    className={css([
      {
        backgroundColor: 'hotpink',
        '&:hover': {
          color
        }
      },
      isDanger && {
        color: 'red'
      }
    ])}
  >
    This has a hotpink background.
  </div>
)
```

### Global Styles

`injectGlobal` injects styles into the global scope and is useful for applications such as css resets or font faces.

```jsx
import { injectGlobal } from '@emotion/css'

injectGlobal`
  * {
    box-sizing: border-box;
  }
  @font-face {
    font-family: 'Patrick Hand SC';
    font-style: normal;
    font-weight: 400;
    src: local('Patrick Hand SC'),
      local('PatrickHandSC-Regular'),
      url(https://fonts.gstatic.com/s/patrickhandsc/v4/OYFWCgfCR-7uHIovjUZXsZ71Uis0Qeb9Gqo8IZV7ckE.woff2)
        format('woff2');
    unicode-range: U+0100-024f, U+1-1eff,
      U+20a0-20ab, U+20ad-20cf, U+2c60-2c7f,
      U+A720-A7FF;
  }
`
```

### Animation Keyframes

`keyframes` generates a unique animation name that can be used to animate elements with CSS animations.

**String Styles**

```jsx
// @live
import { css, keyframes } from '@emotion/css'

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`

render(
  <img
    className={css`
      width: 96px;
      height: 96px;
      border-radius: 50%;
      animation: ${bounce} 1s ease infinite;
      transform-origin: center bottom;
    `}
    src={logoUrl}
  />
)
```

**Object Styles**

```jsx
// @live
import { css, keyframes } from '@emotion/css'

const bounce = keyframes({
  'from, 20%, 53%, 80%, to': {
    transform: 'translate3d(0,0,0)'
  },
  '40%, 43%': {
    transform: 'translate3d(0, -30px, 0)'
  },
  '70%': {
    transform: 'translate3d(0, -15px, 0)'
  },
  '90%': {
    transform: 'translate3d(0, -4px, 0)'
  }
})

render(
  <img
    src={logoUrl}
    className={css({
      width: 96,
      height: 96,
      borderRadius: '50%',
      animation: `${bounce} 1s ease infinite`,
      transformOrigin: 'center bottom'
    })}
  />
)
```

### cx

`cx` is emotion's version of the popular [`classnames` library](https://github.com/JedWatson/classnames). The key advantage of `cx` is that it detects emotion generated class names ensuring styles are overwritten in the correct order. Emotion generated styles are applied from left to right. Subsequent styles overwrite property values of previous styles.

**Combining class names**

```jsx
import { cx, css } from '@emotion/css'

const cls1 = css`
  font-size: 20px;
  background: green;
`
const cls2 = css`
  font-size: 20px;
  background: blue;
`

<div className={cx(cls1, cls2)} />
```

**Conditional class names**

```jsx
const cls1 = css`
  font-size: 20px;
  background: green;
`
const cls2 = css`
  font-size: 20px;
  background: blue;
`

const foo = true
const bar = false


<div
  className={cx(
    { [cls1]: foo },
    { [cls2]: bar }
  )}
/>
```

**Using class names from other sources**

```jsx
const cls1 = css`
  font-size: 20px;
  background: green;
`

<div
  className={cx(cls1, 'profile')}
/>
```

## Custom Instances

With `@emotion/css/create-instance`, you can provide custom options to Emotion's cache.

The main `@emotion/css` entrypoint can be thought of as a call to `@emotion/css/create-instance` with sensible defaults for most applications.

```javascript
import createEmotion from '@emotion/css/create-instance'

export const {
  flush,
  hydrate,
  cx,
  merge,
  getRegisteredStyles,
  injectGlobal,
  keyframes,
  css,
  sheet,
  cache
} = createEmotion()
```

### Upside

- Calling it directly will allow for some low level customization.

- Create custom names for emotion APIs to help with migration from other, similar libraries.

- Could set custom `key` to something other than `css`

### Downside

- Introduces some amount of complexity to your application that can vary depending on developer experience.

- Required to keep up with changes in the repo and API at a lower level than if using `@emotion/css` directly

### Primary use cases

- Using emotion in embedded contexts such as an `<iframe/>`

- Setting a [nonce](/packages/cache#nonce-string) on any `<style/>` tag emotion creates for security purposes

- Use emotion with a container different than `document.head` for style elements

- Using emotion with custom stylis plugins

## Server Side Rendering

### Advanced Approach

```js
import http from "http"
import { extractCritical } from "@emotion/server"
import { css } from "@emotion/css"

const style = css({
  color: "pink",
  padding: 0
})

const element = `
<p class="${style}">Hello World!</p>
`

let critical = extractCritical(element)

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" })
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>My site</title>
            <style data-emotion="${critical.ids.join(" ")}">${critical.css}</style>
        </head>
        <body>
            <div id="root">${critical.html}</div>
        </body>
      </html>
    `)
  })
  .listen(8080)
```

## Multiple instances in a single app example

```jsx
import createEmotion from '@emotion/css/create-instance'

export const {
  flush,
  hydrate,
  cx,
  merge,
  getRegisteredStyles,
  injectGlobal,
  keyframes,
  css,
  sheet,
  cache
} = createEmotion({
  // The key option is required when there will be multiple instances in a single app
  key: 'some-key'
})
```

## Options

`createEmotion` accepts the same options as [createCache](/packages/cache#options) from `@emotion/cache`.
