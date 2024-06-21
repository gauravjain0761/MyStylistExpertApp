import {GET_NOTIFICATION_LIST} from '../types';

const initialState = {
  notificationsList: [],
};

export default function (state = initialState, action: any) {
  switch (action?.type) {
    case GET_NOTIFICATION_LIST: {
      return {
        ...state,
        notificationsList: action.payload,
      };
    }
    default:
      return state;
  }
}
