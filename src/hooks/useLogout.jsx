import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { postLogout } from '../services/apiService';
import { doLogout } from '../redux/action/userAction';
import { persistor } from '../redux/store.jsx';

const useLogout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            dispatch(doLogout()); // Reset Redux state
            await persistor.purge(); // Xóa trạng thái redux-persist
            localStorage.removeItem('accessToken'); // Xóa accessToken

            if (!token) {
                toast.success('Đăng xuất thành công!');
                navigate('/login');
                return;
            }

            const response = await postLogout(token);

            if (response.errCode === 0) {
                toast.success('Đăng xuất thành công!');
            } else {
                toast.warning('Đã đăng xuất. Token không hợp lệ hoặc đã hết hạn.');
            }
            navigate('/login');
        } catch (error) {
            dispatch(doLogout());
            await persistor.purge();
            localStorage.removeItem('accessToken');
            toast.error('Lỗi server, đã đăng xuất khỏi hệ thống!');
            navigate('/login');
        }
    };

    return handleLogout;
};

export default useLogout;