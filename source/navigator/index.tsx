import React, {FC, useContext, useEffect} from 'react';
import {AppContext} from 'context';
import {AuthNavigator} from '../screens';
import AppNavigator from './drawer';
import DataAccess, {getAsyncLocation} from '../dataAccess';
import RNBootSplash from 'react-native-bootsplash';
import {
  createNavigationContainerRef,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';

const Navigator: FC = () => {
  const {
    isLogin,
    setUserDetails,
    setIsLogin,
    setActiveRoute,
    setLocation,
    activeRoute,
  } = useContext(AppContext);
  const {getUserLogin, getUserDetails} = DataAccess();
  const navigationRef = createNavigationContainerRef();

  const getUserDetailsFromStorage = async () => {
    const userDetails = await getUserDetails();
    const locations = await getAsyncLocation();
    const isLogin = await getUserLogin();
    setUserDetails(userDetails);
    setIsLogin(isLogin);
    setLocation(locations);
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
      ref={navigationRef}
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
