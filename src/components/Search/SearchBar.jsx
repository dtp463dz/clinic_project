import './SearchBar.scss';
import { useNavigate } from 'react-router-dom';
import { GoSearch } from "react-icons/go";
import { useEffect, useMemo, useState } from 'react';
import { getSearch } from '../../services/apiService';
import { debounce } from 'lodash';

const SearchBar = () => {
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState({ doctors: [], clinics: [], specialties: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();

    // call api
    const fetchSearchResults = async (searchTerm) => {
        if (searchTerm.trim() === '') {
            setResults({ doctors: [], clinics: [], specialties: [] });
            setShowResults(false);
            return;
        }
        try {
            setIsLoading(true);
            const response = await getSearch(searchTerm); // Sử dụng hàm getSearch
            if (response.errCode === 0) {
                setResults(response.data);
                setShowResults(true);
            } else {
                console.error(response.errMessage);
                setResults({ doctors: [], clinics: [], specialties: [] });
                setShowResults(false);
            }
        } catch (error) {
            console.error('Lỗi khi gọi API tìm kiếm:', error);
            setResults({ doctors: [], clinics: [], specialties: [] });
            setShowResults(false);
        } finally {
            setIsLoading(false);
        }
    }
    // memo hóa hàm debounce để k bị tạo lại mỗi lần re-render
    const debouncedSearch = useMemo(() =>
        debounce(fetchSearchResults, 300), []
    );
    // goi debounce mỗi khi keyword thay đổi
    useEffect(() => {
        debouncedSearch(keyword);
        // cancel khi component bị unmount
        return () => {
            debouncedSearch.cancel();
        };
    }, [keyword, debouncedSearch])

    const handleResultClick = (type, id) => {
        setShowResults(false);
        setKeyword('');
        if (type === 'doctor') {
            navigate(`/detail-doctor/${id}`);
        } else if (type === 'clinic') {
            navigate(`/detail-clinic/${id}`);
        } else if (type === 'specialty') {
            navigate(`/detail-specialty/${id}`);
        }
    };
    return (
        <div className='search-container'>
            <div className='search'>
                <input
                    type="text"
                    placeholder='Tìm kiếm bác sĩ, phòng khám, chuyên khoa...'
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <i><GoSearch /></i>
            </div>
            {showResults && (
                <div className='search-results'>
                    {isLoading ? (
                        <div className="loading">Đang tải...</div>
                    ) : (
                        <>
                            {results.doctors.length > 0 && (
                                <div className="result-section">
                                    <h4>Bác sĩ</h4>
                                    {results.doctors.map(doctor => (
                                        <div
                                            key={doctor.id}
                                            className="result-item"
                                            onClick={() => handleResultClick('doctor', doctor.id)}
                                        >
                                            {doctor.firstName} {doctor.lastName} - {doctor.positionData.valueVi}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {results.clinics.length > 0 && (
                                <div className="result-section">
                                    <h4>Phòng khám</h4>
                                    {results.clinics.map(clinic => (
                                        <div
                                            key={clinic.id}
                                            className="result-item"
                                            onClick={() => handleResultClick('clinic', clinic.id)}
                                        >
                                            {clinic.name} - {clinic.address}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {results.specialties.length > 0 && (
                                <div className="result-section">
                                    <h4>Chuyên khoa</h4>
                                    {results.specialties.map(specialty => (
                                        <div
                                            key={specialty.id}
                                            className="result-item"
                                            onClick={() => handleResultClick('specialty', specialty.id)}
                                        >
                                            {specialty.name}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {results.doctors.length === 0 &&
                                results.clinics.length === 0 &&
                                results.specialties.length === 0 && (
                                    <div className="no-results">Không tìm thấy kết quả</div>
                                )}

                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchBar