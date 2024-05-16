import React, {FC} from 'react';
import tw from 'rn-tailwind';
import images from 'images';
import {FlatList, StyleSheet, View} from 'react-native';
import {NativeToast, h, w} from 'utils';
import globalStyle from 'globalStyles';
import {PLEASE_LOGIN, PHONE_NUMBER} from 'AppConstants';
import {Image, Text, Container, Button, TextInput, Header} from 'components';
import {style} from 'twrnc';
import Color from '../../../assets/color';

const MyWallet: FC = () => {
  const RenderList = ({item, index}: any) => {
    return (
      <View key={index} style={styles.transactionItem}>
        <View style={[styles.arrowView, globalStyle.bothContentCenter]}>
          <Image
            resizeMode="contain"
            style={styles.downArrow}
            source={images.DownArrowLong}
          />
        </View>
        <View style={styles.itemDetail}>
          <Text numberOfLines={1} size="sm" fontWeight="800">
            {'Standard Charter'}
          </Text>
          <Text size="xs" color="text-gray-500">
            {'May 23, 2023'}
          </Text>
        </View>
        <Text size="base" fontWeight="800">
          {'₹ 3.59'}
        </Text>
      </View>
    );
  };

  return (
    <Container>
      <View style={globalStyle.container}>
        <Header title="My Wallet" />
        <View style={[styles.mainView, styles.mainViewPedding]}>
          <View style={[styles.earningBox, globalStyle.bothContentCenter]}>
            <View style={styles.walletBalanceView}>
              <Text size="base" margin="mb-1.1">
                ₹
              </Text>
              <Text size="3xl" fontWeight="800">
                10,000
              </Text>
            </View>
            <Text size="xs" margin="" color="text-gray-500">
              Your earnings
            </Text>
          </View>
          <View style={styles.earningBoxWrapper}>
            <View
              style={[
                styles.subEarningBox,
                styles.monthlyEarningBox,
                globalStyle.bothContentCenter,
              ]}>
              <Text size="lg" fontWeight="800">
                {'₹ 2,304'}
              </Text>
              <Text size="xs" margin="mt-1" color="text-gray-500">
                {'October Earning'}
              </Text>
            </View>
            <View
              style={[
                styles.subEarningBox,
                styles.avgBox,
                globalStyle.bothContentCenter,
              ]}>
              <Text size="lg" fontWeight="800">
                {'₹ 23..09'}
              </Text>
              <Text size="xs" margin="mt-1" color="text-gray-500">
                {'Avg. Earning'}
              </Text>
            </View>
            <View
              style={[
                styles.subEarningBox,
                styles.clientBoxView,
                globalStyle.bothContentCenter,
              ]}>
              <Text size="lg" fontWeight="800">
                {'20'}
              </Text>
              <Text size="xs" margin="mt-1" color="text-gray-500">
                {'Total Clients'}
              </Text>
            </View>
          </View>
          <View style={styles.transactionHeader}>
            <Text size="base" fontWeight="800">
              {'Transaction History'}
            </Text>
            <Text size="sm" style={tw`underline`} fontWeight="600">
              {'View All'}
            </Text>
          </View>
          <View style={styles.listView}>
            <FlatList
              data={[1, 2, 3, 4, 5]}
              renderItem={RenderList}
              contentContainerStyle={styles.listViewContainer}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  mainViewPedding: {paddingHorizontal: w(4)},
  mainView: tw`flex-1 w-full h-full bg-cultured `,
  earningBox: {
    ...tw`w-full h-28 rounded-lg bg-mistyRose mt-6`,
    backgroundColor: Color?.CreamFF,
  },
  walletBalanceView: tw`w-full h-15 flex-row items-end justify-center mb-5`,
  earningBoxWrapper: tw`w-full flex-row mt-4 justify-between`,
  subEarningBox: {width: w(28), height: w(23)},
  monthlyEarningBox: {
    ...tw`rounded-lg bg-mistyRose`,
    backgroundColor: Color?.CreamFA,
  },
  avgBox: tw`rounded-lg bg-aliceBlueDim`,
  clientBoxView: tw`rounded-lg bg-magnolia`,
  transactionHeader: tw`w-full h-19 flex-row items-center justify-between`,
  listView: tw`flex-1 w-full h-full`,
  transactionItem: tw`w-full h-19 flex-row px-4 rounded-lg bg-white items-center`,
  arrowView: tw`w-12 h-12 rounded-lg bg-seashel `,
  itemDetail: tw`flex-1 w-full h-full justify-center pl-4`,
  downArrow: tw`w-4 h-4`,
  separator: tw`w-full h-4`,
  listViewContainer: tw`w-full pb-4`,
});

export default MyWallet;

// import React, {FC} from 'react';
// import tw from 'rn-tailwind';
// import images from 'images';
// import {FlatList, View} from 'react-native';
// import {NativeToast, h, w} from 'utils';
// import globalStyle from 'globalStyles';
// import {PLEASE_LOGIN, PHONE_NUMBER} from 'AppConstants';
// import {Image, Text, Container, Button, TextInput, Header} from 'components';

// const MyWallet: FC = () => {
//   const RenderList = ({item, index}: any) => {
//     return (
//       <View key={index} style={styles.transactionItem}>
//         <View style={[styles.arrowView, globalStyle.bothContentCenter]}>
//           <Image
//             resizeMode="contain"
//             style={styles.downArrow}
//             source={images.DownArrowLong}
//           />
//         </View>
//         <View style={styles.itemDetail}>
//           <Text numberOfLines={1} size="sm" fontWeight="800">
//             {'Standard Charter'}
//           </Text>
//           <Text size="xs" color="text-gray-500">
//             {'May 23, 2023'}
//           </Text>
//         </View>
//         <Text size="base" fontWeight="800">
//           {'₹ 3.59'}
//         </Text>
//       </View>
//     );
//   };

//   return (
//     <Container>
//       <View style={globalStyle.container}>
//         <Header title="My Wallet" />
//         <View style={[styles.mainView, styles.mainViewPedding]}>
//           <View style={[styles.earningBox, globalStyle.bothContentCenter]}>
//             <View style={styles.walletBalanceView}>
//               <Text size="base" margin="mb-1.1">
//                 ₹
//               </Text>
//               <Text size="3xl" fontWeight="800">
//                 10,000
//               </Text>
//             </View>
//             <Text size="xs" margin="" color="text-gray-500">
//               Your earnings
//             </Text>
//           </View>
//           <View style={styles.earningBoxWrapper}>
//             <View
//               style={[
//                 styles.subEarningBox,
//                 styles.monthlyEarningBox,
//                 globalStyle.bothContentCenter,
//               ]}>
//               <Text size="lg" fontWeight="800">
//                 {'₹ 2,304'}
//               </Text>
//               <Text size="xs" margin="mt-1" color="text-gray-500">
//                 {'October Earning'}
//               </Text>
//             </View>
//             <View
//               style={[
//                 styles.subEarningBox,
//                 styles.avgBox,
//                 globalStyle.bothContentCenter,
//               ]}>
//               <Text size="lg" fontWeight="800">
//                 {'₹ 23..09'}
//               </Text>
//               <Text size="xs" margin="mt-1" color="text-gray-500">
//                 {'Avg. Earning'}
//               </Text>
//             </View>
//             <View
//               style={[
//                 styles.subEarningBox,
//                 styles.clientBoxView,
//                 globalStyle.bothContentCenter,
//               ]}>
//               <Text size="lg" fontWeight="800">
//                 {'20'}
//               </Text>
//               <Text size="xs" margin="mt-1" color="text-gray-500">
//                 {'Total Clients'}
//               </Text>
//             </View>
//           </View>
//           <View style={styles.transactionHeader}>
//             <Text size="base" fontWeight="800">
//               {'Transaction History'}
//             </Text>
//             <Text size="sm" style={tw`underline`} fontWeight="600">
//               {'View All'}
//             </Text>
//           </View>
//           <View style={styles.listView}>
//             <FlatList
//               data={[1, 2, 3, 4, 5]}
//               renderItem={RenderList}
//               contentContainerStyle={styles.listViewContainer}
//               showsVerticalScrollIndicator={false}
//               keyExtractor={(item, index) => index.toString()}
//               ItemSeparatorComponent={() => <View style={styles.separator} />}
//             />
//           </View>
//         </View>
//       </View>
//     </Container>
//   );
// };

// const styles = {
//   mainViewPedding: {paddingHorizontal: w(4)},
//   mainView: tw`flex-1 w-full h-full bg-cultured `,
//   earningBox: tw`w-full h-28 rounded-lg bg-mistyRose mt-6`,
//   walletBalanceView: tw`w-full h-15 flex-row items-end justify-center mb-5`,
//   earningBoxWrapper: tw`w-full flex-row mt-4 justify-between`,
//   subEarningBox: {width: w(28), height: w(23)},
//   monthlyEarningBox: tw`rounded-lg bg-mistyRose`,
//   avgBox: tw`rounded-lg bg-aliceBlueDim`,
//   clientBoxView: tw`rounded-lg bg-magnolia`,
//   transactionHeader: tw`w-full h-19 flex-row items-center justify-between`,
//   listView: tw`flex-1 w-full h-full`,
//   transactionItem: tw`w-full h-19 flex-row px-4 rounded-lg bg-white items-center`,
//   arrowView: tw`w-12 h-12 rounded-lg bg-seashel `,
//   itemDetail: tw`flex-1 w-full h-full justify-center pl-4`,
//   downArrow: tw`w-4 h-4`,
//   separator: tw`w-full h-4`,
//   listViewContainer: tw`w-full pb-4`,
// };

// export default MyWallet;
