import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import './index.css'
import App from './App.jsx';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import User from './components/User/User.jsx';
import Admin from './components/Admin/Admin.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="users" element={<User />} />
        <Route path="admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
