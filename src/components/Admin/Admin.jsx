import { FaBars } from 'react-icons/fa';
import SlideBar from "./SlideBar.jsx";
import './Admin.scss';
import { useState } from "react";

const Admin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [toggled, setToggled] = useState(false); // cho responsive nếu cần

    return (
        <div className="admin-container">
            {/* Sidebar khu vực trái */}
            <div className="admin-sidebar">
                <SlideBar
                    collapsed={collapsed}
                    toggled={toggled}
                    handleToggleSidebar={() => setToggled(!toggled)}
                />
            </div>

            {/* Nội dung chính */}
            <div className="admin-content">
                <button
                    className="sb-button"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <FaBars /> {/* Icon toggle */}
                </button>

                <div className="main-view">
                    <h1>Welcome to Admin Panel</h1>
                </div>
            </div>
        </div>
    );
};

export default Admin;
