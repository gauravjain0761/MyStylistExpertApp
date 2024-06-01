import {GET_OFFERS, GET_OFFER_ORDER} from '../types';

const initialState = {
  getoffers: [],
  getofferorder: [],
};

export default function (state = initialState, action: any) {
  switch (action?.type) {
    case GET_OFFERS: {
      return {
        ...state,
        getoffers: action.payload,
      };
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
