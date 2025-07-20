import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDelete = ({ show, onClose, onConfirm, item, type, deleteLoading }) => {
    const getItemName = () => {
        if (type === 'Clinic') return item?.name || 'Không tìm thấy tên phòng khám';
        if (type === 'Specialty') return item?.name || 'Không tìm thấy tên chuyên khoa';
        if (type === 'HandBook') return item?.name || item?.title || 'Không tìm thấy tiêu đề cẩm nang';
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
                <Modal.Title>
                    Xác nhận xóa {type === 'Clinic' ? 'phòng khám' : type === 'Specialty' ? 'chuyên khoa' : 'cẩm nang'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bạn có chắc chắn muốn xóa {type === 'Clinic' ? 'phòng khám' : type === 'Specialty' ? 'chuyên khoa' : 'cẩm nang'} với tên là{' '}
                <b>{getItemName()}</b>?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={onConfirm} disabled={deleteLoading}>
                    {deleteLoading ? 'Đang xóa...' : 'Xác nhận'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalDelete;