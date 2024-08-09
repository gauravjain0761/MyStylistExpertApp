import React, {FC, useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  // Switch,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  commonFontStyle,
  f,
  fontFamily,
  fontSize,
  h,
  hp,
  screen_width,
  w,
  wp,
} from '../../utils/dimentions';
import Color from '../../../assets/color';
import {DynamicCaller} from '../../utils/APICaller';
import {endPoints} from '../../../config';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import globalStyle from 'globalStyles';
import {Container, Header, ToggleSwitch} from 'components';
import {NativeToast} from '../../utils/toast';
import images from 'images';
import {AppContext} from 'context';

const {getAllDatesOFUser, markAsBusy, markAsUnBusy} = endPoints;

function OfferItems(props: any) {
  const {index, data, selectedValuee, setkeyword} = props;
  const {time, color, status, _id, isPast} = data || {};
  return (
    <View style={styles.itemContainer}>
      <Pressable
        onPress={() => {
          setkeyword(index, time, _id, status);
        }}
        disabled={isPast == true ? true : false}
        style={{
          backgroundColor:
            status === 'unavailable' &&
            selectedValuee?.some(item => item?.timeSlot_id == _id)
              ? Color.Blue
              : status === 'unavailable'
              ? 'red'
              : selectedValuee?.some(item => item?.timeSlot_id == _id)
              ? Color.Green
              : Color.DimGrey,
          padding: w(2),
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 20,
          opacity: isPast == true ? 0.5 : 1,
        }}>
        <Text style={{color: Color.Black}}>{time}</Text>
      </Pressable>
    </View>
  );
}

function BusyMode() {
  const navigation = useNavigation();
  const [getMorningDates, setMorningDates] = useState([]);
  const [getEveningDates, setEveningDates] = useState([]);
  const [getAfternoonDates, setAfternoonDates] = useState([]);
  const [selected, setSelected] = useState(moment().format('YYYY-MM-DD'));
  const [selectedTime, setSelectedTime] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [containerLoading, setContainerLoading] = useState(false);

  const {userDetails, setLoading} = useContext(AppContext);
  const {_id} = userDetails;

  const minDate = moment().format('YYYY-MM-DD');
  useEffect(() => {
    getAllDates();
    setContainerLoading(!containerLoading);
  }, [selected]);

  const getAllDates = () => {
    const method = 'POST';
    const endpoint = `${getAllDatesOFUser}`;
    const body = {
      expertId: _id,
      startDate: selected,
      endDate: selected,
      timeSlotDuration: 60,
    };
    setContainerLoading(true);
    DynamicCaller(endpoint, method, body, '')
      .then(response => {
        console.log('reposnse of get all Dates', response);
        const {data, status} = response;
        const {response: calData} = data || {};
        if (
          (status == 200 || status == 201) &&
          data &&
          calData?.[selected]['evening'].length
        ) {
          setContainerLoading(false);

          const {afternoon, evening, morning} = calData?.[selected];
          setAfternoonDates(afternoon);
          setEveningDates(evening);
          setMorningDates(morning);
        }
      })
      .catch(error => {
        setContainerLoading(false);

        console.log('error of get all Dates', error);
      });
  };

  const markBusy = (item: any) => {
    const method = 'POST';
    const endpoint = `${markAsBusy}`;
    const body = {
      timeSlots: item?.length ? item : selectedTime,
    };
    setContainerLoading(true);

    DynamicCaller(endpoint, method, body, '')
      .then(response => {
        setContainerLoading(false);
        console.log('reposnse of get mark Busy', response);
        const {data, status} = response;
        const {message} = data;
        if (status == 200 || (status == 201 && data)) {
          NativeToast('Mark busy successfully');
          getAllDates();
          setSelectedTime([]);
        }
      })
      .catch(error => {
        setContainerLoading(false);

        console.log('error of get mark Busy', error);
      });
  };
  const markUnBusy = (item: any) => {
    const method = 'POST';
    const endpoint = `${markAsUnBusy}`;
    const body = {
      userId: _id,
      unavailabilityIds: item?.length
        ? item
        : selectedTime?.map(item => item?.timeSlot_id),
    };

    setContainerLoading(true);

    DynamicCaller(endpoint, method, body, '')
      .then(response => {
        console.log('reposnse of get mark unBusy', response);
        const {data, status} = response;
        const {message} = data;
        if (status == 200 && data) {
          setContainerLoading(false);

          NativeToast('Mark un-busy successfully');
          getAllDates();
          setSelectedTime([]);
        }
      })
      .catch(error => {
        setContainerLoading(false);
        NativeToast(error?.data?.error);
        console.log('error of get mark unBusy', error);
      });
  };

  const onDayPress = (day: any) => {
    setSelected(day.dateString);
  };

  const markasAllDayBusy = (e: any) => {
    if (e) {
      let selectedTimes = [
        ...getMorningDates,
        ...getAfternoonDates,
        ...getEveningDates,
      ]
        ?.map(item => {
          if (!item?.isPast) {
            return {
              timeSlot_id: item?._id,
              unavailableTimeSlot: item?.time,
              expert: _id,
              unavailableDate: selected,
              reason: 'urgent work',
              color: '#000000',
            };
          }
        })
        ?.filter(item => item);
      setSelectedTime(selectedTimes);
      markBusy(selectedTime);
    } else {
      let unbusy = [
        ...getMorningDates,
        ...getAfternoonDates,
        ...getEveningDates,
      ]
        ?.map(item => {
          if (item?.status == 'unavailable') {
            return item?._id;
          }
        })
        ?.filter(item => item);
      markUnBusy(unbusy);
    }
  };

  return (
    <Container>
      <View style={globalStyle.container}>
        <Header title="Busy Mode" />
        <View style={styles.subContainer}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.calenderView}>
              <Text style={styles.title}>Date</Text>
              <Calendar
                minDate={minDate}
                renderArrow={direction =>
                  direction == 'left' ? (
                    <View style={styles.arrow}>
                      <Image
                        resizeMode="contain"
                        source={images?.Back}
                        style={styles.backicon}
                      />
                    </View>
                  ) : (
                    <View style={styles.arrow}>
                      <Image
                        resizeMode="contain"
                        source={images?.Back}
                        style={[
                          styles.backicon,
                          {transform: [{rotate: '180deg'}]},
                        ]}
                      />
                    </View>
                  )
                }
                onDayPress={onDayPress}
                markingType={'custom'}
                markedDates={{
                  [selected]: {
                    selected: true,
                    selectedColor: '#89E3DC',
                    textColor: 'black',
                  },
                }}
                theme={{
                  'stylesheet.calendar.header': {
                    week: {
                      flexDirection: 'row',
                      marginHorizontal: wp(10),
                      justifyContent: 'space-between',
                      marginTop: hp(30),
                    },
                    header: {
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      paddingHorizontal: wp(0),
                      alignItems: 'center',
                      paddingLeft: 0,
                      paddingRight: 0,
                    },
                    arrow: {
                      margin: hp(0),
                    },
                    dayHeader: {
                      fontFamily: fontFamily.medium,
                      color: Color?.Grey75,
                      fontSize: fontSize(16),
                    },
                    monthText: {
                      fontFamily: fontFamily.medium,
                      color: Color?.Grey3B,
                      fontSize: fontSize(16),
                    },
                  },
                  dayTextColor: 'black',
                  selectedDayTextColor: 'black',
                  todayTextColor: '#2F7973',
                  selectedColor: '#89E3DC',
                }}
                style={{
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: Color.White,
                marginTop: h(2),
                borderRadius: 8,
                // padding: 10,
                paddingLeft: wp(20),
                paddingRight: wp(8),
                paddingVertical: hp(20),
              }}>
              {containerLoading ? (
                <ActivityIndicator
                  size={'large'}
                  color={Color?.Green}
                  animating={containerLoading}
                />
              ) : (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: Color.Black,
                        fontWeight: '700',
                        fontSize: f(1.6),
                      }}>
                      Select available Time
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: wp(7),
                      }}>
                      <Text
                        style={{
                          ...commonFontStyle(
                            fontFamily.regular,
                            13,
                            Color?.Black,
                          ),
                        }}>
                        All Day
                      </Text>
                      <ToggleSwitch
                        onValueChange={e => {
                          setIsEnabled(!isEnabled);
                          markasAllDayBusy(e);
                        }}
                        active={isEnabled}
                      />
                    </View>
                  </View>
                  {getMorningDates && getMorningDates.length ? (
                    <View style={{width: '100%', marginTop: h(2)}}>
                      <Text
                        style={{
                          ...commonFontStyle(
                            fontFamily.medium,
                            16,
                            Color?.Black,
                          ),
                        }}>
                        Morning
                      </Text>
                    </View>
                  ) : null}

                  <View style={{width: '100%', backgroundColor: Color.White}}>
                    <FlatList
                      data={getMorningDates}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item, index) => index.toString()}
                      ItemSeparatorComponent={() => (
                        <View style={{width: wp(12)}} />
                      )}
                      renderItem={({item, index}) => {
                        return (
                          <OfferItems
                            data={item}
                            index={index}
                            key={index.toString()}
                            setkeyword={(index, value, id, status) => {
                              setSelectedTime((previousData: any) => {
                                return previousData?.some(
                                  item => item?.timeSlot_id == id,
                                )
                                  ? previousData?.filter(
                                      (item: any) => item?.timeSlot_id !== id,
                                    )
                                  : [
                                      ...previousData,
                                      {
                                        timeSlot_id: id,
                                        unavailableTimeSlot: value,
                                        expert: _id,
                                        unavailableDate: selected,
                                        reason: 'urgent work',
                                        color: '#000000',
                                      },
                                    ];
                              });
                            }}
                            selectedValuee={selectedTime}
                          />
                        );
                      }}
                    />
                  </View>
                  {getAfternoonDates && getAfternoonDates.length ? (
                    <View style={{width: '100%', marginTop: 10}}>
                      <Text
                        style={{
                          color: Color.Black,
                          fontFamily: 'Font-Bold',
                          fontSize: f(1.4),
                        }}>
                        Afternoon
                      </Text>
                    </View>
                  ) : null}

                  <View style={{width: '100%'}}>
                    <FlatList
                      data={getAfternoonDates}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item, index) => index.toString()}
                      ItemSeparatorComponent={() => (
                        <View style={{width: wp(12)}} />
                      )}
                      renderItem={({item, index}) => {
                        return (
                          <OfferItems
                            data={item}
                            index={index}
                            key={index.toString()}
                            setkeyword={(index, value, id) => {
                              setSelectedTime((previousData: any) => {
                                return previousData?.some(
                                  item => item?.timeSlot_id == id,
                                )
                                  ? previousData?.filter(
                                      (item: any) => item?.timeSlot_id !== id,
                                    )
                                  : [
                                      ...previousData,
                                      {
                                        timeSlot_id: id,
                                        unavailableTimeSlot: value,
                                        expert: _id,
                                        unavailableDate: selected,
                                        reason: 'urgent work',
                                        color: '#000000',
                                      },
                                    ];
                              });
                            }}
                            selectedValuee={selectedTime}
                          />
                        );
                      }}
                    />
                  </View>
                  {getEveningDates && getEveningDates.length ? (
                    <View style={{width: '100%', marginTop: 10}}>
                      <Text
                        style={{
                          color: Color.Black,
                          fontFamily: 'Font-Bold',
                          fontSize: f(1.4),
                        }}>
                        Evening
                      </Text>
                    </View>
                  ) : null}

                  <View style={{width: '100%'}}>
                    <FlatList
                      data={getEveningDates}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item, index) => index.toString()}
                      ItemSeparatorComponent={() => (
                        <View style={{width: wp(12)}} />
                      )}
                      renderItem={({item, index}) => {
                        return (
                          <OfferItems
                            data={item}
                            index={index}
                            key={index.toString()}
                            setkeyword={(index, value, id) => {
                              setSelectedTime((previousData: any) => {
                                return previousData?.some(
                                  item => item?.timeSlot_id == id,
                                )
                                  ? previousData?.filter(
                                      (item: any) => item?.timeSlot_id !== id,
                                    )
                                  : [
                                      ...previousData,
                                      {
                                        timeSlot_id: id,
                                        unavailableTimeSlot: value,
                                        expert: _id,
                                        unavailableDate: selected,
                                        reason: 'urgent work',
                                        color: '#000000',
                                      },
                                    ];
                              });
                            }}
                            selectedValuee={selectedTime}
                          />
                        );
                      }}
                    />
                  </View>
                </>
              )}
            </View>
          </KeyboardAwareScrollView>
          <View
            style={{
              width: '100%',
              height: h(14),
              marginVertical: h(2),
              alignItems: 'center',
            }}>
            <Pressable
              onPress={() => {
                if (!selectedTime?.length) {
                  NativeToast('Please select time');
                } else {
                  markBusy('');
                }
              }}
              style={{
                width: '100%',
                height: h(7),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Color.Green,
                borderRadius: 8,
              }}>
              <Text
                style={{
                  color: Color.Black,
                  fontSize: f(1.5),
                  fontWeight: '700',
                }}>
                Mark as busy
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                if (!selectedTime?.length) {
                  NativeToast('Please select time');
                } else {
                  markUnBusy('');
                }
              }}
              style={{
                width: '100%',
                height: h(7),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Color.White,
                borderRadius: 8,
              }}>
              <Text style={{color: Color.Grey, fontSize: 16}}>
                Remove from busy
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: Color.DimGrey,
  },
  subContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingHorizontal: w(4),
    backgroundColor: Color.DimGrey,
  },
  cardContainer: {
    width: '100%',
    marginTop: h(2),
    paddingHorizontal: w(3),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: h(2),
    backgroundColor: Color.White,
  },
  quesText: {
    fontSize: f(1.3),
    fontWeight: '600',
    color: Color.Black,
  },
  answerText: {
    fontSize: f(1.2),
    fontWeight: '400',
    marginTop: h(1),
    color: Color.DarkGrey,
  },
  qaText: {
    width: w(80),
  },
  arrow: {
    backgroundColor: Color?.GreenEF,
    borderRadius: wp(6),
  },
  photoView: {
    width: w(15),
    height: w(15),
    borderRadius: w(20) / 2,
    borderColor: Color.Green,
    borderWidth: 2,
  },
  listWrapperAll: {
    flex: 1,
    height: '100%',
    width: '100%',
    paddingBottom: h(2),
  },
  addressinput: {
    width: '100%',
    height: h(13),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: h(1.5),
    paddingHorizontal: w(1),
    borderRadius: 10,
    borderColor: Color.Grey,
    borderWidth: 1,
    color: Color.Black,
  },
  addressinputText: {
    width: '100%',
    paddingTop: Platform.OS === 'android' ? 0 : 10,
    paddingLeft: Platform.OS === 'android' ? 0 : 5,
    fontSize: f(1.2),
    fontWeight: '600',
    borderRadius: 10,
    color: Color.Black,
  },
  favText: {
    fontSize: 15,
    fontWeight: '600',
    color: Color.Black,
    marginLeft: w(2),
  },
  favIcon: {
    width: w(6),
    height: w(6),
    color: Color.Black,
  },
  profile: {
    height: h(12),
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    marginTop: 20,
  },
  subprofile1: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: w(14),
    width: w(14),
    borderRadius: w(14),
    borderWidth: 2,
    borderColor: Color.Green,
  },
  subprofile2: {
    width: '60%',
    justifyContent: 'center',
  },

  subprofile3: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    fontSize: 14,
    color: Color.Black,
    fontWeight: '700',
  },
  textOther: {
    fontSize: 12,
    color: Color.Black,
    fontWeight: 'normal',
  },
  smallIcon: {
    height: w(4),
    width: w(4),
    padding: 5,
  },
  belIcon: {
    height: h(3),
    width: w(5.7),
    tintColor: Color.Green,
  },
  ratingPart: {
    width: w(25),
    padding: 1,
    borderWidth: 1,
    borderColor: Color.Green,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'flex-start',
  },
  ratingPart1: {
    height: h(3),
    width: w(8),
    borderLeftWidth: 1,
    borderLeftColor: Color.Green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subpart3: {
    height: h(6.4),
    width: w(12),
    backgroundColor: 'white',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  dashboardView: {
    height: h(9),

    //backgroundColor: 'rgba(0,0,0,0.1)',
    flexDirection: 'row',
    marginTop: 2,
    alignItems: 'center',
  },
  galaryIcon: {
    height: h(3),
    width: w(5.7),
    tintColor: Color.FullDarkGrey,
  },
  rect: {
    width: w(92),
    height: h(7),
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  //   image: {
  //     width: 23,
  //     height: 22,
  //     marginTop: 9,
  //   },
  loremIpsum: {
    top: 12,
    left: 0,
    position: 'absolute',
    fontFamily: 'roboto-regular',
    color: '#121212',
  },
  placeholder: {
    top: 0,
    left: 0,
    position: 'absolute',
    fontFamily: 'roboto-regular',
    color: '#121212',
    height: 40,
    width: 306,
  },
  loremIpsumStack: {
    width: 306,
    height: 40,
    marginLeft: 10,
  },
  imageRow: {
    height: 40,
    flexDirection: 'row',
    flex: 1,
    marginRight: 6,
    marginLeft: 8,
  },

  rect2: {
    width: 195,
    height: 22,
    backgroundColor: '#E6E6E6',
    marginTop: 9,
    marginLeft: 8,
  },
  loremIpsum3: {
    fontFamily: 'roboto-regular',
    color: '#121212',
    marginTop: 4,
    marginLeft: 33,
  },
  categoriesList: {
    width: '100%',
    marginTop: h(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesButton: {
    height: h(5),
    borderRadius: 7,
    marginRight: w(4),
    justifyContent: 'center',
    paddingHorizontal: w(5),
    backgroundColor: Color.Green,
  },
  catgoriesBtnText: {
    fontSize: f(1.2),
    letterSpacing: 0.3,
    color: Color.White,
    fontWeight: 'normal',
  },
  imageMs: {
    width: 23,
    height: 22,
  },
  bookedButton: {
    height: h(3),
    paddingHorizontal: w(4),
    justifyContent: 'center',
    backgroundColor: Color.LightGreen,
  },
  bookedBtnText: {
    fontSize: 9,
    letterSpacing: 0.3,
    color: Color.White,
    fontWeight: 'normal',
  },
  couponButton: {
    height: h(5),
    paddingHorizontal: w(4),
    justifyContent: 'center',
    backgroundColor: Color.Green,
  },
  couponBtnText: {
    fontSize: 12,
    letterSpacing: 0.3,
    color: Color.White,
    fontWeight: 'normal',
  },
  itemLines: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 5,
  },
  itemContainer: {
    // padding: 5,
    marginTop: hp(15),
    // borderColor: Color.LightGrey,
    // borderBottomWidth: 1,
  },
  calenderView: {
    marginTop: hp(10),
    backgroundColor: Color?.White,
    borderRadius: wp(8),
    overflow: 'hidden',
    paddingBottom: hp(16),
    paddingHorizontal: wp(20),
  },
  title: {
    ...commonFontStyle(fontFamily.medium, 18, Color?.Black),
    paddingTop: hp(20),
    marginBottom: hp(14),
  },
  backicon: {
    width: wp(28),
    height: wp(28),
    marginHorizontal: wp(10),
    marginVertical: hp(10),
  },
  calander: {
    paddingHorizontal: wp(40),
  },
});

const calenderTheme = {
  'stylesheet.calendar.header': {
    header: {
      width: w(90),
      height: h(20),
      color: '#000000',
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      //   backgroundColor: 'transparent',
      backgroundColor: 'yellow',
    },
    week: {
      width: '90%',
      color: '#000000',
      alignSelf: 'center',
      flexDirection: 'row',
      backgroundColor: 'transparent',
      justifyContent: 'space-around',
    },
    textDayStyle: {
      height: '20%',
    },
  },
  arrowColor: '#C5C5C5',
  indicatorColor: '#B01E06',
  textDayFontWeight: '300',
  textDayFontSize: '2%',
  monthTextColor: '#000000',
  textMonthFontWeight: 'bold',
  textMonthFontSize: '3%',
  textDayHeaderFontSize: '2%',
  calendarBackground: 'transparent',
  textDayHeaderFontWeight: '300',
  textSectionTitleColor: '#000000',
};

export default BusyMode;
