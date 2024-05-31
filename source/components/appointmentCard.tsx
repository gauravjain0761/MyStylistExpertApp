import React, {FC} from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  Text as RNText,
  Image as RnImage,
  Button,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import tw from 'rn-tailwind';
import {Image, Text} from 'components';
import images from 'images';
import {DASHED, NewDASHED} from 'AppConstants';
import {Appointment} from 'types';
import moment from 'moment';
import {
  commonFontStyle,
  fontFamily,
  hp,
  screen_width,
  wp,
} from '../utils/dimentions';
import Color from '../../assets/color';
import {appConfig} from '../../config';

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
  const {customerName, services, timeSlot, totalAmount, bookingNumber} = data;
  const service = services.map(service => service?.service_name).toString();
  const {IMG_URL} = appConfig;

  const date = moment(timeSlot[0]?.availableDate).format('hh:mm A,DD MMM YYYY');
  return (
    <Pressable
      onPress={() => onPreeCard && onPreeCard(data?._id)}
      style={styles.appointmentcard}>
      <ImageBackground
        resizeMode="stretch"
        style={styles.cardbg}
        source={images.cardbg2}>
        <View style={styles.cardProfileView}>
          <RnImage
            resizeMode="contain"
            style={styles.cardProfile}
            source={{uri: `${IMG_URL}/${services[0]?.subServiceFileNames}`}}
          />
          <View style={styles.nameView}>
            <RNText style={styles.title}>{customerName}</RNText>
            <RNText style={styles.date}>{date}</RNText>
            <RNText style={styles.service}>
              {service.length > 30 ? `${service.substring(0, 22)}...` : service}
            </RNText>
            <View style={styles.functionalityconatiner}>
              <TouchableOpacity style={styles.buttons}>
                <Image style={styles.iconstyle} source={images.chaticon} />
                <RNText style={styles.label}>Chat</RNText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttons}>
                <Image
                  style={[styles.callIconstyle]}
                  source={images.callicon}
                />
                <RNText style={styles.label}>Call</RNText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.cardDetailRow}>
          <RNText
            style={styles.amount}>{`Booking ID: ${bookingNumber}`}</RNText>
          <RNText style={styles.amount}>{`₹${totalAmount}`}</RNText>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  appointmentcard: {
    flex: 1,
    // marginBottom: wp(26),
    overflow: 'hidden',
    marginHorizontal: wp(25),
  },
  cardProfileView: {
    flexDirection: 'row',
    paddingTop: hp(17),
    marginBottom: hp(23),
    paddingHorizontal: wp(18),
  },
  cardProfile: {
    width: wp(111),
    height: wp(110),
    borderRadius: wp(10),
  },
  nameView: {
    paddingLeft: wp(20),
  },
  cardDetailRow: {
    ...tw`w-full flex-row`,
    paddingHorizontal: wp(20),
    flex: 1,
    justifyContent: 'space-between',
    marginTop: hp(10),
    paddingBottom: hp(20),
  },
  cardDetail: tw`flex-1 w-full`,
  activeView: tw`w-18 mt-2 h-8 rounded-full bg-aeroBlue absolute right-13`,
  title: {
    ...commonFontStyle(fontFamily.semi_bold, 24, Color?.Black),
    lineHeight: hp(29.05),
  },
  service: {
    ...commonFontStyle(fontFamily.medium, 15, Color?.Black),
    marginTop: hp(8),
  },
  dots: tw`flex-1 w-full border-dashed border`,
  date: {
    ...commonFontStyle(fontFamily.RobotoMedium, 15, Color?.Grey2E),
    lineHeight: hp(18),
    marginTop: hp(8),
  },
  iconstyle: {
    width: wp(24),
    height: wp(24),
  },
  functionalityconatiner: {
    flexDirection: 'row',
    marginTop: hp(10),
    gap: wp(40),
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
  },
  label: {
    ...commonFontStyle(fontFamily.medium, 15, Color?.Black),
  },
  callIconstyle: {
    width: wp(20),
    height: wp(20),
  },
  amount: {
    ...commonFontStyle(fontFamily.medium, 16, Color?.Black),
    lineHeight: hp(20),
  },
  cardbg: {
    width: 'auto',
    height: 'auto',
    resizeMode: 'contain',
    overflow: 'hidden',
  },
});

export default AppointmentCard;

// import React, {FC} from 'react';
// import {Pressable, View} from 'react-native';
// import tw from 'rn-tailwind';
// import {Text, Image} from 'components';
// import images from 'images';
// import globalStyle from 'globalStyles';
// import {DASHED} from 'AppConstants';
// import {Appointment} from 'types';
// import moment from 'moment';

// interface Props {
//   fullWidth?: boolean;
//   homeScreen?: boolean;
//   status: 'Upcoming' | 'Completed' | 'Cancelled';
//   onPreeCard?: (appointmentId: string) => void;
//   data: Appointment;
// }

// const AppointmentCard: FC<Props> = ({
//   fullWidth = false,
//   homeScreen = false,
//   data,
//   onPreeCard,
// }) => {
//   const {
//     _id: appointmentId,
//     bookingNumber,
//     customerName,
//     status,
//     services,
//     createdAt,
//   } = data;
//   const date = moment(createdAt).format('DD MMMM YYYY, hh:mm');
//   return (
//     <Pressable
//       onPress={() => {
//         onPreeCard && onPreeCard(appointmentId);
//       }}
//       style={[styles.upcomingItemContainer, fullWidth && styles.cardFullWidth]}>
//       <View style={[styles.upcomingItemHeader, !homeScreen && styles[status]]}>
//         <Text size="sm" fontWeight="700">
//           {`Booking ID: #${bookingNumber}`}
//         </Text>
//         <Text size="sm" fontWeight="700">
//           {status === 'booked' ? 'Upcoming' : status}
//         </Text>
//       </View>
//       <View style={styles.upcomingItemName}>
//         <Text fontWeight="700" color="text-darkGrey" size="lg">
//           {customerName}
//         </Text>
//         <Text fontWeight="700" color="text-black" size="xl">
//           {'$36'}
//         </Text>
//       </View>
//       <View style={styles.upcomingDetails}>
//         <Image
//           resizeMode="stretch"
//           style={styles.locationIcon}
//           source={images.LocationIcon}
//         />
//         <Text size="xs" color="text-darkGrey">
//           {'America, Las Vagas'}
//         </Text>
//       </View>
//       <View style={styles.upcomingDetails}>
//         <Image
//           resizeMode="stretch"
//           style={styles.locationIcon}
//           source={images.CalendarIcon}
//         />
//         <Text size="xs" color="text-darkGrey">
//           {date}
//         </Text>
//       </View>
//       <View style={styles.dotWrap}>
//         <Text numberOfLines={1} ellipsizeMode="clip" size="sm">
//           {DASHED}
//         </Text>
//       </View>

//       <Text
//         size="sm"
//         fontWeight="800"
//         numberOfLines={2}
//         color="text-darkGrey"
//         textStyle="px-4 py-4 pt-2">
//         {'Hair cutting'}
//       </Text>
//     </Pressable>
//   );
// };

// const styles = {
//   booked: tw`bg-bubbles`,
//   Completed: tw`bg-brightGray`,
//   Cancelled: tw`bg-antiFlashWhite`,
//   cardFullWidth: tw`w-full m-0 h-48`,
//   upcomingItemContainer: tw`w-72 h-52 ml-4 bg-white rounded-lg overflow-hidden`,
//   upcomingItemHeader: tw`px-4 w-full h-10 bg-mistyRose flex-row items-center justify-between items-center`,
//   upcomingItemName: tw`flex-row w-full justify-between items-center px-4 mt-2`,
//   upcomingDetails: tw`flex-row w-full pt-1 pb-1 pl-3`,
//   locationIcon: tw`w-4 h-4`,
//   dashedView: tw`w-full`,
//   dotWrap: tw`w-full px-4`,
//   dots: tw`mt-3 mb-1 w-full `,
//   dashedViewBorder: {
//     borderWidth: 1,
//     borderStyle: 'dashed',
//     borderColor: 'grey',
//   },
// };

// export default AppointmentCard;
