//import liraries
import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {commonFontStyle, hp, wp} from '../utils/dimentions';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Color from '../../assets/color';

type IconButtonProps = {
  label: string;
  onPress: () => any;
  containerStyle?: ViewStyle;
  containerLabelStyle?: TextStyle;
  disabled?: any;
};

const PrimaryButton = ({
  label,
  onPress,
  containerStyle,
  containerLabelStyle,
  disabled,
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.container, containerStyle]}>
      <Text style={[styles.labelTextStyle, containerLabelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Color.Green,
    paddingVertical: hp(17),
  },
  labelTextStyle: {
    ...commonFontStyle(20, Color.Grey44),
  },
});

export default PrimaryButton;
