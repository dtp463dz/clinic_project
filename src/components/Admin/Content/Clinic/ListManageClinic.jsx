import "./ListManageClinic.scss";
import { getAllClinic } from "../../../../services/userService";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Pagination from "../../../Pagination/Pagination";
import usePagination from "../../../../hooks/usePagination";
import useDeleteItem from "../../../../hooks/useDeleteItem";
import { useState } from "react";
import ModalDelete from "../../../modal/ModalDelete";
import useEditItem from "../../../../hooks/useEditItem";
import { toast } from 'react-toastify';
import ModalEdit from "../../../modal/ModalEdit";

const ListManageClinic = () => {
    // hooks
    const { data: clinics, currentPage, totalPages, totalItems, loading, error, setCurrentPage, refetch } = usePagination(getAllClinic);
    const { deleteItem, loading: deleteLoading } = useDeleteItem();
    const { editItem, loading: editLoading } = useEditItem();

    // state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedClinic, setSelectedClinic] = useState(null);
    // handle xóa
    const handleDelete = (clinic) => {
        setSelectedClinic(clinic);
        setShowDeleteModal(true);
    }
    // handle chỉnh sửa
    const handleEdit = (clinic) => {
        setSelectedClinic(clinic);
        setShowEditModal(true);
    }
    // xác nhận xóa
    const handleConfirmDelete = async () => {
        if (selectedClinic) {
            const success = await deleteItem('Clinic', selectedClinic.id);
            if (success) {
                refetch(); // Tải lại danh sách sau khi xóa
                setShowDeleteModal(false);
                setSelectedClinic(null);
            }
        }
    };
    // xác nhận chỉnh sửa
    const handleConfirmEdit = async (data) => {
        const success = await editItem('Clinic', data);
        if (success) {
            await refetch();
            setShowEditModal(false);
            setSelectedClinic(null);
        } else {
            toast.error('Cập nhật phòng khám thất bại!');
        }
    }
    // đóng modal
    const handleCloseModal = () => {
        setShowDeleteModal(false);
        setShowEditModal(false);
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
                                        onClick={() => handleEdit(clinic)}
                                        disabled={editLoading || deleteLoading}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="action-btn delete-btn"
                                        onClick={() => handleDelete(clinic)}
                                        disabled={deleteLoading || editLoading}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">
                                {totalItems === 0 ? 'Danh sách phòng khám trống' : 'Không có phòng khám'}
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
                item={selectedClinic}
                type='Clinic'
                deleteLoading={deleteLoading}
            />
            <ModalEdit
                show={showEditModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmEdit}
                item={selectedClinic}
                type="Clinic"
                loading={editLoading}
            />
        </div>
    )
}

export default ListManageClinic