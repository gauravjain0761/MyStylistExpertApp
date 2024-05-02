/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './source/**/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Nunito: ['Nunito'],
      },
      colors: {
        primary: '#89E3DC',
        primaryDark: '#4E4E4E',
        PlacholderColor: '#6a7989',
        dimGrey: '#FAFAFA',
        borderDarkGrey: '#EBEBEB',
        cultured: '#f5f5f5',
        oldLace: '#FAF5E9',
        darkGrey: '#666666',
        mistyRose: '#f7e6e6',
        aliceBlue: '#effbfa',
        isabelline: '#F7F5EB',
        aliceBlueDark: '#EFF4FB',
        aeroBlue: '#DBFFEA',
        green: '#1AAA55',
        bubbles: '#E2F4FC',
        brightGray: '#E4F7EA',
        antiFlashWhite: '#F6F1F1',
        floralWhite: '#FFF9ED',
        englishVermillion: '#C84949',
        topaz: '#f8c77c',
        magnolia: '#f6edfa',
        aliceBlueDim: '#edf3fa',
        seashel: '#FEF8EC',
        linen: '#FFECEC',
        pictonBlue: '#40baff',
      },
    },
  },
  plugins: [],
};
