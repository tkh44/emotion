import { css } from '@emotion/react'

// $ExpectType SerializedStyles
css()
// $ExpectType SerializedStyles
css([])
// $ExpectType SerializedStyles
css('abc')
// $ExpectType SerializedStyles
css('width: 200px;')
// $ExpectType SerializedStyles
css('display: block;', {
  flexGrow: 1,
  backgroundColor: 'red'
})
// $ExpectType SerializedStyles
css`
  position: relative;
  top: 20px;
`
// $ExpectType SerializedStyles
css`
  position: relative;
  top: ${'20px'};
`
// $ExpectType SerializedStyles
css`
  position: relative;
  top: ${'20px'};
`

// $ExpectError
css(() => 'height: 300px;')

// prettier-ignore
css`
  position: relative;
  flexgrow: ${
    // $ExpectError
    () => 20
  };
`
