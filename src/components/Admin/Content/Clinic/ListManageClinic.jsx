import "./ListManageClinic.scss";
import { getAllClinic } from "../../../../services/userService";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Pagination from "../../../Pagination/Pagination";
import usePagination from "../../../../hooks/usePagination";

const ListManageClinic = () => {
    const { data: clinics, currentPage, totalPages, loading, error, setCurrentPage } = usePagination(getAllClinic);

    return (
        <div className="list-manage-clinic">
            <h2>Danh sách phòng khám</h2>
            {loading && <div className="loading">Đang tải...</div>}
            {error && <div className="error">{error}</div>}
            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th scope="col">Tên phòng khám</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Hình ảnh</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {clinics && clinics.length > 0 ? (
                        clinics.map((clinic) => (
                            <tr key={clinic.id}>
                                <td>{clinic.name}</td>
                                <td className="body-address">{clinic.address}</td>
                                <td>
                                    {clinic.image && (
                                        <img
                                            src={clinic.image}
                                            alt={clinic.name}
                                            className="clinic-image"
                                        />
                                    )}
                                </td>
                                <td>
                                    <button
                                        className="action-btn view-btn"
                                    // onClick={() => handleView(clinic)}
                                    >
                                        <FaEye />
                                    </button>
                                    <button
                                        className="action-btn edit-btn"
                                    // onClick={() => handleUpdateUser(clinic)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="action-btn delete-btn"
                                    // onClick={() => handleDeleteUser(clinic)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Không có phòng khám nào</td>
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

export default ListManageClinic