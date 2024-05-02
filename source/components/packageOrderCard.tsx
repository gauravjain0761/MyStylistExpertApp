import React, {FC} from 'react';
import {Pressable, View} from 'react-native';
import tw from 'rn-tailwind';
import {Text, Image} from 'components';
import images from 'images';
import globalStyle from 'globalStyles';

interface Props {
  fullWidth?: boolean;
  homeScreen?: boolean;
  status: 'Pending' | 'Completed' | 'Cancelled';
  onPreeCard?: () => void;
}

const PackageOrderCard: FC<Props> = ({
  status = 'Pending',
  fullWidth = false,
  homeScreen = false,
  onPreeCard,
}) => {
  return (
    <Pressable
      onPress={() => {
        onPreeCard && onPreeCard();
      }}
      style={[styles.upcomingItemContainer, fullWidth && styles.cardFullWidth]}>
      <View style={[styles.upcomingItemHeader, !homeScreen && styles[status]]}>
        <Text size="sm" fontWeight="700">
          Booking ID: #25
        </Text>
      </View>
      <View style={styles.cardDetailView}>
        <View style={styles.upcomingItemName}>
          <Text fontWeight="700" color="text-darkGrey" size="lg">
            {'Nico Robin'}
          </Text>
          <View style={styles.upcomingDetails}>
            <Image
              resizeMode="stretch"
              style={styles.locationIcon}
              source={images.LocationIcon}
            />
            <Text size="xs" color="text-darkGrey">
              {'America, Las Vagas'}
            </Text>
          </View>
          <View style={styles.upcomingDetails}>
            <Image
              resizeMode="stretch"
              style={styles.locationIcon}
              source={images.CalendarIcon}
            />
            <Text size="xs" color="text-darkGrey">
              {'22 October 2023, 08:30'}
            </Text>
          </View>
        </View>
        <View style={styles.pendingView}>
          <View style={[styles.statusView, globalStyle.bothContentCenter]}>
            <Text fontWeight="700" color="text-black" size="sm">
              {status}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.dotWrap}>
        <View style={[styles.dots, globalStyle.dotedLine]}></View>
      </View>
      <View style={styles.serviceItems}>
        <Text size="sm" fontWeight="700" color="text-darkGrey">
          {'2X Haircutting'}
        </Text>
        <Text size="sm" fontWeight="800">
          {'Complete'}
        </Text>
      </View>
      <View style={styles.serviceItems}>
        <Text size="sm" fontWeight="700" color="text-darkGrey">
          {'2X Beard Trim'}
        </Text>
        <Text size="sm" fontWeight="800">
          {'Pending'}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = {
  Pending: tw`bg-brightGray`,
  Completed: tw`bg-brightGray`,
  Cancelled: tw`bg-antiFlashWhite`,
  cardFullWidth: tw`w-full m-0 h-59`,
  upcomingItemContainer: tw`w-72 h-52 ml-4 bg-white rounded-lg overflow-hidden`,
  upcomingItemHeader: tw`px-4 w-full h-10 bg-mistyRose flex-row items-center justify-between items-center`,
  upcomingItemName: tw`flex-6 w-full px-4 mt-2`,
  pendingView: tw`flex-4 w-full items-end justify-center pr-4`,
  statusView: tw`px-4 rounded-full h-8 bg-floralWhite`,
  cardDetailView: tw`flex-row w-full`,
  upcomingDetails: tw`flex-row w-full pt-1 pb-1`,
  locationIcon: tw`w-4 h-4`,
  dashedView: tw`w-full`,
  dotWrap: tw`w-full px-4`,
  dots: tw` mt-3 mb-1 w-full`,
  dashedViewBorder: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'grey',
  },
  serviceItems: tw`w-full flex-row h-8 mt-1 items-center justify-between px-4`,
};

export default PackageOrderCard;
