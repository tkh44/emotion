import babelTester from 'babel-tester'
import plugin from '@emotion/babel-plugin'

babelTester('import mapping', __dirname, {
  plugins: [
    [
      plugin,
      {
        importMap: {
          'package-one': {
            nonDefaultStyled: {
              canonicalImport: ['@emotion/styled', 'default']
            }
          },
          'package-two': {
            someJsx: {
              canonicalImport: ['@emotion/react', 'jsx']
            },
            someCssFromCore: {
              canonicalImport: ['@emotion/react', 'css']
            },
            someKeyframesFromCore: {
              canonicalImport: ['@emotion/react', 'keyframes']
            },
            SomeGlobalFromCore: {
              canonicalImport: ['@emotion/react', 'Global']
            }
          },

          'package-three': {
            something: {
              canonicalImport: ['@emotion/css', 'css']
            },
            keyframes: {
              canonicalImport: ['@emotion/css', 'keyframes']
            }
          },
          'package-four': {
            nonDefaultStyled: {
              canonicalImport: ['@emotion/styled', 'default'],
              styledBaseImport: ['package-four/base', 'something']
            }
          }
        }
      }
    ]
  ]
})
