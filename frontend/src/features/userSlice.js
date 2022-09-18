import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setToLogin(state, { payload }) {
      return { ...state, token: payload };
    },
    resetUser() {
      return { ...initialState, token: null };
    },
  },
});

export const { setToLogin, resetUser } = userSlice.actions;

export default userSlice.reducer;
