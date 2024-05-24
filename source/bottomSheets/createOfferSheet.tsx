import React, {FC, Dispatch, SetStateAction, useEffect} from 'react';
import tw from 'rn-tailwind';
import {Button, Text} from 'components';
import {OFFER_NOT_EDITED, SURE_CREATE_OFFER} from 'AppConstants';
import {Modal, StyleSheet, View} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {h} from '../utils/dimentions';
import {Services} from 'types';
import moment from 'moment';

interface Props {
  visibility: boolean;
  discount: string;
  startDate: string;
  endDate: string;
  services: Array<Services>;
  onYesPress: () => void;
  setVisibility: Dispatch<SetStateAction<boolean>>;
}

const SHEET_HEIGHT = h(60);

const CreatePackageSheet: FC<Props> = ({
  visibility,
  setVisibility,
  services,
  discount,
  startDate,
  endDate,
  onYesPress,
}) => {
  const translateY = useSharedValue(SHEET_HEIGHT);
  const opacity = useSharedValue(0);
  const servicesNames = services.map(data => data.service_name);

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
            {SURE_CREATE_OFFER}
          </Text>
          <Text
            size="sm"
            fontWeight="600"
            style={tw`text-center mt-1 text-darkGrey`}>
            {OFFER_NOT_EDITED}
          </Text>
          <View style={styles.line} />

          <View style={styles.itemsView}>
            <Text size="sm" color="text-gray-400" fontWeight="700">
              Services:
            </Text>
            <Text numberOfLines={1} size="sm" fontWeight="800">
              {servicesNames}
            </Text>
          </View>
          <View style={styles.itemsView}>
            <Text size="sm" color="text-gray-400" fontWeight="700">
              Discount:
            </Text>
            <Text size="sm" fontWeight="800">
              {`${discount}%`}
            </Text>
          </View>
          <View style={styles.itemsView}>
            <Text size="sm" color="text-gray-400" fontWeight="700">
              Start Date:
            </Text>
            <Text size="sm" fontWeight="800">
              {moment(startDate).format('DD MMM, YYYY')}
            </Text>
          </View>
          <View style={styles.itemsView}>
            <Text size="sm" color="text-gray-400" fontWeight="700">
              End Date:
            </Text>
            <Text size="sm" fontWeight="800">
              {moment(endDate).format('DD MMM, YYYY')}
            </Text>
          </View>
          <View style={styles.line1} />
          <View style={styles.priceView}>
            <Text size="sm" color="text-gray-400" fontWeight="700">
              Total Price (USD):
            </Text>
            <Text size="sm" fontWeight="800">
              $34
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
                onYesPress();
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
  bottomSheet: tw`w-full h-117 bg-white rounded-t-xl items-center px-4`,
  itemsView: tw`flex-row w-full h-10 items-center justify-between`,
  priceView: tw`w-full h-15 flex-row items-center justify-between `,
  line: tw`border-t border-gray-100 w-full mt-7 mb-2`,
  line1: tw`border-t border-gray-100 w-full mt-3 mb-2`,
  noButton: tw`flex-1 w-full h-13 bg-mistyRose border-lg`,
  yesButton: tw`flex-1 w-full h-13 bg-primary border-lg`,
  buttonsView: tw`w-full h-20 flex-row items-center justify-between gap-4`,
};

export default CreatePackageSheet;
