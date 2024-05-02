import React, {FC, Dispatch, SetStateAction, useEffect} from 'react';
import images from 'images';
import tw from 'rn-tailwind';
import globalStyle from 'globalStyles';
import {h} from '../utils/dimentions';
import {Image, Text, TextInput} from 'components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  View,
  Platform,
  Image as RnImage,
  KeyboardAvoidingView,
} from 'react-native';
import Animated, {
  runOnJS,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

interface Props {
  visibility: boolean;
  setVisibility: Dispatch<SetStateAction<boolean>>;
}

const SPRING_CONFIG = {
  mass: 1.5,
  damping: 15,
  stiffness: 60,
  overshootClamping: false,
  restSpeedThreshold: 0.01,
  restDisplacementThreshold: 0.01,
};

const SHEET_HEIGHT = h(75);
const hiddenPosition = h(50);
const CommentSheet: FC<Props> = ({visibility, setVisibility}) => {
  const insets = useSafeAreaInsets();
  const snapPoints = [0, hiddenPosition];
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
    opacity.value = withTiming(opacityTo, {duration: 700});
    translateY.value = withTiming(translateTo, {duration: 700}, () => {
      if (param === 'hide') {
        runOnJS(setVisibility)(false);
      }
    });
  };

  const pan = Gesture.Pan()
    .onChange((event: any) => {
      let newY = event.changeY;
      if (newY < 0) {
        newY = 0;
      } else if (newY > hiddenPosition) {
        newY = hiddenPosition;
      }
      translateY.value += newY;
    })
    .onFinalize((event: any) => {
      const targetPoint = snapPoints.reduce((acc, point) => {
        return Math.abs(translateY.value - point) <
          Math.abs(translateY.value - acc)
          ? point
          : acc;
      }, snapPoints[0]);
      translateY.value = withSpring(targetPoint, SPRING_CONFIG);
      if (targetPoint === hiddenPosition) {
        runOnJS(toggleBottomSheet)('hide');
      }
    });

  useEffect(() => {
    toggleBottomSheet('show');
  }, []);

  return (
    <Modal
      visible={visibility}
      transparent={true}
      style={StyleSheet.absoluteFill}>
      <GestureHandlerRootView
        style={{
          flex: 1,
          zIndex: 100,
          width: '100%',
          height: '100%',
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}>
        <KeyboardAvoidingView
          style={{flex: 1, width: '100%', height: '100%'}}
          behavior={Platform.OS == 'android' ? 'height' : 'padding'}>
          <Animated.View style={[styles.overlay, overlayStyle]} />
          <View style={styles.container}>
            <GestureDetector gesture={pan}>
              <Animated.View style={[styles.bottomSheet, bottomSheetStyle]}>
                <View
                  style={[styles.scrubberView, globalStyle.bothContentCenter]}>
                  <View style={styles.scrubber} />
                </View>
                <Text size="sm" margin="ml-4" fontWeight="800">
                  {'Comments'}
                  <Text size="sm" fontWeight="500" color="text-darkGrey">
                    {' (238)'}
                  </Text>
                </Text>
                <View style={styles.devider} />
                <View style={styles.listView}>
                  <FlatList
                    data={[1, 2, 3, 4, 5, 6]}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => {
                      return (
                        <View key={index} style={styles.commentItem}>
                          <Image
                            resizeMode="contain"
                            style={styles.userImage}
                            source={{
                              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTGGOydtkYQjl-PgQu7VRZ9as5DGiTAUpEkQ&usqp=CAU',
                            }}
                          />
                          <View style={styles.commentView}>
                            <View style={styles.commentWrapper}>
                              <Text size="sm">
                                {
                                  'Hello, Welcome to our store. How can I help you today?'
                                }
                              </Text>
                            </View>
                            <View style={styles.likeCommentView}>
                              <Pressable style={styles.actionButton}>
                                <RnImage
                                  tintColor={'#666666'}
                                  style={styles.likeIconComment}
                                  resizeMode="contain"
                                  source={images.HeartIcon}
                                />
                              </Pressable>
                              <Text size="xs" color="text-darkGrey">
                                {'80   '}
                              </Text>
                              <Pressable style={styles.actionButton}>
                                <RnImage
                                  tintColor={'#666666'}
                                  style={styles.likeIconComment}
                                  resizeMode="contain"
                                  source={images.ChatIcon}
                                />
                              </Pressable>
                              <Text size="xs" color="text-darkGrey">
                                23
                              </Text>
                            </View>
                          </View>
                        </View>
                      );
                    }}
                  />
                  <View style={styles.inputWrapper}>
                    <View style={styles.inputView}>
                      <TextInput
                        style={styles.input}
                        placeholder="Type here..."
                      />
                      <Pressable style={styles.sendButton}>
                        <RnImage
                          tintColor={'#89E3DC'}
                          resizeMode="contain"
                          source={images.SendDark}
                          style={styles.sendIcon}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Animated.View>
            </GestureDetector>
          </View>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    </Modal>
  );
};

const styles = {
  overlay: tw`w-full h-full bg-black `,
  container: tw`absolute w-full h-full z-10 justify-end`,
  scrubberView: tw`w-full h-7`,
  scrubber: tw`w-15 h-1.5 bg-gray-400 rounded-full`,
  bottomSheet: tw`w-full h-150 bg-white rounded-t-xl`,
  listView: tw`flex-1 w-full px-4`,
  devider: tw`w-full h-0.2 bg-gray-200 mt-3 mb-5`,
  commentItem: tw`w-full flex-row gap-2 mb-1`,
  userImage: tw`w-7 h-7 rounded-full`,
  commentView: tw`flex-1 w-full`,
  commentWrapper: tw`w-full px-4 py-3 bg-cultured rounded-lg`,
  likeCommentView: tw`w-full h-9 flex-row items-center justify-end`,
  likeIconComment: tw`w-4.5 h-4.5`,
  actionButton: tw`w-8 h-full items-center justify-center`,
  inputWrapper: tw`w-full h-20 bg-white justify-center`,
  inputView: tw`w-full rounded-full h-13 flex-row items-center bg-cultured border border-gray-100 pl-2 pr-5`,
  input: tw`flex-1 w-full bg-transparent`,
  sendButton: tw`w-10 h-full items-end justify-center`,
  sendIcon: tw`w-5 h-5`,
};

export default CommentSheet;
