import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/userSlice';
import { serverApi } from '../services/serverApi';

export default configureStore({
  reducer: { userSlice, [serverApi.reducerPath]: serverApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(serverApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});
