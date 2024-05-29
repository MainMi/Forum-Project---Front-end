const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        status: '',
        title: '',
        message: '',
        isShow: false
    },
    reducers: {
        changeNotification(state, action) {
            return { ...action.payload }
        },
        isHiddenNotification(state, action) {
            return { ...state, isShow: false }
        }
    }
})

export const delayHideNotification = createAsyncThunk(
    'notification/delayHideNotification',
    async (milliseconds, { dispatch }) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                dispatch(notificationSlice.actions.isHiddenNotification());
                resolve();
            }, milliseconds);
        });
    }
);

export const notificationStatusState = {
    loading: {
        status: "loading",
        title: 'Loading',
        message: 'Data is loading',
        isShow: true
    },
    error: {
        status: "error",
        title: 'Error',
        message: 'Error can`t load data',
        isShow: true
    },
    success: {
        status: "success",
        title: 'Success',
        message: 'Data load success',
        isShow: true
    },
}

export const notificationAction = notificationSlice.actions;

export default notificationSlice.reducer;
