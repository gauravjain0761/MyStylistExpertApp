import {
  ColorValue,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import images from 'images';
import {commonFontStyle, fontFamily, hp, wp} from '../utils/dimentions';
import Color from '../../assets/color';

interface input_props {
  placeholder?: string;
  input_style?: TextStyle | ViewStyle;
  placeholder_color?: ColorValue | any;
  value?: String | number | any;
  input_container_style?: TextStyle | ViewStyle[];
  custom_component?: any;
  onTextChange?: any;
  keyboardType?: 'phone-pad' | 'default';
  label?: string;
  labelStyle?: TextStyle;
}

const Login_Input: FC<input_props> = ({
  placeholder = 'Enter Text...',
  input_style,
  placeholder_color = Color.GreyA4,
  value,
  input_container_style,
  custom_component = null,
  onTextChange,
  keyboardType = 'default',
  label,
  labelStyle,
}) => {
  return (
    <View style={[styles?.container, input_container_style]}>
      {label && <Text style={[styles?.label, labelStyle]}>{label}</Text>}
      <ImageBackground
        source={images?.gradient_input}
        style={[styles?.def_input_bg]}
        resizeMode="stretch">
        {custom_component || (
          <TextInput
            placeholder={placeholder}
            value={value}
            keyboardType={keyboardType}
            placeholderTextColor={placeholder_color}
            showSoftInputOnFocus
            style={[styles?.def_input_styles, input_style]}
            onChangeText={(e: string) => onTextChange(e)}
          />
        )}
      </ImageBackground>
    </View>
  );
};

export default Login_Input;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  def_input_bg: {
    width: '100%',
    height: hp(55),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  def_input_styles: {
    width: '100%',
    height: '100%',
    paddingHorizontal: wp(20.21),
    color: Color?.GreyA4,
  },
  placeholder: {},
  label: {
    ...commonFontStyle(fontFamily?.medium, 16, Color.GreyA4),
    marginBottom: hp(14),
  },
});
