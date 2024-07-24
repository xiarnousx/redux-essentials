# Part 1: Summary

## Redux is a library for managing global application state

- Redux is typically used with the React-Redux library for integrating Redux and React together
- Redux Toolkit is the recommended way to write Redux logic

## Redux uses a "one-way data flow" app structure

- State describes the condition of the app a a point in time, and UI renders based on that state
- When something happens in the app:
  - The UI dispatches an action
  - The store runs the reducers, and the state is updated based on what occurred
  - The store notifies the UI that the state has changed
- The UI re-renders based on new state

## Redux uses several types of code

- Actions are plain objects with a type field that describe "what happened" in the app
- Reducers are functions that calculate a new state value base on previous state + an action
- A Redux store runs the root reducer whenever an action is dispatched

# Part 2: Summary

## We can create a Redux store using the Redux Toolkit `configureStore` API

- `configureStore` accepts `reducer` function as a named argument
- `configureStore` automatically sets up the store with good default settings

## Redux logic is typically organized into files called "slices"

- A "slice" contains the reducer logic and actions related to a specific feature/section of the Redux state
- Redux Toolkit's `createSlice` API generates action creators and action types for each individual reducer function you provide

## Redux reducers must follow specific rules

- Should only calculate a new state value on the state and action arguments
- Must make immutable updates by copying the existing state
- Cannot contain any asynchronous logic or other side effects
- Redus Toolkit's `createSlice` API uses Immer to allow immutable updates

## Async logic is typically written in special functions called "Thunks"

- Thunks receive `dispatch` and `getState` as arguments
- Redux Toolkit enables the `redux-thunk` middleware by default

## React-Redux allows React components to interact with a Redux store

- Wrapping the app with `<Provider store={store}>` enables all components to use the store
- Global state should go in the Redux store, local state should state in React components

# Part 3: Summary

## Redux state is updated by "reducer functions"

- Reducers always calculate a new state immutably, by copying existing state values and modifying the copies with the new data
- The Redux Toolkit `createSlice` function generates slice reducer functions for you, and lets you write mutating code that is turned into safe immutable updates
- Those slice reducer functions are added to teh `reducer` field in `configureStore`, and that defines the data and state field names inside Redux store

## React components read data from the store with the `useSelector` hook

- Selector functions receive the whole state object, and should return a value
- Selectors will re-run whenever the Redux store is updated, and if the data they return has changed, the component will re-render

## React components dispatch actions to update the store using the `useDispatch` hook

- `createSlice` will generate action creator functions for each reducer we add to a slice
- Call `dispatch(somActionCreator())` in a component to dispatch an action
- Reducers will run, check to see if this action is relevant, and return new state appropriate
- Temporary data like form input values should be kept as React component state. Dispatch a Redux action to update the store when the user is done with the form.

# Part 4: Summary

## Any React component can use data from the Redux store as needed

- Any component can read any data that is in the Redux store
- Multiple components can read the same data, even at the same time
- Components should extract the smallest amount of data they need to render themselves
- Components can combine values from props, state and the Redux store to determine what UI they need to render. They can read multiple peices of data from the store, and reshape the data as needed for display.
- Any component can dispatch actions to cause state updates

## Redux action creators can prepare action objects with the right content

- `createSlice` and `createAction` cn accept a prepare callbak that returns the action payload
- Unique IDs and other rando values should put in the action, not calculated in the reducer

## Reducers should contain the actual state update logic

- Reducers can contain whateve logic is needed to calculate the next state
- Action objects should contain just enough info to describe what happened

# Part 5: Summary

## You can write reusable "selector" functions to encapsulate reading values from the Redux state

- Selectores are functions that get the Redux `state` as an argument, and return some data

## Redux uses plugins called "middleware" to enable async logic

- The standard async middleware is called `redux-thunk`, which is included in Redux Toolkit
- Thunk functions recieve `dispatch` and `getState` as arguments, and can use those as part of async logic

## You can dispatch additional actions to help track the loading status of an API call

- The typical pattern is dispatching a "pending" action before the call, then either a "success" containing data or a "failure" action containing error
- Loading state should usually be stored as an enum, like `idle | loading | succeeded | failed`

## Redux Toolkit has a `createAsyncThunk` API that dispatches these actions for you

- `createAsyncThunk` accepts a payload creator callback that should return a Promise and generates `pending/fullfilled/rejected` action types automatically
- Generated action creators like `fetchPosts` dispatch those actions based on the Promise you return
- You can listen for these action types in `createSlice` using `extraReducers` field, and update the state in reducers based on those actions
- Action creators can be used to automatically fill in the keys of the `extraReducers` object so the slice knows what actions to listen for.
- Thunks can return promises. For `createAsyncThunk` specifically, you can `await dispatch(someThunkCreatorAction()).unwrap()` to handle the request success or failure at the component level.

# Part 6: Summary

## Memoized selector functions can be used to optimize performance

- Redux Toolkit re-exports the createSelector function from Reselect, which generates memoized selectors
- Memoized selectors will only recalculate the results if the input selectors return new values
- Memoization can skip expensive calculations, and ensure the same result references are returned

## There are multiple patterns you can use to optimize React component rendering with Redux

- Avoid creating new objec/array references inside of `useSelector` - those will cause unnecessary re-renders
- Memoized selector functions can be passed to `useSelector` to optimize rendering
- `useSelector` can accept an alternate comparison function like `shallowEqual` instead of reference equality
- Components can be wrapped in `React.memo` to only re-render if their props change
- List rendering can be optimized by having list parent components read just an array of items IDs, passing the IDs to list item children, and retrieving items by ID in the children

## Normailized state structure is a recommended approach for storing items

- Normalization means no duplication of data and keeping items stored in a lookup table by item ID
- Normalized state shape usually looks like `{ids:[], entities:{}}`

## Redux Toolkit's `createEntityAdapter` API helps manage normalized data in a slice

- Item IDs can be kept in sorted order by passing in a `sortComparer` option
- The adapter object includes:
  - `adapter.getInitialState`, which can accept additional state fields liek loading state
  - Prebuilt reducers for common cases like `setAll, addMany, upsertMany, upsertOne, removeMany`
  - `adapter.getSelectore`, which generate selectors like `selectAll, selectById`
