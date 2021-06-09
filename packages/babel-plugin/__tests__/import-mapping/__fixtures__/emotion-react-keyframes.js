import * as React from 'react'
import { someCssFromCore, someKeyframesFromCore } from 'package-two'

const numForty = 40
const numThirty = 30

const bounce = someKeyframesFromCore`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  ${numForty + numThirty}% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`

const gift = someKeyframesFromCore`
  from {
    transform: translate3d(0,0,0);
  }

  to {
    transform: translate3d(0,-4px,0);
  }
`

const Comp = () => (
  <div
    className={someCssFromCore`
      animation: ${bounce} 1s ease infinite;
    `}
  >
    ichenlei with emotion
  </div>
)

const Comp2 = () => (
  <div
    className={someCssFromCore`
      animation: ${gift} 1s ease infinite;
    `}
  >
    ichenlei with emotion
  </div>
)
