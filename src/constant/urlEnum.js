import { REACT_APP_API_URL as api } from '../config/config';

const urlEnum = {
    api,
    urlTopic: `${api}/topics`,
    topicCreate: `${api}/topics/create`,
    urlComment: `${api}/comments`,
    register: `${api}/users/create`,
    login: `${api}/auth/login` ,
    refresh: `${api}/auth/refresh`,
    userInfo: `${api}/auth/me`,
    changePassword: `${api}/users/change-password`,
};

export default urlEnum;
