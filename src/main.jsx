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
import 'nprogress/nprogress.css'; // thư viện dùng cho loading bar
import LoadingProvider from './contexts/LoadingContext.jsx';


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <LoadingProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </LoadingProvider>
  </Provider>
)

