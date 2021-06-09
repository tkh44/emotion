// Definitions by: Pat Sissons <https://github.com/patsissons>
// TypeScript Version: 3.7

import * as RN from 'react-native'
import { Theme } from '@emotion/react'

import {
  CreateStyled as BaseCreateStyled,
  CreateStyledComponent,
  CSSInterpolation,
  Interpolation,
  ReactNativeStyle,
  ReactNativeStyleType
} from './base'

export {
  ArrayCSSInterpolation,
  ArrayInterpolation,
  CreateStyledComponent,
  CSSInterpolation,
  FunctionInterpolation,
  Interpolation,
  InterpolationPrimitive,
  ObjectInterpolation,
  ReactNativeStyle,
  StyledComponent,
  StyledOptions
} from './base'

type ReactNative = typeof RN

export function css<StyleType extends ReactNativeStyle = ReactNativeStyle>(
  template: TemplateStringsArray,
  ...args: Array<Interpolation>
): StyleType
export function css<StyleType extends ReactNativeStyle = ReactNativeStyle>(
  ...args: Array<StyleType>
): StyleType
export function css<StyleType extends ReactNativeStyle = ReactNativeStyle>(
  ...args: Array<CSSInterpolation>
): StyleType

// those 2 are just copies of the `BaseCreateStyled` with supplied `C` type argument
type HostClassComponent<C extends React.ComponentClass<any>> =
  CreateStyledComponent<
    React.ComponentProps<C> & { theme?: Theme; as?: React.ElementType },
    {},
    { ref?: React.Ref<InstanceType<C>> },
    ReactNativeStyleType<React.ComponentProps<C>>
  >
type HostFunctionComponent<C extends React.FunctionComponent<any>> =
  CreateStyledComponent<
    React.ComponentProps<C> & { theme?: Theme; as?: React.ElementType },
    {},
    {},
    ReactNativeStyleType<React.ComponentProps<C>>
  >

export interface StyledComponents {
  ActivityIndicator: HostClassComponent<ReactNative['ActivityIndicator']>
  Button: HostClassComponent<ReactNative['Button']>
  DatePickerIOS: HostClassComponent<ReactNative['DatePickerIOS']>
  DrawerLayoutAndroid: HostClassComponent<ReactNative['DrawerLayoutAndroid']>
  FlatList: HostClassComponent<ReactNative['FlatList']>
  Image: HostClassComponent<ReactNative['Image']>
  ImageBackground: HostClassComponent<ReactNative['ImageBackground']>
  KeyboardAvoidingView: HostClassComponent<ReactNative['KeyboardAvoidingView']>
  ListView: HostClassComponent<ReactNative['ListView']>
  Modal: HostClassComponent<ReactNative['Modal']>
  NavigatorIOS: HostClassComponent<ReactNative['NavigatorIOS']>
  Picker: HostClassComponent<ReactNative['Picker']>
  PickerIOS: HostClassComponent<ReactNative['PickerIOS']>
  Pressable: HostFunctionComponent<ReactNative['Pressable']>
  ProgressBarAndroid: HostClassComponent<ReactNative['ProgressBarAndroid']>
  ProgressViewIOS: HostClassComponent<ReactNative['ProgressViewIOS']>
  RecyclerViewBackedScrollView: HostClassComponent<
    ReactNative['RecyclerViewBackedScrollView']
  >
  RefreshControl: HostClassComponent<ReactNative['RefreshControl']>
  SafeAreaView: HostClassComponent<ReactNative['SafeAreaView']>
  ScrollView: HostClassComponent<ReactNative['ScrollView']>
  SectionList: HostClassComponent<ReactNative['SectionList']>
  SegmentedControlIOS: HostClassComponent<ReactNative['SegmentedControlIOS']>
  Slider: HostClassComponent<ReactNative['Slider']>
  SnapshotViewIOS: HostClassComponent<ReactNative['SnapshotViewIOS']>
  StatusBar: HostClassComponent<ReactNative['StatusBar']>
  SwipeableListView: HostClassComponent<ReactNative['SwipeableListView']>
  Switch: HostClassComponent<ReactNative['Switch']>
  SwitchIOS: HostClassComponent<ReactNative['SwitchIOS']>
  TabBarIOS: HostClassComponent<ReactNative['TabBarIOS']>
  Text: HostClassComponent<ReactNative['Text']>
  TextInput: HostClassComponent<ReactNative['TextInput']>
  ToolbarAndroid: HostClassComponent<ReactNative['ToolbarAndroid']>
  TouchableHighlight: HostClassComponent<ReactNative['TouchableHighlight']>
  TouchableNativeFeedback: HostClassComponent<
    ReactNative['TouchableNativeFeedback']
  >
  TouchableOpacity: HostClassComponent<ReactNative['TouchableOpacity']>
  TouchableWithoutFeedback: HostClassComponent<
    ReactNative['TouchableWithoutFeedback']
  >
  View: HostClassComponent<ReactNative['View']>
  ViewPagerAndroid: HostClassComponent<ReactNative['ViewPagerAndroid']>
}

export interface CreateStyled extends BaseCreateStyled, StyledComponents {}

declare const styled: CreateStyled
export default styled
