import React, {FC} from 'react';
import tw from 'rn-tailwind';
import {TextInput as RNInput, TextInputProps} from 'react-native';

const TextInput: FC<TextInputProps> = ({
  value,
  autoFocus,
  placeholder,
  onChangeText,
  style,
  ...props
}) => {
  return (
    <RNInput
      {...props}
      value={value}
      autoFocus={autoFocus}
      placeholder={placeholder}
      onChangeText={onChangeText}
      style={[styles.textInputDefault, style]}
    />
  );
};

const styles = {
  textInputDefault: tw`w-full h-12 rounded-lg bg-white pl-3`,
};

export default TextInput;
