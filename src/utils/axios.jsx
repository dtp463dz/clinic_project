import axios from 'axios';
import _ from 'lodash';

let setGlobalLoading = () => { };
export const registerGlobalLoading = (fn) => {
    setGlobalLoading = fn;
};

const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACKEND_URL,
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
    // May be string or number
    const statusType = typeof s;
    return (statusType === 'number' && s === 0) || (statusType === 'string' && s.toUpperCase() === 'OK');
};
// Thêm yêu cầu chặn để bắt đầu NProgress
instance.interceptors.request.use(
    (config) => {
        setGlobalLoading(true);
        return config;
    },
    (error) => {
        setGlobalLoading(false);
        return Promise.reject(error);
    }
);
instance.interceptors.response.use(
    (response) => {
        setGlobalLoading(false);
        return response.data;
    },
    (error) => {
        setGlobalLoading(false);
        return Promise.reject(error);
    }
);

export default instance;
