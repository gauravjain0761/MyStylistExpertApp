import React, {FC, useEffect} from 'react';
import tw from 'rn-tailwind';
import images from 'images';
import {RootStackParamList} from '..';
import globalStyle from 'globalStyles';
import {RouteProp} from '@react-navigation/native';
import {Header, Container, Image, Text} from 'components';
import {Pressable, View, Image as RnImage} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useAppointmentDetails from './hooks';
import {ExpertServices} from 'types';
import moment from 'moment';

type Props = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'AppointmentDetail'
  >;
  route: RouteProp<RootStackParamList, 'AppointmentDetail'>;
};

const AppointmentDetail: FC<Props> = ({navigation, route}) => {
  const {getAppointmentDetail, appointmentDetails} = useAppointmentDetails();
  const {appointmentId} = route.params;
  const {createdAt, customerName, userId, bookingNumber, services} =
    appointmentDetails || {};
  useEffect(() => {
    getAppointmentDetail(appointmentId);
  }, []);

  const date = moment(createdAt).format('DD MMMM YYYY, hh:mm');

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
        <View style={styles.mainView}>
          <View style={styles.topView}>
            <View style={[styles.bookingIdView, globalStyle.bothContentCenter]}>
              <Text size="sm" fontWeight="700">
                {`Booking ID: #${bookingNumber || ''}`}
              </Text>
            </View>
            <View style={styles.feeView}>
              <Text size="sm" color="text-darkGrey" fontWeight="700">
                {'Fee: '}
              </Text>
              <Text size="sm" fontWeight="700">
                $36.00
              </Text>
            </View>
          </View>
          <Text size="lg" fontWeight="700">
            {'Asfandyar Stylist'}
          </Text>
          <View style={styles.locationView}>
            <RnImage
              resizeMode="contain"
              tintColor={'#666666'}
              source={images.PinIcon}
              style={styles.locationIcon}
            />
            <Text size="base" color="text-darkGrey" fontWeight="600">
              {'America, Las Vegas'}
            </Text>
          </View>
          <Pressable
            onPress={() => {
              navigation.navigate('Calendar');
            }}
            style={styles.locationView}>
            <RnImage
              resizeMode="contain"
              tintColor={'#666666'}
              source={images.CalendarIcon}
              style={styles.locationIcon}
            />
            <Text size="base" color="text-darkGrey" fontWeight="600">
              {date}
            </Text>
          </Pressable>
          <View style={styles.selectedServiceView}>
            <Text size="lg" fontWeight="700">
              {'Selected Services'}
            </Text>
            <View style={styles.servicesList}>
              {services?.map((data: ExpertServices, index: number) => {
                const {category_name} = data;
                return (
                  <View key={index} style={styles.serviceItem}>
                    <Text size="sm">{category_name}</Text>
                  </View>
                );
              })}
            </View>
          </View>
          <Text size="lg" margin="my-4" fontWeight="700">
            {'Client Detail'}
          </Text>
          <View style={styles.clientDetail}>
            <View style={styles.clientProfileView}>
              <Image
                resizeMode="cover"
                style={styles.profileImage}
                source={{
                  uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
                }}
              />
              <View style={styles.clientNameView}>
                <Text size="sm" margin="mb-0.5" fontWeight="700">
                  {userId?.name}
                </Text>
                <Text size="sm" color="text-darkGrey" fontWeight="600">
                  Booking ID:
                  <Text size="sm" color="text-black" fontWeight="600">
                    {bookingNumber}
                  </Text>
                </Text>
              </View>
              <Pressable
                style={[styles.chatButton, globalStyle.bothContentCenter]}>
                <Image
                  resizeMode="contain"
                  style={styles.chatIcon}
                  source={images.ChatIcon}
                />
              </Pressable>
            </View>
            <Text size="sm" margin="mt-2.5" fontWeight="500">
              {
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua... '
              }
              <Text size="sm" color="text-black" fontWeight="700">
                {'read more'}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </Container>
  );
};

const styles = {
  mainView: tw`flex-1 w-full h-full bg-cultured px-4`,
  rightView: tw`flex-1 w-full h-full items-end justify-center`,
  rightIconButton: tw`w-10 h-10 items-end justify-end`,
  rightIcon: tw`w-6.5 h-6.5`,
  topView: tw`flex-row w-full justify-between my-4`,
  bookingIdView: tw`px-3 h-10 rounded-full bg-primary`,
  feeView: tw`flex-row  items-center `,
  locationView: tw`flex-row justify-start items-center mt-2`,
  locationIcon: tw`w-5 h-5 left--1`,
  selectedServiceView: tw`mt-4`,
  servicesList: tw`w-full flex-row flex-wrap mt-4`,
  serviceItem: tw`h-10  rounded-full px-4 bg-aliceBlue justify-center mr-3 mb-3`,
  clientDetail: tw`w-full`,
  clientProfileView: tw`flex-row w-full`,
  profileImage: tw`w-13 h-13 rounded-full`,
  clientNameView: tw`flex-1 pl-3 w-full justify-center`,
  chatButton: tw`w-12 h-12 rounded-full bg-aliceBlue`,
  chatIcon: tw`w-6 h-6`,
};

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
