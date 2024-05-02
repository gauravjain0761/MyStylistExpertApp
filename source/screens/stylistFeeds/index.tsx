import React, {FC, useState} from 'react';
import images from 'images';
import tw from 'rn-tailwind';
import {CommentSheet} from 'bottomSheets';
import globalStyle from 'globalStyles';
import {
  Text,
  Header,
  Image,
  Container,
  StylistFeedCard,
  BottomTab,
} from 'components';
import {View, Pressable, FlatList, Image as RnImage} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '..';
import {RouteProp} from '@react-navigation/native';

const feedCategories = ['All', 'Haircutting', 'Beard Trim', 'Face Treatment'];

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'StylistFeeds'>;
  route: RouteProp<RootStackParamList, 'StylistFeeds'>;
};

const StylistFeeds: FC<Props> = ({navigation}) => {
  const [activeCategory, setCategory] = useState<string>('All');
  const [commentSheet, showCommentSheet] = useState<boolean>(false);

  return (
    <Container>
      <View style={globalStyle.container}>
        <Header title={`Stylist Feed's`} />
        <View style={styles.mainView}>
          <FlatList
            ListHeaderComponent={
              <View style={styles.wrapper}>
                <Text size="base" fontWeight="800" margin="ml-4 mb-2">
                  {'Top Stories from Stylist'}
                </Text>
                <View style={styles.storiesView}>
                  <FlatList
                    horizontal={true}
                    data={[1, 2, 3, 4, 5, 6, 7]}
                    contentContainerStyle={styles.storiesList}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => {
                      if (index == 0) {
                        return (
                          <View style={styles.storyWrapperMine}>
                            <View style={styles.storyBorderMine}>
                              <View style={styles.overlay} />
                              <RnImage
                                tintColor={'#ffffff'}
                                style={styles.plusIcon}
                                resizeMode="contain"
                                source={images.PlusIcon}
                              />
                              <Image
                                resizeMode="cover"
                                source={{
                                  uri: 'https://media.istockphoto.com/id/1470808186/photo/handsome-hispanic-guy-is-using-smartphone-for-messaging-texting-young-dark-haired-man-in.jpg?s=2048x2048&w=is&k=20&c=3lDYT52TvLhxpkJR_dk2nHXQ3Tw4KVnHCb_rN2cCbOA=',
                                }}
                                style={styles.storyProfileMine}
                              />
                            </View>
                            <Text size="xs" margin="bottom--1.5">
                              Your Story
                            </Text>
                          </View>
                        );
                      }
                      return (
                        <View style={styles.storyWrapper}>
                          <View style={styles.storyBorder}>
                            <Image
                              resizeMode="cover"
                              source={{
                                uri: 'https://media.istockphoto.com/id/1440149713/photo/black-man-tablet-and-smile-for-social-media-post-shopping-online-or-browsing-internet.jpg?s=2048x2048&w=is&k=20&c=JnoXQINAwO7aweno5mFCfBvdCK7OVABmj_dF7Y7V6bc=',
                              }}
                              style={styles.storyProfile}
                            />
                          </View>
                          <Text numberOfLines={1} size="xs" margin="mt-1 ml-1">
                            Hanan CH.
                          </Text>
                        </View>
                      );
                    }}
                  />
                </View>
                <Text
                  size="base"
                  fontWeight="800"
                  margin="ml-4 my-3">{`Stylist Feed's`}</Text>
                <View style={styles.feedCategories}>
                  <FlatList
                    horizontal={true}
                    data={feedCategories}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => {
                      return (
                        <Pressable
                          onPress={() => setCategory(item)}
                          style={[
                            styles.inactiveCategory,
                            item === activeCategory && styles.activeCategory,
                          ]}>
                          <Text
                            size="xs"
                            color={
                              item === activeCategory
                                ? 'text-black'
                                : 'text-gray-400'
                            }>
                            {item}
                          </Text>
                        </Pressable>
                      );
                    }}
                  />
                </View>
              </View>
            }
            data={feedCategories}
            contentContainerStyle={styles.listViewContent}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            renderItem={({item, index}) => {
              return (
                <View style={styles.cardWrapper}>
                  <StylistFeedCard
                    onCommentIconPress={() => showCommentSheet(true)}
                  />
                </View>
              );
            }}
          />
          <Pressable
            onPress={() => navigation.navigate('WritePost')}
            style={[styles.floatingButton, globalStyle.bothContentCenter]}>
            <Image
              source={images.EditIcon}
              resizeMode="contain"
              style={styles.editIcon}
            />
          </Pressable>
        </View>
        <BottomTab />
        {commentSheet ? (
          <CommentSheet
            visibility={commentSheet}
            setVisibility={showCommentSheet}
          />
        ) : (
          <View />
        )}
      </View>
    </Container>
  );
};

const styles = {
  wrapper: tw`w-full bg-cultured pt-4`,
  mainView: tw`flex-1 h-full w-full  bg-cultured`,
  storiesView: tw`w-full h-25  flex-row items-center`,
  storyWrapper: tw`w-22 h-full justify-center items-center`,
  storyWrapperMine: tw`w-20 h-full justify-center items-center`,
  storyBorder: tw`w-18 h-18 rounded-full border-2 border-primary items-center justify-center`,
  storyBorderMine: tw`w-16 h-16 rounded-full border-2 border-primary items-center justify-center`,
  storyProfile: tw`w-16 h-16 rounded-full`,
  storyProfileMine: tw`w-14 h-14 rounded-full`,
  storiesList: tw`px-4`,
  overlay: tw`w-14 h-14 bg-black opacity-60 absolute z-10 rounded-full`,
  plusIcon: tw`w-3 h-3 absolute z-20`,
  feedCategories: tw`w-full px-4 mb-4`,
  activeCategory: tw`h-9 px-3.5 justify-center bg-primary mr-2.7 rounded-full`,
  inactiveCategory: tw`h-9 px-3.5 justify-center bg-gray-200 border border-gray-300 mr-2.7 rounded-full`,
  listView: tw`w-full`,
  itemSeparator: tw`w-full h-4`,
  listViewContent: tw`w-full pb-4`,
  cardWrapper: tw`w-full px-4 `,
  floatingButton: tw`w-15 h-15 bg-primary rounded-full absolute bottom-6 right-4`,
  editIcon: tw`w-7 h-7`,
};

export default StylistFeeds;
