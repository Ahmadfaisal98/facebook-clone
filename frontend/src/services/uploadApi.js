import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const uploadApi = createApi({
  reducerPath: 'uploadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL + '/upload',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['upload', 'profile'],
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (body) => ({
        url: `/images`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['upload'],
    }),
    listImages: builder.mutation({
      query: (body) => ({
        url: `/list-images`,
        method: 'POST',
        body,
      }),
      providesTags: ['upload', 'profile'],
    }),
  }),
});

export const { useUploadImageMutation, useListImagesMutation } = uploadApi;
