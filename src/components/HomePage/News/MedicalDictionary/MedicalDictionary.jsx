import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./MedicalDictionary.scss";
import { getAllBodyPart, getAllDrug, getAllMedicinal, getAllSymptom } from "../../../../services/medicalDataService";

const TAB_CONFIG = [
    { key: "drugs", label: "Thuốc", api: getAllDrug },
    { key: "herbs", label: "Dược liệu", api: getAllMedicinal },
    { key: "symptoms", label: "Bệnh", api: getAllSymptom },
    { key: "bodyParts", label: "Cơ thể", api: getAllBodyPart },
];

export default function MedicalDictionary() {
    const [activeTab, setActiveTab] = useState("drugs");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const fetchData = async (tabKey) => {
        const tab = TAB_CONFIG.find(t => t.key === tabKey);
        if (!tab) return;

        try {
            setLoading(true);
            const res = await tab.api(1, 8); // lấy 8 bản ghi
            if (res?.data) {
                const arr =
                    res.data.drugs ||
                    res.data.herbs ||
                    res.data.symptoms ||
                    res.data.bodyParts ||
                    [];
                setData(arr);
            }
        } catch (error) {
            console.error("Lỗi khi load dữ liệu:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(activeTab);
    }, [activeTab]);

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="medical-dictionary container">
            <h2>Từ Điển Y Khoa</h2>

            {/* Tabs */}
            <div className="tabs">
                {TAB_CONFIG.map(tab => (
                    <button
                        key={tab.key}
                        className={activeTab === tab.key ? "active" : ""}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Search */}
            <input
                type="text"
                placeholder={`Nhập tên ${TAB_CONFIG.find(t => t.key === activeTab)?.label.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />

            {/* List */}
            {loading ? (
                <div className="loading">Đang tải...</div>
            ) : (
                <div className="card-list">
                    {filteredData.map(item => (
                        <Link
                            key={item.id}
                            to={`/${activeTab}/${item.id}`}
                            className="card"
                        >
                            {item.image && <img src={item.image} alt={item.name} />}
                            <h4>{item.name}</h4>
                        </Link>
                    ))}
                </div>
            )}

            {/* Xem tất cả */}
            <div className="view-all">
                <button onClick={() => navigate(`/medical/${activeTab}`)}>Xem tất cả</button>
            </div>
        </div>
    );
}
