import React, {FC, useEffect, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import tw from 'rn-tailwind';
import {style} from 'twrnc';
import Color from '../../assets/color';

interface Props {
  active: boolean;
  onValueChange?: () => void;
}

const ToggleSwitch: FC<Props> = ({active = true, onValueChange}) => {
  const [isActive, setActive] = useState<boolean>(true);

  useEffect(() => {
    setActive(active);
  }, [active]);

  return (
    <Pressable
      onPress={() => (setActive(!isActive), onValueChange())}
      style={[styles.toogleButton, !isActive && styles.inActiveStyle]}>
      <View
        style={[styles.innerCircle, !isActive && styles.inActiveInnerCircle]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  inActiveStyle: {
    ...tw`items-start bg-gray-300`,
    backgroundColor: Color?.GreyEB,
  },
  inActiveInnerCircle: {...tw`bg-gray-400`, backgroundColor: Color?.GreyC1},
  toogleButton: tw`w-12.5 h-6.5 rounded-full bg-primary justify-center px-1 items-end`,
  innerCircle: tw`w-4.5 h-4.5 rounded-full bg-white`,
});

export default ToggleSwitch;
