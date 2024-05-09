import React, {FC} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import tw from 'rn-tailwind';
import {Image} from 'components';
import images from 'images';
import {useNavigation} from '@react-navigation/native';
import {commonFontStyle, fontFamily, hp, wp} from '../utils/dimentions';
import Color from '../../assets/color';

interface Props {
  title: string;
  rightView?: JSX.Element;
}

const Header: FC<Props> = ({title, rightView}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.leftView}>
        <Image
          style={styles.backIcon}
          resizeMode="contain"
          source={images.BackwardIcon}
        />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightView}>{rightView}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  backIcon: tw`w-5 h-5`,
  container: {
    ...tw`w-full h-14 bg-white flex-row items-center`,
    paddingHorizontal: wp(20),
  },
  leftView: {
    ...tw`h-full justify-center`,
    marginRight: wp(20),
  },
  rightView: tw`flex-1 w-full h-full justify-center `,
  title: {
    ...commonFontStyle(fontFamily.semi_bold, 18, Color?.Black),
  },
  headercontainer: {
    overflow: 'hidden',
    paddingBottom: hp(10),
  },
});

export default Header;

// import React, {FC} from 'react';
// import {Pressable, View} from 'react-native';
// import tw from 'rn-tailwind';
// import {Image, Text} from 'components';
// import images from 'images';
// import {useNavigation} from '@react-navigation/native';

// interface Props {
//   title: string;
//   rightView?: JSX.Element;
// }

// const Header: FC<Props> = ({title, rightView}) => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <Pressable
//         onPress={() => {
//           navigation.goBack();
//         }}
//         style={styles.leftView}>
//         <Image
//           style={styles.backIcon}
//           resizeMode="contain"
//           source={images.BackwardIcon}
//         />
//       </Pressable>
//       <Text color="text-black" fontWeight="800" size="lg">
//         {title}
//       </Text>
//       <View style={styles.rightView}>{rightView}</View>
//     </View>
//   );
// };

// const styles = {
//   backIcon: tw`w-5 h-5`,
//   container: tw`w-full h-14 bg-white px-4 flex-row items-center`,
//   leftView: tw`w-10 h-full justify-center`,
//   headerTitle: tw`flex-3.5 w-full h-full justify-center`,
//   rightView: tw`flex-1 w-full h-full justify-center `,
// };

// export default Header;
