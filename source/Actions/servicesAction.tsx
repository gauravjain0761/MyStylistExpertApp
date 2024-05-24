import {AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {RootState} from 'store';
import {useContext} from 'react';
import {AppContext} from 'context';
import {makeAPIRequest} from '../utils/apiGlobal';
import {GET, POST, endPoints} from '../../config';
import DataAccess from '../dataAccess';
import {
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
          if (request.onSuccess) request.onSuccess(response.data);
          dispatch({
            type: TOPSERVICESOLD,
            payload: response?.data?.topServices,
          });
        }
      })
      .catch(error => {
        if (request.onFailure) request.onFailure(error.response);
      });
  };
