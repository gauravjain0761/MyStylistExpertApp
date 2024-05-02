import globalStyle from 'globalStyles';
import images from 'images';
import tw from 'rn-tailwind';
import React, {FC, useEffect} from 'react';
import {View, Image as RnImage, Pressable} from 'react-native';
import {Text, Image, Header, Container, Button} from 'components';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '..';
import {RouteProp} from '@react-navigation/native';
import useJobDetail from './hooks';
import moment from 'moment';

const cardsColor = {
  1: '#F7F5EB',
  2: '#CCF0FF',
  3: '#FFE1E4',
  4: '#F7E6E6',
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'JobDetail'>;
  route: RouteProp<RootStackParamList, 'JobDetail'>;
};

const JobDetail: FC<Props> = ({route, navigation}) => {
  const {jobId} = route.params;
  const {jobDetail, getJobDetail} = useJobDetail();
  const {
    _id,
    budget,
    jobTitle,
    end_date,
    user_details,
    start_date,
    jobDescription,
    featured_image,
    desiredProductUsed,
  } = jobDetail;

  const {name} = user_details || {};
  const desireItems = desiredProductUsed ? JSON.parse(desiredProductUsed) : [];
  const sDate = moment(start_date).format('ddd, DD MMM ');
  const statTime = moment(start_date).format('hh:mm A');
  const endTime = moment(start_date).format('hh:mm A');

  useEffect(() => {
    getJobDetail(jobId);
  }, []);

  return (
    <Container>
      <View style={globalStyle.container}>
        <Header
          title="Job Detail"
          rightView={
            <View style={styles.headerRight}>
              <Pressable style={[styles.headerButton]}>
                <RnImage
                  resizeMode="contain"
                  style={styles.bookmarkIcon}
                  source={images.Bookmark}
                />
              </Pressable>
              <Pressable style={[styles.headerButton]}>
                <RnImage
                  tintColor={'#000000'}
                  style={styles.threeDotIcon}
                  source={images.ThreeDotsIcon}
                  resizeMode="contain"
                />
              </Pressable>
            </View>
          }
        />
        <View style={styles.mainView}>
          <View style={styles.jobCard}>
            <View style={styles.cardWrapper}>
              <View style={styles.userImageView}>
                <Image
                  resizeMode="cover"
                  style={styles.userImage}
                  source={{
                    uri: featured_image,
                  }}
                />
              </View>
              <Text
                size="sm"
                color="text-darkGrey"
                fontWeight="700"
                margin="mt-1">
                {name || ''}
              </Text>
              <Text size="base" fontWeight="800" margin="mt-0.5">
                {jobTitle}
              </Text>
              <View style={styles.timeView}>
                <Image
                  source={images.WatchIcon}
                  style={styles.watchIcon}
                  resizeMode="contain"
                />
                <Text size="sm">
                  {` ${sDate} `}
                  <Text color="text-darkGrey" fontWeight="700" size="lg">
                    {' • '}
                  </Text>
                  <Text color="text-darkGrey" size="sm">
                    {`Between ${statTime} - ${endTime}`}
                  </Text>
                </Text>
              </View>
              <View style={styles.budgetView}>
                <View style={styles.budgetWrapper}>
                  <Text size="sm" color="text-darkGrey">
                    {'Budget'}
                  </Text>
                  <Text size="lg" margin="mt-1" fontWeight="800">
                    {`₹${budget || ''}`}
                  </Text>
                </View>
                <View style={styles.budgetWrapper}>
                  <Text size="sm" color="text-darkGrey">
                    {'Max Distance'}
                  </Text>
                  <Text size="lg" margin="mt-1" fontWeight="800">
                    {'3.8 mi'}
                  </Text>
                </View>
              </View>
              <Text size="sm" color="text-darkGrey" margin="mt-2">
                {jobDescription}
              </Text>
            </View>
            <View style={styles.devider} />
            <View style={styles.cardWrapper}>
              <Text size="base" color="text-gray-400" fontWeight="700">
                {'Desired Products'}
              </Text>
              <View style={styles.productsList}>
                {desireItems?.map((data, index) => {
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
            </View>
          </View>
        </View>
        <View style={styles.bottomView}>
          <Button
            onPress={() => {
              navigation.navigate('SubmitProposal', {
                jobId,
                userName: name,
                jobTitle: jobTitle,
                desireItems: desireItems,
                start_date: start_date,
                end_date: end_date,
              });
            }}
            lable="Apply On Job"
          />
        </View>
      </View>
    </Container>
  );
};

const styles = {
  headerRight: tw`flex-1 w-full h-full flex-row items-center justify-end`,
  headerButton: tw`w-9 h-full items-end justify-center`,
  bookmarkIcon: tw`w-6 h-5`,
  threeDotIcon: tw`w-7 h-7`,
  mainView: tw`flex-1 w-full h-full bg-cultured`,
  bottomView: tw`w-full h-22 justify-center bg-cultured px-4`,
  jobCard: tw`w-full  py-4 rounded-lg mt-3`,
  cardWrapper: tw`px-4`,
  userImageView: tw`flex-row w-full items-center justify-between`,
  userImage: tw`w-16 h-16 rounded-lg`,
  timeView: tw`w-full flex-row items-center `,
  watchIcon: tw`w-5 h-5`,
  budgetView: tw`flex-row w-full mt-4`,
  budgetWrapper: tw`mr-15`,
  devider: tw`w-full h-0.2 bg-gray-200 my-5`,
  productsList: tw`flex-row w-full flex-wrap`,
  productsWrapper: tw`h-10 px-4 justify-center rounded-full mr-3 mt-3 mb-1`,
};

export default JobDetail;
