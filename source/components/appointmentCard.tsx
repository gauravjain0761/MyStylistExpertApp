import React, {FC} from 'react';
import {Pressable, View} from 'react-native';
import tw from 'rn-tailwind';
import {Text, Image} from 'components';
import images from 'images';
import globalStyle from 'globalStyles';
import {DASHED} from 'AppConstants';
import {Appointment} from 'types';
import moment from 'moment';

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
  } = data;
  const date = moment(createdAt).format('DD MMMM YYYY, hh:mm');
  return (
    <Pressable
      onPress={() => {
        onPreeCard && onPreeCard(appointmentId);
      }}
      style={[styles.upcomingItemContainer, fullWidth && styles.cardFullWidth]}>
      <View style={[styles.upcomingItemHeader, !homeScreen && styles[status]]}>
        <Text size="sm" fontWeight="700">
          {`Booking ID: #${bookingNumber}`}
        </Text>
        <Text size="sm" fontWeight="700">
          {status === 'booked' ? 'Upcoming' : status}
        </Text>
      </View>
      <View style={styles.upcomingItemName}>
        <Text fontWeight="700" color="text-darkGrey" size="lg">
          {customerName}
        </Text>
        <Text fontWeight="700" color="text-black" size="xl">
          {'$36'}
        </Text>
      </View>
      <View style={styles.upcomingDetails}>
        <Image
          resizeMode="stretch"
          style={styles.locationIcon}
          source={images.LocationIcon}
        />
        <Text size="xs" color="text-darkGrey">
          {'America, Las Vagas'}
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
      <View style={styles.dotWrap}>
        <Text numberOfLines={1} ellipsizeMode="clip" size="sm">
          {DASHED}
        </Text>
      </View>

      <Text
        size="sm"
        fontWeight="800"
        numberOfLines={2}
        color="text-darkGrey"
        textStyle="px-4 py-4 pt-2">
        {'Hair cutting'}
      </Text>
    </Pressable>
  );
};

const styles = {
  booked: tw`bg-bubbles`,
  Completed: tw`bg-brightGray`,
  Cancelled: tw`bg-antiFlashWhite`,
  cardFullWidth: tw`w-full m-0 h-48`,
  upcomingItemContainer: tw`w-72 h-52 ml-4 bg-white rounded-lg overflow-hidden`,
  upcomingItemHeader: tw`px-4 w-full h-10 bg-mistyRose flex-row items-center justify-between items-center`,
  upcomingItemName: tw`flex-row w-full justify-between items-center px-4 mt-2`,
  upcomingDetails: tw`flex-row w-full pt-1 pb-1 pl-3`,
  locationIcon: tw`w-4 h-4`,
  dashedView: tw`w-full`,
  dotWrap: tw`w-full px-4`,
  dots: tw`mt-3 mb-1 w-full `,
  dashedViewBorder: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'grey',
  },
};

export default AppointmentCard;
