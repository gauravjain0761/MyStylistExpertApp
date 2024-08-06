import React, {FC, useContext, useEffect, useState} from 'react';
import tw from 'rn-tailwind';
import images from 'images';
import {RootStackParamList} from '..';
import globalStyle from 'globalStyles';
import {commonFontStyle, fontFamily, hp, w, wp} from '../../utils/dimentions';
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
  ActivityIndicator,
  StyleSheet,
  Text as RNText,
} from 'react-native';
import usePackageDetail from './hooks';
import moment from 'moment';
import {AppContext} from 'context';
import {useAppDispatch, useAppSelector} from 'store';
import {getPackageOrders} from '../../Actions/packageAction';
import {appConfig} from '../../../config';
import Color from '../../../assets/color';

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
  const {getpackageorder} = useAppSelector(state => state?.packages);
  const [footerLoading, setFooterLoading] = useState(false);
  const [page, setPage] = useState(1);
  const {
    package_name,
    service_name,
    rate,
    start_date,
    end_date,
    additional_information,
    number_of_package = 0,
    sub_services,
    featured_image,
    discount,
  } = packageDetails?.packageData || {};
  const {packageId} = route.params;
  const [index, setIndex] = useState<number>(0);
  const [routes, setRoutes] = useState<Array<Route>>([
    {key: 'Details', title: 'Details'},
    {key: 'Orders', title: 'Orders'},
  ]);
  const startDate = moment(start_date).format('MMM DD, YYYY');
  const endDate = moment(end_date).format('MMM DD, YYYY');
  const {userDetails} = useContext(AppContext);
  const {_id} = userDetails;
  const dispatch = useAppDispatch();
  const {IMG_URL} = appConfig;

  useEffect(() => {
    getPackageDetail(packageId);
    getOrders();
  }, []);

  const getOrders = () => {
    let obj = {
      data: {
        expertId: _id,
        page: page,
        limit: 10,
      },
      page: page,
      onSuccess: (res: any) => {
        setFooterLoading(false);
        setPage(page + 1);
      },
      onFailure: (Err: any) => {
        setFooterLoading(false);
        console.log('Errr', Err?.data?.message);
      },
    };
    dispatch(getPackageOrders(obj));
  };

  const onEndReached = () => {
    if (getpackageorder?.length > 3) {
      setFooterLoading(true);
      getOrders();
    }
  };

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'Details': {
        return (
          <View style={styles.pageView}>
            <ScrollView
              contentContainerStyle={styles.scrollView}
              showsVerticalScrollIndicator={false}>
              <View style={styles.imageview}>
                <RnImage
                  resizeMode="cover"
                  style={styles.mainImage}
                  source={{uri: `${IMG_URL}/${featured_image}`}}
                />
              </View>
              <RNText style={styles.packageName}>{package_name}</RNText>
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
              <View style={styles.servicesView}>
                {service_name?.map((data, index) => {
                  return (
                    <View key={index} style={styles.serviceItem}>
                      <RNText style={styles.serviceTitle}>
                        {data?.service_name}
                      </RNText>
                    </View>
                  );
                })}
              </View>
              <Text
                size="sm"
                color="text-darkGrey"
                margin="mt-4"
                fontWeight="700">
                {'Additional Information'}
              </Text>
              <Text size="sm" margin="mt-2" fontWeight="600">
                {additional_information}
              </Text>
              <View style={styles.ordersBoxView}>
                <View style={styles.ordersBox}>
                  <View style={styles.boxCountView}>
                    <Text size="lg" fontWeight="800">
                      {discount || 0} {'%'}
                    </Text>
                    <Text size="sm" fontWeight="700" color="text-darkGrey">
                      {'Discount'}
                    </Text>
                  </View>
                </View>
                <View style={styles.revenueBox}>
                  <View style={styles.boxCountView}>
                    <Text size="lg" fontWeight="800">
                      {number_of_package}
                    </Text>
                    <Text size="sm" fontWeight="700" color="text-darkGrey">
                      {'Purchase Limit'}
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        );
      }

      case 'Orders': {
        return (
          <View style={styles.pageView}>
            <FlatList
              data={getpackageorder}
              contentContainerStyle={styles.scrollView}
              style={{flex: 1}}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              onEndReached={onEndReached}
              onEndReachedThreshold={0.5}
              ListHeaderComponent={<View style={styles.listHeader}></View>}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparator} />
              )}
              renderItem={({item, index}) => {
                return (
                  <PackageOrderCard
                    data={item}
                    status={'Pending'}
                    fullWidth={true}
                  />
                );
              }}
            />
            {footerLoading && <ActivityIndicator />}
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
                      {route.title == 'Orders' && getpackageorder?.length
                        ? ` (${getpackageorder?.length})`
                        : null}
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

const styles = StyleSheet.create({
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
  devider: {
    height: hp(18),
    width: wp(2),
    backgroundColor: Color.GreyD9,
  },
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
  listHeader: tw`w-full h-10 justify-center`,
  servicesView: {...tw`w-full flex-row flex-wrap`, marginTop: hp(12)},
  serviceItem: {
    borderRadius: 50,
    backgroundColor: Color.InputGrey,
    borderWidth: 1,
    borderColor: Color.GreyEB,
    marginRight: wp(5),
    marginBottom: hp(10),
  },
  mainImage: {
    width: '100%',
    height: hp(277),
    borderRadius: wp(8),
  },
  imageview: {
    borderRadius: wp(8),
    overflow: 'hidden',
    marginTop: hp(16),
  },
  packageName: {
    ...commonFontStyle(fontFamily.medium, 20, Color?.Black),
    marginTop: hp(35),
  },
  serviceTitle: {
    paddingHorizontal: wp(20),
    paddingVertical: hp(10),
    ...commonFontStyle(fontFamily.medium, 15, Color?.Black),
  },
});
export default PackageDetail;
