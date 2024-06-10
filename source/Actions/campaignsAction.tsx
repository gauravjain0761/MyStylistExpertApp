import {AppContext} from 'context';
import {useContext} from 'react';
import DataAccess from '../dataAccess';
import {ThunkAction} from 'redux-thunk';
import {AnyAction} from 'redux';
import {makeAPIRequest} from '../utils/apiGlobal';
import {GET, POST, endPoints} from '../../config';
import {RootState} from 'store';
import {GET_CAMPAIGN_ORDER} from '../store/types';

const {getAsyncToken} = DataAccess();

export const campaignAccept =
  (request?: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: await getAsyncToken(),
    };
    return makeAPIRequest({
      method: POST,
      url: endPoints?.campaignAccept,
      headers: headers,
      data: request?.data,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          if (request.onSuccess) request.onSuccess(response.data);
        }
      })
      .catch(error => {
        if (request.onFailure) request.onFailure(error.response);
      });
  };

export const getCampaignsOrders =
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
          dispatch({type: GET_CAMPAIGN_ORDER, payload: data});
        }
      })
      .catch(error => {
        if (request.onFailure) request.onFailure(error.response);
      });
  };
