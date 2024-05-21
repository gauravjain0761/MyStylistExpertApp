import {AppContext} from 'context';
import {useContext} from 'react';
import DataAccess from '../dataAccess';
import {ThunkAction} from 'redux-thunk';
import {AnyAction} from 'redux';
import {makeAPIRequest} from '../utils/apiGlobal';
import {GET, POST, endPoints} from '../../config';
import {RootState} from 'store';

const {setAsyncToken} = DataAccess();

export const expertLogin =
  (request?: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      'Content-Type': 'application/json',
    };
    return makeAPIRequest({
      method: POST,
      url: endPoints?.expertLogin,
      headers: headers,
      data: request?.data,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          await setAsyncToken(response?.data?.token);
          if (request.onSuccess) request.onSuccess(response.data);
        }
      })
      .catch(error => {
        if (request.onFailure) request.onFailure(error.response);
      });
  };
