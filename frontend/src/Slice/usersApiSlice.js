import { apiSlice } from './apiSlice';
const USERS_URL = '/api/users';


let token = localStorage.getItem('token') ?? ''; 

if(token){
  token = JSON.parse(token) 
}

  
export const usersApiSlice = apiSlice.injectEndpoints({
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
        query: ()=>({
          url: `${USERS_URL}/logout`,
          method: 'POST',
        })
      }),
      updateUser: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/profile`,
          method: 'PUT',
          body: data,
          headers: {
            authorization: `Bearer ${token}`,
          },
        }),
      }),
  }),
});

export const {
  useLoginMutation,useLogoutMutation,useRegisterMutation,useUpdateUserMutation
} = usersApiSlice;
