import React, {FC} from 'react';
import {Pressable, View} from 'react-native';
import {Text} from 'components';
import globalStyle from 'globalStyles';
import tw from 'rn-tailwind';
import {DASHED} from 'AppConstants';
import {Package} from 'types';
import moment from 'moment';

interface Props {
  data: Package;
  cardColor: string;
  onCardPress: (packageId: string) => void;
}

const PackageCard: FC<Props> = ({data, cardColor = '#F7F5EB', onCardPress}) => {
  const {
    _id: packageId,
    end_date,
    number_of_package,
    package_name,
    service_name,
  } = data;
  const categoryNames = service_name.map(category => category.category_name);
  const commaSeparatedNames = categoryNames.join(', ');
  const expiryDate = moment(end_date).format('DD MMM, YYYY');

  return (
    <Pressable
      onPress={() => onCardPress && onCardPress(packageId)}
      style={[styles.cardContainer, {backgroundColor: cardColor}]}>
      <View style={styles.cardDetailWrapper}>
        <Text size="base" fontWeight="800" style={tw`capitalize`}>
          {package_name}
        </Text>
        <Text numberOfLines={1} size="sm" margin="mt-1" color="text-darkGrey">
          {commaSeparatedNames}
        </Text>
        <View style={styles.cardDetail}>
          <View style={styles.priceView}>
            <Text size="sm" color="text-darkGrey">
              Package price
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
              {`23/${number_of_package}`}
            </Text>
          </View>
          <View style={styles.priceView}>
            <Text size="sm" color="text-darkGrey">
              Availed
            </Text>
            <Text size="lg" fontWeight={'700'} color="text-black">
              {`15/${number_of_package}`}
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
  dots: tw`flex-1 w-full`,
  leftEllipse: tw`h-5 w-5 bg-cultured rounded-full left--2.5`,
  rightEllipse: tw`h-5 w-5 bg-cultured rounded-full right--2.5`,
  ellipseView: tw`w-full flex-row justify-between h-5 items-center mt-0`,
  cardDetailWrapper: tw`px-5 pt-5`,
  expiryView: tw`w-full flex-row mt-1.5 pl-5`,
};

export default PackageCard;
