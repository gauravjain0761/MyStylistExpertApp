import React, {FC} from 'react';
import {View, Image as RnImage} from 'react-native';
import {Image, Text} from 'components';
import tw from 'rn-tailwind';
import images from 'images';

const PerformingFeedCard: FC = () => {
  return (
    <View style={styes.performingCardContainer}>
      <View style={styes.performingCardProfile}>
        <View style={styes.cardProfileView}>
          <Image
            resizeMode="contain"
            source={images.ProfileIcon}
            style={styes.cardprofileImage}
          />
          <View style={styes.cardNameView}>
            <Text color="text-black" fontWeight="700" size="sm">
              Boa Hancock
            </Text>
            <Text size="xs">1 hr ago</Text>
          </View>
        </View>
        <Image
          resizeMode="contain"
          style={styes.threeDotsIcon}
          source={images.ThreeDotsIcon}
        />
      </View>
      <Text size="sm" margin="mt-3" color="text-black">
        {
          'Our experienced barbers can help you find the perfect look for any occassion.'
        }
      </Text>
      <RnImage
        source={{
          uri: 'https://api.mystylist.in/uploads/user_profile_images/resized/hair-3697447_1280.jpg-1694679898136.jpeg',
        }}
        resizeMode="contain"
        style={styes.performingCardImage}
      />
      <View style={styes.likeCommentView}>
        <View style={styes.lieView}>
          <Image
            resizeMode="contain"
            style={styes.cardIcon}
            source={images.HeartIcon}
          />
          <Text size="xs" margin="ml-2 mr-4">
            68
          </Text>
          <Image
            resizeMode="contain"
            style={styes.cardIcon}
            source={images.ChatIcon}
          />
          <Text size="xs" margin="ml-2">
            33
          </Text>
        </View>
        <Image
          resizeMode="contain"
          style={styes.cardIcon}
          source={images.forwardMessageIcon}
        />
      </View>
    </View>
  );
};

const styes = {
  performingCardContainer: tw`w-75  rounded-lg ml-4 bg-white p-4`,
  performingCardProfile: tw`flex-row w-full items-center`,
  cardProfileView: tw`flex-1 flex-row w-full`,
  cardprofileImage: tw`w-13 h-13 rounded-full`,
  threeDotsIcon: tw`w-8 h-7 `,
  cardNameView: tw`flex-1 w-full pl-3 justify-center`,
  performingCardImage: tw`mt-3 w-full h-43 rounded-lg overflow-hidden`,
  likeCommentView: tw`w-full h-10 flex-row items-center`,
  lieView: tw`flex-1 items-center flex-row w-full`,
  cardIcon: tw`w-5.5 h-5.5`,
};

export default PerformingFeedCard;
