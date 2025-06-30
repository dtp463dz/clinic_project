import { useState, useEffect } from "react"

const usePagination = (apiFunction, defaultLimit = 5) => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);

    const fetchData = async (page = 1) => {
        setLoading(true);
        try {
            const response = await apiFunction(page, defaultLimit);
            if (response.errCode === 0) {
                const specialties = response.data.specialties;
                const clinics = response.data.clinics;
                setData(specialties || clinics || []);
                setCurrentPage(response.data.currentPage);
                setTotalPages(response.data.totalPages);
                setTotalItems(response.data.totalItems);
                setError(null);
            } else {
                setError(response.errMessage);
            }

        } catch (e) {
            setError('Lỗi khi lấy dữ liệu');
            console.log(e)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage])
    return {
        data,
        currentPage,
        totalPages,
        totalItems,
        loading,
        error,
        setCurrentPage,
        fetchData
    }
}

export default usePagination;