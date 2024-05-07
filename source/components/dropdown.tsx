import {
  Image,
  ReturnKeyType,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {commonFontStyle, fontFamily, hp, wp} from '../utils/dimentions';
import Color from '../../assets/color';
import images from 'images';

type InputProps = {
  placeholder: string;
  label?: string;
  value?: any;
  rest?: TextInputProps[];
  inputRef?: any;
  DropDownStyle?: ViewStyle;
  data?: any;
  labelField?: string | any;
  valueField?: string | any;
  labelTextStyle?: ViewStyle;
  onChange?: any;
  containerStyle?: ViewStyle;
  iconStyle?: ViewStyle;
  icon?: any;
};

const DropDown: FC<InputProps> = ({
  placeholder = 'Please select',
  label,
  DropDownStyle,
  value,
  data,
  labelField,
  valueField,
  labelTextStyle,
  onChange,
  containerStyle,
  iconStyle,
  icon = images?.DownArrow,
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text numberOfLines={1} style={[styles.labelTextStyle, labelTextStyle]}>
          {label}
        </Text>
      )}
      <Dropdown
        style={[styles.dropdown, DropDownStyle]}
        placeholderStyle={styles.placeholderStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField={labelField}
        valueField={valueField}
        placeholder={placeholder}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.item_style}
        value={value}
        onChange={onChange}
        renderRightIcon={() => (
          <Image resizeMode="contain" style={styles.iconStyle} source={icon} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: hp(25),
  },
  labelTextStyle: {
    ...commonFontStyle(fontFamily.semi_bold, 16, Color?.Black),
    marginBottom: hp(12),
  },
  inputStyle: {
    flex: 1,
    padding: 0,
    ...commonFontStyle(fontFamily.medium, 18, Color.Black),
  },
  dropdown: {
    height: hp(60),
    borderWidth: wp(1),
    paddingHorizontal: wp(20),
    borderRadius: 6,
    borderColor: Color?.GreyDE,
    backgroundColor: Color?.InputGrey,
  },
  placeholderStyle: {
    ...commonFontStyle(fontFamily.medium, 16, Color.Grey66),
  },
  selectedTextStyle: {
    ...commonFontStyle(fontFamily.medium, 16, Color.Grey66),
  },
  iconStyle: {
    width: wp(16),
    height: wp(16),
    tintColor: Color?.Grey66,
  },
  item_style: {
    ...commonFontStyle(fontFamily.medium, 16, Color.Grey66),
  },
});

export default DropDown;
