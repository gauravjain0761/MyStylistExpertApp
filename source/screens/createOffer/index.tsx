import React, {FC, useContext, useEffect, useState} from 'react';
import tw from 'rn-tailwind';
import images from 'images';
import moment from 'moment';
import {RootStackParamList} from '..';
import globalStyle from 'globalStyles';
import {CreateOfferSheet, OrderplaceSheet, ServiceSheet} from 'bottomSheets';
import DatePicker from 'react-native-date-picker';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Pressable,
  Image as RnImage,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Header,
  Text,
  TextInput,
  Container,
  Button,
  Image,
  DropDown,
  ImagePicker,
  PrimaryButton,
} from 'components';
import useCreateOffer from './hooks';
import {Services} from 'types';
import {NativeToast} from '../../utils/toast';
import {launchImageLibrary} from 'react-native-image-picker';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {hp, screen_height, screen_width, wp} from '../../utils/dimentions';
import Color from '../../../assets/color';
import {Purchase, offerData} from 'AppConstants';
import {useAppDispatch, useAppSelector} from 'store';
import FastImage from 'react-native-fast-image';
import {appConfig} from '../../../config';
import {AppContext} from 'context';
import {generateOffer} from '../../Actions/offersAction';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreateOffer'>;
  route: RouteProp<RootStackParamList, 'CreateOffer'>;
};

const CreateOffer: FC<Props> = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {bannerImage} = useAppSelector(state => state?.home);
  const {userinfo} = useAppSelector(state => state?.common);
  const [banner, setBanner] = useState(bannerImage);
  const [selecteServices, setSelecteServices] = useState([]);
  const [subService, setSubService] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectDiscount, setSelectDiscount] = useState([]);
  const [orderPlaceSheet, setOrderPlaceSheet] = useState(false);
  const {IMG_URL} = appConfig;
  const {userDetails} = useContext(AppContext);
  const {state, district, city} = userinfo?.user || {};
  const {_id} = userDetails;
  const {
    endDate,
    startDate,
    discount,
    offerName,
    allServices,
    servicesSheet,
    purchaseLimit,
    endDatePicker,
    selectedServices,
    selectedImage,
    startDatePicker,
    createOfferSheet,
    allSubServices,
    subServicesSheet,
    additionalInfo,
    selectedSubServices,
    setEndDate,
    setDiscount,
    setOfferName,
    setStartDate,
    getSubServices,
    setSelectedImage,
    setAdditionalInfo,
    setPurchaseLimit,
    setEndDatePicker,
    setServicesSheet,
    setStartDatePicker,
    setCreateOfferSheet,
    setSelectedServices,
    setSubServicesSheet,
    setSelectedSubServices,
    getAllServicesForMobile,
    setLoading,
  } = useCreateOffer();

  useEffect(() => {
    getAllServicesForMobile().then(() => {
      setDiscount(offerData[0]?.value);
      setPurchaseLimit(Purchase[0]?.purchase);
      setSelectDiscount(offerData[0]?.discount);
    });
  }, []);

  const dispatch = useAppDispatch();
  const {goBack} = useNavigation();

  const createOffer = async () => {
    setLoading(true);
    try {
      const services = {};
      selectedServices.forEach(service => {
        const {service_name, _id} = service;
        const item = {
          service_id: _id,
          service_name: service_name,
        };
        Object.assign(services, item);
      });
      const subServices = {};
      selectedSubServices.forEach(element => {
        const obj = {
          sub_service_id: element.sub_service_id,
          price: element?.price,
        };
        Object.assign(subServices, obj);
      });

      const sNamwe = JSON.stringify(services);
      const subservice = JSON.stringify(subServices);
      const sDate = moment(startDate).format('DD-MM-YYYY');
      const eDate = moment(endDate).format('DD-MM-YYYY');

      const body = new FormData();
      body.append('expert_id', _id);
      body.append('offer_name', offerName);
      body.append('service', sNamwe);
      body.append('number_of_offers', purchaseLimit);
      body.append('start_date', sDate);
      body.append('end_date', eDate);
      body.append('additional_information', additionalInfo);
      body.append('status', 'Active');
      body.append('discount', discount);
      body.append('featured_image', {
        uri: selectedImage?.uri,
        name: selectedImage?.fileName,
        type: selectedImage?.type,
      });
      body.append('state', JSON.stringify(state));
      body.append('city', JSON.stringify(city));
      body.append('district', JSON.stringify(district));
      body.append('sub_services', subservice);

      let obj = {
        data: body,
        onSuccess: (res: any) => {
          setLoading(false);
          NativeToast('Offer Created Successfully');
          goBack();
        },
        onFailure: (Err: any) => {
          setLoading(false);
          NativeToast(Err?.data?.message || 'Something went wrong');
        },
      };
      dispatch(generateOffer(obj));
    } catch (error) {
      console.log('error of create offer', error);
    } finally {
    }
  };

  const onSnapToItem = (index: React.SetStateAction<number>) => {
    setActiveIndex(index);
  };

  const onPressImageUpload = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });
      console.log(result.assets[0]);
      setSelectedImage(result.assets[0]);
    } catch (error) {}
  };

  const removeimage = () => {
    setSelectedImage([]);
  };

  return (
    <Container>
      <View style={styles.container}>
        <Header title="Create Your Offer" />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.carousel_container}>
            <Carousel
              layout={'default'}
              data={banner}
              sliderWidth={screen_width}
              itemWidth={screen_width}
              inactiveSlideScale={2}
              renderItem={({item}: any) => {
                return (
                  <FastImage
                    source={{
                      uri: `${IMG_URL}/${item?.fileName}`,
                      priority: FastImage.priority.high,
                    }}
                    style={styles?.carousel_img}
                    resizeMode="stretch"
                  />
                );
              }}
              onSnapToItem={onSnapToItem}
            />
          </View>
          <Pagination
            // @ts-ignore
            dotsLength={banner?.length}
            activeDotIndex={activeIndex}
            containerStyle={styles?.pagination_container}
            dotStyle={styles?.dotStyle}
            inactiveDotStyle={styles?.inactiveDotStyle}
            inactiveDotScale={1}
            dotContainerStyle={styles?.dotContainerStyle}
          />
          <View style={styles.innercontainer}>
            <ImagePicker label="Offer Image" onPress={onPressImageUpload} />
            {!!selectedImage && Object.values(selectedImage).length > 0 && (
              <View style={styles?.selectimagecontainer}>
                <Image
                  source={{uri: selectedImage?.uri}}
                  style={styles?.selectedimage}
                  resizeMode="stretch"
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: 'yellow',
                    position: 'absolute',
                    top: hp(10),
                    right: wp(40),
                  }}
                  onPress={removeimage}>
                  <Image source={images?.trash} style={styles.trash} />
                </TouchableOpacity>
              </View>
            )}
            <TextInput
              style={styles.input}
              placeholder="Enter here"
              label={'Offer Name'}
              onChangeText={(t: string) => setOfferName(t)}
              containerStyle={styles.fildsContainerStyle}
            />
            <DropDown
              label="Services"
              data={allServices || []}
              placeholder="Select service"
              labelField={'service_name'}
              valueField={'service_name'}
              value={selecteServices}
              onChange={(t: any) => {
                setSelectedServices([t]);
                setSelecteServices(t.service_name);
                getSubServices([t]);
              }}
              containerStyle={styles.fildsContainerStyle}
            />
            <DropDown
              label="Sub Service"
              data={allSubServices || []}
              placeholder="Select sub service"
              labelField={'service_name'}
              valueField={'service_name'}
              value={subService}
              onChange={(t: any) => {
                setSubService(t.service_name);
                setSelectedSubServices([t]);
              }}
              containerStyle={styles.fildsContainerStyle}
            />
            <View style={styles?.discountContainer}>
              <DropDown
                data={offerData}
                placeholder="discount"
                label="Discount"
                labelField={'discount'}
                valueField={'discount'}
                value={selectDiscount}
                containerStyle={styles.containerStyle}
                onChange={(t: string) => {
                  setSelectDiscount(t?.discount);
                  setDiscount(t?.value);
                }}
                DropDownStyle={styles.dropDownStyle}
              />
              <DropDown
                data={Purchase}
                placeholder="purchase"
                label="Purchase Limit"
                labelField={'purchase'}
                valueField={'purchase'}
                value={purchaseLimit}
                containerStyle={styles.containerStyle}
                DropDownStyle={styles.dropDownStyle}
                onChange={(t: number) => {
                  setPurchaseLimit(t?.purchase);
                }}
              />
            </View>
            <View style={styles.datePickerView}>
              <TextInput
                label={'Start Date'}
                style={[styles.input, {paddingHorizontal: 0}]}
                placeholder="DD/MM/YYYY"
                editable={false}
                value={
                  startDate
                    ? moment(startDate).format('DD/MM/YYYY')
                    : 'DD/MM/YYYY'
                }
                containerStyle={styles.fildsContainerStyle}
                innerContainer={styles.inputinnercontainer}
                rightContent={
                  <RnImage
                    source={images?.datepicker}
                    style={styles.iconstyle}
                  />
                }
                onPress={() => setStartDatePicker(true)}
              />
              <TextInput
                label={'End Date'}
                style={[styles.input, {paddingHorizontal: 0}]}
                placeholder="DD/MM/YYYY"
                editable={false}
                value={
                  endDate ? moment(endDate).format('DD/MM/YYYY') : 'DD/MM/YYYY'
                }
                containerStyle={styles.fildsContainerStyle}
                innerContainer={styles.inputinnercontainer}
                rightContent={
                  <RnImage
                    source={images?.datepicker}
                    style={styles.iconstyle}
                  />
                }
                onPress={() => setEndDatePicker(true)}
              />
            </View>
            <DatePicker
              mode="date"
              modal={true}
              date={startDate || new Date()}
              open={startDatePicker}
              onConfirm={date => {
                setEndDate('');
                setStartDate(date);
                setStartDatePicker(false);
              }}
              onCancel={() => {
                setStartDatePicker(false);
              }}
            />
            <DatePicker
              mode="date"
              modal={true}
              minimumDate={startDate || new Date()}
              date={endDate || new Date()}
              open={endDatePicker}
              onConfirm={date => {
                setEndDate(date);
                setEndDatePicker(false);
              }}
              onCancel={() => {
                setEndDatePicker(false);
              }}
            />
            <TextInput
              value={additionalInfo}
              multiline={true}
              textAlignVertical={'top'}
              label={'Additional Information'}
              placeholder="Let us know any additional information for the deal..."
              style={styles.infoinput}
              onChangeText={(t: string) => setAdditionalInfo(t)}
            />
          </View>
        </ScrollView>
        <View style={[styles.bottomView, globalStyle.bothContentCenter]}>
          <PrimaryButton
            label="Create Offer"
            onPress={() => {
              console.log('okkkkkk', selectedServices);
              // setVisible(!visible);
              if (!offerName) {
                NativeToast('Please enter offer name');
              } else if (!!selectedImage?.fileName == false) {
                NativeToast('Please add offer image');
              } else if (!selectedServices.length) {
                NativeToast('Please select service for this offer');
              } else if (!selectedSubServices.length) {
                NativeToast('Please select sub service for this offer');
              } else if (!startDate) {
                NativeToast('Please select start date');
              } else if (!endDate) {
                NativeToast('Please select end date');
              } else if (!selectedImage?.fileName) {
                NativeToast('Please add offer image');
              } else if (!additionalInfo) {
                NativeToast('Please add additional info');
              } else {
                setCreateOfferSheet(true);
                console.log('okkkkk');
              }
            }}
          />
        </View>
        {createOfferSheet ? (
          <CreateOfferSheet
            endDate={endDate}
            startDate={startDate}
            discount={discount}
            services={selectedServices}
            visibility={createOfferSheet}
            setVisibility={setCreateOfferSheet}
            onYesPress={() => setOrderPlaceSheet(!orderPlaceSheet)}
            subService={selectedSubServices}
          />
        ) : (
          <View />
        )}
        {servicesSheet ? (
          <ServiceSheet
            listData={allServices}
            visibility={servicesSheet}
            selectedServices={selectedServices}
            setVisibility={setServicesSheet}
            onSave={(items: Array<Services>) => {
              setSelectedServices(items);
              getSubServices(items);
            }}
          />
        ) : (
          <View />
        )}
        {subServicesSheet ? (
          <ServiceSheet
            listData={allSubServices}
            visibility={subServicesSheet}
            selectedServices={selectedSubServices}
            setVisibility={setSubServicesSheet}
            onSave={(items: Array<Services>) => {
              setSelectedSubServices(items);
            }}
          />
        ) : (
          <View />
        )}
        <OrderplaceSheet
          visibility={orderPlaceSheet}
          setVisibility={setOrderPlaceSheet}
          onSuccess={() => createOffer()}
          onPressCancel={() => setOrderPlaceSheet(!orderPlaceSheet)}
          title="Creating your Packages"
          discription="We need access to your location to show you relevant Stylists, Offers and Packages"
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: tw`flex-1 w-full h-full bg-cultured`,
  scrollView: tw`bg-white`,
  camera: tw`w-7 h-7`,
  input: {
    flex: 1,
  },
  downArrow: {
    width: wp(16),
    height: wp(16),
    marginRight: wp(20),
    tintColor: Color?.Grey66,
  },
  inputInfo: tw` h-24 bg-borderDarkGrey border border-stone-300`,
  serviesView: tw`w-full flex-wrap flex-row`,
  serviceItem: tw`h-10 px-4 bg-primary flex-row rounded-full mr-3 mt-4`,
  crossIcon: tw`w-5 h-5 ml-2`,
  datePickerView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(16),
  },
  datePicker: tw`flex-1 w-full h-full`,
  datePickerButtons: tw`items-start pl-4 bg- border bg-borderDarkGrey border-stone-300 w-full h-13 mt-3`,
  purchaseLimit: tw`w-full h-13 px-2 rounded-lg flex-row bg-borderDarkGrey items-center mt-1`,
  actionButtons: tw`w-9 h-9 rounded-lg bg-zinc-200 `,
  actionIcon: tw`w-3.5 h-3.5`,
  countTextView: tw`flex-1 w-full items-center`,
  bottomView: {
    backgroundColor: Color?.White,
    paddingTop: hp(21),
    paddingBottom: hp(26),
    paddingHorizontal: wp(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  carousel_container: {
    width: '100%',
    borderRadius: wp(12),
    overflow: 'hidden',
    backgroundColor: Color?.White,
    height: hp(256),
    marginTop: 0,
  },
  carousel_img: {
    width: '100%',
    height: hp(257),
  },
  pagination_container: {
    justifyContent: 'center',
    alignSelf: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: hp(13),
  },
  dotContainerStyle: {
    margin: 0,
    marginHorizontal: wp(4),
  },
  inactiveDotStyle: {
    backgroundColor: Color?.GreyD9,
  },
  dotStyle: {
    width: wp(6),
    height: wp(6),
    borderRadius: 5,
    backgroundColor: Color?.Grey7A,
  },
  innercontainer: {
    ...tw`px-4`,
    marginBottom: hp(29),
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: wp(16),
  },
  containerStyle: {
    flex: 1,
  },
  dropDownStyle: {
    paddingRight: wp(8),
  },
  fildsContainerStyle: {
    marginTop: hp(35),
    flex: 1,
  },
  iconstyle: {
    width: wp(24),
    height: wp(24),
    tintColor: Color?.Grey66,
  },
  inputinnercontainer: {
    paddingRight: wp(10),
    justifyContent: 'space-between',
    flex: 1,
    paddingLeft: hp(18),
  },
  infoinput: {
    height: hp(145),
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingVertical: hp(24),
  },
  selectimagecontainer: {
    width: '100%',
    height: 'auto',
    marginTop: hp(25),
    borderRadius: wp(8),
    overflow: 'hidden',
  },
  selectedimage: {
    width: '100%',
    height: hp(200),
    borderRadius: wp(8),
  },
  trash: {
    width: wp(30),
    height: wp(30),
    position: 'absolute',
  },
});

export default CreateOffer;

// import React, {FC, useEffect} from 'react';
// import tw from 'rn-tailwind';
// import images from 'images';
// import moment from 'moment';
// import {RootStackParamList} from '..';
// import globalStyle from 'globalStyles';
// import {CreateOfferSheet, ServiceSheet} from 'bottomSheets';
// import DatePicker from 'react-native-date-picker';
// import {RouteProp} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {Pressable, Image as RnImage, View, ScrollView} from 'react-native';
// import {Header, Text, TextInput, Container, Button, Image} from 'components';
// import useCreateOffer from './hooks';
// import {Services} from 'types';
// import {NativeToast} from '../../utils/toast';
// import {launchImageLibrary} from 'react-native-image-picker';

// type Props = {
//   navigation: NativeStackNavigationProp<RootStackParamList, 'CreateOffer'>;
//   route: RouteProp<RootStackParamList, 'CreateOffer'>;
// };

// const CreateOffer: FC<Props> = () => {
//   const {
//     endDate,
//     startDate,
//     discount,
//     offerName,
//     allServices,
//     servicesSheet,
//     purchaseLimit,
//     endDatePicker,
//     selectedServices,
//     selectedImage,
//     startDatePicker,
//     createOfferSheet,
//     allSubServices,
//     subServicesSheet,
//     additionalInfo,
//     selectedSubServices,
//     createOffer,
//     setEndDate,
//     setDiscount,
//     setOfferName,
//     setStartDate,
//     getSubServices,
//     setSelectedImage,
//     setAdditionalInfo,
//     setPurchaseLimit,
//     setEndDatePicker,
//     setServicesSheet,
//     setStartDatePicker,
//     setCreateOfferSheet,
//     setSelectedServices,
//     setSubServicesSheet,
//     setSelectedSubServices,
//     getAllServicesForMobile,
//   } = useCreateOffer();

//   useEffect(() => {
//     getAllServicesForMobile();
//   }, []);

//   return (
//     <Container>
//       <View style={styles.container}>
//         <Header title="Create Your Offer" />
//         <ScrollView contentContainerStyle={styles.scrollView}>
//           <Text size={'sm'} fontWeight="700" margin="mt-5 mb-2">
//             {'Offer Name'}
//           </Text>
//           <TextInput
//             value={offerName}
//             returnKeyType="done"
//             style={styles.input}
//             onChangeText={value => {
//               setOfferName(value);
//             }}
//             placeholder="Enter offer name..."
//           />
//           <Text size={'sm'} fontWeight="700" margin="mt-5 mb-2">
//             {'Services'}
//           </Text>
//           <Pressable
//             onPress={() => {
//               setServicesSheet(true);
//             }}
//             style={styles.input}>
//             <Text size="sm" color="text-darkGrey">
//               {'Add services for this offer...'}
//             </Text>
//             <Image source={images.DownArrow} style={styles.downArrow} />
//           </Pressable>
//           <View style={styles.serviesView}>
//             {selectedServices?.map((data, index) => {
//               return (
//                 <View
//                   key={index}
//                   style={[styles.serviceItem, globalStyle.bothContentCenter]}>
//                   <Text size="sm" fontWeight="600">
//                     {data?.service_name || ''}
//                   </Text>
//                   <RnImage
//                     tintColor={'#000000'}
//                     style={styles.crossIcon}
//                     resizeMode="contain"
//                     source={images.CrossIcon}
//                   />
//                 </View>
//               );
//             })}
//           </View>
//           {allSubServices?.length ? (
//             <View>
//               <Text size={'sm'} fontWeight="700" margin="mt-5 mb-2">
//                 {'Sub Services'}
//               </Text>
//               <Pressable
//                 onPress={() => {
//                   setSubServicesSheet(true);
//                 }}
//                 style={styles.input}>
//                 <Text size="sm" color="text-darkGrey">
//                   {'Add sub services...'}
//                 </Text>
//                 <Image source={images.DownArrow} style={styles.downArrow} />
//               </Pressable>
//             </View>
//           ) : (
//             <View />
//           )}
//           <View style={styles.serviesView}>
//             {selectedSubServices?.map((data, index) => {
//               return (
//                 <View
//                   key={index}
//                   style={[styles.serviceItem, globalStyle.bothContentCenter]}>
//                   <Text size="sm" fontWeight="600">
//                     {data?.service_name || '-'}
//                   </Text>
//                   <RnImage
//                     tintColor={'#000000'}
//                     style={styles.crossIcon}
//                     resizeMode="contain"
//                     source={images.CrossIcon}
//                   />
//                 </View>
//               );
//             })}
//           </View>
//           <Text size={'sm'} fontWeight="700" margin="mt-5 mb-2">
//             {'How much discount on this offer?'}
//           </Text>
//           <TextInput
//             value={discount}
//             keyboardType={'numeric'}
//             returnKeyType="done"
//             style={styles.input}
//             maxLength={3}
//             onChangeText={value => {
//               const newValue = value.replace(/\D/g, '');
//               if (parseInt(newValue) > 100) {
//                 NativeToast('Dicount should be less than of 100');
//               } else {
//                 setDiscount(newValue);
//               }
//             }}
//             placeholder="How much discount for clients on this offer..."
//           />
//           <Text size={'sm'} fontWeight="700" margin="mt-5 mb-2">
//             {'After giving 10% discount you will get $150 on this Offer.?'}
//           </Text>
//           <View style={styles.datePickerView}>
//             <View style={styles.datePicker}>
//               <Text size="sm" fontWeight="700">
//                 Start Date
//               </Text>
//               <Button
//                 style={styles.datePickerButtons}
//                 onPress={() => setStartDatePicker(true)}
//                 lable={
//                   startDate
//                     ? moment(startDate).format('DD/MM/YYYY')
//                     : 'DD/MM/YYYY'
//                 }
//                 labelColor="text-darkGrey"
//               />
//             </View>
//             <View style={styles.datePicker}>
//               <Text size="sm" fontWeight="700">
//                 End Date
//               </Text>
//               <Button
//                 style={styles.datePickerButtons}
//                 onPress={() => setEndDatePicker(true)}
//                 lable={
//                   endDate ? moment(endDate).format('DD/MM/YYYY') : 'DD/MM/YYYY'
//                 }
//                 labelColor="text-darkGrey"
//               />
//             </View>
//           </View>
//           <DatePicker
//             mode="date"
//             modal={true}
//             date={startDate || new Date()}
//             open={startDatePicker}
//             onConfirm={date => {
//               setEndDate('');
//               setStartDate(date);
//               setStartDatePicker(false);
//             }}
//             onCancel={() => {
//               setStartDatePicker(false);
//             }}
//           />
//           <DatePicker
//             mode="date"
//             modal={true}
//             minimumDate={startDate || new Date()}
//             date={endDate || new Date()}
//             open={endDatePicker}
//             onConfirm={date => {
//               setEndDate(date);
//               setEndDatePicker(false);
//             }}
//             onCancel={() => {
//               setEndDatePicker(false);
//             }}
//           />
//           <Text size={'sm'} fontWeight="700" margin="mt-5 mb-2">
//             {'Set Purchase Limit'}
//           </Text>
//           <View style={styles.purchaseLimit}>
//             <Pressable
//               onPress={() => {
//                 if (purchaseLimit != 1) {
//                   setPurchaseLimit(purchaseLimit - 1);
//                 }
//               }}
//               style={[styles.actionButtons, globalStyle.bothContentCenter]}>
//               <Image
//                 resizeMode="contain"
//                 style={styles.actionIcon}
//                 source={images.MinusIcon}
//               />
//             </Pressable>
//             <View style={styles.countTextView}>
//               <Text size="sm" color="text-darkGrey">
//                 {purchaseLimit}
//               </Text>
//             </View>
//             <Pressable
//               onPress={() => {
//                 setPurchaseLimit(purchaseLimit + 1);
//               }}
//               style={[styles.actionButtons, globalStyle.bothContentCenter]}>
//               <Image
//                 resizeMode="contain"
//                 style={styles.actionIcon}
//                 source={images.PlusIcon}
//               />
//             </Pressable>
//           </View>
//           <Text size={'sm'} fontWeight="700" margin="mt-5 mb-2">
//             {'Offer Image'}
//           </Text>
//           <Pressable
//             onPress={async () => {
//               try {
//                 const result = await launchImageLibrary({
//                   mediaType: 'photo',
//                   selectionLimit: 1,
//                 });
//                 console.log(result.assets[0]);
//                 setSelectedImage(result.assets[0]);
//               } catch (error) {}
//             }}
//             style={styles.input}>
//             <Text numberOfLines={1} size="sm" color="text-darkGrey">
//               {selectedImage?.fileName || 'Add image for this offer...'}
//             </Text>
//             <Image
//               source={images.Camera}
//               style={styles.camera}
//               resizeMode="contain"
//             />
//           </Pressable>
//           <Text size={'sm'} fontWeight="700" margin="mt-5 mb-2">
//             {'Additional Information'}
//           </Text>
//           <TextInput
//             multiline={true}
//             value={additionalInfo}
//             blurOnSubmit={true}
//             returnKeyType="done"
//             onChangeText={(value: string) => setAdditionalInfo(value)}
//             style={[styles.inputInfo, {textAlignVertical: 'top'}]}
//             placeholder={`Let us know any additional information\nfor the deal...`}
//           />
//         </ScrollView>
//         <View style={[styles.bottomView, globalStyle.bothContentCenter]}>
//           <Button
//             lable="Create Offer"
//             labelFontWeight="700"
//             onPress={() => {
//               if (!offerName) {
//                 NativeToast('Please enter offer name');
//               } else if (!selectedServices.length) {
//                 NativeToast('Please select service for this offer');
//               } else if (!selectedSubServices.length) {
//                 NativeToast('Please select sub service for this offer');
//               } else if (!startDate) {
//                 NativeToast('Please select start date');
//               } else if (!endDate) {
//                 NativeToast('Please select end date');
//               } else if (!selectedImage?.fileName) {
//                 NativeToast('Please add offer image');
//               } else {
//                 setCreateOfferSheet(true);
//               }
//             }}
//           />
//         </View>
//         {createOfferSheet ? (
//           <CreateOfferSheet
//             endDate={endDate}
//             startDate={startDate}
//             discount={discount}
//             services={selectedServices}
//             visibility={createOfferSheet}
//             setVisibility={setCreateOfferSheet}
//             onYesPress={createOffer}
//           />
//         ) : (
//           <View />
//         )}
//         {servicesSheet ? (
//           <ServiceSheet
//             listData={allServices}
//             visibility={servicesSheet}
//             selectedServices={selectedServices}
//             setVisibility={setServicesSheet}
//             onSave={(items: Array<Services>) => {
//               setSelectedServices(items);
//               getSubServices(items);
//             }}
//           />
//         ) : (
//           <View />
//         )}
//         {subServicesSheet ? (
//           <ServiceSheet
//             listData={allSubServices}
//             visibility={subServicesSheet}
//             selectedServices={selectedSubServices}
//             setVisibility={setSubServicesSheet}
//             onSave={(items: Array<Services>) => {
//               setSelectedSubServices(items);
//             }}
//           />
//         ) : (
//           <View />
//         )}
//       </View>
//     </Container>
//   );
// };

// const styles = {
//   container: tw`flex-1 w-full h-full bg-cultured`,
//   scrollView: tw`px-4 bg-cultured`,
//   camera: tw`w-7 h-7`,
//   input: tw`w-full flex-row h-13 rounded-lg bg-borderDarkGrey border border-stone-300 items-center pl-2 justify-between pr-4`,
//   downArrow: tw`w-5 h-5`,
//   inputInfo: tw` h-24 bg-borderDarkGrey border border-stone-300`,
//   serviesView: tw`w-full flex-wrap flex-row`,
//   serviceItem: tw`h-10 px-4 bg-primary flex-row rounded-full mr-3 mt-4`,
//   crossIcon: tw`w-5 h-5 ml-2`,
//   datePickerView: tw`flex-row mt-6 w-full justify-between gap-3`,
//   datePicker: tw`flex-1 w-full h-full`,
//   datePickerButtons: tw`items-start pl-4 bg- border bg-borderDarkGrey border-stone-300 w-full h-13 mt-3`,
//   purchaseLimit: tw`w-full h-13 px-2 rounded-lg flex-row bg-borderDarkGrey items-center mt-1`,
//   actionButtons: tw`w-9 h-9 rounded-lg bg-zinc-200 `,
//   actionIcon: tw`w-3.5 h-3.5`,
//   countTextView: tw`flex-1 w-full items-center`,
//   bottomView: tw`w-full h-25 px-4`,
// };

// export default CreateOffer;
