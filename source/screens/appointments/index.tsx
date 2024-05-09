import React, {FC, useEffect, useState} from 'react';
import tw from 'rn-tailwind';
import images from 'images';
import globalStyle from 'globalStyles';
import {
  Pressable,
  FlatList,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import {Header, Image, AppointmentCard, Container, Button} from 'components';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '..';
import {RouteProp} from '@react-navigation/native';
import useAppointment from './hooks';
import {commonFontStyle, fontFamily, hp, wp} from '../../utils/dimentions';
import {Shadow} from 'react-native-shadow-2';
import Color from '../../../assets/color';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Appointments'>;
  route: RouteProp<RootStackParamList, 'Appointments'>;
};

const Allappointment = [
  {
    _id: 1,
    bookingNumber: '050',
    customerName: 'Harleen Kaur',
    status: 'Upcoming',
    services: 'Haircut, Facial, Beard Styling...',
    createdAt: Date.now(),
    amount: 400,
    featured_image: images?.wom1,
  },
  {
    _id: 2,
    bookingNumber: '050',
    customerName: 'Jaspreet Kaur',
    status: 'Upcoming',
    services: 'Haircut, Classic shaving',
    createdAt: Date.now(),
    amount: 500,
    featured_image: images?.wom2,
  },
];

const Appointments: FC<Props> = ({navigation}) => {
  const {appointments, getAllAppointments} = useAppointment();
  const [activeTab, setActiveTab] = useState<string>('Upcoming');

  useEffect(() => {
    getAllAppointments();
  }, []);

  return (
    <Container>
      <View style={globalStyle.container}>
        <Shadow
          style={{shadowRadius: 18.6, shadowOpacity: 0.58}}
          distance={9}
          startColor="#FAFAFA"
          offset={[0, 7]}>
          <Header
            title="Appointments"
            rightView={
              <View style={styles.headerRight}>
                <Pressable style={[styles.headerButton]}>
                  <Image
                    style={styles.searchIcon}
                    source={images.CalendarIcon}
                    resizeMode="contain"
                  />
                </Pressable>
                <Pressable style={[styles.headerButton]}>
                  <Image
                    style={styles.searchIcon}
                    source={images.headerSearch}
                    resizeMode="contain"
                  />
                </Pressable>
              </View>
            }
          />
        </Shadow>
        <View style={styles.mainView}>
          <View style={styles.topButtons}>
            <View style={[styles.buttonWrapper, globalStyle.bothContentCenter]}>
              <Pressable
                onPress={() => {
                  setActiveTab('Upcoming');
                }}
                style={[
                  tw`bg-${
                    activeTab === 'Upcoming' ? 'primary' : 'transparent'
                  } flex-1 h-10`,
                  styles.buttoncontainer,
                ]}>
                <Text
                  style={[
                    activeTab === 'Upcoming'
                      ? styles.focuselabel
                      : styles.label,
                  ]}>
                  Upcoming
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setActiveTab('Past');
                }}
                style={[
                  tw`bg-${
                    activeTab === 'Past' ? 'primary' : 'transparent'
                  } flex-1 h-10`,
                  styles.buttoncontainer,
                ]}>
                <Text
                  style={[
                    activeTab === 'Past' ? styles.focuselabel : styles.label,
                  ]}>
                  Past
                </Text>
              </Pressable>
            </View>
          </View>
          <FlatList
            data={Allappointment || appointments}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => {
              return <View style={styles.listSeparator} />;
            }}
            contentContainerStyle={styles.listContainer}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <AppointmentCard
                  data={item}
                  key={index}
                  fullWidth={true}
                  onPreeCard={(appointmentId: string) =>
                    navigation.navigate('AppointmentDetail', {appointmentId})
                  }
                  status={activeTab === 'Upcoming' ? 'Upcoming' : 'Completed'}
                />
              );
            }}
          />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  headerRight: tw`flex-1 w-full h-full flex-row items-center justify-end`,
  headerButton: tw`w-10 h-full items-end justify-center`,
  searchIcon: tw`w-6.5 h-6.5`,
  mainView: {...tw`w-full h-full flex-1 bg-white`, marginTop: hp(13)},
  topButtons: {...tw`w-full items-center`, paddingHorizontal: wp(25)},
  buttonWrapper: tw`w-full px-3 h-17 rounded-lg bg-aliceBlue flex-row`,
  listContainer: tw`py-5`,
  listSeparator: tw`w-full h-4`,
  buttoncontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(4),
  },
  focuselabel: {
    ...commonFontStyle(fontFamily.semi_bold, 14, Color?.Black),
    lineHeight: hp(17),
  },
  label: {
    ...commonFontStyle(fontFamily.medium, 14, Color?.Black),
  },
});

export default Appointments;

// import React, {FC, useEffect, useState} from 'react';
// import tw from 'rn-tailwind';
// import images from 'images';
// import globalStyle from 'globalStyles';
// import {Pressable, FlatList, View} from 'react-native';
// import {Header, Image, AppointmentCard, Container, Button} from 'components';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {RootStackParamList} from '..';
// import {RouteProp} from '@react-navigation/native';
// import useAppointment from './hooks';

// type Props = {
//   navigation: NativeStackNavigationProp<RootStackParamList, 'Appointments'>;
//   route: RouteProp<RootStackParamList, 'Appointments'>;
// };

// const Appointments: FC<Props> = ({navigation}) => {
//   const {appointments, getAllAppointments} = useAppointment();
//   const [activeTab, setActiveTab] = useState<string>('Upcoming');

//   useEffect(() => {
//     getAllAppointments();
//   }, []);

//   return (
//     <Container>
//       <View style={globalStyle.container}>
//         <Header
//           title="Appointments"
//           rightView={
//             <View style={styles.headerRight}>
//               <Pressable style={[styles.headerButton]}>
//                 <Image
//                   style={styles.searchIcon}
//                   source={images.CalendarIcon}
//                   resizeMode="contain"
//                 />
//               </Pressable>
//               <Pressable style={[styles.headerButton]}>
//                 <Image
//                   style={styles.searchIcon}
//                   source={images.Search}
//                   resizeMode="contain"
//                 />
//               </Pressable>
//             </View>
//           }
//         />
//         <View style={styles.mainView}>
//           <View style={styles.topButtons}>
//             <View style={[styles.buttonWrapper, globalStyle.bothContentCenter]}>
//               <Button
//                 lable="Upcoming"
//                 onPress={() => {
//                   setActiveTab('Upcoming');
//                 }}
//                 style={tw`bg-${
//                   activeTab === 'Upcoming' ? 'primary' : 'transparent'
//                 } flex-1 h-10`}
//               />
//               <Button
//                 lable="Past"
//                 onPress={() => {
//                   setActiveTab('Past');
//                 }}
//                 style={tw`bg-${
//                   activeTab === 'Past' ? 'primary' : 'transparent'
//                 } flex-1 h-10`}
//               />
//             </View>
//           </View>
//           <FlatList
//             data={appointments}
//             showsVerticalScrollIndicator={false}
//             ItemSeparatorComponent={() => {
//               return <View style={styles.listSeparator} />;
//             }}
//             contentContainerStyle={styles.listContainer}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({item, index}) => {
//               return (
//                 <AppointmentCard
//                   data={item}
//                   key={index}
//                   fullWidth={true}
//                   onPreeCard={(appointmentId: string) =>
//                     navigation.navigate('AppointmentDetail', {appointmentId})
//                   }
//                   status={activeTab === 'Upcoming' ? 'Upcoming' : 'Completed'}
//                 />
//               );
//             }}
//           />
//         </View>
//       </View>
//     </Container>
//   );
// };

// const styles = {
//   headerRight: tw`flex-1 w-full h-full flex-row items-center justify-end`,
//   headerButton: tw`w-10 h-full items-end justify-center`,
//   searchIcon: tw`w-6.5 h-6.5`,
//   mainView: tw`w-full h-full flex-1 bg-cultured`,
//   topButtons: tw`w-full h-25 items-center bg-white px-4`,
//   buttonWrapper: tw`w-full px-3 h-17 mt-3 rounded-lg bg-aliceBlue flex-row`,
//   listContainer: tw`py-5 px-4`,
//   listSeparator: tw`w-full h-4`,
// };

// export default Appointments;
