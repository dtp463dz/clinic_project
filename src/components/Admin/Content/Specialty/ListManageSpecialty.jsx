import usePagination from "../../../../hooks/usePagination";
import Pagination from "../../../Pagination/Pagination";
import { getAllSpecialty } from "../../../../services/userService";
import "./ListManageSpecialty.scss";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import useDeleteItem from "../../../../hooks/useDeleteItem";
import { useState } from "react";
import ModalDelete from "../../../modal/ModalDelete";
import { toast } from 'react-toastify';
import useEditItem from "../../../../hooks/useEditItem";
import ModalEdit from "../../../modal/ModalEdit";

const ListManageSpecialty = () => {
    // hooks
    const { data: specialties, currentPage, totalPages, totalItems, loading, error, setCurrentPage, refetch } = usePagination(getAllSpecialty);
    const { deleteItem, loading: deleteLoading } = useDeleteItem();
    const { editItem, loading: editLoading } = useEditItem();

    // state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedSpecialties, setSelectedSpecialties] = useState(null);
    // handle xóa
    const handleDelete = (specialty) => {
        setSelectedSpecialties(specialty);
        setShowDeleteModal(true);
    }
    // handle chỉnh sửa
    const handleEdit = (specialty) => {
        setSelectedSpecialties(specialty);
        setShowEditModal(true);
    };
    // xác nhận xóa
    const handleConfirmDelete = async () => {
        if (selectedSpecialties) {
            const success = await deleteItem('Specialty', selectedSpecialties.id);
            if (success) {
                refetch(); // Tải lại danh sách sau khi xóa
                setShowDeleteModal(false);
                setSelectedSpecialties(null);
                toast.success('Xóa chuyên khoa thành công!');
            } else {
                toast.error('Xóa chuyên khoa thất bại!');
            }
        }
    };
    // xác nhận chỉnh sửa
    const handleConfirmEdit = async (data) => {
        const success = await editItem('Specialty', data);
        if (success) {
            await refetch();
            setShowEditModal(false);
            setSelectedSpecialties(null);
        } else {
            toast.error('Cập nhật chuyên khoa thất bại!');
        }

    };
    const handleCloseModal = () => {
        setShowDeleteModal(false);
        setShowEditModal(false);
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
                                        onClick={() => handleEdit(specialty)}
                                        disabled={editLoading || deleteLoading}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="action-btn delete-btn"
                                        onClick={() => handleDelete(specialty)}
                                        disabled={deleteLoading || editLoading}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">
                                {totalItems === 0 ? 'Danh sách chuyên khoa trống' : 'Không có chuyên khoa'}
                                {totalItems > 0 && (
                                    <button className="btn btn-link" onClick={() => setCurrentPage(1)}>
                                        Quay về trang đầu
                                    </button>
                                )}
                            </td>
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
                show={showDeleteModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                item={selectedSpecialties}
                type='Specialty'
                deleteLoading={deleteLoading}
            />
            <ModalEdit
                show={showEditModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmEdit}
                item={selectedSpecialties}
                type="Specialty"
                loading={editLoading}
            />
        </div>
    )
}

export default ListManageSpecialty