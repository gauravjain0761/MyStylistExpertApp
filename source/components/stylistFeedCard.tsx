import React, {FC} from 'react';
import {Pressable, Image as RnImage, View} from 'react-native';
import {Image, Text} from 'components';
import tw from 'rn-tailwind';
import images from 'images';

interface Props {
  onCommentIconPress: () => void;
}

const StylistFeed: FC<Props> = ({onCommentIconPress}) => {
  return (
    <View style={[styles.feedCard]}>
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
        {`I am passionate about my work and love helping my clients to look and feel their best. I specialize in all aspects of men's grooming, including haircuts, beard trims, and hot shaves. I am also skilled in hair cutting and styling`}
      </Text>
      <View style={styles.imageFull}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGCMkDgsIk44W4Lqu56eWMaAf7vdqLOTZE2w&usqp=CAU',
          }}
          resizeMode="cover"
          style={styles.cardImage}
        />
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGCMkDgsIk44W4Lqu56eWMaAf7vdqLOTZE2w&usqp=CAU',
          }}
          resizeMode="cover"
          style={styles.cardImage}
        />
      </View>

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
        <Pressable
          onPress={() => onCommentIconPress()}
          style={styles.actionButton}>
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
  feedCard: tw`w-full bg-white pl-4 pt-2.5 pr-4 rounded-lg`,
  feedCardProfile: tw`flex-row w-full h-15 items-center`,
  cardProfileImage: tw`w-12 h-12 rounded-full`,
  cardNameView: tw`flex-1 w-full justify-center pl-3`,
  threeDotView: tw`w-6 h-full items-end justify-center`,
  threeDots: tw`w-6 h-6`,
  cardImage: tw`w-1/2.1 h-38 mt-2.5 rounded-lg mr-4`,
  likeCommentShareView: tw`flex-row h-14 w-full items-center`,
  actionButton: tw`w-8 h-full items-center justify-center`,
  shareButton: tw`w-8 h-full items-center justify-center absolute right-0`,
  likeIcon: tw`w-5 h-5`,
  imageFull: tw`w-full flex-row`,
};

export default StylistFeed;
