import React, {FC, useEffect, useState} from 'react';
import tw from 'rn-tailwind';
import images from 'images';
import moment from 'moment';
import {RootStackParamList} from '..';
import globalStyle from 'globalStyles';
import DatePicker from 'react-native-date-picker';
import {RouteProp} from '@react-navigation/native';
import {CreatePackageSheet, ServiceSheet} from 'bottomSheets';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Pressable,
  Image as RnImage,
  View,
  ScrollView,
  StyleSheet,
  Text,
  ImageBackground,
} from 'react-native';
import {
  Header,
  TextInput,
  Container,
  Button,
  Image,
  ImagePicker,
  DropDown,
  PrimaryButton,
} from 'components';
import useCreatePackage from './hooks';
import {NativeToast} from '../../utils/toast';
import {launchImageLibrary} from 'react-native-image-picker';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {
  commonFontStyle,
  fontFamily,
  hp,
  screen_height,
  screen_width,
  wp,
} from '../../utils/dimentions';
import Color from '../../../assets/color';
import {Purchase, offerData} from 'AppConstants';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreatePackage'>;
  route: RouteProp<RootStackParamList, 'CreatePackage'>;
};

const banner = [
  {
    id: 1,
    image: images?.packagebanner,
  },
  {
    id: 2,
    image: images?.packagebanner,
  },
  {
    id: 3,
    image: images?.packagebanner,
  },
];

const CreatePackage: FC<Props> = () => {
  const [createPackageSheet, setCreatePackageSheet] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const {
    endDate,
    startDate,
    price,
    discount,
    packageName,
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
    createExpertPackage,
    setPrice,
    setEndDate,
    setDiscount,
    setPackageName,
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
  } = useCreatePackage();

  useEffect(() => {
    getAllServicesForMobile().then(() => {
      setDiscount(offerData[0]?.discount);
      setPurchaseLimit(Purchase[0]?.purchase);
    });
  }, []);

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

  return (
    <Container>
      <View style={styles.container}>
        <Header title="Create Your Package" />
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
                  <Image source={item?.image} style={styles?.carousel_img} />
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
            <ImagePicker label="Package Image" onPress={onPressImageUpload} />
            <TextInput
              style={styles.input}
              placeholder="Enter here"
              label={'Package Name'}
              onChangeText={(t: string) => setPackageName(t)}
              containerStyle={styles.fildsContainerStyle}
            />
            <TextInput
              label={'Services'}
              style={[styles.input, {paddingHorizontal: 0}]}
              placeholder="Add services for this offer.."
              editable={false}
              value={''}
              containerStyle={styles.fildsContainerStyle}
              innerContainer={styles.inputinnercontainer}
              rightContent={
                <RnImage source={images?.DownArrow} style={styles.iconstyle} />
              }
              onPress={() => setServicesSheet(true)}
            />
            <View style={styles.serviesView}>
              {selectedServices?.map((data, index) => {
                return (
                  <ImageBackground
                    source={images?.badgebg}
                    key={index}
                    resizeMode="stretch"
                    style={[styles.serviceItem]}>
                    <Text style={styles.badgeTitle}>
                      {data?.service_name || ''}
                    </Text>
                    <RnImage
                      tintColor={'#000000'}
                      style={styles.crossIcon}
                      resizeMode="contain"
                      source={images.CrossIcon}
                    />
                  </ImageBackground>
                );
              })}
            </View>
            <TextInput
              label={'Sub Service'}
              style={[styles.input, {paddingHorizontal: 0}]}
              placeholder="Add sub services.."
              editable={false}
              value={''}
              containerStyle={styles.fildsContainerStyle}
              innerContainer={styles.inputinnercontainer}
              rightContent={
                <RnImage source={images?.DownArrow} style={styles.iconstyle} />
              }
              onPress={() => setSubServicesSheet(true)}
            />
            <View style={styles.serviesView}>
              {selectedSubServices?.map((data, index) => {
                return (
                  <ImageBackground
                    source={images?.badgebg}
                    key={index}
                    resizeMode="stretch"
                    style={[styles.serviceItem]}>
                    <Text style={styles.badgeTitle}>
                      {data?.service_name || '-'}
                    </Text>
                    <RnImage
                      tintColor={'#000000'}
                      style={styles.crossIcon}
                      resizeMode="contain"
                      source={images.CrossIcon}
                    />
                  </ImageBackground>
                );
              })}
            </View>
            <View style={styles?.discountContainer}>
              <DropDown
                data={offerData}
                placeholder="discount"
                label="Discount"
                labelField={'discount'}
                valueField={'discount'}
                value={discount}
                containerStyle={styles.containerStyle}
                onChange={(t: string) => {
                  setDiscount(t?.discount);
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
                    style={styles.dateiconstyle}
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
                    style={styles.dateiconstyle}
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
            label="Create Package"
            onPress={() => {
              if (!packageName) {
                NativeToast('Please enter offer name');
              } else if (!selectedServices.length) {
                NativeToast('Please select service for this offer');
              } else if (!selectedSubServices.length) {
                NativeToast('Please select sub service for this offer');
              } else if (!startDate) {
                NativeToast('Please select start date');
              } else if (!endDate) {
                NativeToast('Please select end date');
              } else if (!price) {
                NativeToast('Please add offer image');
              } else if (!selectedImage?.fileName) {
                NativeToast('Please add offer image');
              } else {
                setCreatePackageSheet(true);
              }
            }}
          />
        </View>
        {createPackageSheet ? (
          <CreatePackageSheet
            title={packageName}
            services={selectedServices}
            discount={discount}
            startDate={startDate}
            endDate={endDate}
            createExpertPackage={createExpertPackage}
            price={price}
            visibility={createPackageSheet}
            setVisibility={setCreatePackageSheet}
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
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: tw`flex-1 w-full h-full bg-cultured`,
  scrollView: tw`bg-white`,
  input: {
    flex: 1,
  },
  inputInfo: tw` h-24 bg-borderDarkGrey border border-stone-300`,
  serviesView: {
    ...tw`w-full flex-wrap flex-row`,
    gap: wp(11),
    marginTop: hp(17),
  },
  serviceItem: {
    paddingHorizontal: wp(11),
    paddingVertical: hp(9),
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(7),
  },
  crossIcon: {
    width: wp(16),
    height: wp(16),
  },
  downArrow: tw`w-5 h-5`,
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
  camera: tw`w-7 h-7`,
  carousel_container: {
    width: '100%',
    borderRadius: wp(12),
    overflow: 'hidden',
    backgroundColor: Color?.White,
    height: screen_height * 0.3,
    marginTop: 0,
  },
  carousel_img: {
    width: screen_width,
    height: screen_height * 0.3,
    resizeMode: 'cover',
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
  fildsContainerStyle: {
    marginTop: hp(35),
    flex: 1,
  },
  inputinnercontainer: {
    paddingHorizontal: hp(20),
  },
  iconstyle: {
    width: wp(16),
    height: wp(16),
    tintColor: Color?.Grey66,
  },
  badgeTitle: {
    ...commonFontStyle(fontFamily?.semi_bold, 13, Color?.Grey44),
    lineHeight: hp(20),
  },
  dateiconstyle: {
    width: wp(24),
    height: wp(24),
    tintColor: Color?.Grey66,
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
  infoinput: {
    height: hp(145),
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingVertical: hp(24),
  },
});

export default CreatePackage;

// import React, {FC, useEffect, useState} from 'react';
// import tw from 'rn-tailwind';
// import images from 'images';
// import moment from 'moment';
// import {RootStackParamList} from '..';
// import globalStyle from 'globalStyles';
// import DatePicker from 'react-native-date-picker';
// import {RouteProp} from '@react-navigation/native';
// import {CreatePackageSheet, ServiceSheet} from 'bottomSheets';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {Pressable, Image as RnImage, View, ScrollView} from 'react-native';
// import {Header, Text, TextInput, Container, Button, Image} from 'components';
// import useCreatePackage from './hooks';
// import {NativeToast} from '../../utils/toast';
// import {launchImageLibrary} from 'react-native-image-picker';

// type Props = {
//   navigation: NativeStackNavigationProp<RootStackParamList, 'CreatePackage'>;
//   route: RouteProp<RootStackParamList, 'CreatePackage'>;
// };

// const CreatePackage: FC<Props> = () => {
//   const [createPackageSheet, setCreatePackageSheet] = useState<boolean>(false);

//   const {
//     endDate,
//     startDate,
//     price,
//     discount,
//     packageName,
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
//     createExpertPackage,
//     setPrice,
//     setEndDate,
//     setDiscount,
//     setPackageName,
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
//   } = useCreatePackage();

//   useEffect(() => {
//     getAllServicesForMobile();
//   }, []);

//   return (
//     <Container>
//       <View style={styles.container}>
//         <Header title="Create Your Package" />
//         <ScrollView contentContainerStyle={styles.scrollView}>
//           <Text size={'sm'} fontWeight="700" margin="mt-5 mb-2">
//             {'Title For Package'}
//           </Text>
//           <TextInput
//             value={packageName}
//             style={styles.input}
//             placeholder="Add package title..."
//             onChangeText={(value: string) => {
//               setPackageName(value);
//             }}
//           />
//           <Text size={'sm'} fontWeight="700" margin="mt-5 mb-2">
//             {'Services For Package'}
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
//             {'Price'}
//           </Text>
//           <TextInput
//             maxLength={5}
//             value={price}
//             style={styles.input}
//             returnKeyType="done"
//             keyboardType={'numeric'}
//             placeholder="Set price for this package"
//             onChangeText={value => {
//               const newValue = value.replace(/\D/g, '');
//               setPrice(newValue);
//             }}
//           />
//           <Text size={'sm'} fontWeight="700" margin="mt-5 mb-2">
//             {'Discount on Package'}
//           </Text>
//           <TextInput
//             style={styles.input}
//             value={discount}
//             keyboardType={'numeric'}
//             returnKeyType="done"
//             maxLength={3}
//             placeholder="How much discount for clients on package..."
//             onChangeText={value => {
//               const newValue = value.replace(/\D/g, '');
//               if (parseInt(newValue) > 100) {
//                 NativeToast('Dicount should be less than of 100');
//               } else {
//                 setDiscount(newValue);
//               }
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
//             onChangeText={value => {
//               setAdditionalInfo(value);
//             }}
//             style={[styles.inputInfo, {textAlignVertical: 'top'}]}
//             placeholder={`Let us know any additional information\nfor the deal...`}
//           />
//         </ScrollView>
//         <View style={[styles.bottomView, globalStyle.bothContentCenter]}>
//           <Button
//             lable="Create Package"
//             labelFontWeight="700"
//             onPress={() => {
//               if (!packageName) {
//                 NativeToast('Please enter offer name');
//               } else if (!selectedServices.length) {
//                 NativeToast('Please select service for this offer');
//               } else if (!selectedSubServices.length) {
//                 NativeToast('Please select sub service for this offer');
//               } else if (!startDate) {
//                 NativeToast('Please select start date');
//               } else if (!endDate) {
//                 NativeToast('Please select end date');
//               } else if (!price) {
//                 NativeToast('Please add offer image');
//               } else if (!selectedImage?.fileName) {
//                 NativeToast('Please add offer image');
//               } else {
//                 setCreatePackageSheet(true);
//               }
//             }}
//           />
//         </View>
//         {createPackageSheet ? (
//           <CreatePackageSheet
//             title={packageName}
//             services={selectedServices}
//             discount={discount}
//             startDate={startDate}
//             endDate={endDate}
//             createExpertPackage={createExpertPackage}
//             price={price}
//             visibility={createPackageSheet}
//             setVisibility={setCreatePackageSheet}
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
//   input: tw`w-full h-13 rounded-lg bg-borderDarkGrey border border-stone-300 flex-row justify-between items-center pl-2 pr-4`,
//   inputInfo: tw` h-24 bg-borderDarkGrey border border-stone-300`,
//   serviesView: tw`w-full flex-wrap flex-row`,
//   serviceItem: tw`h-10 px-4 bg-primary flex-row rounded-full mr-3 mt-4`,
//   crossIcon: tw`w-5 h-5 ml-2`,
//   downArrow: tw`w-5 h-5`,
//   datePickerView: tw`flex-row mt-6 w-full justify-between gap-3`,
//   datePicker: tw`flex-1 w-full h-full`,
//   datePickerButtons: tw`items-start pl-4 bg- border bg-borderDarkGrey border-stone-300 w-full h-13 mt-3`,
//   purchaseLimit: tw`w-full h-13 px-2 rounded-lg flex-row bg-borderDarkGrey items-center mt-1`,
//   actionButtons: tw`w-9 h-9 rounded-lg bg-zinc-200 `,
//   actionIcon: tw`w-3.5 h-3.5`,
//   countTextView: tw`flex-1 w-full items-center`,
//   bottomView: tw`w-full h-25 px-4`,
//   camera: tw`w-7 h-7`,
// };

// export default CreatePackage;
