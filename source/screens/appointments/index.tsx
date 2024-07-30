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
import {RouteProp, useFocusEffect} from '@react-navigation/native';
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
import {getAppointments} from '../../Actions/appointmentAction';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Appointments'>;
  route: RouteProp<RootStackParamList, 'Appointments'>;
};

export const appointmentFilter = [
  {
    id: 1,
    title: 'Upcoming',
  },
  {
    id: 2,
    title: 'Reschedule',
  },
  {
    id: 3,
    title: 'Cancelled',
  },
  {
    id: 4,
    title: 'Completed',
  },
];

const Appointments: FC<Props> = ({navigation}) => {
  const {appointment} = useAppSelector(state => state?.home);
  const [activeTab, setActiveTab] = useState<string>('Upcoming');
  const [visible, setVisible] = useState(false);
  const [upcommingPage, setUpcomingPage] = useState(1);
  const [footerLoading, setFooterLoading] = useState(false);

  const dispatch = useAppDispatch();
  const {setLoading, userDetails} = useContext(AppContext);
  const {_id} = userDetails;

  useEffect(() => {
    getAllAppointments(true);
  }, []);

  const onPressFilter = () => {
    setVisible(!visible);
  };

  useFocusEffect(
    useCallback(() => {
      getAllAppointments(false);
    }, []),
  );

  const getAllAppointments = useCallback(
    (isLogin: boolean, status = 'upcoming') => {
      setLoading(isLogin);
      let obj = {
        data: {
          expertId: _id,
          limit: 10,
          page: upcommingPage,
          status: status?.toLowerCase(),
        },
        onSuccess: (res: any) => {
          setUpcomingPage(upcommingPage + 1);
          setLoading(false);
        },
        onFailure: (Err: any) => {
          setLoading(false);
          NativeToast(Err?.data?.message);
        },
      };
      dispatch(getAppointments(obj));
    },
    [activeTab],
  );

  const onEndReached = () => {
    setFooterLoading(true);
    getAllAppointments(false, activeTab);
  };

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
              {appointmentFilter?.map((item, index) => {
                return (
                  <Pressable
                    onPress={() => {
                      setActiveTab(item?.title);
                      getAllAppointments(true, item?.title);
                    }}
                    style={{
                      ...styles.buttoncontainer,
                      backgroundColor:
                        activeTab == item?.title ? Color?.Green : 'transparent',
                    }}>
                    <Text
                      style={[
                        activeTab == item?.title
                          ? styles.focuselabel
                          : styles.label,
                      ]}>
                      {item?.title}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
          <FlatList
            data={appointment}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => {
              return <View style={styles.listSeparator} />;
            }}
            ListEmptyComponent={
              <View style={styles?.empty}>
                <Text style={styles?.emptyTitle}>
                  {`No ${activeTab} Appointments found`}
                </Text>
              </View>
            }
            contentContainerStyle={styles.listContainer}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            ListFooterComponent={footerLoading && <ActivityIndicator />}
            renderItem={({item, index}) => {
              return (
                <AppointmentCard
                  data={item}
                  key={index}
                  fullWidth={true}
                  onPreeCard={(appointmentId: string) =>
                    navigation.navigate('AppointmentDetail', {
                      appointmentId,
                      image: item?.services?.[0]?.subServiceFileNames,
                    })
                  }
                />
              );
            }}
          />
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
  buttonWrapper: {
    ...tw`w-full px-3 rounded-lg bg-aliceBlue`,
    flexDirection: 'row',
    paddingVertical: hp(10),
  },
  listContainer: tw`py-5`,
  listSeparator: {
    height: hp(25),
  },
  buttoncontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(4),
    flexGrow: 1,
  },
  focuselabel: {
    ...commonFontStyle(fontFamily.semi_bold, 14, Color?.Black),
    lineHeight: hp(17),
    paddingVertical: hp(10),
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
