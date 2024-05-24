import {BANNER_IMAGE, UPCOMING_APPOINTMENTS} from '../types';

const initialState = {
  appointment: [],
  bannerImage: [],
};

export default function (state = initialState, action: any) {
  switch (action?.type) {
    case UPCOMING_APPOINTMENTS: {
      return {...state, appointment: action.payload};
    }
    case BANNER_IMAGE: {
      return {...state, bannerImage: action.payload};
    }
    default:
      return state;
  }
}
