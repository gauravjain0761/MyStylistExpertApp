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
  PAST_APPOINTMENTS,
  UPCOMING_APPOINTMENTS,
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
          dispatch({
            type: GET_OFFERS,
            payload: response?.data,
          });
        }
      })
      .catch(error => {
        if (request.onFailure) request.onFailure(error.response);
      });
  };

export const generateOffer =
  (request?: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: await getAsyncToken(),
    };
    console.log('dadadtadadad', request?.data);

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
