import React, {FC, useEffect, useState} from 'react';
import tw from 'rn-tailwind';
import images from 'images';
import globalStyle from 'globalStyles';
import DatePicker from 'react-native-date-picker';
import {
  Pressable,
  Image as RnImage,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header, Image, Container, Button, PrimaryButton} from 'components';
import moment from 'moment';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '..';
import {RouteProp, useRoute} from '@react-navigation/native';
import Color from '../../../assets/color';
import {commonFontStyle, fontFamily, hp, wp} from '../../utils/dimentions';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SetAvailability'>;
  route: RouteProp<RootStackParamList, 'SetAvailability'>;
};

const SetAvailability: FC<Props> = ({navigation}) => {
  const {params} = useRoute();
  const {time} = params || {};
  const [fromTime, setFromTime] = useState<any>(
    moment(time?.startat, 'hh:mma')?.toISOString(),
  );
  const [toTime, setToTime] = useState<any>(
    moment(time?.endat, 'hh:mma')?.toISOString(),
  );
  const [fromTimePicker, setFromTimePicker] = useState<boolean>(false);
  const [toTimePicker, setToTimePicker] = useState<boolean>(false);

  return (
    <Container>
      <View style={globalStyle.container}>
        <Header title="Set Availability" />
        <View style={styles.mainView}>
          <View style={styles.timeBoxView}>
            <View style={styles.boxWrapper}>
              <Text style={styles.label}>From</Text>
              <Pressable
                onPress={() => setFromTimePicker(true)}
                style={styles.timeBox}>
                <RnImage
                  tintColor={'#666666'}
                  source={images.clockicon}
                  resizeMode="contain"
                  style={styles.watchIcon}
                />
                <Text style={styles.time}>
                  {fromTime ? moment(fromTime).format('hh:mm a') : 'MM:HH'}
                </Text>
              </Pressable>
            </View>
            <View style={styles.boxWrapper}>
              <Text style={styles.label}>To</Text>
              <Pressable
                onPress={() => setToTimePicker(true)}
                style={styles.timeBox}>
                <RnImage
                  tintColor={'#666666'}
                  source={images.WatchIcon}
                  resizeMode="contain"
                  style={styles.watchIcon}
                />
                <Text style={styles.time}>
                  {toTime ? moment(toTime).format('hh:mm a') : 'MM:HH'}
                </Text>
              </Pressable>
            </View>
          </View>
          <DatePicker
            mode="time"
            modal={true}
            minimumDate={new Date()}
            date={new Date()}
            open={fromTimePicker}
            onConfirm={date => {
              setFromTime(date);
              setFromTimePicker(false);
            }}
            onCancel={() => {
              setFromTimePicker(false);
            }}
          />
          <DatePicker
            mode="time"
            modal={true}
            minimumDate={new Date()}
            date={new Date()}
            open={toTimePicker}
            onConfirm={date => {
              setToTime(date);
              setToTimePicker(false);
            }}
            onCancel={() => {
              setToTimePicker(false);
            }}
          />
        </View>
        <View style={[styles.bottomButtonView, globalStyle.bothContentCenter]}>
          <PrimaryButton
            onPress={() => {
              navigation.goBack();
            }}
            label="Save Changes"
            containerLabelStyle={styles.btntitle}
            containerStyle={{borderRadius: wp(6)}}
          />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  mainView: {...tw`w-full h-full flex-1 bg-white px-4`, marginTop: hp(25)},
  bottomButtonView: {
    ...tw`w-full items-center bg-cultured justify-center px-4`,
    marginBottom: hp(20),
  },
  timeBoxView: tw`flex-row w-full gap-4`,
  boxWrapper: tw`flex-1 w-full h-full`,
  timeBox: {
    marginTop: hp(12),
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(6),
    backgroundColor: Color?.InputGrey,
    borderRadius: wp(8),
    borderWidth: 1,
    borderColor: Color?.GreyEB,
    paddingHorizontal: wp(20),
    paddingVertical: hp(20),
  },
  watchIcon: {
    width: wp(20),
    height: wp(20),
  },
  addMoreView: tw`w-full h-12 mt-8`,
  addMore: tw`w-35 h-12 flex-row gap-2 bg-aliceBlue rounded-full`,
  plusIcon: tw`w-4 h-4`,
  cancelbtn: {
    paddingVertical: hp(21),
  },
  btntitle: {
    ...commonFontStyle(fontFamily?.semi_bold, 16, Color.Black),
  },
  label: {
    ...commonFontStyle(fontFamily.medium, 16, Color?.Black),
  },
  time: {
    ...commonFontStyle(fontFamily.medium, 16, Color?.Grey66),
  },
});

export default SetAvailability;

// import React, {FC, useState} from 'react';
// import tw from 'rn-tailwind';
// import images from 'images';
// import globalStyle from 'globalStyles';
// import DatePicker from 'react-native-date-picker';
// import {Pressable, Image as RnImage, View} from 'react-native';
// import {Header, Image, Text, Container, Button} from 'components';
// import moment from 'moment';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {RootStackParamList} from '..';
// import {RouteProp} from '@react-navigation/native';

// type Props = {
//   navigation: NativeStackNavigationProp<RootStackParamList, 'SetAvailability'>;
//   route: RouteProp<RootStackParamList, 'SetAvailability'>;
// };

// const SetAvailability: FC<Props> = ({navigation}) => {
//   const [fromTime, setFromTime] = useState<Date>();
//   const [toTime, setToTime] = useState<any>();
//   const [fromTimePicker, setFromTimePicker] = useState<boolean>(false);
//   const [toTimePicker, setToTimePicker] = useState<boolean>(false);

//   return (
//     <Container>
//       <View style={globalStyle.container}>
//         <Header title="Set Availability" />
//         <View style={styles.mainView}>
//           <View style={styles.timeBoxView}>
//             <View style={styles.boxWrapper}>
//               <Text size="sm" fontWeight="700">
//                 From
//               </Text>
//               <Pressable
//                 onPress={() => setFromTimePicker(true)}
//                 style={styles.timeBox}>
//                 <RnImage
//                   tintColor={'#666666'}
//                   source={images.WatchIcon}
//                   resizeMode="contain"
//                   style={styles.watchIcon}
//                 />
//                 <Text size="sm" margin="ml-2">
//                   {fromTime ? moment(fromTime).format('hh:mm a') : 'MM:HH'}
//                 </Text>
//               </Pressable>
//             </View>
//             <View style={styles.boxWrapper}>
//               <Text size="sm" fontWeight="700">
//                 To
//               </Text>
//               <Pressable
//                 onPress={() => setToTimePicker(true)}
//                 style={styles.timeBox}>
//                 <RnImage
//                   tintColor={'#666666'}
//                   source={images.WatchIcon}
//                   resizeMode="contain"
//                   style={styles.watchIcon}
//                 />
//                 <Text size="sm" margin="ml-2">
//                   {toTime ? moment(toTime).format('hh:mm a') : 'MM:HH'}
//                 </Text>
//               </Pressable>
//             </View>
//           </View>
//           <DatePicker
//             mode="time"
//             modal={true}
//             date={fromTime || new Date()}
//             open={fromTimePicker}
//             onConfirm={date => {
//               setToTime('');
//               setFromTime(date);
//               setFromTimePicker(false);
//             }}
//             onCancel={() => {
//               setFromTimePicker(false);
//             }}
//           />
//           <DatePicker
//             mode="time"
//             modal={true}
//             minimumDate={fromTime || new Date()}
//             date={toTime || new Date()}
//             open={toTimePicker}
//             onConfirm={date => {
//               setToTime(date);
//               setToTimePicker(false);
//             }}
//             onCancel={() => {
//               setToTimePicker(false);
//             }}
//           />
//           <View style={[styles.addMoreView, globalStyle.bothContentCenter]}>
//             <Pressable style={[styles.addMore, globalStyle.bothContentCenter]}>
//               <Image
//                 style={styles.plusIcon}
//                 resizeMode="contain"
//                 source={images.PlusIcon}
//               />
//               <Text size="sm">Add More</Text>
//             </Pressable>
//           </View>
//         </View>
//         <View style={[styles.bottomButtonView, globalStyle.bothContentCenter]}>
//           <Button
//             onPress={() => {
//               navigation.goBack();
//             }}
//             lable="Save Changes"
//           />
//         </View>
//       </View>
//     </Container>
//   );
// };

// const styles = {
//   mainView: tw`w-full h-full flex-1 bg-cultured px-4 pt-6`,
//   bottomButtonView: tw`w-full h-22 items-center bg-cultured justify-center px-4`,
//   timeBoxView: tw`flex-row w-full gap-4`,
//   boxWrapper: tw`flex-1 w-full h-full`,
//   timeBox: tw`w-full h-13 border flex-row items-center  border-borderDarkGrey mt-2 rounded-lg pl-3`,
//   watchIcon: tw`w-5 h-5`,
//   addMoreView: tw`w-full h-12 mt-8`,
//   addMore: tw`w-35 h-12 flex-row gap-2 bg-aliceBlue rounded-full`,
//   plusIcon: tw`w-4 h-4`,
// };

// export default SetAvailability;
