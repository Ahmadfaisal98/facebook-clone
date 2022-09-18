import { configureStore } from '@reduxjs/toolkit';
import { serverApi } from '../services/serverApi';

export default configureStore({
  reducer: { [serverApi.reducerPath]: serverApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(serverApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});
