import urlEnum from "../../constant/urlEnum";
import { delayHideNotification, notificationAction, notificationStatusState } from "../notification-slice";
import { topicAction } from "../topic-slice";
import { fetchAuth } from "./auth-actions";

export const fetchCurrentTopic = (queryData = {}, notification = true) => {
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
                fullUrl = `${urlEnum.urlTopic}?${queryParams}`;
            } else if (typeof queryData === 'string') {
                fullUrl = `${urlEnum.urlTopic}?${queryData}`;
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

            const { topics, totalPages: pageSize, currentPage } = data;

            dispatch(topicAction.replaceTopic({ topics, pageSize, currentPage }));
        } catch (e) {
            dispatch(notificationAction.changeNotification({
                ...notificationStatusState.error,
                message: e.message
            }));
            dispatch(delayHideNotification(4000));
        }
    }
};

export const fetchCurrentTopicAdmin = (queryData = {}, notification = true) => async (dispatch) => {
    const responseFn = async (data) => {
        const { topics, totalPages: pageSize, currentPage } = data;
        dispatch(topicAction.replaceTopic({ topics, pageSize, currentPage }));
    }

    let url;
    if (typeof queryData === 'object') {
        const queryParams = new URLSearchParams(queryData).toString();
        url = `${urlEnum.urlTopic}?${queryParams}`;
    } else if (typeof queryData === 'string') {
        url = `${urlEnum.urlTopic}?${queryData}`;
    } else {
        throw new Error('Invalid queryData type');
    }

    await dispatch(fetchAuth(responseFn, { url }, notification, false))
}

export const addTopicToUser = (body, currentPage, isAdmin=false) => async (dispatch) => {
    const responseFn = () => {
        if (isAdmin) {
            dispatch(fetchCurrentTopicAdmin({ currentPage, skipDeleted: false }, false))
        } else {
            dispatch(fetchCurrentTopic({ currentPage }, false))
        }
    }
    await dispatch(fetchAuth(responseFn, { url: urlEnum.topicCreate, method: 'POST', body }, true, false))
}

export const editTopicToUser = (body, topicId, currentPage, isAdmin=false) => async (dispatch) => {
    const responseFn = () => {
        if (isAdmin) {
            dispatch(fetchCurrentTopicAdmin({ currentPage, skipDeleted: false }, false))
        } else {
            dispatch(fetchCurrentTopic({ currentPage }, false))
        }
    }
    const url = `${urlEnum.urlTopic}/${topicId}`
    await dispatch(fetchAuth(responseFn, { url, method: 'PUT', body }, true, false))
}

export const deletedTopicToUser = (topicId, currentPage, isAdmin=false) => async (dispatch) => {
    const responseFn = () => {
        if (isAdmin) {
            dispatch(fetchCurrentTopicAdmin({ currentPage, skipDeleted: false }, false))
        } else {
            dispatch(fetchCurrentTopic({ currentPage }, false))
        }
    }

    const url = `${urlEnum.urlTopic}/${topicId}`
    await dispatch(fetchAuth(responseFn, { url, method: 'DELETE'}, true, false))
}
