
import { INCREMENT, DECREMENT } from '../action/counterAction.jsx';
import { FETCH_USER_LOGIN_SUCCES } from '../action/userAction.jsx';


const INITIAL_STATE = {
    account: {
        // access_token: '',
        // refresh_token: '',
        // username: '',
        email: '',
        // image: '',
        roleId: '',
        firstName: '',
        lastName: '',
    },
    isAuthenticated: false // biến xem người dùng đã đăng nhập chưa
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCES:
            console.log('check action: ', action);
            return {
                // nạp vào redux
                ...state,
                account: {
                    //  access_token: action?.payload?.DT?.access_token,
                    //    refresh_token: action?.payload?.DT?.refresh_token,
                    // username: action?.payload?.DT?.username,
                    // image: action?.payload?.DT?.image,
                    email: action?.payload?.user?.email,
                    roleId: action?.payload?.user?.roleId,
                    firstName: action?.payload?.user?.firstName,
                    lastName: action?.payload?.user?.lastName,
                },
                isAuthenticated: true // đã đăng nhập
            };
        case DECREMENT:
            return {
                ...state, count: state.count - 1,
            };
        default: return state;
    }
};

export default userReducer;