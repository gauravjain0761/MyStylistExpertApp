import React, {FC} from 'react';
import tw from 'rn-tailwind';
import images from 'images';
import {View} from 'react-native';
import globalStyle from 'globalStyles';
import {Text, Container, ToggleSwitch, Header} from 'components';

const NotificationSetting: FC = () => {
  return (
    <Container>
      <View style={globalStyle.container}>
        <Header title="Notification" />
        <View style={styles.mainView}>
          <Text size="base" fontWeight="700" margin="mt-5">
            {'Account'}
          </Text>
          <Text size="base" fontWeight="700" margin="mt-3">
            {'Account Activity'}
          </Text>
          <View style={styles.toggleWrapper}>
            <Text size="sm">{'Email and SMS'}</Text>
            <ToggleSwitch active={true} />
          </View>
          <Text size="base" fontWeight="700" margin="mt-5">
            {'Service purchased'}
          </Text>
          <View style={styles.toggleWrapper}>
            <Text size="sm">{'Email and SMS'}</Text>
            <ToggleSwitch active={false} />
          </View>
          <Text size="base" fontWeight="700" margin="mt-5">
            {'Push Notification'}
          </Text>
          <View style={styles.toggleWrapper}>
            <Text size="sm">{'Email and SMS'}</Text>
            <ToggleSwitch active={true} />
          </View>
          <Text size="base" fontWeight="700" margin="mt-5">
            {'Reminder'}
          </Text>
          <Text size="base" fontWeight="700" margin="mt-3">
            {'Reminders'}
          </Text>
          <View style={styles.toggleWrapper}>
            <Text size="sm">{'Email and SMS'}</Text>
            <ToggleSwitch active={false} />
          </View>
          <Text size="base" fontWeight="700" margin="mt-3">
            {'Customer Messages'}
          </Text>
          <View style={styles.toggleWrapper}>
            <Text size="sm">{'Email and SMS'}</Text>
            <ToggleSwitch active={false} />
          </View>
        </View>
      </View>
    </Container>
  );
};

const styles = {
  mainView: tw`w-full h-full flex-1 px-4 bg-cultured`,
  toggleWrapper: tw`w-full h-14 rounded-lg flex-row bg-gray-200 mt-2 items-center justify-between px-4`,
};

export default NotificationSetting;
