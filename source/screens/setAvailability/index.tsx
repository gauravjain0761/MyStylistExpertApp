import React, {FC, useState} from 'react';
import tw from 'rn-tailwind';
import images from 'images';
import globalStyle from 'globalStyles';
import DatePicker from 'react-native-date-picker';
import {Pressable, Image as RnImage, View} from 'react-native';
import {Header, Image, Text, Container, Button} from 'components';
import moment from 'moment';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '..';
import {RouteProp} from '@react-navigation/native';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SetAvailability'>;
  route: RouteProp<RootStackParamList, 'SetAvailability'>;
};

const SetAvailability: FC<Props> = ({navigation}) => {
  const [fromTime, setFromTime] = useState<Date>();
  const [toTime, setToTime] = useState<any>();
  const [fromTimePicker, setFromTimePicker] = useState<boolean>(false);
  const [toTimePicker, setToTimePicker] = useState<boolean>(false);

  return (
    <Container>
      <View style={globalStyle.container}>
        <Header title="Set Availability" />
        <View style={styles.mainView}>
          <View style={styles.timeBoxView}>
            <View style={styles.boxWrapper}>
              <Text size="sm" fontWeight="700">
                From
              </Text>
              <Pressable
                onPress={() => setFromTimePicker(true)}
                style={styles.timeBox}>
                <RnImage
                  tintColor={'#666666'}
                  source={images.WatchIcon}
                  resizeMode="contain"
                  style={styles.watchIcon}
                />
                <Text size="sm" margin="ml-2">
                  {fromTime ? moment(fromTime).format('hh:mm a') : 'MM:HH'}
                </Text>
              </Pressable>
            </View>
            <View style={styles.boxWrapper}>
              <Text size="sm" fontWeight="700">
                To
              </Text>
              <Pressable
                onPress={() => setToTimePicker(true)}
                style={styles.timeBox}>
                <RnImage
                  tintColor={'#666666'}
                  source={images.WatchIcon}
                  resizeMode="contain"
                  style={styles.watchIcon}
                />
                <Text size="sm" margin="ml-2">
                  {toTime ? moment(toTime).format('hh:mm a') : 'MM:HH'}
                </Text>
              </Pressable>
            </View>
          </View>
          <DatePicker
            mode="time"
            modal={true}
            date={fromTime || new Date()}
            open={fromTimePicker}
            onConfirm={date => {
              setToTime('');
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
            minimumDate={fromTime || new Date()}
            date={toTime || new Date()}
            open={toTimePicker}
            onConfirm={date => {
              setToTime(date);
              setToTimePicker(false);
            }}
            onCancel={() => {
              setToTimePicker(false);
            }}
          />
          <View style={[styles.addMoreView, globalStyle.bothContentCenter]}>
            <Pressable style={[styles.addMore, globalStyle.bothContentCenter]}>
              <Image
                style={styles.plusIcon}
                resizeMode="contain"
                source={images.PlusIcon}
              />
              <Text size="sm">Add More</Text>
            </Pressable>
          </View>
        </View>
        <View style={[styles.bottomButtonView, globalStyle.bothContentCenter]}>
          <Button
            onPress={() => {
              navigation.goBack();
            }}
            lable="Save Changes"
          />
        </View>
      </View>
    </Container>
  );
};

const styles = {
  mainView: tw`w-full h-full flex-1 bg-cultured px-4 pt-6`,
  bottomButtonView: tw`w-full h-22 items-center bg-cultured justify-center px-4`,
  timeBoxView: tw`flex-row w-full gap-4`,
  boxWrapper: tw`flex-1 w-full h-full`,
  timeBox: tw`w-full h-13 border flex-row items-center  border-borderDarkGrey mt-2 rounded-lg pl-3`,
  watchIcon: tw`w-5 h-5`,
  addMoreView: tw`w-full h-12 mt-8`,
  addMore: tw`w-35 h-12 flex-row gap-2 bg-aliceBlue rounded-full`,
  plusIcon: tw`w-4 h-4`,
};

export default SetAvailability;
