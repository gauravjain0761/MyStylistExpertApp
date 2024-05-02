import React, {useEffect} from 'react';
import tw from 'rn-tailwind';
import {View, Keyboard, ActivityIndicator} from 'react-native';

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = props => {
  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  return (
    <View style={[styles.container]}>
      <View style={styles.overlay} />
      <View style={styles.cover}>
        <ActivityIndicator
          size={50}
          color={'#89E3DC'}
          style={styles.indicator}
        />
      </View>
    </View>
  );
};

const styles = {
  container: tw`absolute flex-1 w-full h-full items-center justify-center`,
  overlay: tw`bg-black absolute top-0 bottom-0 left-0 right-0 opacity-70 z-10`,
  activityIndicatorBody: tw`flex-1 w-full h-full items-center justify-center opacity-70`,
  cover: tw`flex-1 h-full w-full h-full items-center justify-center absolute z-20`,
  indicator: tw`z-20 absolute `,
};

export default Loader;
