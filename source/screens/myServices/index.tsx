import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import Container from '../../components/container';
import Header from '../../components/header';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {hp, screen_width, wp} from '../../utils/dimentions';
import Color from '../../../assets/color';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '..';
import {RouteProp, useIsFocused, useNavigation} from '@react-navigation/native';
import images from 'images';
import Collapse from '../../components/collapse';
import ServiceCard from '../../components/servicecard';
import {Services} from 'AppConstants';
import BottomTab from '../../components/bottomTabs';
import FloatingButton from '../../components/floatingbutton';
import {useAppDispatch, useAppSelector} from 'store';
import {appConfig} from '../../../config';
import {AppContext} from 'context';
import {getMyService} from '../../Actions/servicesAction';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MyServices'>;
  route: RouteProp<RootStackParamList, 'MyServices'>;
};

const MyServices: FC<Props> = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {bannerImage} = useAppSelector(state => state?.home);
  const mainservices = useAppSelector(state => state?.service?.services);
  const navigation = useNavigation();
  const [banner, setbanner] = useState(bannerImage);
  const [service, setServices] = useState([]);
  const {IMG_URL} = appConfig;
  const {userDetails, setLoading} = useContext(AppContext);
  const {_id} = userDetails;
  const dispatch = useAppDispatch();

  const {services} = mainservices || {};
  const isFocused = useIsFocused();

  useEffect(() => {
    if (mainservices.length || Object.values(mainservices).length) {
      setLoading(false);
    } else {
      setLoading(true);
    }
    GetServices();
  }, [isFocused]);

  useEffect(() => {
    setbanner(bannerImage);
    setServices(mainservices?.services);
  }, [bannerImage, mainservices]);

  const GetServices = () => {
    let obj = {
      id: _id,
      onSuccess: (res: any) => {
        setLoading(false);
      },
      onFailure: (Err: any) => {
        setLoading(false);
      },
    };
    dispatch(getMyService(obj));
  };

  const onSnapToItem = (index: React.SetStateAction<number>) => {
    setActiveIndex(index);
  };

  const scrollRef = useRef(null);

  const onPresstoTop = () => {
    scrollRef?.current?.scrollTo({animated: true, offset: 0});
  };

  const uploadImageHandler = (item: any) => {
    navigation?.navigate('ServiceUpload', {data: item});
  };

  return (
    <Container>
      <>
        <Header title="My Services" />
        <ScrollView
          ref={scrollRef}
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.carousel_container}>
            <Carousel
              layout={'default'}
              data={banner}
              sliderWidth={screen_width}
              itemWidth={screen_width}
              inactiveSlideScale={2}
              renderItem={({item}: any) => {
                return (
                  <Image
                    resizeMode="stretch"
                    source={{uri: `${IMG_URL}/${item?.fileName}`}}
                    style={styles?.carousel_img}
                  />
                );
              }}
              onSnapToItem={onSnapToItem}
            />
          </View>
          <Pagination
            // @ts-ignore
            dotsLength={banner?.length}
            activeDotIndex={activeIndex}
            containerStyle={styles?.pagination_container}
            dotStyle={styles?.dotStyle}
            inactiveDotStyle={styles?.inactiveDotStyle}
            inactiveDotScale={1}
            dotContainerStyle={styles?.dotContainerStyle}
          />
          <View style={styles.topBoxsWrapper}>
            <Collapse
              title="Gents Services"
              children={
                <>
                  <FlatList
                    data={service?.flatMap((service: any) => {
                      return service.sub_services.map((sub_service: any) => {
                        sub_service['service_id'] = service.service_id;
                        return sub_service;
                      });
                    })}
                    contentContainerStyle={styles.container}
                    ItemSeparatorComponent={() => (
                      <View style={styles.separator}></View>
                    )}
                    ListFooterComponent={
                      services?.length >= 3 && (
                        <FloatingButton onPress={onPresstoTop} />
                      )
                    }
                    ListFooterComponentStyle={{
                      paddingBottom: 1,
                    }}
                    renderItem={({item, index}) => {
                      return (
                        <ServiceCard
                          key={index}
                          data={item}
                          onPress={() => uploadImageHandler(item)}
                        />
                      );
                    }}
                  />
                </>
              }
            />
          </View>
        </ScrollView>
        <BottomTab />
      </>
    </Container>
  );
};

export default MyServices;

const styles = StyleSheet.create({
  carousel_container: {
    width: '100%',
    borderRadius: wp(12),
    overflow: 'hidden',
    backgroundColor: Color?.White,
    height: hp(256),
    marginTop: 0,
  },
  carousel_img: {
    width: '100%',
    height: hp(257),
  },
  pagination_container: {
    justifyContent: 'center',
    alignSelf: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: hp(13),
  },
  dotContainerStyle: {
    margin: 0,
    marginHorizontal: wp(4),
  },
  inactiveDotStyle: {
    backgroundColor: Color?.GreyD9,
  },
  dotStyle: {
    width: wp(6),
    height: wp(6),
    borderRadius: 5,
    backgroundColor: Color?.Grey7A,
  },
  topBoxsWrapper: {
    marginTop: hp(21),
  },
  container: {
    marginTop: hp(5),
  },
  separator: {
    height: hp(1),
    backgroundColor: Color?.GreyEB,
  },
});
