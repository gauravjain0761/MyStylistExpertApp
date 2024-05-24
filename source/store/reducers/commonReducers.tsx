import {USER_INFO} from '../types';

const initialState = {
  userinfo: {},
};

export default function (state = initialState, action: any) {
  switch (action?.type) {
    case USER_INFO: {
      return {...state, userinfo: action.payload};
    }
    default:
      return state;
  }
}
