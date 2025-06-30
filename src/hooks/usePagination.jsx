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

    const refetch = async () => {
        setLoading(true);
        try {
            const response = await apiFunction(currentPage, defaultLimit);
            console.log('Refetch Response:', response.data); // Debug response
            if (response.errCode === 0) {
                const specialties = response.data.specialties;
                const clinics = response.data.clinics;
                const fetchedData = specialties || clinics || [];
                const fetchedTotalPages = response.data.totalPages || 1;

                setData(fetchedData);
                setTotalPages(fetchedTotalPages);
                setTotalItems(response.data.totalItems);

                // Nếu currentPage lớn hơn totalPages mới, chuyển về trang cuối hoặc trang 1
                if (currentPage > fetchedTotalPages && fetchedTotalPages > 0) {
                    console.log(`Adjusting page from ${currentPage} to ${fetchedTotalPages}`);
                    setCurrentPage(fetchedTotalPages);
                } else if (fetchedTotalPages === 0) {
                    setCurrentPage(1); // Nếu không còn dữ liệu, đặt về trang 1
                }

                setError(null);
            } else {
                setError(response.errMessage);
            }
        } catch (e) {
            setError('Lỗi khi lấy dữ liệu');
            console.log('Refetch error:', e);
        } finally {
            setLoading(false);
        }
    };
    return {
        data,
        currentPage,
        totalPages,
        totalItems,
        loading,
        error,
        setCurrentPage,
        fetchData,
        refetch
    }
}

export default usePagination;