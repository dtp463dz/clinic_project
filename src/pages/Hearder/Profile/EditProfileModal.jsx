import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { putUpdatePatient, getAllCodeService } from '../../../services/apiService';

const EditProfileModal = ({ show, onHide, profile, accessToken, onUpdateSuccess }) => {
    const [formData, setFormData] = useState({
        id: profile?.id || '',
        firstName: profile?.firstName || '',
        lastName: profile?.lastName || '',
        address: profile?.address || '',
        phonenumber: profile?.phonenumber || '',
        gender: profile?.gender || '',
        roleId: profile?.roleId || 'R3', // Mặc định là bệnh nhân
        image: profile?.image || null
    });
    const [loading, setLoading] = useState(false);
    const [genders, setGenders] = useState([]);

    // Lấy danh sách giới tính
    useEffect(() => {
        const fetchGenders = async () => {
            try {
                const response = await getAllCodeService('GENDER');
                if (response.errCode === 0) {
                    setGenders(response.data);
                    if (!formData.gender && response.data.length > 0) {
                        setFormData(prev => ({ ...prev, gender: response.data[0].keyMap }));
                    }
                } else {
                    toast.error('Không thể tải danh sách giới tính');
                }
            } catch (err) {
                console.log('Lỗi fetchGenders: ', err);
                toast.error('Lỗi khi tải danh sách giới tính');
            }
        };
        fetchGenders();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            toast.info('Đang cập nhật hồ sơ...');
            const response = await putUpdatePatient(formData, accessToken);
            toast.dismiss();
            if (response.errCode === 0) {
                toast.success('Cập nhật hồ sơ thành công!');
                onUpdateSuccess();
                onHide();
            } else {
                toast.error(response.errMessage || 'Không thể cập nhật hồ sơ');
            }
        } catch (err) {
            console.log('Lỗi cập nhật hồ sơ: ', err);
            toast.dismiss();
            toast.error('Lỗi khi cập nhật hồ sơ. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa hồ sơ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Họ</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Nhập họ"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Tên</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="Nhập tên"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Nhập địa chỉ"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="text"
                            name="phonenumber"
                            value={formData.phonenumber}
                            onChange={handleInputChange}
                            placeholder="Nhập số điện thoại"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Giới tính</Form.Label>
                        <Form.Select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                        >
                            <option value="">Chọn giới tính</option>
                            {genders.map(gender => (
                                <option key={gender.keyMap} value={gender.keyMap}>
                                    {gender.valueVi}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide} disabled={loading}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditProfileModal;