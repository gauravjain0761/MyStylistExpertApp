import {
  Image,
  ImageBackground,
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useContext, useEffect, useState} from 'react';
import images from 'images';
import {
  commonFontStyle,
  fontFamily,
  fontSize,
  h,
  hp,
  isIos,
  screen_height,
  wp,
} from '../../utils/dimentions';
import Color from '../../../assets/color';
import {TODAY_IS_NEW} from 'AppConstants';
import {Dropdown} from 'react-native-element-dropdown';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Button from '../../components/button';
import PrimaryButton from '../../components/PrimaryButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '..';
import {RouteProp} from '@react-navigation/native';
import {Login_Input} from 'components';
import {AppContext} from 'context';
import {useAppDispatch} from 'store';
import {expertLogin} from '../../Actions/authAction';
import {NativeToast} from '../../utils/toast';
import DataAccess from '../../dataAccess';
import messaging from '@react-native-firebase/messaging';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
  route: RouteProp<RootStackParamList, 'Login'>;
};

const Login: FC<Props> = ({navigation}) => {
  const [name, setname] = useState('');
  const [passwords, setPasswords] = useState('');
  const dispatch = useAppDispatch();
  const [DeviceToken, setDeviceToken] = useState();

  const {setLoading, setIsLogin, setUserDetails} = useContext(AppContext);
  const {setUserLoginToStorage, setUserDetailsToStorage} = DataAccess();

  async function requestNotificationUserPermission() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      if (authStatus === 1) {
        if (Platform.OS === 'ios') {
          await messaging()
            .registerDeviceForRemoteMessages()
            .then(async () => {
              getFirebaseToken();
            })
            .catch(() => {
              getFirebaseToken();
            });
        } else {
          getFirebaseToken();
        }
      } else {
        await messaging().requestPermission();
      }
    } else {
      await messaging().requestPermission();
      NativeToast('Please allow to notifications permission');
    }
  }

  const getFirebaseToken = async () => {
    await messaging()
      .getToken()
      .then((fcmToken: any) => {
        if (fcmToken) {
          console.log('---fcmToken---:', fcmToken);
          console.log(fcmToken.toString());
          setDeviceToken(fcmToken);
        } else {
          NativeToast('[FCMService] User does not have a device token');
        }
      })
      .catch((error: any) => {
        let err = `FCm token get error${error}`;
        // infoToast(error.toString());
        console.log(err);
      });
  };

  useEffect(() => {
    requestNotificationUserPermission();
  }, []);

  const onLoginPress = () => {
    const obj = {
      data: {
        username: name.trim(),
        password: passwords.trim(),
      },
      onSuccess: (res: any) => {
        setUserDetails(res);
        setUserDetailsToStorage(res);
        setLoading(false);
        setUserLoginToStorage('true');
        setIsLogin('true');
        NativeToast('Login success');
      },
      onFailure: (Err: any) => {
        NativeToast(Err?.data?.message);
        setLoading(false);
      },
    };
    if (name.trim().length == 0) {
      NativeToast('Enter Valid Name');
    } else if (passwords.trim().length == 0) {
      NativeToast('Enter Valid Password');
    } else {
      setLoading(true);
      dispatch(expertLogin(obj));
    }
  };

  const onPressSigup = () => {
    Linking.openURL('https://onboarding.mystylist.in/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.bgcontainer}>
        <Image
          resizeMode="cover"
          style={styles?.bgimage}
          source={images?.loginbg}></Image>
      </View>
      <ImageBackground
        source={images?.gradient_model}
        resizeMode="cover"
        style={styles.gradientmodal}>
        <View style={styles?.detailsContainer}>
          <Text style={styles.title}>{'Welcome 👋'}</Text>
          <Text style={styles.description}>{TODAY_IS_NEW}</Text>
          <KeyboardAwareScrollView
            style={{flex: 1}}
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}
            enableAutomaticScroll>
            <Login_Input
              onTextChange={(e: string) => setname(e)}
              value={name}
              placeholder="Enter here"
              label="Username"
              input_container_style={styles?.inputs}
            />
            <Login_Input
              onTextChange={(e: string) => setPasswords(e)}
              value={passwords}
              placeholder="Enter here"
              label="Password"
              input_container_style={styles?.inputs}
            />
            <PrimaryButton
              containerStyle={styles.btncontainer}
              label="Login"
              containerLabelStyle={styles.btnTitle}
              onPress={onLoginPress}
            />
            <TouchableOpacity onPress={onPressSigup} style={styles.signupBtn}>
              <Text style={styles.signup}>{'Signup'}</Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgimage: {
    width: '100%',
    height: hp(screen_height * 0.5),
  },
  gradientmodal: {
    width: '100%',
    height: hp(screen_height * 0.66),
    position: 'absolute',
    borderTopLeftRadius: wp(40),
    borderTopRightRadius: wp(40),
    overflow: 'hidden',
    flex: 1,
    bottom: 0,
  },
  bgcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: hp(39),
    ...commonFontStyle(fontFamily.bold, 40, Color.White),
    lineHeight: hp(49),
  },
  detailsContainer: {
    paddingHorizontal: wp(42),
    flex: 1,
  },
  inputs: {
    marginTop: hp(22),
  },
  description: {
    ...commonFontStyle(fontFamily.regular, 14.33, Color?.GreyAA),
    lineHeight: hp(17.34),
    marginTop: hp(7),
    marginBottom: hp(8),
  },
  dropdown: {
    height: hp(55),
    borderRadius: wp(6),
    paddingHorizontal: wp(16),
    width: wp(280),
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderStyle: {
    ...commonFontStyle(fontFamily.regular, 16, Color?.GreyA4),
  },
  iconStyle: {
    width: wp(12),
    height: wp(12),
    tintColor: Color.GreyA4,
  },
  item_style: {
    ...commonFontStyle(fontFamily.regular, 16, Color.Black),
  },
  selectedTextStyle: {
    ...commonFontStyle(fontFamily.regular, 16, Color?.GreyA4),
  },
  btnTitle: {
    ...commonFontStyle(fontFamily.medium, 20, Color.Grey44),
  },
  btncontainer: {
    marginTop: hp(34),
  },
  signup: {
    ...commonFontStyle(fontFamily.medium, 20, Color?.Grey70),
  },
  signupBtn: {
    paddingVertical: hp(5),
    marginTop: hp(25),
    alignSelf: 'center',
  },
});

// import React, {FC} from 'react';
// import tw from 'rn-tailwind';
// import images from 'images';
// import useLogin from './hooks';
// import {View} from 'react-native';
// import {NativeToast, h} from 'utils';
// import globalStyle from 'globalStyles';
// import {PLEASE_LOGIN, PHONE_NUMBER} from 'AppConstants';
// import {Image, Text, Container, Button, TextInput} from 'components';

// const Login: FC = () => {
//   const {mobileNumber, onLoginPress, setMobileNumber} = useLogin();
//   return (
//     <Container>
//       <View style={globalStyle.mainView}>
//         <View style={globalStyle.wrapper}>
//           <Image
//             source={images.AppLogo}
//             resizeMode="contain"
//             style={styles.appLogo}
//           />
//           <Text margin="mt-3" fontWeight="800" size="base">
//             {PLEASE_LOGIN}
//           </Text>
//           <TextInput
//             autoFocus
//             returnKeyType="done"
//             keyboardType="numeric"
//             style={styles.input}
//             placeholder={PHONE_NUMBER}
//             onChangeText={value => setMobileNumber(value)}
//           />
//         </View>
//         <View style={globalStyle.footerButton}>
//           <Button
//             onPress={() => {
//               if (!mobileNumber) {
//                 NativeToast('please enter mobile no');
//               } else if (mobileNumber.length < 10) {
//                 NativeToast('mobile no should be of 10 digits');
//               } else {
//                 onLoginPress();
//               }
//             }}
//             lable="Login"
//           />
//         </View>
//       </View>
//     </Container>
//   );
// };

// const styles = {
//   appLogo: tw`w-35 h-20 mt-3`,
//   input: tw`w-full h-13 border rounded-lg	bg-transparent mt-6`,
// };
// export default Login;
