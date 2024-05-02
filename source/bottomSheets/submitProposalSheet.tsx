import React, {FC, Dispatch, SetStateAction, useEffect} from 'react';
import tw from 'rn-tailwind';
import {Button, Text} from 'components';
import {SURE_CREATE_PROPOSAL} from 'AppConstants';
import {Modal, StyleSheet, View} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {h} from '../utils/dimentions';
import {MultiSelectPickerItems} from 'types';
import moment from 'moment';
const cardsColor = {
  1: '#F7F5EB',
  2: '#CCF0FF',
  3: '#FFE1E4',
  4: '#F7E6E6',
};

interface Props {
  visibility: boolean;
  time: Date;
  budget: string;
  jobTitle: string;
  userName: string;
  start_date: string;
  end_date: string;
  coverLetter: string;
  desireItems: Array<string>;
  setVisibility: Dispatch<SetStateAction<boolean>>;
  submitProposal: () => void;
}

const SHEET_HEIGHT = h(60);

const SubmitProposalSheet: FC<Props> = ({
  time,
  jobTitle,
  userName,
  budget,
  desireItems,
  coverLetter,
  visibility,
  setVisibility,
  submitProposal,
}) => {
  const sDate = moment(time).format('ddd, DD MMM - hh:mm A');
  const translateY = useSharedValue(SHEET_HEIGHT);
  const opacity = useSharedValue(0);

  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const bottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  const toggleBottomSheet = (param: string) => {
    const translateTo = param === 'show' ? 0 : SHEET_HEIGHT;
    const opacityTo = param === 'show' ? 0.6 : 0;
    opacity.value = withTiming(opacityTo, {duration: 500});
    translateY.value = withTiming(translateTo, {duration: 500}, () => {
      if (param === 'hide') {
        runOnJS(setVisibility)(false);
      }
    });
  };

  useEffect(() => {
    toggleBottomSheet('show');
  }, []);

  return (
    <Modal
      visible={visibility}
      transparent={true}
      style={StyleSheet.absoluteFill}>
      <Animated.View style={[styles.overlay, overlayStyle]} />
      <View style={styles.container}>
        <Animated.View style={[styles.bottomSheet, bottomSheetStyle]}>
          <Text style={tw`text-center mt-5`} fontWeight="800" size="base">
            {SURE_CREATE_PROPOSAL}
          </Text>
          <View style={styles.sheetDetail}>
            <Text
              size="sm"
              color="text-darkGrey"
              fontWeight="700"
              margin="mt-5">
              {userName}
            </Text>
            <Text size="base" fontWeight="800" margin="mt-0.5">
              {jobTitle}
            </Text>
          </View>
          <View style={styles.line} />
          <View style={styles.itemsView}>
            <Text
              size="sm"
              fontWeight="700"
              color="text-darkGrey"
              margin="mt-0.5">
              {'Your Offer'}
            </Text>
            <View style={styles.budgetView}>
              <View style={styles.budgetWrapper}>
                <Text size="sm" color="text-darkGrey">
                  {'Proposed Budget'}
                </Text>
                <Text size="lg" margin="mt-1" fontWeight="800">
                  {`₹${budget}`}
                </Text>
              </View>
              <View style={styles.budgetWrapper}>
                <Text size="sm" color="text-darkGrey">
                  {'Proposed Time'}
                </Text>
                <Text size="lg" margin="mt-1" fontWeight="800">
                  {`${sDate}`}
                </Text>
              </View>
            </View>
            <Text
              size="sm"
              color="text-darkGrey"
              fontWeight="700"
              margin="mt-4">
              {'Products you will use'}
            </Text>
            <View style={styles.productsList}>
              {desireItems.map((data, index) => {
                const colorIndex = (index % 4) + 1;
                return (
                  <View
                    key={index}
                    style={[
                      styles.productsWrapper,
                      {backgroundColor: cardsColor[colorIndex]},
                    ]}>
                    <Text size="sm">{data}</Text>
                  </View>
                );
              })}
            </View>
            <Text
              size="sm"
              color="text-gray-400"
              fontWeight="700"
              margin="mt-4">
              {'Cover Letter'}
            </Text>
            <Text size="sm" color="text-gray-400" margin="mt-2">
              {coverLetter}
            </Text>
          </View>

          <View style={styles.buttonsView}>
            <Button
              lable="No"
              labelColor="text-englishVermillion"
              style={styles.noButton}
              onPress={() => {
                toggleBottomSheet('hide');
              }}
            />
            <Button
              lable="Yes"
              style={styles.yesButton}
              onPress={() => {
                toggleBottomSheet('hide');
                submitProposal();
              }}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = {
  overlay: tw`w-full h-full bg-black `,
  container: tw`absolute w-full h-full z-10 justify-end`,
  sheetDetail: tw`w-full`,
  bottomSheet: tw`w-full h-122 bg-white rounded-t-xl items-center px-4`,
  itemsView: tw`w-full`,
  line: tw`border-t border-gray-100 w-full mt-4 mb-2`,
  line1: tw`border-t border-gray-100 w-full mt-3 mb-2`,
  noButton: tw`flex-1 w-full h-13 bg-mistyRose border-lg`,
  yesButton: tw`flex-1 w-full h-13 bg-primary border-lg`,
  buttonsView: tw`w-full h-20 flex-row items-center justify-between gap-4`,
  budgetView: tw`flex-row w-full mt-2`,
  budgetWrapper: tw`mr-10`,
  productsList: tw`flex-row w-full flex-wrap`,
  productsWrapper: tw`h-10 px-4 justify-center rounded-full mr-3 mt-3 mb-1`,
};

export default SubmitProposalSheet;
