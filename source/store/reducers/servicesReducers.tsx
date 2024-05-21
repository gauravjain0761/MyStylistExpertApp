import {TOPSERVICESOLD} from '../types';

const initialState = {
  topServices: [],
};

export default function (state = initialState, action: any) {
  switch (action?.type) {
    case TOPSERVICESOLD: {
      return {
        ...state,
        topServices: action.payload,
      };
    }
    default:
      return state;
  }
}
