import {GET_OFFERS} from '../types';

const initialState = {
  getoffers: [],
};

export default function (state = initialState, action: any) {
  switch (action?.type) {
    case GET_OFFERS: {
      return {
        ...state,
        getoffers: action.payload,
      };
    }
    default:
      return state;
  }
}
