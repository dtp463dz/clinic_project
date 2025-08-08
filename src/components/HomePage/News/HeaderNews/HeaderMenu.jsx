import { useState, useEffect } from 'react';
import { FaHome } from 'react-icons/fa';
import { getAllBodyPart, getAllDrug, getAllMedicinal, getAllSymptom } from '../../../../services/medicalDataService';
import { Link, useNavigate } from 'react-router-dom';
import './HeaderMenu.scss';

const HeaderMenu = () => {
    const navigate = useNavigate();
    const [dropdowns, setDropdowns] = useState({
        symptoms: { show: false, data: [] },
        drugs: { show: false, data: [] },
        herbs: { show: false, data: [] },
        bodyParts: { show: false, data: [] },
    });

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [symptomsRes, drugsRes, herbsRes, bodyPartsRes] = await Promise.all([
                    getAllSymptom(1, 5), // chỉ lấy 5 mục đầu để menu gọn hơn
                    getAllDrug(1, 5),
                    getAllMedicinal(1, 5),
                    getAllBodyPart(1, 5),
                ]);

                setDropdowns({
                    symptoms: { show: false, data: symptomsRes?.data?.symptoms || [] },
                    drugs: { show: false, data: drugsRes?.data?.drugs || [] },
                    herbs: { show: false, data: herbsRes?.data?.herbs || [] },
                    bodyParts: { show: false, data: bodyPartsRes?.data?.bodyParts || [] },
                });
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };

        fetchAllData();
    }, []);

    const handleMouseEnter = (type) => {
        setDropdowns((prev) => ({
            ...prev,
            [type]: { ...prev[type], show: true },
        }));
    };

    const handleMouseLeave = (type) => {
        setDropdowns((prev) => ({
            ...prev,
            [type]: { ...prev[type], show: false },
        }));
    };

    const renderDropdown = (type, label) => {
        return (
            <li
                className="menu-item dropdown"
                onMouseEnter={() => handleMouseEnter(type)}
                onMouseLeave={() => handleMouseLeave(type)}
            >
                <span>{label}</span>
                {dropdowns[type].show && Array.isArray(dropdowns[type].data) && (
                    <ul className="dropdown-list">
                        {dropdowns[type].data.map((item) => (
                            <li key={item.id}>
                                <Link to={`/${type}/${item.id}`}>{item.name}</Link>
                            </li>
                        ))}
                        <li className="view-more">
                            <Link to={`/medical/${type}`}>Xem thêm...</Link>
                        </li>
                    </ul>
                )}
            </li>
        );
    };

    return (
        <ul className="header-menu">
            <li><FaHome className="home-icon" onClick={() => navigate('/tin-tuc')} /></li>
            {renderDropdown('symptoms', 'Tra cứu bệnh')}
            {renderDropdown('drugs', 'Tra cứu thuốc')}
            {renderDropdown('herbs', 'Tra cứu dược liệu')}
            {renderDropdown('bodyParts', 'Tra cứu bộ phận cơ thể')}
        </ul>
    );
};

export default HeaderMenu;
