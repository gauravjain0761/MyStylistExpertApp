import React, {FC, useEffect} from 'react';
import images from 'images';
import tw from 'rn-tailwind';
import {RootStackParamList} from '..';
import globalStyle from 'globalStyles';
import {RouteProp} from '@react-navigation/native';
import {FlatList, Pressable, View} from 'react-native';
import {BottomTab, ChatUserCard, Container, Image, Text} from 'components';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useChat from './hooks';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Chats'>;
  route: RouteProp<RootStackParamList, 'Chats'>;
};

const Chats: FC<Props> = ({navigation}) => {
  const {chatUsers, getAllUserList} = useChat();

  useEffect(() => {
    getAllUserList();
  }, []);

  return (
    <Container>
      <View style={globalStyle.container}>
        <View style={styles.chatHeader}>
          <Text size="base" fontWeight="800">
            {'Messages'}
          </Text>
          <View style={styles.headerButtonView}>
            <Pressable
              style={[styles.allButton, globalStyle.bothContentCenter]}>
              <Text size="sm" fontWeight="800">
                {'All'}
              </Text>
            </Pressable>
            {/* <Pressable
              style={[styles.unreadButton, globalStyle.bothContentCenter]}>
              <Text size="sm" color="text-darkGrey" fontWeight="600">
                {'Unread Messages'}
              </Text>
              <View
                style={[styles.messageCount, globalStyle.bothContentCenter]}>
                <Text size="xs" color="text-white">
                  {'2'}
                </Text>
              </View>
            </Pressable> */}
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
                const {image_medium} = user_profile_images.length
                  ? user_profile_images[0]
                  : {};
                return (
                  <ChatUserCard
                    data={item}
                    index={index}
                    onPressCard={() =>
                      navigation.navigate('ChatDetail', {
                        receiverId: _id,
                        receiverName: name,
                        receiverImage: image_medium,
                      })
                    }
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

const styles = {
  chatHeader: tw`h-29 w-full bg-white pt-4 pl-4`,
  mainView: tw`w-full h-full flex-1 bg-cultured`,
  headerButtonView: tw`w-full flex-row mt-4`,
  allButton: tw`w-15 h-10 rounded-full bg-primary`,
  unreadButton: tw`px-4 h-10 rounded-full bg-gray-100 flex-row ml-4`,
  messageCount: tw`w-5 h-5 rounded-full bg-primary ml-3`,
  allMessageHeader: tw`w-full h-10 items-center pl-4 flex-row mt-3`,
  messageIcon: tw`w-3.5 h-3.5`,
  listView: tw`w-full h-full flex-1 px-4`,
  separator: tw`w-full h-0.3 bg-gray-200`,
  list: tw`pb-4`,
};

export default Chats;
