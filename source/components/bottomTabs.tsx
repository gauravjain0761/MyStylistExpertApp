import React, {FC, useContext} from 'react';
import images from 'images';
import tw from 'rn-tailwind';
import {Pressable, Image, View, StyleSheet, Text} from 'react-native';
import {AppContext} from 'context';
import {useNavigation} from '@react-navigation/native';
import {
  commonFontStyle,
  fontFamily,
  hp,
  screen_width,
  wp,
} from '../utils/dimentions';
import Color from '../../assets/color';
import Container from './container';

const BottomTab: FC = () => {
  const navigation = useNavigation();
  const {activeRoute} = useContext(AppContext);
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate('Home')}
        style={styles.button}>
        <Image
          style={styles.tabIcon}
          resizeMode="contain"
          source={images.bottomhome}
          tintColor={activeRoute === 'Home' ? '#000000' : '#666666'}
        />
        <Text
          style={[
            styles.label,
            {
              color: activeRoute === 'Home' ? 'text-black' : '#666666',
            },
          ]}>
          Home
        </Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('MyReviews')}
        style={styles.button}>
        <Image
          style={styles.tabIcon}
          resizeMode="contain"
          source={images.bottomappointment}
          tintColor={activeRoute === 'MyReviews' ? '#000000' : '#666666'}
        />
        <Text
          style={[
            styles.label,
            {
              color: activeRoute === 'MyReviews' ? 'text-black' : '#666666',
            },
          ]}>
          My Reviews
        </Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('Chats')}
        style={styles.button}>
        <Image
          style={styles.tabIcon}
          resizeMode="contain"
          source={images.bottomchat}
          tintColor={activeRoute === 'Chats' ? '#000000' : '#666666'}
        />
        <Text
          style={[
            styles.label,
            {
              color: activeRoute === 'Chats' ? 'text-black' : '#666666',
            },
          ]}>
          Chat
        </Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('Profile')}
        style={styles.button}>
        <Image
          style={styles.tabIcon}
          resizeMode="contain"
          source={images.bottomprofile}
          tintColor={activeRoute === 'Profile' ? '#000000' : '#666666'}
        />
        <Text
          style={[
            styles.label,
            {
              color: activeRoute === 'Profile' ? '#000000' : '#666666',
            },
          ]}>
          Profile
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: tw`w-full h-17 flex-row bg-white gap-8`,
  container: {
    width: screen_width,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingHorizontal: wp(25),
    gap: hp(8),
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp(16),
    paddingBottom: hp(13),
  },
  tabIcon: {
    width: wp(24),
    height: wp(24),
  },
  label: {
    ...commonFontStyle(fontFamily.regular, 14, Color?.Grey66),
  },
});

export default BottomTab;

// import React, {FC, useContext} from 'react';
// import images from 'images';
// import tw from 'rn-tailwind';
// import {Text} from 'components';
// import {Pressable, Image, View} from 'react-native';
// import {AppContext} from 'context';
// import {useNavigation} from '@react-navigation/native';

// const BottomTab: FC = () => {
//   const navigation = useNavigation();
//   const {activeRoute} = useContext(AppContext);
//   return (
//     <View style={styles.container}>
//       <Pressable
//         onPress={() => navigation.navigate('Home')}
//         style={styles.button}>
//         <Image
//           style={styles.tabIcon}
//           resizeMode="contain"
//           source={images.HomeIcon}
//           tintColor={activeRoute === 'Home' ? '#000000' : '#666666'}
//         />
//         <Text
//           size="xs"
//           color={activeRoute === 'Home' ? 'text-black' : 'text-[#666666]'}>
//           Home
//         </Text>
//       </Pressable>
//       <Pressable
//         onPress={() => navigation.navigate('StylistFeeds')}
//         style={styles.button}>
//         <Image
//           style={styles.tabIcon}
//           resizeMode="contain"
//           source={images.FeedIcon}
//           tintColor={activeRoute === 'StylistFeeds' ? '#000000' : '#666666'}
//         />
//         <Text
//           size="xs"
//           color={
//             activeRoute === 'StylistFeeds' ? 'text-black' : 'text-[#666666]'
//           }>
//           Feed
//         </Text>
//       </Pressable>
//       <Pressable
//         onPress={() => navigation.navigate('Chats')}
//         style={styles.button}>
//         <Image
//           style={styles.tabIcon}
//           resizeMode="contain"
//           source={images.ChatIcon}
//           tintColor={activeRoute === 'Chats' ? '#000000' : '#666666'}
//         />
//         <Text
//           size="xs"
//           color={activeRoute === 'Chats' ? 'text-black' : 'text-[#666666]'}>
//           Chat
//         </Text>
//       </Pressable>
//       <Pressable
//         onPress={() => navigation.navigate('Profile')}
//         style={styles.button}>
//         <Image
//           style={styles.tabIcon}
//           resizeMode="contain"
//           source={images.profile}
//           tintColor={activeRoute === 'Profile' ? '#000000' : '#666666'}
//         />
//         <Text
//           size="xs"
//           color={activeRoute === 'Profile' ? 'text-black' : 'text-[#666666]'}>
//           Profile
//         </Text>
//       </Pressable>
//     </View>
//   );
// };

// const styles = {
//   container: tw`w-full h-17 flex-row bg-white gap-8`,
//   button: tw`flex-1 w-full h-full items-center justify-center`,
//   tabIcon: tw`w-7 h-7`,
// };

// export default BottomTab;
