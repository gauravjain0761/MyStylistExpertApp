import React, {FC} from 'react';
import tw from 'rn-tailwind';
import images from 'images';
import {View, Image, Pressable} from 'react-native';
import {Text} from 'components';
import globalStyle from 'globalStyles';
import {ChatUser} from 'types';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {appConfig} from '../../config';

interface Props {
  index: number;
  data: ChatUser;
  onPressCard: () => void;
  unreadMessageCount: number;
}

const ChatUserCard: FC<Props> = ({
  index,
  data,
  onPressCard,
  unreadMessageCount = 0,
}) => {
  const {lastMessage, name, time, user_profile_images} = data || {};
  const image = user_profile_images.length
    ? user_profile_images?.filter(images => images?.is_featured == 1)?.[0]
        ?.image
    : {};
  const {IMG_URL} = appConfig;
  const messageTime = time ? moment(time).format('hh:mm') : '';
  return (
    <Pressable onPress={onPressCard} style={styles.chatCard}>
      <View style={styles.imageView}>
        {user_profile_images.length ? (
          <FastImage
            style={styles.profileImage}
            resizeMode="cover"
            source={{
              uri: `${IMG_URL}/${image}`,
              priority: FastImage?.priority?.high,
            }}
          />
        ) : (
          <Image
            style={styles.profileImage}
            resizeMode="cover"
            source={images?.userIcon}
          />
        )}
        <View style={[styles.onlineView, globalStyle.bothContentCenter]}>
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
          {name || 'Unknown User'}
        </Text>
        {lastMessage && (
          <Text size="xs" color="text-gray-500" fontWeight="600">
            {lastMessage}
          </Text>
        )}
      </View>
      <View style={styles.timeView}>
        {messageTime && <Text size="xs">{messageTime}</Text>}
        {lastMessage && unreadMessageCount == 0 && (
          <Image
            tintColor={'#34B7F1'}
            source={images.SeenIcon}
            style={styles.seenIcon}
            resizeMode="contain"
          />
        )}
        {unreadMessageCount > 0 && (
          <View style={[styles.messageCount, globalStyle.bothContentCenter]}>
            <Text size="xs" color="text-white">
              {unreadMessageCount}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = {
  chatCard: tw`w-full h-22 flex-row items-center`,
  imageView: tw`w-15 h-full justify-center`,
  profileImage: tw`w-13 h-13 rounded-full`,
  onlineView: tw`w-3.5 h-3.5 right-2 bottom-5 bg-[#4ade80] rounded-full absolute`,
  nameView: tw`flex-1 w-full h-full justify-center`,
  timeView: tw`w-13 h-full items-end justify-center`,
  seenIcon: tw`w-4 h-4 mt-2`,
  check: tw`w-2 h-2`,
  messageCount: tw`w-5 h-5 rounded-full bg-primary mt-2`,
};

export default ChatUserCard;

// import React, {FC} from 'react';
// import tw from 'rn-tailwind';
// import images from 'images';
// import {View, Image, Pressable} from 'react-native';
// import {Text} from 'components';
// import globalStyle from 'globalStyles';
// import {ChatUser} from 'types';
// import moment from 'moment';

// interface Props {
//   index: number;
//   data: ChatUser;
//   onPressCard: () => void;
// }

// const ChatUserCard: FC<Props> = ({index, data, onPressCard}) => {
//   const {lastMessage, name, time, user_profile_images} = data;
//   const {image_medium} = user_profile_images.length
//     ? user_profile_images[0]
//     : {};
//   const messageTime = time ? moment(time).format('hh:mm') : '';
//   return (
//     <Pressable onPress={onPressCard} style={styles.chatCard}>
//       <View style={styles.imageView}>
//         <Image
//           style={styles.profileImage}
//           resizeMode="cover"
//           source={{
//             uri: image_medium,
//           }}
//         />
//         <View style={[styles.onlineView, globalStyle.bothContentCenter]}>
//           <Image
//             tintColor={'#ffffff'}
//             style={styles.check}
//             resizeMode="cover"
//             source={images.Check}
//           />
//         </View>
//       </View>
//       <View style={styles.nameView}>
//         <Text size="sm" fontWeight="800">
//           {name}
//         </Text>
//         <Text size="xs" color="text-gray-500" fontWeight="600">
//           {lastMessage}
//         </Text>
//       </View>
//       <View style={styles.timeView}>
//         <Text size="xs">{messageTime}</Text>
//         {index === 0 ? (
//           <Image
//             tintColor={'#BEBEBE'}
//             source={images.SeenIcon}
//             style={styles.seenIcon}
//             resizeMode="contain"
//           />
//         ) : (
//           <View style={[styles.messageCount, globalStyle.bothContentCenter]}>
//             <Text size="xs" color="text-white">
//               {'2'}
//             </Text>
//           </View>
//         )}
//       </View>
//     </Pressable>
//   );
// };

// const styles = {
//   chatCard: tw`w-full h-22 flex-row items-center`,
//   imageView: tw`w-15 h-full justify-center`,
//   profileImage: tw`w-13 h-13 rounded-full`,
//   onlineView: tw`w-3.5 h-3.5 right-2 bottom-5 bg-[#4ade80] rounded-full absolute`,
//   nameView: tw`flex-1 w-full h-full justify-center`,
//   timeView: tw`w-13 h-full items-end justify-center`,
//   seenIcon: tw`w-4 h-4 mt-2`,
//   check: tw`w-2 h-2`,
//   messageCount: tw`w-5 h-5 rounded-full bg-primary mt-2`,
// };

// export default ChatUserCard;
