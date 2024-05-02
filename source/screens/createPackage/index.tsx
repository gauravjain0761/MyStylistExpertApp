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
import {Pressable, Image as RnImage, View, ScrollView} from 'react-native';
import {Header, Text, TextInput, Container, Button, Image} from 'components';
import useCreatePackage from './hooks';
import {NativeToast} from '../../utils/toast';
import {launchImageLibrary} from 'react-native-image-picker';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreatePackage'>;
  route: RouteProp<RootStackParamList, 'CreatePackage'>;
};

const CreatePackage: FC<Props> = () => {
  const [createPackageSheet, setCreatePackageSheet] = useState<boolean>(false);

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
    getAllServicesForMobile();
  }, []);

  return (
    <Container>
      <View style={styles.container}>
        <Header title="Create Your Package" />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text size={'sm'} fontWeight="700" margin="mt-5 mb-2">
            {'Title For Package'}
          </Text>
          <TextInput
            value={packageName}
            style={styles.input}
            placeholder="Add package title..."
            onChangeText={(value: string) => {
              setPackageName(value);
            }}
          />
          <Text size={'sm'} fontWeight="700" margin="mt-5 mb-2">
            {'Services For Package'}
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
            {'Price'}
          </Text>
          <TextInput
            maxLength={5}
            value={price}
            style={styles.input}
            returnKeyType="done"
            keyboardType={'numeric'}
            placeholder="Set price for this package"
            onChangeText={value => {
              const newValue = value.replace(/\D/g, '');
              setPrice(newValue);
            }}
          />
          <Text size={'sm'} fontWeight="700" margin="mt-5 mb-2">
            {'Discount on Package'}
          </Text>
          <TextInput
            style={styles.input}
            value={discount}
            keyboardType={'numeric'}
            returnKeyType="done"
            maxLength={3}
            placeholder="How much discount for clients on package..."
            onChangeText={value => {
              const newValue = value.replace(/\D/g, '');
              if (parseInt(newValue) > 100) {
                NativeToast('Dicount should be less than of 100');
              } else {
                setDiscount(newValue);
              }
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
            onChangeText={value => {
              setAdditionalInfo(value);
            }}
            style={[styles.inputInfo, {textAlignVertical: 'top'}]}
            placeholder={`Let us know any additional information\nfor the deal...`}
          />
        </ScrollView>
        <View style={[styles.bottomView, globalStyle.bothContentCenter]}>
          <Button
            lable="Create Package"
            labelFontWeight="700"
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

const styles = {
  container: tw`flex-1 w-full h-full bg-cultured`,
  scrollView: tw`px-4 bg-cultured`,
  input: tw`w-full h-13 rounded-lg bg-borderDarkGrey border border-stone-300 flex-row justify-between items-center pl-2 pr-4`,
  inputInfo: tw` h-24 bg-borderDarkGrey border border-stone-300`,
  serviesView: tw`w-full flex-wrap flex-row`,
  serviceItem: tw`h-10 px-4 bg-primary flex-row rounded-full mr-3 mt-4`,
  crossIcon: tw`w-5 h-5 ml-2`,
  downArrow: tw`w-5 h-5`,
  datePickerView: tw`flex-row mt-6 w-full justify-between gap-3`,
  datePicker: tw`flex-1 w-full h-full`,
  datePickerButtons: tw`items-start pl-4 bg- border bg-borderDarkGrey border-stone-300 w-full h-13 mt-3`,
  purchaseLimit: tw`w-full h-13 px-2 rounded-lg flex-row bg-borderDarkGrey items-center mt-1`,
  actionButtons: tw`w-9 h-9 rounded-lg bg-zinc-200 `,
  actionIcon: tw`w-3.5 h-3.5`,
  countTextView: tw`flex-1 w-full items-center`,
  bottomView: tw`w-full h-25 px-4`,
  camera: tw`w-7 h-7`,
};

export default CreatePackage;
