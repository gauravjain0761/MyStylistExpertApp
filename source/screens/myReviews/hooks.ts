import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {AppContext} from 'context';
import {endPoints} from '../../../config';
import APICaller from '../../service/apiCaller';
import { useAppDispatch } from 'store';
import { GET_REVIEWS, GET_TOP_REVIEWS } from '../../store/types';

const useGetReviews = () => {
  const [reviews, setReviews] = useState([]);
  const {userDetails, setLoading} = useContext(AppContext);
  const {getAllExpertReview,getAllExpertTopReview} = endPoints;
  const {_id} = userDetails;
  const dispatch=useAppDispatch()

  const getReviews = async () => {
    // setLoading(true);
    try {
      let url = `${getAllExpertReview}/${_id}`;
      const response = await APICaller.get(url);
      const {data} = response;
      const {reviews} = data;
      if (data.status == 200 || reviews.length) {
        setReviews(reviews);
        dispatch({type:GET_REVIEWS,payload:reviews})
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getTopReviews=async()=>{
        try {
      let url = `${getAllExpertTopReview}/${_id}`;
      const response = await APICaller.get(url);
      const {data} = response;
      const {topReview} = data;      
      if (data.status == 200 || topReview.length) {
        setReviews(reviews);
        dispatch({type:GET_TOP_REVIEWS,payload:topReview})
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return {
    reviews,
    getReviews,
    setLoading,
    getTopReviews
  };
};

export default useGetReviews;

const styles = StyleSheet.create({});
