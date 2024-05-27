import urlEnum from "../../constant/urlEnum";
import { commentAction } from "../comment-slice";
import { delayHideNotification, notificationAction, notificationStatusState } from "../notification-slice";
import { fetchAuth } from "./auth-actions";

export const fetchCurrentTopicComment = (topicId, queryData = '', notification = true) => {
    return async (dispatch) => {
        try {
            if (notification) {
                dispatch(notificationAction.changeNotification(
                    notificationStatusState.loading
                ));
            }
            let fullUrl;
            if (typeof queryData === 'object') {
                const queryParams = new URLSearchParams(queryData).toString();
                fullUrl = `${urlEnum.urlComment}/${topicId}?${queryParams}`;
            } else if (typeof queryData === 'string') {
                fullUrl = `${urlEnum.urlComment}/${topicId}?${queryData}`;
            } else {
                throw new Error('Invalid queryData type');
            }
            
            const response = await fetch(fullUrl, {
                method: 'GET',
            });

            if (!response?.status) {
                throw new Error('Could not fetch data');
            }
            const data = await response.json();
            if (data.status >= 400 && data.status < 600) {
                dispatch(notificationAction.changeNotification({
                    ...notificationStatusState.error,
                    message: data.message
                }));
                return;
            }
            if (notification) {
                dispatch(notificationAction.changeNotification(
                    notificationStatusState.success));
                dispatch(delayHideNotification(2000));
            }

            const { comments, totalPages: pageSize, currentPage, topic } = data;

            dispatch(commentAction.replaceComment({ comments, pageSize, currentPage, topic }));
        } catch (e) {
            dispatch(notificationAction.changeNotification({
                ...notificationStatusState.error,
                message: e.message
            }));
            dispatch(delayHideNotification(4000));
        }
    }
};
export const addCommentToUser = (body, topicId, comments) => async (dispatch) => {
    const url = `${urlEnum.urlComment}/${topicId}/add`
    const responseFn = async () => {
        await dispatch(fetchCurrentTopicComment(topicId, {}, false));
    }
    await dispatch(fetchAuth(responseFn, { url, method: 'POST', body }))
}

export const editCommentToUser = (body, topicId, commentId) => async (dispatch) => {
    const responseFn = async () => {
        await dispatch(fetchCurrentTopicComment(topicId, {}, false));
    }
    const url = `${urlEnum.urlComment}/${topicId}/${commentId}`
    await dispatch(fetchAuth(responseFn, { url, method: 'PUT', body }))
}

export const deletedCommentToUser = (topicId, commentId) => async (dispatch) => {
    const responseFn = async () => {
        await dispatch(fetchCurrentTopicComment(topicId, {}, false));
    }
    const url = `${urlEnum.urlComment}/${topicId}/${commentId}`
    await dispatch(fetchAuth(responseFn, { url, method: 'DELETE' }))
}