import React, {FC} from 'react';
import {Pressable, StyleSheet, View, Text as RNText} from 'react-native';
import {Text} from 'components';
import globalStyle from 'globalStyles';
import tw from 'rn-tailwind';
import {DASHED} from 'AppConstants';
import {Offer} from 'types';
import moment from 'moment';
import {commonFontStyle, fontFamily, hp} from '../utils/dimentions';
import Color from '../../assets/color';

interface Props {
  data: Offer;
  cardColor: string;
  onPressCard: (offerId: string) => void;
}

const OffersCard: FC<Props> = ({onPressCard, cardColor = '#F7F5EB', data}) => {
  const {
    _id: offerId,
    end_date,
    service_name,
    offer_name,
    number_of_offers,
    accepted_offers,
  } = data;

  const categoryNames = service_name.map(category => category.category_name);
  const commaSeparatedNames = categoryNames.join(', ');
  const expiryDate = moment(end_date).format('DD MMM, YYYY');
  return (
    <Pressable
      onPress={() => {
        onPressCard && onPressCard(offerId);
      }}
      style={[styles.cardContainer, {backgroundColor: cardColor}]}>
      <View style={styles.cardDetailWrapper}>
        <RNText style={styles.offername}>{offer_name}</RNText>
        <RNText style={styles.servicelabel}>{commaSeparatedNames}</RNText>
        <View style={styles.cardDetail}>
          <View style={styles.priceView}>
            <RNText style={styles?.pricelable}>Offer price</RNText>
            <Text size="lg" fontWeight={'700'} color="text-black">
              $36
            </Text>
          </View>
          <View style={styles.priceView}>
            <RNText style={styles?.pricelable}>Bookings</RNText>
            <Text size="lg" fontWeight={'700'} color="text-black">
              {`${accepted_offers}/${number_of_offers}`}
            </Text>
          </View>
          <View style={styles.priceView}>
            <RNText style={styles?.pricelable}>Availed</RNText>
            <Text size="lg" fontWeight={'700'} color="text-black">
              {`${number_of_offers - accepted_offers}/${number_of_offers}`}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.ellipseView}>
        <View style={styles.leftEllipse}></View>
        <RNText style={styles.dashed}>{DASHED}</RNText>
        <View style={styles.rightEllipse}></View>
      </View>
      <View style={styles.expiryView}>
        <RNText style={styles.expirylabel}>{'Expiring: '}</RNText>
        <RNText style={styles.expiryTitle}>{expiryDate}</RNText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: tw`w-full rounded-lg`,
  cardDetail: tw`flex-row`,
  priceView: {...tw`w-27`},
  dots: tw`flex-1 w-full border-dashed border`,
  leftEllipse: tw`h-5 w-5 bg-cultured rounded-full left--2.5`,
  rightEllipse: tw`h-5 w-5 bg-cultured rounded-full right--2.5`,
  ellipseView: {
    ...tw`w-full flex-row justify-between h-5 items-center mt-0 overflow-hidden`,
  },
  cardDetailWrapper: tw`px-5 pt-5`,
  expiryView: {
    ...tw`w-full flex-row pl-5`,
    marginTop: hp(10),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(21),
  },
  dashed: {
    ...commonFontStyle(fontFamily.regular, 16, Color?.GreyB0),
    width: '90%',
  },
  offername: {
    ...commonFontStyle(fontFamily.RobotoBold, 16, Color?.Black),
    lineHeight: hp(22),
  },
  pricelable: {
    ...commonFontStyle(fontFamily.medium, 14, Color?.Grey66),
    marginTop: hp(12),
  },
  servicelabel: {
    ...commonFontStyle(fontFamily.medium, 14, Color?.Grey66),
    lineHeight: hp(22),
  },
  expiryTitle: {
    ...commonFontStyle(fontFamily.RobotoBold, 14, Color?.Black),
    lineHeight: hp(22),
  },
  expirylabel: {
    ...commonFontStyle(fontFamily.RobotoRegular, 14, Color?.Grey66),
    lineHeight: hp(22),
  },
});

export default OffersCard;

// import React, {FC} from 'react';
// import {Pressable, View} from 'react-native';
// import {Text} from 'components';
// import globalStyle from 'globalStyles';
// import tw from 'rn-tailwind';
// import {DASHED} from 'AppConstants';
// import {Offer} from 'types';
// import moment from 'moment';

// interface Props {
//   data: Offer;
//   cardColor: string;
//   onPressCard: (offerId: string) => void;
// }

// const OffersCard: FC<Props> = ({onPressCard, cardColor = '#F7F5EB', data}) => {
//   const {
//     _id: offerId,
//     end_date,
//     service_name,
//     offer_name,
//     number_of_offers,
//     accepted_offers,
//   } = data;

//   const categoryNames = service_name.map(category => category.category_name);
//   const commaSeparatedNames = categoryNames.join(', ');
//   const expiryDate = moment(end_date).format('DD MMM, YYYY');
//   return (
//     <Pressable
//       onPress={() => {
//         onPressCard && onPressCard(offerId);
//       }}
//       style={[styles.cardContainer, {backgroundColor: cardColor}]}>
//       <View style={styles.cardDetailWrapper}>
//         <Text size="base" fontWeight="800" style={tw`capitalize`}>
//           {offer_name}
//         </Text>
//         <Text numberOfLines={1} size="sm" margin="mt-1" color="text-darkGrey">
//           {commaSeparatedNames}
//         </Text>
//         <View style={styles.cardDetail}>
//           <View style={styles.priceView}>
//             <Text size="sm" color="text-darkGrey">
//               Offer price
//             </Text>
//             <Text size="lg" fontWeight={'700'} color="text-black">
//               $36
//             </Text>
//           </View>
//           <View style={styles.priceView}>
//             <Text size="sm" color="text-darkGrey">
//               Bookings
//             </Text>
//             <Text size="lg" fontWeight={'700'} color="text-black">
//               {`${accepted_offers}/${number_of_offers}`}
//             </Text>
//           </View>
//           <View style={styles.priceView}>
//             <Text size="sm" color="text-darkGrey">
//               Availed
//             </Text>
//             <Text size="lg" fontWeight={'700'} color="text-black">
//               {`${number_of_offers - accepted_offers}/${number_of_offers}`}
//             </Text>
//           </View>
//         </View>
//       </View>
//       <View style={styles.ellipseView}>
//         <View style={styles.leftEllipse}></View>
//         <Text
//           style={tw`flex-1`}
//           numberOfLines={1}
//           ellipsizeMode="clip"
//           size="sm">
//           {DASHED}
//         </Text>
//         <View style={styles.rightEllipse}></View>
//       </View>
//       <View style={styles.expiryView}>
//         <Text color="text-darkGrey" size="sm">
//           {'Expiring: '}
//         </Text>
//         <Text color="text-black" size="sm">
//           {expiryDate}
//         </Text>
//       </View>
//     </Pressable>
//   );
// };

// const styles = {
//   cardContainer: tw`w-full h-50 rounded-lg`,
//   cardDetail: tw`flex-row my-2`,
//   priceView: tw`w-27`,
//   dots: tw`flex-1 w-full border-dashed border`,
//   leftEllipse: tw`h-5 w-5 bg-cultured rounded-full left--2.5`,
//   rightEllipse: tw`h-5 w-5 bg-cultured rounded-full right--2.5`,
//   ellipseView: tw`w-full flex-row justify-between h-5 items-center mt-0 overflow-hidden`,
//   cardDetailWrapper: tw`px-5 pt-5`,
//   expiryView: tw`w-full flex-row mt-1.5 pl-5`,
// };

// export default OffersCard;
