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

# Part 8: Summary

## Specific cache tags can be used for finer-grained cache invalidation

- Cache tags can be either 'Post' or `{type: 'Post', id}`
- Endpoints can provide or invalidate cache tags based on results and arg cache keys

## RTK Query's APIs are UI-agnostic and can be used outside React

- Endpoint objects include functions for initiating requests, generating result selectors, and matching request action objects

## Responses can be transformed in different ways as needed

- Endpoints can define a `transformResponse` callback to modify the data before caching
- Hooks can be given a selectFromResult option to extract/transform data
- Components can read an entire value and transform with `useMemo`

## RTK Query has advanced options for manipulating cached data for beter user experience

- The `onQueryStarted` liefcycle can be used for optimisitic updates by updating cace immediately before a request returns
- The `onCacheEntryAdded` lifecycle can be used for streaming updates by updating cache over time based on server push connections
