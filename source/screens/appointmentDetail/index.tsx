import React, {FC, useContext, useEffect, useState} from 'react';
import tw from 'rn-tailwind';
import images from 'images';
import {RootStackParamList} from '..';
import globalStyle from 'globalStyles';
import {RouteProp} from '@react-navigation/native';
import {Header, Container, Image, Text, PrimaryButton} from 'components';
import {
  Pressable,
  View,
  Image as RnImage,
  TouchableOpacity,
  Text as RNText,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useAppointmentDetails from './hooks';
import {ExpertServices} from 'types';
import moment from 'moment';
import {
  commonFontStyle,
  fontFamily,
  hp,
  screen_width,
  wp,
} from '../../utils/dimentions';
import Color from '../../../assets/color';
import {DASHED} from 'AppConstants';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useAppDispatch} from 'store';
import {verifyAppointment} from '../../Actions/appointmentAction';
import {appConfig} from '../../../config';
import {AppContext} from 'context';
import {NativeToast} from '../../utils/toast';

type Props = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'AppointmentDetail'
  >;
  route: RouteProp<RootStackParamList, 'AppointmentDetail'>;
};

type RowItemValueProps = {
  title: string;
  value: string;
};

const CELL_COUNT = 6;

const AppointmentDetail: FC<Props> = ({navigation, route}) => {
  const {getAppointmentDetail, appointmentDetails} = useAppointmentDetails();
  const [value, setValue] = useState<string>('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const {setLoading} = useContext(AppContext);
  const dispatch = useAppDispatch();
  const {appointmentId, image} = route.params;
  const {IMG_URL} = appConfig;
  const {
    createdAt,
    customerName,
    userId,
    bookingNumber = '',
    services,
    totalAmount = 0,
  } = appointmentDetails || {};
  useEffect(() => {
    getAppointmentDetail(appointmentId);
  }, []);

  const date = moment(createdAt).format('hh:mm A, DD MMMM YYYY');

  const RowItemValue = ({title, value}: RowItemValueProps) => {
    return (
      <View style={styles.rowSpaceStyle}>
        <View style={styles.leftcontainer}>
          <View style={styles.leftdote}></View>
          <RNText style={styles.greyTitleTextStyle}>{title}</RNText>
        </View>
        <RNText style={styles.valueTextStyle}>{value}</RNText>
      </View>
    );
  };

  const onPressSubmit = () => {
    setLoading(true);
    let obj = {
      data: {
        appointmentId: appointmentId,
        otp: value,
      },
      onSuccess: (res: any) => {
        setLoading(false);
        NativeToast(res?.message);
      },
      onFailure: (Err: any) => {
        setLoading(false);
        NativeToast(Err?.data?.error);
        console.log('Errrr', Err?.data?.error);
      },
    };
    dispatch(verifyAppointment(obj));
  };

  return (
    <Container>
      <View style={globalStyle.container}>
        <Header
          title="Appointments Detail"
          rightView={
            <View style={styles.rightView}>
              <Pressable style={styles.rightIconButton}>
                <Image
                  resizeMode="contain"
                  style={styles.rightIcon}
                  source={images.MessageIcon}
                />
              </Pressable>
            </View>
          }
        />
        <ScrollView style={styles.mainView}>
          <ImageBackground
            resizeMode="stretch"
            style={styles.cardbg}
            source={images.cardbg3}>
            <View style={styles.cardProfileView}>
              <RnImage
                resizeMode="contain"
                style={styles.cardProfile}
                source={{uri: `${IMG_URL}/${image}`}}
              />
              <View style={styles.nameView}>
                <RNText style={styles.title}>{customerName}</RNText>
                <RNText style={styles.date}>{date}</RNText>
                <RNText
                  style={
                    styles.bookingid
                  }>{`Booking ID: ${bookingNumber}`}</RNText>
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
              <RNText style={styles.amount}>{`Total (INR)`}</RNText>
              <RNText style={styles.amount}>{`₹${totalAmount}`}</RNText>
            </View>
            <View style={[styles.ellipse]}>
              <RNText style={styles.dashed}>{DASHED}</RNText>
            </View>
            <View style={styles.serviceContainer}>
              <RNText style={styles.services}>{'Services'}</RNText>
              {services?.map(service => {
                return (
                  <RowItemValue
                    title={service?.service_name}
                    value={`₹ ${service?.price}`}
                  />
                );
              })}
            </View>
          </ImageBackground>
          <View style={styles.otpcontainer}>
            <View style={styles.leftpart}>
              <RNText style={styles.otptitle}>
                {'Enter OTP to start the service'}
              </RNText>
              <CodeField
                ref={ref}
                {...props}
                onBlur={() => {}}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                  <RNText
                    key={index}
                    style={[styles.cell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : '-')}
                  </RNText>
                )}
              />
            </View>
            <Pressable onPress={onPressSubmit} style={styles.button}>
              <RNText style={styles.bottontitle}>{'Submit'}</RNText>
            </Pressable>
          </View>
        </ScrollView>
        <View style={styles.bottompart}>
          <PrimaryButton
            containerStyle={styles.primarybutton}
            label={'Done'}
            onPress={() => {}}
          />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  mainView: tw` w-full bg-cultured`,
  rightView: tw`flex-1 w-full h-full items-end justify-center`,
  rightIconButton: tw`w-10 h-10 items-end justify-end`,
  rightIcon: tw`w-6.5 h-6.5`,
  topView: tw`flex-row w-full justify-between my-4`,
  appointmentcard: {
    elevation: 3,
    overflow: 'hidden',
    borderRadius: 8,
    shadowColor: '#000000',
    backgroundColor: Color?.White,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 2.62,
    marginHorizontal: wp(20),
    marginTop: hp(26),
  },
  cardProfileView: {
    flexDirection: 'row',
    paddingTop: hp(26),
    marginBottom: hp(15),
    paddingHorizontal: wp(18),
  },
  cardProfile: {
    width: wp(111),
    height: wp(110),
    borderRadius: 10,
  },
  nameView: {
    paddingLeft: wp(20),
  },
  cardDetailRow: {
    ...tw`w-full flex-row`,
    paddingHorizontal: wp(20),
    justifyContent: 'space-between',
    marginBottom: hp(5),
    marginTop: hp(15),
  },
  cardDetail: tw`flex-1 w-full`,
  activeView: tw`w-18 mt-2 h-8 rounded-full bg-aeroBlue absolute right-13`,
  cardbg: {
    width: 'auto',
    height: 'auto',
    resizeMode: 'contain',
    overflow: 'hidden',
    marginHorizontal: wp(20),
    marginTop: hp(21),
  },
  title: {
    ...commonFontStyle(fontFamily.semi_bold, 24, Color?.Black),
    lineHeight: hp(29.05),
  },
  dots: tw`flex-1 w-full border-dashed border`,
  leftEllipse: tw`h-5 w-5 bg-cultured rounded-full left--2.5`,
  rightEllipse: tw`h-5 w-5 bg-cultured rounded-full right--2.5`,
  ellipseView: {
    ...tw`w-full flex-row justify-between h-5 items-center overflow-hidden`,
  },
  dashed: {
    ...commonFontStyle(fontFamily.regular, 16, Color?.GreyB0),
    width: screen_width * 0.79,
    left: 4,
  },
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
  },
  bookingid: {
    ...commonFontStyle(fontFamily.medium, 15, Color?.Grey2E),
    marginTop: hp(8),
  },
  ellipse: {
    ...tw`w-full justify-between h-5 items-center overflow-hidden`,
  },
  services: {
    ...commonFontStyle(fontFamily.semi_bold, 20, Color?.Black),
    lineHeight: hp(26),
    marginTop: hp(10),
    marginBottom: hp(12),
  },
  serviceContainer: {
    paddingHorizontal: wp(20),
    marginBottom: hp(26),
    minHeight: hp(180),
  },
  rowSpaceStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp(10),
  },
  valueTextStyle: {
    ...commonFontStyle(fontFamily.semi_bold, 16, Color?.Black),
  },
  greyTitleTextStyle: {
    ...commonFontStyle(fontFamily.semi_bold, 16, Color?.Black),
  },
  leftcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(12),
  },
  leftdote: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(100),
    borderWidth: 1,
    borderColor: Color?.Black,
  },
  otpcontainer: {
    marginHorizontal: wp(20),
    backgroundColor: Color?.GreenCC,
    borderRadius: 8,
    marginTop: hp(22),
    paddingTop: hp(12),
    paddingHorizontal: wp(25),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: hp(18),
  },
  otptitle: {
    ...commonFontStyle(fontFamily.RobotoMedium, 15, Color?.Green2F),
  },
  button: {
    backgroundColor: Color?.Green2F,
    borderRadius: wp(5),
  },
  bottontitle: {
    ...commonFontStyle(fontFamily.medium, 13, Color?.White),
    lineHeight: hp(20),
    paddingHorizontal: wp(24),
    paddingVertical: hp(8),
  },
  input: {
    marginTop: hp(11),
    ...commonFontStyle(fontFamily.medium, 22, Color?.Green2F),
  },
  leftpart: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottompart: {
    backgroundColor: Color?.White,
    paddingTop: hp(21),
    paddingBottom: hp(26),
    paddingHorizontal: wp(20),
  },
  primarybutton: {
    borderRadius: wp(6),
  },
  cell: {
    width: 30,
    height: 30,
    textAlign: 'center',
    marginTop: hp(11),
    ...commonFontStyle(fontFamily.medium, 22, Color?.Green2F),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppointmentDetail;

// import React, {FC, useEffect} from 'react';
// import tw from 'rn-tailwind';
// import images from 'images';
// import {RootStackParamList} from '..';
// import globalStyle from 'globalStyles';
// import {RouteProp} from '@react-navigation/native';
// import {Header, Container, Image, Text} from 'components';
// import {Pressable, View, Image as RnImage} from 'react-native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import useAppointmentDetails from './hooks';
// import {ExpertServices} from 'types';
// import moment from 'moment';

// type Props = {
//   navigation: NativeStackNavigationProp<
//     RootStackParamList,
//     'AppointmentDetail'
//   >;
//   route: RouteProp<RootStackParamList, 'AppointmentDetail'>;
// };

// const AppointmentDetail: FC<Props> = ({navigation, route}) => {
//   const {getAppointmentDetail, appointmentDetails} = useAppointmentDetails();
//   const {appointmentId} = route.params;
//   const {createdAt, customerName, userId, bookingNumber, services} =
//     appointmentDetails || {};
//   useEffect(() => {
//     getAppointmentDetail(appointmentId);
//   }, []);

//   const date = moment(createdAt).format('DD MMMM YYYY, hh:mm');

//   return (
//     <Container>
//       <View style={globalStyle.container}>
//         <Header
//           title="Appointments Detail"
//           rightView={
//             <View style={styles.rightView}>
//               <Pressable style={styles.rightIconButton}>
//                 <Image
//                   resizeMode="contain"
//                   style={styles.rightIcon}
//                   source={images.MessageIcon}
//                 />
//               </Pressable>
//             </View>
//           }
//         />
//         <View style={styles.mainView}>
//           <View style={styles.topView}>
//             <View style={[styles.bookingIdView, globalStyle.bothContentCenter]}>
//               <Text size="sm" fontWeight="700">
//                 {`Booking ID: #${bookingNumber || ''}`}
//               </Text>
//             </View>
//             <View style={styles.feeView}>
//               <Text size="sm" color="text-darkGrey" fontWeight="700">
//                 {'Fee: '}
//               </Text>
//               <Text size="sm" fontWeight="700">
//                 $36.00
//               </Text>
//             </View>
//           </View>
//           <Text size="lg" fontWeight="700">
//             {'Asfandyar Stylist'}
//           </Text>
//           <View style={styles.locationView}>
//             <RnImage
//               resizeMode="contain"
//               tintColor={'#666666'}
//               source={images.PinIcon}
//               style={styles.locationIcon}
//             />
//             <Text size="base" color="text-darkGrey" fontWeight="600">
//               {'America, Las Vegas'}
//             </Text>
//           </View>
//           <Pressable
//             onPress={() => {
//               navigation.navigate('Calendar');
//             }}
//             style={styles.locationView}>
//             <RnImage
//               resizeMode="contain"
//               tintColor={'#666666'}
//               source={images.CalendarIcon}
//               style={styles.locationIcon}
//             />
//             <Text size="base" color="text-darkGrey" fontWeight="600">
//               {date}
//             </Text>
//           </Pressable>
//           <View style={styles.selectedServiceView}>
//             <Text size="lg" fontWeight="700">
//               {'Selected Services'}
//             </Text>
//             <View style={styles.servicesList}>
//               {services?.map((data: ExpertServices, index: number) => {
//                 const {category_name} = data;
//                 return (
//                   <View key={index} style={styles.serviceItem}>
//                     <Text size="sm">{category_name}</Text>
//                   </View>
//                 );
//               })}
//             </View>
//           </View>
//           <Text size="lg" margin="my-4" fontWeight="700">
//             {'Client Detail'}
//           </Text>
//           <View style={styles.clientDetail}>
//             <View style={styles.clientProfileView}>
//               <Image
//                 resizeMode="cover"
//                 style={styles.profileImage}
//                 source={{
//                   uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
//                 }}
//               />
//               <View style={styles.clientNameView}>
//                 <Text size="sm" margin="mb-0.5" fontWeight="700">
//                   {userId?.name}
//                 </Text>
//                 <Text size="sm" color="text-darkGrey" fontWeight="600">
//                   Booking ID:
//                   <Text size="sm" color="text-black" fontWeight="600">
//                     {bookingNumber}
//                   </Text>
//                 </Text>
//               </View>
//               <Pressable
//                 style={[styles.chatButton, globalStyle.bothContentCenter]}>
//                 <Image
//                   resizeMode="contain"
//                   style={styles.chatIcon}
//                   source={images.ChatIcon}
//                 />
//               </Pressable>
//             </View>
//             <Text size="sm" margin="mt-2.5" fontWeight="500">
//               {
//                 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua... '
//               }
//               <Text size="sm" color="text-black" fontWeight="700">
//                 {'read more'}
//               </Text>
//             </Text>
//           </View>
//         </View>
//       </View>
//     </Container>
//   );
// };

// const styles = {
//   mainView: tw`flex-1 w-full h-full bg-cultured px-4`,
//   rightView: tw`flex-1 w-full h-full items-end justify-center`,
//   rightIconButton: tw`w-10 h-10 items-end justify-end`,
//   rightIcon: tw`w-6.5 h-6.5`,
//   topView: tw`flex-row w-full justify-between my-4`,
//   bookingIdView: tw`px-3 h-10 rounded-full bg-primary`,
//   feeView: tw`flex-row  items-center `,
//   locationView: tw`flex-row justify-start items-center mt-2`,
//   locationIcon: tw`w-5 h-5 left--1`,
//   selectedServiceView: tw`mt-4`,
//   servicesList: tw`w-full flex-row flex-wrap mt-4`,
//   serviceItem: tw`h-10  rounded-full px-4 bg-aliceBlue justify-center mr-3 mb-3`,
//   clientDetail: tw`w-full`,
//   clientProfileView: tw`flex-row w-full`,
//   profileImage: tw`w-13 h-13 rounded-full`,
//   clientNameView: tw`flex-1 pl-3 w-full justify-center`,
//   chatButton: tw`w-12 h-12 rounded-full bg-aliceBlue`,
//   chatIcon: tw`w-6 h-6`,
// };

// export default AppointmentDetail;
