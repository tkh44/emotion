// @flow
/** @jsx jsx */
import { jsx } from '@emotion/react'
import * as React from 'react'
import { keyframes, cx } from '@emotion/css'
import { Match } from '@reach/router'
import { Link } from 'gatsby'
import MenuIcon from 'react-icons/lib/md/menu'
import CloseIcon from 'react-icons/lib/md/close'

import { constants, colors, mq } from '../utils/style'
import darken from 'polished/lib/color/darken'
import { getDocMap, docList } from '../utils/misc'

import DocMetadata from './DocMetadata'
import Search from './Search'
import EthicalAd from './EthicalAd'

let space = constants.space
const scaleAnimation = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`

function ToggleSidebarButton({
  setSidebarOpen,
  ...rest
}: {
  setSidebarOpen: boolean => void
}) {
  return (
    <button
      {...rest}
      css={mq({
        display: ['block', 'block', 'none'],
        position: 'fixed',
        bottom: '0',
        right: '0',
        borderRadius: '50%',
        backgroundColor: colors.hightlight,
        padding: '16px',
        margin: '32px',
        animation: `0.25s ease-in ${scaleAnimation}`,
        transition: '150ms ease-in-out background-color',
        border: '0',
        '&:hover,&:focus': {
          backgroundColor: darken(0.15)(colors.hightlight)
        },
        '&:active': {
          backgroundColor: darken(0.25)(colors.hightlight)
        }
      })}
      onClick={() => setSidebarOpen(true)}
    />
  )
}

const docHeadingMap = docList.reduce((obj, current) => {
  current.items.forEach(item => {
    obj[item] = current.title
  })
  return obj
}, {})

const SidebarGroup = (props: {
  item: { title: string, items: Array<string> },
  setSidebarOpenState: boolean => void,
  docMap: *,
  docName?: string
}) => {
  const { item, docMap, docName } = props
  return (
    <>
      <h3
        css={mq({
          fontWeight: 800,
          fontSize: [
            constants.fontSizes[5],
            constants.fontSizes[5],
            constants.fontSizes[3]
          ],
          color: colors.color,
          marginTop: [constants.space[3], constants.space[3]],
          marginBottom: [constants.space[1], constants.space[1], 0],
          lineHeight: '32px'
        })}
        className={cx({
          'docSearch-lvl0':
            docName !== undefined && docHeadingMap[docName] === item.title
        })}
      >
        {item.title}
      </h3>
      <ul
        css={{
          listStyle: 'none',
          margin: 0,
          padding: 0
        }}
      >
        {item.items.map(slug => (
          <li key={slug}>
            <Link
              css={mq({
                display: 'block',
                fontSize: [
                  constants.fontSizes[4],
                  constants.fontSizes[4],
                  constants.fontSizes[2]
                ],
                fontWeight: '300',
                color: colors.color,
                textDecoration: 'none',
                margin: 0,
                paddingTop: [12, 12, 6],
                paddingBottom: [12, 12, 6],
                paddingLeft: [12, 12, 0],
                paddingRight: [12, 12, 0],
                '&:hover': { color: colors.border },
                '&.active': {
                  fontWeight: 600,
                  color: [colors.hightlight, colors.hightlight, 'none'],
                  '&::before': {
                    content: '""',
                    height: [42, 42, 32],
                    width: [8, 8, 6],
                    transform: `translate3d(-${constants.space[3]}px, -${constants.space[1]}px, 0)`,
                    position: 'absolute',
                    display: 'inline-block',
                    backgroundColor: colors.lighten(0.25, colors.border)
                  }
                }
              })}
              activeClassName={cx('active', 'docSearch-lvl1')}
              to={`/docs/${slug}`}
            >
              {docMap[slug] || slug}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default ({
  children,
  sidebarOpen,
  setSidebarOpen
}: {
  children: React.Node,
  sidebarOpen: boolean,
  setSidebarOpen: boolean => void
}) => {
  return (
    <DocMetadata
      render={data => {
        const docMap = getDocMap(data)
        return (
          <>
            <aside
              css={mq({
                display: [
                  sidebarOpen ? 'block' : 'none',
                  sidebarOpen ? 'block' : 'none',
                  'block'
                ],
                // gridRow: ['1', '1', '2 / span 2'],
                gridColumn: ['1 / span 2', '1 / span 2', '2 / span 1'],
                paddingLeft: [0, 0, space[3]],
                borderLeft: [
                  'none',
                  'none',
                  `1px solid ${colors.lighten(0.25, colors.border)}`
                ]
              })}
            >
              <Search />
              <EthicalAd mediaQuery="(min-width: 52em)" data-ea-type="image" />
              {docList.map(item => {
                return (
                  <Match path="/docs/:docName" key={item.title}>
                    {({ match }: { match?: { docName: string } }) => {
                      return (
                        <SidebarGroup
                          item={item}
                          sidebarOpen={sidebarOpen}
                          setSidebarOpenState={setSidebarOpen}
                          docMap={docMap}
                          docName={match && match.docName}
                        />
                      )
                    }}
                  </Match>
                )
              })}
            </aside>
            <main
              css={mq({
                display: [
                  sidebarOpen ? 'none' : 'block',
                  sidebarOpen ? 'none' : 'block',
                  'block'
                ],
                gridRow: 2,
                gridColumn: ['1 / span 2', '1 / span 2', '1 / span 1'],
                paddingRight: [0, 0, 0]
              })}
            >
              {children}
            </main>
            <ToggleSidebarButton
              setSidebarOpen={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <CloseIcon color="white" size={32} />
              ) : (
                <MenuIcon color="white" size={32} />
              )}
            </ToggleSidebarButton>
          </>
        )
      }}
    />
  )
}
