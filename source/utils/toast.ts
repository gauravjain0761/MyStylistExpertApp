import Toast from 'react-native-simple-toast';

export const NativeToast = (message: string) => Toast.show(message, Toast.LONG);
