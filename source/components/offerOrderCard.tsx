import React, {FC, useState} from 'react';
import {Pressable, View} from 'react-native';
import tw from 'rn-tailwind';
import {Text, Image} from 'components';
import images from 'images';
import globalStyle from 'globalStyles';
import moment from 'moment';

interface Props {
  fullWidth?: boolean;
  homeScreen?: boolean;
  status: 'Pending' | 'Completed' | 'Cancelled';
  onPreeCard?: () => void;
  data?: any;
}

const OfferOrderCard: FC<Props> = ({
  status = 'Pending',
  fullWidth = false,
  homeScreen = false,
  onPreeCard,
  data,
}) => {
  const {bookingNumber, customerName, timeSlot, expertDetails} = data || {};
  const date = moment(timeSlot?.[0]?.availableDate).format(
    'DD MMMM YYYY, HH:MM A',
  );
  const {address} = expertDetails?.addresses?.[0] || {};
  const {district} = expertDetails || {};

  return (
    <Pressable
      onPress={() => {
        onPreeCard && onPreeCard();
      }}
      style={[styles.upcomingItemContainer, fullWidth && styles.cardFullWidth]}>
      <View style={[styles.upcomingItemHeader]}>
        <Text size="sm" fontWeight="700">
          Booking ID: #{bookingNumber}
        </Text>
      </View>
      <View style={styles.cardDetailView}>
        <View style={styles.upcomingItemName}>
          <Text fontWeight="700" color="text-darkGrey" size="lg">
            {customerName}
          </Text>
          <View style={styles.upcomingDetails}>
            <Image
              resizeMode="stretch"
              style={styles.locationIcon}
              source={images.LocationIcon}
            />
            <Text size="xs" color="text-darkGrey">
              {address?.sector}
              {', '}
              {district?.[0]?.district_name}
            </Text>
          </View>
          <View style={styles.upcomingDetails}>
            <Image
              resizeMode="stretch"
              style={styles.locationIcon}
              source={images.CalendarIcon}
            />
            <Text size="xs" color="text-darkGrey">
              {date}
            </Text>
          </View>
        </View>
        <View style={styles.pendingView}>
          <View
            style={[
              styles.statusView,
              styles[status],
              globalStyle.bothContentCenter,
            ]}>
            <Text fontWeight="700" color="text-topaz" size="sm">
              {status}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = {
  Pending: tw`bg-floralWhite`,
  Completed: tw`bg-brightGray`,
  Cancelled: tw`bg-antiFlashWhite`,
  cardFullWidth: tw`w-full m-0 h-35`,
  upcomingItemContainer: tw`w-72 h-52 ml-4 bg-white rounded-lg overflow-hidden`,
  upcomingItemHeader: tw`px-4 w-full h-10 bg-brightGray flex-row items-center justify-between items-center`,
  upcomingItemName: tw`flex-6 w-full px-4 mt-2`,
  pendingView: tw`flex-4 w-full items-end justify-center pr-4`,
  statusView: tw`px-4 rounded-full h-8 `,
  cardDetailView: tw`flex-row w-full`,
  upcomingDetails: tw`flex-row w-full pt-1 pb-1`,
  locationIcon: tw`w-4 h-4`,
};

export default OfferOrderCard;
