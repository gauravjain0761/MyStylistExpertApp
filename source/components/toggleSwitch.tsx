import React, {FC, useEffect, useState} from 'react';
import {Pressable, View} from 'react-native';
import tw from 'rn-tailwind';

interface Props {
  active: boolean;
}

const ToggleSwitch: FC<Props> = ({active = true}) => {
  const [isActive, setActive] = useState<boolean>(true);

  useEffect(() => {
    setActive(active);
  }, [active]);

  return (
    <Pressable
      onPress={() => setActive(!isActive)}
      style={[styles.toogleButton, !isActive && styles.inActiveStyle]}>
      <View
        style={[styles.innerCircle, !isActive && styles.inActiveInnerCircle]}
      />
    </Pressable>
  );
};

const styles = {
  inActiveStyle: tw`items-start bg-gray-300`,
  inActiveInnerCircle: tw`bg-gray-400`,
  toogleButton: tw`w-12.5 h-6.5 rounded-full bg-primary justify-center px-1 items-end`,
  innerCircle: tw`w-4.5 h-4.5 rounded-full bg-white`,
};

export default ToggleSwitch;
