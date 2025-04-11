import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.jsx';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import User from './components/User/User.jsx';
import Admin from './components/Admin/Admin.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            {/* <Route index element={<HomePage />} /> */}
            <Route path="users" element={<User />} />
          </Route>
          <Route path="admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </Provider>

  </StrictMode>,
)

