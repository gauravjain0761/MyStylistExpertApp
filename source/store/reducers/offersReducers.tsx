import {GET_OFFERS, GET_OFFER_ORDER} from '../types';

const initialState = {
  getoffers: [],
  getofferorder: [],
};

export default function (state = initialState, action: any) {
  switch (action?.type) {
    case GET_OFFERS: {
      if (action?.payload?.page == 1) {
        return {
          ...state,
          getoffers: action.payload?.offers,
        };
      } else {
        return {
          ...state,
          getoffers: [...state?.getoffers, ...action?.payload?.offers],
        };
      }
    }
    case GET_OFFER_ORDER: {
      return {
        ...state,
        getofferorder: action.payload,
      };
    }
    default:
      return state;
  }
}
