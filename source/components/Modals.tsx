import {
  Image,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Color from '../../assets/color';
import {hp, wp} from '../utils/dimentions';
import images from 'images';

type props = {
  visible: boolean;
  transparent?: boolean;
  contain?: any;
  close?: any;
  containStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  isIcon?: boolean;
  IsBackdropPress?: boolean;
};

const Modals = ({
  visible = false,
  transparent = true,
  contain,
  close,
  containStyle,
  containerStyle,
  IsBackdropPress = true,
  isIcon,
}: props) => {
  return (
    <Modal
      isVisible={visible}
      animationIn="slideInUp"
      onBackdropPress={() => (IsBackdropPress ? close(false) : close(true))}
      style={[styles.container_style, containerStyle]}
      backdropColor="#000000CC">
      <>
        <View style={[styles.contain, containStyle]}>
          {isIcon && (
            <TouchableOpacity
              style={styles?.close}
              onPress={() => close(false)}>
              <Image source={images.close} style={styles.close} />
            </TouchableOpacity>
          )}
          {contain}
        </View>
      </>
    </Modal>
  );
};

export default Modals;

const styles = StyleSheet.create({
  contain: {
    width: '100%',
    backgroundColor: Color?.White,
    paddingHorizontal: wp(20),
    paddingVertical: hp(21),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    borderRadius: wp(10),
  },
  container_style: {
    width: '100%',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    justifyContent: 'center',
    paddingHorizontal: hp(20),
  },
  close: {
    width: wp(24),
    height: wp(24),
    alignSelf: 'flex-end',
  },
});
