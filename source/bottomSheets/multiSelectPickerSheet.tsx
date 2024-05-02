import React, {FC, Dispatch, SetStateAction, useEffect, useState} from 'react';
import tw from 'rn-tailwind';
import {h} from '../utils/dimentions';
import {Button, Image, Text} from 'components';
import {
  Modal,
  StyleSheet,
  Image as RNImage,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import Animated, {
  runOnJS,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import images from 'images';
import globalStyle from 'globalStyles';
import {MultiSelectPickerItems, Services} from 'types';

interface Props {
  listData: any;
  visibility: boolean;
  selecteditems: Array<MultiSelectPickerItems>;
  onSave: (items: Array<MultiSelectPickerItems>) => void;
  setVisibility: Dispatch<SetStateAction<boolean>>;
}

const SHEET_HEIGHT = h(60);

const MultiSelectPicker: FC<Props> = ({
  onSave,
  setVisibility,
  listData,
  visibility,
  selecteditems,
}) => {
  const [selectedItems, setSelectedItems] = useState<
    Array<MultiSelectPickerItems>
  >([]);
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

  const setItem = (item: MultiSelectPickerItems) => {
    const selectedItemsNew = selectedItems?.length ? [...selectedItems] : [];
    const checkIsExist: any = selectedItemsNew?.findIndex(
      data => data.value === item.value,
    );
    if (checkIsExist > -1) {
      selectedItemsNew.splice(checkIsExist, 1);
    } else {
      selectedItemsNew.push(item);
    }
    setSelectedItems(selectedItemsNew);
  };

  useEffect(() => {
    setSelectedItems(selecteditems);
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
            {'Add Products'}
          </Text>
          <View style={styles.line} />
          <View style={styles.listView}>
            <FlatList
              data={listData}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                console.log('item', item);
                const checkIsExist = selectedItems?.findIndex(
                  data => data.value === item.value,
                );
                return (
                  <Pressable
                    key={index}
                    onPress={() => setItem(item)}
                    style={styles.itemContainer}>
                    <Text style={tw`capitalize`} size={'base'}>
                      {item.label}
                    </Text>
                    <View
                      style={[styles.checkBox, globalStyle.bothContentCenter]}>
                      {checkIsExist > -1 ? (
                        <RNImage
                          tintColor={'#89E3DC'}
                          style={styles.tickIcon}
                          resizeMode="contain"
                          source={images.Check}
                        />
                      ) : (
                        <View />
                      )}
                    </View>
                  </Pressable>
                );
              }}
            />
          </View>
          <View style={styles.buttonsView}>
            <Button
              lable="Cancle"
              labelColor="text-englishVermillion"
              style={styles.noButton}
              onPress={() => {
                toggleBottomSheet('hide');
              }}
            />
            <Button
              lable="Save"
              style={styles.yesButton}
              onPress={() => {
                toggleBottomSheet('hide');
                onSave(selectedItems);
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
  line: tw`border-t border-gray-100 w-full mt-5 mb-2`,
  listView: tw`w-full flex-1 h-full`,
  noButton: tw`flex-1 w-full h-13 bg-mistyRose border-lg`,
  yesButton: tw`flex-1 w-full h-13 bg-primary border-lg`,
  buttonsView: tw`w-full h-20 flex-row items-center justify-between gap-4`,
  itemContainer: tw`w-full flex-row py-2 justify-between`,
  checkBox: tw`w-7 h-7 rounded-lg border border-primary`,
  tickIcon: tw`w-4 h-4`,
};

export default MultiSelectPicker;
