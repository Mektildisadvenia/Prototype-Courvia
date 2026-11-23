declare module 'react-native' {
  import type * as React from 'react';

  export type StyleProp<T> = T | readonly StyleProp<T>[] | false | null | undefined;

  export interface TextStyle {
    color?: string;
    fontFamily?: string;
    fontSize?: number;
    fontStyle?: 'normal' | 'italic';
    fontWeight?:
      | 'normal'
      | 'bold'
      | '100'
      | '200'
      | '300'
      | '400'
      | '500'
      | '600'
      | '700'
      | '800'
      | '900';
    letterSpacing?: number;
    lineHeight?: number;
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
    textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through';
    textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
    fontVariant?: ('small-caps' | 'oldstyle-nums' | 'lining-nums' | 'tabular-nums' | 'proportional-nums')[];
    [key: string]: unknown;
  }

  export interface ViewStyle {
    alignContent?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around';
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    backgroundColor?: string;
    borderBottomColor?: string;
    borderBottomLeftRadius?: number;
    borderBottomRightRadius?: number;
    borderBottomWidth?: number;
    borderColor?: string;
    borderLeftColor?: string;
    borderLeftWidth?: number;
    borderRadius?: number;
    borderRightColor?: string;
    borderRightWidth?: number;
    borderStyle?: 'solid' | 'dotted' | 'dashed';
    borderTopColor?: string;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
    borderTopWidth?: number;
    borderWidth?: number;
    bottom?: number | string;
    display?: 'none' | 'flex';
    elevation?: number;
    flex?: number;
    flexBasis?: number | string;
    flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    flexGrow?: number;
    flexShrink?: number;
    flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
    gap?: number;
    columnGap?: number;
    rowGap?: number;
    height?: number | string;
    justifyContent?:
      | 'flex-start'
      | 'flex-end'
      | 'center'
      | 'space-between'
      | 'space-around'
      | 'space-evenly';
    left?: number | string;
    margin?: number | string;
    marginBottom?: number | string;
    marginHorizontal?: number | string;
    marginLeft?: number | string;
    marginRight?: number | string;
    marginTop?: number | string;
    marginVertical?: number | string;
    maxHeight?: number | string;
    maxWidth?: number | string;
    minHeight?: number | string;
    minWidth?: number | string;
    opacity?: number;
    overflow?: 'visible' | 'hidden' | 'scroll';
    padding?: number | string;
    paddingBottom?: number | string;
    paddingHorizontal?: number | string;
    paddingLeft?: number | string;
    paddingRight?: number | string;
    paddingTop?: number | string;
    paddingVertical?: number | string;
    position?: 'absolute' | 'relative' | 'fixed' | 'sticky';
    right?: number | string;
    shadowColor?: string;
    shadowOffset?: { width: number; height: number };
    shadowOpacity?: number;
    shadowRadius?: number;
    top?: number | string;
    transform?: Record<string, number | string>[];
    width?: number | string;
    zIndex?: number;
    [key: string]: unknown;
  }

  export interface ViewProps {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    nativeID?: string;
    testID?: string;
    accessibilityRole?: string;
    accessibilityLabel?: string;
    [key: string]: unknown;
  }

  export interface TextProps {
    children?: React.ReactNode;
    style?: StyleProp<TextStyle>;
    numberOfLines?: number;
    selectable?: boolean;
    [key: string]: unknown;
  }

  export interface PressableProps {
    children?: React.ReactNode | ((state: { pressed: boolean; hovered?: boolean }) => React.ReactNode);
    onPress?: () => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle> | ((state: { pressed: boolean; hovered?: boolean }) => StyleProp<ViewStyle>);
    accessibilityRole?: string;
    accessibilityLabel?: string;
    hitSlop?: number;
    [key: string]: unknown;
  }

  export interface ScrollViewProps extends ViewProps {
    horizontal?: boolean;
    showsVerticalScrollIndicator?: boolean;
    showsHorizontalScrollIndicator?: boolean;
    contentContainerStyle?: StyleProp<ViewStyle>;
  }

  export interface TextInputProps {
    value?: string;
    onChangeText?: (text: string) => void;
    placeholder?: string;
    placeholderTextColor?: string;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    editable?: boolean;
    multiline?: boolean;
    style?: StyleProp<TextStyle & ViewStyle>;
    accessibilityLabel?: string;
    [key: string]: unknown;
  }

  export interface ModalProps {
    visible?: boolean;
    transparent?: boolean;
    animationType?: 'none' | 'slide' | 'fade';
    onRequestClose?: () => void;
    children?: React.ReactNode;
  }

  export const View: React.ComponentType<ViewProps>;
  export const SafeAreaView: React.ComponentType<ViewProps>;
  export const Text: React.ComponentType<TextProps>;
  export const Pressable: React.ComponentType<PressableProps>;
  export const TouchableOpacity: React.ComponentType<PressableProps>;
  export const ScrollView: React.ComponentType<ScrollViewProps>;
  export const TextInput: React.ComponentType<TextInputProps>;
  export const Modal: React.ComponentType<ModalProps>;

  export const Platform: {
    OS: 'web' | 'ios' | 'android';
    select: <T>(options: { web?: T; ios?: T; android?: T; default?: T }) => T;
  };

  export function useWindowDimensions(): {
    width: number;
    height: number;
    scale: number;
    fontScale: number;
  };

  export const StyleSheet: {
    create: <T extends Record<string, ViewStyle | TextStyle>>(styles: T) => T;
    flatten: <T>(style?: StyleProp<T>) => T;
  };
}
