import {PAST_APPOINTMENTS} from '../types';

const initialState = {
  past_appointment: [],
};

export default function (state = initialState, action: any) {
  switch (action?.type) {
    case PAST_APPOINTMENTS: {
      return {
        ...state,
        past_appointment: action.payload,
      };
    }
    default:
      return state;
  }
}
