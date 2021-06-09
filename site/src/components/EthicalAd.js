import React from 'react'

function removeNode(node) {
  node.parentNode.removeChild(node)
}

const useMediaQuery = mediaQuery => {
  const mediaObj = React.useMemo(() => window.matchMedia(mediaQuery), [
    mediaQuery
  ])
  const [matches, setMatches] = React.useState(mediaObj.matches)
  React.useLayoutEffect(
    () => {
      const updater = () => setMatches(mediaObj.matches)
      mediaObj.addListener(updater)
      return () => mediaObj.removeListener(updater)
    },
    [mediaObj]
  )
  return matches
}

export default function EthicalAd({ mediaQuery = '', ...props }) {
  if (typeof window === 'undefined') {
    return (
      <>
        <div data-ea-publisher="emotion-sh" data-ea-manual="true" {...props} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
var removeNode = ${removeNode};
if (document.currentScript) {
    var matches = window.matchMedia('${mediaQuery}').matches;
    var prevNode = document.currentScript.previousSibling;
    !matches && removeNode(prevNode);
    removeNode(document.currentScript);
} else {
    [].slice.call(document.querySelectorAll('[data-ea-publisher]')).forEach(function (node) {
      removeNode(node.nextSibling);
      removeNode(node);
    });
}
`
          }}
        />
      </>
    )
  }

  if (!window.hasDocumentCurrentScript) {
    return null
  }

  const matches = useMediaQuery(mediaQuery)

  React.useEffect(
    () => {
      if (matches && window.ethicalads) {
        window.ethicalads.load()
      }
    },
    [matches]
  )

  return matches ? (
    <div data-ea-publisher="emotion-sh" data-ea-manual="true" {...props} />
  ) : null
}
