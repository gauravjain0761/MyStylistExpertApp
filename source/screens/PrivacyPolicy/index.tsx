import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Container from '../../components/container';
import Header from '../../components/header';
import {useAppDispatch} from 'store';
import {privacypolicy} from '../../Actions/conditionAction';
import RenderHTML from 'react-native-render-html';
import {AppContext} from 'context';
import {screen_width} from '../../utils/dimentions';

const PrivacyPolicy = () => {
  const dispatch = useAppDispatch();
  const [privacypolicys, setPrivacyPolicys] = useState([]);
  const {setLoading} = useContext(AppContext);
  useEffect(() => {
    getPrivacyPolicy();
  }, []);

  const getPrivacyPolicy = () => {
    setLoading(true);
    let obj = {
      onSuccess: (res: any) => {
        setLoading(false);
        setPrivacyPolicys(res?.data?.content);
        console.log('res', res);
      },
      onFailure: (Err: any) => {
        setLoading(false);
        console.log('Err', Err);
      },
    };
    dispatch(privacypolicy(obj));
  };

  const source = {
    html: privacypolicys,
  };

  return (
    <Container>
      <View>
        <Header title="Privacy Policy" />
        <ScrollView>
          <RenderHTML contentWidth={screen_width} source={source} />
        </ScrollView>
      </View>
    </Container>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({});
