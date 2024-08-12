import React, {FC, useState} from 'react';
import {Pressable, StyleSheet, View, Text as RNText} from 'react-native';
import tw from 'rn-tailwind';
import {Text, Image} from 'components';
import images from 'images';
import globalStyle from 'globalStyles';
import moment from 'moment';
import {appConfig} from '../../config';
import {commonFontStyle, fontFamily, hp, wp} from '../utils/dimentions';
import Color from '../../assets/color';

interface Props {
  fullWidth?: boolean;
  homeScreen?: boolean;
  status: 'Pending' | 'Completed' | 'Cancelled';
  onPreeCard?: () => void;
  data?: any;
}

const PackageOrderCard: FC<Props> = ({
  status = 'Pending',
  fullWidth = false,
  homeScreen = false,
  onPreeCard,
  data,
}) => {
  const {
    bookingNumber,
    totalAmount = 0,
    customerName,
    timeSlot,
    expertDetails,
    services,
  } = data || {};
  const date = moment(timeSlot?.[0]?.availableDate).format('DD MMMM YYYY');
  const time = timeSlot?.[0]?.availableTime || {};
  const {address} = expertDetails?.addresses?.[0] || {};
  const {district, user_profile_images} = expertDetails || {};
  const image =
    user_profile_images?.filter(images => images?.is_featured == 1)?.[0]
      ?.image || [];
  const {IMG_URL} = appConfig;

  return (
    <View
      style={[styles.upcomingItemContainer, fullWidth && styles.cardFullWidth]}>
      <View style={styles.cardDetailView}>
        <View style={styles?.leftcomponent}>
          <Image
            source={{uri: `${IMG_URL}/${image}`}}
            style={styles.userimage}
          />
        </View>
        <View style={styles.upcomingItemName}>
          <RNText style={styles.username}>{customerName}</RNText>
          <View style={styles.upcomingDetails}>
            <RNText style={styles.date}>
              {time}
              {', '}
              {date}
            </RNText>
          </View>
          {services?.length ? (
            <View style={styles.servicecontainer}>
              {services?.map((item: any) => {
                return <RNText>{item?.service_name}</RNText>;
              })}
            </View>
          ) : null}
          <View style={styles.pricecontainer}>
            <RNText style={styles.pricelabel}>{'Total: '}</RNText>
            <RNText style={styles.price}>
              {'₹'}
              {totalAmount}
              {'.00'}
            </RNText>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Pending: tw`bg-floralWhite`,
  Completed: tw`bg-brightGray`,
  Cancelled: tw`bg-antiFlashWhite`,
  cardFullWidth: {...tw`w-full m-0`, paddingVertical: hp(18)},
  upcomingItemContainer: tw`w-72 ml-4 bg-white rounded-lg overflow-hidden`,
  upcomingItemHeader: tw`px-4 w-full h-10 bg-brightGray flex-row items-center justify-between items-center`,
  upcomingItemName: {
    paddingLeft: wp(18),
    gap: hp(8),
  },
  pendingView: tw`flex-4 w-full items-end justify-center pr-4`,
  statusView: tw`px-4 rounded-full h-8 `,
  cardDetailView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(18),
  },
  upcomingDetails: tw`flex-row w-full`,
  locationIcon: tw`w-4 h-4`,
  leftcomponent: {},
  userimage: {
    width: wp(110),
    height: hp(110),
    borderRadius: wp(8),
  },
  username: {
    ...commonFontStyle(fontFamily.semi_bold, 26, Color.Black),
  },
  date: {
    ...commonFontStyle(fontFamily.medium, 15, Color.Grey2E),
  },
  servicecontainer: {
    ...commonFontStyle(fontFamily.medium, 15, Color.Grey6B),
  },
  pricecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pricelabel: {
    ...commonFontStyle(fontFamily.medium, 15, Color.Grey2E),
  },
  price: {
    ...commonFontStyle(fontFamily.medium, 15, Color.Grey2E),
  },
});

export default PackageOrderCard;
