import { apiSlice } from './apiSlice';
const ADMIN_URL = '/api/admin';


export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        Adminlogin : builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/adminLogin`,
                method: 'POST',
                body: data
              }),
        })
    })
})

export const { useLoginMutation  } = adminApiSlice