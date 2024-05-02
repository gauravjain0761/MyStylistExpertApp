import React, {FC} from 'react';
import tw from 'rn-tailwind';
import images from 'images';
import useLogin from './hooks';
import {View} from 'react-native';
import {NativeToast, h} from 'utils';
import globalStyle from 'globalStyles';
import {PLEASE_LOGIN, PHONE_NUMBER} from 'AppConstants';
import {Image, Text, Container, Button, TextInput} from 'components';

const Login: FC = () => {
  const {mobileNumber, onLoginPress, setMobileNumber} = useLogin();
  return (
    <Container>
      <View style={globalStyle.mainView}>
        <View style={globalStyle.wrapper}>
          <Image
            source={images.AppLogo}
            resizeMode="contain"
            style={styles.appLogo}
          />
          <Text margin="mt-3" fontWeight="800" size="base">
            {PLEASE_LOGIN}
          </Text>
          <TextInput
            autoFocus
            returnKeyType="done"
            keyboardType="numeric"
            style={styles.input}
            placeholder={PHONE_NUMBER}
            onChangeText={value => setMobileNumber(value)}
          />
        </View>
        <View style={globalStyle.footerButton}>
          <Button
            onPress={() => {
              if (!mobileNumber) {
                NativeToast('please enter mobile no');
              } else if (mobileNumber.length < 10) {
                NativeToast('mobile no should be of 10 digits');
              } else {
                onLoginPress();
              }
            }}
            lable="Login"
          />
        </View>
      </View>
    </Container>
  );
};

const styles = {
  appLogo: tw`w-35 h-20 mt-3`,
  input: tw`w-full h-13 border rounded-lg	bg-transparent mt-6`,
};
export default Login;
