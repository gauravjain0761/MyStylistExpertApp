import {AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {RootState} from 'store';
import {makeAPIRequest} from '../utils/apiGlobal';
import {POST, endPoints} from '../../config';
import DataAccess from '../dataAccess';
import {GET_APPOINTMENTS} from '../store/types';

const {getAsyncToken} = DataAccess();

export const getAppointments =
  (request?: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: await getAsyncToken(),
    };
    return makeAPIRequest({
      method: POST,
      url: endPoints.getExpertAppointments,
      headers: headers,
      data: request?.data,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          if (request.onSuccess) request.onSuccess(response.data);
          let data = {...response?.data, page: request?.data?.page};
          dispatch({type: GET_APPOINTMENTS, payload: data});
        }
      })
      .catch(error => {
        if (request.onFailure) request.onFailure(error.response);
      });
  };

export const verifyAppointment =
  (request?: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: await getAsyncToken(),
    };
    return makeAPIRequest({
      method: POST,
      url: endPoints.verifyAppointment,
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

export const updateAppointment =
  (request?: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      'Content-Type': 'application/json',
    };
    return makeAPIRequest({
      method: POST,
      url: endPoints.update_appointment,
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
