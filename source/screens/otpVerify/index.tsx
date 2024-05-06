import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useContext, useState} from 'react';
import Container from '../../components/container';
import {
  commonFontStyle,
  fontFamily,
  hp,
  screen_height,
  screen_width,
  wp,
} from '../../utils/dimentions';
import images from 'images';
import Color from '../../../assets/color';
import {DIDNT_RECEIVE_OTP, ENTER_THE_6_DIGIT, VERIFY_OTP} from 'AppConstants';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '..';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {AppContext} from 'context';
import {Login_Input} from 'components';

const CELL_COUNT = 6;

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OtpVeirfy'>;
  route: RouteProp<RootStackParamList, 'OtpVeirfy'>;
};

const OtpVeirfy: FC<Props> = () => {
  const [value, setValue] = useState<string>('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const {setLoading, setIsLogin} = useContext(AppContext);

  const backHandler = () => {
    navigation.goBack();
  };

  const onFill = () => {
    setIsLogin('true');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={images?.gradient_bg} style={styles.imagebg}>
        <TouchableOpacity style={styles?.back_arrow} onPress={backHandler}>
          <Image
            source={images?.Back}
            style={styles.arrow_img}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <View style={styles.otp_title_conatiner}>
          <Text style={styles.otp_title}>{VERIFY_OTP}</Text>
          <Text style={styles.otp_info}>{ENTER_THE_6_DIGIT}</Text>
          <Text style={styles.number}>{'91**********2'}</Text>
        </View>
        <View style={styles?.input_container}>
          <Login_Input
            input_container_style={styles.input_con_style}
            placeholder=""
            label="OTP"
            custom_component={
              <CodeField
                ref={ref}
                {...props}
                onBlur={onFill}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                  <Text
                    key={index}
                    style={[styles.cell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : '-')}
                  </Text>
                )}
              />
            }
          />
        </View>
        <View style={styles?.resend_otp_conatiner}>
          <Text style={styles?.didnt_otp_title}>{DIDNT_RECEIVE_OTP}</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles?.resend_otp_title}>{'Resend OTP'}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default OtpVeirfy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagebg: {
    flex: 1,
  },
  back_arrow: {
    marginTop: hp(61),
    marginLeft: wp(26),
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  arrow_img: {
    width: wp(28),
    height: wp(28),
    tintColor: Color?.White,
  },
  otp_title: {
    ...commonFontStyle(fontFamily.semi_bold, 40.33, Color?.White),
    lineHeight: hp(49),
  },
  otp_info: {
    ...commonFontStyle(fontFamily.medium, 14.33, Color?.GreyAA),
    lineHeight: hp(24),
    marginTop: hp(6),
  },
  otp_title_conatiner: {
    paddingLeft: wp(51),
    marginTop: hp(28),
  },
  number: {
    ...commonFontStyle(fontFamily.medium, 14.33, Color?.GreyAA),
    lineHeight: hp(24),
  },
  input_container: {
    // paddingLeft: wp(51),
    marginHorizontal: wp(50),
    marginTop: hp(58),
  },
  input_con_style: {
    marginTop: wp(14),
  },
  resend_otp_conatiner: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(91),
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    textAlign: 'center',
    color: Color?.GreyA4,
  },
  didnt_otp_title: {
    ...commonFontStyle(fontFamily.medium, 16, 'rgba(rgba(164, 164, 164, 0.6))'),
    marginBottom: hp(15),
  },
  resend_otp_title: {
    ...commonFontStyle(fontFamily.semi_bold, 16, Color?.White),
    textDecorationLine: 'underline',
  },
});

// import React, {FC} from 'react';
// import tw from 'rn-tailwind';
// import images from 'images';
// import useOtpVerify from './hooks';
// import globalStyle from 'globalStyles';
// import {Pressable, View} from 'react-native';
// import {Image, Text, Container, OTPInput, Button} from 'components';
// import {
//   RESEND,
//   OTP_VERIFICATION,
//   NOT_RECEIVE_CODE,
//   ENTER_SIX_DIGIT,
// } from 'AppConstants';
// import {NativeToast} from '../../utils/toast';
// import {RouteProp} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {RootStackParamList} from '..';
// type Props = {
//   navigation: NativeStackNavigationProp<RootStackParamList, 'OtpVeirfy'>;
//   route: RouteProp<RootStackParamList, 'OtpVeirfy'>;
// };
// const OtpVeirfy: FC<Props> = ({navigation, route}) => {
//   const {mobileNumber} = route.params;
//   const {otp, setOtp, onContinuePress} = useOtpVerify();

//   return (
//     <Container>
//       <View style={globalStyle.subMainView}>
//         <View style={globalStyle.subWrapper}>
//           <Pressable
//             onPress={() => navigation.goBack}
//             style={[styles.crossButton, globalStyle.bothContentCenter]}>
//             <Image
//               resizeMode="contain"
//               style={styles.crossIcon}
//               source={images.CrossIcon}
//             />
//           </Pressable>
//           <Text size="2xl" margin="mt-4" fontWeight="800">
//             {OTP_VERIFICATION}
//           </Text>
//           <Text size="base" margin="mt-2" fontWeight="400">
//             {`${ENTER_SIX_DIGIT}\n +91${mobileNumber}`}
//           </Text>
//           <OTPInput
//             style={styles.otpInput}
//             length={6}
//             onChangeText={(value: string) => setOtp(value)}
//           />
//           <View style={styles.resendView}>
//             <Text fontWeight="600" size="sm">
//               {NOT_RECEIVE_CODE}
//             </Text>
//             <Text textStyle={'underline'} fontWeight="800" size="sm">
//               {RESEND}
//             </Text>
//           </View>
//         </View>
//         <View style={globalStyle.footerButton}>
//           <Button
//             onPress={() => {
//               if (!otp.trim()) {
//                 NativeToast('Please enter otp');
//               } else if (otp.length < 6) {
//                 NativeToast('Please enter complete otp');
//               } else {
//                 onContinuePress(mobileNumber);
//               }
//             }}
//             lable="Continue"
//           />
//         </View>
//       </View>
//     </Container>
//   );
// };

// const styles = {
//   crossButton: tw`w-12 h-12 mt-4 bg-dimGrey rounded-full`,
//   crossIcon: tw`w-6 h-6`,
//   otpInput: tw`mt-5`,
//   resendView: tw`w-full flex-row items-center`,
// };

// export default OtpVeirfy;
