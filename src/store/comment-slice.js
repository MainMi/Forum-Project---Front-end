import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        comments: [],
        pageSize: 5,
        currentPage: 1,
        currentComment: null,
    },
    reducers: {
        replaceComment: (state, action) => ({ ...state, ...action.payload })
    }
});

export const commentAction = commentSlice.actions;

export default commentSlice.reducer;
