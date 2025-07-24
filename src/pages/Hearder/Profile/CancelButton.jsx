import { cancelAppointment } from "../../../services/userService";
import { useState } from 'react';
import { toast } from 'react-toastify';
import './CancelButton.scss';
import { Modal, Button } from 'react-bootstrap';

const CancelButton = ({ accessToken, bookingId, onCancelSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleCancel = async () => {
        try {
            setLoading(true);
            toast.info('Đang xử lý hủy lịch hẹn...');
            const response = await cancelAppointment(accessToken, bookingId);
            toast.dismiss();

            if (response.errCode === 0) {
                toast.success('Hủy lịch hẹn thành công!');
                onCancelSuccess(); // Gọi callback để cập nhật giao diện
                setShowModal(false);
            } else {
                toast.error(response.errMessage || 'Không thể hủy lịch hẹn');
            }
        } catch (err) {
            console.error('Lỗi khi hủy lịch hẹn:', err);
            toast.dismiss();
            toast.error('Lỗi khi hủy lịch hẹn. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                className="cancel-button"
                onClick={handleShowModal}
                disabled={loading}
            >
                {loading ? 'Đang hủy...' : 'Hủy lịch hẹn'}
            </button>

            <Modal
                show={showModal}
                onHide={handleCloseModal}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận hủy lịch hẹn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn hủy lịch hẹn này không? Hành động này không thể hoàn tác.
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleCloseModal}
                        disabled={loading}
                    >
                        Hủy
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleCancel}
                        disabled={loading}
                    >
                        {loading ? 'Đang xử lý...' : 'Đồng ý'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CancelButton;