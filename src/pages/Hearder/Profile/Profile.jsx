import './Profile.scss';
import { getUserProfile, getAllCodeService } from '../../../services/apiService';
import { useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import CancelButton from './CancelButton';
import EditProfileModal from './EditProfileModal';

const Profile = () => {
    const { account, isAuthenticated } = useSelector((state) => state.user);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [statuses, setStatuses] = useState({});
    const [showEditModal, setShowEditModal] = useState(false);
    const prevAccessToken = useRef(account?.accessToken);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const statusResponse = await getAllCodeService('STATUS');
            if (statusResponse.errCode === 0) {
                const statusMap = {};
                statusResponse.data.forEach(status => {
                    statusMap[status.keyMap] = status.valueVi;
                });
                setStatuses(statusMap);
            } else {
                console.warn('Lỗi lấy STATUS:', statusResponse.errMessage);
            }
            const response = await getUserProfile(account.accessToken);
            if (response.errCode === 0) {
                console.log('Profile data:', response.data); // Debug dữ liệu API
                setProfile(response.data);
            } else {
                toast.error(response.errMessage || 'Không thể tải hồ sơ', { autoClose: 3000 });
            }
        } catch (err) {
            console.error('Lỗi fetchProfile:', err);
            toast.error('Lỗi khi tải thông tin hồ sơ. Vui lòng thử lại sau.', { autoClose: 3000 });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log('Account:', account, 'isAuthenticated:', isAuthenticated); // Debug Redux
        if (!isAuthenticated || !account || !account.accessToken) {
            toast.error('Vui lòng đăng nhập để xem hồ sơ', { autoClose: 3000 });
            return; // Ngăn tiếp tục thực thi để tránh toast chồng chất
        }
        // Gọi fetchProfile lần đầu hoặc khi accessToken thay đổi
        if (!profile || account.accessToken !== prevAccessToken.current) {
            fetchProfile();
            prevAccessToken.current = account.accessToken;
        }
    }, [isAuthenticated, account, profile]);

    if (!isAuthenticated) {
        return <div className="profile-container">Vui lòng đăng nhập để xem hồ sơ</div>;
    }

    if (loading) {
        return <div className="profile-container">Đang tải hồ sơ...</div>;
    }

    if (!profile) {
        return <div className="profile-container">Không thể tải hồ sơ. Vui lòng thử lại.</div>;
    }

    return (
        <>
            <div className='profile-container'>
                <h1 className='profile-title'>Hồ sơ bệnh nhân</h1>

                {/* Thông tin cá nhân */}
                <div className='profile-section'>
                    <div className='section-header'>
                        <h2 className='section-title'>Thông tin cá nhân</h2>
                        <button
                            className='edit-profile-btn'
                            onClick={() => setShowEditModal(true)}
                        >
                            Chỉnh sửa hồ sơ
                        </button>
                    </div>
                    <div className='info-column'>
                        <p><strong>Email:</strong> {profile.email || 'Chưa cập nhật'}</p>
                        <p><strong>Họ:</strong> {profile.lastName || 'Chưa cập nhật'}</p>
                        <p><strong>Tên:</strong> {profile.firstName || 'Chưa cập nhật'}</p>
                        <p><strong>Giới tính:</strong> {profile.genderData?.valueVi || 'Chưa cập nhật'}</p>
                    </div>
                    <div className='info-column'>
                        <p><strong>Vai trò:</strong> {profile.roleData?.valueVi || 'Bệnh nhân'}</p>
                        <p><strong>Địa chỉ:</strong> {profile.address || 'Chưa cập nhật'}</p>
                        <p><strong>Số điện thoại:</strong> {profile.phonenumber || 'Chưa cập nhật'}</p>
                    </div>
                </div>

                {/* Lịch sử đặt khám */}
                <div className='profile-section'>
                    <div className='section-header'>
                        <h2 className='section-title'>Lịch Sử Đặt Khám</h2>
                    </div>
                    {profile.patientData ? (
                        <div className='booking-list'>
                            <div className='booking-card' key={profile.patientData.id || 'no-id'}>
                                <div className='booking-header'>
                                    <h3 className='booking-id'>Mã đặt khám: {profile.patientData.id || 'N/A'}</h3>
                                    <span className={`booking-status status-${profile.patientData.statusId || 'unknown'}`}>
                                        {statuses[profile.patientData.statusId] || 'Không xác định'}
                                    </span>
                                </div>
                                <div className='booking-details'>
                                    <p><strong>Bác sĩ:</strong> {profile.patientData.doctorData?.firstName || 'Chưa cập nhật'} {profile.patientData.doctorData?.lastName || ''}</p>
                                    <p><strong>Phòng khám:</strong> {profile.patientData.doctorData?.Doctor_Infor?.nameClinic || 'Chưa cập nhật'}</p>
                                    <p><strong>Địa chỉ:</strong> {profile.patientData.doctorData?.Doctor_Infor?.addressClinic || 'Chưa cập nhật'}</p>
                                    <p><strong>Ngày khám:</strong> {profile.patientData.date ? new Date(Number(profile.patientData.date)).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}</p>
                                    <p><strong>Thời gian:</strong> {profile.patientData.timeTypeDataPatient?.valueVi || 'Chưa cập nhật'}</p>
                                </div>
                                {profile.patientData.statusId === 'S1' && profile.patientData.id && (
                                    <CancelButton
                                        accessToken={account.accessToken}
                                        bookingId={profile.patientData.id}
                                        onCancelSuccess={fetchProfile}
                                    />
                                )}
                            </div>
                        </div>
                    ) : (
                        <p className='no-data'>Chưa có lịch sử đặt khám</p>
                    )}
                </div>
                <EditProfileModal
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}
                    profile={profile}
                    accessToken={account.accessToken}
                    onUpdateSuccess={fetchProfile}
                />
            </div>
        </>
    );
};

export default Profile;