import { useState } from 'react';
import './HeaderNews.scss';
import { FaHome, FaBars } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';
import { useNavigate, Link } from 'react-router-dom';

const HeaderNews = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <div className={`header-news ${menuOpen ? 'menu-open' : ''}`}>
            {/* Top Section */}
            <div className="header-top">
                <div className='header-left'>
                    <button
                        className="header-toggle-button"
                        aria-label="Toggle navigation"
                        onClick={toggleMenu}
                    >
                        <FaBars size={24} />
                    </button>
                    <div className='header-logo' onClick={() => navigate('/home')}></div>
                </div>
                <div className="search-box">
                    <input type="text" placeholder="Tìm kiếm bài viết, thông tin bệnh, thuốc ..." />
                    <button className="search-icon">
                        <GoSearch />
                    </button>
                </div>
            </div>

            {/* Menu Section */}
            <div className="header-menu">
                <ul>
                    <li><FaHome className="home-icon" /></li>
                    <li>Tra cứu bệnh</li>
                    <li>Tra cứu Thuốc & Dược liệu</li>
                    <li>Bản tin sức khỏe</li>
                </ul>
            </div>
        </div>
    );
};

export default HeaderNews;
