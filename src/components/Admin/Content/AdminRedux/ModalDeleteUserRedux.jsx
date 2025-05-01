import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash'; // sử dụng lodash để check obj có rỗng hay ko
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { deleteNewUser, fetchAllUsersStart } from '../../../../redux/action/adminAction';


const ModalDeleteUserRedux = (props) => {
    const { show, setShow, userDelete } = props;
    const dispatch = useDispatch();

    const handleClose = () => {
        setShow(false)
    };
    const handleSubmitDeleteUser = async () => {
        if (userDelete && userDelete.id) {
            await dispatch(deleteNewUser(userDelete.id));
            dispatch(fetchAllUsersStart()); // Refresh user list
            handleClose();
        } else {
            toast.error("User data not found!");
        }
    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size='xl' // tăng kích thước
                backdrop="static" // k cho modal tự động thoát ra ngoài 
            >
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn xóa người dùng với email =
                    <b> {userDelete && userDelete.email ? userDelete.email : "Không tìm thấy email"}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => { handleSubmitDeleteUser() }}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteUserRedux;



