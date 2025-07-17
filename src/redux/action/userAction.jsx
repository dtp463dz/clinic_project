export const FETCH_USER_LOGIN_SUCCES = 'FETCH_USER_LOGIN_SUCCES';
export const LOGOUT_USER = 'LOGOUT_USER';

export const doLogin = (data) => {
    return {
        type: FETCH_USER_LOGIN_SUCCES,
        payload: data
    };
};

export const doLogout = () => {
    return {
        type: LOGOUT_USER,
    }
}

