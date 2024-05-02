import React, {FC, useEffect, useState} from 'react';
import images from 'images';
import globalStyle from 'globalStyles';
import tw from 'rn-tailwind';
import {Text, Container, Header, Image} from 'components';
import {FlatList, Pressable, Image as RNImage, View} from 'react-native';
import useFollowers from './hooks';

const Followers: FC = () => {
  const {allFollowers, getAllFollowersOfExpertUser} = useFollowers();
  useEffect(() => {
    getAllFollowersOfExpertUser();
  }, []);

  return (
    <Container>
      <View style={globalStyle.container}>
        <Header
          title={`Followers (${allFollowers.length})`}
          rightView={
            <View style={styles.headerRight}>
              <Pressable style={[styles.headerButton]}>
                <Image
                  style={styles.searchIcon}
                  source={images.SortIcon}
                  resizeMode="contain"
                />
              </Pressable>
              <Pressable style={[styles.headerButton]}>
                <Image
                  style={styles.searchIcon}
                  source={images.Search}
                  resizeMode="contain"
                />
              </Pressable>
            </View>
          }
        />
        <View style={styles.listView}>
          <FlatList
            data={allFollowers}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              const {name, user_profile_images} = item;
              const {image_medium} = user_profile_images[0];
              return (
                <View style={styles.followerItem}>
                  <Image
                    style={styles.userImage}
                    resizeMode="cover"
                    source={{
                      uri: image_medium,
                    }}
                  />
                  <View style={styles.titleView}>
                    <Text size="sm" fontWeight="800">
                      {name}
                    </Text>
                    <Text size="sm" margin="mt-1" color="text-darkGrey">
                      {'jaesbond646'}
                    </Text>
                  </View>
                  <Pressable style={styles.removeButton}>
                    <Text size="sm" color="text-[#d36363]">
                      {'Remove'}
                    </Text>
                  </Pressable>
                </View>
              );
            }}
          />
        </View>
      </View>
    </Container>
  );
};

const styles = {
  headerRight: tw`flex-1 w-full h-full flex-row items-center justify-end`,
  headerButton: tw`w-10 h-full items-end justify-center`,
  searchIcon: tw`w-6.5 h-6.5`,
  listView: tw`flex-1 w-full h-full px-4 bg-cultured`,
  followerItem: tw`w-full h-17 flex-row items-center`,
  userImage: tw`w-13 h-13 rounded-full`,
  titleView: tw`w-full flex-1 h-full pl-2 justify-center`,
  removeButton: tw`px-4 h-10 rounded-lg items-center justify-center bg-[#fff6f6]`,
  separator: tw`w-full  mb-5`,
  list: tw`w-full pb-5 pt-4`,
};

export default Followers;
