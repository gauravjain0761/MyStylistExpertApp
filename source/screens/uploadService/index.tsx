import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import Container from '../../components/container';
import Header from '../../components/header';
import {commonFontStyle, fontFamily, hp, wp} from '../../utils/dimentions';
import Color from '../../../assets/color';
import ImagePicker from '../../components/imagepicker';
import images from 'images';
import {launchImageLibrary} from 'react-native-image-picker';
import PrimaryButton from '../../components/PrimaryButton';

const ServiceUpload: FC = () => {
  const {params} = useRoute();
  const data = params?.data;

  const [selectedImage, setSelectedImage] = useState([]);
  const [main, setMain] = useState(0);

  const onPressImageUpload = async () => {
    let Data = [];
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 6,
      });
      Data.push(...result?.assets);
      let newData = Data.map((item, index) => ({
        id: Math.floor(Math.random() * 9000000000) + 1000000000,
        ...item,
      }));
      setSelectedImage(newData);
    } catch (error) {}
  };

  return (
    <Container>
      <Header title={data?.name} />
      <View style={styles.mainContainer}>
        <ScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled>
          <View style={styles.titlecontainer}>
            <Text style={styles.title}>
              {'Upload a photo for this service'}
            </Text>
            <Text style={styles.subtitle}>
              {
                "My Stylist require you to upload a real work photo graph. Don't worry, your data will stay safe and private."
              }
            </Text>
          </View>
          <ImagePicker
            titleStyle={styles.buttontitle}
            innercontainer={styles.uploadContainer}
            placeholderIcon={images.cameraicon}
            placeholderTitle="Take Photo or Upload image here.."
            onPress={onPressImageUpload}
          />
          <View style={styles.separatorcontainer}>
            <View style={styles.separator}></View>
            <Text style={styles.sepratortext}>{'or'}</Text>
            <View style={styles.separator}></View>
          </View>
          <Text style={styles.description}>
            {'You can upload Max 6 images for this service.'}
          </Text>
          <View style={styles?.imagecontainer}>
            <FlatList
              data={selectedImage}
              columnWrapperStyle={{gap: wp(11)}}
              numColumns={3}
              renderItem={({item, index}) => {
                return (
                  <Pressable
                    onPress={() => setMain(index)}
                    style={styles?.photo}>
                    <Image
                      resizeMode="stretch"
                      style={styles?.image}
                      source={{uri: item?.uri}}
                    />
                    <TouchableOpacity style={styles?.trashIcon}>
                      <Image
                        style={styles.trashIcon}
                        resizeMode="contain"
                        source={images?.trash}
                      />
                    </TouchableOpacity>
                    <View
                      style={[
                        styles?.selectheader,
                        {
                          backgroundColor:
                            main == index ? Color?.Green : Color?.White,
                        },
                      ]}>
                      <View style={styles.radio}>
                        {main == index ? (
                          <Image source={images?.Check} style={styles?.check} />
                        ) : null}
                      </View>
                      {main == index && (
                        <Text style={styles.selecttitle}>{'Main Image'}</Text>
                      )}
                    </View>
                  </Pressable>
                );
              }}
            />
          </View>
        </ScrollView>
        <View style={styles.footerView}>
          <PrimaryButton label="Submit" onPress={() => {}} />
        </View>
      </View>
    </Container>
  );
};

export default ServiceUpload;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
  title: {
    ...commonFontStyle(fontFamily.bold, 32, Color?.Black),
    lineHeight: hp(40),
  },
  titlecontainer: {
    paddingHorizontal: wp(23),
    marginTop: hp(10),
  },
  subtitle: {
    marginTop: hp(12),
    ...commonFontStyle(fontFamily.regular, 18, Color?.Grey21),
    lineHeight: hp(29),
  },
  uploadContainer: {
    marginHorizontal: wp(25),
    marginTop: hp(13),
    gap: wp(7),
  },
  buttontitle: {
    ...commonFontStyle(fontFamily.RobotoMedium, 14, Color?.Green35),
    lineHeight: hp(17),
  },
  separatorcontainer: {
    paddingHorizontal: wp(23),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(36),
  },
  separator: {
    height: hp(1),
    backgroundColor: Color?.GreyEE,
    flex: 1,
    top: hp(2),
  },
  sepratortext: {
    ...commonFontStyle(fontFamily.regular, 18, Color?.Grey61),
    lineHeight: hp(25),
    marginHorizontal: wp(12),
  },
  description: {
    marginLeft: wp(25),
    marginTop: hp(19),
    ...commonFontStyle(fontFamily.regular, 14, Color?.Grey5F),
    lineHeight: hp(22),
  },
  photo: {
    width: wp(100),
    height: hp(110),
    marginBottom: hp(11),
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(20),
    marginTop: hp(13),
  },
  trashIcon: {
    width: wp(24),
    height: wp(24),
    position: 'absolute',
    top: hp(4),
    right: wp(4),
  },
  selectheader: {
    height: hp(26),
    width: '100%',
    backgroundColor: Color?.White,
    position: 'absolute',
    bottom: 0,
    opacity: 0.9,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: wp(5),
  },
  radio: {
    width: wp(16),
    height: wp(16),
    borderWidth: 1.5,
    borderColor: Color?.Black,
    borderRadius: wp(100),
    marginLeft: wp(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  selecttitle: {
    ...commonFontStyle(fontFamily.medium, 12, Color?.Black),
  },
  check: {
    width: wp(10),
    height: hp(10),
  },
  footerView: {
    backgroundColor: Color?.White,
    paddingHorizontal: wp(20),
    paddingTop: hp(14),
    paddingBottom: hp(29),
  },
});
