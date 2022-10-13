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
  tagTypes: ['profile', 'cover', 'search'],
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
      providesTags: ['profile', 'cover'],
    }),
    updateCoverPicture: builder.mutation({
      query: (body) => ({
        url: `/cover`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['cover'],
    }),
    updateDetailsUser: builder.mutation({
      query: (body) => ({
        url: `/details`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['profile'],
    }),
    addFriend: builder.mutation({
      query: (id) => ({
        url: `/add-friend/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['profile'],
    }),
    cancelRequestFriend: builder.mutation({
      query: (id) => ({
        url: `/cancel-request/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['profile'],
    }),
    followFriend: builder.mutation({
      query: (id) => ({
        url: `/follow/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['profile'],
    }),
    unFollowFriend: builder.mutation({
      query: (id) => ({
        url: `/unfollow/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['profile'],
    }),
    acceptRequestFriend: builder.mutation({
      query: (id) => ({
        url: `/accept-request/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['profile'],
    }),
    unFriend: builder.mutation({
      query: (id) => ({
        url: `/unfriend/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['profile'],
    }),
    deleteRequestFriend: builder.mutation({
      query: (id) => ({
        url: `/delete-request/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['profile'],
    }),
    savePost: builder.mutation({
      query: (id) => ({
        url: `/save/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['profile'],
    }),
    searchUser: builder.mutation({
      query: (id) => ({
        url: `/search/${id}`,
        method: 'POST',
      }),
    }),
    addSearchHistory: builder.mutation({
      query: (body) => ({
        url: `/search-history`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['search'],
    }),
    deleteSearchHistory: builder.mutation({
      query: (body) => ({
        url: `/search-history`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['search'],
    }),
    getSearchHistory: builder.query({
      query: () => ({
        url: `/search-history`,
      }),
      providesTags: ['search'],
    }),
    getFriends: builder.query({
      query: () => ({
        url: `/friends`,
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
  useUpdateCoverPictureMutation,
  useUpdateDetailsUserMutation,
  useAddFriendMutation,
  useCancelRequestFriendMutation,
  useFollowFriendMutation,
  useUnFollowFriendMutation,
  useAcceptRequestFriendMutation,
  useUnFriendMutation,
  useDeleteRequestFriendMutation,
  useSavePostMutation,
  useSearchUserMutation,
  useAddSearchHistoryMutation,
  useGetSearchHistoryQuery,
  useDeleteSearchHistoryMutation,
  useGetFriendsQuery,
} = userApi;
