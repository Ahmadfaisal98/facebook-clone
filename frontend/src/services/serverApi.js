import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const serverApi = createApi({
  reducerPath: 'serverApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: `/user/register`,
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: `/user/login`,
        method: 'POST',
        body,
      }),
    }),
    activate: builder.mutation({
      query: (body) => ({
        url: `/user/activate`,
        method: 'POST',
        body,
      }),
    }),
    sendVerification: builder.mutation({
      query: (body) => ({
        url: `/user/send-verification`,
        method: 'POST',
        body,
      }),
    }),
    findUser: builder.mutation({
      query: (body) => ({
        url: `/user/find-user`,
        method: 'POST',
        body,
      }),
    }),
    sendResetCodeVerification: builder.mutation({
      query: (body) => ({
        url: `/user/send-reset-code-verification`,
        method: 'POST',
        body,
      }),
    }),
    validateResetCode: builder.mutation({
      query: (body) => ({
        url: `/user/validate-reset-code`,
        method: 'POST',
        body,
      }),
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: `/user/change-password`,
        method: 'POST',
        body,
      }),
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
} = serverApi;
