import { useState } from 'react';
import { updateClinic, updateSpecialty } from '../services/userService';
import { toast } from 'react-toastify';
import { updateHandBook } from '../services/handbookService';

const useEditItem = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const editItem = async (type, data) => {
        setLoading(true);
        setError(null);
        try {
            let response;
            if (type === 'Specialty') {
                response = await updateSpecialty(data);
            } else if (type === 'Clinic') {
                response = await updateClinic(data);
            } else if (type === 'HandBook') {
                response = await updateHandBook(data);
            } else {
                throw new Error('Loại mục không hợp lệ');
            }
            if (response.errCode === 0) {
                toast.success(response.message);
                return true; // Chỉnh sửa thành công
            } else {
                toast.error(response.message);
                return false; // Chỉnh sửa thất bại
            }
        } catch (e) {
            const errorMessage = e.response?.message || 'Lỗi khi chỉnh sửa mục';
            setError(errorMessage);
            toast.error(errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { editItem, loading, error };
};

export default useEditItem;