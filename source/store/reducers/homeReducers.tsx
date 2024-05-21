import {UPCOMING_APPOINTMENTS, USER_INFO} from '../types';

const initialState = {
  appointment: [],
};

export default function (state = initialState, action: any) {
  switch (action?.type) {
    case UPCOMING_APPOINTMENTS: {
      return {...state, appointment: action.payload};
    }
    default:
      return state;
  }
}
