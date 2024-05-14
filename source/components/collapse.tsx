import {
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import {commonFontStyle, fontFamily, hp, wp} from '../utils/dimentions';
import Color from '../../assets/color';
import images from 'images';

interface Props {
  style?: string;
  children?: React.ReactNode;
  title?: string;
}

const Collapse: FC<Props> = ({children, style, title = 'Title'}) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  const onPressArrow = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.maincontainer}>
      <TouchableOpacity onPress={onPressArrow} style={styles.headerRowStyle}>
        <Text style={styles.titleTextStyle}>{title}</Text>
        <View
          style={{
            ...styles.arrow,
            transform: [{rotate: expanded ? '0deg' : '60deg'}],
          }}>
          <Image source={images?.collapseArrow} style={styles.arrow} />
        </View>
      </TouchableOpacity>
      {expanded ? children : null}
    </View>
  );
};

export default Collapse;

const styles = StyleSheet.create({
  headerRowStyle: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: wp(22),
  },
  titleTextStyle: {
    ...commonFontStyle(fontFamily.semi_bold, 20, Color?.Black),
    lineHeight: hp(20),
  },
  arrow: {
    width: wp(12),
    height: wp(9),
    right: wp(4),
  },
  maincontainer: {},
});
