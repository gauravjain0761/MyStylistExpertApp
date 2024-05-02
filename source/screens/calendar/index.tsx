import React, {FC, useState} from 'react';
import {h, w} from 'utils';
import tw from 'rn-tailwind';
import images from 'images';
import globalStyle from 'globalStyles';
import {Pressable, FlatList, View} from 'react-native';
import {Calendar as Calendars, LocaleConfig} from 'react-native-calendars';

import {
  Header,
  Text,
  Image,
  AppointmentCard,
  Container,
  Button,
} from 'components';
import {Direction} from 'react-native-calendars/src/types';

const Calendar: FC = () => {
  return (
    <Container>
      <View style={globalStyle.container}>
        <Header title="Calendar" />
        <View style={styles.calendarView}>
          <View style={styles.calendarWrapper}>
            <Text margin="ml-4 mt-4" size="lg" fontWeight="700">
              Date
            </Text>
            <Calendars
              style={styles.calender}
              onMonthChange={(date: any) => {}}
              onDayPress={(date: any) => {}}
              renderArrow={(direction: Direction) => {
                return (
                  <View
                    style={[
                      styles.calendarButtons,
                      globalStyle.bothContentCenter,
                    ]}>
                    <Image
                      resizeMode="contain"
                      style={styles.calendarArrow}
                      source={
                        direction === 'left' ? images.BackIcon : images.NextIcon
                      }
                    />
                  </View>
                );
              }}
              theme={{
                'stylesheet.calendar.header': {
                  week: {
                    color: '#666666',
                    flexDirection: 'row',
                    paddingHorizontal: w(2),
                    justifyContent: 'space-between',
                  },
                  header: {
                    height: h(6),
                    marginBottom: h(2),
                    color: '#000000',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  },
                },
                textDayFontSize: 15,
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#89E3DC',
                dayTextColor: '#000000',
                arrowColor: 'white',
              }}
              markingType={'period'}
              markedDates={{
                '2023-12-25': {
                  startingDay: true,
                  color: '#89E3DC',
                  textColor: '#000000',
                },
                '2023-12-26': {
                  color: '#effbfa',
                  textColor: '#000000',
                },
                '2023-12-27': {color: '#effbfa', textColor: '#000000'},
                '2023-12-28': {
                  endingDay: true,
                  color: '#89E3DC',
                  textColor: '#000000',
                },
              }}
            />
          </View>
        </View>
        <View style={styles.bottomView}>
          <Button labelFontWeight="700" onPress={() => {}} lable="Apply" />
          <Text size="sm" margin="mt-5" color="text-darkGrey">
            Reset
          </Text>
        </View>
      </View>
    </Container>
  );
};

const styles = {
  calendarView: tw`flex-1 w-full h-full bg-floralWhite px-4`,
  calendarWrapper: tw`w-full h-97 bg-white rounded-lg mt-6`,
  calender: tw`w-full h-full mt-2`,
  calendarButtons: tw`w-11 h-11 rounded-lg bg-aliceBlue`,
  calendarArrow: tw`w-5 h-5`,
  bottomView: tw`w-full h-58 bg-white px-4 items-center justify-end pb-9`,
  greyView: tw`flex-1 bg-dimGrey h-full w-full`,
  buttonView: tw`flex-1 bg-white h-full w-full items-center justify-center`,
};

export default Calendar;
