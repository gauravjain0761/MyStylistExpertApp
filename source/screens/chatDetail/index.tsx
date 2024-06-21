import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {ChatBubble, Container, Text} from 'components';
import globalStyle from 'globalStyles';
import tw from 'rn-tailwind';
import images from 'images';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '..';
import useChatDetail from './hooks';
import {hp, wp} from '../../utils/dimentions';
import Color from '../../../assets/color';
import {NativeToast} from '../../utils/toast';
import APICaller from '../../service/apiCaller';
import {appConfig, endPoints} from '../../../config';
import {AppContext} from 'context';
import {io} from 'socket.io-client';
import {useAppDispatch} from 'store';
import {getAsyncDevice_token} from '../../dataAccess';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ChatDetail'>;
  route: RouteProp<RootStackParamList, 'ChatDetail'>;
};

const ChatDetail: FC<Props> = ({route, navigation}) => {
  const {
    receiverId,
    receiverName,
    receiverImage,
    device_token,
    roomId: RoomID,
  } = route.params;
  const [roomId, setRoomId] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [userTyping, setUserTyping] = useState<boolean>(false);
  const [userOnline, setUserOnline] = useState<boolean>(false);
  const [messageList, setMessageList] = useState([]);

  const {mainDomain, IMG_URL} = appConfig;
  const dispatch = useAppDispatch();

  const socket = io(mainDomain);

  const {userDetails} = useContext(AppContext);
  const {_id, user_profile_images, name} = userDetails;

  const flatListRef = useRef<any>(null);

  const joinRoom = (roomId: string) => {
    if (roomId !== '') {
      socket.emit('join_room', roomId);
      socket.emit('user_online', {chatid: roomId, name: _id});
      getoldMessages(roomId);
    }
  };

  const getoldMessages = (joinRoom: String) => {
    socket.emit('fetch_messages', joinRoom);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (flatListRef?.current) {
      setTimeout(() => {
        flatListRef?.current?.scrollToEnd({animated: true});
      }, 300);
    }
  };

  useEffect(() => {
    joinRoom(RoomID);
    setRoomId(RoomID);
    socket.on('receive_message', (res: any) => {
      socket.emit('fetch_messages', roomId);
      setMessageList(list => [...list, res]);
      scrollToBottom();
    });
    socket.on('update_online_users', data => {
      data.map((data: any) => {
        if (data?.name === receiverId) {
          setUserOnline(true);
          return;
        }
      });
    });
    socket.on('past_messages', (data: any) => {
      const messages = data?.messages.map((item: any) => {
        const messageData = {
          chatId: item.chat,
          senderId: item.sender._id,
          content: item.content,
          time: item.timestamp,
        };
        return messageData;
      });
      setMessageList(messages);
      scrollToBottom();
    });
    socket.on('user_typing', data => {
      console.log('user_typing', data?.username, receiverId);
      if (data?.username === receiverId) {
        setUserTyping(true);
      }
    });
    socket.on('user_stopped_typing', data => {
      if (data?.username === receiverId) {
        setUserTyping(false);
      }
    });
  }, [receiverId, roomId]);

  const sendMessage = async () => {
    if (message !== '') {
      socket.emit('typing_end', {
        chatId: roomId,
        username: _id,
      });
      const messageData = {
        chatId: roomId,
        senderId: _id,
        content: message,
        time: new Date(),
        device_token: device_token,
        user_image: user_profile_images?.[0]?.image,
        name: name,
      };
      socket.emit('send_message', messageData);
      scrollToBottom();
      socket.emit('fetch_messages', roomId);
      setMessage('');
    }
  };

  const renderChatList = ({item, index}: any) => {
    return (
      <ChatBubble
        data={item}
        key={index}
        userId={_id}
        receiverName={receiverName}
        image={receiverImage[0]?.image || {}}
      />
    );
  };

  return (
    <Container>
      <KeyboardAvoidingView
        style={{flex: 1, width: '100%', height: '100%'}}
        behavior={Platform.OS == 'android' ? 'height' : 'padding'}>
        <View style={[globalStyle.container, styles.container]}>
          <View style={styles.header}>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.leftView}>
              <Image
                style={styles.backIcon}
                resizeMode="contain"
                source={images.BackwardIcon}
              />
            </Pressable>
            <View style={styles.centerView}>
              <View style={styles.imageView}>
                <Image
                  style={styles.profileImage}
                  resizeMode="cover"
                  source={{
                    uri: `${IMG_URL}/${receiverImage[0]?.image}`,
                  }}
                />
                <View
                  style={[styles.onlineView, globalStyle.bothContentCenter]}>
                  <Image
                    tintColor={'#ffffff'}
                    style={styles.check}
                    resizeMode="cover"
                    source={images.Check}
                  />
                </View>
              </View>
              <View style={styles.nameView}>
                <Text size="sm" fontWeight="800">
                  {receiverName}
                </Text>
                <Text size="xs" color="text-gray-500" fontWeight="600">
                  {userTyping ? 'Typing..' : userOnline ? 'Online' : 'Offline'}
                </Text>
              </View>
            </View>
            <Pressable style={styles.rightView}>
              <Image
                style={styles.threeDot}
                resizeMode="contain"
                source={images.ThreeDotsIcon}
              />
            </Pressable>
          </View>
          <View style={styles.chatView}>
            <FlatList
              data={messageList}
              ref={flatListRef}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderChatList}
            />
          </View>
          <View style={styles.inputWrapper}>
            <View style={styles.wrapper}>
              <TextInput
                placeholder="Type here..."
                style={styles.input}
                value={message}
                onChangeText={value => {
                  setMessage(value);
                  if (value.trim().length > 0) {
                    console.log('typing_start typing_start', _id);
                    socket.emit('typing_start', {
                      chatId: roomId,
                      username: _id,
                      userType: 'stylist',
                    });
                  } else {
                    socket.emit('typing_end', {
                      chatId: roomId,
                      username: _id,
                    });
                  }
                }}
              />
              {/* <Pressable style={styles.inputButton}>
                <Image
                  style={styles.inputIcons}
                  resizeMode="contain"
                  source={images.SmileIcon}
                />
              </Pressable>
              <Pressable style={styles.inputButton}>
                <Image
                  style={styles.inputIcons}
                  resizeMode="contain"
                  source={images.MikeIcon}
                />
              </Pressable>
              <Pressable style={styles.inputButton}>
                <Image
                  style={styles.inputIcons}
                  resizeMode="contain"
                  source={images.AttachmentIcon}
                />
              </Pressable> */}
              <Pressable
                onPress={() => sendMessage()}
                style={styles.sendButton}>
                <Image
                  style={styles.inputIcons}
                  resizeMode="contain"
                  source={images.sendicon}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {...tw`w-full h-14 flex-row px-4`, backgroundColor: Color?.White},
  backIcon: tw`w-5 h-5`,
  leftView: tw`w-10 h-full justify-center`,
  centerView: tw`flex-3.5 w-full h-full items-center flex-row`,
  rightView: tw` w-10 h-full justify-center items-end`,
  imageView: tw`w-11 h-11 border-2 border-primary rounded-full items-center  justify-center`,
  profileImage: tw`w-9 h-9 rounded-full`,
  check: tw`w-2 h-2`,
  threeDot: tw`w-8 h-8`,
  nameView: tw`h-full justify-center pl-3`,
  onlineView: tw`w-3.5 h-3.5 right--1 bottom-1 bg-[#4ade80] rounded-full absolute`,
  chatView: tw`flex-1 w-full h-full bg-cultured`,
  inputWrapper: {...tw`w-full items-center px-4`, paddingTop: hp(10)},
  wrapper: {
    backgroundColor: Color?.InputGrey,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: wp(1),
    borderColor: Color?.GreyEB,
    borderRadius: wp(16),
    paddingVertical: hp(14),
    marginBottom: hp(10),
  },
  input: {
    ...tw`flex-1 w-full bg-transparent`,
    marginLeft: wp(25),
  },
  inputButton: tw`w-8 h-full items-center justify-center`,
  inputIcons: {
    width: wp(24),
    height: wp(24),
    marginHorizontal: wp(10),
    marginVertical: hp(9),
  },
  sendButton: {
    backgroundColor: Color?.Green,
    marginRight: wp(14),
    borderRadius: wp(10),
  },
  container: tw`bg-cultured`,
});

export default ChatDetail;

// import React, {FC, useEffect} from 'react';
// import {
//   FlatList,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   Pressable,
//   View,
// } from 'react-native';
// import {ChatBubble, Container, Text, TextInput} from 'components';
// import globalStyle from 'globalStyles';
// import tw from 'rn-tailwind';
// import images from 'images';
// import {RouteProp} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {RootStackParamList} from '..';
// import useChatDetail from './hooks';

// type Props = {
//   navigation: NativeStackNavigationProp<RootStackParamList, 'ChatDetail'>;
//   route: RouteProp<RootStackParamList, 'ChatDetail'>;
// };

// const ChatDetail: FC<Props> = ({route, navigation}) => {
//   const {receiverId, receiverName, receiverImage} = route.params;
//   const {
//     message,
//     createChatRoom,
//     sendMessage,
//     setMessage,
//     messageList,
//     userDetails,
//   } = useChatDetail(receiverId);
//   const {_id} = userDetails;

//   useEffect(() => {
//     createChatRoom();
//   }, []);

//   const renderChatList = ({item, index}: any) => {
//     return (
//       <ChatBubble
//         data={item}
//         key={index}
//         userId={_id}
//         receiverName={receiverName}
//       />
//     );
//   };

//   return (
//     <Container>
//       <KeyboardAvoidingView
//         style={{flex: 1, width: '100%', height: '100%'}}
//         behavior={Platform.OS == 'android' ? 'height' : 'padding'}>
//         <View style={globalStyle.container}>
//           <View style={styles.header}>
//             <Pressable
//               onPress={() => {
//                 navigation.goBack();
//               }}
//               style={styles.leftView}>
//               <Image
//                 style={styles.backIcon}
//                 resizeMode="contain"
//                 source={images.BackwardIcon}
//               />
//             </Pressable>
//             <View style={styles.centerView}>
//               <View style={styles.imageView}>
//                 <Image
//                   style={styles.profileImage}
//                   resizeMode="cover"
//                   source={{
//                     uri: receiverImage,
//                   }}
//                 />
//                 <View
//                   style={[styles.onlineView, globalStyle.bothContentCenter]}>
//                   <Image
//                     tintColor={'#ffffff'}
//                     style={styles.check}
//                     resizeMode="cover"
//                     source={images.Check}
//                   />
//                 </View>
//               </View>
//               <View style={styles.nameView}>
//                 <Text size="sm" fontWeight="800">
//                   {receiverName}
//                 </Text>
//                 <Text size="xs" color="text-gray-500" fontWeight="600">
//                   Online
//                 </Text>
//               </View>
//             </View>
//             <Pressable style={styles.rightView}>
//               <Image
//                 style={styles.threeDot}
//                 resizeMode="contain"
//                 source={images.ThreeDotsIcon}
//               />
//             </Pressable>
//           </View>
//           <View style={styles.chatView}>
//             <FlatList
//               data={messageList}
//               showsVerticalScrollIndicator={false}
//               keyExtractor={(item, index) => index.toString()}
//               renderItem={renderChatList}
//             />
//           </View>
//           <View style={styles.inputWrapper}>
//             <View style={styles.wrapper}>
//               <TextInput
//                 placeholder="Type here..."
//                 style={styles.input}
//                 value={message}
//                 onChangeText={value => setMessage(value)}
//               />
//               {/* <Pressable style={styles.inputButton}>
//                 <Image
//                   style={styles.inputIcons}
//                   resizeMode="contain"
//                   source={images.SmileIcon}
//                 />
//               </Pressable>
//               <Pressable style={styles.inputButton}>
//                 <Image
//                   style={styles.inputIcons}
//                   resizeMode="contain"
//                   source={images.MikeIcon}
//                 />
//               </Pressable>
//               <Pressable style={styles.inputButton}>
//                 <Image
//                   style={styles.inputIcons}
//                   resizeMode="contain"
//                   source={images.AttachmentIcon}
//                 />
//               </Pressable> */}
//               <Pressable
//                 onPress={() => sendMessage()}
//                 style={styles.sendButton}>
//                 <Image
//                   style={styles.inputIcons}
//                   resizeMode="contain"
//                   source={images.SendIcon}
//                 />
//               </Pressable>
//             </View>
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </Container>
//   );
// };

// const styles = {
//   header: tw`w-full h-14 flex-row px-4`,
//   backIcon: tw`w-5 h-5`,
//   leftView: tw`w-10 h-full justify-center`,
//   centerView: tw`flex-3.5 w-full h-full items-center flex-row`,
//   rightView: tw` w-10 h-full justify-center items-end`,
//   imageView: tw`w-11 h-11 border-2 border-primary rounded-full items-center  justify-center`,
//   profileImage: tw`w-9 h-9 rounded-full`,
//   check: tw`w-2 h-2`,
//   threeDot: tw`w-8 h-8`,
//   nameView: tw`h-full justify-center pl-3`,
//   onlineView: tw`w-3.5 h-3.5 right--1 bottom-1 bg-[#4ade80] rounded-full absolute`,
//   chatView: tw`flex-1 w-full h-full bg-cultured`,
//   inputWrapper: tw`w-full items-center h-20 px-4`,
//   wrapper: tw`w-full h-15 pr-3 flex-row bg-gray-100 border border-gray-200 rounded-xl items-center`,
//   input: tw`flex-1 w-full bg-transparent`,
//   inputButton: tw`w-8 h-full items-center justify-center`,
//   inputIcons: tw`w-5 h-5`,
//   sendButton: tw`ml-1 w-10 h-10 items-center justify-center rounded-xl bg-primary`,
// };

// export default ChatDetail;
