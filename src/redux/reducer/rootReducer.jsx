import { combineReducers } from 'redux';
import counterReducer from './counterReducer.jsx';
import userReducer from './userReducer.jsx';
import adminReducer from './adminReducer.jsx';
const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
    admin: adminReducer,
});

export default rootReducer;