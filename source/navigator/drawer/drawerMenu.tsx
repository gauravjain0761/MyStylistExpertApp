import AsyncStorage from '@react-native-async-storage/async-storage';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {Image, Text} from 'components';
import {AppContext} from 'context';
import globalStyle from 'globalStyles';
import images from 'images';
import React, {FC, useContext} from 'react';
import {Pressable, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import tw from 'rn-tailwind';

interface Props {
  props: DrawerContentComponentProps;
}

const drawerMenuItems = [
  {
    itemName: 'My Wallet',
    route: 'MyWallet',
    icon: images.WalletIcon,
  },
  {
    itemName: 'Notifications Setting',
    route: 'NotificationSetting',
    icon: images.BellIcon,
  },
  {
    itemName: 'My Reviews',
    route: 'MyReviews',
    icon: images.EmptyStarIcon,
  },

  {
    itemName: 'FAQs',
    route: 'Faq',
    icon: images.FaqIcon,
  },
  {
    itemName: 'Log Out',
    route: 'Logout',
    icon: images.logoutIcon,
  },
];

const DrawerMenu: FC<Props> = ({props}) => {
  const insets = useSafeAreaInsets();
  const {setIsLogin, setUserDetails} = useContext(AppContext);
  const {navigation} = props;
  return (
    <View
      style={[
        styles.container,
        globalStyle.statusBar,
        {paddingTop: insets.top},
      ]}>
      <View style={styles.drawerContainer}>
        <Image
          resizeMode="cover"
          source={{
            uri: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
          }}
          style={styles.profileImage}
        />
        <Image
          resizeMode="cover"
          source={{
            uri: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
          }}
          style={styles.profileAvtar}
        />
        <View style={styles.wrapper}>
          <Text color="text-black" fontWeight="800" size="base">
            {'Nicson John'}
          </Text>
          <Text color="text-darkGrey" margin="mt-1" size="sm">
            {'@nicksjohn466@gmail.com'}
          </Text>
          <View style={styles.locationView}>
            <Image
              tintColor={'#666666'}
              style={styles.locationIcon}
              resizeMode="contain"
              source={images.Location}
            />
            <Text numberOfLines={1} style={styles.addressText} size="sm">
              {'  North side, Melt Road'}
            </Text>
            <Text color="text-darkGrey" fontWeight="700" size="lg">
              •
            </Text>
            <Image
              style={styles.starIcon}
              resizeMode="contain"
              source={images.StarsIcon}
            />
            <Text color="text-black" size="sm">
              {'  4.6'}
            </Text>
            <Text color="text-darkGrey" size="sm">
              (20)
            </Text>
          </View>
          <View style={styles.followerView}>
            <Image
              style={styles.followerIcon}
              source={images.FollowerIcon}
              resizeMode="contain"
            />
            <Text color="text-black" size="sm">
              {' 2k'}
            </Text>
            <Text
              onPress={() => navigation.navigate('Followers')}
              color="text-darkGrey"
              size="sm">
              Followers
            </Text>
            <Text color="text-darkGrey" fontWeight="700" size="lg">
              {' • '}
            </Text>
            <Image
              style={styles.followerIcon}
              source={images.FollowerIcon}
              resizeMode="contain"
            />
            <Text color="text-black" size="sm">
              {' 345'}
            </Text>
            <Text
              onPress={() => navigation.navigate('Followings')}
              color="text-darkGrey"
              size="sm">
              Following
            </Text>
          </View>
          <View style={styles.menuView}>
            {drawerMenuItems.map((data, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    if (data.route === 'Logout') {
                      AsyncStorage.clear();
                      setIsLogin('false');
                    } else if (data.route) {
                      navigation.navigate(data.route);
                    }
                  }}
                  style={[
                    styles.menuContainer,
                    index > 0 && {borderTopWidth: 1, borderTopColor: '#e3e3e3'},
                  ]}>
                  <Image
                    style={styles.drawerIcon}
                    source={data.icon}
                    resizeMode="contain"
                  />
                  <Text
                    style={tw`flex-1 w-full`}
                    size="lg"
                    margin="ml-4"
                    fontWeight="600"
                    color="text-black">
                    {data.itemName}
                  </Text>
                  <Image
                    style={styles.rigtArrow}
                    source={images.RightArrow}
                    resizeMode="contain"
                  />
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: tw`w-full h-full`,
  drawerContainer: tw`w-full px-4 h-full bg-white`,
  profileImage: tw`w-full h-27 rounded-lg`,
  profileAvtar: tw`w-22 h-22 rounded-lg border-4 border-white top--11 ml-4 `,
  wrapper: tw`w-full top--9`,
  locationView: tw`w-full flex-row items-center mt-3`,
  locationIcon: tw`w-4.5 h-4.5`,
  addressText: tw`text-darkGrey w-38`,
  followerView: tw`flex-row w-full mt-1 items-center `,
  starIcon: tw`w-4 h-4 ml-1`,
  followerIcon: tw`w-5 h-5`,
  menuContainer: tw`w-full h-14 flex-row items-center`,
  drawerIcon: tw`w-7 h-7`,
  rigtArrow: tw`w-6 h-6`,
  menuView: tw`mt-4`,
};

export default DrawerMenu;
