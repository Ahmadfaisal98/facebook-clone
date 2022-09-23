import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  username: '',
  picture:
    'https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png',
  token: localStorage.getItem('token') || null,
  first_name: '',
  last_name: '',
  email: '',
  bYear: 0,
  bMonth: 0,
  bDay: 0,
  gender: '',
  verified: false,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    updateUser(state, { payload }) {
      return { ...state, ...payload };
    },
    resetUser() {
      return { ...initialState, token: null };
    },
  },
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
