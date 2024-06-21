import DataAccess from '../dataAccess';
import {ThunkAction} from 'redux-thunk';
import {AnyAction} from 'redux';
import {makeAPIRequest} from '../utils/apiGlobal';
import {GET, POST, endPoints} from '../../config';
import {RootState} from 'store';
import {GET_NOTIFICATION_LIST} from '../store/types';

const {getAsyncToken} = DataAccess();

export const getAllNotification =
  (request?: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: await getAsyncToken(),
    };
    return makeAPIRequest({
      method: POST,
      url: endPoints?.notification,
      headers: headers,
      data: request?.data,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          if (request.onSuccess) request.onSuccess(response.data);
          dispatch({type: GET_NOTIFICATION_LIST, payload: response.data});
        }
      })
      .catch(error => {
        if (request.onFailure) request.onFailure(error.response);
      });
  };
