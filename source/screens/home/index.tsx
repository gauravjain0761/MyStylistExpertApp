import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text as RNText,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
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

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
  route: RouteProp<RootStackParamList, 'Home'>;
};

const banner = [
  {
    id: 1,
    image: images?.offerbanner,
  },
  {
    id: 2,
    image: images?.offerbanner,
  },
  {
    id: 3,
    image: images?.offerbanner,
  },
];

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
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setVisible(!visible);
  }, []);

  // const {
  //   expertMedia,
  //   appointments,
  //   getAllExpertMedia,
  //   getExpertDetails,
  //   getLatestAppointments,
  // } = useHome();

  useEffect(() => {
    // getExpertDetails();
    // getAllExpertMedia();
    // getLatestAppointments();
  }, []);

  // const {
  //   expertusers,
  //   user_work_images_url,
  //   user_profile_images_url,
  //   expert_profile_video_url,
  // } = expertMedia || {};

  // const {user_profile_images, user_work_images, expert_profile_videos} =
  //   expertusers?.length ? expertusers[0] : {};
  const onSnapToItem = (index: React.SetStateAction<number>) => {
    setActiveIndex(index);
  };

  return (
    <Container>
      <>
        <StatusBar style="dark" />
        <HomeHeader
          onPresslocation={() => setVisible(!visible)}
          location={'Shop No. 4, Ansal Palm Grove, Mohali'}
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
                    <Image
                      resizeMode="stretch"
                      source={item?.image}
                      style={styles?.carousel_img}
                    />
                  );
                }}
                onSnapToItem={onSnapToItem}
              />
            </View>
            <Pagination
              // @ts-ignore
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
                <RNText style={styles.ViewTitle}>{`Majid Khan Work`}</RNText>
                <RNText style={styles.viewAll}>{`View All`}</RNText>
              </View>

              <View style={styles.gridImageView}>
                {user_profile_images?.length ? (
                  <FlatList
                    numColumns={3}
                    columnWrapperStyle={{gap: wp(11)}}
                    data={user_profile_images}
                    renderItem={({item, index}) => {
                      return (
                        <Image
                          key={index}
                          source={item?.image}
                          resizeMode="cover"
                          style={[styles.gridImage, styles.gridImageBottom]}
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
                  }>{`Upcoming Appointment(23)`}</RNText>
                <RNText
                  style={styles.viewAll}
                  onPress={() => navigation.navigate('Appointments')}>
                  {'View All'}
                </RNText>
              </View>
              <FlatList
                horizontal={true}
                data={AppointmentsData}
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
                data={SERVIE_ARR}
                horizontal={true}
                contentContainerStyle={styles.horizontalList}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={<View style={styles.seprator}></View>}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={[
                        styles.topServiceItemContainer,
                        {backgroundColor: item.bgColor},
                      ]}>
                      <RNText style={styles.servicetitle}>
                        {'Haircutting'}
                      </RNText>
                      <RNText style={styles.service}>{'Service'}</RNText>
                      <RNText style={styles.soldtitle}>{'456'}</RNText>
                      <RNText style={styles.servicelabel}>
                        {'Total Sold service'}
                      </RNText>
                    </View>
                  );
                }}
              />
            </View>
            <View style={styles.grapView}>
              <View style={styles.topServiceHeader}>
                <RNText style={styles.ViewTitle}>{'Weelkly Stats'}</RNText>
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
              <View>
                <FlatList
                  data={graphData}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.horizontalList}
                  ListHeaderComponent={<View style={styles.seprator}></View>}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => {
                    return (
                      <BarChart
                        graphTitle={'Weekly Search Result appearance'}
                        key={index}
                        graphContainerStyle={styles.chartcontainer}
                      />
                    );
                  }}
                />
              </View>
            </View>
          </ScrollView>
          <BottomTab />
          <Locationmodal visible={visible} setVisible={setVisible} />
        </View>
      </>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainView: tw`flex-1 w-full bg-yellow`,
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
    ...tw`w-full  bg-aliceBlue`,
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
    ...tw`w-full h-14 flex-row justify-between items-center px-4`,
    paddingLeft: wp(20),
  },
  topServicesView: tw`w-full h-58 bg-white`,
  viewAll: {
    ...commonFontStyle(fontFamily.medium, 14, Color?.Grey66),
    textDecorationLine: 'underline',
    lineHeight: hp(17),
  },
  horizontalList: tw`mr-4`,
  topServiceHeader: {
    ...tw`w-full h-19 flex-row justify-between items-center`,
    paddingLeft: wp(20),
    paddingRight: wp(14),
  },
  topServiceItemContainer: {
    ...tw`w-37 h-32 pl-4 rounded-lg `,
    marginRight: wp(16),
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
    width: screen_width,
    borderRadius: wp(12),
    overflow: 'hidden',
    backgroundColor: Color?.White,
    height: hp(256),
    marginTop: 0,
  },
  carousel_img: {
    width: '100%',
    height: hp(256),
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
