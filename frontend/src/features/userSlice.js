import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

const token = localStorage.getItem('token') || null;

if (token) {
  var { id, username, picture, first_name, verified } = jwt_decode(token);
}

const initialState = {
  id: id || '',
  username: username || '',
  picture:
    picture ||
    'https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png',
  token,
  first_name: first_name || '',
  last_name: '',
  email: '',
  bYear: 0,
  bMonth: 0,
  bDay: 0,
  gender: '',
  verified: verified || false,
  theme: 'light',
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    updateUser(state, { payload }) {
      return { ...state, ...payload };
    },
    logout() {
      return { ...initialState, token: null };
    },
  },
});

export const { updateUser, logout } = userSlice.actions;

export default userSlice.reducer;
