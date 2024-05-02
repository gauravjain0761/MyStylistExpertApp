import tw from 'rn-tailwind';
import {StatusBar} from 'react-native';

const globalStyle = {
  container: tw`flex-1 w-full h-full bg-white`,
  mainView: tw`flex-1 w-full h-full items-center px-4 bg-white`,
  subMainView: tw`flex-1 w-full h-full px-4 bg-white `,
  wrapper: tw`flex-1 w-full h-full items-center bg-white`,
  subWrapper: tw`flex-1 w-full h-full bg-white`,
  footerButton: tw`w-full h-20 pt-2`,
  itemsCenter: tw`items-center`,
  bothContentCenter: tw`items-center justify-center`,
  statusBar: {paddingTop: StatusBar.currentHeight},
  defaultImage: tw`w-10 h-10`,
  dotedLine: {
    borderColor: '#000000',
    borderStyle: 'dashed',
    borderTopWidth: 0,
    borderWidth: 1,
  },
};

export default globalStyle;
