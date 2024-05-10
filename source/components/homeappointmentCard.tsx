import React, {FC} from 'react';
import {Pressable, StyleSheet, View, Text as RNText, Image} from 'react-native';
import tw from 'rn-tailwind';
import {Text} from 'components';
import images from 'images';
import globalStyle from 'globalStyles';
import {DASHED} from 'AppConstants';
import {Appointment} from 'types';
import moment from 'moment';
import {commonFontStyle, fontFamily, hp, wp} from '../utils/dimentions';
import Color from '../../assets/color';

interface Props {
  fullWidth?: boolean;
  homeScreen?: boolean;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  onPreeCard?: (appointmentId: string) => void;
  data: Appointment;
}
const AppointmentCard: FC<Props> = ({
  fullWidth = false,
  homeScreen = false,
  data,
  onPreeCard,
}) => {
  const {
    _id: appointmentId,
    bookingNumber,
    customerName,
    status,
    services,
    createdAt,
    amount,
  } = data;
  const date = moment(createdAt).format('DD MMMM YYYY, hh:mm');
  return (
    <Pressable
      style={[styles.upcomingItemContainer, fullWidth && styles.cardFullWidth]}>
      <View style={[styles.upcomingItemHeader, !homeScreen && styles[status]]}>
        <RNText style={styles.bookingId}>
          {`Booking ID: #${bookingNumber}`}
        </RNText>
        <RNText style={styles.bookingId}>
          {status === 'booked' ? 'Upcoming' : status}
        </RNText>
      </View>
      <View style={styles.upcomingItemName}>
        <RNText style={styles.customerName}>{customerName}</RNText>
        <RNText style={styles.amount}>
          {'₹'}
          {amount}
        </RNText>
      </View>
      <View style={styles.upcomingDetails}>
        <Image
          resizeMode="stretch"
          style={styles.locationIcon}
          source={images.locationpin}
        />
        <RNText style={styles.label}>{'America, Las Vagas'}</RNText>
      </View>
      <View style={styles.upcomingDetails}>
        <Image
          resizeMode="stretch"
          style={styles.locationIcon}
          source={images.CalendarIcon}
        />
        <RNText style={styles.label}>{date}</RNText>
      </View>
      <View style={styles.dotWrap}>
        <RNText numberOfLines={1} ellipsizeMode="clip" style={styles.desed}>
          {DASHED}
        </RNText>
      </View>
      <RNText style={styles.services}>
        {services}
        <RNText style={styles.others}>{' +2 others'}</RNText>
      </RNText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  booked: tw`bg-bubbles`,
  Completed: tw`bg-brightGray`,
  Cancelled: tw`bg-antiFlashWhite`,
  cardFullWidth: tw`w-full m-0 h-48`,
  upcomingItemContainer: {
    ...tw`w-72 h-52 bg-white rounded-lg overflow-hidden`,
    borderRadius: wp(12),
    marginRight: wp(21),
  },
  upcomingItemHeader: {
    ...tw`px-4 w-full h-10 bg-mistyRose flex-row items-center justify-between items-center`,
    borderTopLeftRadius: wp(12),
    borderTopRightRadius: wp(12),
    borderBottomLeftRadius: wp(7),
    borderBottomRightRadius: wp(7),
  },
  upcomingItemName: tw`flex-row w-full justify-between items-center px-4 mt-3`,
  upcomingDetails: {
    ...tw`flex-row w-full pt-1 pb-1 px-3`,
    alignItems: 'center',
  },
  locationIcon: {
    ...tw`w-4 h-4`,
    tintColor: Color?.Grey66,
    width: wp(18),
    height: wp(18),
    marginRight: hp(4),
  },
  dashedView: tw`w-full`,
  dotWrap: tw`w-full px-4`,
  dashedViewBorder: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'grey',
  },
  customerName: {
    ...commonFontStyle(fontFamily.bold, 18, Color?.Grey3B),
    lineHeight: hp(22),
  },
  bookingId: {
    ...commonFontStyle(fontFamily.semi_bold, 15, Color?.Black),
  },
  amount: {
    ...commonFontStyle(fontFamily.extra_bold, 22, Color?.Black),
  },
  label: {
    ...commonFontStyle(fontFamily.regular, 16, Color?.Grey66),
    lineHeight: hp(16),
  },
  services: {
    ...tw`px-4`,
    ...commonFontStyle(fontFamily.medium, 14, Color?.Black),
    marginTop: hp(10),
  },
  desed: {
    ...commonFontStyle(fontFamily.semi_bold, 18, Color?.GreyEB),
  },
  others: {
    ...commonFontStyle(fontFamily.bold, 14, Color?.Black),
  },
});

export default AppointmentCard;
