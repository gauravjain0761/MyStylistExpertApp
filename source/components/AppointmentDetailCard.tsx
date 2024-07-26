import {
  Alert,
  Image,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import images from 'images';
import {commonFontStyle, fontFamily, hp, wp} from '../utils/dimentions';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  CalenderIcon,
  CallIcon,
  ChatIcon,
  ClockIcon,
  DirectionIcon,
  StarIcon,
  VerifyIcon,
} from '../../assets/SvgIcon/SvgIcon';

type props = {
  type?: 'Give Feedback' | 'Rating' | 'Total Price';
  name?: string;
  rating?: string | number;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  location?: string;
  service?: string;
  price?: string;
  jobs?: number | string;
  userImg?: any;
  onPressRating?: any;
  date?: any;
  time?: any;
  previousBooking?: boolean;
  imgBaseURL?: string;
  onPressChat?: () => void;
  phoneNumber?: string;
  lat?: number;
  lng?: number;
  bookingID?: string | number;
};

const AppointmentDetailCard = ({
  name,
  date,
  time,
  location,
  service,
  type,
  price,
  userImg,
  onPressRating,
  rating,
  jobs,
  previousBooking = false,
  imgBaseURL,
  onPressChat,
  phoneNumber,
  lat,
  lng,
  bookingID,
}: props) => {
  const {navigate} = useNavigation();

  const onPressCard = () => {};

  const onPressDirection = () => {
    const scheme = Platform.select({
      ios: 'maps://0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${lat},${lng}`;
    const label = 'Address';
    const url: any = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };

  const onPressNumber = () => {
    let phone = '';
    if (Platform.OS === 'android') {
      phone = `tel:${phoneNumber}`;
    } else {
      phone = `telprompt:${phoneNumber}`;
    }
    Linking.openURL(phone);
  };

  return (
    <View style={styles.conatiner}>
      <Pressable onPress={onPressCard} style={styles.card_upper}>
        <View style={styles.information_container}>
          <View style={styles.img_container}>
            <View style={styles.img_con}>
              <FastImage
                resizeMode="cover"
                source={{
                  uri: imgBaseURL + '/' + userImg,
                  priority: FastImage.priority.high,
                }}
                style={styles.img}
              />
            </View>
          </View>
          <View style={styles.name_container}>
            <View style={styles.info_container}>
              <View>
                <Text numberOfLines={1} style={styles.barber_name}>
                  {name}
                </Text>
              </View>
              <VerifyIcon width={14} height={14} />
            </View>
            {/* <View style={styles.location_container}>
              <Text numberOfLines={1} style={styles.location_title}>
                {location}
              </Text>
            </View> */}
            {/* <Text style={styles.service_title}>{service}</Text> */}
          </View>
        </View>
        <View style={styles.facility_conatiner}>
          <TouchableOpacity
            onPress={onPressDirection}
            style={styles.service_btn}>
            <DirectionIcon />
            <Text style={styles.btn_title}>{'Directions'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressChat} style={styles.service_btn}>
            <ChatIcon />
            <Text style={styles.btn_title}>{'Chat'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressNumber} style={styles.service_btn}>
            <CallIcon />
            <Text style={styles.btn_title}>{'Call Stylist'}</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.subtract_left}></View>
          <Image
            resizeMode="contain"
            style={{width: '100%'}}
            source={images.dashline}
          />
          <View style={styles.subtract_right}></View>
        </View>
      </Pressable>
      <View style={styles.card_down}>
        <View style={styles.down_contain}>
          <View style={styles.time_conatiner}>
            <View style={styles.time_img}>
              <ClockIcon />
              <Text style={styles.time_lable}>{'Time'}</Text>
            </View>
            <Text style={styles.time}>{time}</Text>
          </View>
          <View style={styles.date_conatiner}>
            <View style={styles.date_img}>
              <CalenderIcon />
              <Text style={styles.time_lable}>{'Date'}</Text>
            </View>
            <Text style={styles.time}>{date}</Text>
          </View>
          <View style={styles.time_conatiner}>
            <View style={styles.time_img}>
              <Text style={{...styles.time_lable, paddingLeft: 5}}>
                {'Booking ID'}
              </Text>
            </View>
            <Text style={styles.time}>{bookingID}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AppointmentDetailCard;

const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: Colors.white,
    paddingHorizontal: wp(15),
    marginHorizontal: wp(15),
    borderRadius: wp(8),
    paddingVertical: hp(17),
    flexDirection: 'column',
  },
  img_container: {
    alignSelf: 'flex-start',
  },
  img_con: {
    width: wp(100),
    height: hp(110),
  },
  img: {
    width: '100%',
    height: hp(110),
    borderRadius: wp(10),
    backgroundColor: Colors.grey_19,
  },
  name_container: {
    alignItems: 'center',
  },
  barber_name: {
    ...commonFontStyle(fontFamily.bold, 28, Colors.black),
    maxWidth: wp(170),
  },
  info_container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    alignSelf: 'flex-start',
  },
  time: {
    ...commonFontStyle(fontFamily.semi_bold, 18, Colors.black),
    marginTop: hp(5),
  },
  location_container: {
    flexDirection: 'row',
    gap: wp(5),
    marginTop: hp(3),
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  location_title: {
    ...commonFontStyle(fontFamily.medium, 15, Colors.grey_9),
    flex: 1,
  },
  service_title: {
    ...commonFontStyle(fontFamily.medium, 15, Colors.grey_11),
    marginTop: hp(8),
    alignSelf: 'flex-start',
  },
  card_upper: {
    width: '100%',
  },
  subtract_left: {
    width: wp(16),
    height: hp(17),
    backgroundColor: '#f2f2f2',
    borderRadius: wp(50),
    position: 'absolute',
    left: -24,
    bottom: -8,
  },
  card_down: {
    marginTop: wp(15),
  },
  down_contain: {
    flexDirection: 'column',
    gap: hp(16),
  },
  subtract_right: {
    width: wp(16),
    height: hp(17),
    backgroundColor: '#f2f2f2',
    borderRadius: wp(50),
    position: 'absolute',
    right: -24,
    bottom: -8,
  },
  barber_job_coantiner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(12),
    alignSelf: 'flex-start',
  },
  rating_badge: {
    backgroundColor: Colors.light_green,
    borderRadius: wp(6),
    padding: hp(3),
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    gap: wp(3),
  },
  rating_title: {
    ...commonFontStyle(fontFamily.semi_bold, 12, Colors.white),
  },
  seprator: {
    width: wp(4),
    height: wp(4),
    backgroundColor: Colors.dark_grey,
    borderRadius: wp(50),
    marginHorizontal: wp(7),
  },
  jobs_title: {
    ...commonFontStyle(fontFamily.medium, 14, Colors.dark_grey),
  },
  facility_conatiner: {
    flexDirection: 'row',
    marginBottom: hp(15),
    justifyContent: 'space-between',
  },
  service_btn: {
    flexDirection: 'row',
    gap: wp(5),
    alignItems: 'center',
  },
  btn_title: {
    ...commonFontStyle(fontFamily.medium, 14, Colors.black),
  },
  time_conatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date_conatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time_img: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(6),
  },
  date_img: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(6),
  },
  time_lable: {
    ...commonFontStyle(fontFamily.medium, 18, Colors.gery_6),
  },
  information_container: {
    gap: wp(17),
    flexDirection: 'row',
    width: '100%',
  },
  previous_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  booking_title: {
    ...commonFontStyle(fontFamily.regular, 14, Colors.gery_6),
  },
  booking_time: {
    ...commonFontStyle(fontFamily.semi_bold, 15, Colors.black),
  },
});
