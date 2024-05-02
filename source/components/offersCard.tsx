import React, {FC} from 'react';
import {Pressable, View} from 'react-native';
import {Text} from 'components';
import globalStyle from 'globalStyles';
import tw from 'rn-tailwind';
import {DASHED} from 'AppConstants';
import {Offer} from 'types';
import moment from 'moment';

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
        <Text size="base" fontWeight="800" style={tw`capitalize`}>
          {offer_name}
        </Text>
        <Text numberOfLines={1} size="sm" margin="mt-1" color="text-darkGrey">
          {commaSeparatedNames}
        </Text>
        <View style={styles.cardDetail}>
          <View style={styles.priceView}>
            <Text size="sm" color="text-darkGrey">
              Offer price
            </Text>
            <Text size="lg" fontWeight={'700'} color="text-black">
              $36
            </Text>
          </View>
          <View style={styles.priceView}>
            <Text size="sm" color="text-darkGrey">
              Bookings
            </Text>
            <Text size="lg" fontWeight={'700'} color="text-black">
              {`${accepted_offers}/${number_of_offers}`}
            </Text>
          </View>
          <View style={styles.priceView}>
            <Text size="sm" color="text-darkGrey">
              Availed
            </Text>
            <Text size="lg" fontWeight={'700'} color="text-black">
              {`${number_of_offers - accepted_offers}/${number_of_offers}`}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.ellipseView}>
        <View style={styles.leftEllipse}></View>
        <Text
          style={tw`flex-1`}
          numberOfLines={1}
          ellipsizeMode="clip"
          size="sm">
          {DASHED}
        </Text>
        <View style={styles.rightEllipse}></View>
      </View>
      <View style={styles.expiryView}>
        <Text color="text-darkGrey" size="sm">
          {'Expiring: '}
        </Text>
        <Text color="text-black" size="sm">
          {expiryDate}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = {
  cardContainer: tw`w-full h-50 rounded-lg`,
  cardDetail: tw`flex-row my-2`,
  priceView: tw`w-27`,
  dots: tw`flex-1 w-full border-dashed border`,
  leftEllipse: tw`h-5 w-5 bg-cultured rounded-full left--2.5`,
  rightEllipse: tw`h-5 w-5 bg-cultured rounded-full right--2.5`,
  ellipseView: tw`w-full flex-row justify-between h-5 items-center mt-0 overflow-hidden`,
  cardDetailWrapper: tw`px-5 pt-5`,
  expiryView: tw`w-full flex-row mt-1.5 pl-5`,
};

export default OffersCard;
