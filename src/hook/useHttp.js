import { useDispatch } from "react-redux";
import { delayHideNotification, notificationAction, notificationStatusState } from "../store/notification-slice";
import { useCallback } from "react";

const emptyFn = (data) => data;

const useHttp = (applyData = emptyFn) => {
    const dispatch = useDispatch();
    const sendRequest = useCallback(async (requestConfig) => {
        try {
            dispatch(notificationAction.changeNotification(notificationStatusState.loading));
            let { URL, method = 'GET', body = null, headers = {} } = requestConfig
            headers = method === 'POST' ? {...headers, 'Content-type':  'application/json'} : headers; 
            const response = await fetch(URL, {
                method,
                body: JSON.stringify(body),
                headers,
            });
            const data = await response.json();
            if (data.status >= 400 && data.status < 600) {
                dispatch(notificationAction.changeNotification({
                    ...notificationStatusState.error,
                    message: data.message
                }));
                return;
            }
            if (!response.ok) {
                throw new Error('Could not fetch data');
            }
            applyData(data);
            dispatch(notificationAction.changeNotification(notificationStatusState.success));
            dispatch(delayHideNotification(2000));
        } catch (e) {
            dispatch(notificationAction.changeNotification({
                ...notificationStatusState.error,
                message: e.message
            }));
        }
    }, [applyData]);

    return sendRequest;
}

export default useHttp;
