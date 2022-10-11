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
  tagTypes: ['post', 'profile'],
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (body) => ({
        url: `/create`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['post', 'profile'],
    }),
    getAllPost: builder.query({
      query: (query) => ({
        url: `/get-all?page=${query?.page || 1}&pageSize=${
          query?.pageSize || 10
        }`,
      }),
      providesTags: ['post'],
    }),
    updateComment: builder.mutation({
      query: (body) => ({
        url: `/comment`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['post'],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostQuery,
  useUpdateCommentMutation,
} = postApi;
