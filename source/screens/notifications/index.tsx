import React, {FC, useState} from 'react';
import {FlatList, Pressable, Image as RNImage, View} from 'react-native';
import {Text, Container, Header, Image} from 'components';
import globalStyle from 'globalStyles';
import tw from 'rn-tailwind';
import images from 'images';

const segments = ['All', 'Offer', 'Promotion', 'Appoinment'];

const Notifications: FC = () => {
  const [activeSegment, setSegment] = useState<string>('All');
  return (
    <Container>
      <View style={globalStyle.container}>
        <Header title="Notifications" />
        <View style={styles.segmentView}>
          {segments.map((data, index) => {
            return (
              <Pressable
                onPress={() => setSegment(data)}
                key={index}
                style={[
                  styles.inactiveSegment,
                  data === activeSegment && styles.activeSegment,
                ]}>
                <Text
                  size="sm"
                  color={
                    data === activeSegment ? 'text-black' : 'text-darkGrey'
                  }>
                  {data}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <View style={styles.notificationHeader}>
          <View style={styles.bellIconView}>
            <RNImage
              source={images.NotificationFill}
              style={styles.bellIcon}
              resizeMode="contain"
            />
            <Text size="sm">{' All Notifications'}</Text>
          </View>
          <View style={styles.markAllView}>
            <RNImage
              tintColor={'#40baff'}
              source={images.SeenIcon}
              style={styles.bellIcon}
              resizeMode="contain"
            />
            <Text size="sm" color="text-pictonBlue">
              {' Mark all as read'}
            </Text>
          </View>
        </View>
        <View style={styles.notificationList}>
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8]}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <View style={styles.notificationItem}>
                  <Image
                    style={styles.userImage}
                    resizeMode="cover"
                    source={{
                      uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
                    }}
                  />
                  <View style={styles.titleView}>
                    <Text size="sm">
                      {'Your appointment has been successfully schedule with'}
                      <Text size="sm" fontWeight="700">
                        {' Nickson John'}
                      </Text>
                    </Text>
                    <Text size="sm" margin="mt-1" color="text-darkGrey">
                      {'1 hr ago'}
                    </Text>
                  </View>
                  <Pressable style={styles.threeDotsButton}>
                    <RNImage
                      tintColor={'#666666'}
                      style={styles.moreIcon}
                      source={images.ThreeDotsHorizontal}
                    />
                  </Pressable>
                </View>
              );
            }}
          />
        </View>
      </View>
    </Container>
  );
};

const styles = {
  segmentView: tw`w-full h-15 pb-3 flex-row px-4 bg-white justify-between items-center`,
  activeSegment: tw`h-10 rounded-full px-4 bg-primary justify-center`,
  inactiveSegment: tw`h-10 rounded-full px-4 bg-gray-100 justify-center`,
  notificationHeader: tw`w-full h-14 bg-cultured flex-row px-4`,
  bellIconView: tw`flex-6.5 w-full h-full flex-row items-center `,
  markAllView: tw`flex-3.5 w-full h-full flex-row items-center `,
  bellIcon: tw`w-5 h-5`,
  notificationList: tw`flex-1 w-full h-full px-4 bg-cultured`,
  notificationItem: tw`w-full h-20 flex-row`,
  userImage: tw`w-13 h-13 rounded-full`,
  titleView: tw`w-full flex-1 h-full pl-2`,
  threeDotsButton: tw`w-7 h-full items-end`,
  separator: tw`w-full h-0.2 bg-gray-300  mb-5`,
  moreIcon: tw`w-3.8 h-3.8`,
  list: tw`w-full pb-5 pt-2`,
};

export default Notifications;
