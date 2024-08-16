import {createDrawerNavigator} from '@react-navigation/drawer';
import {AppStackNavigator} from '../../screens';
import DrawerMenu from './drawerMenu';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {APICaller} from 'service';
import {endPoints} from '../../../config';

function AppNavigator() {
  const Drawer = createDrawerNavigator();

  useEffect(() => {
    getNotification();
  }, []);

  const navigation = useNavigation();

  const {messagesReads} = endPoints;

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
    console.log('typeeeeee', type);
    if (type == 'CHAT_DETAILS') {
      messagesRead(remoteMessage?.data?.value);
      navigation?.navigate('ChatDetail', {
        roomId: remoteMessage?.data?.value,
        receiverId: remoteMessage?.data?.user_id,
        receiverImage: remoteMessage?.data?.user_image,
        device_token: remoteMessage?.data?.device_token,
        receiverName: remoteMessage?.data?.name,
      });
    }
    if (type == 'appointment_notification') {
      navigation?.navigate('AppointmentDetail', {
        appointmentId: remoteMessage?.data?.value,
      });
    }
    if (type == 'appointment_reschedule') {
      navigation?.navigate('AppointmentDetail', {
        appointmentId: remoteMessage?.data?.value,
      });
    }
    if (type == 'appointment_cancellation') {
      navigation?.navigate('AppointmentDetail', {
        appointmentId: remoteMessage?.data?.value,
      });
    }
  };

  const messagesRead = async (item: string) => {
    try {
      const url = `${messagesReads}`;
      const body = {
        messageId: item,
      };
      const response = await APICaller.post(url, body);
      const {data} = response;
    } catch (error) {
      console.log('error of room', error);
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
