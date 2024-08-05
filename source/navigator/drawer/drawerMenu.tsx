import AsyncStorage from '@react-native-async-storage/async-storage';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {Container, Image} from 'components';
import {AppContext} from 'context';
import globalStyle from 'globalStyles';
import images from 'images';
import React, {FC, useContext, useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image as RNImage,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import tw from 'rn-tailwind';
import {
  commonFontStyle,
  dispatchNavigation,
  fontFamily,
  hp,
  wp,
} from '../../utils/dimentions';
import Color from '../../../assets/color';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import DataAccess, {clearAsync} from '../../dataAccess';
import {useAppSelector} from 'store';
import {appConfig} from '../../../config';
import {NativeToast} from 'utils';
import {navigationRef} from 'navigator';

interface Props {
  props: DrawerContentComponentProps;
}

const drawerMenuItems = [
  {
    itemName: 'My Wallet',
    route: 'MyWallet',
    icon: images.walleticon,
  },
  {
    itemName: 'Notifications Setting',
    route: 'NotificationSetting',
    icon: images.notificationicon,
  },
  {
    itemName: 'My Reviews',
    route: 'MyReviews',
    icon: images.reviewicon,
  },
  {
    itemName: "FAQ's",
    route: 'Faq',
    icon: images.faqicon,
  },
  {
    itemName: 'Privacy Policy',
    route: 'PrivacyPolicy',
    icon: images.privacyicon,
  },
  {
    itemName: 'Terms & Conditions',
    route: 'Terms',
    icon: images.termsicon,
  },
  {
    itemName: 'Log Out',
    route: 'Logout',
    icon: images.logoutIcon,
  },
];

const DrawerMenu: FC<Props> = ({props}) => {
  const insets = useSafeAreaInsets();
  const {setIsLogin, userDetails} = useContext(AppContext);
  const {navigation} = props;
  const {userinfo} = useAppSelector(state => state?.common);

  const {name, totalReviews, averageRating, addresses, district} =
    userinfo?.user || {};
  const {image} = userinfo?.user?.user_profile_images[0] || {};
  const {IMG_URL} = appConfig;
  const {address} = addresses?.[0] || {};
  const {district_name} = district?.[0] || {};
  const {activeRoute} = useContext(AppContext);

  const onPressLogOut = async () => {
    Alert.alert('Log out', 'Are you sure you want to log out ?', [
      {
        text: 'Yes',
        onPress: async () => {
          setIsLogin('false');
          await clearAsync();
        },
        style: 'destructive',
      },
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
  };

  return (
    <Container>
      <View style={styles.profileframe}>
        <Image
          resizeMode="cover"
          source={{uri: `${IMG_URL}/${image}`}}
          style={styles.profileimg}
        />
      </View>
      <View style={styles.namecontainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.username}>
          {'@'}
          {name}
        </Text>
        <View style={styles.locationcontainer}>
          <Image style={styles.locationpin} source={images?.locationicon} />
          <Text style={styles.location}>
            {address?.sector}, {district_name}
          </Text>
          <View style={styles.saparator}></View>
          <View style={styles.ratingbadge}>
            <Text style={styles.ratingtitle}>{averageRating}</Text>
            <RNImage style={styles.staricon} source={images?.StarIcon} />
          </View>
          <Text style={styles.count}>{`(${totalReviews})`}</Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.listcontainer}>
        <FlatList
          data={drawerMenuItems}
          ItemSeparatorComponent={() => (
            <View style={{height: hp(1), backgroundColor: Color?.GreyEB}} />
          )}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => onPressLogOut()}
                style={styles.list}>
                <View style={styles.leftcontainer}>
                  <RNImage style={styles.listicon} source={item?.icon} />
                  <Text style={styles.listtitle}>{item?.itemName}</Text>
                </View>
                {item?.route !== 'Logout' && (
                  <Image style={styles.righticon} source={images.RightArrow} />
                )}
              </TouchableOpacity>
            );
          }}
        />
        <TouchableOpacity style={styles.trashcontainer}>
          <RNImage style={styles.trashicon} source={images.trashicon} />
          <Text style={styles.trashtitle}>{'Delete Account'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.conectbutton}>
          <RNImage source={images.contactus} style={styles.contacticon} />
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  profileframe: {
    width: wp(104),
    height: hp(104),
    backgroundColor: Color?.BlueD5,
    borderRadius: wp(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(18),
    marginTop: hp(20),
  },
  profileimg: {
    width: wp(94),
    height: hp(94),
    borderRadius: wp(10),
  },
  namecontainer: {
    marginLeft: wp(18),
    marginTop: hp(20),
  },
  title: {
    ...commonFontStyle(fontFamily.semi_bold, 22, Color?.Black),
    lineHeight: hp(27),
  },
  username: {
    ...commonFontStyle(fontFamily.regular, 15, Color?.Grey66),
    lineHeight: hp(20),
    marginTop: hp(6),
  },
  locationpin: {
    width: wp(16),
    height: wp(16),
  },
  location: {
    ...commonFontStyle(fontFamily.regular, 14, Color?.Grey66),
    marginRight: wp(10),
    marginLeft: wp(6),
  },
  locationcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(15),
  },
  saparator: {
    width: wp(4),
    height: wp(4),
    borderRadius: wp(100),
    backgroundColor: Color?.GreyB0,
  },
  ratingbadge: {
    backgroundColor: Color?.Green1B,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp(3),
    paddingVertical: hp(5),
    paddingHorizontal: wp(5),
    borderRadius: wp(8),
    marginLeft: wp(10),
  },
  staricon: {
    width: wp(9),
    height: wp(9),
    tintColor: Color?.White,
  },
  ratingtitle: {
    ...commonFontStyle(fontFamily.medium, 12, Color?.White),
  },
  count: {
    ...commonFontStyle(fontFamily.medium, 14, Color?.Grey6E),
    marginLeft: wp(3),
  },
  listcontainer: {
    marginTop: hp(40),
    paddingHorizontal: wp(20),
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(20),
  },
  listicon: {
    width: wp(20),
    height: wp(20),
  },
  leftcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(15),
  },
  righticon: {
    width: wp(20),
    height: wp(20),
  },
  listtitle: {
    ...commonFontStyle(fontFamily.medium, 16, Color?.Black),
  },
  trashicon: {
    width: wp(24),
    height: wp(24),
  },
  trashtitle: {
    ...commonFontStyle(fontFamily.medium, 16, Color?.Red),
  },
  trashcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(12),
    marginTop: hp(30),
    alignSelf: 'flex-start',
  },
  contacticon: {
    width: wp(127),
    height: hp(48),
  },
  conectbutton: {
    alignSelf: 'flex-start',
    marginVertical: hp(29),
  },
});

export default DrawerMenu;

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {DrawerContentComponentProps} from '@react-navigation/drawer';
// import {Image, Text} from 'components';
// import {AppContext} from 'context';
// import globalStyle from 'globalStyles';
// import images from 'images';
// import React, {FC, useContext} from 'react';
// import {Pressable, View} from 'react-native';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import tw from 'rn-tailwind';

// interface Props {
//   props: DrawerContentComponentProps;
// }

// const drawerMenuItems = [
//   {
//     itemName: 'My Wallet',
//     route: 'MyWallet',
//     icon: images.WalletIcon,
//   },
//   {
//     itemName: 'Notifications Setting',
//     route: 'NotificationSetting',
//     icon: images.BellIcon,
//   },
//   {
//     itemName: 'My Reviews',
//     route: 'MyReviews',
//     icon: images.EmptyStarIcon,
//   },

//   {
//     itemName: 'FAQs',
//     route: 'Faq',
//     icon: images.FaqIcon,
//   },
//   {
//     itemName: 'Log Out',
//     route: 'Logout',
//     icon: images.logoutIcon,
//   },
// ];

// const DrawerMenu: FC<Props> = ({props}) => {
//   const insets = useSafeAreaInsets();
//   const {setIsLogin, setUserDetails} = useContext(AppContext);
//   const {navigation} = props;
//   return (
//     <View
//       style={[
//         styles.container,
//         globalStyle.statusBar,
//         {paddingTop: insets.top},
//       ]}>
//       <View style={styles.drawerContainer}>
//         <Image
//           resizeMode="cover"
//           source={{
//             uri: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
//           }}
//           style={styles.profileImage}
//         />
//         <Image
//           resizeMode="cover"
//           source={{
//             uri: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
//           }}
//           style={styles.profileAvtar}
//         />
//         <View style={styles.wrapper}>
//           <Text color="text-black" fontWeight="800" size="base">
//             {'Nicson John'}
//           </Text>
//           <Text color="text-darkGrey" margin="mt-1" size="sm">
//             {'@nicksjohn466@gmail.com'}
//           </Text>
//           <View style={styles.locationView}>
//             <Image
//               tintColor={'#666666'}
//               style={styles.locationIcon}
//               resizeMode="contain"
//               source={images.Location}
//             />
//             <Text numberOfLines={1} style={styles.addressText} size="sm">
//               {'  North side, Melt Road'}
//             </Text>
//             <Text color="text-darkGrey" fontWeight="700" size="lg">
//               •
//             </Text>
//             <Image
//               style={styles.starIcon}
//               resizeMode="contain"
//               source={images.StarsIcon}
//             />
//             <Text color="text-black" size="sm">
//               {'  4.6'}
//             </Text>
//             <Text color="text-darkGrey" size="sm">
//               (20)
//             </Text>
//           </View>
//           <View style={styles.followerView}>
//             <Image
//               style={styles.followerIcon}
//               source={images.FollowerIcon}
//               resizeMode="contain"
//             />
//             <Text color="text-black" size="sm">
//               {' 2k'}
//             </Text>
//             <Text
//               onPress={() => navigation.navigate('Followers')}
//               color="text-darkGrey"
//               size="sm">
//               Followers
//             </Text>
//             <Text color="text-darkGrey" fontWeight="700" size="lg">
//               {' • '}
//             </Text>
//             <Image
//               style={styles.followerIcon}
//               source={images.FollowerIcon}
//               resizeMode="contain"
//             />
//             <Text color="text-black" size="sm">
//               {' 345'}
//             </Text>
//             <Text
//               onPress={() => navigation.navigate('Followings')}
//               color="text-darkGrey"
//               size="sm">
//               Following
//             </Text>
//           </View>
//           <View style={styles.menuView}>
//             {drawerMenuItems.map((data, index) => {
//               return (
//                 <Pressable
//                   key={index}
//                   onPress={() => {
//                     if (data.route === 'Logout') {
//                       AsyncStorage.clear();
//                       setIsLogin('false');
//                     } else if (data.route) {
//                       navigation.navigate(data.route);
//                     }
//                   }}
//                   style={[
//                     styles.menuContainer,
//                     index > 0 && {borderTopWidth: 1, borderTopColor: '#e3e3e3'},
//                   ]}>
//                   <Image
//                     style={styles.drawerIcon}
//                     source={data.icon}
//                     resizeMode="contain"
//                   />
//                   <Text
//                     style={tw`flex-1 w-full`}
//                     size="lg"
//                     margin="ml-4"
//                     fontWeight="600"
//                     color="text-black">
//                     {data.itemName}
//                   </Text>
//                   <Image
//                     style={styles.rigtArrow}
//                     source={images.RightArrow}
//                     resizeMode="contain"
//                   />
//                 </Pressable>
//               );
//             })}
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = {
//   container: tw`w-full h-full`,
//   drawerContainer: tw`w-full px-4 h-full bg-white`,
//   profileImage: tw`w-full h-27 rounded-lg`,
//   profileAvtar: tw`w-22 h-22 rounded-lg border-4 border-white top--11 ml-4 `,
//   wrapper: tw`w-full top--9`,
//   locationView: tw`w-full flex-row items-center mt-3`,
//   locationIcon: tw`w-4.5 h-4.5`,
//   addressText: tw`text-darkGrey w-38`,
//   followerView: tw`flex-row w-full mt-1 items-center `,
//   starIcon: tw`w-4 h-4 ml-1`,
//   followerIcon: tw`w-5 h-5`,
//   menuContainer: tw`w-full h-14 flex-row items-center`,
//   drawerIcon: tw`w-7 h-7`,
//   rigtArrow: tw`w-6 h-6`,
//   menuView: tw`mt-4`,
// };

// export default DrawerMenu;
