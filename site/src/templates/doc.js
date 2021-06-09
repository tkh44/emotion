// @flow
/** @jsx jsx */
import { jsx } from '@emotion/react'
import React from 'react'
import { mq, colors } from '../utils/style'
import Playground from '../components/Playground'
import * as markdownComponents from '../utils/markdown-styles'
import memoize from '@emotion/memoize'
import Layout from '../layouts'
import { graphql } from 'gatsby'
import DocWrapper from '../components/DocWrapper'
import Title from '../components/Title'
import EthicalAd from '../components/EthicalAd'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

type Props = {
  data: {
    doc: {
      body: string,
      frontmatter: {
        title: string
      }
    },
    avatar: {
      childImageSharp: {
        resolutions: {
          src: string
        }
      }
    }
  },
  pageContext: {
    slug: string
  }
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    var hash = window.decodeURI(window.location.hash)
    if (hash !== '' && hash !== '#') {
      var element = document.getElementById(`.docSearch-content ${hash} a`)
      if (element) {
        // Wait for the browser to finish rendering before scrolling.
        setTimeout(function () {
          if (element) {
            element.click()
          }
        }, 0)
      }
    }
  })
}

const ClassName = (props: any) => {
  return props.children(props.className)
}

const createLiveCode = memoize(logoUrl => props => (
  <ClassName
    css={mq({
      paddingTop: [8, 16],
      paddingRight: [8, 16],
      paddingBottom: [8, 16],
      paddingLeft: [8, 16]
    })}
  >
    {internalCodeStylesClassName => (
      <Playground
        css={mq({
          marginLeft: [0],
          marginRight: [0],
          marginTop: [24, 32],
          marginBottom: [24, 32],
          borderRadius: [0, 4],
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word'
        })}
        editorClassName={internalCodeStylesClassName}
        logoUrl={logoUrl}
        initialCompiledCode={props.compiled}
        code={props.code}
      />
    )}
  </ClassName>
))

type DocRouteState = {
  sidebarOpen: boolean
}

export default class DocRoute extends React.Component<Props, DocRouteState> {
  state = {
    sidebarOpen: false
  }

  setSidebarOpen = (value: boolean) => this.setState({ sidebarOpen: value })

  render() {
    const { data } = this.props
    const { doc, avatar } = data
    const title = doc.frontmatter.title || this.props.pageContext.slug

    return (
      <Layout sidebarOpen={this.state.sidebarOpen} title={title}>
        <DocWrapper
          sidebarOpen={this.state.sidebarOpen}
          setSidebarOpen={this.setSidebarOpen}
        >
          <EthicalAd mediaQuery="(max-width: 52em)" data-ea-type="text" />
          <div
            css={{
              alignItems: 'center',
              gap: 8,
              borderBottom: `1px solid ${colors.lighten(0.25, colors.border)}`
            }}
            className="docSearch-content"
          >
            <div css={{ display: 'flex', alignItems: 'center' }}>
              <Title>{title}</Title>
              <markdownComponents.a
                css={{ fontSize: 12, marginLeft: 'auto' }}
                href={
                  doc.frontmatter.title
                    ? `https://github.com/emotion-js/emotion/edit/main/docs/${this.props.pageContext.slug}.mdx`
                    : `https://github.com/emotion-js/emotion/edit/main/packages/${this.props.pageContext.slug}/README.md`
                }
              >
                ✏️ <span css={{ marginLeft: 2 }}>Edit this page</span>
              </markdownComponents.a>
            </div>

            <div>
              <MDXProvider
                components={{
                  'live-code': createLiveCode(
                    avatar.childImageSharp.resolutions.src
                  ),
                  ...markdownComponents
                }}
              >
                <MDXRenderer children={doc.body} />
              </MDXProvider>
            </div>
          </div>
        </DocWrapper>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query DocBySlug($slug: String!) {
    doc: mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
      }
    }
    avatar: file(name: { eq: "emotion" }) {
      childImageSharp {
        resolutions(width: 96, height: 96) {
          src
        }
      }
    }
  }
`
