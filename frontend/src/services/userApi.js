import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL + '/user',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['profile'],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: `/register`,
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: `/login`,
        method: 'POST',
        body,
      }),
    }),
    activate: builder.mutation({
      query: (body) => ({
        url: `/activate`,
        method: 'POST',
        body,
      }),
    }),
    sendVerification: builder.mutation({
      query: (body) => ({
        url: `/send-verification`,
        method: 'POST',
        body,
      }),
    }),
    findUser: builder.mutation({
      query: (body) => ({
        url: `/find-user`,
        method: 'POST',
        body,
      }),
    }),
    sendResetCodeVerification: builder.mutation({
      query: (body) => ({
        url: `/send-reset-code-verification`,
        method: 'POST',
        body,
      }),
    }),
    validateResetCode: builder.mutation({
      query: (body) => ({
        url: `/validate-reset-code`,
        method: 'POST',
        body,
      }),
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: `/change-password`,
        method: 'POST',
        body,
      }),
    }),
    updateProfilePicture: builder.mutation({
      query: (body) => ({
        url: `/profile-picture`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['profile'],
    }),
    profileUser: builder.query({
      query: (username) => ({
        url: `/profile/${username}`,
      }),
      providesTags: ['profile'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useActivateMutation,
  useSendVerificationMutation,
  useFindUserMutation,
  useSendResetCodeVerificationMutation,
  useValidateResetCodeMutation,
  useChangePasswordMutation,
  useProfileUserQuery,
  useUpdateProfilePictureMutation,
} = userApi;
