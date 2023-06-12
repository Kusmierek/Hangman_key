import { createSlice } from '@reduxjs/toolkit';
import { userType } from '../types/type';

export interface loginType {
  user: any;
  isLogged: boolean;
}

const initialState = {
  user: {},
  isLogged: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.isLogged = true;
      state.user = action.payload;
    },
    loggedOut: (state) => {
      state.isLogged = false;
      state.user = {};
    },
  },
});

export const { loggedIn, loggedOut } = loginSlice.actions;

export default loginSlice.reducer;
