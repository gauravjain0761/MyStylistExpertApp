import {UserDetail} from 'types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IS_LOGIN = 'IS_LOGIN';
const USER_DETAILS = 'USER_DETAILS';

export const asyncKeys = {
  // clear in logout time
  token: '@token',
  user_info: '@user_info',
  location: '@location',
  Coord: '@coord',
  device_token: '@device_token',
  // no clear in logout time
};

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

  const setAsyncToken = async (token: string) => {
    await AsyncStorage.setItem(asyncKeys.token, JSON.stringify(token));
  };

  const getAsyncToken = async () => {
    const token = await AsyncStorage.getItem(asyncKeys.token);
    if (token) {
      return 'Bearer ' + JSON.parse(token);
    } else {
      return null;
    }
  };

  return {
    getUserLogin,
    getUserDetails,
    setUserLoginToStorage,
    setUserDetailsToStorage,
    setAsyncToken,
    getAsyncToken,
  };
};

export const setAsyncLocation = async (location: any) => {
  await AsyncStorage.setItem(asyncKeys.location, JSON.stringify(location));
};

export const getAsyncLocation = async () => {
  const userlocation = await AsyncStorage.getItem(asyncKeys.location);
  if (userlocation) {
    return JSON.parse(userlocation);
  } else {
    return null;
  }
};

export const setAsyncCoord = async (location: any) => {
  await AsyncStorage.setItem(asyncKeys.Coord, JSON.stringify(location));
};

export const getAsyncCoord = async () => {
  const locationCoord = await AsyncStorage.getItem(asyncKeys.Coord);
  if (locationCoord) {
    return JSON.parse(locationCoord);
  } else {
    return null;
  }
};

export const setAsyncDevice_token = async (token: any) => {
  await AsyncStorage.setItem(asyncKeys.device_token, JSON.stringify(token));
};

export const getAsyncDevice_token = async () => {
  const device_token = await AsyncStorage.getItem(asyncKeys.device_token);
  if (device_token) {
    return device_token;
  } else {
    return null;
  }
};

export default DataAccess;
