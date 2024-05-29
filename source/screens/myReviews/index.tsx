import React, {FC, useEffect} from 'react';
import tw from 'rn-tailwind';
import images from 'images';
import {FlatList, Pressable, View} from 'react-native';
import globalStyle from 'globalStyles';
import {PLEASE_LOGIN, PHONE_NUMBER} from 'AppConstants';
import {
  Image,
  Text,
  Container,
  Header,
  ReviewCard,
  BottomTab,
} from 'components';
import Stars from 'react-native-stars';
import useGetReviews from './hooks';
import {useAppSelector} from 'store';

const MyReviews: FC = () => {
  const {getReviews, setLoading, getTopReviews} = useGetReviews();
  const reviews = useAppSelector(state => state?.review?.getReviews);
  const topReviews = useAppSelector(state => state?.review?.getTopReviews);

  useEffect(() => {
    if (reviews.length && topReviews.length) {
      setLoading(false);
    } else {
      setLoading(true);
      getTopReviews();
      getReviews();
    }
  }, []);

  console.log('RRRRRRRRRRRRRRR', topReviews);

  return (
    <Container>
      <View style={globalStyle.container}>
        <Header
          title={`Review (${reviews.length})`}
          rightView={
            <View style={styles.rightView}>
              <Pressable style={styles.rightIconButton}>
                <Image
                  resizeMode="contain"
                  style={styles.rightIcon}
                  source={images.CalendarIcon}
                />
              </Pressable>
            </View>
          }
        />
        <View style={styles.mainView}>
          <View style={styles.topReviewView}>
            <Text size="base" margin="my-4 ml-4" fontWeight="800">
              Top Reviews
            </Text>
            <FlatList
              horizontal={true}
              data={topReviews}
              contentContainerStyle={styles.horizontalList}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => (
                <View style={styles.separatorHorizontal} />
              )}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return <ReviewCard data={item} key={index} />;
              }}
            />
          </View>
          <View style={styles.allReviewView}>
            <Text size="base" margin="my-4 ml-4" fontWeight="800">
              All Reviews
            </Text>
            <FlatList
              data={reviews}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.verticalList}
              ItemSeparatorComponent={() => <View style={styles.separato} />}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return <ReviewCard data={item} key={index} fullWidth={true} />;
              }}
            />
          </View>
        </View>
      </View>
      <BottomTab />
    </Container>
  );
};

const styles = {
  mainView: tw`flex-1 w-full h-full bg-white`,
  rightView: tw`flex-1 w-full h-full items-end justify-center pb-4`,
  rightIconButton: tw`w-10 h-10 items-end justify-end`,
  rightIcon: tw`w-6.5 h-6.5`,
  topReviewView: tw`w-full h-58 bg-floralWhite`,
  separatorHorizontal: tw`w-4 h-full`,
  separato: tw`w-full h-4`,
  horizontalList: tw`px-4`,
  verticalList: tw`px-4 pb-4`,
  allReviewView: tw`flex-1 w-full h-full`,
};

export default MyReviews;
