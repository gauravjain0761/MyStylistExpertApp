import React, {FC, useContext, useEffect, useState} from 'react';
import images from 'images';
import tw from 'rn-tailwind';
import {RootStackParamList} from '..';
import globalStyle from 'globalStyles';
import {RouteProp} from '@react-navigation/native';
import {
  FlatList,
  Pressable,
  View,
  Text as RNText,
  StyleSheet,
} from 'react-native';
import {BottomTab, ChatUserCard, Container, Image, Text} from 'components';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useChat from './hooks';
import {commonFontStyle, fontFamily, hp, wp} from '../../utils/dimentions';
import Color from '../../../assets/color';
import {endPoints} from '../../../config';
import APICaller from '../../service/apiCaller';
import {NativeToast} from '../../utils/toast';
import {AppContext} from 'context';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Chats'>;
  route: RouteProp<RootStackParamList, 'Chats'>;
};

const Chats: FC<Props> = ({navigation}) => {
  const {chatUsers, getAllUserList} = useChat();

  const [activeTab, setActiveTab] = useState<string>('All');
  const {createRoom, messagesReads} = endPoints;
  const {userDetails} = useContext(AppContext);
  const {_id} = userDetails;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllUserList();
    });
    return unsubscribe;
  }, []);

  const onPressCart = async (item: any) => {
    try {
      const url = `${createRoom}`;
      const body = {
        participants: [item?._id, _id],
      };
      const response = await APICaller.post(url, body);
      const {data} = response;
      const {roomId} = data;
      if (data && roomId) {
        console.log('room id', data);
        messagesRead(roomId);
        navigation.navigate('ChatDetail', {
          roomId: roomId,
          receiverId: item?._id,
          receiverImage: item?.user_profile_images,
          device_token: item?.device_token,
          receiverName: item?.name,
        });
      }
    } catch (error) {
      console.log('error of create room', error);
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
    <Container>
      <View style={globalStyle.container}>
        <View style={styles.chatHeader}>
          <Text size="base" fontWeight="800">
            {'Messages'}
          </Text>
          <View style={styles.topButtons}>
            <View style={[styles.buttonWrapper, globalStyle.bothContentCenter]}>
              <Pressable
                onPress={() => {
                  setActiveTab('All');
                }}
                style={[
                  tw`bg-${
                    activeTab === 'All' ? 'primary' : 'transparent'
                  } flex-1`,
                  styles.buttoncontainer,
                ]}>
                <RNText
                  style={[
                    activeTab === 'All' ? styles.focuselabel : styles.label,
                  ]}>
                  All
                </RNText>
              </Pressable>
              <Pressable
                onPress={() => {
                  setActiveTab('Unread Messages');
                }}
                style={[
                  tw`bg-${
                    activeTab === 'Unread Messages' ? 'primary' : 'transparent'
                  } flex-1`,
                  styles.buttoncontainer,
                  {flexDirection: 'row', gap: wp(3)},
                ]}>
                <RNText
                  style={[
                    activeTab === 'Unread Messages'
                      ? styles.focuselabel
                      : styles.label,
                  ]}>
                  Unread Messages
                </RNText>
                <View
                  style={[
                    styles.messageCount,
                    globalStyle.bothContentCenter,
                    {
                      backgroundColor:
                        activeTab == 'Unread Messages'
                          ? Color?.White
                          : Color?.Green,
                    },
                  ]}>
                  <RNText style={styles.countTitle}>{'12'}</RNText>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.mainView}>
          <View style={styles.allMessageHeader}>
            <Image
              resizeMode="contain"
              source={images.ChatPrimary}
              style={styles.messageIcon}
            />
            <Text margin="ml-2 mb-1" color="text-darkGrey" size="sm">
              All Messages
            </Text>
          </View>
          <View style={styles.listView}>
            <FlatList
              data={chatUsers}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({item, index}) => {
                const {_id, name, user_profile_images} = item;
                const {image} = user_profile_images.length
                  ? user_profile_images?.[0]
                  : {};
                return (
                  <ChatUserCard
                    data={item}
                    index={index}
                    onPressCard={() => onPressCart(item)}
                  />
                );
              }}
            />
          </View>
        </View>
        <BottomTab />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  chatHeader: {...tw`w-full bg-white pt-4`, paddingHorizontal: wp(20)},
  mainView: tw`w-full h-full flex-1 bg-white`,
  headerButtonView: tw`w-full flex-row mt-4`,
  messageCount: {
    width: wp(19),
    height: wp(19),
    borderRadius: wp(100),
    backgroundColor: Color?.Green,
  },
  allMessageHeader: tw`w-full items-center pl-4 flex-row`,
  messageIcon: tw`w-3.5 h-3.5`,
  listView: tw`w-full h-full flex-1 px-4`,
  separator: tw`w-full h-0.3 bg-gray-200`,
  list: tw`pb-4`,
  topButtons: {
    ...tw`w-full items-center`,
    marginTop: hp(24),
    marginBottom: hp(21),
  },

  buttonWrapper: {
    ...tw`w-full rounded-lg bg-aliceBlue flex-row`,
    padding: wp(10),
  },
  buttoncontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(4),
  },
  focuselabel: {
    ...commonFontStyle(fontFamily.semi_bold, 14, Color?.Black),
    lineHeight: hp(17),
    paddingVertical: hp(12),
  },
  label: {
    ...commonFontStyle(fontFamily.medium, 14, Color?.Black),
    paddingVertical: hp(12),
  },
  countTitle: {
    ...commonFontStyle(fontFamily.semi_bold, 10, Color?.Black),
  },
});

export default Chats;

// import React, {FC, useEffect} from 'react';
// import images from 'images';
// import tw from 'rn-tailwind';
// import {RootStackParamList} from '..';
// import globalStyle from 'globalStyles';
// import {RouteProp} from '@react-navigation/native';
// import {FlatList, Pressable, View} from 'react-native';
// import {BottomTab, ChatUserCard, Container, Image, Text} from 'components';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import useChat from './hooks';

// type Props = {
//   navigation: NativeStackNavigationProp<RootStackParamList, 'Chats'>;
//   route: RouteProp<RootStackParamList, 'Chats'>;
// };

// const Chats: FC<Props> = ({navigation}) => {
//   const {chatUsers, getAllUserList} = useChat();

//   useEffect(() => {
//     getAllUserList();
//   }, []);

//   return (
//     <Container>
//       <View style={globalStyle.container}>
//         <View style={styles.chatHeader}>
//           <Text size="base" fontWeight="800">
//             {'Messages'}
//           </Text>
//           <View style={styles.headerButtonView}>
//             <Pressable
//               style={[styles.allButton, globalStyle.bothContentCenter]}>
//               <Text size="sm" fontWeight="800">
//                 {'All'}
//               </Text>
//             </Pressable>
//             {/* <Pressable
//               style={[styles.unreadButton, globalStyle.bothContentCenter]}>
//               <Text size="sm" color="text-darkGrey" fontWeight="600">
//                 {'Unread Messages'}
//               </Text>
//               <View
//                 style={[styles.messageCount, globalStyle.bothContentCenter]}>
//                 <Text size="xs" color="text-white">
//                   {'2'}
//                 </Text>
//               </View>
//             </Pressable> */}
//           </View>
//         </View>
//         <View style={styles.mainView}>
//           <View style={styles.allMessageHeader}>
//             <Image
//               resizeMode="contain"
//               source={images.ChatPrimary}
//               style={styles.messageIcon}
//             />
//             <Text margin="ml-2 mb-1" color="text-darkGrey" size="sm">
//               All Messages
//             </Text>
//           </View>
//           <View style={styles.listView}>
//             <FlatList
//               data={chatUsers}
//               contentContainerStyle={styles.list}
//               showsVerticalScrollIndicator={false}
//               keyExtractor={(item, index) => index.toString()}
//               ItemSeparatorComponent={() => <View style={styles.separator} />}
//               renderItem={({item, index}) => {
//                 const {_id, name, user_profile_images} = item;
//                 const {image_medium} = user_profile_images.length
//                   ? user_profile_images[0]
//                   : {};
//                 return (
//                   <ChatUserCard
//                     data={item}
//                     index={index}
//                     onPressCard={() =>
//                       navigation.navigate('ChatDetail', {
//                         receiverId: _id,
//                         receiverName: name,
//                         receiverImage: image_medium,
//                       })
//                     }
//                   />
//                 );
//               }}
//             />
//           </View>
//         </View>
//         <BottomTab />
//       </View>
//     </Container>
//   );
// };

// const styles = {
//   chatHeader: tw`h-29 w-full bg-white pt-4 pl-4`,
//   mainView: tw`w-full h-full flex-1 bg-cultured`,
//   headerButtonView: tw`w-full flex-row mt-4`,
//   allButton: tw`w-15 h-10 rounded-full bg-primary`,
//   unreadButton: tw`px-4 h-10 rounded-full bg-gray-100 flex-row ml-4`,
//   messageCount: tw`w-5 h-5 rounded-full bg-primary ml-3`,
//   allMessageHeader: tw`w-full h-10 items-center pl-4 flex-row mt-3`,
//   messageIcon: tw`w-3.5 h-3.5`,
//   listView: tw`w-full h-full flex-1 px-4`,
//   separator: tw`w-full h-0.3 bg-gray-200`,
//   list: tw`pb-4`,
// };

// export default Chats;
