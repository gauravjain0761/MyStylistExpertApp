import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import Modals from '../components/Modals';
import {commonFontStyle, fontFamily, hp, wp} from '../utils/dimentions';
import Color from '../../assets/color';

type Props = {
  visible: boolean;
  setVisibility: (value: boolean) => void;
};

const FilterSheet: FC<Props> = ({visible, setVisibility}) => {
  const [filter, setFilter] = useState('');

  return (
    <Modals
      visible={visible}
      close={setVisibility}
      IsBackdropPress={false}
      header
      title="Filter"
      contain={
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => setFilter('Week')}
            style={styles.listcontainer}>
            <Text style={styles.title}>{'Week'}</Text>
            <View style={styles.radio}>
              {filter == 'Week' && <View style={styles.radiofill}></View>}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilter('Month')}
            style={styles.listcontainer}>
            <Text style={styles.title}>{'Month'}</Text>
            <View style={styles.radio}>
              {filter == 'Month' && <View style={styles.radiofill}></View>}
            </View>
          </TouchableOpacity>
          <View style={styles.buttoncontainer}>
            <TouchableOpacity
              style={styles.cancelbutton}
              onPress={() => setVisibility(false)}>
              <Text style={[styles.buttontext, {color: Color?.Grey4A}]}>
                {'Cancel'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applybutton}
              onPress={() => setVisibility(false)}>
              <Text style={styles.buttontext}>{'Apply'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    />
  );
};

export default FilterSheet;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: hp(24),
    gap: hp(16),
  },
  listcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...commonFontStyle(fontFamily.medium, 18, Color?.Grey37),
    lineHeight: hp(26),
  },
  radio: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(100),
    borderWidth: wp(1.3),
    borderColor: Color?.Grey37,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttoncontainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: wp(20),
    marginTop: hp(48),
  },
  buttontext: {
    ...commonFontStyle(fontFamily.RobotoMedium, 16, Color?.Black),
  },
  applybutton: {
    backgroundColor: Color?.Green,
    borderRadius: wp(7),
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp(15),
  },
  cancelbutton: {
    backgroundColor: Color?.GreyEB,
    borderRadius: wp(7),
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp(15),
  },
  radiofill: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(100),
    backgroundColor: Color?.Green,
  },
});
