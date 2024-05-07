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
import Color from '../../assets/color';
import {commonFontStyle, fontFamily, hp, wp} from '../utils/dimentions';
import images from 'images';

type piker = {
  placeholderTitle?: string;
  placeholderIcon?: any;
  containerStyle?: ViewStyle;
  onPress?: () => void;
  titleStyle?: TextStyle;
  label?: string;
  innercontainer?: ViewStyle;
  labelStyle?: TextStyle;
};

const ImagePicker: FC<piker> = ({
  placeholderTitle = '',
  placeholderIcon = null,
  containerStyle,
  onPress,
  titleStyle,
  label,
  innercontainer,
  labelStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TouchableOpacity
        onPress={onPress}
        style={[styles.innercontainer, innercontainer]}>
        <View style={styles.imgConainer}>
          <Image
            resizeMode="stretch"
            source={placeholderIcon ? placeholderIcon : images.upload}
            style={[styles.uploadIcon]}
          />
          <Text style={[styles.title, titleStyle]}>
            {placeholderTitle ? placeholderTitle : 'Upload image here..'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    marginTop: hp(25),
  },
  innercontainer: {
    borderWidth: 1.2,
    borderColor: Color?.Green35,
    marginTop: hp(20),
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    gap: hp(5),
    paddingVertical: hp(18),
    borderRadius: wp(10),
    backgroundColor: Color?.GreenF7,
  },
  uploadIcon: {
    width: wp(24),
    height: wp(24),
  },
  title: {
    ...commonFontStyle(fontFamily.semi_bold, 12, Color.Green35),
    lineHeight: hp(14),
  },
  imgConainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(20),
  },
  label: {
    ...commonFontStyle(fontFamily.semi_bold, 16, Color?.Black),
  },
});
