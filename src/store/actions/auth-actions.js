import { authAction } from "../auth-slice";
import { delayHideNotification, notificationAction, notificationStatusState } from "../notification-slice";
import urlEnum from "../../constant/urlEnum"
import Cookies from 'universal-cookie'

const cookies = new Cookies();
export const fetchAuth = (responseFn, responseArgm, notification = true) =>
    async (dispatch) => {
        const authToken = cookies.get('Access');
        if (!authToken || !authToken.length) {
            return;
        }
        dispatch(authAction.updateAuth({ userToken: authToken }));

        try {
            if (notification) {
                dispatch(notificationAction.changeNotification(notificationStatusState.loading));
            }
            let { url, method = 'GET', body = null } = responseArgm;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': authToken
            };
            if (body) {
                body = JSON.stringify(body)
            }
            const response = await fetch(url, { method, headers, body }); 
            let responseData = await response.json();
            const isUnauthorized = responseData.errorStatus === 4010
            if (isUnauthorized) {
                const refreshedData = await refreshAuthToken(headers);
                if (!refreshedData) {
                    dispatch(notificationAction.changeNotification({
                        ...notificationStatusState.error,
                        message: "You need to login"
                    }));
                    dispatch(delayHideNotification(2000));
                    dispatch(authAction.logOutAuth());
                    return;
                }
                const { accessToken } = refreshedData.tokenPair;
                dispatch(authAction.updateAuth({ userToken: accessToken }))
                const newResponse = await fetch(url, {
                    method,
                    headers: { 
                        ...headers, 'Authorization': accessToken
                    },
                    body 
                });

                responseData = await newResponse.json();

            }
            if (responseData.status >= 300 && responseData.status < 600) {
                dispatch(notificationAction.changeNotification({
                    ...notificationStatusState.error,
                    message: responseData.message
                }));
                dispatch(delayHideNotification(4000));
                return responseData;
            }
            if (notification) {
                dispatch(
                    notificationAction.changeNotification(
                        {
                            ...notificationStatusState.success,
                            message: responseData
                        }
                    )
                );
                dispatch(delayHideNotification(2000));
            }
            responseFn(responseData, dispatch);

        } catch (e) {
            console.log( e);
            dispatch(notificationAction.changeNotification({
                ...notificationStatusState.error,
                message: e.message
            }));
        }
    };

async function refreshAuthToken(headers) {
    const refreshToken = cookies.get('Refresh');
    if (!refreshToken) {
        return null;
    }

    const refreshResponse = await fetch(urlEnum.refresh, {
        method: 'GET',
        headers: { ...headers, 'Authorization': refreshToken }
    });

    if (!refreshResponse) {
        return null;
    }
    const refreshData = await refreshResponse.json();

    if (refreshData.errorStatus) {
        return null;
    }
    const { accessToken, refreshToken: refresh_token } = refreshData.tokenPair;
    cookies.set('Access', accessToken);
    cookies.set('Refresh', refresh_token);
    return refreshData;
}
export const fetchRegister = (body) => {
    return async (dispatch) => {
        try {
            body = JSON.stringify(body);
            const response = await fetch(urlEnum.register, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body
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
                dispatch(delayHideNotification(4000));
                return;
            }
            const { user, tokenPair: { accessToken, refreshToken } } = data;

            dispatch(authAction.updateAuth({
                userInfo: { ...user, password: undefined },
                userToken: accessToken
            }));

            cookies.set('Access', accessToken);
            cookies.set('Refresh', refreshToken);

            dispatch(
                notificationAction.changeNotification(notificationStatusState.success
                    ));
            dispatch(delayHideNotification(2000));

            
        } catch (e) {
            dispatch(notificationAction.changeNotification({
                ...notificationStatusState.error,
                message: e.message
            }));
        }
    }
}
export const fetchLogin = (body) => {
    return async (dispatch) => {
        try {
            body = JSON.stringify(body);
            const response = await fetch(urlEnum.login, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body
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
                dispatch(delayHideNotification(4000));
                return;
            }
            dispatch(notificationAction.changeNotification(notificationStatusState.success));
            dispatch(delayHideNotification(2000));

            console.log(data);

            const { user, tokenPair: { accessToken, refreshToken } } = data;
            
            dispatch(authAction.updateAuth({
                userInfo: { ...user, password: undefined },
                userToken: accessToken
            }));

            cookies.set('Access', accessToken);
            cookies.set('Refresh', refreshToken);

        } catch (e) {
            dispatch(notificationAction.changeNotification({
                ...notificationStatusState.error,
                message: e.message
            }));
        }
    }
}

export const fetchUserInfo = () => {
    const responseFn = (data, dispatch) => {
        dispatch(authAction.updateAuth({
            userInfo: { ...data, password: undefined }
        }))
    }
    return fetchAuth(responseFn, { url: urlEnum.userInfo }, false);
}