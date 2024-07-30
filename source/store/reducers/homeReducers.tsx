import {BANNER_IMAGE, GET_APPOINTMENTS, GET_EXPERTS_MEDIA} from '../types';

const initialState = {
  appointment: [],
  bannerImage: [],
  expertMedia: [],
};

export default function (state = initialState, action: any) {
  switch (action?.type) {
    case BANNER_IMAGE: {
      return {...state, bannerImage: action.payload};
    }
    case GET_EXPERTS_MEDIA: {
      return {...state, expertMedia: action.payload};
    }
    case GET_APPOINTMENTS: {
      if (action?.payload?.page == 1) {
        return {...state, appointment: [...action?.payload?.appointments]};
      } else {
        return {
          ...state,
          appointment: [...state?.appointment, ...action.payload?.appointments],
        };
      }
    }
    default:
      return state;
  }
}
