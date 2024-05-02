import {FC} from 'react';
import tw from 'rn-tailwind';
import Text from './text';
import globalStyle from '../globalStyles';
import {Pressable, PressableProps, ViewStyle} from 'react-native';

interface Props extends PressableProps {
  lable?: string;
  style?: ViewStyle;
  onPress: () => void;
  children?: JSX.Element;
  labelColor?: string;
  labelFontWeight?: string;
}

const Button: FC<Props> = ({
  onPress,
  style,
  labelColor = 'text-black',
  lable = 'Lable',
  children,
  labelFontWeight = '400',
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        globalStyle.bothContentCenter,
        styles.defaultStyle,
        style && style,
      ]}>
      {children ? (
        children
      ) : (
        <Text color={labelColor} fontWeight={labelFontWeight} size={'sm'}>
          {lable}
        </Text>
      )}
    </Pressable>
  );
};

const styles = {
  defaultStyle: tw` w-full h-13 bg-primary rounded-lg`,
};

export default Button;
