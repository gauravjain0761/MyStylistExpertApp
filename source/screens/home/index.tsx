import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text as RNText,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {FC, useContext, useEffect, useState} from 'react';
import Container from '../../components/container';
import globalStyle from 'globalStyles';
import {
  AppointmentsData,
  HOME_SCREEN_TOP_MENU,
  SERVIE_ARR,
  user_profile_images,
} from 'AppConstants';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '..';
import {RouteProp} from '@react-navigation/native';
import {
  AppointmentCard,
  BarChart,
  BottomTab,
  HomeAppointmentCard,
  HomeHeader,
  Image,
  Locationmodal,
  Text,
} from 'components';
import tw from 'rn-tailwind';
import {
  commonFontStyle,
  fontFamily,
  hp,
  screen_height,
  screen_width,
  w,
  wp,
} from '../../utils/dimentions';
import {StatusBar} from 'expo-status-bar';
import Color from '../../../assets/color';
import {ExpertWorkImage} from 'types';
import images from 'images';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';
import {useAppDispatch, useAppSelector} from 'store';
import {NativeToast} from '../../utils/toast';
import {appConfig, endPoints} from '../../../config';
import useHome from './hooks';
import {AppContext} from 'context';
import {getAllBanner, getUserDetails} from '../../Actions/homeAction';
import {
  getAppointments,
  getUpcomingAppointment,
} from '../../Actions/appointmentAction';
import {TopService} from '../../Actions/servicesAction';
import {io} from 'socket.io-client';
import {socketConnect} from '../Socket';

import {
  getAddress,
  requestLocationPermission,
} from '../../utils/locationHandler';
import {setAsyncLocation} from '../../dataAccess';
import {getAllNotification} from '../../Actions/notificationAction';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
  route: RouteProp<RootStackParamList, 'Home'>;
};

let graphData = [
  {avrage: '20%', color: '#FFAFA2', day: 'Mo'},
  {avrage: '35%', color: '#FFDFB2', day: 'Tu'},
  {avrage: '50%', color: '#B6FFD4', day: 'We'},
  {avrage: '40%', color: '#FFAFA2', day: 'Th'},
  {avrage: '60%', color: '#A9D4FF', day: 'Fr'},
  {avrage: '50%', color: '#B6FFD4', day: 'Sa'},
  {avrage: '70%', color: '#A9D4FF', day: 'Su'},
];

const Home: FC<Props> = ({navigation, route}) => {
  const {bannerImage} = useAppSelector(state => state?.home);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [banner, setBanner] = useState(bannerImage);
  const {userinfo} = useAppSelector(state => state?.common);
  const {appointment} = useAppSelector(state => state.home);
  const {topServices} = useAppSelector(state => state?.service);
  const {notificationsList} = useAppSelector(state => state?.notification);
  const [footerLoading, setFooterLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [user, setUser] = useState(userinfo);

  const {name, addresses, district} = user?.user || {};

  const {notifications} = notificationsList || [];

  const dispatch = useAppDispatch();
  const {setLoading, userDetails, location, setLocation} =
    useContext(AppContext);
  const {IMG_URL} = appConfig;
  const {_id} = userDetails;
  const {appointments} = appointment || [];

  useEffect(() => {
    GetStatus();
    socketConnect(dispatch);
    let clean = setTimeout(() => {
      getUserDetail();
      getNotification('');
      getBanners();
      getAppointment();
      getTopServices(true);
    }, 1000);
    return () => {
      clearInterval(clean);
    };
  }, []);

  const getNotification = async (segment: string) => {
    setLoading(true);
    const obj = {
      data: {
        userId: _id,
        notification_type: segment == 'all' ? '' : segment,
      },
      onSuccess: (res: any) => {
        setLoading(false);
      },
      onFaliure: (Err: any) => {
        setLoading(false);
        console.log('Err', err);
      },
    };
    dispatch(getAllNotification(obj));
  };

  const GetStatus = () => {
    location ? setVisible(false) : setVisible(true);
    // setVisible(false);
  };

  const getCurrentLocation = async () => {
    await requestLocationPermission(
      async response => {
        await getAddress(
          response,
          async (res: any) => {
            // await setAsyncLocation(res?.results?.[0]?.formatted_address);
            await setAsyncLocation('Mohali, Punjab');
            setLocation('Mohali, Punjab');
            // setLocation(res?.results?.[0]?.formatted_address);
            setVisible(false);
          },
          async (Err: any) => {
            console.log('Home screen Get Address', Err);
          },
        ).catch(Err => {
          console.log('Home Location API', Err);
        });
      },
      err => {
        console.log('Home Location API', err);
      },
    );
  };

  useEffect(() => {
    setBanner(bannerImage);
    setUser(userinfo);
  }, [bannerImage, userinfo]);

  const {expertMedia, getAllExpertMedia} = useHome();

  useEffect(() => {
    getAllExpertMedia();
  }, []);

  const {expertusers} = expertMedia || {};

  const {user_profile_images, user_work_images, expert_profile_videos} =
    expertusers?.length ? expertusers?.[0] : {};
  const onSnapToItem = (index: React.SetStateAction<number>) => {
    setActiveIndex(index);
  };

  const onPressProfile = () => {
    navigation.openDrawer();
  };

  const getBanners = () => {
    let obj = {
      onSuccess: (res: any) => {
        setLoading(false);
      },
      onFailure: (Err: any) => {
        setLoading(false);
        NativeToast(Err?.data?.message);
      },
    };
    setLoading(true);
    dispatch(getAllBanner(obj));
  };

  const getAppointment = () => {
    setLoading(true);
    let obj = {
      data: {
        expertId: _id,
        limit: 10,
        page: 1,
        status: 'upcoming',
      },
      onSuccess: (res: any) => {
        console.log('resss', res);
        setLoading(false);
      },
      onFailure: (Err: any) => {
        setLoading(false);
        NativeToast(Err?.data?.message);
      },
    };
    dispatch(getAppointments(obj));
  };

  const getUserDetail = () => {
    setLoading(true);
    let obj = {
      data: {
        userid: userDetails?._id,
      },
      onSuccess: (res: any) => {
        setLoading(false);
      },
      onFailure: (Err: any) => {
        setLoading(false);
        NativeToast(Err?.data?.message);
      },
    };
    dispatch(getUserDetails(obj));
  };

  const getTopServices = (isLoading: boolean) => {
    setLoading(isLoading);
    let obj = {
      data: {
        limit: 10,
        page: page,
      },
      onSuccess: (res: any) => {
        setPage(page + 1);
        setLoading(false);
        setFooterLoading(false);
      },
      onFailure: (Err: any) => {
        setLoading(false);
        setFooterLoading(false);
      },
    };
    dispatch(TopService(obj));
  };

  const onEndReached = () => {
    setFooterLoading(true);
    getTopServices(false);
  };

  return (
    <Container>
      <>
        <StatusBar style="dark" />
        <HomeHeader
          onPresslocation={() => {}}
          location={location}
          onPressProfile={onPressProfile}
          badge={notifications?.length}
        />
        <View style={styles?.mainView}>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <View style={styles.carousel_container}>
              <Carousel
                layout={'default'}
                data={banner}
                sliderWidth={screen_width}
                itemWidth={screen_width}
                inactiveSlideScale={2}
                renderItem={({item}: any) => {
                  return (
                    <FastImage
                      source={{
                        uri: `${IMG_URL}/${item?.fileName}`,
                        priority: FastImage.priority.high,
                      }}
                      style={styles?.carousel_img}
                      resizeMode="stretch"
                    />
                  );
                }}
                onSnapToItem={onSnapToItem}
              />
            </View>
            <Pagination
              dotsLength={banner?.length}
              activeDotIndex={activeIndex}
              containerStyle={styles?.pagination_container}
              dotStyle={styles?.dotStyle}
              inactiveDotStyle={styles?.inactiveDotStyle}
              inactiveDotScale={1}
              dotContainerStyle={styles?.dotContainerStyle}
            />
            <View style={[styles.topBoxsWrapper, styles.boxWrapperSub]}>
              {HOME_SCREEN_TOP_MENU.map((data, index) => {
                const {route} = data;
                return (
                  <Pressable
                    onPress={() => {
                      if (route) {
                        navigation.navigate(route);
                      }
                    }}
                    style={[
                      styles.topBoxWrapper,
                      styles.topBoxWrappeSub,
                      {backgroundColor: data.boxColor},
                    ]}>
                    <View
                      style={[
                        styles.innerBox,
                        styles.innerBoxSub,
                        globalStyle.bothContentCenter,
                        {backgroundColor: data.innerBoxColor},
                      ]}>
                      <Image
                        style={styles.innerIcon}
                        resizeMode="contain"
                        source={data.icon}
                      />
                    </View>
                    <RNText style={styles.containertitle}>
                      {data.boxTitle}
                    </RNText>
                  </Pressable>
                );
              })}
            </View>
            <View style={styles.gridView}>
              <View style={styles.gridViewHeader}>
                <RNText style={styles.ViewTitle}>
                  {name}
                  {` Work`}
                </RNText>
                <RNText style={styles.viewAll}>{`View All`}</RNText>
              </View>

              <View style={styles.gridImageView}>
                {expertMedia?.expertusers?.length ? (
                  <FlatList
                    numColumns={3}
                    columnWrapperStyle={{gap: wp(11)}}
                    data={user_work_images}
                    renderItem={({item, index}) => {
                      return (
                        <FastImage
                          key={index}
                          resizeMode="cover"
                          style={[styles.gridImage, styles.gridImageBottom]}
                          source={{
                            uri: `${IMG_URL}/${item?.image}`,
                            priority: FastImage?.priority?.high,
                          }}
                        />
                      );
                    }}
                  />
                ) : (
                  <View />
                )}
              </View>
            </View>
            <View style={styles.upcomingAppView}>
              <View style={styles.upcomingHeader}>
                <RNText
                  style={
                    styles?.ViewTitle
                  }>{`Upcoming Appointment(${appointments?.length})`}</RNText>
                <RNText
                  style={styles.viewAll}
                  onPress={() => navigation.navigate('Appointments')}>
                  {'View All'}
                </RNText>
              </View>
              <FlatList
                horizontal={true}
                data={appointments}
                ListHeaderComponent={<View style={styles.listcontainer}></View>}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}: any) => {
                  return (
                    <HomeAppointmentCard
                      status="Upcoming"
                      homeScreen={true}
                      data={item}
                      onPreeCard={(appointmentId: string) =>
                        navigation.navigate('AppointmentDetail', {
                          appointmentId,
                        })
                      }
                    />
                  );
                }}
              />
            </View>
            <View style={styles.topServicesView}>
              <View style={styles.topServiceHeader}>
                <RNText style={styles.ViewTitle}>{'Top Services Sold'} </RNText>
                <View
                  style={[
                    styles.serviceDropdownView,
                    globalStyle.bothContentCenter,
                  ]}>
                  <RNText style={styles.dropdownTitle}>{'Weekly'}</RNText>
                  <Image
                    style={styles.dropdownArrow}
                    resizeMode="contain"
                    source={images.DownArrow}
                  />
                </View>
              </View>
              <FlatList
                data={topServices}
                horizontal={true}
                contentContainerStyle={styles.horizontalList}
                showsHorizontalScrollIndicator={false}
                style={{flex: 1}}
                ListFooterComponentStyle={styles?.footerStyle}
                ListFooterComponent={footerLoading && <ActivityIndicator />}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                ListHeaderComponent={<View style={styles.seprator}></View>}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={[
                        styles.topServiceItemContainer,
                        {backgroundColor: SERVIE_ARR[index % 4]?.bgColor},
                      ]}>
                      <RNText style={styles.servicetitle}>
                        {item?.serviceDetails?.sub_service_name}
                      </RNText>
                      <RNText style={styles.service}>{'Service'}</RNText>
                      <RNText style={styles.soldtitle}>{item?.count}</RNText>
                      <RNText style={styles.servicelabel}>
                        {'Total Sold service'}
                      </RNText>
                    </View>
                  );
                }}
              />
            </View>
          </ScrollView>
          <BottomTab />
          <Locationmodal
            onPress={getCurrentLocation}
            visible={visible}
            setVisible={setVisible}
          />
        </View>
      </>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainView: tw`flex-1 w-full bg-white`,
  topBoxWrapper: tw`rounded-lg mb-4 pl-3 pt-3 pr-2`,
  topBoxWrappeSub: {width: w(28), height: w(28)},
  innerBox: tw` rounded-lg`,
  innerBoxSub: {width: w(9), height: w(9)},
  innerIcon: tw`w-5 h-5`,
  topBoxsWrapper: {
    ...tw`w-full flex-row flex-wrap justify-between`,
    paddingTop: hp(25),
    paddingBottom: hp(10),
  },
  boxWrapperSub: {paddingHorizontal: w(4)},
  containertitle: {
    ...commonFontStyle(fontFamily.semi_bold, 15, Color?.Black),
    marginTop: hp(15),
  },
  gridView: {
    ...tw`w-full bg-aliceBlue`,
    paddingBottom: hp(24),
  },
  gridViewHeader: {
    ...tw`w-full flex-row items-center justify-between`,
    paddingHorizontal: hp(20),
    paddingTop: hp(26),
  },
  gridImage: tw`mb-4`,
  gridImageBottom: {width: w(28), height: w(28)},
  gridImageView: {
    ...tw`flex-row flex-wrap`,
    marginTop: hp(15),
    paddingHorizontal: hp(20),
  },
  grapView: tw`w-full bg-white`,
  ViewTitle: {
    ...commonFontStyle(fontFamily.semi_bold, 18, Color?.Black),
  },
  upcomingAppView: {...tw`w-full bg-oldLace`, paddingBottom: hp(35)},
  upcomingHeader: {
    ...tw`w-full flex-row justify-between items-center px-4`,
    paddingLeft: wp(20),
    paddingTop: hp(29),
    paddingBottom: hp(20),
  },
  topServicesView: tw`w-full h-58 bg-white`,
  viewAll: {
    ...commonFontStyle(fontFamily.medium, 14, Color?.Grey66),
    textDecorationLine: 'underline',
    lineHeight: hp(17),
  },
  horizontalList: tw`mr-0`,
  topServiceHeader: {
    ...tw`w-full h-19 flex-row justify-between items-center`,
    paddingLeft: wp(20),
    paddingRight: wp(14),
  },
  topServiceItemContainer: {
    ...tw`w-37 h-32 pl-4`,
    marginRight: wp(16),
    borderRadius: wp(6),
  },
  dropdownArrow: tw`w-3.5 h-3.5 ml-1`,
  serviceDropdownView: tw`flex-row px-3 h-9 rounded-lg bg-aliceBlue`,
  dropdownTitle: {
    ...commonFontStyle(fontFamily.regular, 14, Color?.Grey3B),
    lineHeight: hp(17),
  },
  servicetitle: {
    ...commonFontStyle(fontFamily.medium, 15, Color?.Grey3B),
    marginTop: hp(12),
    lineHeight: hp(19),
  },
  service: {
    ...commonFontStyle(fontFamily.regular, 12, Color?.Grey75),
    marginTop: hp(4),
    lineHeight: hp(19),
  },
  soldtitle: {
    ...commonFontStyle(fontFamily.bold, 26, Color?.Green04),
    marginTop: hp(22),
  },
  servicelabel: {
    ...commonFontStyle(fontFamily.regular, 12, Color?.Grey66),
    marginTop: hp(3),
  },
  chartcontainer: {
    ...tw`w-88 h-76 bg-white rounded-lg`,
    shadowColor: '#ababab',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 24,
    marginBottom: hp(42),
  },

  carousel_container: {
    width: '100%',
    borderRadius: wp(12),
    overflow: 'hidden',
    backgroundColor: Color?.White,
    height: hp(256),
    marginTop: 0,
  },
  carousel_img: {
    width: '100%',
    height: hp(257),
  },
  pagination_container: {
    justifyContent: 'center',
    alignSelf: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: hp(13),
  },
  dotContainerStyle: {
    margin: 0,
    marginHorizontal: wp(4),
  },
  inactiveDotStyle: {
    backgroundColor: Color?.GreyD9,
  },
  dotStyle: {
    width: wp(6),
    height: wp(6),
    borderRadius: 5,
    backgroundColor: Color?.Grey7A,
  },
  listcontainer: {
    width: wp(20),
    height: wp(20),
  },
  seprator: {
    width: wp(20),
    height: wp(20),
  },
  footerStyle: {
    alignSelf: 'center',
    bottom: hp(10),
  },
});

// import React, {FC, useEffect} from 'react';
// import {w} from 'utils';
// import images from 'images';
// import tw from 'rn-tailwind';
// import {RootStackParamList} from '..';
// import globalStyle from 'globalStyles';
// import {RouteProp} from '@react-navigation/native';
// import {HOME_SCREEN_TOP_MENU, SERVIE_ARR} from 'AppConstants';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {
//   View,
//   FlatList,
//   Pressable,
//   ScrollView,
//   Image as RnImage,
// } from 'react-native';
// import {
//   Image,
//   Text,
//   BarChart,
//   Container,
//   AppointmentCard,
//   PerformingFeedCard,
//   BottomTab,
// } from 'components';
// import useHome from './hooks';
// import {ExpertProfileVideo, ExpertWorkImage} from 'types';

// let graphData = [
//   {avrage: '20%', color: '#FFAFA2', day: 'Mo'},
//   {avrage: '35%', color: '#FFDFB2', day: 'Tu'},
//   {avrage: '50%', color: '#B6FFD4', day: 'We'},
//   {avrage: '40%', color: '#FFAFA2', day: 'Th'},
//   {avrage: '60%', color: '#A9D4FF', day: 'Fr'},
//   {avrage: '50%', color: '#B6FFD4', day: 'Sa'},
//   {avrage: '70%', color: '#A9D4FF', day: 'Su'},
// ];

// type Props = {
//   navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
//   route: RouteProp<RootStackParamList, 'Home'>;
// };

// const Home: FC<Props> = ({navigation}) => {
//   const {
//     expertMedia,
//     appointments,
//     getAllExpertMedia,
//     getExpertDetails,
//     getLatestAppointments,
//   } = useHome();

//   useEffect(() => {
//     getExpertDetails();
//     getAllExpertMedia();
//     getLatestAppointments();
//   }, []);

//   const {
//     expertusers,
//     user_work_images_url,
//     user_profile_images_url,
//     expert_profile_video_url,
//   } = expertMedia || {};

//   const {user_profile_images, user_work_images, expert_profile_videos} =
//     expertusers?.length ? expertusers[0] : {};
//   return (
//     <Container>
//       <View style={globalStyle.container}>
//         <View style={styles.headerView}>
//           <Pressable
//             onPress={() => navigation?.openDrawer()}
//             style={styles.leftView}>
//             <Image
//               style={styles.drawerIcon}
//               resizeMode="contain"
//               source={images.DrawerIcon}
//             />
//           </Pressable>
//           <View style={[styles.center, globalStyle.bothContentCenter]}>
//             <Image
//               style={styles.appLogo}
//               resizeMode="contain"
//               source={images.AppLogo}
//             />
//           </View>
//           <Pressable
//             onPress={() => navigation.navigate('Notifications')}
//             style={styles.rightView}>
//             <Image
//               style={styles.bellIcon}
//               resizeMode="contain"
//               source={images.BellIcon}
//             />
//           </Pressable>
//         </View>
//         <View style={styles.mainView}>
//           <ScrollView showsVerticalScrollIndicator={false}>
//             <View style={[styles.topBoxsWrapper, styles.boxWrapperSub]}>
//               {HOME_SCREEN_TOP_MENU.map((data, index) => {
//                 const {route} = data;
//                 return (
//                   <Pressable
//                     onPress={() => {
//                       if (route) {
//                         navigation.navigate(route);
//                       }
//                     }}
//                     style={[
//                       styles.topBoxWrapper,
//                       styles.topBoxWrappeSub,
//                       {backgroundColor: data.boxColor},
//                     ]}>
//                     <View
//                       style={[
//                         styles.innerBox,
//                         styles.innerBoxSub,
//                         globalStyle.bothContentCenter,
//                         {backgroundColor: data.innerBoxColor},
//                       ]}>
//                       <Image
//                         style={styles.innerIcon}
//                         resizeMode="contain"
//                         source={data.icon}
//                       />
//                     </View>
//                     <Text size="xs" margin="mt-3.5" fontWeight="800">
//                       {data.boxTitle}
//                     </Text>
//                   </Pressable>
//                 );
//               })}
//             </View>
//             <View style={styles.upcomingAppView}>
//               <View style={styles.upcomingHeader}>
//                 <Text fontWeight="700" size="base">
//                   {`Upcoming Appointment(${appointments.length})`}
//                 </Text>
//                 <Text
//                   onPress={() => navigation.navigate('Appointments')}
//                   textStyle={'underline text-darkGrey'}
//                   size="sm">
//                   {'View All'}
//                 </Text>
//               </View>
//               <FlatList
//                 horizontal={true}
//                 data={appointments}
//                 showsHorizontalScrollIndicator={false}
//                 contentContainerStyle={styles.horizontalList}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={({item, index}: any) => {
//                   return (
//                     <AppointmentCard
//                       status="Upcoming"
//                       homeScreen={true}
//                       data={item}
//                       onPreeCard={(appointmentId: string) =>
//                         navigation.navigate('AppointmentDetail', {
//                           appointmentId,
//                         })
//                       }
//                     />
//                   );
//                 }}
//               />
//             </View>
//             <View style={styles.topServicesView}>
//               <View style={styles.topServiceHeader}>
//                 <Text fontWeight="700" size="base">
//                   {'Top Services Sold'}
//                 </Text>
//                 <View
//                   style={[
//                     styles.serviceDropdownView,
//                     globalStyle.bothContentCenter,
//                   ]}>
//                   <Text color="text-black" size="xs">
//                     {'Weekly'}
//                   </Text>
//                   <Image
//                     style={styles.dropdownArrow}
//                     resizeMode="contain"
//                     source={images.DownArrow}
//                   />
//                 </View>
//               </View>
//               <FlatList
//                 data={SERVIE_ARR}
//                 horizontal={true}
//                 contentContainerStyle={styles.horizontalList}
//                 showsHorizontalScrollIndicator={false}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={({item, index}) => {
//                   return (
//                     <View
//                       style={[
//                         styles.topServiceItemContainer,
//                         {backgroundColor: item.bgColor},
//                       ]}>
//                       <Text
//                         numberOfLines={1}
//                         fontWeight="800"
//                         margin="mt-2"
//                         size="base">
//                         {'Haircutting'}
//                       </Text>
//                       <Text size="xs">{'Service'}</Text>
//                       <Text fontWeight="800" margin="mt-6" size="xl">
//                         {'456'}
//                       </Text>
//                       <Text size="xs">{'Total Sold service'}</Text>
//                     </View>
//                   );
//                 }}
//               />
//             </View>
//             <View style={styles.performingFeedView}>
//               <View style={styles.perforingFeedHeader}>
//                 <Text fontWeight="700" size="base">
//                   {'My Top Performing feed'}
//                 </Text>
//                 <View
//                   style={[
//                     styles.performingDropdownView,
//                     globalStyle.bothContentCenter,
//                   ]}>
//                   <Text color="text-black" size="xs">
//                     {'Weekly'}
//                   </Text>
//                   <Image
//                     style={styles.dropdownArrow}
//                     resizeMode="contain"
//                     source={images.DownArrow}
//                   />
//                 </View>
//               </View>
//               <View>
//                 <FlatList
//                   horizontal={true}
//                   data={[1, 2, 3, 4.5]}
//                   showsHorizontalScrollIndicator={false}
//                   contentContainerStyle={styles.horizontalList}
//                   keyExtractor={(item, index) => index.toString()}
//                   renderItem={({item, index}) => {
//                     return <PerformingFeedCard />;
//                   }}
//                 />
//               </View>
//             </View>
//             <View style={styles.grapView}>
//               <View style={styles.topServiceHeader}>
//                 <Text fontWeight="700" size="base">
//                   {'Weelkly Stats'}
//                 </Text>
//                 <View
//                   style={[
//                     styles.serviceDropdownView,
//                     globalStyle.bothContentCenter,
//                   ]}>
//                   <Text color="text-black" size="xs">
//                     {'Weekly'}
//                   </Text>
//                   <Image
//                     style={styles.dropdownArrow}
//                     resizeMode="contain"
//                     source={images.DownArrow}
//                   />
//                 </View>
//               </View>
//               <View>
//                 <FlatList
//                   data={graphData}
//                   horizontal={true}
//                   showsHorizontalScrollIndicator={false}
//                   contentContainerStyle={styles.horizontalList}
//                   keyExtractor={(item, index) => index.toString()}
//                   renderItem={({item, index}) => {
//                     return (
//                       <BarChart
//                         graphTitle={'Weekly Search Result appearance'}
//                         key={index}
//                       />
//                     );
//                   }}
//                 />
//               </View>
//             </View>
//             <View style={[styles.workView, globalStyle.bothContentCenter]}>
//               <Text
//                 size="2xl"
//                 color="text-black"
//                 fontWeight="700">{`NICKSON'S WORK`}</Text>
//               <View style={tw`flex-row items-center mt-2`}>
//                 <Text textStyle="underline mr-2 text-black" size="sm">
//                   {'See All'}
//                 </Text>
//                 <Image
//                   style={styles.rightForward}
//                   resizeMode="contain"
//                   source={images.RightForward}
//                 />
//               </View>
//             </View>
//             {expert_profile_videos?.length ? (
//               expert_profile_videos.map(
//                 (data: ExpertProfileVideo, index: number) => {
//                   const {video} = data;
//                   const videoUrl = `${expert_profile_video_url}${video}`;

//                   return (
//                     <Pressable
//                       onPress={() =>
//                         navigation.navigate('VideoPlayer', {videoUrl: videoUrl})
//                       }
//                       key={index}
//                       style={styles.videoWrapper}>
//                       <View style={styles.videoView}>
//                         <Image
//                           source={{
//                             uri: videoUrl,
//                           }}
//                           resizeMode="cover"
//                           style={styles.VideoIcon}
//                         />
//                         <Image
//                           style={styles.playIcon}
//                           resizeMode="contain"
//                           source={images.playIcon}
//                         />
//                       </View>
//                       <View style={styles.imageWhiteBg}>
//                         <View style={styles.imageColorTop}></View>
//                         <View style={styles.imageColorBottom}></View>
//                       </View>
//                     </Pressable>
//                   );
//                 },
//               )
//             ) : (
//               <View />
//             )}
//             <View style={styles.gridView}>
//               <View style={styles.gridViewHeader}>
//                 <Text fontWeight="700" size="base">
//                   {`Nickson's Portfolio`}
//                 </Text>
//                 <Text color="text-darkGrey" textStyle="underline" size="sm">
//                   {`View All`}
//                 </Text>
//               </View>

//               <View style={styles.gridImageView}>
//                 {user_profile_images?.length ? (
//                   user_profile_images.map(
//                     (data: ExpertWorkImage, index: number) => {
//                       const {image_medium} = data;
//                       const url = `${user_profile_images_url}${image_medium}`;
//                       return (
//                         <Image
//                           key={index}
//                           source={{
//                             uri: url,
//                           }}
//                           resizeMode="cover"
//                           style={[styles.gridImage, styles.gridImageBottom]}
//                         />
//                       );
//                     },
//                   )
//                 ) : (
//                   <View />
//                 )}
//               </View>
//             </View>
//           </ScrollView>
//         </View>
//         <BottomTab />
//       </View>
//     </Container>
//   );
// };

// const styles = {
//   bellIcon: tw`w-7 h-7`,
//   appLogo: tw`w-22 h-22`,
//   drawerIcon: tw`w-8  h-8`,
//   headerView: tw`w-full h-14 bg-white flex-row px-4`,
//   leftView: tw`flex-1 w-full h-full justify-center`,
//   center: tw`flex-8 w-full h-full`,
//   rightView: tw`flex-1 w-full h-full justify-center items-end`,
//   topBoxsWrapper: tw`w-full flex-row flex-wrap justify-between pt-5`,
//   boxWrapperSub: {paddingHorizontal: w(4)},
//   topBoxWrapper: tw`rounded-lg mb-4 pl-3 pt-3 pr-2`,
//   topBoxWrappeSub: {width: w(28), height: w(28)},
//   innerBox: tw` rounded-lg`,
//   innerBoxSub: {width: w(9), height: w(9)},
//   innerIcon: tw`w-5 h-5`,
//   mainView: tw`flex-1 w-full bg-cultured`,
//   upcomingAppView: tw`w-full h-71 bg-oldLace mt-6`,
//   upcomingHeader: tw`w-full h-14 flex-row justify-between items-center px-4`,
//   topServicesView: tw`w-full h-58 bg-white`,
//   serviceDropdownView: tw`flex-row px-3 h-9 rounded-lg bg-aliceBlue`,
//   dropdownArrow: tw`w-3.5 h-3.5 ml-1`,
//   topServiceHeader: tw`w-full h-19 flex-row justify-between items-center px-4`,
//   topServiceItemContainer: tw`w-37 h-32 ml-4 pl-4 rounded-lg `,
//   performingFeedView: tw`w-full h-118 bg-aliceBlueDark`,
//   perforingFeedHeader: tw`w-full h-19 mt-2 flex-row justify-between items-center px-4`,
//   performingDropdownView: tw`flex-row px-3 h-9 rounded-lg bg-dimGrey`,
//   workView: tw`w-full h-30 bg-aliceBlue`,
//   rightForward: tw`w-2 h-2`,
//   videoWrapper: tw`w-full h-72 bg-white justify-center`,
//   videoView: tw`w-full h-58 rounded-lg overflow-hidden items-center px-4 justify-center`,
//   VideoIcon: tw`w-full h-full rounded-lg`,
//   playIcon: tw`w-10 h-10 absolute`,
//   imageWhiteBg: tw`flex-1 h-full w-full bg-red-300 absolute z--1`,
//   gridView: tw`w-full bg-white  bg-aliceBlue`,
//   gridViewHeader: tw`w-full h-10 flex-row items-center justify-between px-4`,
//   gridImage: tw`mb-4`,
//   gridImageBottom: {marginLeft: w(4), width: w(28), height: w(28)},
//   gridImageView: tw`flex-row flex-wrap`,
//   grapView: tw`w-full h-103 `,
//   horizontalList: tw`pr-4`,
//   imageColorTop: tw`flex-1 w-full h-full bg-white`,
//   imageColorBottom: tw`flex-1 w-full h-full bg-aliceBlue`,
// };
// export default Home;
