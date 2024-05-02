import React, {FC, useContext} from 'react';
import images from 'images';
import tw from 'rn-tailwind';
import {Text} from 'components';
import {Pressable, Image, View} from 'react-native';
import {AppContext} from 'context';
import {useNavigation} from '@react-navigation/native';

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
          source={images.HomeIcon}
          tintColor={activeRoute === 'Home' ? '#000000' : '#666666'}
        />
        <Text
          size="xs"
          color={activeRoute === 'Home' ? 'text-black' : 'text-[#666666]'}>
          Home
        </Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('StylistFeeds')}
        style={styles.button}>
        <Image
          style={styles.tabIcon}
          resizeMode="contain"
          source={images.FeedIcon}
          tintColor={activeRoute === 'StylistFeeds' ? '#000000' : '#666666'}
        />
        <Text
          size="xs"
          color={
            activeRoute === 'StylistFeeds' ? 'text-black' : 'text-[#666666]'
          }>
          Feed
        </Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('Chats')}
        style={styles.button}>
        <Image
          style={styles.tabIcon}
          resizeMode="contain"
          source={images.ChatIcon}
          tintColor={activeRoute === 'Chats' ? '#000000' : '#666666'}
        />
        <Text
          size="xs"
          color={activeRoute === 'Chats' ? 'text-black' : 'text-[#666666]'}>
          Chat
        </Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('Profile')}
        style={styles.button}>
        <Image
          style={styles.tabIcon}
          resizeMode="contain"
          source={images.profile}
          tintColor={activeRoute === 'Profile' ? '#000000' : '#666666'}
        />
        <Text
          size="xs"
          color={activeRoute === 'Profile' ? 'text-black' : 'text-[#666666]'}>
          Profile
        </Text>
      </Pressable>
    </View>
  );
};

const styles = {
  container: tw`w-full h-17 flex-row bg-white gap-8`,
  button: tw`flex-1 w-full h-full items-center justify-center`,
  tabIcon: tw`w-7 h-7`,
};

export default BottomTab;
