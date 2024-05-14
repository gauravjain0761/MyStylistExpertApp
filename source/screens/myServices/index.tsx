import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useRef, useState} from 'react';
import Container from '../../components/container';
import Header from '../../components/header';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {hp, screen_width, wp} from '../../utils/dimentions';
import Color from '../../../assets/color';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '..';
import {RouteProp, useNavigation} from '@react-navigation/native';
import images from 'images';
import Collapse from '../../components/collapse';
import ServiceCard from '../../components/servicecard';
import {Services} from 'AppConstants';
import BottomTab from '../../components/bottomTabs';
import FloatingButton from '../../components/floatingbutton';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MyServices'>;
  route: RouteProp<RootStackParamList, 'MyServices'>;
};

const banner = [
  {
    id: 1,
    image: images?.offerbanner,
  },
  {
    id: 2,
    image: images?.offerbanner,
  },
  {
    id: 3,
    image: images?.offerbanner,
  },
];

const MyServices: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const navigation = useNavigation();

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
                    source={item?.image}
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
                    keyExtractor={item => item?.id.toString()}
                    data={Services}
                    contentContainerStyle={styles.container}
                    ItemSeparatorComponent={() => (
                      <View style={styles.separator}></View>
                    )}
                    renderItem={({item, index}) => {
                      return (
                        <ServiceCard
                          key={index}
                          title={item?.name}
                          image={item?.images}
                          price={item?.price}
                          onPress={() => uploadImageHandler(item)}
                        />
                      );
                    }}
                  />
                  <FloatingButton onPress={onPresstoTop} />
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
