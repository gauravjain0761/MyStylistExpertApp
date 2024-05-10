import React, {FC} from 'react';
import {View} from 'react-native';
import {Text} from 'components';
import tw from 'rn-tailwind';
import globalStyle from 'globalStyles';

let graphData = [
  {avrage: '20%', color: '#FFAFA2', day: 'Mo'},
  {avrage: '35%', color: '#FFDFB2', day: 'Tu'},
  {avrage: '50%', color: '#B6FFD4', day: 'We'},
  {avrage: '40%', color: '#FFAFA2', day: 'Th'},
  {avrage: '60%', color: '#A9D4FF', day: 'Fr'},
  {avrage: '50%', color: '#B6FFD4', day: 'Sa'},
  {avrage: '70%', color: '#A9D4FF', day: 'Su'},
];

interface Props {
  graphTitle: string;
  graphContainerStyle?: string;
  showDate?: boolean;
}

const BarChart: FC<Props> = ({
  graphTitle,
  showDate = false,
  graphContainerStyle,
}) => {
  return (
    <View
      style={[styles.graphWrapper, graphContainerStyle && graphContainerStyle]}>
      <View style={styles.titleView}>
        <Text size="base" fontWeight="800">
          {graphTitle}
        </Text>

        {showDate ? (
          <View style={[styles.dateView, globalStyle.bothContentCenter]}>
            <Text color="text-darkGrey" size="sm">
              Date
            </Text>
          </View>
        ) : (
          <View />
        )}
      </View>

      <View style={styles.graphContainer}>
        <View style={styles.priceView}>
          <Text color="text-darkGrey" size="sm">
            $50k
          </Text>
          <Text color="text-darkGrey" size="sm">
            $25k
          </Text>
          <Text color="text-darkGrey" size="sm">
            $0
          </Text>
        </View>
        {graphData.map((data, index) => {
          return (
            <View style={styles.lineWraper}>
              <View key={index.toString()} style={styles.graphLine}>
                <View
                  style={[
                    styles.graphLineFill,
                    {
                      height: data.avrage,
                      backgroundColor: data.color,
                    },
                  ]}
                />
              </View>
              <Text size="sm" margin="mt-2" color="text-darkGrey">
                {data.day}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = {
  graphWrapper: tw`w-85 h-76 bg-white mr-4 rounded-lg`,
  graphContainer: tw`w-85 h-50 flex-row bg-white`,
  priceView: tw`w-14 h-full items-end pr-1 justify-between pt-3`,
  lineWraper: tw`w-7 h-full items-center ml-3`,
  graphLine: tw`w-7 h-full rounded-xl bg-cultured justify-end `,
  graphLineFill: tw`w-full rounded-xl`,
  titleView: tw`flex-row justify-between h-17 pl-5 pr-4 items-center`,
  dateView: tw`w-15 h-8 rounded-full bg-aliceBlue`,
};

export default BarChart;

// import React, {FC} from 'react';
// import {View} from 'react-native';
// import {Text} from 'components';
// import tw from 'rn-tailwind';
// import globalStyle from 'globalStyles';

// let graphData = [
//   {avrage: '20%', color: '#FFAFA2', day: 'Mo'},
//   {avrage: '35%', color: '#FFDFB2', day: 'Tu'},
//   {avrage: '50%', color: '#B6FFD4', day: 'We'},
//   {avrage: '40%', color: '#FFAFA2', day: 'Th'},
//   {avrage: '60%', color: '#A9D4FF', day: 'Fr'},
//   {avrage: '50%', color: '#B6FFD4', day: 'Sa'},
//   {avrage: '70%', color: '#A9D4FF', day: 'Su'},
// ];

// interface Props {
//   graphTitle: string;
//   graphContainerStyle?: string;
//   showDate?: boolean;
// }

// const BarChart: FC<Props> = ({
//   graphTitle,
//   showDate = false,
//   graphContainerStyle,
// }) => {
//   return (
//     <View
//       style={[styles.graphWrapper, graphContainerStyle && graphContainerStyle]}>
//       <View style={styles.titleView}>
//         <Text size="base" fontWeight="800">
//           {graphTitle}
//         </Text>

//         {showDate ? (
//           <View style={[styles.dateView, globalStyle.bothContentCenter]}>
//             <Text color="text-darkGrey" size="sm">
//               Date
//             </Text>
//           </View>
//         ) : (
//           <View />
//         )}
//       </View>

//       <View style={styles.graphContainer}>
//         <View style={styles.priceView}>
//           <Text color="text-darkGrey" size="sm">
//             $50k
//           </Text>
//           <Text color="text-darkGrey" size="sm">
//             $25k
//           </Text>
//           <Text color="text-darkGrey" size="sm">
//             $0
//           </Text>
//         </View>
//         {graphData.map((data, index) => {
//           return (
//             <View style={styles.lineWraper}>
//               <View key={index.toString()} style={styles.graphLine}>
//                 <View
//                   style={[
//                     styles.graphLineFill,
//                     {
//                       height: data.avrage,
//                       backgroundColor: data.color,
//                     },
//                   ]}
//                 />
//               </View>
//               <Text size="sm" margin="mt-2" color="text-darkGrey">
//                 {data.day}
//               </Text>
//             </View>
//           );
//         })}
//       </View>
//     </View>
//   );
// };

// const styles = {
//   graphWrapper: tw`w-85 h-76 bg-white ml-4 rounded-lg`,
//   graphContainer: tw`w-85 h-50 flex-row bg-white`,
//   priceView: tw`w-14 h-full items-end pr-1 justify-between pt-3`,
//   lineWraper: tw`w-7 h-full items-center ml-3`,
//   graphLine: tw`w-7 h-full rounded-xl bg-cultured justify-end `,
//   graphLineFill: tw`w-full rounded-xl`,
//   titleView: tw`flex-row justify-between h-17 pl-5 pr-4 items-center`,
//   dateView: tw`w-15 h-8 rounded-full bg-aliceBlue`,
// };

// export default BarChart;
