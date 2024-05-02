import {PayloadAction} from '@reduxjs/toolkit';

import axios, {AxiosResponse} from 'axios';
import {put, takeLatest} from 'redux-saga/effects';
import {USER} from '../types';
import {getApiData} from '../reducers/user';

function* getUserSaga({payload: id}: PayloadAction<string>) {
  try {
    const response: AxiosResponse<USER> = yield axios.get(
      `https://jsonplaceholder.typicode.com/todos/1`,
    );
    yield put(getApiData(response.data));
  } catch (error) {}
}

export function* watchGetUser() {
  yield takeLatest('user/startGetData', getUserSaga);
}
