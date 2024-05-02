import {createDrawerNavigator} from '@react-navigation/drawer';
import {AppStackNavigator} from '../../screens';
import DrawerMenu from './drawerMenu';
const Drawer = createDrawerNavigator();

function AppNavigator() {
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
