import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import tw from 'rn-tailwind';
import images from 'images';
import globalStyle from 'globalStyles';
import {
  Pressable,
  FlatList,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import {Header, Image, AppointmentCard, Container, Button} from 'components';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '..';
import {RouteProp} from '@react-navigation/native';
import useAppointment from './hooks';
import {
  commonFontStyle,
  fontFamily,
  hp,
  screen_height,
  wp,
} from '../../utils/dimentions';
import Color from '../../../assets/color';
import FilterSheet from '../../bottomSheets/filterSheet';
import {useAppDispatch, useAppSelector} from 'store';
import {AppContext} from 'context';
import {NativeToast} from '../../utils/toast';
import {
  getPastAppointment,
  getUpcomingAppointment,
} from '../../Actions/appointmentAction';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Appointments'>;
  route: RouteProp<RootStackParamList, 'Appointments'>;
};

const Allappointment = [
  {
    _id: 1,
    bookingNumber: '050',
    customerName: 'Harleen Kaur',
    status: 'Upcoming',
    services: 'Haircut, Facial, Beard Styling...',
    createdAt: Date.now(),
    amount: 400,
    featured_image: images?.wom1,
  },
  {
    _id: 2,
    bookingNumber: '050',
    customerName: 'Jaspreet Kaur',
    status: 'Upcoming',
    services: 'Haircut, Classic shaving',
    createdAt: Date.now(),
    amount: 500,
    featured_image: images?.wom2,
  },
];

const Appointments: FC<Props> = ({navigation}) => {
  const {appointment} = useAppSelector(state => state?.home);
  const {past_appointment} = useAppSelector(state => state?.appointment);
  const [activeTab, setActiveTab] = useState<string>('Upcoming');
  const [visible, setVisible] = useState(false);
  const [upcomingAppointment, setUpcomingAppointment] = useState(appointment);
  const [pastAppointment, setPastAppointment] = useState(past_appointment);

  const dispatch = useAppDispatch();
  const {setLoading, userDetails} = useContext(AppContext);

  useEffect(() => {
    getAllPastAppointments(true);
  }, []);

  const onPressFilter = () => {
    setVisible(!visible);
  };

  const getAllUpcommingAppointments = useCallback((isLogin: boolean) => {
    let obj = {
      data: {
        expertId: userDetails?.userId,
        limit: 10,
        page: 1,
      },
      onSuccess: (res: any) => {
        setLoading(false);
      },
      onFailure: (Err: any) => {
        setLoading(false);
        NativeToast(Err?.data?.message);
      },
    };
    dispatch(getUpcomingAppointment(obj));
  }, []);

  const getAllPastAppointments = useCallback((isLogin: boolean) => {
    setLoading(isLogin);
    let obj = {
      data: {
        expertId: userDetails?.userId,
        limit: 10,
        page: 1,
      },
      onSuccess: (res: any) => {
        setLoading(false);
      },
      onFailure: (Err: any) => {
        setLoading(false);
        NativeToast(Err?.data?.message);
      },
    };
    dispatch(getPastAppointment(obj));
  }, []);

  return (
    <Container>
      <View style={globalStyle.container}>
        <Header
          title="Appointments"
          rightView={
            <View style={styles.headerRight}>
              <Pressable onPress={onPressFilter} style={[styles.headerButton]}>
                <Image
                  style={styles.searchIcon}
                  source={images.CalendarIcon}
                  resizeMode="contain"
                />
              </Pressable>
              <Pressable style={[styles.headerButton]}>
                <Image
                  style={styles.searchIcon}
                  source={images.headerSearch}
                  resizeMode="contain"
                />
              </Pressable>
            </View>
          }
        />
        <View style={styles.mainView}>
          <View style={styles.topButtons}>
            <View style={[styles.buttonWrapper, globalStyle.bothContentCenter]}>
              <Pressable
                onPress={() => {
                  setActiveTab('Upcoming');
                }}
                style={[
                  tw`bg-${
                    activeTab === 'Upcoming' ? 'primary' : 'transparent'
                  } flex-1 h-10`,
                  styles.buttoncontainer,
                ]}>
                <Text
                  style={[
                    activeTab === 'Upcoming'
                      ? styles.focuselabel
                      : styles.label,
                  ]}>
                  Upcoming
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setActiveTab('Past');
                }}
                style={[
                  tw`bg-${
                    activeTab === 'Past' ? 'primary' : 'transparent'
                  } flex-1 h-10`,
                  styles.buttoncontainer,
                ]}>
                <Text
                  style={[
                    activeTab === 'Past' ? styles.focuselabel : styles.label,
                  ]}>
                  Past
                </Text>
              </Pressable>
            </View>
          </View>
          {activeTab == 'Upcoming' ? (
            <FlatList
              data={upcomingAppointment}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => {
                return <View style={styles.listSeparator} />;
              }}
              ListEmptyComponent={
                <View style={styles?.empty}>
                  <Text style={styles?.emptyTitle}>
                    No Upcoming Appointments found
                  </Text>
                </View>
              }
              contentContainerStyle={styles.listContainer}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <AppointmentCard
                    data={item}
                    key={index}
                    fullWidth={true}
                    onPreeCard={(appointmentId: string) =>
                      navigation.navigate('AppointmentDetail', {appointmentId})
                    }
                    status={activeTab === 'Upcoming' ? 'Upcoming' : 'Past'}
                  />
                );
              }}
            />
          ) : (
            <FlatList
              data={pastAppointment}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles?.empty}>
                  <Text style={styles?.emptyTitle}>
                    No Past Appointments found
                  </Text>
                </View>
              }
              ItemSeparatorComponent={() => {
                return <View style={styles.listSeparator} />;
              }}
              contentContainerStyle={styles.listContainer}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <AppointmentCard
                    data={item}
                    key={index}
                    fullWidth={true}
                    onPreeCard={(appointmentId: string) =>
                      navigation.navigate('AppointmentDetail', {appointmentId})
                    }
                    status={activeTab === 'Upcoming' ? 'Upcoming' : 'Past'}
                  />
                );
              }}
            />
          )}
        </View>
        <FilterSheet visible={visible} setVisibility={setVisible} />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  headerRight: tw`flex-1 w-full h-full flex-row items-center justify-end`,
  headerButton: tw`w-10 h-full items-end justify-center`,
  searchIcon: tw`w-6.5 h-6.5`,
  mainView: {...tw`w-full h-full flex-1 bg-white`, marginTop: hp(13)},
  topButtons: {...tw`w-full items-center`, paddingHorizontal: wp(25)},
  buttonWrapper: tw`w-full px-3 h-17 rounded-lg bg-aliceBlue flex-row`,
  listContainer: tw`py-5`,
  listSeparator: {
    height: hp(25),
  },
  buttoncontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(4),
  },
  focuselabel: {
    ...commonFontStyle(fontFamily.semi_bold, 14, Color?.Black),
    lineHeight: hp(17),
  },
  label: {
    ...commonFontStyle(fontFamily.medium, 14, Color?.Black),
  },
  empty: {
    height: hp(screen_height * 0.8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    ...commonFontStyle(fontFamily.medium, 14, Color?.Black),
  },
});

export default Appointments;

// import React, {FC, useEffect, useState} from 'react';
// import tw from 'rn-tailwind';
// import images from 'images';
// import globalStyle from 'globalStyles';
// import {Pressable, FlatList, View} from 'react-native';
// import {Header, Image, AppointmentCard, Container, Button} from 'components';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {RootStackParamList} from '..';
// import {RouteProp} from '@react-navigation/native';
// import useAppointment from './hooks';

// type Props = {
//   navigation: NativeStackNavigationProp<RootStackParamList, 'Appointments'>;
//   route: RouteProp<RootStackParamList, 'Appointments'>;
// };

// const Appointments: FC<Props> = ({navigation}) => {
//   const {appointments, getAllAppointments} = useAppointment();
//   const [activeTab, setActiveTab] = useState<string>('Upcoming');

//   useEffect(() => {
//     getAllAppointments();
//   }, []);

//   return (
//     <Container>
//       <View style={globalStyle.container}>
//         <Header
//           title="Appointments"
//           rightView={
//             <View style={styles.headerRight}>
//               <Pressable style={[styles.headerButton]}>
//                 <Image
//                   style={styles.searchIcon}
//                   source={images.CalendarIcon}
//                   resizeMode="contain"
//                 />
//               </Pressable>
//               <Pressable style={[styles.headerButton]}>
//                 <Image
//                   style={styles.searchIcon}
//                   source={images.Search}
//                   resizeMode="contain"
//                 />
//               </Pressable>
//             </View>
//           }
//         />
//         <View style={styles.mainView}>
//           <View style={styles.topButtons}>
//             <View style={[styles.buttonWrapper, globalStyle.bothContentCenter]}>
//               <Button
//                 lable="Upcoming"
//                 onPress={() => {
//                   setActiveTab('Upcoming');
//                 }}
//                 style={tw`bg-${
//                   activeTab === 'Upcoming' ? 'primary' : 'transparent'
//                 } flex-1 h-10`}
//               />
//               <Button
//                 lable="Past"
//                 onPress={() => {
//                   setActiveTab('Past');
//                 }}
//                 style={tw`bg-${
//                   activeTab === 'Past' ? 'primary' : 'transparent'
//                 } flex-1 h-10`}
//               />
//             </View>
//           </View>
//           <FlatList
//             data={appointments}
//             showsVerticalScrollIndicator={false}
//             ItemSeparatorComponent={() => {
//               return <View style={styles.listSeparator} />;
//             }}
//             contentContainerStyle={styles.listContainer}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({item, index}) => {
//               return (
//                 <AppointmentCard
//                   data={item}
//                   key={index}
//                   fullWidth={true}
//                   onPreeCard={(appointmentId: string) =>
//                     navigation.navigate('AppointmentDetail', {appointmentId})
//                   }
//                   status={activeTab === 'Upcoming' ? 'Upcoming' : 'Completed'}
//                 />
//               );
//             }}
//           />
//         </View>
//       </View>
//     </Container>
//   );
// };

// const styles = {
//   headerRight: tw`flex-1 w-full h-full flex-row items-center justify-end`,
//   headerButton: tw`w-10 h-full items-end justify-center`,
//   searchIcon: tw`w-6.5 h-6.5`,
//   mainView: tw`w-full h-full flex-1 bg-cultured`,
//   topButtons: tw`w-full h-25 items-center bg-white px-4`,
//   buttonWrapper: tw`w-full px-3 h-17 mt-3 rounded-lg bg-aliceBlue flex-row`,
//   listContainer: tw`py-5 px-4`,
//   listSeparator: tw`w-full h-4`,
// };

// export default Appointments;
