import React, {FC, useContext, useEffect} from 'react';
import {AppContext} from 'context';
import {AuthNavigator} from '../screens';
import AppNavigator from './drawer';
import DataAccess from '../dataAccess';
import RNBootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';

const Navigator: FC = () => {
  const {isLogin, setUserDetails, setIsLogin, setActiveRoute} =
    useContext(AppContext);
  const {getUserLogin, getUserDetails} = DataAccess();

  const getUserDetailsFromStorage = async () => {
    const userDetails = await getUserDetails();
    const isLogin = await getUserLogin();
    setUserDetails(userDetails);
    setIsLogin(isLogin);
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 500);
  };

  useEffect(() => {
    getUserDetailsFromStorage();
  }, []);

  return (
    <NavigationContainer
      onReady={() => {}}
      onStateChange={state => {
        const routes = state?.routes[0]?.state?.routes;
        const lengthRoute = routes?.length;
        if (lengthRoute) {
          const {name} = routes[lengthRoute - 1];
          setActiveRoute(name);
        }
      }}>
      {isLogin == 'true' ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Navigator;
