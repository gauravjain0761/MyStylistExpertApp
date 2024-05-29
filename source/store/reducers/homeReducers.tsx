import {BANNER_IMAGE, GET_EXPERTS_MEDIA, UPCOMING_APPOINTMENTS} from '../types';

const initialState = {
  appointment: [],
  bannerImage: [],
  expertMedia: [],
};

export default function (state = initialState, action: any) {
  switch (action?.type) {
    case UPCOMING_APPOINTMENTS: {
      return {...state, appointment: action.payload};
    }
    case BANNER_IMAGE: {
      return {...state, bannerImage: action.payload};
    }
    case GET_EXPERTS_MEDIA: {
      return {...state, expertMedia: action.payload};
    }
    default:
      return state;
  }
}
