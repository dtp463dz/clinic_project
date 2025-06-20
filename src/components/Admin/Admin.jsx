import { FaBars } from 'react-icons/fa';
import SlideBar from "./SlideBar.jsx";
import './Admin.scss';
import { useState } from "react";
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Admin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [toggled, setToggled] = useState(false); // cho responsive nếu cần
    const { account } = useSelector((state) => state.user);
    const isAdmin = account.roleId === 'R1';
    return (
        <div className="admin-container">
            {/* Sidebar khu vực trái */}
            <div className="admin-sidebar">
                <SlideBar
                    collapsed={collapsed}
                    toggled={toggled}
                    handleToggleSidebar={() => setToggled(!toggled)}
                    isAdmin={isAdmin}
                />
            </div>

            {/* Nội dung chính */}
            <div className="admin-content">
                <div className='admin-header'>
                    <button
                        className="sb-button"
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        <FaBars /> {/* Icon toggle */}
                    </button>
                </div>


                <div className="admin-main">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Admin;
