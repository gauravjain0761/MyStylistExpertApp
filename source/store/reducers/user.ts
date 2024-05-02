import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {USER} from '../types';

interface UserState {
  data: object;
}

const initialState: UserState = {
  data: [],
};

const user = createSlice({
  name: USER,
  initialState,
  reducers: {
    startGetData: state => {},
    getApiData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {getApiData, startGetData} = user.actions;

export default user.reducer;
