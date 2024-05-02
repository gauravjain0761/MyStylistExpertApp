import React, {FC, useState} from 'react';
import tw from 'rn-tailwind';
import {ActivityIndicator, View} from 'react-native';
import globalStyle from 'globalStyles';
import Video from 'react-native-video';
import {Container, Header} from 'components';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '..';
import {RouteProp} from '@react-navigation/native';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'VideoPlayer'>;
  route: RouteProp<RootStackParamList, 'VideoPlayer'>;
};

const VideoPlayer: FC<Props> = ({navigation, route}) => {
  const [loader, setLoader] = useState<boolean>(true);
  const {videoUrl} = route.params;
  return (
    <Container>
      <View style={globalStyle.container}>
        <Header title="Video Player" />
        <View style={[styles.mainView, globalStyle.bothContentCenter]}>
          <Video
            source={{uri: videoUrl}}
            onBuffer={() => {}}
            onLoad={() => {
              setLoader(false);
            }}
            style={styles.videoPlayer}
          />
          {loader ? (
            <ActivityIndicator
              size={50}
              color={'#89E3DC'}
              style={styles.indicator}
            />
          ) : (
            <View />
          )}
        </View>
      </View>
    </Container>
  );
};

const styles = {
  mainView: tw`flex-1 w-full h-full bg-black`,
  videoPlayer: tw`w-full h-full`,
  indicator: tw`absolute`,
};

export default VideoPlayer;
