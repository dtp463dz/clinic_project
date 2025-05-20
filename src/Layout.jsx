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
import ManageUser from './components/Admin/Content/ManageUser.jsx';
import Dashboard from './components/Admin/Content/DashBoard.jsx';
import HomePage from './components/HomePage/HomePage.jsx';
import ManageClinic from './components/Admin/Content/ManageClinic.jsx';
import ManageSpecialty from './components/Admin/Content/ManageSpecialty.jsx';
import ManageHandBook from './components/Admin/Content/ManageHandBook.jsx';
import ManageUserRedux from './components/Admin/Content/AdminRedux/ManageUserRedux.jsx';
import ManageDoctor from './components/Admin/Content/AdminRedux/ManageDoctor.jsx';
import DetailDoctor from './components/Patient/Doctor/DetailDoctor.jsx';
import ManageDoctorSchedule from './components/Admin/Content/Doctor/ManageDoctorSchedule.jsx';

const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    {/* <Route index element={<HomePage />} /> */}
                    <Route path="users" element={<User />} />
                </Route>

                <Route />
                <Route path="admin" element={<Admin />}>
                    <Route index element={<Dashboard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                    <Route path="manage-userRedux" element={<ManageUserRedux />} />
                    <Route path="manage-doctor" element={<ManageDoctor />} />
                    <Route path="manage-doctor-schedule" element={<ManageDoctorSchedule />} />
                    <Route path="manage-clinic" element={<ManageClinic />} />
                    <Route path="manage-specialty" element={<ManageSpecialty />} />
                    <Route path="manage-handbook" element={<ManageHandBook />} />
                </Route>

                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='*' element={<NotFound />} />

                <Route path='/home' element={<HomePage />} />
                <Route path='/detail-doctor/:id' element={<DetailDoctor />} />

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