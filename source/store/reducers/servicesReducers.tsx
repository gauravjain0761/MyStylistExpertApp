import {GET_SERVICES, TOPSERVICESOLD} from '../types';

const initialState = {
  topServices: [],
  services: [],
};

export default function (state = initialState, action: any) {
  switch (action?.type) {
    case TOPSERVICESOLD: {
      if (action?.payload?.page == 1) {
        return {
          ...state,
          topServices: action.payload?.topServices,
        };
      } else {
        return {
          ...state,
          topServices: [...state?.topServices, ...action.payload?.topServices],
        };
      }
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
