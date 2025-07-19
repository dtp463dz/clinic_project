import { useNavigate } from "react-router-dom";
import { getSearchMedical } from "../../../../services/medicalDataService";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { GoSearch } from "react-icons/go";

const SearchNews = () => {
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState({
        symptoms: [],
        drugs: [],
        herbs: [],
        bodyParts: [],
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();

    // Call API
    const fetchSearchResults = async (searchTerm) => {
        if (searchTerm.trim() === "") {
            setResults({ symptoms: [], drugs: [], herbs: [], bodyParts: [] });
            setShowResults(false);
            return;
        }
        try {
            setIsLoading(true);
            const response = await getSearchMedical(searchTerm);
            if (response.errCode === 0) {
                setResults(response.data);
                setShowResults(true);
            } else {
                console.error(response.errMessage);
                setResults({ symptoms: [], drugs: [], herbs: [], bodyParts: [] });
                setShowResults(false);
            }
        } catch (error) {
            console.error("Lỗi khi gọi API tìm kiếm:", error);
            setResults({ symptoms: [], drugs: [], herbs: [], bodyParts: [] });
            setShowResults(false);
        } finally {
            setIsLoading(false);
        }
    };

    // Memo hóa hàm debounce để tránh tạo lại mỗi lần re-render
    const debouncedSearch = useMemo(() => debounce(fetchSearchResults, 300), []);

    // Gọi debounce mỗi khi keyword thay đổi
    useEffect(() => {
        debouncedSearch(keyword);
        // Cancel khi component bị unmount
        return () => {
            debouncedSearch.cancel();
        };
    }, [keyword, debouncedSearch]);

    const handleResultClick = (type, id) => {
        setShowResults(false);
        setKeyword("");
        if (type === "symptom") {
            navigate(`/symptoms/${id}`);
        } else if (type === "drug") {
            navigate(`/drugs/${id}`);
        } else if (type === "herb") {
            navigate(`/herbs/${id}`);
        } else if (type === "bodyPart") {
            navigate(`/bodyParts/${id}`);
        }
    };

    return (
        <div className="search-container">
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Tìm kiếm bài viết, thông tin bệnh, thuốc ..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button className="search-icon">
                    <GoSearch />
                </button>
            </div>
            {showResults && (
                <div className="search-results">
                    {isLoading ? (
                        <div className="loading">Đang tải...</div>
                    ) : (
                        <>
                            {results.symptoms.length > 0 && (
                                <div className="result-section">
                                    <h4>Triệu chứng</h4>
                                    {results.symptoms.map((symptom) => (
                                        <div
                                            key={symptom.id}
                                            className="result-item"
                                            onClick={() => handleResultClick("symptom", symptom.id)}
                                        >
                                            {symptom.name}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {results.drugs.length > 0 && (
                                <div className="result-section">
                                    <h4>Thuốc</h4>
                                    {results.drugs.map((drug) => (
                                        <div
                                            key={drug.id}
                                            className="result-item"
                                            onClick={() => handleResultClick("drug", drug.id)}
                                        >
                                            {drug.name}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {results.herbs.length > 0 && (
                                <div className="result-section">
                                    <h4>Dược liệu</h4>
                                    {results.herbs.map((herb) => (
                                        <div
                                            key={herb.id}
                                            className="result-item"
                                            onClick={() => handleResultClick("herb", herb.id)}
                                        >
                                            {herb.name}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {results.bodyParts.length > 0 && (
                                <div className="result-section">
                                    <h4>Bộ phận cơ thể</h4>
                                    {results.bodyParts.map((bodyPart) => (
                                        <div
                                            key={bodyPart.id}
                                            className="result-item"
                                            onClick={() => handleResultClick("bodyPart", bodyPart.id)}
                                        >
                                            {bodyPart.name}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {results.symptoms.length === 0 &&
                                results.drugs.length === 0 &&
                                results.herbs.length === 0 &&
                                results.bodyParts.length === 0 && (
                                    <div className="no-results">Không tìm thấy kết quả</div>
                                )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchNews;