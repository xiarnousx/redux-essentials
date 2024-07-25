# Part 7: Summary

## RTK Query is a data fetching and caching solution included in Redux Toolkit

- RTK Query abstracts the process of managing cached server data for you, and elminiates the need to write logic for loading state, storing results, and making requests.
- RTK Query build on top of the same patterns used in Redux, like async thunks

## RTK Query uses a single "API slice" per application, defined using `createApi`

- RTK Query provides UI-agnostic and React specific version of `createApi`
- API slices define multiple "endpoints" for different server operations
- The API slice includes auto-generated React hooks if using the React integration

## Query endpoints allow fetching and caching data from the server

- Query hooks return a `data` value plus loading status flags
- The query can be re-fetched manually, or automatically using "tags" for cache invalidation

## Mutation endpoints allow updating data on the server

- Mutation hooks return a "trigger" function that needs to update request, plus loading status
- The trigger function returs a Promise that can be "unwrapped" and awaited
