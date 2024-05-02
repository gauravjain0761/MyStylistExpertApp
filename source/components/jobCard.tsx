import images from 'images';
import tw from 'rn-tailwind';
import React, {FC, useEffect, useState} from 'react';
import {Image, Text} from 'components';
import {View, Image as RnImage, Pressable} from 'react-native';
import {Job} from 'types';
import moment from 'moment';

const cardsColor = {
  1: '#F7F5EB',
  2: '#CCF0FF',
  3: '#FFE1E4',
  4: '#F7E6E6',
};

interface Props {
  data: Job;
  onPressCard: (jobId: string) => void;
  isBookmarked: boolean;
  onBookmarkPress: (bookmarkStatus: boolean, jobId: string) => void;
}

const JobCard: FC<Props> = ({
  data,
  isBookmarked = false,
  onPressCard,
  onBookmarkPress,
}) => {
  const [bookmark, setBookmark] = useState<boolean>();
  const {
    _id,
    budget,
    jobTitle,
    end_date,
    user_details,
    start_date,
    jobDescription,
    featured_image,
    desiredProductUsed,
  } = data;

  useEffect(() => {
    setBookmark(isBookmarked);
  }, []);

  const {username} = user_details;
  const desireItems = JSON.parse(desiredProductUsed);
  const sDate = moment(start_date).format('ddd, DD MMM ');
  const statTime = moment(start_date).format('hh:mm A');
  const endTime = moment(end_date).format('hh:mm A');

  return (
    <Pressable onPress={() => onPressCard(_id)} style={styles.jobCard}>
      <View style={styles.cardWrapper}>
        <View style={styles.userImageView}>
          <Image
            resizeMode="cover"
            style={styles.userImage}
            source={{
              uri: featured_image,
            }}
          />
          <Pressable
            onPress={() => {
              setBookmark(!bookmark);
              onBookmarkPress(!bookmark, _id);
            }}
            style={styles.bookMarkIcon}>
            <RnImage
              resizeMode="contain"
              style={styles.bookMarkIcon}
              tintColor={bookmark ? '#89E3DC' : '#000000'}
              source={bookmark ? images.BookmarkFilled : images.Bookmark}
            />
          </Pressable>
        </View>
        <Text size="sm" color="text-darkGrey" fontWeight="700" margin="mt-1">
          {username}
        </Text>
        <Text size="base" fontWeight="800" margin="mt-0.5">
          {jobTitle}
        </Text>
        <View style={styles.timeView}>
          <Image
            source={images.WatchIcon}
            style={styles.watchIcon}
            resizeMode="contain"
          />
          <Text size="sm">
            {` ${sDate} `}
            <Text color="text-darkGrey" fontWeight="700" size="lg">
              {' • '}
            </Text>
            <Text color="text-darkGrey" size="sm">
              {`Between ${statTime} - ${endTime}`}
            </Text>
          </Text>
        </View>
        <View style={styles.budgetView}>
          <View style={styles.budgetWrapper}>
            <Text size="sm" color="text-darkGrey">
              {'Budget'}
            </Text>
            <Text size="lg" margin="mt-1" fontWeight="800">
              {`₹${budget}`}
            </Text>
          </View>
          <View style={styles.budgetWrapper}>
            <Text size="sm" color="text-darkGrey">
              {'Max Distance'}
            </Text>
            <Text size="lg" margin="mt-1" fontWeight="800">
              {'3.8 mi'}
            </Text>
          </View>
        </View>
        <Text numberOfLines={2} size="sm" color="text-darkGrey" margin="mt-2">
          {jobDescription}
          <Text size="sm" fontWeight="800">
            {'read more'}
          </Text>
        </Text>
      </View>
      <View style={styles.devider} />
      <View style={styles.cardWrapper}>
        <Text size="base" color="text-gray-400" fontWeight="700">
          {'Desired Products'}
        </Text>
        <View style={styles.productsList}>
          {desireItems.map((data, index) => {
            const colorIndex = (index % 4) + 1;

            return (
              <View
                key={index}
                style={[
                  styles.productsWrapper,
                  {backgroundColor: cardsColor[colorIndex]},
                ]}>
                <Text size="sm">{data}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </Pressable>
  );
};

const styles = {
  jobCard: tw`w-full bg-white py-4 rounded-lg`,
  cardWrapper: tw`px-4`,
  userImageView: tw`flex-row w-full items-center justify-between`,
  userImage: tw`w-16 h-16 rounded-lg`,
  bookMarkIcon: tw`w-5 h-5 items-end justify-center`,
  timeView: tw`w-full flex-row items-center `,
  watchIcon: tw`w-5 h-5`,
  budgetView: tw`flex-row w-full mt-4`,
  budgetWrapper: tw`mr-15`,
  devider: tw`w-full h-0.2 bg-gray-200 my-5`,
  productsList: tw`flex-row w-full flex-wrap`,
  productsWrapper: tw`h-10 px-4 justify-center rounded-full mr-3 mt-3 mb-1`,
};

export default JobCard;
