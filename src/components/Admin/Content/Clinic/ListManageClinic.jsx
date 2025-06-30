import "./ListManageClinic.scss";
import { getAllClinic } from "../../../../services/userService";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Pagination from "../../../Pagination/Pagination";
import usePagination from "../../../../hooks/usePagination";
import useDeleteItem from "../../../../hooks/useDeleteItem";
import { useState } from "react";
import ModalDelete from "../../../modal/ModalDelete";

const ListManageClinic = () => {
    const { data: clinics, currentPage, totalPages, loading, error, setCurrentPage, refetch } = usePagination(getAllClinic);
    const { deleteItem, loading: deleteLoading } = useDeleteItem();
    const [showModal, setShowModal] = useState(false);
    const [selectedClinic, setSelectedClinic] = useState(null);

    const handleDelete = (clinic) => {
        setSelectedClinic(clinic);
        setShowModal(true);
    }

    const handleConfirmDelete = async () => {
        if (selectedClinic) {
            const success = await deleteItem('Clinic', selectedClinic.id);
            if (success) {
                refetch(); // Tải lại danh sách sau khi xóa
                setShowModal(false);
                setSelectedClinic(null);
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedClinic(null);
    };
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
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="action-btn delete-btn"
                                        onClick={() => handleDelete(clinic)}
                                        disabled={deleteLoading}
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
            <ModalDelete
                show={showModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                item={selectedClinic}
                type='Clinic'
            />
        </div>
    )
}

export default ListManageClinic