import usePagination from "../../../../hooks/usePagination";
import Pagination from "../../../Pagination/Pagination";
import { getAllSpecialty } from "../../../../services/userService";
import "./ListManageSpecialty.scss";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import useDeleteItem from "../../../../hooks/useDeleteItem";
import { useState } from "react";
import ModalDelete from "../../../modal/ModalDelete";

const ListManageSpecialty = () => {
    const { data: specialties, currentPage, totalPages, loading, error, setCurrentPage, refetch } = usePagination(getAllSpecialty);
    const { deleteItem, loading: deleteLoading } = useDeleteItem();
    const [showModal, setShowModal] = useState(false);
    const [selectedSpecialties, setSelectedSpecialties] = useState(null);
    const handleDelete = (specialty) => {
        setSelectedSpecialties(specialty);
        setShowModal(true);
    }

    const handleConfirmDelete = async () => {
        if (selectedSpecialties) {
            const success = await deleteItem('Specialty', selectedSpecialties.id);
            if (success) {
                refetch(); // Tải lại danh sách sau khi xóa
                setShowModal(false);
                setSelectedSpecialties(null);
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedSpecialties(null);
    };
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
                                        onClick={() => handleDelete(specialty)}
                                        disabled={deleteLoading}
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
            <ModalDelete
                show={showModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                item={selectedSpecialties}
                type='Specialty'
            />
        </div>
    )
}

export default ListManageSpecialty