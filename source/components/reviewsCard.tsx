import React, {FC} from 'react';
import tw from 'rn-tailwind';
import images from 'images';
import {Pressable, StyleSheet, View} from 'react-native';
import globalStyle from 'globalStyles';
import {PLEASE_LOGIN, PHONE_NUMBER} from 'AppConstants';
import {Image, Text, Container, Header} from 'components';
import Stars from 'react-native-stars';
import moment from 'moment';
import {appConfig} from '../../config';

interface Props {
  fullWidth?: boolean;
  style?: string;
  data?: any;
}

const ReviewCard: FC<Props> = ({fullWidth, style = '', data}) => {
  let image = data?.userId?.user_profile_images[0]?.image;
  const {IMG_URL} = appConfig;

  return (
    <View
      style={[styles.reviewCard, fullWidth && styles.cardFull, tw`${style}`]}>
      <View style={styles.profileView}>
        <Image
          resizeMode="cover"
          style={styles.profileImage}
          source={{
            uri: `${IMG_URL}/${image}`,
          }}
        />
        <View style={styles.nameView}>
          <Text numberOfLines={1} size="sm" fontWeight="700">
            {data?.userId?.name}
          </Text>
          <Text size="xs" margin="mt-1" color="text-gray-400">
            {moment(data?.createdAt).format('DD-MM-YYYY')}
          </Text>
        </View>
        <Stars
          default={5}
          count={data?.star_rating}
          half={true}
          starSize={13}
          spacing={3}
          fullStar={images.YellowStart}
          emptyStar={images.EmptyStar}
          halfStar={images.HalfStar}
        />
      </View>
      <Text numberOfLines={3} size="sm" margin="mt-1">
        {data?.review}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardFull: tw`w-full`,
  reviewCard: {
    ...tw`w-80 h-38 rounded-lg bg-white px-4 pt-3`,

    shadowColor: '#c5c5c5',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.21,
    shadowRadius: 7.68,
    elevation: 10,
  },
  profileView: tw`flex-row w-full h-12 items-center`,
  profileImage: tw`w-10 h-10 rounded-full`,
  nameView: tw`flex-1 w-full h-full justify-center pl-3 pr-0.5 `,
});

export default ReviewCard;

// import React, {FC} from 'react';
// import tw from 'rn-tailwind';
// import images from 'images';
// import {Pressable, View} from 'react-native';
// import globalStyle from 'globalStyles';
// import {PLEASE_LOGIN, PHONE_NUMBER} from 'AppConstants';
// import {Image, Text, Container, Header} from 'components';
// import Stars from 'react-native-stars';

// interface Props {
//   fullWidth?: boolean;
//   style?: string;
// }

// const ReviewCard: FC<Props> = ({fullWidth, style = ''}) => {
//   return (
//     <View
//       style={[styles.reviewCard, fullWidth && styles.cardFull, tw`${style}`]}>
//       <View style={styles.profileView}>
//         <Image
//           resizeMode="cover"
//           style={styles.profileImage}
//           source={{
//             uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//           }}
//         />
//         <View style={styles.nameView}>
//           <Text numberOfLines={1} size="sm" fontWeight="700">
//             Jeffery Bills
//           </Text>
//           <Text size="xs" margin="mt-1" color="text-gray-400">
//             {'11-04-2023'}
//           </Text>
//         </View>
//         <Stars
//           default={5}
//           count={5}
//           half={true}
//           starSize={13}
//           spacing={3}
//           fullStar={images.YellowStart}
//           emptyStar={images.EmptyStar}
//           halfStar={images.HalfStar}
//         />
//       </View>
//       <Text numberOfLines={3} size="sm" margin="mt-1">
//         {
//           'Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit, sed do\neiusmod...'
//         }
//       </Text>
//     </View>
//   );
// };

// const styles = {
//   cardFull: tw`w-full`,
//   reviewCard: tw`w-80 h-38 rounded-lg bg-white px-4 pt-3`,
//   profileView: tw`flex-row w-full h-12 items-center`,
//   profileImage: tw`w-10 h-10 rounded-full`,
//   nameView: tw`flex-1 w-full h-full justify-center pl-3 pr-0.5 `,
// };

// export default ReviewCard;
