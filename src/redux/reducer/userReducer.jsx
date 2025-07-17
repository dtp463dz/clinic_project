
import { FETCH_USER_LOGIN_SUCCES, LOGOUT_USER } from '../action/userAction.jsx';


const INITIAL_STATE = {
    account: {
        id: '',
        email: '',
        roleId: '',
        firstName: '',
        lastName: '',
        accessToken: '',
        refreshToken: ''
    },
    isAuthenticated: false // biến xem người dùng đã đăng nhập chưa
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCES:
            return {
                // nạp vào redux
                ...state,
                account: {
                    id: action?.payload?.user?.id,
                    email: action?.payload?.user?.email,
                    roleId: action?.payload?.user?.roleId,
                    firstName: action?.payload?.user?.firstName,
                    lastName: action?.payload?.user?.lastName,
                    accessToken: action?.payload?.accessToken,
                    refreshToken: action?.payload?.refreshToken,
                },
                isAuthenticated: true // đã đăng nhập
            };
        case LOGOUT_USER:
            return {
                ...INITIAL_STATE
            };
        default: return state;
    }
};

export default userReducer;