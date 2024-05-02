import {all, fork} from 'redux-saga/effects';
import {watchGetUser} from './user';

function* RootSaga() {
  yield all([fork(watchGetUser)]);
}

export default RootSaga;
