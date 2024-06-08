import {GET_PACKAGES} from '../types';

const initialState = {
  getpackages: [],
};

export default function (state = initialState, action: any) {
  switch (action?.type) {
    case GET_PACKAGES: {
      if (action?.payload?.page == 1) {
        return {
          ...state,
          getpackages: action?.payload?.packages,
        };
      } else {
        return {
          ...state,
          getpackages: [...state?.getpackages, ...action?.payload?.packages],
        };
      }
    }
    default:
      return state;
  }
}
