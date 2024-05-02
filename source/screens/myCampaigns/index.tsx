import React, {FC, useEffect, useState} from 'react';
import {w} from 'utils';
import tw from 'rn-tailwind';
import images from 'images';
import {RootStackParamList} from '..';
import globalStyle from 'globalStyles';
import {RouteProp} from '@react-navigation/native';
import {Pressable, FlatList, View} from 'react-native';
import {TabView, TabBar, Route} from 'react-native-tab-view';
import {Header, Image, Text, Container, CompaignsCard} from 'components';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useMyCampaign from './hooks';

const initialLayout = {
  height: 0,
  width: w(100),
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MyCampaigns'>;
  route: RouteProp<RootStackParamList, 'MyCampaigns'>;
};

const MyCampaigns: FC<Props> = ({navigation}) => {
  const {
    declineCompaigns,
    activeCompaigns,
    pendingCompaigns,
    acceptedCompaigns,
    getAcceptedCampaigns,
    getActiveCampaigns,
    getPendingCampaigns,
    getDeclineCampaigns,
  } = useMyCampaign();

  const [index, setIndex] = useState<number>(0);
  const [routes, setRoutes] = useState<Array<Route>>([
    {key: 'Pending', title: 'Pending'},
    {key: 'Accepted', title: 'Accepted'},
    {key: 'Declined', title: 'Declined'},
    // {key: 'Active', title: 'Active'},
  ]);

  useEffect(() => {
    getAcceptedCampaigns();
    getActiveCampaigns();
    getPendingCampaigns();
    getDeclineCampaigns();
  }, []);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'Pending': {
        return (
          <View style={styles.viewPager}>
            <FlatList
              bounces={false}
              data={pendingCompaigns}
              maxToRenderPerBatch={20}
              scrollEventThrottle={400}
              contentContainerStyle={styles.listContainer}
              alwaysBounceVertical={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => {
                return <View style={styles.separator} />;
              }}
              renderItem={({item, index}) => {
                return (
                  <CompaignsCard
                    key={index}
                    data={item}
                    cardType="Pending"
                    onPressCard={(campaignId: string) =>
                      navigation.navigate('CompaignDetail', {campaignId})
                    }
                  />
                );
              }}
            />
          </View>
        );
      }
      case 'Accepted': {
        return (
          <View style={styles.viewPager}>
            <FlatList
              bounces={false}
              data={acceptedCompaigns}
              maxToRenderPerBatch={20}
              scrollEventThrottle={400}
              contentContainerStyle={styles.listContainer}
              alwaysBounceVertical={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => {
                return <View style={styles.separator} />;
              }}
              renderItem={({item, index}) => {
                return (
                  <CompaignsCard
                    key={index}
                    data={item}
                    cardType="Accepted"
                    onPressCard={(campaignId: string) =>
                      navigation.navigate('CompaignDetail', {campaignId})
                    }
                  />
                );
              }}
            />
          </View>
        );
      }
      case 'Declined': {
        return (
          <View style={styles.viewPager}>
            <FlatList
              bounces={false}
              data={declineCompaigns}
              maxToRenderPerBatch={20}
              scrollEventThrottle={400}
              contentContainerStyle={styles.listContainer}
              alwaysBounceVertical={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => {
                return <View style={styles.separator} />;
              }}
              renderItem={({item, index}) => {
                return (
                  <CompaignsCard
                    cardType="Decline"
                    key={index}
                    data={item}
                    onPressCard={(campaignId: string) =>
                      navigation.navigate('CompaignDetail', {campaignId})
                    }
                  />
                );
              }}
            />
          </View>
        );
      }
      case 'Active': {
        return (
          <View style={styles.viewPager}>
            <FlatList
              bounces={false}
              data={activeCompaigns}
              maxToRenderPerBatch={20}
              scrollEventThrottle={400}
              contentContainerStyle={styles.listContainer}
              alwaysBounceVertical={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => {
                return <View style={styles.separator} />;
              }}
              renderItem={({item, index}) => {
                return (
                  <CompaignsCard
                    cardType="Active"
                    key={index}
                    data={item}
                    onPressCard={(campaignId: string) =>
                      navigation.navigate('CompaignDetail', {campaignId})
                    }
                  />
                );
              }}
            />
          </View>
        );
      }
      default:
        break;
    }
  };

  return (
    <Container>
      <View style={globalStyle.container}>
        <Header
          title="My Stylist Campaigns"
          rightView={
            <View style={styles.headerRight}>
              <Pressable style={[styles.headerButton]}>
                <Image
                  style={styles.searchIcon}
                  source={images.Search}
                  resizeMode="contain"
                />
              </Pressable>
              <Pressable style={[styles.headerButton]}>
                <Image
                  style={styles.searchIcon}
                  source={images.CalendarIcon}
                  resizeMode="contain"
                />
              </Pressable>
            </View>
          }
        />
        <View style={styles.mainView}>
          <TabView
            renderTabBar={props => (
              <TabBar
                renderLabel={({route, focused, color}) => (
                  <Text
                    size="sm"
                    style={[
                      {
                        color,
                      },
                      styles.tabLabel,
                      focused && styles.focusedLabel,
                    ]}>
                    {route.title}
                  </Text>
                )}
                {...props}
                scrollEnabled={false}
                tabStyle={styles.tabContainer}
                inactiveColor="#666666"
                activeColor="#000000"
                style={styles.tabStyle}
                indicatorStyle={styles.tabLine}
              />
            )}
            onMoveShouldSetResponderCapture={() => true}
            navigationState={{index, routes}}
            onIndexChange={i => {
              setIndex(i);
            }}
            initialLayout={initialLayout}
            renderScene={renderScene}
          />
        </View>
      </View>
    </Container>
  );
};

const styles = {
  tabContainer: {
    height: '100%',
    marginHorizontal: w(1),
  },
  headerRight: tw`flex-1 w-full h-full flex-row items-center justify-end`,
  headerButton: tw`w-10 h-full items-end justify-center`,
  searchIcon: tw`w-7 h-7`,
  mainView: tw`w-full h-full flex-1 bg-cultured`,
  viewPager: tw`flex-1 w-full h-full px-4`,
  separator: tw`w-full h-4`,
  tabStyle: tw`bg-white`,
  tabLine: tw`bg-primary`,
  focusedLabel: tw`text-base text-black font-bold mx-3`,
  tabLabel: tw`text-base text-darkGrey font-bold mx-3`,
  listContainer: tw`py-4`,
  listSeparator: tw`w-full h-4`,
};

export default MyCampaigns;
