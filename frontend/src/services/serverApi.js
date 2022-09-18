import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const serverApi = createApi({
  reducerPath: 'serverApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: `/user/register`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation } = serverApi;
