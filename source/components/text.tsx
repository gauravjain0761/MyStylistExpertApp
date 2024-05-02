import React, {FC, ReactNode} from 'react';
import {StyleProp, Text as RNText, TextProps, TextStyle} from 'react-native';
import tw from 'rn-tailwind';

const sizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  lg: 'text-lg',
  xl: 'font-bold text-xl',
  base: 'text-base',
  '2xl': 'font-bold text-2xl',
  '3xl': 'font-bold text-3xl',
  title: 'font-extrabold text-title text-3xl',
};

const fontWeights = {
  '100': 'font-thin',
  '200': 'font-extralight',
  '300': 'font-light',
  '400': 'font-normal',
  '500': 'font-medium',
  '600': 'font-semibold',
  '700': 'font-bold',
  '800': 'font-extrabold',
  '900': 'font-black',
};

interface Props extends TextProps {
  color?: string;
  children: ReactNode;
  opacity?: string;
  margin?: string;
  textStyle?: string;
  style?: StyleProp<TextStyle>;
  size: 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | '3xl' | 'title' | 'base';
  fontWeight?:
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
}

const Text: FC<Props> = ({
  style,
  size,
  children,
  opacity = '',
  margin = '',
  color = 'text-black',
  fontWeight = '400',
  textStyle = '',
  ...props
}) => {
  return (
    <RNText
      {...props}
      style={[
        tw`${color} ${textStyle} ${sizes[size]} ${opacity} ${margin} ${fontWeights[fontWeight]} `,
        style,
        {
          fontFamily: 'Nunito-Regular',
        },
      ]}>
      {children}
    </RNText>
  );
};

export default Text;
