// @flow
/** @jsx jsx */
import { jsx } from '@emotion/react'
import { graphql } from 'gatsby'
import Layout from '../layouts'
import * as markdownComponents from '../utils/markdown-styles'
import Title from '../components/Title'
import EthicalAd from '../components/EthicalAd'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import { mq } from '../utils/style'

const Community = (props: *) => {
  const title = 'Community'
  return (
    <Layout title={title}>
      <div
        css={mq({
          gridColumn: '1 / span 2'
        })}
      >
        <div>
          <Title>{title}</Title>
          <MDXProvider components={markdownComponents}>
            <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
          </MDXProvider>
          <markdownComponents.h2>{'Contributing'}</markdownComponents.h2>
          <markdownComponents.p>
            This list comes from{' '}
            <a href="https://github.com/emotion-js/awesome-emotion">
              awesome-emotion
            </a>
            . Anything added to that that list will appear here automatically.
          </markdownComponents.p>
          <markdownComponents.h2>{'Thanks!'}</markdownComponents.h2>
          <markdownComponents.p>
            Thanks to the styled-components team for the idea of embedding an
            awesome list into a website! ❤️
          </markdownComponents.p>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query Community {
    mdx(
      fileAbsolutePath: {
        glob: "**/.cache/gatsby-source-filesystem/*/README.md"
      }
    ) {
      body
    }
  }
`

export default Community
