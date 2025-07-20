import { useState } from "react";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import usePagination from "../../../../hooks/usePagination";
import Pagination from "../../../Pagination/Pagination";
import ModalDelete from "../../../modal/ModalDelete";
import ModalEdit from "../../../modal/ModalEdit";
import useDeleteItem from "../../../../hooks/useDeleteItem";
import useEditItem from "../../../../hooks/useEditItem";
import { getAllHandBook, deleteHandBook, updateHandBook } from "../../../../services/handbookService";
import "./ListHandBook.scss";

const ListHandBook = () => {
    // Hooks
    const { data: handbooks, currentPage, totalPages, totalItems, loading, error, setCurrentPage, refetch } = usePagination(getAllHandBook);
    const { deleteItem, loading: deleteLoading } = useDeleteItem();
    const { editItem, loading: editLoading } = useEditItem();

    // State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedHandBook, setSelectedHandBook] = useState(null);

    // Xử lý xóa
    const handleDelete = (handbook) => {
        setSelectedHandBook(handbook);
        setShowDeleteModal(true);
    };

    // Xử lý chỉnh sửa
    const handleEdit = (handbook) => {
        setSelectedHandBook(handbook);
        setShowEditModal(true);
    };

    // Xác nhận xóa
    const handleConfirmDelete = async () => {
        if (selectedHandBook) {
            const success = await deleteItem('HandBook', selectedHandBook.id, deleteHandBook);
            if (success) {
                refetch(); // Tải lại danh sách sau khi xóa
                setShowDeleteModal(false);
                setSelectedHandBook(null);
                toast.success('Xóa cẩm nang thành công!');
            } else {
                toast.error('Xóa cẩm nang thất bại!');
            }
        }
    };

    // Xác nhận chỉnh sửa
    const handleConfirmEdit = async (data) => {
        // Chuyển publicationDate thành timestamp
        let publicationDateTimestamp = null;
        if (data.publicationDate) {
            const parsedDate = new Date(data.publicationDate);
            if (!isNaN(parsedDate.getTime())) {
                publicationDateTimestamp = parsedDate.getTime();
            } else {
                toast.error('Ngày xuất bản không hợp lệ');
                return;
            }
        } else {
            toast.error('Vui lòng chọn ngày xuất bản');
            return;
        }

        const updatedData = {
            id: data.id,
            title: data.name, // Ánh xạ name thành title để phù hợp với API
            author: data.author || '',
            descriptionHTML: data.descriptionHTML,
            descriptionMarkdown: data.descriptionMarkdown,
            image: data.image,
            publicationDate: publicationDateTimestamp,
            lastUpdateDate: publicationDateTimestamp,
        };

        const success = await editItem('HandBook', updatedData, updateHandBook);
        if (success) {
            await refetch();
            setShowEditModal(false);
            setSelectedHandBook(null);
            toast.success('Cập nhật cẩm nang thành công!');
        } else {
            toast.error('Cập nhật cẩm nang thất bại!');
        }
    };

    // Đóng modal
    const handleCloseModal = () => {
        setShowDeleteModal(false);
        setShowEditModal(false);
        setSelectedHandBook(null);
    };

    // Định dạng ngày tháng
    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = new Date(timestamp);
        return isNaN(date.getTime()) ? 'N/A' : format(date, 'dd/MM/yyyy');
    };
    console.log('check data : ', handbooks)

    return (
        <div className="list-manage-handbook">
            <h2>Danh sách cẩm nang</h2>
            {loading && <div className="loading">Đang tải...</div>}
            {error && <div className="error">{error}</div>}
            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th scope="col">Tiêu đề</th>
                        <th scope="col">Tác giả</th>
                        <th scope="col">Ngày xuất bản</th>
                        <th scope="col">Hình ảnh</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {handbooks && handbooks.length > 0 ? (
                        handbooks.map((handbook) => (
                            <tr key={handbook.id}>
                                <td>{handbook.title}</td>
                                <td>{handbook.author || 'N/A'}</td>
                                <td>{formatDate(handbook.publicationDate)}</td>
                                <td>
                                    {handbook.image && (
                                        <img
                                            src={handbook.image}
                                            alt={handbook.title}
                                            className="handbook-image"
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
                                        onClick={() => handleEdit(handbook)}
                                        disabled={editLoading || deleteLoading}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="action-btn delete-btn"
                                        onClick={() => handleDelete(handbook)}
                                        disabled={deleteLoading || editLoading}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">
                                {totalItems === 0 ? 'Danh sách cẩm nang trống' : 'Không có cẩm nang'}
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
                item={selectedHandBook}
                type="HandBook"
                deleteLoading={deleteLoading}
            />
            <ModalEdit
                show={showEditModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmEdit}
                item={selectedHandBook ? {
                    ...selectedHandBook,
                    name: selectedHandBook.title, // Ánh xạ title thành name để phù hợp với ModalEdit
                    author: selectedHandBook.author || '',
                } : null}
                type="HandBook"
                loading={editLoading}
            />
        </div>
    );
};

export default ListHandBook;