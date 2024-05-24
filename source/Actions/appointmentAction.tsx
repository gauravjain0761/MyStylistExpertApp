import {AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {RootState} from 'store';
import {makeAPIRequest} from '../utils/apiGlobal';
import {POST, endPoints} from '../../config';
import {PAST_APPOINTMENTS, UPCOMING_APPOINTMENTS} from '../store/types';
import DataAccess from '../dataAccess';

const {getAsyncToken} = DataAccess();

export const getUpcomingAppointment =
  (request?: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: await getAsyncToken(),
    };
    return makeAPIRequest({
      method: POST,
      url: endPoints.getUpcomingAppointments,
      headers: headers,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          if (request.onSuccess) request.onSuccess(response.data);
          dispatch({type: UPCOMING_APPOINTMENTS, payload: response.data});
        }
      })
      .catch(error => {
        if (request.onFailure) request.onFailure(error.response);
      });
  };

export const getPastAppointment =
  (request?: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: await getAsyncToken(),
    };
    return makeAPIRequest({
      method: POST,
      url: endPoints.getPastAppointments,
      headers: headers,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          if (request.onSuccess) request.onSuccess(response.data);
          dispatch({type: PAST_APPOINTMENTS, payload: response.data});
        }
      })
      .catch(error => {
        if (request.onFailure) request.onFailure(error.response);
      });
  };
