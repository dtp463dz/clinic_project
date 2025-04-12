import App from './App.jsx';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import User from './components/User/User.jsx';
import Admin from './components/Admin/Admin.jsx';
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './components/Notice/NotFound.jsx';

const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    {/* <Route index element={<HomePage />} /> */}
                    <Route path="users" element={<User />} />
                </Route>
                <Route path="admin" element={<Admin />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='*' element={<NotFound />} />

            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default Layout;