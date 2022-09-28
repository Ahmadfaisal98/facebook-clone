import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL + '/post',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['post'],
  endpoints: (builder) => ({
    create: builder.mutation({
      query: (body) => ({
        url: `/create`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['post'],
    }),
    getAllPost: builder.query({
      query: () => ({
        url: `/get-all`,
      }),
      providesTags: ['post'],
    }),
  }),
});

export const { useCreateMutation, useGetAllPostQuery } = postApi;
