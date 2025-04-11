import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer/rootReducer.jsx';
import { composeWithDevTools } from 'redux-devtools-extension';

// redux-persist` là một thư viện giúp lưu trữ trạng thái của Redux vào bộ nhớ
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
let persistor = persistStore(store)
export { store, persistor }
