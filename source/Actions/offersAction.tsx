import {AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {RootState} from 'store';
import {useContext} from 'react';
import {AppContext} from 'context';
import {makeAPIRequest} from '../utils/apiGlobal';
import {GET, POST, endPoints} from '../../config';
import DataAccess from '../dataAccess';
import {
  BANNER_IMAGE,
  GET_OFFERS,
  GET_OFFER_ORDER,
  PAST_APPOINTMENTS,
} from '../store/types';

const {getAsyncToken} = DataAccess();

export const getallOffers =
  (request?: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: await getAsyncToken(),
    };
    return makeAPIRequest({
      method: GET,
      url: request?.url,
      headers: headers,
      params: request?.params,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          if (request.onSuccess) request.onSuccess(response.data);
          const data = {...response?.data, page: request?.page};
          dispatch({
            type: GET_OFFERS,
            payload: data,
          });
        }
      })
      .catch(error => {
        if (request.onFailure) request.onFailure(error);
      });
  };

export const generateOffer =
  (request?: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: await getAsyncToken(),
    };
    return makeAPIRequest({
      url: endPoints?.createExpertOffer,
      method: POST,
      headers: headers,
      data: request?.data,
    })
      .then(async (response: any) => {
        if (response.status === 200 || response.status === 201) {
          if (request.onSuccess) request.onSuccess(response.data);
        }
      })
      .catch(error => {
        if (request.onFailure) request.onFailure(error.response);
      });
  };

export const getOfferOrders =
  (request?: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: await getAsyncToken(),
    };

    return makeAPIRequest({
      url: endPoints?.getOrders,
      method: POST,
      headers: headers,
      data: request?.data,
    })
      .then(async (response: any) => {
        if (response.status === 200 || response.status === 201) {
          if (request.onSuccess) request.onSuccess(response.data);
          const data = {...response?.data, page: request?.page};
          dispatch({type: GET_OFFER_ORDER, payload: data});
        }
      })
      .catch(error => {
        if (request.onFailure) request.onFailure(error.response);
      });
  };
