import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import images from 'images';

const Loading = () => {
  return (
    <View style={styles.containerStyle}>
      <ImageBackground source={images?.splash} style={styles?.bgimage} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  bgimage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
