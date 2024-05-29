import {GET_SERVICES, TOPSERVICESOLD} from '../types';

const initialState = {
  topServices: [],
  services: [],
};

export default function (state = initialState, action: any) {
  switch (action?.type) {
    case TOPSERVICESOLD: {
      return {
        ...state,
        topServices: action.payload,
      };
    }
    case GET_SERVICES: {
      return {
        ...state,
        services: action.payload,
      };
    }
    default:
      return state;
  }
}
