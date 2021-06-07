import * as React from 'react'
import {
  FlexStyle,
  ImageStyle,
  ScrollView,
  StyleProp,
  TextStyle,
  View
} from 'react-native'
import styled, { css, ReactNativeStyle, StyledOptions } from '@emotion/native'

declare module '@emotion/react' {
  // tslint:disable-next-line: strict-export-declare-modifiers
  export interface Theme {
    color: {
      primary: string
      positive: string
      negative: string
    }
  }
}

const cssObject = {
  height: 100,
  width: '100%',
  display: 'flex',
  position: undefined
} as const

const className = css`
  ${(true as boolean) && ''}
  ${'bar'}
  ${css``}
  ${1}
  ${cssObject}
`

const className2: ReactNativeStyle = css(cssObject)

css([{ display: 'none' }, [{ position: 'relative' }, { width: 100 }]])

css({ display: 'none' }, [{ position: 'relative' }, { width: 100 }])

css(null)

interface ExtraProps {
  foo: string
}

interface AdditionalProps {
  bar: string
}

export const ExplicitExtraPropsView = styled.View<ExtraProps>`
  background-color: red; // ${({ foo }) => foo}
`

export const InferredPropsView = styled.View`
  background-color: green; // ${({ testID }) => testID}
`

export const InferredExtraPropsView = styled.View<ExtraProps>`
  background-color: blue; // ${({ foo }) => foo}
`

export const ThemedView = styled.View<AdditionalProps>`
  background-color: ${({ theme }) => theme.color.positive}; // ${({ bar }) =>
    bar}
`

const largeTextStyle: TextStyle = {
  fontSize: 24
}

const stretchImageStyle: ImageStyle = {
  resizeMode: 'stretch'
}

// for some reason, TypeScript is not complaining about the incorrect interpolated type
styled.Text(largeTextStyle, stretchImageStyle)
export const LargeText = styled.Text`
  ${largeTextStyle}// ${stretchImageStyle}
`

styled.Image(
  stretchImageStyle
  // this style will not align with the ImageStyle typing requirement
  // largeTextStyle
)
export const StretchedImage = styled.Image`
  ${stretchImageStyle};
`

export const ComposedView = styled.View`
  ${className} ${className2}
  background-color: white;
`

export const NestedComposedView = styled.View(css`
  ${className} ${className2}
  background-color: white;
`)

function MyStyledComponent(_props: { style?: StyleProp<ImageStyle> }) {
  return null
}

styled(MyStyledComponent)(stretchImageStyle)

const theme = {
  color: {
    primary: 'blue',
    negative: 'red',
    positive: 'green'
  }
}

export const themed = <ThemedView bar="bar" theme={theme} />
export const composed = <ComposedView theme={theme} />

function MyComponent(_props: AdditionalProps) {
  return null
}

function MyOtherComponent(_props: { foo: string }) {
  return null
}

styled(MyComponent)({ width: 100 })
styled(MyComponent)({ width: 100 }).withComponent(MyOtherComponent)
styled(MyComponent)(({ bar }) => ({ color: bar }))
styled(View)({ width: 100 })
styled(View)<ExtraProps>(({ foo, testID }) => ({ color: foo, testID }))

const styles = {
  container: css({ flex: 1 }),
  scrollContainer: css`
    flex-grow: 1;
    align-items: center;
  `,
  centered: css<FlexStyle>`
    justify-content: center;
    align-items: center;
  `
}

export const scrollElem = (
  <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View />
  </ScrollView>
)
export const Container = styled.View(styles.container)
export const CenterContainer = styled.View(styles.container, styles.centered)
export const ImageFullWidthContained = styled.Image`
  ${styles.container} width: 100%;
  resize-mode: contain;
`

{
  // ref support
  const Container1 = styled.View()
  const Container2 = styled(View)()

  const containerRef1 = React.useRef<View>(null)
  const containerRef2 = React.useRef<View>(null)
  ;<Container1 ref={containerRef1} />
  ;<Container2 ref={containerRef2} />
}

{
  const styledOpts: StyledOptions = {
    shouldForwardProp: p => true
  }
  const styledOptsParameterized: StyledOptions<{ foo: string }> = {
    shouldForwardProp: (p: 'foo') => true
  }
  const styledOptsParameterizedBroken: StyledOptions<{ foo: string }> = {
    shouldForwardProp: (p: 'bar') => true // $ExpectError
  }
  const styledOptsBroken: StyledOptions = {
    shouldForwardProp: (p1, p2) => true // $ExpectError
  }
}
