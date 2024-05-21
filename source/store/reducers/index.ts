import {combineReducers} from '@reduxjs/toolkit';
import user from './user';
import commonReducers from './commonReducers';
import homeReducers from './homeReducers';
import appointmentReducers from './appointmentReducers';
import servicesReducers from './servicesReducers';

const rootReducer = combineReducers({
  user: user,
  common:commonReducers,
  home:homeReducers,
  appointment:appointmentReducers,
  service:servicesReducers
});

export default rootReducer;
