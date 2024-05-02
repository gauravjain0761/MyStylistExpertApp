import React, {FC} from 'react';
import globalStyle from '../globalStyles';
import FastImage, {FastImageProps} from 'react-native-fast-image';

const EImage: FC<FastImageProps> = ({source, style, resizeMode}) => {
  return (
    <FastImage
      source={source}
      resizeMode={resizeMode}
      style={style || globalStyle.defaultImage}
    />
  );
};

EImage.defaultProps = {
  resizeMode: 'contain',
};

export default EImage;
