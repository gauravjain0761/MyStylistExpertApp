import globalStyle from 'globalStyles';
import images from 'images';
import tw from 'rn-tailwind';
import React, {FC, useEffect} from 'react';
import {View, Pressable, FlatList} from 'react-native';
import {Image, Header, Container, Button, JobCard} from 'components';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '..';
import {RouteProp} from '@react-navigation/native';
import useJobs from './hooks';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Jobs'>;
  route: RouteProp<RootStackParamList, 'Jobs'>;
};

const Jobs: FC<Props> = ({navigation}) => {
  const {
    savedJobs,
    activeTab,
    upcomuingJobs,
    setActiveTab,
    getAllSavedJobs,
    getAllUpcomingJobs,
    unBookmarkJob,
    bookmarkedJob,
  } = useJobs();

  useEffect(() => {
    getAllSavedJobs();
    getAllUpcomingJobs();
  }, []);

  return (
    <Container>
      <View style={globalStyle.container}>
        <Header
          title="Job Detail"
          rightView={
            <View style={styles.headerRight}>
              <Pressable style={[styles.headerButton]}>
                <Image
                  resizeMode="contain"
                  style={styles.searchIcon}
                  source={images.SortIcon}
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
        <View style={styles.topButtons}>
          <View style={[styles.buttonWrapper, globalStyle.bothContentCenter]}>
            <Button
              lable="Upcoming"
              onPress={() => {
                setActiveTab('Upcoming');
              }}
              style={tw`bg-${
                activeTab === 'Upcoming' ? 'primary' : 'transparent'
              } flex-1 h-10`}
            />
            <Button
              lable="Saved"
              onPress={() => {
                setActiveTab('Saved');
              }}
              style={tw`bg-${
                activeTab === 'Saved' ? 'primary' : 'transparent'
              } flex-1 h-10`}
            />
          </View>
        </View>
        <View style={styles.mainView}>
          <FlatList
            data={activeTab === 'Saved' ? savedJobs : upcomuingJobs}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <JobCard
                  key={index}
                  data={item}
                  isBookmarked={activeTab === 'Saved'}
                  onBookmarkPress={(bookmarkStatus: boolean, jobId: string) => {
                    if (bookmarkStatus === true) {
                      bookmarkedJob(jobId);
                    } else {
                      unBookmarkJob(jobId);
                    }
                  }}
                  onPressCard={(jobId: string) => {
                    navigation.navigate('JobDetail', {jobId});
                  }}
                />
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
  mainView: tw`flex-1 w-full h-full bg-cultured px-4`,
  topButtons: tw`w-full h-25 items-center bg-white px-4`,
  buttonWrapper: tw`w-full px-3 h-17 mt-3 rounded-lg bg-aliceBlue flex-row`,
  list: tw`py-4`,
  separator: tw`w-full h-4`,
};

export default Jobs;
