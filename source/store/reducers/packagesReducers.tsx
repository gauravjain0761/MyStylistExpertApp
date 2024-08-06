import {GET_PACKAGES, GET_PACKAGE_ORDER} from '../types';

const initialState = {
  getpackages: [],
  getpackageorder: [],
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
    case GET_PACKAGE_ORDER: {
      if (action?.payload?.page == 1) {
        return {
          ...state,
          getpackageorder: action?.payload?.expertAppointments,
        };
      } else {
        return {
          ...state,
          getpackageorder: [
            ...state?.getpackageorder,
            ...action?.payload?.expertAppointments,
          ],
        };
      }
    }
    default:
      return state;
  }
}
