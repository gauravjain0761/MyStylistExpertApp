import React, {FC} from 'react';
import tw from 'rn-tailwind';
import {Text, Button} from 'components';
import {Pressable, Image as RnImage, View} from 'react-native';
import {CampaignList} from 'types';
import moment from 'moment';

interface Props {
  cardType: 'Pending' | 'Accepted' | 'Decline' | 'Active';
  onPressCard?: (campaignId: string) => void;
  data: CampaignList;
}

const CompaignsCard: FC<Props> = ({cardType, data, onPressCard}) => {
  const {campaign, campaignstatus} = data;
  const {
    _id,
    title,
    startDate,
    endDate,
    campaignCode,
    featured_image,
    service_name,
  } = campaign;

  const sDate = moment(startDate).format('MMM DD, YYYY');
  const eDate = moment(endDate).format('MMM DD, YYYY');
  const services = service_name.map(data => data.service_name);
  return (
    <Pressable
      onPress={() => onPressCard && onPressCard(_id)}
      style={styles.compaingnsCard}>
      <View style={styles.cardProfileView}>
        <RnImage
          resizeMode="contain"
          style={styles.cardProfile}
          source={{
            uri: featured_image,
          }}
        />
        <View style={styles.nameView}>
          <Text size="base" fontWeight="800" margin="capitalize">
            {title}
          </Text>
          <Text size="sm" fontWeight="800" color="text-darkGrey">
            {`Code: ${campaignCode}`}
          </Text>
          {cardType === 'Active' && (
            <Button
              style={styles.activeView}
              onPress={() => {}}
              lable="Active"
              labelColor="text-green"
            />
          )}
        </View>
      </View>
      <View style={styles.cardDetailRow}>
        <View style={styles.cardDetail}>
          <Text size="sm" fontWeight="800" color="text-darkGrey">
            Services
          </Text>
          <Text
            numberOfLines={2}
            size="sm"
            margin="mt-1"
            fontWeight="500"
            numberOfLines={2}>
            {services.join(',')}
          </Text>
        </View>
        <View style={styles.cardDetail}>
          <Text size="sm" fontWeight="800" color="text-darkGrey">
            Price per Service
          </Text>
          <Text size="sm" margin="mt-1" fontWeight="500" numberOfLines={2}>
            {'Rs. 200'}
          </Text>
        </View>
      </View>
      <View style={styles.cardDetailRow}>
        <View style={styles.cardDetail}>
          <Text size="sm" fontWeight="800" color="text-darkGrey">
            Start Date
          </Text>
          <Text size="sm" margin="mt-1" fontWeight="500" numberOfLines={2}>
            {sDate}
          </Text>
        </View>
        <View style={styles.cardDetail}>
          <Text size="sm" fontWeight="800" color="text-darkGrey">
            End Date
          </Text>
          <Text size="sm" margin="mt-1" fontWeight="500" numberOfLines={2}>
            {eDate}
          </Text>
        </View>
      </View>
      <View style={styles.cardDetailRow}>
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
            style={tw`flex-1 w-full bg-primary`}
          />
        )}
      </View>
    </Pressable>
  );
};

const styles = {
  compaingnsCard: tw`w-full bg-white p-4 rounded-lg`,
  cardProfileView: tw`flex-row w-full items-center`,
  cardProfile: tw`w-11 h-11 rounded-lg`,
  nameView: tw`w-full ml-2`,
  cardDetailRow: tw`w-full flex-row mt-4 gap-4`,
  cardDetail: tw`flex-1 w-full`,
  activeView: tw`w-18 mt-2 h-8 rounded-full bg-aeroBlue absolute right-13`,
};

export default CompaignsCard;
