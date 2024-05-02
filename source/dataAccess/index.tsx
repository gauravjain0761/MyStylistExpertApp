import {UserDetail} from 'types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IS_LOGIN = 'IS_LOGIN';
const USER_DETAILS = 'USER_DETAILS';

const DataAccess = () => {
  const setUserDetailsToStorage = async (userDetails: UserDetail) => {
    const details = JSON.stringify(userDetails);
    await AsyncStorage.setItem(USER_DETAILS, details);
  };

  const getUserDetails = async () => {
    const details: string | null = await AsyncStorage.getItem(USER_DETAILS);
    const userDetails = JSON.parse(details || '{}');
    return userDetails;
  };

  const setUserLoginToStorage = async (param: string) => {
    await AsyncStorage.setItem(IS_LOGIN, param);
  };

  const getUserLogin = async () => {
    const isLogin = await AsyncStorage.getItem(IS_LOGIN);
    return isLogin || 'false';
  };

  return {
    getUserLogin,
    getUserDetails,
    setUserLoginToStorage,
    setUserDetailsToStorage,
  };
};

export default DataAccess;
