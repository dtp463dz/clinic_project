import { useState } from "react";
import { deleteClinic, deleteSpecialty } from "../services/userService";
import { toast } from 'react-toastify';
import { deleteHandBook } from "../services/handbookService";

const useDeleteItem = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteItem = async (type, id) => {
        setLoading(true);
        setError(null);
        try {
            let response;
            if (type === 'Clinic') {
                response = await deleteClinic(id);
            } else if (type === 'Specialty') {
                response = await deleteSpecialty(id);
            } else if (type === 'HandBook') {
                response = await deleteHandBook(id);
            } else {
                throw new Error('Loại mục không hợp lệ');
            }

            if (response.errCode === 0) {
                return true; // Xóa thành công
            } else {
                return false; // Xóa thất bại
            }
        } catch (e) {
            const errorMessage = e.response?.errMessage || 'Lỗi khi xóa mục';
            setError(errorMessage);
            toast.error(errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    }
    return {
        deleteItem,
        loading,
        error,
    };
}

export default useDeleteItem;