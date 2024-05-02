import {combineReducers} from '@reduxjs/toolkit';
import user from './user';

const rootReducer = combineReducers({
  user: user,
});

export default rootReducer;
