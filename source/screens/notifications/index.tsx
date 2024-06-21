import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  Image as RNImage,
  StyleSheet,
  View,
  Text as RNText,
  TouchableOpacity,
} from 'react-native';
import {Text, Container, Header, Image} from 'components';
import globalStyle from 'globalStyles';
import tw from 'rn-tailwind';
import images from 'images';
import {commonFontStyle, fontFamily, hp, wp} from '../../utils/dimentions';
import Color from '../../../assets/color';
import {AppContext} from 'context';
import {err} from 'react-native-svg';
import {useAppDispatch, useAppSelector} from 'store';
import {getAllNotification} from '../../Actions/notificationAction';
import {appConfig} from '../../../config';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

const segments = ['All', 'Offer', 'Promotion', 'Appointment'];

const Notifications: FC = () => {
  const [activeSegment, setSegment] = useState<string>('All');
  const {notificationsList} = useAppSelector(state => state?.notification);
  const [notification, setNotification] = useState(
    notificationsList?.notifications || [],
  );
  const {userDetails, setLoading} = useContext(AppContext);
  const {_id, user_profile_images} = userDetails || {};
  const dispatch = useAppDispatch();
  const {IMG_URL} = appConfig;
  const navigation = useNavigation();

  const {image} = user_profile_images?.[0] || [];

  useEffect(() => {
    getNotification('');
  }, []);

  useEffect(() => {
    setNotification(notificationsList?.notifications);
  }, [notificationsList]);

  const getNotification = useCallback(
    async (segment: string) => {
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
    },
    [activeSegment],
  );

  const onPressNotification = (item: any) => {
    const type = item?.notification_type;
    if (type == 'appointment') {
      navigation.navigate('AppointmentDetail', {
        appointmentId: item?.actionId,
      });
    }
  };

  return (
    <Container>
      <View style={globalStyle.container}>
        <Header title="Notifications" />
        <View style={styles.segmentView}>
          <View style={[styles.buttonWrapper]}>
            {segments.map((data, index) => {
              return (
                <Pressable
                  onPress={() => {
                    getNotification(data?.toLowerCase()), setSegment(data);
                  }}
                  key={index}
                  style={[
                    styles.inactiveSegment,
                    {
                      backgroundColor:
                        data == activeSegment ? Color?.Green : 'transparent',
                    },
                  ]}>
                  <RNText
                    style={[
                      data == activeSegment
                        ? styles?.buttontitle
                        : styles?.inactivetitle,
                    ]}>
                    {data}
                  </RNText>
                </Pressable>
              );
            })}
          </View>
        </View>
        <View style={styles.notificationHeader}>
          <View style={styles.bellIconView}>
            <RNImage
              source={images.NotificationFill}
              style={styles.bellIcon}
              resizeMode="contain"
            />
            <Text size="sm">{' All Notifications'}</Text>
          </View>
          <View style={styles.markAllView}>
            <RNImage
              tintColor={'#40baff'}
              source={images.SeenIcon}
              style={styles.bellIcon}
              resizeMode="contain"
            />
            <Text size="sm" color="text-pictonBlue">
              {' Mark all as read'}
            </Text>
          </View>
        </View>
        <View style={styles.notificationList}>
          <FlatList
            data={notification}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => onPressNotification(item)}
                  style={styles.notificationItem}>
                  <Image
                    style={styles.userImage}
                    resizeMode="cover"
                    source={{
                      uri: `${IMG_URL}/${image}`,
                    }}
                  />
                  <View style={styles.titleView}>
                    <RNText style={styles.notificationtitle}>
                      {item?.message}
                    </RNText>
                    <RNText style={styles.time}>
                      {moment(item?.createdAt).format('HH:MM:A')}
                    </RNText>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  segmentView: tw`w-full flex-row px-4 bg-white justify-between items-center`,
  inactiveSegment: {
    borderRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  notificationHeader: tw`w-full h-14 bg-cultured flex-row px-4`,
  bellIconView: tw`flex-6.5 w-full h-full flex-row items-center `,
  markAllView: tw`flex-3.5 w-full h-full flex-row items-center `,
  bellIcon: tw`w-5 h-5`,
  notificationList: tw`flex-1 w-full h-full px-4 bg-cultured`,
  notificationItem: tw`w-full h-20 flex-row`,
  userImage: {
    width: wp(50),
    height: wp(50),
    borderRadius: wp(100),
  },
  titleView: {...tw`w-full flex-1 h-full`, paddingLeft: wp(12)},
  threeDotsButton: tw`w-7 h-full items-end`,
  separator: tw`w-full h-0.2 bg-gray-300  mb-5`,
  moreIcon: tw`w-3.8 h-3.8`,
  list: tw`w-full pb-5 pt-2`,
  buttonWrapper: {
    borderRadius: wp(6),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 1,
    backgroundColor: Color?.GreenEF,
    paddingHorizontal: wp(10),
    paddingVertical: hp(10),
  },
  buttontitle: {
    ...commonFontStyle(fontFamily.medium, 14, Color?.Black),
    paddingVertical: hp(12),
    paddingHorizontal: wp(20),
  },
  inactivetitle: {
    ...commonFontStyle(fontFamily.regular, 14, Color?.Black),
  },
  notificationtitle: {
    ...commonFontStyle(fontFamily.regular, 16, Color?.Grey66),
  },
  username: {
    ...commonFontStyle(fontFamily.medium, 16, Color?.Black),
  },
  time: {
    ...commonFontStyle(fontFamily.regular, 13, Color?.Grey94),
    marginTop: hp(6),
  },
});

export default Notifications;

// import React, {FC, useState} from 'react';
// import {FlatList, Pressable, Image as RNImage, View} from 'react-native';
// import {Text, Container, Header, Image} from 'components';
// import globalStyle from 'globalStyles';
// import tw from 'rn-tailwind';
// import images from 'images';

// const segments = ['All', 'Offer', 'Promotion', 'Appoinment'];

// const Notifications: FC = () => {
//   const [activeSegment, setSegment] = useState<string>('All');
//   return (
//     <Container>
//       <View style={globalStyle.container}>
//         <Header title="Notifications" />
//         <View style={styles.segmentView}>
//           {segments.map((data, index) => {
//             return (
//               <Pressable
//                 onPress={() => setSegment(data)}
//                 key={index}
//                 style={[
//                   styles.inactiveSegment,
//                   data === activeSegment && styles.activeSegment,
//                 ]}>
//                 <Text
//                   size="sm"
//                   color={
//                     data === activeSegment ? 'text-black' : 'text-darkGrey'
//                   }>
//                   {data}
//                 </Text>
//               </Pressable>
//             );
//           })}
//         </View>
//         <View style={styles.notificationHeader}>
//           <View style={styles.bellIconView}>
//             <RNImage
//               source={images.NotificationFill}
//               style={styles.bellIcon}
//               resizeMode="contain"
//             />
//             <Text size="sm">{' All Notifications'}</Text>
//           </View>
//           <View style={styles.markAllView}>
//             <RNImage
//               tintColor={'#40baff'}
//               source={images.SeenIcon}
//               style={styles.bellIcon}
//               resizeMode="contain"
//             />
//             <Text size="sm" color="text-pictonBlue">
//               {' Mark all as read'}
//             </Text>
//           </View>
//         </View>
//         <View style={styles.notificationList}>
//           <FlatList
//             data={[1, 2, 3, 4, 5, 6, 7, 8]}
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={styles.list}
//             ItemSeparatorComponent={() => <View style={styles.separator} />}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({item, index}) => {
//               return (
//                 <View style={styles.notificationItem}>
//                   <Image
//                     style={styles.userImage}
//                     resizeMode="cover"
//                     source={{
//                       uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
//                     }}
//                   />
//                   <View style={styles.titleView}>
//                     <Text size="sm">
//                       {'Your appointment has been successfully schedule with'}
//                       <Text size="sm" fontWeight="700">
//                         {' Nickson John'}
//                       </Text>
//                     </Text>
//                     <Text size="sm" margin="mt-1" color="text-darkGrey">
//                       {'1 hr ago'}
//                     </Text>
//                   </View>
//                   <Pressable style={styles.threeDotsButton}>
//                     <RNImage
//                       tintColor={'#666666'}
//                       style={styles.moreIcon}
//                       source={images.ThreeDotsHorizontal}
//                     />
//                   </Pressable>
//                 </View>
//               );
//             }}
//           />
//         </View>
//       </View>
//     </Container>
//   );
// };

// const styles = {
//   segmentView: tw`w-full h-15 pb-3 flex-row px-4 bg-white justify-between items-center`,
//   activeSegment: tw`h-10 rounded-full px-4 bg-primary justify-center`,
//   inactiveSegment: tw`h-10 rounded-full px-4 bg-gray-100 justify-center`,
//   notificationHeader: tw`w-full h-14 bg-cultured flex-row px-4`,
//   bellIconView: tw`flex-6.5 w-full h-full flex-row items-center `,
//   markAllView: tw`flex-3.5 w-full h-full flex-row items-center `,
//   bellIcon: tw`w-5 h-5`,
//   notificationList: tw`flex-1 w-full h-full px-4 bg-cultured`,
//   notificationItem: tw`w-full h-20 flex-row`,
//   userImage: tw`w-13 h-13 rounded-full`,
//   titleView: tw`w-full flex-1 h-full pl-2`,
//   threeDotsButton: tw`w-7 h-full items-end`,
//   separator: tw`w-full h-0.2 bg-gray-300  mb-5`,
//   moreIcon: tw`w-3.8 h-3.8`,
//   list: tw`w-full pb-5 pt-2`,
// };

// export default Notifications;
