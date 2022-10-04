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
  tagTypes: ['upload'],
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (body) => ({
        url: `/images`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['upload'],
    }),
    listImages: builder.query({
      query: ({ path, sort, max }) => ({
        url: `/list-images?path=${path}&sort=${sort}&max=${max}`,
      }),
      providesTags: ['upload'],
    }),
  }),
});

export const { useUploadImageMutation, useListImagesQuery } = uploadApi;
