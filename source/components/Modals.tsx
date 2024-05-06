import {
  Image,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import Modal from 'react-native-modal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Color from '../../assets/color';
import {commonFontStyle, fontFamily, hp, wp} from '../utils/dimentions';
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
  title?: string;
  header?: boolean;
};

const Modals: FC<props> = ({
  visible = false,
  transparent = true,
  contain,
  close,
  containStyle,
  containerStyle,
  IsBackdropPress = true,
  isIcon,
  title,
  header,
}) => {
  return (
    <Modal
      isVisible={visible}
      animationIn="slideInUp"
      onBackdropPress={() => (IsBackdropPress ? close(false) : close(true))}
      style={[styles.container_style, containerStyle]}
      backdropColor="#000000CC">
      <>
        <View style={[styles.contain, containStyle]}>
          <View style={styles.header}>
            {title ? <Text style={styles.title}>{title}</Text> : <View></View>}
            {isIcon && (
              <TouchableOpacity
                style={styles?.close}
                onPress={() => close(false)}>
                <Image source={images.close} style={styles.close} />
              </TouchableOpacity>
            )}
          </View>
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
    borderTopLeftRadius: wp(20),
    borderTopRightRadius: wp(20),
  },
  container_style: {
    width: '100%',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    justifyContent: 'flex-end',
  },
  close: {
    width: wp(24),
    height: wp(24),
    resizeMode: 'cover',
  },
  title: {
    ...commonFontStyle(fontFamily.semi_bold, 18, Color?.Black),
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});
