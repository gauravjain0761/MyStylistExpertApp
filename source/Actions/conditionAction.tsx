import {AppContext} from 'context';
import {useContext} from 'react';
import DataAccess from '../dataAccess';
import {ThunkAction} from 'redux-thunk';
import {AnyAction} from 'redux';
import {makeAPIRequest} from '../utils/apiGlobal';
import {GET, POST, endPoints} from '../../config';
import {RootState} from 'store';

export const privacypolicy =
  (request?: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      'Content-Type': 'application/json',
    };
    return makeAPIRequest({
      method: GET,
      url: endPoints?.getAllPolicy,
      headers: headers,
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

export const getterms =
  (request?: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      'Content-Type': 'application/json',
    };
    return makeAPIRequest({
      method: GET,
      url: endPoints?.getAllTerms,
      headers: headers,
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
