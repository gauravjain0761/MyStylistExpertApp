import React, {FC, useContext, useEffect, useState} from 'react';
import tw from 'rn-tailwind';
import images from 'images';
import globalStyle from 'globalStyles';
import {
  FlatList,
  View,
  Image as RnImage,
  ScrollView,
  Pressable,
} from 'react-native';
import {TabView, TabBar, Route} from 'react-native-tab-view';
import {
  Container,
  Text,
  Header,
  Image,
  BarChart,
  CampaignOrderCard,
} from 'components';
import {w} from '../../utils/dimentions';
import useCampaignDetails from './hooks';
import {RootStackParamList} from '..';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import moment from 'moment';
import {appConfig} from '../../../config';
import {AppContext} from 'context';
import {useAppDispatch, useAppSelector} from 'store';
import {getCampaignsOrders} from '../../Actions/campaignsAction';

const initialLayout = {
  height: 0,
  width: w(100),
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CompaignDetail'>;
  route: RouteProp<RootStackParamList, 'CompaignDetail'>;
};

const CompaignDetail: FC<Props> = ({route}) => {
  const {campaignId} = route.params;
  const dispatch = useAppDispatch();
  const {getDetails, campaignDetails} = useCampaignDetails();
  const [footerLoading, setFooterLoading] = useState(false);
  const [page, setPage] = useState(1);
  const {
    _id,
    title,
    startDate,
    endDate,
    campaignCode,
    featured_image,
    service_name,
    description,
    fileName,
  } = campaignDetails || {};

  const sDate = moment(startDate).format('MMM DD, YYYY');
  const eDate = moment(endDate).format('MMM DD, YYYY');
  const {campaignOrder} = useAppSelector(state => state?.campaign);
  const services = service_name?.map(data => data.service_name) || '';
  const {IMG_URL} = appConfig;
  const {userDetails} = useContext(AppContext);
  const {_id: userID} = userDetails || {};

  const [index, setIndex] = useState<number>(0);
  const [routes, setRoutes] = useState<Array<Route>>([
    {key: 'Details', title: 'Details'},
    {key: 'Orders', title: 'Orders'},
  ]);

  useEffect(() => {
    getDetails(campaignId);
    getOrder();
  }, []);

  const getOrder = () => {
    let obj = {
      data: {
        expertId: userID,
        serviceType: 'Campaign',
        offerId: campaignId,
        page: page,
        limit: 10,
      },
      page: page,
      onSuccess: (res: any) => {
        console.log('reerererereer', res);
      },
      onFailure: (Err: any) => {
        console.log('Errr', Err);
      },
    };
    dispatch(getCampaignsOrders(obj));
  };

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'Details': {
        return (
          <View style={styles.pageView}>
            <ScrollView
              contentContainerStyle={styles.scrollView}
              showsVerticalScrollIndicator={false}>
              <View style={styles.profileView}>
                <Image
                  style={styles.profileImage}
                  resizeMode="cover"
                  source={{
                    uri: `${IMG_URL}/${fileName}`,
                  }}
                />
                <View style={styles.nameView}>
                  <Text size="base" fontWeight="700" margin="capitalize">
                    {title}
                  </Text>
                  <Text size="sm" fontWeight="500">
                    {`Code: ${campaignCode}`}
                  </Text>
                </View>
              </View>
              <View style={styles.dateView}>
                <View
                  style={[styles.startDateView, globalStyle.bothContentCenter]}>
                  <Text size="sm" color="text-darkGrey" fontWeight="700">
                    {'Start Date'}
                  </Text>
                  <Text size="sm" fontWeight="700">
                    {sDate}
                  </Text>
                </View>
                <View style={styles.devider} />
                <View
                  style={[styles.startDateView, globalStyle.bothContentCenter]}>
                  <Text size="sm" color="text-darkGrey" fontWeight="700">
                    {'End Date'}
                  </Text>
                  <Text size="sm" fontWeight="700">
                    {eDate}
                  </Text>
                </View>
              </View>
              <Text
                size="sm"
                color="text-darkGrey"
                margin="mt-4"
                fontWeight="700">
                {'About this campaign'}
              </Text>
              <Text size="sm" margin="mt-2" fontWeight="600">
                {description}
              </Text>
              <Text size="sm" margin="mt-5" fontWeight="600">
                {'Maximum Limit Orders: '}
                <Text size="sm" margin="mt-2" fontWeight="800">
                  {'200'}
                </Text>
              </Text>
              <View style={styles.detailView}>
                <View style={styles.detailViewSub}>
                  <Text
                    size="sm"
                    fontWeight="600"
                    margin="mt-0.5"
                    color="text-darkGrey">
                    {'Package price'}
                  </Text>
                  <Text size="base" fontWeight="800">
                    {'$36'}
                  </Text>
                </View>
                <View style={styles.detailViewSub}>
                  <Text
                    size="sm"
                    margin="mt-0.5"
                    fontWeight="600"
                    color="text-darkGrey">
                    {'Bookings'}
                  </Text>
                  <Text size="base" margin="mt-0.5" fontWeight="800">
                    {'23/45'}
                  </Text>
                </View>
                <View style={styles.detailViewSub}>
                  <Text
                    size="sm"
                    margin="mt-0.5"
                    fontWeight="600"
                    color="text-darkGrey">
                    {'Availed'}
                  </Text>
                  <Text size="base" fontWeight="800">
                    {'15/45'}
                  </Text>
                </View>
              </View>
              <View style={styles.ordersBoxView}>
                <View style={styles.ordersBox}>
                  <View style={styles.boxCountView}>
                    <Text size="lg" fontWeight="800">
                      96
                    </Text>
                    <Text size="sm" fontWeight="700" color="text-darkGrey">
                      No. Orders
                    </Text>
                  </View>
                  <View style={styles.boxPercentView}>
                    <View style={styles.percentageView}>
                      <RnImage
                        tintColor={'#666666'}
                        resizeMode="contain"
                        source={images.UpArrow}
                        style={styles.upArrow}
                      />
                      <Text size="xs" color="text-darkGrey">
                        {' 2.34%'}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.revenueBox}>
                  <View style={styles.boxCountView}>
                    <Text size="lg" fontWeight="800">
                      $23,456
                    </Text>
                    <Text size="sm" fontWeight="700" color="text-darkGrey">
                      Revenue
                    </Text>
                  </View>
                  <View style={styles.boxPercentView}>
                    <View style={styles.percentageView}>
                      <RnImage
                        tintColor={'#666666'}
                        resizeMode="contain"
                        source={images.UpArrow}
                        style={styles.upArrow}
                      />
                      <Text size="xs" color="text-darkGrey">
                        {' 2.34%'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <BarChart
                graphTitle="Campaigns Clicks"
                graphContainerStyle={styles.graphContainer}
              />
            </ScrollView>
          </View>
        );
      }

      case 'Orders': {
        return (
          <View style={styles.pageView}>
            <FlatList
              data={[1, 2, 3, 4, 5, 6]}
              keyExtractor={(item, index) => index.toString()}
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
                <View style={styles.listHeader}>
                  <Text fontWeight="800" size="base">
                    24 Bookings
                  </Text>
                </View>
              }
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparator} />
              )}
              renderItem={({item, index}) => {
                return (
                  <CampaignOrderCard
                    status={index == 3 ? 'Cancelled' : 'Pending'}
                    fullWidth={true}
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
          title="Campaign Detail"
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
      </View>
    </Container>
  );
};

const styles = {
  mainView: tw`flex-1 w-full h-full`,
  headerRight: tw`flex-1 w-full h-full flex-row items-center justify-end`,
  headerButton: tw`w-10 h-full items-end justify-center`,
  searchIcon: tw`w-7 h-7`,
  tabContainer: {
    height: '100%',
    marginHorizontal: w(1),
  },
  tabStyle: tw`bg-white`,
  tabLine: tw`bg-primary`,
  focusedLabel: tw`text-base text-black font-bold mx-3`,
  tabLabel: tw`text-base text-darkGrey font-bold mx-3`,
  pageView: tw`flex-1 h-full w-full bg-cultured px-4`,
  profileView: tw`w-full flex-row mt-6`,
  profileImage: tw`w-13 h-13 rounded-lg`,
  devider: tw`w-1 h-5 bg-slate-300`,
  nameView: tw`flex-1 w-full pl-3`,
  dateView: tw`mt-5 items-center w-full h-16 rounded-lg border bg-borderDarkGrey border-stone-300 flex-row `,
  startDateView: tw`flex-1`,
  detailView: tw`flex-row h-17`,
  detailViewSub: tw`h-full justify-center mr-10`,
  ordersBoxView: tw`flex-row h-20 mt-3 w-full gap-5`,
  ordersBox: tw`flex-1 flex-row bg-isabelline rounded-lg`,
  revenueBox: tw`flex-1 flex-row bg-bubbles rounded-lg`,
  boxCountView: tw`flex-6 w-full h-full pt-3.5 pl-4`,
  boxPercentView: tw`flex-4 pt-5 pr-4 h-full w-full`,
  percentageView: tw`h-5 rounded-full flex-row px-1 bg-white justify-center items-center`,
  upArrow: tw`w-2.5 h-2`,
  graphContainer: tw`w-full h-80 bg-white ml-0 mt-5`,
  scrollView: tw`w-full pb-6`,
  itemSeparator: tw`w-full h-5`,
  listHeader: tw`w-full h-14 justify-center`,
};
export default CompaignDetail;
