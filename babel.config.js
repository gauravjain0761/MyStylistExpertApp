module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./source'],
        alias: {
          utils: './source/utils',
          context: './source/context',
          store: './source/store',
          images: './assets/images',
          modals: './source/modals',
          navigator: './source/navigator',
          'rn-tailwind': './source/tailwind',
          components: './source/components',
          AppConstants: './source/appConstants',
          globalStyles: './source/globalStyles',
          bottomSheets: './source/bottomSheets',
          service: './source/service',
          types: './source/types',
        },
      },
    ],
  ],
};
