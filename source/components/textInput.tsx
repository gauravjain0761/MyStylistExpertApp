import React, {FC, ReactElement, Ref} from 'react';
import tw from 'rn-tailwind';
import {
  ColorValue,
  Pressable,
  TextInput as RNInput,
  StyleSheet,
  Text,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {commonFontStyle, fontFamily, hp, wp} from '../utils/dimentions';
import Color from '../../assets/color';

interface TextInput {
  value?: string;
  autoFocus?: boolean;
  placeholder: string;
  onChangeText?: (text: string) => void;
  style?: ViewStyle;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'phone-pad';
  onSubmitEditing?: () => void;
  ref?: Ref<any>;
  maxLength?: number;
  returnKeyType?: 'done' | 'next' | 'go';
  containerStyle?: ViewStyle;
  label?: string | number;
  placeholderTextColor?: ColorValue;
  rightContent?: ReactElement;
  editable?: boolean;
  onPress?: () => void;
  innerContainer?: ViewStyle;
  multiline?: boolean;
  textAlignVertical?: 'top' | 'bottom' | 'center' | 'auto';
}

const TextInput: FC<TextInput & TextInputProps> = ({
  value,
  autoFocus,
  placeholder,
  onChangeText,
  style,
  keyboardType = 'default',
  onSubmitEditing,
  ref,
  maxLength,
  returnKeyType,
  containerStyle,
  label,
  placeholderTextColor,
  rightContent,
  editable = true,
  innerContainer,
  onPress,
  multiline,
  textAlignVertical,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text numberOfLines={1} style={styles.labelTextStyle}>
          {label}
        </Text>
      )}
      <Pressable
        onPress={onPress}
        style={[styles.innerContainer, innerContainer]}>
        <RNInput
          {...props}
          value={value}
          ref={ref}
          autoFocus={autoFocus}
          onpres
          placeholder={placeholder}
          multiline={multiline}
          placeholderTextColor={{
            ...styles.placeholdercolor,
            placeholderTextColor,
          }}
          onChangeText={onChangeText}
          editable={editable}
          keyboardType={keyboardType}
          style={[styles.textInputDefault, style]}
          onSubmitEditing={onSubmitEditing}
          maxLength={maxLength}
          textAlignVertical={textAlignVertical}
          returnKeyType={returnKeyType}
        />
        {rightContent && rightContent}
      </Pressable>
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
  textInputDefault: {
    width: 'auto',
    height: hp(60),
    paddingHorizontal: wp(20),
    ...commonFontStyle(fontFamily.medium, 16, Color.Grey66),
  },
  placeholdercolor: {
    color: Color?.Grey66,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color?.InputGrey,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Color?.GreyDE,
  },
});

export default TextInput;

// import React, {FC, Ref} from 'react';
// import tw from 'rn-tailwind';
// import {
//   TextInput as RNInput,
//   StyleSheet,
//   Text,
//   TextInputProps,
//   TextStyle,
//   View,
//   ViewStyle,
// } from 'react-native';
// import {commonFontStyle, fontFamily, hp, wp} from '../utils/dimentions';
// import Color from '../../assets/color';

// interface TextInput {
//   value?: string;
//   autoFocus?: boolean;
//   placeholder: string;
//   onChangeText?: (text: string) => void;
//   style?: ViewStyle;
//   keyboardType?:
//     | 'default'
//     | 'number-pad'
//     | 'decimal-pad'
//     | 'numeric'
//     | 'phone-pad';
//   onSubmitEditing?: () => void;
//   ref?: Ref<any>;
//   maxLength?: number;
//   returnKeyType?: 'done' | 'next' | 'go';
//   containerStyle?: ViewStyle;
//   label?: string | number;
//   placeholderTextColor?: string | TextStyle;
// }

// const TextInput: FC<TextInput & TextInputProps> = ({
//   value,
//   autoFocus,
//   placeholder,
//   onChangeText,
//   style,
//   keyboardType = 'default',
//   onSubmitEditing,
//   ref,
//   maxLength,
//   returnKeyType,
//   containerStyle,
//   label,
//   placeholderTextColor,
//   ...props
// }) => {
//   return (
//     <View style={[styles.container, containerStyle]}>
//       {label && (
//         <Text numberOfLines={1} style={styles.labelTextStyle}>
//           {label}
//         </Text>
//       )}
//       <RNInput
//         {...props}
//         value={value}
//         ref={ref}
//         autoFocus={autoFocus}
//         placeholder={placeholder}
//         placeholderTextColor={[styles.placeholdercolor, placeholderTextColor]}
//         onChangeText={onChangeText}
//         keyboardType={keyboardType}
//         style={[styles.textInputDefault, style]}
//         onSubmitEditing={onSubmitEditing}
//         maxLength={maxLength}
//         returnKeyType={returnKeyType}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: hp(25),
//   },
//   labelTextStyle: {
//     ...commonFontStyle(fontFamily.medium, 16, Color?.Black),
//     marginBottom: hp(12),
//   },
//   textInputDefault: {
//     width: '100%',
//     height: hp(60),
//     backgroundColor: Color?.InputGrey,
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: Color?.GreyDE,
//     paddingHorizontal: wp(20),
//   },
//   placeholdercolor: {
//     color: Color?.Grey66,
//   },
// });

// export default TextInput;
