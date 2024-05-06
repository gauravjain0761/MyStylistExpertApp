import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import Modals from './Modals';
import {Image, PrimaryButton} from 'components';
import images from 'images';
import {commonFontStyle, fontFamily, hp, wp} from '../utils/dimentions';
import {ALLOW_US} from 'AppConstants';
import Color from '../../assets/color';

type modalProp = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const locationmodal: FC<modalProp> = ({visible, setVisible}) => {
  return (
    <Modals
      visible={visible}
      close={setVisible}
      IsBackdropPress={false}
      header
      contain={
        <View style={styles.container}>
          <Image source={images?.locationAllow} style={styles.image} />
          <Text style={styles.mainTitle}>{ALLOW_US}</Text>
          <Text style={styles.subTitle}>
            {
              'We need access to your location to show you relevant\nStylists, Offers and Packages'
            }
          </Text>
          <PrimaryButton
            label="Allow"
            containerStyle={styles.btncontainer}
            onPress={() => setVisible(!visible)}
          />
        </View>
      }
    />
  );
};

export default locationmodal;

const styles = StyleSheet.create({
  image: {
    width: wp(168),
    height: wp(168),
    resizeMode: 'contain',
    marginTop: hp(21),
  },
  mainTitle: {
    ...commonFontStyle(fontFamily?.semi_bold, 23, Color?.Black),
    lineHeight: hp(24),
    marginTop: hp(33),
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(23),
    width: '100%',
    marginHorizontal: wp(34),
  },
  subTitle: {
    ...commonFontStyle(fontFamily?.medium, 14, Color?.Grey70),
    lineHeight: hp(24),
    textAlign: 'center',
    marginTop: hp(8),
  },
  btncontainer: {
    marginTop: hp(27),
    width: '100%',
  },
});
