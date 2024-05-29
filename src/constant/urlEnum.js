import { REACT_APP_API_URL as api } from '../config/config';

const urlEnum = {
    api,
    urlTopic: `${api}/topics`,
    topicCreate: `${api}/topics/create`,
    urlComment: `${api}/comments`,
    sendOrder: `${api}/order/create`,
    register: `${api}/users/create`,
    login: `${api}/auth/login` ,
    refresh: `${api}/auth/refresh`,
    userInfo: `${api}/auth/me`,
    userUpdate: `${api}/user/update`,
};

export default urlEnum;
