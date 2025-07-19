import { useState } from 'react';
import './HeaderNews.scss';
import { FaHome, FaBars } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';
import { useNavigate, Link } from 'react-router-dom';
import HeaderMenu from './HeaderMenu';
import SearchNews from './SearchNews';

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
                <SearchNews />
            </div>

            {/* Menu Section */}
            <HeaderMenu navigate={navigate} />

        </div>
    );
};

export default HeaderNews;
