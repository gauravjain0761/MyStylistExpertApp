import React, {FC, useEffect} from 'react';
import images from 'images';
import tw from 'rn-tailwind';
import moment from 'moment';
import globalStyle from 'globalStyles';
import useSubmitProposel from './hooks';
import {h} from '../../utils/dimentions';
import {MultiSelectPickerItems} from 'types';
import DatePicker from 'react-native-date-picker';
import {Platform, Pressable, Image as RnImage, View} from 'react-native';
import {Header, Container, Text, Image, TextInput, Button} from 'components';
import {MultiSelectPickerSheet, SubmitProposalSheet} from 'bottomSheets';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RootStackParamList} from '..';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {NativeToast} from '../../utils/toast';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SubmitProposal'>;
  route: RouteProp<RootStackParamList, 'SubmitProposal'>;
};

const SubmitProposal: FC<Props> = ({navigation, route}) => {
  const {jobId, jobTitle, userName, desireItems, start_date} = route.params;
  const {
    time,
    budget,
    timePicker,
    description,
    productItems,
    selectedProducts,
    submitProposalSheet,
    multiSelectBottomSheet,
    setTime,
    setBudget,
    setTimePicker,
    setDescription,
    getProductsItems,
    setSelectedProducts,
    showSubmitProposalSheet,
    setMultiSelectBottomSheet,
    submitProposal,
  } = useSubmitProposel();

  useEffect(() => {
    getProductsItems();
  }, []);

  return (
    <Container>
      <View style={globalStyle.container}>
        <Header
          title="Submit a Proposal"
          rightView={
            <View style={styles.headerRight}>
              <Pressable style={[styles.headerButton]}>
                <RnImage
                  tintColor={'#000000'}
                  resizeMode="contain"
                  style={styles.threeDotIcon}
                  source={images.ThreeDotsIcon}
                />
              </Pressable>
            </View>
          }
        />
        <View style={styles.mainView}>
          <KeyboardAwareScrollView
            extraScrollHeight={Platform.OS === 'ios' ? h(8) : 0}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}>
            <Text size="sm" fontWeight="800" margin="mt-4">
              {'The best time you can do the job'}
            </Text>
            <Pressable
              onPress={() => setTimePicker(true)}
              style={styles.timePicker}>
              <Image
                style={styles.watchIcon}
                resizeMode="contain"
                source={images.WatchIcon}
              />
              <Text size="sm" color="text-darkGrey" margin="ml-2">
                {moment(time).format('hh:mm A')}
              </Text>
            </Pressable>
            <DatePicker
              mode="time"
              modal={true}
              date={time || new Date()}
              open={timePicker}
              onConfirm={date => {
                setTime(date);
                setTimePicker(false);
              }}
              onCancel={() => {
                setTimePicker(false);
              }}
            />
            <Text size="sm" fontWeight="800" margin="mt-4">
              {'Set Budget of Offer'}
            </Text>
            <TextInput
              value={budget}
              maxLength={5}
              style={styles.timePicker}
              keyboardType="numeric"
              placeholder="Add Budget"
              onChangeText={(value: string) => {
                const newValue = value.replace(/\D/g, '');
                setBudget(newValue);
              }}
            />

            <Text size="sm" fontWeight="800" margin="mt-4">
              {'Add Products you will use'}
            </Text>
            <Pressable
              onPress={() => setMultiSelectBottomSheet(true)}
              style={styles.timePicker}>
              <Text size="sm" color="text-darkGrey">
                {'All services for this packages'}
              </Text>
              <RnImage
                tintColor={'#666666'}
                resizeMode="contain"
                source={images.DownArrow}
                style={styles.dowmArrow}
              />
            </Pressable>
            <View style={styles.serviceItemsView}>
              {selectedProducts?.map((data, index) => {
                return (
                  <View key={index} style={styles.servieItem}>
                    <Text size="sm" fontWeight="800">
                      {data.label}
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
            <Text size="sm" fontWeight="800" margin="mt-4">
              {'Write a cover letter'}
            </Text>
            <TextInput
              multiline
              blurOnSubmit
              value={description}
              returnKeyType="done"
              textAlignVertical="top"
              placeholder="Describe your cover letter..."
              style={[styles.input, {textAlignVertical: 'top'}]}
              onChangeText={(value: string) => setDescription(value)}
            />
          </KeyboardAwareScrollView>
        </View>
        <View style={styles.bottomView}>
          <Button
            onPress={() => {
              if (!budget) {
                NativeToast('Please add budget');
              } else if (!selectedProducts.length) {
                NativeToast('Please add products that you will use');
              } else if (!description) {
                NativeToast('Please write a cover letter');
              } else {
                showSubmitProposalSheet(true);
              }
            }}
            lable="Submit Post"
          />
        </View>
        {submitProposalSheet ? (
          <SubmitProposalSheet
            time={time}
            jobTitle={jobTitle}
            userName={userName}
            budget={budget}
            coverLetter={description}
            start_date={start_date}
            desireItems={desireItems}
            visibility={submitProposalSheet}
            setVisibility={showSubmitProposalSheet}
            submitProposal={() => submitProposal(jobId)}
          />
        ) : (
          <View />
        )}
        {multiSelectBottomSheet ? (
          <MultiSelectPickerSheet
            listData={productItems}
            selecteditems={selectedProducts}
            visibility={multiSelectBottomSheet}
            setVisibility={setMultiSelectBottomSheet}
            onSave={(products: Array<MultiSelectPickerItems>) => {
              setSelectedProducts(products);
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
  headerRight: tw`flex-1 w-full h-full flex-row items-center justify-end`,
  headerButton: tw`w-10 h-full items-end justify-center`,
  mainView: tw`flex-1 w-full h-full bg-cultured px-4`,
  threeDotIcon: tw`w-7 h-7`,
  timePicker: tw`w-full h-13 bg-transparent flex-row items-center border border-gray-300 rounded-lg mt-2 px-4`,
  watchIcon: tw`w-5 h-5`,
  serviceItemsView: tw`w-full flex-row flex-wrap`,
  servieItem: tw`h-10 rounded-full px-4 flex-row items-center bg-primary mr-4 mt-3`,
  crossIcon: tw`w-5 h-5 ml-3`,
  dowmArrow: tw`w-5 h-5 right-4 absolute`,
  input: tw`w-full h-25 rounded-lg border border-gray-300 bg-transparent mt-2`,
  bottomView: tw`w-full h-22 justify-center bg-cultured px-4`,
  scrollView: tw`pb-4`,
};

export default SubmitProposal;
