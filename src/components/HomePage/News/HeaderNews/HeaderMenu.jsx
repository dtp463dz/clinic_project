import { useState } from 'react';
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

    const fetchData = async (type) => {
        try {
            let response;
            if (type === 'symptoms') response = await getAllSymptom();
            if (type === 'drugs') response = await getAllDrug();
            if (type === 'herbs') response = await getAllMedicinal();
            if (type === 'bodyParts') response = await getAllBodyPart();

            // Extract the array based on the type
            let data = [];
            if (response?.data) {
                if (type === 'drugs') {
                    data = Array.isArray(response.data.drugs) ? response.data.drugs : [];
                } else if (type === 'symptoms') {
                    data = Array.isArray(response.data.symptoms) ? response.data.symptoms : [];
                } else if (type === 'herbs') {
                    data = Array.isArray(response.data.herbs) ? response.data.herbs : [];
                } else if (type === 'bodyParts') {
                    data = Array.isArray(response.data.bodyParts) ? response.data.bodyParts : [];
                }
            }

            setDropdowns((prev) => ({
                ...prev,
                [type]: { ...prev[type], data },
            }));
        } catch (error) {
            console.error(`Error fetching data for ${type}:`, error);
            setDropdowns((prev) => ({
                ...prev,
                [type]: { ...prev[type], data: [] },
            }));
        }
    };

    const handleMouseEnter = async (type) => {
        // Chỉ gọi API nếu dữ liệu chưa có
        if (dropdowns[type].data.length === 0) {
            await fetchData(type);
        }
        // Hiển thị dropdown khi hover
        setDropdowns((prev) => ({
            ...prev,
            [type]: { ...prev[type], show: true },
        }));
    };

    const handleMouseLeave = (type) => {
        // an dropdown khi chuột rời
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
                    </ul>
                )}
            </li>
        )
    }
    return (
        <ul className="header-menu">
            <li><FaHome className="home-icon" onClick={() => navigate('/tin-tuc')} /></li>
            {renderDropdown('symptoms', 'Tra cứu bệnh')}
            {renderDropdown('drugs', 'Tra cứu thuốc')}
            {renderDropdown('herbs', 'Tra cứu dược liệu')}
            {renderDropdown('bodyParts', 'Tra cứu bộ phận cơ thể')}

        </ul>
    )
}

export default HeaderMenu;