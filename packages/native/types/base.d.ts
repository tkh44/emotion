// Definitions by: Pat Sissons <https://github.com/patsissons>
// TypeScript Version: 3.4

import { Theme } from '@emotion/react'
import * as RN from 'react-native'

type ReactNative = typeof RN

export type ReactNativeStyle = RN.ViewStyle | RN.TextStyle | RN.ImageStyle

export type ReactNativeStyleType<Props> = Props extends {
  style?: RN.StyleProp<infer StyleType>
}
  ? StyleType extends ReactNativeStyle
    ? StyleType
    : ReactNativeStyle
  : ReactNativeStyle

export type InterpolationPrimitive<
  StyleType extends ReactNativeStyle = ReactNativeStyle
> =
  | null
  | undefined
  | boolean
  | number
  | string
  | ObjectInterpolation<StyleType>

export type ObjectInterpolation<
  StyleType extends ReactNativeStyle = ReactNativeStyle
> = StyleType

export interface ArrayCSSInterpolation<
  StyleType extends ReactNativeStyle = ReactNativeStyle
> extends ReadonlyArray<CSSInterpolation<StyleType>> {}

export type CSSInterpolation<
  StyleType extends ReactNativeStyle = ReactNativeStyle
> = InterpolationPrimitive<StyleType> | ArrayCSSInterpolation<StyleType>

export interface ArrayInterpolation<
  MergedProps,
  StyleType extends ReactNativeStyle = ReactNativeStyle
> extends ReadonlyArray<Interpolation<MergedProps, StyleType>> {}

export interface FunctionInterpolation<
  MergedProps,
  StyleType extends ReactNativeStyle = ReactNativeStyle
> {
  (mergedProps: MergedProps): Interpolation<MergedProps, StyleType>
}

export type Interpolation<
  MergedProps = unknown,
  StyleType extends ReactNativeStyle = ReactNativeStyle
> =
  | InterpolationPrimitive<StyleType>
  | ArrayInterpolation<MergedProps, StyleType>
  | FunctionInterpolation<MergedProps, StyleType>

/** Same as StyledOptions but shouldForwardProp must be a type guard */
export interface FilteringStyledOptions<
  Props,
  ForwardedProps extends keyof Props = keyof Props
> {
  shouldForwardProp?(propName: PropertyKey): propName is ForwardedProps
}

export interface StyledOptions<Props> {
  shouldForwardProp?(propName: PropertyKey): boolean
}

/**
 * @typeparam ComponentProps  Props which will be included when withComponent is called
 * @typeparam SpecificComponentProps  Props which will *not* be included when withComponent is called
 */
export interface StyledComponent<
  ComponentProps extends {},
  SpecificComponentProps extends {} = {},
  JSXProps extends {} = {}
> extends React.FC<ComponentProps & SpecificComponentProps & JSXProps> {
  withComponent<C extends React.ComponentClass<React.ComponentProps<C>>>(
    component: C
  ): StyledComponent<
    ComponentProps & React.ComponentProps<C>,
    {},
    { ref?: React.Ref<InstanceType<C>> }
  >
  withComponent<C extends React.ComponentType<React.ComponentProps<C>>>(
    component: C
  ): StyledComponent<ComponentProps & React.ComponentProps<C>>
}

/**
 * @typeparam ComponentProps  Props which will be included when withComponent is called
 * @typeparam SpecificComponentProps  Props which will *not* be included when withComponent is called
 */
export interface CreateStyledComponent<
  ComponentProps extends {},
  SpecificComponentProps extends {} = {},
  JSXProps extends {} = {},
  StyleType extends ReactNativeStyle = ReactNativeStyle
> {
  /**
   * @typeparam AdditionalProps  Additional props to add to your styled component
   */
  <AdditionalProps extends {} = {}>(
    ...styles: ArrayInterpolation<
      ComponentProps &
        SpecificComponentProps &
        AdditionalProps & { theme: Theme },
      StyleType
    >
  ): StyledComponent<
    ComponentProps & AdditionalProps,
    SpecificComponentProps,
    JSXProps
  >
  /**
   * @typeparam AdditionalProps  Additional props to add to your styled component
   */
  <AdditionalProps extends {} = {}>(
    template: TemplateStringsArray,
    ...styles: ArrayInterpolation<
      ComponentProps &
        SpecificComponentProps &
        AdditionalProps & { theme: Theme },
      StyleType
    >
  ): StyledComponent<
    ComponentProps & AdditionalProps,
    SpecificComponentProps,
    JSXProps
  >
}

/**
 * @desc
 * This function accepts a React component.
 *
 * @example styled(MyComponent)({ width: 100 })
 * @example styled(MyComponent)(myComponentProps => ({ width: myComponentProps.width })
 * @example styled(View)({ width: 100 })
 * @example styled(View)<Props>(props => ({ width: props.width })
 */
export interface CreateStyled {
  <
    C extends React.ComponentClass<React.ComponentProps<C>>,
    ForwardedProps extends keyof React.ComponentProps<C> = keyof React.ComponentProps<C>
  >(
    component: C,
    options: FilteringStyledOptions<React.ComponentProps<C>, ForwardedProps>
  ): CreateStyledComponent<
    Pick<React.ComponentProps<C>, ForwardedProps> & {
      theme?: Theme
      as?: React.ElementType
    },
    {},
    { ref?: React.Ref<InstanceType<C>> },
    ReactNativeStyleType<React.ComponentProps<C>>
  >

  <C extends React.ComponentClass<React.ComponentProps<C>>>(
    component: C,
    options?: StyledOptions<React.ComponentProps<C>>
  ): CreateStyledComponent<
    React.ComponentProps<C> & {
      theme?: Theme
      as?: React.ElementType
    },
    {},
    { ref?: React.Ref<InstanceType<C>> },
    ReactNativeStyleType<React.ComponentProps<C>>
  >

  <
    C extends React.ComponentType<React.ComponentProps<C>>,
    ForwardedProps extends keyof React.ComponentProps<C> = keyof React.ComponentProps<C>
  >(
    component: C,
    options: FilteringStyledOptions<React.ComponentProps<C>, ForwardedProps>
  ): CreateStyledComponent<
    Pick<React.ComponentProps<C>, ForwardedProps> & {
      theme?: Theme
      as?: React.ElementType
    },
    {},
    {},
    ReactNativeStyleType<React.ComponentProps<C>>
  >

  <C extends React.ComponentType<React.ComponentProps<C>>>(
    component: C,
    options?: StyledOptions<React.ComponentProps<C>>
  ): CreateStyledComponent<
    React.ComponentProps<C> & { theme?: Theme; as?: React.ElementType },
    {},
    {},
    ReactNativeStyleType<React.ComponentProps<C>>
  >
}

export const styled: CreateStyled
