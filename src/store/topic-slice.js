import { createSlice } from '@reduxjs/toolkit';

const topicSlice = createSlice({
    name: 'topic',
    initialState: {
        topics: [],
        pageSize: 5,
        currentPage: 1,
        currentTopic: null,
    },
    reducers: {
        replaceTopic: (state, action) => ({ ...state, ...action.payload })
    }
});

export const topicAction = topicSlice.actions;

export default topicSlice.reducer;
