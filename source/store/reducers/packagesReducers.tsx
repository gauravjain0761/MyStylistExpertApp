import {GET_PACKAGES} from '../types';

const initialState = {
  getpackages: [],
};

export default function (state = initialState, action: any) {
  switch (action?.type) {
    case GET_PACKAGES: {
      return {
        ...state,
        getpackages: action.payload,
      };
    }
    default:
      return state;
  }
}
