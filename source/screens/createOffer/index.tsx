import React, {FC, useEffect} from 'react';
import tw from 'rn-tailwind';
import images from 'images';
import moment from 'moment';
import {RootStackParamList} from '..';
import globalStyle from 'globalStyles';
import {CreateOfferSheet, ServiceSheet} from 'bottomSheets';
import DatePicker from 'react-native-date-picker';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Pressable, Image as RnImage, View, ScrollView} from 'react-native';
import {Header, Text, TextInput, Container, Button, Image} from 'components';
import useCreateOffer from './hooks';
import {Services} from 'types';
import {NativeToast} from '../../utils/toast';
import {launchImageLibrary} from 'react-native-image-picker';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreateOffer'>;
  route: RouteProp<RootStackParamList, 'CreateOffer'>;
};

const CreateOffer: FC<Props> = () => {
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
    createOffer,
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
  } = useCreateOffer();

  useEffect(() => {
    getAllServicesForMobile();
  }, []);

  return (
    <Container>
      <View style={styles.container}>
        <Header title="Create Your Offer" />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text size={'sm'} fontWeight="700" margin="mt-5 mb-2">
            {'Offer Name'}
          </Text>
          <TextInput
            value={offerName}
            returnKeyType="done"
            style={styles.input}
            onChangeText={value => {
              setOfferName(value);
            }}
            placeholder="Enter offer name..."
          />
          <Text size={'sm'} fontWeight="700" margin="mt-5 mb-2">
            {'Services'}
          </Text>
          <Pressable
            onPress={() => {
              setServicesSheet(true);
            }}
            style={styles.input}>
            <Text size="sm" color="text-darkGrey">
              {'Add services for this offer...'}
            </Text>
            <Image source={images.DownArrow} style={styles.downArrow} />
          </Pressable>
          <View style={styles.serviesView}>
            {selectedServices?.map((data, index) => {
              return (
                <View
                  key={index}
                  style={[styles.serviceItem, globalStyle.bothContentCenter]}>
                  <Text size="sm" fontWeight="600">
                    {data?.service_name || ''}
                  </Text>
                  <RnImage
                    tintColor={'#000000'}
                    style={styles.crossIcon}
                    resizeMode="contain"
                    source={images.CrossIcon}
                  />
                </View>
              );
            })}
          </View>
          {allSubServices?.length ? (
            <View>
              <Text size={'sm'} fontWeight="700" margin="mt-5 mb-2">
                {'Sub Services'}
              </Text>
              <Pressable
                onPress={() => {
                  setSubServicesSheet(true);
                }}
                style={styles.input}>
                <Text size="sm" color="text-darkGrey">
                  {'Add sub services...'}
                </Text>
                <Image source={images.DownArrow} style={styles.downArrow} />
              </Pressable>
            </View>
          ) : (
            <View />
          )}
          <View style={styles.serviesView}>
            {selectedSubServices?.map((data, index) => {
              return (
                <View
                  key={index}
                  style={[styles.serviceItem, globalStyle.bothContentCenter]}>
                  <Text size="sm" fontWeight="600">
                    {data?.service_name || '-'}
                  </Text>
                  <RnImage
                    tintColor={'#000000'}
                    style={styles.crossIcon}
                    resizeMode="contain"
                    source={images.CrossIcon}
                  />
                </View>
              );
            })}
          </View>
          <Text size={'sm'} fontWeight="700" margin="mt-5 mb-2">
            {'How much discount on this offer?'}
          </Text>
          <TextInput
            value={discount}
            keyboardType={'numeric'}
            returnKeyType="done"
            style={styles.input}
            maxLength={3}
            onChangeText={value => {
              const newValue = value.replace(/\D/g, '');
              if (parseInt(newValue) > 100) {
                NativeToast('Dicount should be less than of 100');
              } else {
                setDiscount(newValue);
              }
            }}
            placeholder="How much discount for clients on this offer..."
          />
          <Text size={'sm'} fontWeight="700" margin="mt-5 mb-2">
            {'After giving 10% discount you will get $150 on this Offer.?'}
          </Text>
          <View style={styles.datePickerView}>
            <View style={styles.datePicker}>
              <Text size="sm" fontWeight="700">
                Start Date
              </Text>
              <Button
                style={styles.datePickerButtons}
                onPress={() => setStartDatePicker(true)}
                lable={
                  startDate
                    ? moment(startDate).format('DD/MM/YYYY')
                    : 'DD/MM/YYYY'
                }
                labelColor="text-darkGrey"
              />
            </View>
            <View style={styles.datePicker}>
              <Text size="sm" fontWeight="700">
                End Date
              </Text>
              <Button
                style={styles.datePickerButtons}
                onPress={() => setEndDatePicker(true)}
                lable={
                  endDate ? moment(endDate).format('DD/MM/YYYY') : 'DD/MM/YYYY'
                }
                labelColor="text-darkGrey"
              />
            </View>
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
          <Text size={'sm'} fontWeight="700" margin="mt-5 mb-2">
            {'Set Purchase Limit'}
          </Text>
          <View style={styles.purchaseLimit}>
            <Pressable
              onPress={() => {
                if (purchaseLimit != 1) {
                  setPurchaseLimit(purchaseLimit - 1);
                }
              }}
              style={[styles.actionButtons, globalStyle.bothContentCenter]}>
              <Image
                resizeMode="contain"
                style={styles.actionIcon}
                source={images.MinusIcon}
              />
            </Pressable>
            <View style={styles.countTextView}>
              <Text size="sm" color="text-darkGrey">
                {purchaseLimit}
              </Text>
            </View>
            <Pressable
              onPress={() => {
                setPurchaseLimit(purchaseLimit + 1);
              }}
              style={[styles.actionButtons, globalStyle.bothContentCenter]}>
              <Image
                resizeMode="contain"
                style={styles.actionIcon}
                source={images.PlusIcon}
              />
            </Pressable>
          </View>
          <Text size={'sm'} fontWeight="700" margin="mt-5 mb-2">
            {'Offer Image'}
          </Text>
          <Pressable
            onPress={async () => {
              try {
                const result = await launchImageLibrary({
                  mediaType: 'photo',
                  selectionLimit: 1,
                });
                console.log(result.assets[0]);
                setSelectedImage(result.assets[0]);
              } catch (error) {}
            }}
            style={styles.input}>
            <Text numberOfLines={1} size="sm" color="text-darkGrey">
              {selectedImage?.fileName || 'Add image for this offer...'}
            </Text>
            <Image
              source={images.Camera}
              style={styles.camera}
              resizeMode="contain"
            />
          </Pressable>
          <Text size={'sm'} fontWeight="700" margin="mt-5 mb-2">
            {'Additional Information'}
          </Text>
          <TextInput
            multiline={true}
            value={additionalInfo}
            blurOnSubmit={true}
            returnKeyType="done"
            onChangeText={(value: string) => setAdditionalInfo(value)}
            style={[styles.inputInfo, {textAlignVertical: 'top'}]}
            placeholder={`Let us know any additional information\nfor the deal...`}
          />
        </ScrollView>
        <View style={[styles.bottomView, globalStyle.bothContentCenter]}>
          <Button
            lable="Create Offer"
            labelFontWeight="700"
            onPress={() => {
              if (!offerName) {
                NativeToast('Please enter offer name');
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
              } else {
                setCreateOfferSheet(true);
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
            onYesPress={createOffer}
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

const styles = {
  container: tw`flex-1 w-full h-full bg-cultured`,
  scrollView: tw`px-4 bg-cultured`,
  camera: tw`w-7 h-7`,
  input: tw`w-full flex-row h-13 rounded-lg bg-borderDarkGrey border border-stone-300 items-center pl-2 justify-between pr-4`,
  downArrow: tw`w-5 h-5`,
  inputInfo: tw` h-24 bg-borderDarkGrey border border-stone-300`,
  serviesView: tw`w-full flex-wrap flex-row`,
  serviceItem: tw`h-10 px-4 bg-primary flex-row rounded-full mr-3 mt-4`,
  crossIcon: tw`w-5 h-5 ml-2`,
  datePickerView: tw`flex-row mt-6 w-full justify-between gap-3`,
  datePicker: tw`flex-1 w-full h-full`,
  datePickerButtons: tw`items-start pl-4 bg- border bg-borderDarkGrey border-stone-300 w-full h-13 mt-3`,
  purchaseLimit: tw`w-full h-13 px-2 rounded-lg flex-row bg-borderDarkGrey items-center mt-1`,
  actionButtons: tw`w-9 h-9 rounded-lg bg-zinc-200 `,
  actionIcon: tw`w-3.5 h-3.5`,
  countTextView: tw`flex-1 w-full items-center`,
  bottomView: tw`w-full h-25 px-4`,
};

export default CreateOffer;
