const JSX_ANNOTATION_REGEX = /\*?\s*@jsx\s+([^\s]+)/
const JSX_IMPORT_SOURCE_REGEX = /\*?\s*@jsxImportSource\s+([^\s]+)/

// TODO: handling this case
// <div css={`color:hotpink;`} />
// to
// <div css={css`color:hotpink;`} /> + import { css }

export default {
  meta: {
    fixable: 'code',
    schema: {
      type: 'array',
      items: {
        oneOf: [
          {
            type: 'string'
          },
          {
            type: 'object',
            properties: {
              runtime: { type: 'string' },
              importSource: { type: 'string' }
            },
            required: ['runtime'],
            additionalProperties: false
          }
        ]
      },
      uniqueItems: true,
      minItems: 0
    }
  },
  create(context) {
    const jsxRuntimeMode = context.options.find(
      option => option && option.runtime === 'automatic'
    )

    if (jsxRuntimeMode) {
      return {
        JSXAttribute(node) {
          if (node.name.name !== 'css') {
            return
          }
          let hasJsxImportSource = false
          let sourceCode = context.getSourceCode()
          let pragma = sourceCode
            .getAllComments()
            .find(node => JSX_IMPORT_SOURCE_REGEX.test(node.value))
          hasJsxImportSource =
            pragma && pragma.value.match(JSX_IMPORT_SOURCE_REGEX)
          if (!hasJsxImportSource) {
            context.report({
              node,
              message:
                'The css prop can only be used if you set @jsxImportSource pragma',
              fix(fixer) {
                return fixer.insertTextBefore(
                  sourceCode.ast.body[0],
                  `/** @jsxImportSource ${
                    (jsxRuntimeMode || {}).importSource || '@emotion/react'
                  } */\n`
                )
              }
            })
          }
        }
      }
    }

    return {
      JSXAttribute(node) {
        if (node.name.name !== 'css') {
          return
        }
        let hasJsxImport = false
        let emotionCoreNode = null
        let local = null
        let sourceCode = context.getSourceCode()
        sourceCode.ast.body.forEach(x => {
          if (
            x.type === 'ImportDeclaration' &&
            (x.source.value === '@emotion/react' ||
              x.source.value === '@emotion/core')
          ) {
            emotionCoreNode = x

            if (
              x.specifiers.length === 1 &&
              x.specifiers[0].type === 'ImportNamespaceSpecifier'
            ) {
              hasJsxImport = true
              local = x.specifiers[0].local.name + '.jsx'
            } else {
              let jsxSpecifier = x.specifiers.find(
                x => x.type === 'ImportSpecifier' && x.imported.name === 'jsx'
              )
              if (jsxSpecifier) {
                hasJsxImport = true
                local = jsxSpecifier.local.name
              }
            }
          }
        })
        let hasSetPragma = false
        if (context.settings.react && context.settings.react.pragma === 'jsx') {
          hasSetPragma = true
        }
        let pragma = sourceCode
          .getAllComments()
          .find(node => JSX_ANNOTATION_REGEX.test(node.value))
        let match = pragma && pragma.value.match(JSX_ANNOTATION_REGEX)
        if (match && (match[1] === local || (!local && match[1] === 'jsx'))) {
          hasSetPragma = true
        }

        if (!hasJsxImport || !hasSetPragma) {
          context.report({
            node,
            message:
              'The css prop can only be used if jsx from @emotion/react is imported and it is set as the jsx pragma',
            fix(fixer) {
              if (hasJsxImport) {
                return fixer.insertTextBefore(
                  emotionCoreNode,
                  `/** @jsx ${local} */\n`
                )
              }
              if (hasSetPragma) {
                if (emotionCoreNode) {
                  let lastSpecifier =
                    emotionCoreNode.specifiers[
                      emotionCoreNode.specifiers.length - 1
                    ]

                  if (lastSpecifier.type === 'ImportDefaultSpecifier') {
                    return fixer.insertTextAfter(lastSpecifier, ', { jsx }')
                  }

                  return fixer.insertTextAfter(lastSpecifier, ', jsx')
                }

                return fixer.insertTextBefore(
                  sourceCode.ast.body[0],
                  `import { jsx } from '@emotion/react'\n`
                )
              }
              return fixer.insertTextBefore(
                sourceCode.ast.body[0],
                `/** @jsx jsx */\nimport { jsx } from '@emotion/react'\n`
              )
            }
          })
          return
        }
        if (
          node.value.type === 'JSXExpressionContainer' &&
          node.value.expression.type === 'TemplateLiteral'
        ) {
          let cssSpecifier = emotionCoreNode.specifiers.find(
            x => x.imported.name === 'css'
          )
          context.report({
            node,
            message:
              'Template literals should be replaced with tagged template literals using `css` when using the css prop',
            fix(fixer) {
              if (cssSpecifier) {
                return fixer.insertTextBefore(
                  node.value.expression,
                  cssSpecifier.local.name
                )
              }
              let lastSpecifier =
                emotionCoreNode.specifiers[
                  emotionCoreNode.specifiers.length - 1
                ]

              if (context.getScope().variables.some(x => x.name === 'css')) {
                return [
                  fixer.insertTextAfter(lastSpecifier, `, css as _css`),
                  fixer.insertTextBefore(node.value.expression, '_css')
                ]
              }
              return [
                fixer.insertTextAfter(lastSpecifier, `, css`),
                fixer.insertTextBefore(node.value.expression, 'css')
              ]
            }
          })
        }
      }
    }
  }
}
