import { baseApi } from "./baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all pet
    getAllUsers: build.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    getUsersByEmail: build.query({
      query: (email) => ({
        url: `/users?email=${email}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    getUsersByRole: build.query({
      query: () => ({
        url: `/users?role=ADMIN`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    getUserById: build.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    // get all pet
    updateUsersProfile: build.mutation({
      query: (payload: any) => {
        return {
          url: `/users/profile`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Users","Auth"],
    }),
    // get all pet
    updateUserById: build.mutation({
      query: ({ payload, id }: { payload: any; id: string }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Users'], 
    }),

    updateUser: build.mutation({
      query: (payload) => {
        const { id, role, userStatus } = payload;
    
        const body: any = {};
        if (role) body.role = role;
        if (userStatus) body.userStatus = userStatus;
    
        return {
          url: `/users/${id}`,
          method: "PUT",
          body, 
        };
      },
      invalidatesTags: ["Users"],
    }),
    
    
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUsersProfileMutation,
  useUpdateUserMutation,
  useGetUsersByEmailQuery,
  useGetUsersByRoleQuery,
  useUpdateUserByIdMutation 
  ,
} = usersApi;
