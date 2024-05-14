import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import Color from '../../assets/color';
import {hp, wp} from '../utils/dimentions';
import images from 'images';

interface Props {
  onPress: () => void;
}

const FloatingButton: FC<Props> = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Image source={images?.floatarrow} style={styles.arrow} />
    </TouchableOpacity>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Color?.White,
    borderRadius: wp(100),
    width: wp(60),
    height: wp(60),
    position: 'absolute',
    bottom: hp(20),
    right: wp(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    width: wp(30),
    height: hp(30),
  },
});
