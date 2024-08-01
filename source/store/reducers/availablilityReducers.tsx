import {GET_WORKINGHOURS} from '../types';

const initialState = {
  working_hours: [],
};

export default function (state = initialState, action: any) {
  switch (action?.type) {
    case GET_WORKINGHOURS: {
      return {
        ...state,
        working_hours: action?.payload,
      };
    }
    default:
      return state;
  }
}
