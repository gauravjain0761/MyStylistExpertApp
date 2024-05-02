import {useContext, useState} from 'react';
import {endPoints} from '../../../config';
import {NativeToast} from '../../utils/toast';
import {AppContext} from 'context';
import APICaller from '../../service/apiCaller';
import DataAccess from '../../dataAccess';

const useOtpVerify = () => {
  const {setUserDetailsToStorage, setUserLoginToStorage} = DataAccess();
  const {setLoading, setUserDetails, setIsLogin} = useContext(AppContext);
  const [otp, setOtp] = useState<string>('');

  const onContinuePress = async (mobileNumber: string) => {
    setLoading(true);
    const endpoint = `${endPoints.verifyOtp}`;
    const body = {
      phone: mobileNumber,
      otp: otp,
      device_token: 'gurwinder token',
    };
    try {
      const response = await APICaller.post(endpoint, body);
      const {data, status} = response;
      console.log('response of verify otp', response);
      const {success, token, userId, user} = data;
      const {business_type, email, gender, name, phone, role} = user || {};
      const details = {
        userId,
        token,
      };
      if (status == 200 && success) {
        setIsLogin('true');
        setUserDetails(details);
        setUserDetailsToStorage(details);
        setUserLoginToStorage('true');
        NativeToast('Login success');
      }
    } catch (error) {
      console.log('error of verify otp', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    otp,
    setOtp,
    onContinuePress,
  };
};

export default useOtpVerify;
