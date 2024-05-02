import React, {FC} from 'react';
import tw from 'rn-tailwind';
import images from 'images';
import useOtpVerify from './hooks';
import globalStyle from 'globalStyles';
import {Pressable, View} from 'react-native';
import {Image, Text, Container, OTPInput, Button} from 'components';
import {
  RESEND,
  OTP_VERIFICATION,
  NOT_RECEIVE_CODE,
  ENTER_SIX_DIGIT,
} from 'AppConstants';
import {NativeToast} from '../../utils/toast';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '..';
type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OtpVeirfy'>;
  route: RouteProp<RootStackParamList, 'OtpVeirfy'>;
};
const OtpVeirfy: FC<Props> = ({navigation, route}) => {
  const {mobileNumber} = route.params;
  const {otp, setOtp, onContinuePress} = useOtpVerify();

  return (
    <Container>
      <View style={globalStyle.subMainView}>
        <View style={globalStyle.subWrapper}>
          <Pressable
            onPress={() => navigation.goBack}
            style={[styles.crossButton, globalStyle.bothContentCenter]}>
            <Image
              resizeMode="contain"
              style={styles.crossIcon}
              source={images.CrossIcon}
            />
          </Pressable>
          <Text size="2xl" margin="mt-4" fontWeight="800">
            {OTP_VERIFICATION}
          </Text>
          <Text size="base" margin="mt-2" fontWeight="400">
            {`${ENTER_SIX_DIGIT}\n +91${mobileNumber}`}
          </Text>
          <OTPInput
            style={styles.otpInput}
            length={6}
            onChangeText={(value: string) => setOtp(value)}
          />
          <View style={styles.resendView}>
            <Text fontWeight="600" size="sm">
              {NOT_RECEIVE_CODE}
            </Text>
            <Text textStyle={'underline'} fontWeight="800" size="sm">
              {RESEND}
            </Text>
          </View>
        </View>
        <View style={globalStyle.footerButton}>
          <Button
            onPress={() => {
              if (!otp.trim()) {
                NativeToast('Please enter otp');
              } else if (otp.length < 6) {
                NativeToast('Please enter complete otp');
              } else {
                onContinuePress(mobileNumber);
              }
            }}
            lable="Continue"
          />
        </View>
      </View>
    </Container>
  );
};

const styles = {
  crossButton: tw`w-12 h-12 mt-4 bg-dimGrey rounded-full`,
  crossIcon: tw`w-6 h-6`,
  otpInput: tw`mt-5`,
  resendView: tw`w-full flex-row items-center`,
};

export default OtpVeirfy;
