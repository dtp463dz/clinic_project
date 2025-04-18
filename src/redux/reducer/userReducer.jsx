
import { INCREMENT, DECREMENT } from '../action/counterAction.jsx';
import { FETCH_USER_LOGIN_SUCCES } from '../action/userAction.jsx';


const INITIAL_STATE = {
    account: {
        // access_token: '',
        // refresh_token: '',
        username: '',
        email: '',
        // image: '',
        role: ''
    },
    isAuthenticated: false
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCES:
            console.log('check action: ', action);
            return {
                // nạp vào redux
                ...state,
                account: {
                    access_token: action?.payload?.DT?.access_token,
                    refresh_token: action?.payload?.DT?.refresh_token,
                    username: action?.payload?.DT?.username,
                    image: action?.payload?.DT?.image,
                    role: action?.payload?.DT?.role
                },
                isAuthenticated: true
            };
        case DECREMENT:
            return {
                ...state, count: state.count - 1,
            };
        default: return state;
    }
};

export default userReducer;