import axios from 'axios';
import _ from 'lodash';
import NProgress from 'nprogress';

// custom NProgress (loading bar)
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100,
})

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
});

const createError = (httpStatusCode, statusCode, errorMessage, problems, errorCode = '') => {
    const error = new Error();
    error.httpStatusCode = httpStatusCode;
    error.statusCode = statusCode;
    error.errorMessage = errorMessage;
    error.problems = problems;
    error.errorCode = errorCode + "";
    return error;
};

export const isSuccessStatusCode = (s) => {
    const statusType = typeof s;
    return (statusType === 'number' && s === 0) || (statusType === 'string' && s.toUpperCase() === 'OK');
};

instance.interceptors.request.use(
    (config) => {
        NProgress.start();
        return config;
    },
    (error) => {
        NProgress.done();
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        NProgress.done();
        // Nếu responseType là 'blob' hoặc Content-Type là 'application/pdf', trả về nguyên response
        if (
            response.config.responseType === 'blob' ||
            (response.headers['content-type'] && response.headers['content-type'].includes('application/pdf'))
        ) {
            return response;
        }

        // Xử lý phản hồi JSON
        const { data } = response;
        if (data.hasOwnProperty('s') && !isSuccessStatusCode(data['s']) && data.hasOwnProperty('errmsg')) {
            return Promise.reject(createError(response.status, data['s'], data['errmsg'], null, data['errcode'] ? data['errcode'] : ""));
        }
        if (data.hasOwnProperty('s') && data.hasOwnProperty('d')) {
            return data['d'];
        }
        if (data.hasOwnProperty('s') && _.keys(data).length === 1) {
            return null;
        }
        return response.data;
    },
    (error) => {
        NProgress.done();
        const { response } = error;
        if (!response) {
            return Promise.reject(error);
        }

        // Nếu responseType là 'blob', trả về lỗi nguyên bản
        if (response.config.responseType === 'blob') {
            return Promise.reject(error);
        }

        const { data } = response;
        if (data.hasOwnProperty('s') && data.hasOwnProperty('errmsg')) {
            return Promise.reject(createError(response.status, data['s'], data['errmsg']));
        }
        if (data.hasOwnProperty('code') && data.hasOwnProperty('message')) {
            return Promise.reject(createError(response.status, data['code'], data['message'], data['problems']));
        }
        return Promise.reject(createError(response.status));
    }
);

export default instance;