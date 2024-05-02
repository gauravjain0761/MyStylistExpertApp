import {useState, useContext} from 'react';
import {RootStackParamList} from '..';
import {NativeToast} from 'utils';
import {endPoints} from '../../../config';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppContext} from 'context';
import APICaller from '../../service/apiCaller';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const useLogin = () => {
  const {setLoading} = useContext(AppContext);
  const navigation = useNavigation<NavigationProps>();
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const onLoginPress = async () => {
    setLoading(true);
    const endpoint = `${endPoints.expertLogin}`;
    const body = {
      phone: mobileNumber,
    };
    try {
      const response = await APICaller.post(endpoint, body);
      const {data} = response;
      const {status, otp} = data;
      console.log('reposnse of get OTP', response);
      if (status == 200) {
        NativeToast(`Your otp is ${otp}`);
        navigation.navigate('OtpVeirfy', {mobileNumber: mobileNumber});
      } else {
        NativeToast('Invalid phone number.');
      }
    } catch (error) {
      console.log('error of get OTP', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    mobileNumber,
    onLoginPress,
    setMobileNumber,
  };
};

export default useLogin;
