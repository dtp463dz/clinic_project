import { useNavigate, Link } from 'react-router-dom';
import './Header.scss';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import useLogout from '../../hooks/useLogout'; // Import hook
import './Header.scss';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { account, isAuthenticated } = useSelector((state) => state.user);
    const handleLogout = useLogout(); // Sử dụng hook

    const handleNavigate = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false);
        setIsUserMenuOpen(false);
    };

    return (
        <header className="header">
            <div className='header-container'>
                <div className='header-left'>
                    <button
                        className="header-toggle-button"
                        aria-label="Toggle navigation"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <FaBars size={24} />
                    </button>
                    <div className='header-logo' onClick={() => navigate('/home')}></div>
                </div>
                <nav className={`header-nav ${isMobileMenuOpen ? 'open' : ''}`}>
                    <ul className="header-menu">
                        <li className="header-item dropdown">
                            <span className="header-link">Đặt khám</span>
                            <ul className="header-dropdown">
                                <li onClick={() => handleNavigate('/dat-kham/bac-si')}>
                                    <span>Đặt khám bác sĩ</span>
                                    <p>Đặt lịch khám không chờ đợi</p>
                                </li>
                                <li onClick={() => handleNavigate('/dat-kham/benh-vien')}>
                                    <span>Đặt khám bệnh viện</span>
                                    <p>Đặt khám, thanh toán, nhận kết quả</p>
                                </li>
                                <li onClick={() => handleNavigate('/dat-kham/phong-kham')}>
                                    <span>Đặt khám phòng khám</span>
                                    <p>Đa dạng chuyên khoa và dịch vụ</p>
                                </li>
                                <li onClick={() => handleNavigate('/dat-kham/tiem-chung')}>
                                    <span>Đặt lịch tiêm chủng</span>
                                    <p>Trung tâm tiêm chủng uy tín</p>
                                </li>
                                <li onClick={() => handleNavigate('/dat-kham/xet-nghiem')}>
                                    <span>Đặt lịch xét nghiệm</span>
                                    <p>Trung tâm xét nghiệm uy tín</p>
                                </li>
                            </ul>
                        </li>
                        <li className="header-item">
                            <span className="header-link" onClick={() => handleNavigate('/tu-van-truc-tuyen')}>Tư vấn trực tuyến</span>
                        </li>
                        <li className="header-item">
                            <span className="header-link" onClick={() => handleNavigate('/tin-tuc')}>Tin Y tế</span>
                        </li>
                        <li className="header-item">
                            <span className="header-link" onClick={() => handleNavigate('/dat-kham/ai')}>Trợ lý y khoa</span>
                        </li>
                    </ul>
                </nav>
                <div className="header-right">
                    {isAuthenticated && account ? (
                        <div className="user-section" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                            <FaUserCircle size={24} className="user-avatar" />
                            <span className="welcome-text">Chào mừng, {account.firstName} {account.lastName}</span>
                            {isUserMenuOpen && (
                                <ul className="user-dropdown">
                                    <li onClick={() => handleNavigate('/profile')}>
                                        <span>Profile</span>
                                    </li>
                                    <li onClick={handleLogout}>
                                        <span>Đăng xuất</span>
                                    </li>
                                </ul>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="header-login-btn">Đăng nhập</Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;