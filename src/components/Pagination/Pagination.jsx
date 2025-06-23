import "./Pagination.scss";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
const Pagination = (props) => {
    const { currentPage, totalPages, onPageChange } = props;
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages && page !== currentPage) {
            onPageChange(page);
        }
    };
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };
    return (
        <div className="pagination-container">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn prev-btn"
            >
                <GrFormPreviousLink />
            </button>

            {getPageNumbers().map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn next-btn"
            >
                <GrFormNextLink />
            </button>

            <span className="pagination-info">
                Page {currentPage} of {totalPages}
            </span>
        </div>
    )
}

export default Pagination;