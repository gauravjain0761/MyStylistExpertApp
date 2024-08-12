import {createDrawerNavigator} from '@react-navigation/drawer';
import {AppStackNavigator} from '../../screens';
import DrawerMenu from './drawerMenu';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';

function AppNavigator() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerMenu props={props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {width: '75%'},
      }}>
      <Drawer.Screen name={'Stack'} component={AppStackNavigator} />
    </Drawer.Navigator>
  );
}

export default AppNavigator;
