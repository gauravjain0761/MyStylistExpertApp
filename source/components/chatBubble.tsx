import React, {FC} from 'react';
import {View, Image as RNImage} from 'react-native';
import tw from 'rn-tailwind';
import {Image, Text} from 'components';
import images from 'images';
import moment from 'moment';

interface Props {
  data: any;
  userId: string;
  receiverName: string;
}

interface BubbleProps {
  message: string;
  time: string;
  receiverName?: string;
}

const BubbleOther: FC<BubbleProps> = ({message, receiverName, time}) => {
  return (
    <View style={styles.chatBubble}>
      <View style={styles.otherTimeView}>
        <Image
          style={styles.userImage}
          resizeMode="cover"
          source={{
            uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
        />
        <Text color="text-gray-400" margin="ml-2" size="xs">
          {`${receiverName} • ${time}`}
        </Text>
      </View>
      <View style={styles.bubbleWrapperOther}>
        <RNImage
          tintColor={'#ffecec'}
          resizeMode="contain"
          source={images.TriangleIcon}
          style={styles.triangleOther}
        />
        <View style={styles.chatBubbleOther}>
          <Text size="sm" style={tw`font-medium`}>
            {message}
          </Text>
        </View>
      </View>
    </View>
  );
};

const BubbleMine: FC<BubbleProps> = ({message, receiverName, time}) => {
  return (
    <View style={styles.chatBubble}>
      <View style={styles.mineTimeView}>
        <Text color="text-gray-400" margin="ml-2" size="xs">
          {` ${time} • You    `}
        </Text>
        <Image
          style={styles.userImage}
          resizeMode="cover"
          source={{
            uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
        />
      </View>
      <View style={styles.bubbleWrapperMine}>
        <RNImage
          tintColor={'#E2F4FC'}
          resizeMode="contain"
          source={images.TriangleIcon}
          style={styles.triangleMine}
        />
        <View style={styles.chatBubbleMine}>
          <Text size="sm" style={tw`font-medium`}>
            {message}
          </Text>
        </View>
      </View>
    </View>
  );
};

const ChatBubble: FC<Props> = ({userId, receiverName, data}) => {
  const {senderId, content, time} = data;
  const messageTime = moment(time).format('h:mm');
  if (senderId === userId) {
    return <BubbleMine time={messageTime} message={content} />;
  }

  return (
    <BubbleOther
      message={content}
      time={messageTime}
      receiverName={receiverName}
    />
  );
};

const styles = {
  chatBubble: tw`w-full px-4 mt-10`,
  userImage: tw`w-7 h-7 rounded-full`,
  otherTimeView: tw`w-full flex-row items-center pl-4`,
  bubbleWrapperOther: tw`w-full items-start `,
  chatBubbleOther: tw`bg-linen px-4 py-5 rounded-xl`,
  triangleOther: tw`w-5 h-5 ml-5 mb--1.5 mt-1`,
  mineTimeView: tw`w-full flex-row items-center justify-end pr-4`,
  bubbleWrapperMine: tw`w-full items-end`,
  chatBubbleMine: tw`bg-bubbles px-4 py-5  rounded-xl`,
  triangleMine: tw`w-5 h-5 right-4.5 bottom--1`,
};

export default ChatBubble;
