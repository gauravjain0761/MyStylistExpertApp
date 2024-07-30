import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {commonFontStyle, fontFamily, hp, wp} from '../utils/dimentions';
import Color from '../../assets/color';
import images from 'images';
import {appConfig} from '../../config';

interface Props {
  index?: number;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  data?: any;
}

const ServiceCard: FC<Props> = ({index, onPress, containerStyle, data}) => {
  const {fileName, price, sub_service_name} = data;

  const {IMG_URL} = appConfig;

  return (
    <View style={[styles.maincontainer, containerStyle]} key={index}>
      <View style={styles.leftpart}>
        <Text style={styles.title}>{sub_service_name}</Text>
        <Text style={styles.price}>{`₹${price}`}</Text>
        <TouchableOpacity onPress={onPress}>
          <ImageBackground
            resizeMode="stretch"
            style={styles.btnbg}
            source={images?.buttonbg}>
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={images?.uploadicon}
            />
            <Text style={styles.btntitle}>{'UPLOAD IMAGE'}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <Image
        source={{uri: `${IMG_URL}/${fileName}`}}
        resizeMode="cover"
        style={styles.image}
      />
    </View>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  maincontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: hp(19),
    paddingTop: hp(16),
    paddingHorizontal: wp(22),
  },
  image: {
    width: wp(111),
    height: wp(100),
    borderRadius: wp(6),
  },
  leftpart: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  title: {
    ...commonFontStyle(fontFamily.medium, 18, Color?.Black),
    lineHeight: hp(22),
  },
  price: {
    ...commonFontStyle(fontFamily.semi_bold, 20, Color?.Black),
    lineHeight: hp(24),
    marginTop: hp(8),
  },
  icon: {
    width: wp(16),
    height: wp(16),
  },
  btnbg: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    width: 'auto',
    paddingLeft: wp(8),
    paddingRight: wp(11),
    paddingVertical: hp(4),
    marginTop: hp(18),
  },
  btntitle: {
    ...commonFontStyle(fontFamily.medium, 12, Color?.Green35),
  },
});
