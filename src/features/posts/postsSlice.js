import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from 'date-fns';

const initialState = [
    { id: '1', title: 'First One', content: 'hello!', user: '1', date: sub(new Date(), { minutes: 10 }).toISOString(), reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 } },
    { id: '2', title: 'Second One', content: 'Hi there!', user: '0', date: sub(new Date(), { minutes: 5 }).toISOString(), reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 } }
];

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, content, userId) {
                return { payload: { id: nanoid(), title, content, user: userId, date: new Date().toISOString() } }
            }
        },
        postUpdated(state, action) {
            return state.map((post) => post.id === action.payload.id ? action.payload : post)
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    }
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;
