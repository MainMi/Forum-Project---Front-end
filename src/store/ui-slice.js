import { createSlice }  from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        modalTopicInfo: false,
        modalTopicEdit: false,
        modalCommentEdit: false,

    },
    reducers: {
        toggle(state, action) {
            const key = action.payload ? action.payload : uiConstantIsVisible.modalTopicInfo;
            state[key] = !state[key];
        },
        disabled(state, action) {
            const key = action.payload ? action.payload : uiConstantIsVisible.modalTopicInfo;
            state[key] = false;
        },
        enable(state, action) {
            const key = action.payload ? action.payload : uiConstantIsVisible.modalTopicInfo;
            state[key] = true;
        },
    }
});


export const uiAction = uiSlice.actions;

export const uiConstantIsVisible = {
    modalTopicInfo: 'modalTopicInfo',
    modalTopicEdit: 'modalTopicEdit',
    modalCommentEdit: 'modalCommentEdit'
}

export default uiSlice.reducer;