import {
  Dimensions,
  PixelRatio,
  Platform,
  TextStyle,
  useWindowDimensions,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const w = (widthPercent: any) => {
  const screenWidth = Dimensions.get('window').width;
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};
const h = (heightPercent: any) => {
  const screenHeight = Dimensions.get('window').height;
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

const f = scale => {
  let FONT_SIZE = 12 * scale;
  let FONT_SIZE_Requests = 12 * scale;
  if (PixelRatio.get() <= 1.5 && PixelRatio.get() > 1) {
    FONT_SIZE = 9 * scale;
    FONT_SIZE_Requests = 9 * scale;
    return FONT_SIZE;
  } else if (PixelRatio.get() <= 1) {
    FONT_SIZE = 9 * scale;
    FONT_SIZE_Requests = 9 * scale;
    return FONT_SIZE;
  } else if (
    PixelRatio.get() > 1.5 &&
    PixelRatio.get() >= 2 &&
    PixelRatio.get() < 3
  ) {
    FONT_SIZE = 10 * scale;
    FONT_SIZE_Requests = 10 * scale;
    return FONT_SIZE;
  } else if (PixelRatio.get() >= 3) {
    FONT_SIZE = 11 * scale;
    FONT_SIZE_Requests = 11 * scale;
    return FONT_SIZE;
  } else {
    return FONT_SIZE;
  }
};

export const screen_width: number = Dimensions.get('window').width;
export const screen_height: number = Dimensions.get('window').height;

export const wp = (val: number) => {
  return widthPercentageToDP((val * 100) / 375);
};

export const hp = (val: number) => {
  return heightPercentageToDP((val * 100) / 812);
};

export const fontSize = (val: number) => RFValue(val, 812);

export const isIos = Platform.OS === 'ios';

export function commonFontStyle(
  fontFamily: string,
  size: number,
  color: string,
): TextStyle {
  return {
    fontFamily: fontFamily,
    fontSize: fontSize(size),
    color: color,
    includeFontPadding: false,
  };
}

export const fontFamily = {
  regular: 'Poppins-Regular',
  black: 'Poppins-Black',
  bold: 'Poppins-Bold',
  extra_bold: 'Poppins-ExtraBold',
  medium: 'Poppins-Medium',
  semi_bold: 'Poppins-SemiBold',
  RobotoRegular: 'Poppins-Regular',
  RobotoMedium: 'Poppins-Medium',
  RobotoBold: 'Poppins-Bold',
  RobotoBlack: 'Poppins-Black',
  RobotoSemiBold: 'Poppins-SemiBold',
  RobotoExtraBold: 'Poppins-ExtraBold',
};

export {w, h, f};
