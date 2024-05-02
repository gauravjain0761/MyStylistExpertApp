import React, {FC, useEffect, useState} from 'react';
import tw from 'rn-tailwind';
import images from 'images';
import {RootStackParamList} from '..';
import globalStyle from 'globalStyles';
import {w} from '../../utils/dimentions';
import {RouteProp} from '@react-navigation/native';
import {TabView, TabBar, Route} from 'react-native-tab-view';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Text,
  Header,
  Image,
  BarChart,
  Container,
  PackageOrderCard,
} from 'components';
import {
  View,
  FlatList,
  Pressable,
  ScrollView,
  Image as RnImage,
} from 'react-native';
import usePackageDetail from './hooks';
import moment from 'moment';

const initialLayout = {
  height: 0,
  width: w(100),
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PackageDetail'>;
  route: RouteProp<RootStackParamList, 'PackageDetail'>;
};

const PackageDetail: FC<Props> = ({route}) => {
  const {getPackageDetail, packageDetails} = usePackageDetail();
  const {start_date, end_date, service_name, number_of_package} =
    packageDetails;
  const {packageId} = route.params;
  const [index, setIndex] = useState<number>(0);
  const [routes, setRoutes] = useState<Array<Route>>([
    {key: 'Details', title: 'Details'},
    {key: 'Orders', title: 'Orders'},
  ]);
  const startDate = moment(start_date).format('MMM DD, YYYY');
  const endDate = moment(end_date).format('MMM DD, YYYY');
  useEffect(() => {
    getPackageDetail(packageId);
  }, []);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'Details': {
        return (
          <View style={styles.pageView}>
            <ScrollView
              contentContainerStyle={styles.scrollView}
              showsVerticalScrollIndicator={false}>
              <View style={styles.dateView}>
                <View
                  style={[styles.startDateView, globalStyle.bothContentCenter]}>
                  <Text size="sm" color="text-darkGrey" fontWeight="700">
                    {'Start Date'}
                  </Text>
                  <Text size="sm" fontWeight="700">
                    {startDate}
                  </Text>
                </View>
                <View style={styles.devider} />
                <View
                  style={[styles.startDateView, globalStyle.bothContentCenter]}>
                  <Text size="sm" color="text-darkGrey" fontWeight="700">
                    {'End Date'}
                  </Text>
                  <Text size="sm" fontWeight="700">
                    {endDate}
                  </Text>
                </View>
              </View>
              <Text
                size="sm"
                color="text-darkGrey"
                margin="mt-4"
                fontWeight="700">
                Services
              </Text>
              <Text
                size="sm"
                color="text-darkGrey"
                margin="mt-4"
                fontWeight="700">
                {'About this campaign'}
              </Text>
              <View style={styles.servicesView}>
                {service_name?.map((data, index) => {
                  return (
                    <View key={index} style={styles.serviceItem}>
                      <Text size="sm" fontWeight="800">
                        {data.category_name}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <Text size="sm" margin="mt-2" fontWeight="600">
                {
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                }
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
                    {`23/${number_of_package}`}
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
                    {`15/${number_of_package}`}
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
                showDate={true}
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
              contentContainerStyle={styles.scrollView}
              keyExtractor={(item, index) => index.toString()}
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
                return <PackageOrderCard status={'Pending'} fullWidth={true} />;
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
          title="Package Detail"
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
  devider: tw`w-1 h-5 bg-slate-300`,
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
  servicesView: tw`w-full flex-row flex-wrap`,
  serviceItem: tw`h-9 px-3 justify-center rounded-full mr-3`,
};
export default PackageDetail;
