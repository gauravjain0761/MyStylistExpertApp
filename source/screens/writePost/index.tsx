import React, {FC, useState} from 'react';
import {FlatList, Pressable, Image as RNImage, View} from 'react-native';
import {Text, Container, Header, Image, TextInput, Button} from 'components';
import globalStyle from 'globalStyles';
import tw from 'rn-tailwind';
import images from 'images';

const WritePost: FC = () => {
  return (
    <Container>
      <View style={globalStyle.container}>
        <Header title="Write Post" />
        <View style={styles.mainView}>
          <View style={styles.postHeader}>
            <Image
              resizeMode="center"
              style={styles.profileImage}
              source={{
                uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
              }}
            />
            <Text fontWeight="700" size="sm">
              {'  Nickson share what is in your mind...'}
            </Text>
            <RNImage
              tintColor={'#666666'}
              resizeMode="center"
              style={styles.smile}
              source={images.SmileIcon}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              multiline
              textAlignVertical="top"
              placeholder="Type here..."
            />
          </View>
          <View style={styles.bottomView}>
            <View style={styles.iconsWrapper}>
              <Pressable style={styles.iconButton}>
                <Image
                  source={images.ImageIcon}
                  resizeMode="contain"
                  style={styles.actionIcon}
                />
              </Pressable>
              <Pressable style={styles.iconButton}>
                <Image
                  source={images.LocationIcon}
                  resizeMode="contain"
                  style={styles.actionIcon}
                />
              </Pressable>
              <Pressable style={styles.iconButton}>
                <Image
                  source={images.VideoCamera}
                  resizeMode="contain"
                  style={styles.actionIcon}
                />
              </Pressable>
              <Pressable style={styles.iconButton}>
                <Image
                  source={images.AttachmentIcon}
                  resizeMode="contain"
                  style={styles.actionIcon}
                />
              </Pressable>
              <Pressable style={styles.iconButton}>
                <Image
                  source={images.SmileIcon}
                  resizeMode="contain"
                  style={styles.actionIcon}
                />
              </Pressable>
            </View>
            <View style={styles.bottonView}>
              <Button onPress={() => {}} lable="Create Post" />
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
};

const styles = {
  mainView: tw`w-full h-full flex-1 bg-cultured `,
  postHeader: tw`w-full h-14 flex-row items-center mt-3 px-4`,
  profileImage: tw`w-9 h-9 rounded-full`,
  smile: tw`w-4.5 h-4.5 absolute right-4`,
  inputView: tw`w-full h-full flex-1 px-4`,
  input: tw`w-full h-full border-primary border rounded-lg`,
  bottomView: tw`w-full h-38 bg-white`,
  iconsWrapper: tw`w-full flex-row items-center h-10 mt-4 justify-between px-1.5`,
  iconButton: tw`w-12 h-12 items-center justify-center`,
  actionIcon: tw`w-5.5 h-5.5`,
  bottonView: tw`flex-1 h-full w-full items-center justify-center px-4`,
};

export default WritePost;
