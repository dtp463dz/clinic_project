export const FETCH_USER_LOGIN_SUCCES = 'FETCH_USER_LOGIN_SUCCES';
export const LOGOUT_USER = 'LOGOUT_USER';

export const doLogin = (data) => {
    localStorage.setItem('accessToken', data.accessToken);
    return {
        type: FETCH_USER_LOGIN_SUCCES,
        payload: data
    };
};

export const doLogout = () => {
    localStorage.removeItem('accessToken');
    return {
        type: LOGOUT_USER,
    }
}

