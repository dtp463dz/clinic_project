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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './components/Notice/NotFound.jsx';
import ManageUser from './components/Admin/Content/ManageUser.jsx';
import Dashboard from './components/Admin/Content/DashBoard.jsx';
import HomePage from './components/HomePage/HomePage.jsx';
import ManageClinic from './components/Admin/Content/Clinic/ManageClinic.jsx';
import ManageSpecialty from './components/Admin/Content/Specialty/ManageSpecialty.jsx';
import ManageHandBook from './components/Admin/Content/ManageHandBook.jsx';
import ManageUserRedux from './components/Admin/Content/AdminRedux/ManageUserRedux.jsx';
import ManageDoctor from './components/Admin/Content/AdminRedux/ManageDoctor.jsx';
import DetailDoctor from './components/Patient/Doctor/DetailDoctor.jsx';
import ManageDoctorSchedule from './components/Admin/Content/Doctor/ManageDoctorSchedule.jsx';
import VerifyBooking from './components/Patient/VerifyBooking.jsx';
import ViewMoreSpecialty from './components/HomePage/Section/ViewMore/ViewMoreSpecialty.jsx';
import ViewMoreDoctor from './components/HomePage/Section/ViewMore/ViewMoreDoctor.jsx';
import DetailSpecialty from './components/Patient/Specialty/DetailSpecialty.jsx';

const Layout = () => {
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
                <Route path='/verify-booking' element={<VerifyBooking />} />


                <Route path="/home" element={<HomePage />} />
                <Route path="/view-more-specialty" element={<ViewMoreSpecialty />} />
                <Route path="/view-more-doctor" element={<ViewMoreDoctor />} />


                <Route path='/detail-doctor/:id' element={<DetailDoctor />} />
                <Route path='/detail-specialty/:id' element={<DetailSpecialty />} />


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