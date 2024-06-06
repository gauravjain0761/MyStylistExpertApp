import {WALLET} from '../types';

const initialState = {
  Wallet: [],
};

export default function (state = initialState, action: any) {
  switch (action?.type) {
    case WALLET: {
      if (action?.payload?.page == 1) {
        return {
          ...state,
          Wallet: action?.payload,
        };
      } else {
        return {
          ...state,
          Wallet: [...state?.Wallet, ...action?.payload],
        };
      }
    }
    default:
      return state;
  }
}
