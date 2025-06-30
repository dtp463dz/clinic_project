// ModalDelete.jsx
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDelete = ({ show, onClose, onConfirm, item, type }) => {
    const getItemName = () => {
        if (type === 'Clinic') return item?.name || 'Không tìm thấy tên phòng khám';
        if (type === 'Specialty') return item?.name || 'Không tìm thấy tên chuyên khoa';
        return 'Không xác định';
    };

    return (
        <Modal
            show={show}
            onHide={onClose}
            size="lg"
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận xóa {type === 'Clinic' ? 'phòng khám' : 'chuyên khoa'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bạn có chắc chắn muốn xóa {type === 'Clinic' ? 'phòng khám' : 'chuyên khoa'} với tên là{' '}
                <b>{getItemName()}</b>?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={onConfirm}>
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalDelete;