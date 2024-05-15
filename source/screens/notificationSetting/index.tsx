import React, {FC} from 'react';
import tw from 'rn-tailwind';
import images from 'images';
import {View, Text as RNText, StyleSheet} from 'react-native';
import globalStyle from 'globalStyles';
import {Text, Container, ToggleSwitch, Header} from 'components';
import {commonFontStyle, fontFamily, hp, wp} from '../../utils/dimentions';
import Color from '../../../assets/color';

const NotificationSetting: FC = () => {
  return (
    <Container>
      <View style={globalStyle.container}>
        <Header title="Notification" />
        <View style={styles.mainView}>
          <RNText style={styles.maintitle}>{'Account'}</RNText>
          <RNText style={styles.label}>{'Account Activity'}</RNText>
          <View style={styles.toggleWrapper}>
            <RNText style={styles.placeholdertext}>{'Email and SMS'}</RNText>
            <ToggleSwitch active={true} />
          </View>
          <RNText style={styles.label}>{'Service purchased'}</RNText>
          <View style={styles.toggleWrapper}>
            <RNText style={styles.placeholdertext}>{'Email and SMS'}</RNText>
            <ToggleSwitch active={false} />
          </View>
          <RNText style={styles.label}>{'Push Notification'}</RNText>
          <View style={styles.toggleWrapper}>
            <RNText style={styles.placeholdertext}>{'Email and SMS'}</RNText>
            <ToggleSwitch active={true} />
          </View>
          <RNText style={styles.Remindertitle}>{'Reminder'}</RNText>
          <RNText style={styles.label}>{'Reminders'}</RNText>
          <View style={styles.toggleWrapper}>
            <RNText style={styles.placeholdertext}>{'Email and SMS'}</RNText>
            <ToggleSwitch active={false} />
          </View>
          <RNText style={styles?.label}>{'Customer Messages'}</RNText>
          <View style={styles.toggleWrapper}>
            <RNText style={styles.placeholdertext}>{'Email and SMS'}</RNText>
            <ToggleSwitch active={false} />
          </View>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  mainView: {
    ...tw`w-full h-full flex-1 bg-white`,
    paddingTop: hp(25),
    paddingHorizontal: wp(20),
  },
  toggleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Color?.InputGrey,
    paddingHorizontal: wp(20),
    paddingVertical: hp(17),
    borderRadius: wp(6),
  },
  maintitle: {
    ...commonFontStyle(fontFamily.medium, 18, Color?.Black),
    lineHeight: hp(26),
  },
  label: {
    ...commonFontStyle(fontFamily.medium, 16, Color?.Black),
    lineHeight: hp(20),
    marginTop: hp(20),
    marginBottom: hp(12),
  },
  placeholdertext: {
    ...commonFontStyle(fontFamily.regular, 16, Color?.Grey66),
  },
  Remindertitle: {
    ...commonFontStyle(fontFamily.medium, 18, Color?.Black),
    lineHeight: hp(26),
    marginTop: hp(30),
  },
});

export default NotificationSetting;

// import React, {FC} from 'react';
// import tw from 'rn-tailwind';
// import images from 'images';
// import {View} from 'react-native';
// import globalStyle from 'globalStyles';
// import {Text, Container, ToggleSwitch, Header} from 'components';

// const NotificationSetting: FC = () => {
//   return (
//     <Container>
//       <View style={globalStyle.container}>
//         <Header title="Notification" />
//         <View style={styles.mainView}>
//           <Text size="base" fontWeight="700" margin="mt-5">
//             {'Account'}
//           </Text>
//           <Text size="base" fontWeight="700" margin="mt-3">
//             {'Account Activity'}
//           </Text>
//           <View style={styles.toggleWrapper}>
//             <Text size="sm">{'Email and SMS'}</Text>
//             <ToggleSwitch active={true} />
//           </View>
//           <Text size="base" fontWeight="700" margin="mt-5">
//             {'Service purchased'}
//           </Text>
//           <View style={styles.toggleWrapper}>
//             <Text size="sm">{'Email and SMS'}</Text>
//             <ToggleSwitch active={false} />
//           </View>
//           <Text size="base" fontWeight="700" margin="mt-5">
//             {'Push Notification'}
//           </Text>
//           <View style={styles.toggleWrapper}>
//             <Text size="sm">{'Email and SMS'}</Text>
//             <ToggleSwitch active={true} />
//           </View>
//           <Text size="base" fontWeight="700" margin="mt-5">
//             {'Reminder'}
//           </Text>
//           <Text size="base" fontWeight="700" margin="mt-3">
//             {'Reminders'}
//           </Text>
//           <View style={styles.toggleWrapper}>
//             <Text size="sm">{'Email and SMS'}</Text>
//             <ToggleSwitch active={false} />
//           </View>
//           <Text size="base" fontWeight="700" margin="mt-3">
//             {'Customer Messages'}
//           </Text>
//           <View style={styles.toggleWrapper}>
//             <Text size="sm">{'Email and SMS'}</Text>
//             <ToggleSwitch active={false} />
//           </View>
//         </View>
//       </View>
//     </Container>
//   );
// };

// const styles = {
//   mainView: tw`w-full h-full flex-1 px-4 bg-cultured`,
//   toggleWrapper: tw`w-full h-14 rounded-lg flex-row bg-gray-200 mt-2 items-center justify-between px-4`,
// };

// export default NotificationSetting;
