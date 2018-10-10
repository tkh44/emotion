import * as React from 'react'
import styled, { CreateStyled } from 'react-emotion'

let Component
let mount

/*
 * Inference HTML Tag Props
 */
Component = styled('div')({ color: 'red' })
mount = <Component onClick={(event: any) => event} />

Component = styled('div')`
  color: red;
`
mount = <Component onClick={(event: any) => event} />

Component = styled('a')({ color: 'red' })
mount = <Component href="#" />

/*
 * Passing custom props
 */
interface CustomProps {
  lookColor: string
}

Component = styled('div')<CustomProps>(
  { color: 'blue' },
  props => ({
    background: props.lookColor
  }),
  props => ({
    border: `1px solid ${props.lookColor}`
  })
)
mount = <Component lookColor="red" />

Component = styled<'div', CustomProps>('div')({ color: 'blue' }, props => ({
  background: props.lookColor
}))
mount = <Component lookColor="red" />

const anotherColor = 'blue'
Component = styled<'div', CustomProps>('div')`
  background: ${props => props.lookColor};
  color: ${anotherColor};
`
mount = <Component lookColor="red" />

/*
 * With other components
 */
interface CustomProps2 {
  customProp: string
}
interface SFCComponentProps {
  className?: string
  foo: string
}

const SFCComponent: React.StatelessComponent<SFCComponentProps> = props => (
  <div className={props.className}>
    {props.children} {props.foo}
  </div>
)

declare class MyClassC extends React.Component<CustomProps2> {}

// infer SFCComponentProps
Component = styled(SFCComponent)({ color: 'red' })
mount = <Component foo="bar" />

// infer SFCComponentProps
Component = styled(SFCComponent)`
  color: red;
`
mount = <Component foo="bar" />

Component = styled(MyClassC)``
mount = <Component customProp="abc" />

// do not infer SFCComponentProps with pass CustomProps, need to pass both
Component = styled(SFCComponent)<CustomProps2>(
  {
    color: 'red'
  },
  props => ({
    background: props.customProp
  })
)
mount = <Component customProp="red" foo="bar" />

// do not infer SFCComponentProps with pass CustomProps, need to pass both
Component = styled<typeof SFCComponent, CustomProps2>(SFCComponent)`
  color: red;
  background: ${props => props.customProp};
`
mount = <Component customProp="red" foo="bar" />

/*
 * With explicit theme
 */

interface Theme {
  color: {
    primary: string
    secondary: string
  }
}

const _styled = styled as CreateStyled<Theme>

Component = _styled('div')`
  color: ${props => props.theme.color.primary}
`
mount = <Component onClick={(event: any) => event} />

/*
 * withComponent
 */

interface CustomProps3 {
  bgColor: string
}

Component = styled('div')<CustomProps3>(props => ({
  bgColor: props.bgColor
}))

const Link = Component.withComponent('a')
mount = <Link href="#" bgColor="red" />

const Button = Component.withComponent('button')
mount = <Button type="submit" bgColor="red" />

/**
 * ref
 */

Component = styled('div')``
mount = <Component ref={(element: HTMLDivElement) => {}} />

Component = styled('div')``
mount = <Component ref={(element: HTMLDivElement) => {}} />

Component = styled('div')({})
mount = <Component ref={(element: HTMLDivElement) => {}} />

Component = Component.withComponent('input')
mount = <Component ref={(element: HTMLInputElement) => {}} />

/*
 * Reference to other styled component
 */
const Child = styled('div')`
  color: red;
`

const Parent = styled('div')`
  ${Child} {
    color: blue;
  }
`
