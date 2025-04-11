import { combineReducers } from 'redux';
import counterReducer from './counterReducer.jsx';

const rootReducer = combineReducers({
    counter: counterReducer,
});

export default rootReducer;