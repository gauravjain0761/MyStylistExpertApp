import {Dimensions, PixelRatio} from 'react-native';

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

export {w, h, f};
