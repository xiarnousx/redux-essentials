import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api`
  reducerPath: "api",
  // All of our requests will have URLS starting with '/fakeApi'
  baseQuery: fetchBaseQuery({
    baseUrl: "/fakeApi",
    headers: { "Content-Type": "application/json" },
  }),
  // The endpoints represent operations and requests for this server
  endpoints: (builder) => ({
    getPosts: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => "/posts",
    }),
  }),
});

// Export the aut-generated hook for the `getPosts` query endpoint
export const { useGetPostsQuery } = apiSlice;
