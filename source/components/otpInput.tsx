import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Animated,
  TextInput,
  Pressable,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import tw from 'rn-tailwind';

interface Props extends TextInputProps {
  length?: number;
  style?: ViewStyle;
  boxStyle?: ViewStyle;
  onChangeText: (value: string) => void;
  onSubmitEditing?: () => void;
}

const OTPInput: React.FC<Props> = ({
  onChangeText,
  onSubmitEditing,
  length = 4,
  style,
  boxStyle,
  ...props
}) => {
  const inputRef = useRef<TextInput>(null);
  const opacityValue = useRef(new Animated.Value(0)).current;
  const [otpValue, setOtpValue] = useState<string>('');
  const [inputFocus, setInputFocus] = useState<boolean>(false);

  useEffect(() => {
    toggleBlink();
  }, [otpValue]);

  const handleOTPChange = (value: string) => {
    setOtpValue(value);
    onChangeText(value);
  };

  const toggleBlink = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      {iterations: 100},
    ).start();
  };

  const setCursorIndex = useCallback(
    (index: number) => {
      const inputValue = otpValue.slice(0, index);
      setOtpValue(inputValue);
    },
    [otpValue],
  );

  return (
    <View style={[styles.wrapper, styles.wrapperCommon, style]}>
      <View style={[styles.otpBoxWrapper, styles.wrapperCommon]}>
        {[...Array(length)].map((_, index) => (
          <Pressable
            key={index}
            onPress={() => {
              inputRef.current?.focus();
              setCursorIndex(index);
            }}
            style={[
              styles.otpBox,
              boxStyle && boxStyle,
              otpValue[index] && styles.otpBoxFocus,
            ]}>
            <Text style={[styles.otpCode]}>{otpValue[index] || ''}</Text>
            {otpValue.length === index && inputFocus ? (
              <Animated.View style={[styles.cursor, {opacity: opacityValue}]} />
            ) : (
              <View />
            )}
          </Pressable>
        ))}
      </View>
      <TextInput
        {...props}
        ref={inputRef}
        value={otpValue}
        caretHidden={true}
        maxLength={length}
        keyboardType="numeric"
        returnKeyType="done"
        returnKeyLabel="Done"
        style={styles.textInput}
        onSubmitEditing={onSubmitEditing}
        onChangeText={handleOTPChange}
        onBlur={() => setInputFocus(false)}
        onFocus={() => setInputFocus(true)}
      />
    </View>
  );
};

const styles = {
  wrapperCommon: tw`items-start justify-center`,
  wrapper: tw`flex `,
  otpBoxWrapper: tw`flex-row`,
  otpBox: tw`w-13 h-13 rounded-lg	mr-2 bg-dimGrey items-center justify-center `,
  otpCode: tw`text-xl`,
  otpBoxFocus: tw`border border-slate-400 opacity-100`,
  textInput: tw` w-1 h-1 opacity-0`,
  cursor: tw`bg-primary w-0.5 h-8 absolute z-1`,
};

export default OTPInput;
