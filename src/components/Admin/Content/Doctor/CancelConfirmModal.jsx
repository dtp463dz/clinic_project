// Trong file CancelConfirmModal.jsx
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const CancelConfirmModal = ({ show, setShow, dataModal, handleCancelConfirm }) => {
    const handleClose = () => setShow(false);

    const handleConfirmCancel = async () => {
        try {
            await handleCancelConfirm(dataModal);
            setShow(false);
            toast.success('Hủy lịch hẹn thành công');
        } catch (error) {
            toast.error('Hủy lịch hẹn thất bại');
            console.log('Lỗi hủy lịch hẹn:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận hủy lịch hẹn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Bạn có chắc chắn muốn hủy lịch hẹn cho bệnh nhân <strong>{dataModal.patientName}</strong>?</p>
                <p><strong>Thời gian:</strong> {dataModal.timeType || 'N/A'}</p>
                <p><strong>Ngày khám:</strong> {dataModal.bookingDate || 'N/A'}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="danger" onClick={handleConfirmCancel}>
                    Hủy lịch
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CancelConfirmModal;