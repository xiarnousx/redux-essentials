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
  tagTypes: ["Post", "User"],
  // The endpoints represent operations and requests for this server
  endpoints: (builder) => ({
    getPosts: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => "/posts",
      providesTags: ["Post"],
    }),
    getPost: builder.query({
      query: (postId) => `/posts/${postId}`,
    }),
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

// Export the aut-generated hook for the `getPosts` query endpoint
export const { useGetPostsQuery, useGetPostQuery, useAddNewPostMutation } =
  apiSlice;
