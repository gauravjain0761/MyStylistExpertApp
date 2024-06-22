import {createDrawerNavigator} from '@react-navigation/drawer';
import {AppStackNavigator} from '../../screens';
import DrawerMenu from './drawerMenu';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';

function AppNavigator() {
  const Drawer = createDrawerNavigator();
  const navigation = useNavigation();

  useEffect(() => {
    getNotification();
  }, []);

  const getNotification = async () => {
    await messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage) {
          CheckNotification(remoteMessage);
        }
      });
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        CheckNotification(remoteMessage);
      }
    });
  };

  const CheckNotification = (remoteMessage: any) => {
    let type = remoteMessage?.data?.action;
    if (type == 'CHAT_DETAILS') {
      navigation.navigate('ChatDetail', {
        roomId: remoteMessage?.data?.value,
        receiverId: remoteMessage?.data?.user_id,
        receiverImage: remoteMessage?.data?.user_image,
        device_token: remoteMessage?.data?.device_token,
        receiverName: remoteMessage?.data?.name,
      });
    }
    if (type == 'appointment_notification') {
      console.log('kokkokoko', remoteMessage?.data?.value);
      navigation.navigate('AppointmentDetail', {
        appointmentId: remoteMessage?.data?.value,
      });
    }
  };
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
