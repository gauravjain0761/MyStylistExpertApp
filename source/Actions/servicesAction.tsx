import {AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {RootState} from 'store';
import {useContext} from 'react';
import {AppContext} from 'context';
import {makeAPIRequest} from '../utils/apiGlobal';
import {GET, POST, endPoints} from '../../config';
import DataAccess from '../dataAccess';
import {
  GET_SERVICES,
  PAST_APPOINTMENTS,
  TOPSERVICESOLD,
  UPCOMING_APPOINTMENTS,
} from '../store/types';

const {getAsyncToken} = DataAccess();

export const TopService =
  (request?: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: await getAsyncToken(),
    };
    return makeAPIRequest({
      method: POST,
      url: endPoints.topService,
      headers: headers,
      data: request?.data,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          if (request.onSuccess) request.onSuccess(response?.data);
          dispatch({
            type: TOPSERVICESOLD,
            payload: response?.data?.topServices,
          });
        }
      })
      .catch(error => {
        if (request.onFailure) request.onFailure(error?.response);
      });
  };

export const getMyService =
  (request?: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: await getAsyncToken(),
    };
    return makeAPIRequest({
      method: GET,
      url: `${endPoints.getExpertnewSeubServices}/${request?.id}`,
      headers: headers,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          if (request.onSuccess) request.onSuccess(response.data);
          dispatch({
            type: GET_SERVICES,
            payload: response?.data,
          });
        }
      })
      .catch(error => {
        if (request.onFailure) request.onFailure(error.response);
      });
  };

export const uploadSubService =
  (request?: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: await getAsyncToken(),
    };
    return makeAPIRequest({
      method: POST,
      url: endPoints.uploadSubService,
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

export const stylistWorkImage =
  (request?: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    console.log('request', request?.data);
    let headers = {
      'Content-Type': 'application/json',
      Authorization: await getAsyncToken(),
    };
    return makeAPIRequest({
      method: POST,
      url: endPoints.stylistWorkImage,
      headers: headers,
      data: request?.data,
    })
      .then(async (response: any) => {
        if (response?.status === 200) {
          if (request?.onSuccess) request.onSuccess(response?.data);
        }
      })
      .catch(error => {
        if (request?.onFailure) request.onFailure(error?.response);
      });
  };
