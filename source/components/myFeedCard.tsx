import React, {FC} from 'react';
import {Pressable, Image as RnImage, View} from 'react-native';
import {Image, Text} from 'components';
import tw from 'rn-tailwind';
import images from 'images';

interface Props {
  style?: string;
}

const MyFeedCard: FC<Props> = ({style = ''}) => {
  return (
    <View style={[styles.feedCard, tw`${style}`]}>
      <View style={styles.feedCardProfile}>
        <Image
          resizeMode="cover"
          style={styles.cardProfileImage}
          source={{
            uri: 'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
        />
        <View style={styles.cardNameView}>
          <Text size="sm" fontWeight="700">
            {'Boa Hancock'}
          </Text>
          <Text size="sm" color="text-darkGrey">
            {'1 hr ago'}
          </Text>
        </View>
        <View style={styles.threeDotView}>
          <Image
            resizeMode="contain"
            style={styles.threeDots}
            source={images.ThreeDotsIcon}
          />
        </View>
      </View>
      <Text size="sm" margin="my-1">
        {
          'Our experienced barbers can help you find the perfect look for any occasion'
        }
      </Text>
      <Image
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGCMkDgsIk44W4Lqu56eWMaAf7vdqLOTZE2w&usqp=CAU',
        }}
        resizeMode="cover"
        style={styles.cardImage}
      />
      <View style={styles.likeCommentShareView}>
        <Pressable style={styles.actionButton}>
          <RnImage
            tintColor={'#666666'}
            style={styles.likeIcon}
            resizeMode="contain"
            source={images.HeartIcon}
          />
        </Pressable>
        <Text size="xs" color="text-darkGrey">
          {'80   '}
        </Text>
        <Pressable style={styles.actionButton}>
          <RnImage
            tintColor={'#666666'}
            style={styles.likeIcon}
            resizeMode="contain"
            source={images.ChatIcon}
          />
        </Pressable>
        <Text size="xs" color="text-darkGrey">
          23
        </Text>
        <Pressable style={styles.shareButton}>
          <RnImage
            tintColor={'#666666'}
            style={styles.likeIcon}
            resizeMode="contain"
            source={images.ShareIcon}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = {
  feedCard: tw`w-75 bg-white pl-4 pt-2.5 pr-4 rounded-lg`,
  feedCardProfile: tw`flex-row w-full h-15 items-center`,
  cardProfileImage: tw`w-12 h-12 rounded-full`,
  cardNameView: tw`flex-1 w-full justify-center pl-3`,
  threeDotView: tw`w-6 h-full items-end justify-center`,
  threeDots: tw`w-6 h-6`,
  cardImage: tw`w-full h-40 mt-2.5 rounded-lg`,
  likeCommentShareView: tw`flex-row h-14 w-full items-center`,
  actionButton: tw`w-8 h-full items-center justify-center`,
  shareButton: tw`w-8 h-full items-center justify-center absolute right-0`,
  likeIcon: tw`w-6 h-6`,
};

export default MyFeedCard;
