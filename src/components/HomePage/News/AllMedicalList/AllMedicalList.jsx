// src/components/AllMedicalList/AllMedicalList.jsx
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllBodyPart, getAllDrug, getAllMedicinal, getAllSymptom } from "../../../../services/medicalDataService";
import "./AllMedicalList.scss";
import HomeHeader from "../../HomeHeader";
import HomeFooter from "../../HomeFooter";

const API_MAP = {
    drugs: getAllDrug,
    herbs: getAllMedicinal,
    symptoms: getAllSymptom,
    bodyParts: getAllBodyPart
};

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function AllMedicalList() {
    const { type } = useParams();
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [filterLetter, setFilterLetter] = useState("");

    const fetchData = async () => {
        const apiFunc = API_MAP[type];
        if (!apiFunc) return;

        try {
            setLoading(true);
            const res = await apiFunc(1, 200); // lấy nhiều
            if (res?.data) {
                setData(
                    res.data.drugs ||
                    res.data.herbs ||
                    res.data.symptoms ||
                    res.data.bodyParts ||
                    []
                );
            }
        } catch (error) {
            console.error("Lỗi khi load:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [type]);

    const filteredData = data.filter(item => {
        const nameLower = item.name.toLowerCase();
        const matchesSearch = nameLower.includes(search.toLowerCase());
        const matchesLetter = filterLetter
            ? item.name[0].toUpperCase() === filterLetter
            : true;
        return matchesSearch && matchesLetter;
    });

    return (
        <>
            <HomeHeader />
            <div className="all-medical-list container">
                <h2>
                    Danh sách{" "}
                    {{
                        drugs: "Thuốc",
                        herbs: "Dược liệu",
                        symptoms: "Triệu chứng bệnh",
                        bodyParts: "Bộ phận cơ thể"
                    }[type] || ""}
                </h2>

                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {/* Bộ lọc A-Z */}
                <div className="alphabet-filter">
                    {ALPHABETS.map(letter => (
                        <button
                            key={letter}
                            className={filterLetter === letter ? "active" : ""}
                            onClick={() =>
                                setFilterLetter(filterLetter === letter ? "" : letter)
                            }
                        >
                            {letter}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <p>Đang tải...</p>
                ) : (
                    <ul>
                        {filteredData.map(item => (
                            <li key={item.id}>
                                <Link to={`/${type}/${item.id}`}>{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <HomeFooter />
        </>

    );
}
