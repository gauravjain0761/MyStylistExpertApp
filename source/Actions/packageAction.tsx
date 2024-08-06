import {AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {RootState} from 'store';
import {useContext} from 'react';
import {AppContext} from 'context';
import {makeAPIRequest} from '../utils/apiGlobal';
import {GET, POST, endPoints} from '../../config';
import DataAccess from '../dataAccess';
import {GET_PACKAGES, GET_PACKAGE_ORDER} from '../store/types';
const {getAsyncToken} = DataAccess();

export const generatePackage =
  (request?: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: await getAsyncToken(),
    };
    return makeAPIRequest({
      method: POST,
      url: endPoints.createPackage,
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

export const getAllPackage =
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
      params: request.params,
    })
      .then(async (response: any) => {
        if (response.status === 200 || response.status === 201) {
          if (request.onSuccess) request.onSuccess(response.data);
          const data = {...response?.data, page: request?.page};
          dispatch({
            type: GET_PACKAGES,
            payload: data,
          });
        }
      })
      .catch(error => {
        if (request.onFailure) request.onFailure(error.response);
      });
  };

export const getPackageOrders =
  (request?: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: await getAsyncToken(),
    };

    return makeAPIRequest({
      url: endPoints?.getAllExpertOrders,
      method: POST,
      headers: headers,
      data: request?.data,
    })
      .then(async (response: any) => {
        if (response.status === 200 || response.status === 201) {
          if (request.onSuccess) request.onSuccess(response.data);
          const data = {...response?.data, page: request?.page};
          dispatch({type: GET_PACKAGE_ORDER, payload: data});
        }
      })
      .catch(error => {
        if (request.onFailure) request.onFailure(error.response);
      });
  };
