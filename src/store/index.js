import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth-slice";
import notificationReducer from './notification-slice';
import topicReducer from './topic-slice';
import uiReducer from './ui-slice';
import commentReducer from './comment-slice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        notification: notificationReducer,
        topic: topicReducer,
        ui: uiReducer,
        comment: commentReducer,
    }
});

export default store;
