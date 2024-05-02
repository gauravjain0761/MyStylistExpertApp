import React, {FC} from 'react';
import {View, Pressable, FlatList, ScrollView} from 'react-native';
import {
  BottomTab,
  Container,
  Image,
  MyFeedCard,
  ReviewCard,
  Text,
} from 'components';
import globalStyle from 'globalStyles';
import tw from 'rn-tailwind';
import images from 'images';
import {AMENITIES, AVAILABILITIES} from 'AppConstants';
import {w} from '../../utils/dimentions';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '..';
import {RouteProp} from '@react-navigation/native';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
  route: RouteProp<RootStackParamList, 'Profile'>;
};

const Profile: FC<Props> = ({navigation}) => {
  return (
    <Container>
      <View style={globalStyle.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.header}>
            <Text color="text-black" fontWeight="800" size="lg">
              {'Profile'}
            </Text>
            <View style={styles.contactUs}>
              <Image
                style={styles.whatsApp}
                resizeMode="contain"
                source={images.whatsappIcon}
              />
              <Text size="sm" color="text-darkGrey">
                {'Contact us to edit'}
              </Text>
            </View>
          </View>
          <View style={styles.mainView}>
            <View style={styles.profileWrapperMain}>
              <View style={styles.profileView}>
                <Image
                  resizeMode="cover"
                  source={{
                    uri: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
                  }}
                  style={styles.profileImage}
                />
                <Image
                  resizeMode="cover"
                  source={{
                    uri: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
                  }}
                  style={styles.profileAvtar}
                />
              </View>
              <View style={styles.profileWrapper}>
                <Text size="lg" fontWeight="800">
                  {'Nickson John'}
                </Text>
                <Text
                  size="sm"
                  fontWeight="600"
                  color="text-darkGrey"
                  margin="mt-1">
                  {'@nicksonjohn646'}
                </Text>
                <View style={styles.locationView}>
                  <Image
                    tintColor={'#666666'}
                    style={styles.locationIcon}
                    resizeMode="contain"
                    source={images.Location}
                  />
                  <Text numberOfLines={1} style={styles.addressText} size="sm">
                    {'  North side, Melt Road'}
                  </Text>
                </View>
                <View style={styles.distanceView}>
                  <Image
                    resizeMode="contain"
                    tintColor={'#666666'}
                    style={styles.locationIcon}
                    source={images.DistanceIcon}
                  />
                  <Text numberOfLines={1} size="sm">
                    {'  3.8 km away '}
                  </Text>
                  <Text color="text-darkGrey" fontWeight="700" size="lg">
                    {' •  '}
                  </Text>
                  <Image
                    resizeMode="contain"
                    tintColor={'#666666'}
                    style={styles.startIcon}
                    source={images.YellowStart}
                  />
                  <Text color="text-black" size="sm">
                    {'  4.6 '}
                  </Text>
                  <Text color="text-darkGrey" size="sm">
                    (20)
                  </Text>
                </View>
                <View style={styles.followerView}>
                  <Image
                    style={styles.followerIcon}
                    source={images.FollowerIcon}
                    resizeMode="contain"
                  />
                  <Text color="text-black" size="sm">
                    {' 2k'}
                  </Text>
                  <Text
                    onPress={() => navigation.navigate('Followers')}
                    color="text-darkGrey"
                    size="sm">
                    Followers
                  </Text>
                  <Text color="text-darkGrey" fontWeight="700" size="lg">
                    {' • '}
                  </Text>
                  <Image
                    style={styles.followerIcon}
                    source={images.FollowerIcon}
                    resizeMode="contain"
                  />
                  <Text color="text-black" size="sm">
                    {' 345 '}
                  </Text>
                  <Text
                    onPress={() => navigation.navigate('Followings')}
                    color="text-darkGrey"
                    size="sm">
                    Following
                  </Text>
                </View>
                <View style={styles.devider} />
                <Text size="base" margin="mt-3" fontWeight="800">
                  About Nickson's
                </Text>
                <Text numberOfLines={3} size="sm" margin="mt-2 mb-8">
                  {`I am a barber with over 10 years of experience in the industry. I am passionate about my work and love helping my clients to look and feel their's b...`}
                  <Text size="sm" fontWeight="700">
                    {'read more'}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={styles.servicesView}>
              <Text
                size="base"
                fontWeight="700"
                margin="mt-3">{`Nickson's Services`}</Text>

              <View style={styles.serviceItem}>
                <Text size="sm">{'Fades'}</Text>
                <Text size="sm" fontWeight="800">
                  {'$9'}
                </Text>
              </View>
              <View style={styles.serviceItem}>
                <Text size="sm">{'Tapers'}</Text>
                <Text size="sm" fontWeight="800">
                  {'$9'}
                </Text>
              </View>
              <View style={styles.serviceItem}>
                <Text size="sm">{'Hair Coloring'}</Text>
                <Text size="sm" fontWeight="800">
                  {'$9'}
                </Text>
              </View>
            </View>
            <View style={styles.availbilityView}>
              <View style={styles.availabilityBox}>
                <View style={styles.availabilityHeader}>
                  <Text size="base" fontWeight="700">{`Availability`}</Text>
                  <Pressable style={styles.wrapperButton}>
                    <Image
                      style={styles.minusIcon}
                      resizeMode="contain"
                      source={images.MinusIcon}
                    />
                  </Pressable>
                </View>
                {AVAILABILITIES.map((data, index) => {
                  return (
                    <View key={index} style={styles.availabilityItem}>
                      <Text size="sm">{data.day}</Text>
                      <Text size="sm">{data.status}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
            <View style={styles.amentiesView}>
              <View style={styles.amentiesBox}>
                <View style={styles.amentiesHeader}>
                  <Text size="base" fontWeight="700">{`Amenities`}</Text>
                  <Pressable style={styles.wrapperButton}>
                    <Image
                      style={styles.minusIcon}
                      resizeMode="contain"
                      source={images.MinusIcon}
                    />
                  </Pressable>
                </View>
                <View style={styles.amenitiesList}>
                  {AMENITIES.map((data, index) => {
                    const {title, icon, color} = data;
                    return (
                      <View key={index} style={[styles.amenitiesItem]}>
                        <View
                          style={[
                            styles.iconWrapper,
                            {backgroundColor: color},
                          ]}>
                          <Image
                            source={icon}
                            resizeMode="contain"
                            style={styles.amenitiesIcon}
                          />
                        </View>
                        <Text margin="mt-1 text-center" size="xs">
                          {title}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
            <View style={styles.reviewView}>
              <View style={styles.reviewBox}>
                <View style={styles.reviewBoxHeader}>
                  <Text size="base" fontWeight="700">{`Review`}</Text>
                  <Pressable style={styles.wrapperButton}>
                    <Image
                      style={styles.minusIcon}
                      resizeMode="contain"
                      source={images.MinusIcon}
                    />
                  </Pressable>
                </View>
                {[1, 2].map((data, index) => {
                  return (
                    <ReviewCard
                      key={index}
                      fullWidth={true}
                      style={'bg-aliceBlueDim mb-4'}
                    />
                  );
                })}
              </View>
            </View>
          </View>
          <View style={[styles.workView, globalStyle.bothContentCenter]}>
            <Text
              size="2xl"
              color="text-black"
              fontWeight="700">{`NICKSON'S WORK`}</Text>
            <View style={tw`flex-row items-center mt-2`}>
              <Text textStyle="underline mr-2 text-black" size="sm">
                {'See All'}
              </Text>
              <Image
                style={styles.rightForward}
                resizeMode="contain"
                source={images.RightForward}
              />
            </View>
          </View>
          <View style={styles.videoWrapper}>
            <View style={styles.videoView}>
              <Image
                source={{
                  uri: 'https://media.istockphoto.com/id/1440149713/photo/black-man-tablet-and-smile-for-social-media-post-shopping-online-or-browsing-internet.webp?b=1&s=170667a&w=0&k=20&c=Fqxt3d4V6mNZEwXdf_4MJg5V6AisS1ASjQgOCPTgE30=',
                }}
                resizeMode="cover"
                style={styles.VideoIcon}
              />
              <Image
                style={styles.playIcon}
                resizeMode="contain"
                source={images.playIcon}
              />
            </View>
            <View style={styles.imageWhiteBg}>
              <View style={styles.imageColorTop}></View>
              <View style={styles.imageColorBottom}></View>
            </View>
          </View>
          <View style={[styles.gridView, styles.gridPadding]}>
            <View style={styles.gridViewHeader}>
              <Text fontWeight="700" size="base">
                {`Nickson's Portfolio`}
              </Text>
              <Text color="text-darkGrey" textStyle="underline" size="sm">
                {`View All`}
              </Text>
            </View>
            <View style={styles.gridImageView}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(data => {
                return (
                  <Image
                    source={{
                      uri: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    }}
                    resizeMode="cover"
                    style={[styles.gridImage, styles.topBoxWrappeSub]}
                  />
                );
              })}
            </View>
          </View>
          <View style={styles.myFeedView}>
            <View style={styles.feedHeader}>
              <Text fontWeight="700" size="base">
                {`My Feed`}
              </Text>
              <Text color="text-darkGrey" textStyle="underline" size="sm">
                {`View All`}
              </Text>
            </View>
            <View style={styles.listWrapper}>
              <FlatList
                horizontal={true}
                data={[1, 2, 3, 4, 5, 6, 6]}
                ItemSeparatorComponent={() => <View style={tw`w-4 h-full`} />}
                contentContainerStyle={styles.horizontalList}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                  return <MyFeedCard />;
                }}
              />
            </View>
          </View>
          <View style={styles.latestVideos}>
            <View style={styles.latestVideoHeader}>
              <Text size="base" fontWeight="800">
                {'Lastest Videos'}
              </Text>
              <Image
                resizeMode="contain"
                style={styles.youtubeIcon}
                source={images.YoutubeIcon}
              />
            </View>
            <Text size="base" fontWeight="800" margin="ml-4">
              {'Of our finest Stylist'}
            </Text>
            <View style={styles.latestVideoList}>
              <FlatList
                horizontal={true}
                data={[1, 2, 3, 4, 5, 6, 6]}
                ItemSeparatorComponent={() => <View style={tw`w-4 h-full`} />}
                contentContainerStyle={styles.horizontalList}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                  return (
                    <View style={styles.videoCard}>
                      <Image
                        resizeMode="cover"
                        style={styles.videoImage}
                        source={{
                          uri: 'https://jaxsonmaximus.com/wp-content/uploads/2022/12/Classic-long-haircut.png',
                        }}
                      />
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </ScrollView>
        <BottomTab />
      </View>
    </Container>
  );
};

const styles = {
  header: tw`w-full h-13 bg-white flex-row items-center justify-between px-4`,
  contactUs: tw`h-full items-center flex-row`,
  whatsApp: tw`w-6 h-6 mr-2`,
  mainView: tw`w-full h-full flex-1 bg-cultured`,
  profileWrapperMain: tw`w-full px-4`,
  profileView: tw`w-full h-33 mt-5`,
  profileImage: tw`w-full h-full rounded-lg`,
  profileAvtar: tw`w-22 h-22 rounded-lg border-4 border-white top--15 ml-4 `,
  profileWrapper: tw`w-full mt-8`,
  locationView: tw`w-full flex-row items-center mt-3 ml--0.5`,
  locationIcon: tw`w-4.5 h-4.5`,
  addressText: tw`text-darkGrey w-38`,
  startIcon: tw`w-5 h-5`,
  distanceView: tw`w-full flex-row items-center mt-2`,
  followerView: tw`flex-row w-full mt-1 items-center ml--1 `,
  followerIcon: tw`w-5 h-5`,
  devider: tw`w-full h-0.3 bg-gray-200 mt-4`,
  servicesView: tw`w-full bg-aliceBlueDim p-4 pb-8 `,
  serviceItem: tw`w-full h-12 rounded-lg bg-white flex-row items-center justify-between px-4 mt-4`,
  scrollView: tw`w-full pb-5 bg-cultured`,
  availbilityView: tw`w-full bg-white p-4 pt-8 pb-0`,
  availabilityHeader: tw`w-full h-12 flex-row items-center justify-between`,
  wrapperButton: tw`w-12 h-full justify-center items-end`,
  minusIcon: tw`w-3.5 h-3.5`,
  availabilityItem: tw`w-full h-10 flex-row items-center justify-between `,
  availabilityBox: tw`w-full border rounded-t-xl border-gray-200 px-4 pb-6`,
  amentiesView: tw`w-full bg-white px-4`,
  amentiesBox: tw`w-full border  border-t-0 border-gray-200 px-4 pb-2`,
  amentiesHeader: tw`w-full h-12 mt-2 flex-row items-center justify-between`,
  amenitiesList: tw`w-full flex-row flex-wrap justify-between`,
  amenitiesItem: tw` mt-2 mb-4 w-20 items-center`,
  iconWrapper: tw`w-14 h-14 rounded-full bg-red-800 items-center justify-center`,
  amenitiesIcon: tw`w-6 h-6`,
  reviewView: tw`w-full px-4 bg-white`,
  reviewBox: tw`w-full px-4 border border-gray-200 mb-14 rounded-b-xl `,
  reviewBoxHeader: tw`w-full h-12 flex-row items-center justify-between mt-3 mb-1`,
  workView: tw`w-full h-30 bg-aliceBlueDim`,
  rightForward: tw`w-2 h-2`,
  videoWrapper: tw`w-full h-72 bg-white justify-center`,
  videoView: tw`w-full h-58 rounded-lg overflow-hidden items-center px-4 justify-center`,
  VideoIcon: tw`w-full h-full rounded-lg`,
  playIcon: tw`w-10 h-10 absolute`,
  imageWhiteBg: tw`flex-1 h-full w-full bg-red-300 absolute z--1`,
  imageColorTop: tw`flex-1 w-full h-full bg-white`,
  imageColorBottom: tw`flex-1 w-full h-full bg-aliceBlue`,
  gridView: tw`w-full bg-white bg-aliceBlue pb-4`,
  gridViewHeader: tw`w-full h-10 flex-row items-center justify-between`,
  gridImage: tw`mb-4`,
  gridImageView: tw`flex-row flex-wrap justify-between`,
  gridPadding: {paddingHorizontal: w(4)},
  topBoxWrappeSub: {width: w(28), height: w(28)},
  myFeedView: tw`w-full  mt-4`,
  horizontalList: tw` px-4 my-4`,
  listWrapper: tw`w-full`,
  feedHeader: tw`w-full h-10 flex-row items-center justify-between px-4`,
  latestVideos: tw`w-full`,
  latestVideoHeader: tw`w-full flex-row h-12 items-center px-4`,
  youtubeIcon: tw`w-7 h-7 ml-3`,
  latestVideoList: tw`w-full`,
  videoCard: tw`w-75 h-105 `,
  videoImage: tw`w-full h-full rounded-lg`,
};

export default Profile;
