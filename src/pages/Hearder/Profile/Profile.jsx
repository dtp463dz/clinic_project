import './Profile.scss';
import { getUserProfile, getAllCodeService } from '../../../services/apiService';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CancelButton from './CancelButton';
import EditProfileModal from './EditProfileModal';

const Profile = () => {
    const { account, isAuthenticated, accessToken } = useSelector((state) => state.user);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [statuses, setStatuses] = useState({}); // lưu trạng thái 
    const [showEditModal, setShowEditModal] = useState(false);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            toast.info('Đang tải hồ sơ ... ');
            const statusResponse = await getAllCodeService('STATUS');
            if (statusResponse.errCode === 0) {
                const statusMap = {};
                statusResponse.data.forEach(status => {
                    statusMap[status.keyMap] = status.valueVi;
                });
                setStatuses(statusMap);
            }
            const response = await getUserProfile(account.accessToken);
            toast.dismiss();
            if (response.errCode === 0) {
                setProfile(response.data);
                toast.success('Tải hồ sơ thành công!')
            } else {
                toast.error(response.errMessage || 'Không thể tải hồ sơ')
            }
        } catch (err) {
            console.log('Lỗi fetchProfile: ', err)
            toast.dismiss();
            toast.error('Lỗi khi tải thông tin hồ sơ. Vui lòng thử lại sau,')
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isAuthenticated || !account) {
            toast.error('Vui lòng đăng nhập để xem hồ sơ');
            return;
        }
        fetchProfile();
    }, [isAuthenticated, accessToken, account]);

    if (!isAuthenticated || loading || !profile) {
        return null; // Toast sẽ hiển thị trạng thái tải hoặc lỗi
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
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Họ:</strong> {profile.lastName}</p>
                        <p><strong>Tên:</strong> {profile.firstName}</p>
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
                    <h2 className='section-title'>Lịch Sử Đặt Khám</h2>

                    {profile.patientData ? (
                        <div className='booking-list'>
                            <div className='booking-card' key={profile.patientData.id}>
                                <div className='booking-header'>
                                    <h3 className='booking-id'>Mã đặt khám: {profile.patientData.id}</h3>
                                    <span className={`booking-status status-${profile.patientData.statusId}`}>
                                        {statuses[profile.patientData.statusId] || 'Không xác định'}
                                    </span>
                                </div>
                                <div className='booking-details'>
                                    <p><strong>Bác sĩ:</strong> {profile.patientData.doctorData?.firstName} {profile.patientData.doctorData?.lastName}</p>
                                    <p><strong>Phòng khám:</strong> {profile.patientData.doctorData?.Doctor_Infor?.nameClinic || 'Chưa cập nhật'}</p>
                                    <p><strong>Địa chỉ:</strong> {profile.patientData.doctorData?.Doctor_Infor?.addressClinic || 'Chưa cập nhật'}</p>
                                    <p><strong>Ngày khám:</strong> {new Date(Number(profile.patientData.date)).toLocaleDateString('vi-VN')}</p>
                                    <p><strong>Thời gian:</strong> {profile.patientData.timeTypeDataPatient?.valueVi || 'Chưa cập nhật'}</p>
                                </div>
                                {profile.patientData.statusId === 'S1' && (
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

    )
}

export default Profile