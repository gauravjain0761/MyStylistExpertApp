import React, {FC, useEffect, useMemo, useState} from 'react';
import store from 'store';
import tw from 'rn-tailwind';
import {View} from 'react-native';
import {UserDetail} from 'types';
import Navigator from 'navigator';
import {Loader} from 'components';
import {Provider} from 'react-redux';
import {StatusBar} from 'expo-status-bar';
import {useDeviceContext} from 'twrnc';
import {AppContext} from './source/context';
import DataAccess from './source/dataAccess';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App: FC = () => {
  useDeviceContext(tw);

  const [isLogin, setIsLogin] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [activeRoute, setActiveRoute] = useState<string>('Home');
  const [userDetails, setUserDetails] = useState<UserDetail>();
  const [location, setLocation] = useState([]);

  const context = useMemo(
    () => ({
      isLogin,
      loading,
      setIsLogin,
      setLoading,
      activeRoute,
      userDetails,
      setActiveRoute,
      setUserDetails,
      setLocation,
      location,
    }),
    [
      isLogin,
      loading,
      setIsLogin,
      setLoading,
      activeRoute,
      setActiveRoute,
      userDetails,
      setUserDetails,
      setLocation,
      location,
    ],
  );

  return (
    <AppContext.Provider value={context}>
      <Provider store={store}>
        <SafeAreaProvider>
          <Navigator />
          <StatusBar style={'dark'} />
          {loading ? <Loader /> : <View />}
        </SafeAreaProvider>
      </Provider>
    </AppContext.Provider>
  );
};

export default App;
