import React, {FC, useEffect} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
} from 'react-native';
import {ChatBubble, Container, Text, TextInput} from 'components';
import globalStyle from 'globalStyles';
import tw from 'rn-tailwind';
import images from 'images';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '..';
import useChatDetail from './hooks';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ChatDetail'>;
  route: RouteProp<RootStackParamList, 'ChatDetail'>;
};

const ChatDetail: FC<Props> = ({route, navigation}) => {
  const {receiverId, receiverName, receiverImage} = route.params;
  const {
    message,
    createChatRoom,
    sendMessage,
    setMessage,
    messageList,
    userDetails,
  } = useChatDetail(receiverId);
  const {userId} = userDetails;

  useEffect(() => {
    createChatRoom();
  }, []);

  const renderChatList = ({item, index}: any) => {
    return (
      <ChatBubble
        data={item}
        key={index}
        userId={userId}
        receiverName={receiverName}
      />
    );
  };

  return (
    <Container>
      <KeyboardAvoidingView
        style={{flex: 1, width: '100%', height: '100%'}}
        behavior={Platform.OS == 'android' ? 'height' : 'padding'}>
        <View style={globalStyle.container}>
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
                    uri: receiverImage,
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
                  Online
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
                onChangeText={value => setMessage(value)}
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
                  source={images.SendIcon}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};

const styles = {
  header: tw`w-full h-14 flex-row px-4`,
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
  inputWrapper: tw`w-full items-center h-20 px-4`,
  wrapper: tw`w-full h-15 pr-3 flex-row bg-gray-100 border border-gray-200 rounded-xl items-center`,
  input: tw`flex-1 w-full bg-transparent`,
  inputButton: tw`w-8 h-full items-center justify-center`,
  inputIcons: tw`w-5 h-5`,
  sendButton: tw`ml-1 w-10 h-10 items-center justify-center rounded-xl bg-primary`,
};

export default ChatDetail;
