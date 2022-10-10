import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const reactApi = createApi({
  reducerPath: 'reactApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL + '/react',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['react'],
  endpoints: (builder) => ({
    reactPost: builder.mutation({
      query: (body) => ({
        url: `/post`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: 'react', id: arg.postId }];
      },
    }),
    getReact: builder.query({
      query: (id) => ({
        url: `/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: 'react', id }],
    }),
  }),
});

export const { useReactPostMutation, useGetReactQuery } = reactApi;
