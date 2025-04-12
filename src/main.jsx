import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.jsx';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Layout from './Layout.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Layout />

      </BrowserRouter>
    </Provider>

  </StrictMode>,
)

