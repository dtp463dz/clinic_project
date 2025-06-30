import usePagination from "../../../../hooks/usePagination";
import Pagination from "../../../Pagination/Pagination";
import { getAllSpecialty } from "../../../../services/userService";
import "./ListManageSpecialty.scss";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
const ListManageSpecialty = () => {
    const { data: specialties, currentPage, totalPages, loading, error, setCurrentPage } = usePagination(getAllSpecialty);
    return (
        <div className="list-manage-specialty">
            <h2>Danh sách chuyên khoa</h2>
            {loading && <div className="loading">Đang tải...</div>}
            {error && <div className="error">{error}</div>}
            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th scope="col">Tên chuyên khoa</th>
                        <th scope="col">Hình ảnh</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {specialties && specialties.length > 0 ? (
                        specialties.map((specialty) => (
                            <tr key={specialty.id}>
                                <td>{specialty.name}</td>
                                <td>
                                    {specialty.image && (
                                        <img
                                            src={specialty.image}
                                            alt={specialty.name}
                                            className="specialty-image"
                                        />
                                    )}
                                </td>
                                <td>
                                    <button
                                        className="action-btn view-btn"
                                    // onClick={() => handleView(specialty)}
                                    >
                                        <FaEye />
                                    </button>
                                    <button
                                        className="action-btn edit-btn"
                                    // onClick={() => handleUpdateUser(specialty)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="action-btn delete-btn"
                                    // onClick={() => handleDeleteUser(specialty)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">Không có chuyên khoa nào</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}

export default ListManageSpecialty