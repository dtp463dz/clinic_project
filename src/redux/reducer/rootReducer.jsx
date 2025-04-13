import { combineReducers } from 'redux';
import counterReducer from './counterReducer.jsx';
import userReducer from './userReducer.jsx';

const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
});

export default rootReducer;