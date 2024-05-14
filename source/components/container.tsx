import React, {FC} from 'react';
import images from 'images';
import globalStyle from 'globalStyles';
import {ScrollView, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  children: JSX.Element | React.ReactNode;
  enableScroll?: boolean;
}

const Container: FC<Props> = ({children, enableScroll = false}) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        globalStyle.container,
        globalStyle.statusBar,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <StatusBar />
      {enableScroll ? (
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      ) : (
        children
      )}
    </View>
  );
};

export default Container;
