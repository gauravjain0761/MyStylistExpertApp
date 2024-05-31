import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Container from '../../components/container';
import Header from '../../components/header';
import RenderHTML from 'react-native-render-html';
import {screen_width} from '../../utils/dimentions';
import {useAppDispatch} from 'store';
import {AppContext} from 'context';
import {getterms} from '../../Actions/conditionAction';

const Terms = () => {
  const dispatch = useAppDispatch();
  const [terms, setTerms] = useState([]);

  const {setLoading} = useContext(AppContext);
  useEffect(() => {
    getTerms();
  }, []);

  const source = {
    html: terms,
  };

  const getTerms = () => {
    setLoading(true);
    let obj = {
      onSuccess: (res: any) => {
        setLoading(false);
        setTerms(res?.data?.content);
        console.log('res', res);
      },
      onFailure: (Err: any) => {
        setLoading(false);
        console.log('Err', Err);
      },
    };
    dispatch(getterms(obj));
  };

  return (
    <Container>
      <View>
        <Header title="Terms & Conditions" />
        <ScrollView>
          <RenderHTML contentWidth={screen_width} source={source} />
        </ScrollView>
      </View>
    </Container>
  );
};

export default Terms;

const styles = StyleSheet.create({});
