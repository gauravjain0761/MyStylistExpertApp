import React, {FC} from 'react';
import tw from 'rn-tailwind';
import {Text, Button} from 'components';
import {
  ImageBackground,
  Pressable,
  Image as RnImage,
  StyleSheet,
  View,
  Text as RNText,
  Image,
} from 'react-native';
import {CampaignList} from 'types';
import moment from 'moment';
import {
  commonFontStyle,
  fontFamily,
  hp,
  screen_width,
  wp,
} from '../utils/dimentions';
import Color from '../../assets/color';
import images from 'images';
import {DASHED} from 'AppConstants';

interface Props {
  cardType: 'Pending' | 'Accepted' | 'Decline' | 'Active';
  onPressCard?: (campaignId: string) => void;
  data: CampaignList;
}

const CompaignsCard: FC<Props> = ({cardType, data, onPressCard}) => {
  // const {campaign, campaignstatus} = data;

  const {
    _id,
    title,
    startDate,
    endDate,
    campaignCode,
    featured_image,
    service_name,
    price,
  } = data;

  const sDate = moment(startDate).format('MMM DD, YYYY');
  const eDate = moment(endDate).format('MMM DD, YYYY');
  const services = service_name.map(data => data.service_name);
  return (
    <Pressable
      onPress={() => onPressCard && onPressCard(_id)}
      style={styles.compaingnsCard}>
      <ImageBackground
        resizeMode="stretch"
        source={images?.cardbg}
        style={styles.cardbg}>
        <View style={styles.cardProfileView}>
          <RnImage
            resizeMode="contain"
            style={styles.cardProfile}
            source={featured_image}
          />
          <View style={styles.nameView}>
            <RNText style={styles?.title}>{title}</RNText>
            <RNText style={styles.code}>{`Code: ${campaignCode}`}</RNText>
            <RNText style={styles.price}>{`Price: ₹${price}`}</RNText>
          </View>
        </View>
        <View style={styles.cardDetailRow}>
          <View style={styles.cardDetail}>
            <RNText style={styles.servicelabel}>Services</RNText>
            <RNText style={styles.service}>{services.join(',')}</RNText>
          </View>
        </View>
        <View style={styles.daterow}>
          <View style={styles.timecontainer}>
            <Image style={styles.iconstyle} source={images?.CalendarIcon} />
            <View>
              <RNText style={styles?.timelabel}>Start Date</RNText>
              <RNText style={styles.time}>{sDate}</RNText>
            </View>
          </View>
          <View style={styles.timecontainer}>
            <Image style={styles.iconstyle} source={images?.CalendarIcon} />
            <View>
              <RNText style={styles?.timelabel}>End Date</RNText>
              <RNText style={styles.time}>{eDate}</RNText>
            </View>
          </View>
        </View>
        <View style={[styles.cardDetailRow, styles.btncontainer]}>
          {(cardType === 'Pending' || cardType === 'Active') && (
            <Button
              onPress={() => {}}
              lable={cardType === 'Active' ? 'Accepted' : 'Decline'}
              labelFontWeight="700"
              labelColor="text-darkGrey"
              style={tw`flex-1 w-full bg-borderDarkGrey`}
            />
          )}
          {cardType === 'Pending' && (
            <Button
              onPress={() => {}}
              lable={'Accept'}
              labelFontWeight="700"
              style={tw`flex-1 w-full bg-primary`}
            />
          )}
          {(cardType === 'Accepted' || cardType === 'Decline') && (
            <Button
              onPress={() => {}}
              lable={cardType}
              labelFontWeight="700"
              style={tw`flex-1 w-full bg-borderDarkGrey`}
            />
          )}
        </View>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  compaingnsCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(26),
  },
  cardProfileView: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingTop: hp(22),
    paddingHorizontal: wp(20),
  },
  cardProfile: {
    width: wp(80),
    height: wp(80),
    borderRadius: 10,
  },
  nameView: {
    marginLeft: wp(19),
    justifyContent: 'space-between',
  },
  cardDetailRow: {
    ...tw`w-full flex-row gap-4`,
    paddingHorizontal: wp(20),
    marginTop: hp(20),
  },
  cardDetail: tw`flex-1 w-full`,
  activeView: tw`w-18 mt-2 h-8 rounded-full bg-aeroBlue absolute right-13`,
  cardbg: {
    width: 'auto',
    height: 'auto',
    resizeMode: 'contain',
    overflow: 'hidden',
    borderRadius: 8,
  },
  title: {
    ...commonFontStyle(fontFamily.semi_bold, 24, Color?.Black),
    lineHeight: hp(29.05),
  },
  code: {
    ...commonFontStyle(fontFamily.medium, 15, Color?.Grey6B),
  },
  price: {
    ...commonFontStyle(fontFamily.medium, 18, Color?.Grey2E),
  },
  servicelabel: {
    ...commonFontStyle(fontFamily.medium, 13, Color?.Grey6B),
    lineHeight: hp(16),
  },
  service: {
    ...commonFontStyle(fontFamily.medium, 15, Color?.Black),
    marginTop: hp(3),
  },
  daterow: {
    flexDirection: 'row',
    marginTop: hp(10),
    marginBottom: hp(20),
    width: '100%',
    marginHorizontal: wp(16),
    gap: wp(44),
  },
  dots: tw`flex-1 w-full border-dashed border`,
  ellipseView: {
    justifyContent: 'center',
    height: hp(10),
  },
  btncontainer: {
    marginBottom: hp(20),
  },
  dashed: {
    ...commonFontStyle(fontFamily.regular, 16, Color?.GreyB0),
    width: wp(screen_width * 0.75),
    alignSelf: 'center',
  },
  timelabel: {
    ...commonFontStyle(fontFamily.medium, 13, Color?.Grey6B),
  },
  time: {
    ...commonFontStyle(fontFamily.medium, 15, Color?.Black),
    lineHeight: hp(19),
    marginTop: hp(3),
  },
  timecontainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconstyle: {
    width: wp(28),
    height: wp(28),
    marginRight: wp(6),
  },
});

export default CompaignsCard;

// import React, {FC} from 'react';
// import tw from 'rn-tailwind';
// import {Text, Button} from 'components';
// import {Pressable, Image as RnImage, View} from 'react-native';
// import {CampaignList} from 'types';
// import moment from 'moment';

// interface Props {
//   cardType: 'Pending' | 'Accepted' | 'Decline' | 'Active';
//   onPressCard?: (campaignId: string) => void;
//   data: CampaignList;
// }

// const CompaignsCard: FC<Props> = ({cardType, data, onPressCard}) => {
//   const {campaign, campaignstatus} = data;

//   const {
//     _id,
//     title,
//     startDate,
//     endDate,
//     campaignCode,
//     featured_image,
//     service_name,
//   } = campaign;

//   const sDate = moment(startDate).format('MMM DD, YYYY');
//   const eDate = moment(endDate).format('MMM DD, YYYY');
//   const services = service_name.map(data => data.service_name);
//   return (
//     <Pressable
//       onPress={() => onPressCard && onPressCard(_id)}
//       style={styles.compaingnsCard}>
//       <View style={styles.cardProfileView}>
//         <RnImage
//           resizeMode="contain"
//           style={styles.cardProfile}
//           source={{
//             uri: featured_image,
//           }}
//         />
//         <View style={styles.nameView}>
//           <Text size="base" fontWeight="800" margin="capitalize">
//             {title}
//           </Text>
//           <Text size="sm" fontWeight="800" color="text-darkGrey">
//             {`Code: ${campaignCode}`}
//           </Text>
//           {cardType === 'Active' && (
//             <Button
//               style={styles.activeView}
//               onPress={() => {}}
//               lable="Active"
//               labelColor="text-green"
//             />
//           )}
//         </View>
//       </View>
//       <View style={styles.cardDetailRow}>
//         <View style={styles.cardDetail}>
//           <Text size="sm" fontWeight="800" color="text-darkGrey">
//             Services
//           </Text>
//           <Text
//             numberOfLines={2}
//             size="sm"
//             margin="mt-1"
//             fontWeight="500"
//             numberOfLines={2}>
//             {services.join(',')}
//           </Text>
//         </View>
//         <View style={styles.cardDetail}>
//           <Text size="sm" fontWeight="800" color="text-darkGrey">
//             Price per Service
//           </Text>
//           <Text size="sm" margin="mt-1" fontWeight="500" numberOfLines={2}>
//             {'Rs. 200'}
//           </Text>
//         </View>
//       </View>
//       <View style={styles.cardDetailRow}>
//         <View style={styles.cardDetail}>
//           <Text size="sm" fontWeight="800" color="text-darkGrey">
//             Start Date
//           </Text>
//           <Text size="sm" margin="mt-1" fontWeight="500" numberOfLines={2}>
//             {sDate}
//           </Text>
//         </View>
//         <View style={styles.cardDetail}>
//           <Text size="sm" fontWeight="800" color="text-darkGrey">
//             End Date
//           </Text>
//           <Text size="sm" margin="mt-1" fontWeight="500" numberOfLines={2}>
//             {eDate}
//           </Text>
//         </View>
//       </View>
//       <View style={styles.cardDetailRow}>
//         {(cardType === 'Pending' || cardType === 'Active') && (
//           <Button
//             onPress={() => {}}
//             lable={cardType === 'Active' ? 'Accepted' : 'Decline'}
//             labelFontWeight="700"
//             labelColor="text-darkGrey"
//             style={tw`flex-1 w-full bg-borderDarkGrey`}
//           />
//         )}
//         {cardType === 'Pending' && (
//           <Button
//             onPress={() => {}}
//             lable={'Accept'}
//             labelFontWeight="700"
//             style={tw`flex-1 w-full bg-primary`}
//           />
//         )}
//         {(cardType === 'Accepted' || cardType === 'Decline') && (
//           <Button
//             onPress={() => {}}
//             lable={cardType}
//             labelFontWeight="700"
//             style={tw`flex-1 w-full bg-primary`}
//           />
//         )}
//       </View>
//     </Pressable>
//   );
// };

// const styles = {
//   compaingnsCard: tw`w-full bg-white p-4 rounded-lg`,
//   cardProfileView: tw`flex-row w-full items-center`,
//   cardProfile: tw`w-11 h-11 rounded-lg`,
//   nameView: tw`w-full ml-2`,
//   cardDetailRow: tw`w-full flex-row mt-4 gap-4`,
//   cardDetail: tw`flex-1 w-full`,
//   activeView: tw`w-18 mt-2 h-8 rounded-full bg-aeroBlue absolute right-13`,
// };

// export default CompaignsCard;
