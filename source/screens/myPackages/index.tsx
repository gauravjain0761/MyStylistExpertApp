import React, {FC, useEffect} from 'react';
import {Pressable, View, FlatList} from 'react-native';
import tw from 'rn-tailwind';
import images from 'images';
import {RootStackParamList} from '..';
import globalStyle from 'globalStyles';
import {RouteProp} from '@react-navigation/native';
import {Container, Text, Header, Image, PackageCard} from 'components';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useMyPackage from './hooks';

const cardsColor = {
  1: '#F7F5EB',
  2: '#CCF0FF',
  3: '#FFE1E4',
  4: '#F7E6E6',
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MyPackages'>;
  route: RouteProp<RootStackParamList, 'MyPackages'>;
};

const MyPackages: FC<Props> = ({navigation}) => {
  const {myPackages, getmyPackages} = useMyPackage();

  useEffect(() => {
    getmyPackages();
  }, []);

  return (
    <Container>
      <View style={globalStyle.container}>
        <Header
          title="Packages (23)"
          rightView={
            <View style={styles.headerRight}>
              <Pressable
                style={[styles.headerButton, globalStyle.bothContentCenter]}>
                <Image
                  style={styles.searchIcon}
                  source={images.CalendarIcon}
                  resizeMode="contain"
                />
              </Pressable>
              <Pressable
                style={[styles.headerButton, globalStyle.bothContentCenter]}>
                <Image
                  style={styles.searchIcon}
                  source={images.Search}
                  resizeMode="contain"
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate('CreatePackage');
                }}
                style={[styles.addNewButton, globalStyle.bothContentCenter]}>
                <Image
                  style={styles.plusIcon}
                  source={images.PlusIcon}
                  resizeMode="contain"
                />
                <Text size="sm" fontWeight="800" color="text-black">
                  {'Add New'}
                </Text>
              </Pressable>
            </View>
          }
        />
        <View style={styles.mainView}>
          <FlatList
            data={myPackages}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listView}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
            renderItem={({item, index}) => {
              const colorIndex = (index % 4) + 1;
              return (
                <PackageCard
                  data={item}
                  onCardPress={(packageId: string) => {
                    navigation.navigate('PackageDetail', {packageId});
                  }}
                  cardColor={cardsColor[colorIndex]}
                />
              );
            }}
          />
        </View>
      </View>
    </Container>
  );
};

const styles = {
  headerRight: tw`flex-1 w-full h-full flex-row items-center justify-end`,
  headerButton: tw`w-10 h-full`,
  searchIcon: tw`w-6.5 h-6.5`,
  plusIcon: tw`w-3.5 h-3.5 mr-1`,
  addNewButton: tw`w-23 h-8 ml-1.5 flex-row rounded-full bg-primary`,
  mainView: tw`flex-1 px-4 w-full bg-cultured`,
  listView: tw`py-4`,
  listSeparator: tw`h-4 w-full`,
};

export default MyPackages;
