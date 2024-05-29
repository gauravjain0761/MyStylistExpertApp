import {GET_REVIEWS, GET_TOP_REVIEWS} from '../types';

const initialState = {
  getReviews: [],
  getTopReviews: [],
};

export default function (state = initialState, action: any) {
  switch (action?.type) {
    case GET_REVIEWS: {
      return {
        ...state,
        getReviews: action.payload,
      };
    }
    case GET_TOP_REVIEWS: {
      return {
        ...state,
        getTopReviews: action.payload,
      };
    }
    default:
      return state;
  }
}
