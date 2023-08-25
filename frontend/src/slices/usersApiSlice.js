import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const USERS_URL = '/api/users';


const baseQuery = fetchBaseQuery({baseUrl: ''});

export const usersApiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            }),
        }),
    }),
});

export const {useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation} = usersApiSlice;
export default usersApiSlice.reducer