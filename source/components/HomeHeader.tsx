import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import images from 'images';
import Color from '../../assets/color';
import {commonFontStyle, fontFamily, hp, wp} from '../utils/dimentions';

type HomeProps = {
  onPresslocation?: () => void;
  onPressProfile?: () => void;
  location?: any;
  edges?: any;
  containerStyle?: ViewStyle;
};

const HomeHeader: FC<HomeProps> = ({
  onPresslocation,
  onPressProfile,
  location = null,
  containerStyle,
}) => {
  const {navigate} = useNavigation();
  //   const {profileData} = useAppSelector(state => state.profile);
  //   const {cartCount} = useAppSelector(state => state.cart);

  const onPressBell = () => {
    // @ts-ignore
    navigate(screenName.Notifications);
  };

  return (
    <View style={{...styles.container, ...containerStyle}}>
      <View style={styles.rowStyle}>
        <TouchableOpacity>
          <Image source={images?.avatar} style={styles?.avatar} />
        </TouchableOpacity>
        <Image
          resizeMode="contain"
          source={images.homelocation}
          style={styles.locationIconStyle}
        />
        <View style={styles.address_container}>
          <TouchableOpacity onPress={onPresslocation} style={styles.location}>
            <Text style={styles.home_title}>Work</Text>
            <Image
              resizeMode="contain"
              source={images.dropDown}
              style={styles.dropdown}
            />
          </TouchableOpacity>
          {location ? (
            <Text numberOfLines={1} style={styles.addrs}>
              {location}
            </Text>
          ) : (
            <Text></Text>
          )}
        </View>
      </View>
      <View style={styles?.header_service_container}>
        <TouchableOpacity onPress={onPressBell}>
          <Image source={images?.HomeBell} style={styles?.icons} />
          <View style={styles?.badge}></View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color?.White,
    paddingVertical: hp(12),
    paddingHorizontal: wp(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header_service_container: {
    flexDirection: 'row',
    gap: wp(18),
    alignItems: 'center',
  },
  icons: {
    width: wp(24),
    height: wp(24),
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(5),
  },
  dropdown: {
    width: wp(9),
    height: wp(9),
  },
  home_title: {
    ...commonFontStyle(fontFamily.medium, 18, Color?.Black),
  },
  addrs: {
    ...commonFontStyle(fontFamily.medium, 12, Color.Grey81),
    maxWidth: wp(200),
    textAlign: 'left',
  },
  address_container: {
    flex: 1,
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationIconStyle: {
    height: wp(25),
    width: wp(25),
    marginRight: wp(5),
  },
  avatar: {
    width: wp(38),
    height: wp(38),
    borderRadius: wp(100),
    marginRight: wp(11),
  },
  badge: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(100),
    backgroundColor: Color.Green40,
    position: 'absolute',
    left: 2,
  },
});
