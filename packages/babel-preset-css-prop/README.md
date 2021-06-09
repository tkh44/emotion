# @emotion/babel-preset-css-prop

> A Babel preset to automatically enable Emotion's css prop when using the classic JSX runtime. If you want to use [the new JSX runtimes](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) please do not use this preset but rather just include our [`@emotion/babel-plugin`](https://github.com/emotion-js/emotion/tree/master/packages/babel-plugin) directly and follow instructions for configuring the new JSX runtimes [here](https://github.com/emotion-js/emotion/blob/master/docs/css-prop.mdx#babel-preset).

- [@emotion/babel-preset-css-prop](#emotionbabel-preset-css-prop)
  - [Install](#install)
  - [Usage](#usage)
    - [Via CLI](#via-cli)
    - [Via Node API](#via-node-api)
  - [Features](#features)
  - [Example](#example)
  - [Options](#options)
    - [Examples](#examples)

## Install

```bash
yarn add @emotion/babel-preset-css-prop
```

## Usage

> Note:
>
> This plugin is not compatible with `@babel/plugin-transform-react-inline-elements`. If you use both then your `css` prop styles won't be applied correctly.

**.babelrc**

```json
{
  "presets": ["@emotion/babel-preset-css-prop"]
}
```

`@emotion/babel-preset-css-prop` includes the emotion plugin. The `@emotion/babel-plugin` entry should be removed from your config and any options moved to the preset. If you use `@babel/preset-react` or `@babel/preset-typescript` ensure that `@emotion/babel-preset-css-prop` is inserted after them in your babel config.

```diff
{
+ "presets": [
+   [
+     "@emotion/babel-preset-css-prop",
+     {
+       "autoLabel": "dev-only",
+       "labelFormat": "[local]"
+     }
+   ]
+ ],
- "plugins": [
-   [
-     "@emotion",
-     {
-       "autoLabel": "dev-only",
-       "labelFormat": "[local]"
-     }
-   ]
- ]
}
```

See [the options documentation](#options) for more information.

### Via CLI

```bash
babel --presets @emotion/babel-preset-css-prop script.js
```

### Via Node API

```javascript
require('@babel/core').transform(code, {
  presets: ['@emotion/babel-preset-css-prop']
})
```

## Features

This preset enables the `css` prop for an entire project via a single entry to the babel configuration. After adding the preset, compiled JSX code will use Emotion's `jsx` function instead of `React.createElement`.

|        | Input                      | Output                                              |
| ------ | -------------------------- | --------------------------------------------------- |
| Before | `<img src="avatar.png" />` | `React.createElement('img', { src: 'avatar.png' })` |
| After  | `<img src="avatar.png" />` | `jsx('img', { src: 'avatar.png' })`                 |

`import { jsx } from '@emotion/react'` is automatically added to the top of files where required.

## Example

**In**

```javascript
const Link = props => (
  <a
    css={{
      color: 'hotpink',
      '&:hover': {
        color: 'darkorchid'
      }
    }}
    {...props}
  />
)
```

**Out**

```javascript
import { jsx as ___EmotionJSX } from '@emotion/react'

function _extends() {
  /* babel Object.assign polyfill */
}

var _ref =
  process.env.NODE_ENV === 'production'
    ? {
        name: '1fpk7dx-Link',
        styles: 'color:hotpink;&:hover{color:darkorchid;}label:Link;'
      }
    : {
        name: '1fpk7dx-Link',
        styles: 'color:hotpink;&:hover{color:darkorchid;}label:Link;',
        map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dG9tYXRpYy1pbXBvcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUkiLCJmaWxlIjoiYXV0b21hdGljLWltcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IExpbmsgPSBwcm9wcyA9PiAoXG4gIDxhXG4gICAgY3NzPXt7XG4gICAgICBjb2xvcjogJ2hvdHBpbmsnLFxuICAgICAgJyY6aG92ZXInOiB7XG4gICAgICAgIGNvbG9yOiAnZGFya29yY2hpZCdcbiAgICAgIH1cbiAgICB9fVxuICAgIHsuLi5wcm9wc31cbiAgLz5cbilcbiJdfQ== */'
      }

const Link = props =>
  ___EmotionJSX(
    'a',
    _extends(
      {
        css: _ref
      },
      props
    )
  )
```

_In addition to the custom JSX factory, this example includes `@emotion/babel-plugin` transforms that are enabled by default._

## Options

Options for both `@emotion/babel-plugin` and `@babel/plugin-transform-react-jsx` are supported and will be forwarded to their respective plugin.

> Refer to the plugin's documentation for full option documentation.
>
> - [`@emotion/babel-plugin`](https://emotion.sh/docs/babel)
>
> - [`@babel/plugin-transform-react-jsx`](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx)

### Examples

```json
{
  "presets": [
    [
      "@emotion/babel-preset-css-prop",
      {
        "autoLabel": "dev-only",
        "labelFormat": "[local]",
        "useBuiltIns": false,
        "throwIfNamespace": true
      }
    ]
  ]
}
```

_Options set to default values for demonstration purposes._
