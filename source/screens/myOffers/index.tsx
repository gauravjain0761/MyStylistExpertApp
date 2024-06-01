import React, {FC, useContext, useEffect, useState} from 'react';
import {Pressable, View, FlatList, StyleSheet, Text} from 'react-native';
import {Container, Header, Image, OffersCard} from 'components';
import globalStyle from 'globalStyles';
import tw from 'rn-tailwind';
import images from 'images';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '..';
import {RouteProp} from '@react-navigation/native';
import useMyOffers from './hooks';
import {commonFontStyle, fontFamily, hp, wp} from '../../utils/dimentions';
import Color from '../../../assets/color';
import {useAppDispatch, useAppSelector} from 'store';
import {getallOffers} from '../../Actions/offersAction';
import {AppContext} from 'context';
import {NativeToast} from '../../utils/toast';
import {endPoints} from '../../../config';

const cardsColor = {
  1: '#F7F5EB',
  2: '#CCF0FF',
  3: '#FFE1E4',
  4: '#F7E6E6',
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MyOffers'>;
  route: RouteProp<RootStackParamList, 'MyOffers'>;
};

const MyOffers: FC<Props> = ({navigation}) => {
  // const {getMyOffers, allMyOffers} = useMyOffers();
  const dispatch = useAppDispatch();
  const {setLoading, userDetails} = useContext(AppContext);
  const {getoffers} = useAppSelector(state => state?.offers);
  const [offers, setOffers] = useState(getoffers);

  const getMyOffers = (isLoading: boolean) => {
    setLoading(isLoading);
    let obj = {
      url: `${endPoints?.getAllOffersByUser}/${userDetails?._id}`,
      params: {
        limit: 4,
        page: 1,
      },
      onSuccess: (res: any) => {
        setLoading(false);
      },
      onFailure: (Err: any) => {
        setLoading(false);
        NativeToast(Err?.data?.message);
      },
    };
    dispatch(getallOffers(obj));
  };

  useEffect(() => {
    setOffers(getoffers);
  }, [getoffers]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (getoffers.length || Object.values(getoffers).length > 0) {
        getMyOffers(false);
      } else {
        getMyOffers(true);
      }
    });
    return unsubscribe;
  }, [navigation]);

  console.log('offererere', offers);

  return (
    <Container>
      <View style={globalStyle.container}>
        <Header
          title={`Offers (${offers?.offers?.length || '0'})`}
          rightView={
            <View style={styles.headerRight}>
              <Pressable
                style={[styles.headerButton, globalStyle.bothContentCenter]}>
                <Image
                  style={styles.headerIcon}
                  source={images.headerSearch}
                  resizeMode="contain"
                />
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate('CreateOffer')}
                style={[styles.addNewButton, globalStyle.bothContentCenter]}>
                <Image
                  style={styles.plusIcon}
                  source={images.add}
                  resizeMode="contain"
                />
                <Text style={styles.btnTitle}>{'Add New'}</Text>
              </Pressable>
            </View>
          }
        />
        <View style={styles.mainView}>
          <FlatList
            data={offers?.offers}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listView}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <Text size="base" style={tw`self-center mt-70`}>
                {'No Offer found'}
              </Text>
            }
            ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
            renderItem={({item, index}) => {
              const colorIndex: number = (index % 4) + 1;
              return (
                <OffersCard
                  key={index}
                  data={item}
                  onPressCard={(offerId: string) =>
                    navigation.navigate('OfferDetail', {offerId})
                  }
                  cardColor={cardsColor[colorIndex]}
                />
              );
            }}
          />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    ...tw`flex-1 w-full h-full flex-row items-center justify-end`,
    columnGap: wp(10),
  },
  headerButton: tw`w-10 h-full`,
  headerIcon: {
    width: wp(28),
    height: wp(28),
  },
  plusIcon: {
    width: wp(18),
    height: wp(18),
  },
  addNewButton: {
    borderRadius: 5,
    columnGap: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color?.Green,
    paddingHorizontal: hp(16.5),
  },
  mainView: tw`flex-1 px-4 w-full bg-cultured`,
  listView: tw`py-4`,
  listSeparator: tw`h-4 w-full`,
  btnTitle: {
    ...commonFontStyle(fontFamily.medium, 14, Color?.Black),
    lineHeight: hp(22),
    paddingVertical: hp(7),
  },
});

export default MyOffers;

// import React, {FC, useEffect} from 'react';
// import {Pressable, View, FlatList} from 'react-native';
// import {Container, Text, Header, Image, OffersCard} from 'components';
// import globalStyle from 'globalStyles';
// import tw from 'rn-tailwind';
// import images from 'images';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {RootStackParamList} from '..';
// import {RouteProp} from '@react-navigation/native';
// import useMyOffers from './hooks';

// const cardsColor = {
//   1: '#F7F5EB',
//   2: '#CCF0FF',
//   3: '#FFE1E4',
//   4: '#F7E6E6',
// };

// type Props = {
//   navigation: NativeStackNavigationProp<RootStackParamList, 'MyOffers'>;
//   route: RouteProp<RootStackParamList, 'MyOffers'>;
// };

// const MyOffers: FC<Props> = ({navigation}) => {
//   const {getMyOffers, allMyOffers} = useMyOffers();

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       getMyOffers();
//     });

//     return unsubscribe;
//   }, [navigation]);

//   return (
//     <Container>
//       <View style={globalStyle.container}>
//         <Header
//           title={`Offers (${allMyOffers?.length || '0'})`}
//           rightView={
//             <View style={styles.headerRight}>
//               <Pressable
//                 style={[styles.headerButton, globalStyle.bothContentCenter]}>
//                 <Image
//                   style={styles.searchIcon}
//                   source={images.Search}
//                   resizeMode="contain"
//                 />
//               </Pressable>
//               <Pressable
//                 style={[styles.headerButton, globalStyle.bothContentCenter]}>
//                 <Image
//                   style={styles.searchIcon}
//                   source={images.CalendarIcon}
//                   resizeMode="contain"
//                 />
//               </Pressable>
//               <Pressable
//                 onPress={() => navigation.navigate('CreateOffer')}
//                 style={[styles.addNewButton, globalStyle.bothContentCenter]}>
//                 <Image
//                   style={styles.plusIcon}
//                   source={images.PlusIcon}
//                   resizeMode="contain"
//                 />
//                 <Text size="sm" fontWeight="800" color="text-black">
//                   {'Add New'}
//                 </Text>
//               </Pressable>
//             </View>
//           }
//         />
//         <View style={styles.mainView}>
//           <FlatList
//             data={allMyOffers}
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={styles.listView}
//             keyExtractor={(item, index) => index.toString()}
//             ListEmptyComponent={
//               <Text size="base" style={tw`self-center mt-70`}>
//                 {'No Offer found'}
//               </Text>
//             }
//             ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
//             renderItem={({item, index}) => {
//               const colorIndex: number = (index % 4) + 1;
//               return (
//                 <OffersCard
//                   key={index}
//                   data={item}
//                   onPressCard={(offerId: string) =>
//                     navigation.navigate('OfferDetail', {offerId})
//                   }
//                   cardColor={cardsColor[colorIndex]}
//                 />
//               );
//             }}
//           />
//         </View>
//       </View>
//     </Container>
//   );
// };

// const styles = {
//   headerRight: tw`flex-1 w-full h-full flex-row items-center justify-end`,
//   headerButton: tw`w-10 h-full`,
//   searchIcon: tw`w-6.5 h-6.5`,
//   plusIcon: tw`w-3.5 h-3.5 mr-1`,
//   addNewButton: tw`w-23 h-8 ml-1.5 flex-row rounded-full bg-primary`,
//   mainView: tw`flex-1 px-4 w-full bg-cultured`,
//   listView: tw`py-4`,
//   listSeparator: tw`h-4 w-full`,
// };

// export default MyOffers;
