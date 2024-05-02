import React, {FC, useContext, useEffect, useState} from 'react';
import tw from 'rn-tailwind';
import images from 'images';
import {Faqs} from 'types';
import {AppContext} from 'context';
import globalStyle from 'globalStyles';
import {endPoints} from '../../../config';
import APICaller from '../../service/apiCaller';
import {Text, Container, Header} from 'components';
import {View, Image, FlatList, Pressable} from 'react-native';

const {getAllFAQForMobile} = endPoints;

const Faq: FC = () => {
  const {setLoading} = useContext(AppContext);
  const [allFaq, setFaq] = useState<Array<Faqs>>([]);
  const [activeFaq, setActiveFaq] = useState<number>();

  const getAllFaq = async () => {
    setLoading(true);
    try {
      const url = getAllFAQForMobile;
      const response = await APICaller.get(url);
      const {data, status} = response.data;
      if (status === 200) {
        setFaq(data);
      }
      console.log('respose of getting faq', response);
    } catch (error) {
      console.log('error of getting faq', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllFaq();
  }, []);

  return (
    <Container>
      <View style={globalStyle.container}>
        <Header
          title={`FAQ'S`}
          rightView={
            <View style={styles.rightView}>
              <Pressable style={styles.rightIconButton}>
                <Image
                  resizeMode="contain"
                  style={styles.rightIcon}
                  source={images.MessageIcon}
                />
              </Pressable>
            </View>
          }
        />
        <View style={styles.mainView}>
          <FlatList
            data={allFaq}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => {
              return <View style={styles.listSeparator} />;
            }}
            renderItem={({item, index}) => {
              const {FaqAnswer, FaqTitle, status} = item;
              if (status === 'Active') {
                return (
                  <Pressable
                    onPress={() => {
                      setActiveFaq(activeFaq === index ? undefined : index);
                    }}
                    style={styles.itemWrapper}>
                    <View style={styles.itemContainer}>
                      <Text size="base" fontWeight="800">
                        {FaqTitle}
                      </Text>
                      <Image
                        resizeMode="contain"
                        tintColor={'#d3d3d3'}
                        source={images.PlusIcon}
                        style={styles.plusIcon}
                      />
                    </View>
                    {activeFaq === index ? (
                      <Text size="sm" margin="mt-2">
                        {FaqAnswer}
                      </Text>
                    ) : (
                      <View />
                    )}
                  </Pressable>
                );
              }
            }}
          />
        </View>
      </View>
    </Container>
  );
};

const styles = {
  mainView: tw`flex-1 w-full h-full px-4 bg-cultured`,
  rightView: tw`flex-1 w-full h-full items-end justify-center pb-4`,
  rightIconButton: tw`w-10 h-10 items-end justify-end`,
  rightIcon: tw`w-6.5 h-6.5`,
  itemWrapper: tw`py-4 bg-aliceBlue px-4 `,
  itemContainer: tw`w-full flex-row items-center justify-between `,
  plusIcon: tw`w-3.5 h-3.5`,
  listSeparator: tw`w-full h-3`,
  list: tw`py-4`,
};
export default Faq;
