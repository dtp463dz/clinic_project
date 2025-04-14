import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaGithub } from 'react-icons/fa';
import './SideBar.scss';
import { MdDashboard } from "react-icons/md";
import { DiReact } from "react-icons/di";

const SlideBar = ({ collapsed, toggled, handleToggleSidebar }) => {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar
                collapsed={collapsed}
                toggled={toggled}
                onToggle={handleToggleSidebar}
                breakPoint="md"
                backgroundColor="#fff"
            >
                {/* Sidebar Header */}
                <div
                    style={{
                        padding: '24px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: 14,
                        letterSpacing: '1px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        color: '#333'
                    }}
                >
                    <DiReact size={'3rem'} color='00bfff' />  {/** logo react */}
                    ADMIN
                </div>

                {/* Main Menu */}
                <Menu
                    menuItemStyles={{
                        button: ({ level, active, disabled }) => {
                            if (level === 0)
                                return {
                                    color: disabled ? '#ccc' : '#444',
                                    backgroundColor: active ? '#f0e9ff' : undefined,
                                };
                        },
                    }}
                >
                    <MenuItem
                        icon={<MdDashboard />}
                    >
                        Dashboard
                    </MenuItem>

                    <SubMenu defaultOpen label="Manage" icon={<FaGem />}>
                        <MenuItem> Quản Lý Users</MenuItem>
                    </SubMenu>
                </Menu>

                {/* Footer menu */}
                <Menu style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/azouaoui-med/react-pro-sidebar"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span
                                style={{
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    marginLeft: 10
                                }}
                            >
                                View Source
                            </span>
                        </a>
                    </div>
                </Menu>
            </Sidebar>
        </div>
    );
};

export default SlideBar;
