import {GET_CAMPAIGN_ORDER} from '../types';

const initialState = {
  campaignOrder: [],
};

export default function (state = initialState, action: any) {
  switch (action?.type) {
    case GET_CAMPAIGN_ORDER: {
      if (action?.payload?.page == 1) {
        return {...state, campaignOrder: action.payload};
      } else {
        return {
          ...state,
          campaignOrder: [...state?.campaignOrder, ...action?.payload],
        };
      }
    }
    default:
      return state;
  }
}
