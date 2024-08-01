import {combineReducers} from '@reduxjs/toolkit';
import user from './user';
import commonReducers from './commonReducers';
import homeReducers from './homeReducers';
import appointmentReducers from './appointmentReducers';
import servicesReducers from './servicesReducers';
import packagesReducers from './packagesReducers';
import offersReducers from './offersReducers';
import reviewReducers from './reviewReducers';
import walletReducers from './walletReducers';
import campaignReducers from './campaignReducers';
import notificationReducers from './notificationReducers';
import availablilityReducers from './availablilityReducers';

const rootReducer = combineReducers({
  user: user,
  common: commonReducers,
  home: homeReducers,
  appointment: appointmentReducers,
  service: servicesReducers,
  packages: packagesReducers,
  offers: offersReducers,
  review: reviewReducers,
  wallet: walletReducers,
  campaign: campaignReducers,
  notification: notificationReducers,
  availability: availablilityReducers,
});

export default rootReducer;
