import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import Container from '../../components/container';
import Header from '../../components/header';
import {commonFontStyle, fontFamily, hp, wp} from '../../utils/dimentions';
import images from 'images';
import Color from '../../../assets/color';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {useAppDispatch, useAppSelector} from 'store';
import {getWorkingHours} from '../../Actions/availabilityAction';
import {AppContext} from 'context';

const Availability: FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {working_hours} = useAppSelector(state => state?.availability);
  const {userDetails, setLoading} = useContext(AppContext);

  useFocusEffect(
    useCallback(() => {
      getAvailability();
    }, [userDetails]),
  );

  const getAvailability = async () => {
    setLoading(true);
    let obj = {
      data: {
        userId: userDetails?._id,
      },
      onSuccess: (res: any) => {
        setLoading(false);
      },
      onFailure: (err: any) => {
        console.log('errr', err);
        setLoading(false);
      },
    };
    dispatch(getWorkingHours(obj));
  };

  return (
    <Container>
      <SafeAreaView>
        <Header title="Availability" />
        <View style={styles.topcontainer}>
          <FlatList
            data={working_hours?.length ? Object?.keys(working_hours?.[0]) : []}
            ItemSeparatorComponent={() => (
              <View style={styles.itemseprator}></View>
            )}
            renderItem={({item, index}) => {
              return item !== '_id' ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('SetAvailability', {
                      time: working_hours[0][item],
                      day: item,
                    })
                  }
                  style={styles.listcontainer}>
                  <Text style={styles.day}>{item}</Text>
                  <View style={styles?.rightcontainer}>
                    <View style={styles.timecontainer}>
                      {working_hours[0][item]?.from?.length ? (
                        <Text style={styles.timetitle}>
                          {moment(
                            working_hours[0][item]?.from,
                            'hh:mm',
                          )?.format('hh:mm')}
                        </Text>
                      ) : null}
                      <Text style={styles.timetitle}>{' - '}</Text>
                      {working_hours[0][item]?.to?.length ? (
                        <Text style={styles.timetitle}>
                          {moment(working_hours[0][item]?.to, 'hh:mm')?.format(
                            'hh:mm',
                          )}
                        </Text>
                      ) : null}
                    </View>
                    <Image style={styles.righticon} source={images?.lefticon} />
                  </View>
                </TouchableOpacity>
              ) : null;
            }}
          />
          <Pressable
            onPress={() => navigation.navigate('BusyMode')}
            style={styles.busymode}>
            <View style={styles.leftside}>
              <View style={styles.busybg}>
                <Image source={images.BusyIcon} style={styles.busyicon} />
              </View>
              <View>
                <Text style={styles.busytitle}>{'Busy Mode'}</Text>
                <View style={styles.left}>
                  <View style={styles.dote}></View>
                  <Text style={styles.inactivetitle}>{'Inactive'}</Text>
                </View>
              </View>
            </View>
            <Image source={images?.righticon} style={styles.iconright} />
          </Pressable>
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default Availability;

const styles = StyleSheet.create({
  topcontainer: {
    marginTop: hp(10),
  },
  listcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp(20),
    marginHorizontal: wp(20),
    alignItems: 'center',
  },
  rightcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(15),
  },
  righticon: {
    transform: [
      {
        rotate: '180deg',
      },
    ],
    width: wp(11),
    height: wp(11),
  },
  timecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timetitle: {
    ...commonFontStyle(fontFamily.medium, 16, Color?.Black),
  },
  day: {
    ...commonFontStyle(fontFamily.medium, 16, Color?.Grey66),
  },
  itemseprator: {
    height: hp(1),
    backgroundColor: Color?.GreyEB,
    marginHorizontal: wp(20),
  },
  busymode: {
    borderRadius: wp(16),
    backgroundColor: Color?.GreenEC,
    marginHorizontal: wp(20),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(10),
  },

  busyicon: {
    width: wp(30),
    height: wp(30),
  },
  busybg: {
    backgroundColor: Color?.BlueA0,
    width: wp(73),
    height: wp(73),
    borderRadius: wp(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftside: {
    gap: wp(14),
    flexDirection: 'row',
    alignItems: 'center',
  },
  busytitle: {
    ...commonFontStyle(fontFamily.semi_bold, 16, Color?.Black),
    lineHeight: hp(20),
    marginBottom: hp(5),
  },
  inactivetitle: {
    ...commonFontStyle(fontFamily.regular, 16, Color?.Blue4C),
  },
  dote: {
    width: wp(6),
    height: wp(6),
    backgroundColor: Color?.Blue4C,
    borderRadius: wp(100),
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(6),
  },
  iconright: {
    width: wp(24),
    height: wp(24),
    marginRight: wp(20),
  },
});

// import React, {useContext, useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Pressable,
//   TextInput,
//   Image,
//   FlatList,
//   ScrollView,
//   Switch,
// } from 'react-native';
// import {useSelector} from 'react-redux';
// import {useNavigation} from '@react-navigation/native';
// import {f, h, w} from '../../utils/dimentions';
// import Color from '../../../assets/color';
// import {DynamicCaller} from '../../utils/APICaller';
// import {endPoints} from '../../../config';
// import {Calendar} from 'react-native-calendars';
// import moment from 'moment';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import globalStyle from 'globalStyles';
// import {Container, Header} from 'components';
// import {NativeToast} from '../../utils/toast';

// const {getAllDatesOFUser, markAsBusy, markAsUnBusy} = endPoints;

// function OfferItems(props) {
//   const [selected, setSelected] = useState(false);

//   const {index, data, selectedValuee, setkeyword} = props;
//   console.log('CouponItems', data);
//   const {time, color, status, _id} = data || {};
//   console.log('selectedValue', selectedValuee, time);
//   return (
//     <View style={styles.itemContainer}>
//       <Pressable
//         onPress={() => {
//           setkeyword(index, time, _id);
//         }}
//         style={{
//           backgroundColor:
//             status === 'unavailable' && selectedValuee === _id
//               ? Color.Blue
//               : status === 'unavailable'
//               ? 'red'
//               : selectedValuee === _id
//               ? Color.Green
//               : Color.DimGrey,
//           padding: w(2),
//           justifyContent: 'center',
//           alignItems: 'center',
//           borderRadius: 20,
//         }}>
//         <Text style={{color: Color.Black}}>{time}</Text>
//       </Pressable>
//     </View>
//   );
// }

// function Availability() {
//   const navigation = useNavigation();
//   const [getDates, setDates] = useState([]);
//   const [getMorningDates, setMorningDates] = useState([]);
//   const [getEveningDates, setEveningDates] = useState([]);
//   const [getAfternoonDates, setAfternoonDates] = useState([]);
//   const [selected, setSelected] = useState(moment().format('YYYY-MM-DD'));
//   const [selectedTime, setSelectedTime] = useState('');
//   const [selectedId, setSelectedId] = useState('');
//   const [selectedValue, setSelectedValue] = useState('');
//   const [isEnabled, setIsEnabled] = useState(false);
//   const toggleSwitch = () => setIsEnabled(previousState => !previousState);
//   const {userId} = useSelector(state => {
//     return state.user;
//   });

//   const minDate = moment().format('YYYY-MM-DD');
//   const maxDate = moment().format('YYYY-MM-DD');
//   useEffect(() => {
//     getAllDates();
//   }, []);

//   useEffect(() => {
//     getAllDates();
//   }, [selected]);

//   const getAllDates = () => {
//     console.log('selectedselectedselectedselected', selected);
//     const method = 'POST';
//     const endpoint = `${getAllDatesOFUser}`;
//     const body = {
//       expertId: userId,
//       startDate: selected,
//     };
//     DynamicCaller(endpoint, method, body, '')
//       .then(response => {
//         console.log('reposnse of get all Dates', response);
//         const {data, status} = response;
//         const {response: calData} = data;
//         if (status == 200 && data && calData?.[selected]['evening'].length) {
//           const {afternoon, evening, morning} = calData?.[selected];

//           setAfternoonDates(afternoon);
//           setEveningDates(evening);
//           setMorningDates(morning);
//           // console.log(' data?.[selected]', data?.[selected]);
//           // setDates(calData?.[selected]);
//         }
//       })
//       .catch(error => {
//         console.log('error of get all Dates', error);
//       });
//   };

//   const markBusy = () => {
//     console.log('selectedValue', selectedValue);
//     const method = 'POST';
//     const endpoint = `${markAsBusy}`;
//     const body = {
//       expert: userId,
//       unavailableTimeSlot: selectedValue,
//       unavailableDate: selected,
//       reason: 'urgent work',
//       color: '#0000000',
//       timeSlot_id: selectedId,
//     };
//     DynamicCaller(endpoint, method, body, '')
//       .then(response => {
//         console.log('reposnse of get mark Busy', response);
//         const {data, status} = response;
//         const {message} = data;
//         if (status == 200 && data) {
//           NativeToast('Mark busy successfully');
//           getAllDates();
//           setSelectedValue('');
//           setSelectedId('');
//           setSelectedTime('');
//         }
//       })
//       .catch(error => {
//         console.log('error of get mark Busy', error);
//       });
//   };
//   const markUnBusy = () => {
//     const method = 'POST';
//     const endpoint = `${markAsUnBusy}`;
//     const body = {
//       userId: userId,
//       unavailabilityId: selectedId,
//     };

//     DynamicCaller(endpoint, method, body, '')
//       .then(response => {
//         console.log('reposnse of get mark unBusy', response);
//         const {data, status} = response;
//         const {message} = data;
//         if (status == 200 && data) {
//           NativeToast('Mark un-busy successfully');
//           getAllDates();
//           setSelectedValue('');
//           setSelectedId('');
//           setSelectedTime('');
//         }
//       })
//       .catch(error => {
//         console.log('error of get mark unBusy', error);
//       });
//   };
//   return (
//     <Container>
//       <View style={globalStyle.container}>
//         <Header title="Availability" />
//         <View style={styles.subContainer}>
//           <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
//             <View style={styles.calenderView}>
//               <Calendar
//                 minDate={minDate}
//                 onDayLongPress={date => {
//                   const dateString = date['dateString'];
//                   const dateFormat = moment(dateString).format('YYYY-MM-DD');
//                   console.log('onDayLongPress', dateFormat);
//                   setSelected(dateFormat);
//                   setDates([]);
//                 }}
//                 onDayPress={date => {
//                   const dateString = date['dateString'];
//                   const dateFormat = moment(dateString).format('YYYY-MM-DD');
//                   console.log('onDayPress', dateFormat);
//                   setSelected(dateFormat);
//                   setDates([]);
//                 }}
//                 style={{
//                   borderWidth: 1,
//                   borderColor: Color.LightGrey,
//                   borderRadius: 8,
//                   elevation: 1,
//                 }}
//                 markedDates={{
//                   [selected]: {
//                     selected: true,
//                   },
//                 }}
//               />
//             </View>
//             <View
//               style={{
//                 backgroundColor: Color.White,
//                 marginTop: h(2),
//                 borderRadius: 8,
//                 padding: 10,
//               }}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                 }}>
//                 <Text
//                   style={{
//                     color: Color.Black,
//                     fontWeight: '700',
//                     fontSize: f(1.6),
//                   }}>
//                   Select Available Time
//                 </Text>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}>
//                   <Text>All Day</Text>
//                   <Switch
//                     trackColor={{false: '#767577', true: Color.Green}}
//                     thumbColor={isEnabled ? '#FFFFFF' : '#f4f3f4'}
//                     ios_backgroundColor="#3e3e3e"
//                     onValueChange={toggleSwitch}
//                     value={isEnabled}
//                   />
//                 </View>
//               </View>
//               {getMorningDates && getMorningDates.length ? (
//                 <View style={{width: '100%', marginTop: h(2)}}>
//                   <Text
//                     style={{
//                       color: Color.Black,
//                       fontFamily: 'Font-Bold',
//                       fontSize: f(1.4),
//                     }}>
//                     Morning
//                   </Text>
//                 </View>
//               ) : null}

//               <View style={{width: '100%', backgroundColor: Color.White}}>
//                 <FlatList
//                   data={getMorningDates}
//                   horizontal={true}
//                   showsHorizontalScrollIndicator={false}
//                   keyExtractor={(item, index) => index.toString()}
//                   renderItem={({item, index}) => {
//                     return (
//                       <OfferItems
//                         data={item}
//                         index={index}
//                         key={index.toString()}
//                         setkeyword={(index, value, id) => {
//                           setSelectedTime(id);
//                           setSelectedValue(value);
//                           setSelectedId(id);
//                         }}
//                         selectedValuee={selectedTime}
//                       />
//                     );
//                   }}
//                 />
//               </View>
//               {getAfternoonDates && getAfternoonDates.length ? (
//                 <View style={{width: '100%', marginTop: 10}}>
//                   <Text
//                     style={{
//                       color: Color.Black,
//                       fontFamily: 'Font-Bold',
//                       fontSize: f(1.4),
//                     }}>
//                     Afternoon
//                   </Text>
//                 </View>
//               ) : null}

//               <View style={{width: '100%'}}>
//                 <FlatList
//                   data={getAfternoonDates}
//                   horizontal={true}
//                   showsHorizontalScrollIndicator={false}
//                   keyExtractor={(item, index) => index.toString()}
//                   renderItem={({item, index}) => {
//                     return (
//                       <OfferItems
//                         data={item}
//                         index={index}
//                         key={index.toString()}
//                         setkeyword={(index, value, id) => {
//                           setSelectedTime(id);
//                           setSelectedValue(value);
//                           setSelectedId(id);
//                         }}
//                         selectedValuee={selectedTime}
//                       />
//                     );
//                   }}
//                 />
//               </View>
//               {getEveningDates && getEveningDates.length ? (
//                 <View style={{width: '100%', marginTop: 10}}>
//                   <Text
//                     style={{
//                       color: Color.Black,
//                       fontFamily: 'Font-Bold',
//                       fontSize: f(1.4),
//                     }}>
//                     Evening
//                   </Text>
//                 </View>
//               ) : null}

//               <View style={{width: '100%'}}>
//                 <FlatList
//                   data={getEveningDates}
//                   horizontal={true}
//                   showsHorizontalScrollIndicator={false}
//                   keyExtractor={(item, index) => index.toString()}
//                   renderItem={({item, index}) => {
//                     return (
//                       <OfferItems
//                         data={item}
//                         index={index}
//                         key={index.toString()}
//                         setkeyword={(index, value, id) => {
//                           setSelectedTime(id);
//                           setSelectedValue(value);
//                           setSelectedId(id);
//                         }}
//                         selectedValuee={selectedTime}
//                       />
//                     );
//                   }}
//                 />
//               </View>
//             </View>
//           </KeyboardAwareScrollView>
//           <View
//             style={{
//               width: '100%',
//               height: h(14),
//               marginVertical: h(2),
//               alignItems: 'center',
//             }}>
//             <Pressable
//               onPress={() => {
//                 if (!selectedValue) {
//                   NativeToast('Please select time');
//                 } else {
//                   markBusy();
//                 }
//               }}
//               style={{
//                 width: '100%',
//                 height: h(7),
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: Color.Green,
//                 borderRadius: 8,
//               }}>
//               <Text
//                 style={{
//                   color: Color.Black,
//                   fontSize: f(1.5),
//                   fontWeight: '700',
//                 }}>
//                 Mark as busy
//               </Text>
//             </Pressable>
//             <Pressable
//               onPress={() => {
//                 if (!selectedValue) {
//                   NativeToast('Please select time');
//                 } else {
//                   markUnBusy();
//                 }
//               }}
//               style={{
//                 width: '100%',
//                 height: h(7),
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: Color.White,
//                 borderRadius: 8,
//               }}>
//               <Text style={{color: Color.Grey, fontSize: 16}}>
//                 Remove from busy
//               </Text>
//             </Pressable>
//           </View>
//         </View>
//       </View>
//     </Container>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//     backgroundColor: Color.DimGrey,
//   },
//   subContainer: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//     paddingHorizontal: w(4),
//     backgroundColor: Color.DimGrey,
//   },
//   cardContainer: {
//     width: '100%',
//     marginTop: h(2),
//     paddingHorizontal: w(3),
//     borderRadius: 4,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: h(2),
//     backgroundColor: Color.White,
//   },
//   quesText: {
//     fontSize: f(1.3),
//     fontWeight: '600',
//     color: Color.Black,
//   },
//   answerText: {
//     fontSize: f(1.2),
//     fontWeight: '400',
//     marginTop: h(1),
//     color: Color.DarkGrey,
//   },
//   qaText: {
//     width: w(80),
//   },
//   arrow: {
//     width: w(4),
//     height: w(4),
//     color: Color.Black,
//   },
//   photoView: {
//     width: w(15),
//     height: w(15),
//     borderRadius: w(20) / 2,
//     borderColor: Color.Green,
//     borderWidth: 2,
//   },
//   listWrapperAll: {
//     flex: 1,
//     height: '100%',
//     width: '100%',
//     paddingBottom: h(2),
//   },
//   addressinput: {
//     width: '100%',
//     height: h(13),
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',
//     marginTop: h(1.5),
//     paddingHorizontal: w(1),
//     borderRadius: 10,
//     borderColor: Color.Grey,
//     borderWidth: 1,
//     color: Color.Black,
//   },
//   addressinputText: {
//     width: '100%',
//     paddingTop: Platform.OS === 'android' ? 0 : 10,
//     paddingLeft: Platform.OS === 'android' ? 0 : 5,
//     fontSize: f(1.2),
//     fontWeight: '600',
//     borderRadius: 10,
//     color: Color.Black,
//   },
//   favText: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: Color.Black,
//     marginLeft: w(2),
//   },
//   favIcon: {
//     width: w(6),
//     height: w(6),
//     color: Color.Black,
//   },
//   profile: {
//     height: h(12),
//     width: '100%',
//     backgroundColor: 'white',
//     flexDirection: 'row',
//     marginTop: 20,
//   },
//   subprofile1: {
//     width: '20%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     height: w(14),
//     width: w(14),
//     borderRadius: w(14),
//     borderWidth: 2,
//     borderColor: Color.Green,
//   },
//   subprofile2: {
//     width: '60%',
//     justifyContent: 'center',
//   },

//   subprofile3: {
//     width: '20%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text1: {
//     fontSize: 14,
//     color: Color.Black,
//     fontWeight: '700',
//   },
//   textOther: {
//     fontSize: 12,
//     color: Color.Black,
//     fontWeight: 'normal',
//   },
//   smallIcon: {
//     height: w(4),
//     width: w(4),
//     padding: 5,
//   },
//   belIcon: {
//     height: h(3),
//     width: w(5.7),
//     tintColor: Color.Green,
//   },
//   ratingPart: {
//     width: w(25),
//     padding: 1,
//     borderWidth: 1,
//     borderColor: Color.Green,
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 8,
//     justifyContent: 'flex-start',
//   },
//   ratingPart1: {
//     height: h(3),
//     width: w(8),
//     borderLeftWidth: 1,
//     borderLeftColor: Color.Green,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   subpart3: {
//     height: h(6.4),
//     width: w(12),
//     backgroundColor: 'white',
//     borderRadius: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 4.65,
//     elevation: 8,
//   },
//   dashboardView: {
//     height: h(9),

//     //backgroundColor: 'rgba(0,0,0,0.1)',
//     flexDirection: 'row',
//     marginTop: 2,
//     alignItems: 'center',
//   },
//   galaryIcon: {
//     height: h(3),
//     width: w(5.7),
//     tintColor: Color.FullDarkGrey,
//   },
//   rect: {
//     width: w(92),
//     height: h(7),
//     backgroundColor: '#FFFFFF',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   image: {
//     width: 23,
//     height: 22,
//     marginTop: 9,
//   },
//   loremIpsum: {
//     top: 12,
//     left: 0,
//     position: 'absolute',
//     fontFamily: 'roboto-regular',
//     color: '#121212',
//   },
//   placeholder: {
//     top: 0,
//     left: 0,
//     position: 'absolute',
//     fontFamily: 'roboto-regular',
//     color: '#121212',
//     height: 40,
//     width: 306,
//   },
//   loremIpsumStack: {
//     width: 306,
//     height: 40,
//     marginLeft: 10,
//   },
//   imageRow: {
//     height: 40,
//     flexDirection: 'row',
//     flex: 1,
//     marginRight: 6,
//     marginLeft: 8,
//   },

//   rect2: {
//     width: 195,
//     height: 22,
//     backgroundColor: '#E6E6E6',
//     marginTop: 9,
//     marginLeft: 8,
//   },
//   loremIpsum3: {
//     fontFamily: 'roboto-regular',
//     color: '#121212',
//     marginTop: 4,
//     marginLeft: 33,
//   },
//   categoriesList: {
//     width: '100%',
//     marginTop: h(2),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   categoriesButton: {
//     height: h(5),
//     borderRadius: 7,
//     marginRight: w(4),
//     justifyContent: 'center',
//     paddingHorizontal: w(5),
//     backgroundColor: Color.Green,
//   },
//   catgoriesBtnText: {
//     fontSize: f(1.2),
//     letterSpacing: 0.3,
//     color: Color.White,
//     fontWeight: 'normal',
//   },
//   imageMs: {
//     width: 23,
//     height: 22,
//   },
//   bookedButton: {
//     height: h(3),
//     paddingHorizontal: w(4),
//     justifyContent: 'center',
//     backgroundColor: Color.LightGreen,
//   },
//   bookedBtnText: {
//     fontSize: 9,
//     letterSpacing: 0.3,
//     color: Color.White,
//     fontWeight: 'normal',
//   },
//   couponButton: {
//     height: h(5),
//     paddingHorizontal: w(4),
//     justifyContent: 'center',
//     backgroundColor: Color.Green,
//   },
//   couponBtnText: {
//     fontSize: 12,
//     letterSpacing: 0.3,
//     color: Color.White,
//     fontWeight: 'normal',
//   },
//   itemLines: {
//     width: '100%',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     padding: 5,
//   },
//   itemContainer: {
//     padding: 5,
//     marginTop: 10,
//     // borderColor: Color.LightGrey,
//     // borderBottomWidth: 1,
//   },
//   calenderView: {
//     marginTop: h(1),
//   },
// });

// const calenderTheme = {
//   'stylesheet.calendar.header': {
//     header: {
//       width: w(90),
//       height: h(20),
//       color: '#000000',
//       alignSelf: 'center',
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       backgroundColor: 'transparent',
//     },
//     week: {
//       width: '90%',
//       color: '#000000',
//       alignSelf: 'center',
//       flexDirection: 'row',
//       backgroundColor: 'transparent',
//       justifyContent: 'space-around',
//     },
//     textDayStyle: {
//       height: '20%',
//     },
//   },
//   arrowColor: '#C5C5C5',
//   indicatorColor: '#B01E06',
//   textDayFontWeight: '300',
//   textDayFontSize: '2%',
//   monthTextColor: '#000000',
//   textMonthFontWeight: 'bold',
//   textMonthFontSize: '3%',
//   textDayHeaderFontSize: '2%',
//   calendarBackground: 'transparent',
//   textDayHeaderFontWeight: '300',
//   textSectionTitleColor: '#000000',
// };

// export default Availability;
