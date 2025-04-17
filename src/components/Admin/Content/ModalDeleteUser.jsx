import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash'; // sử dụng lodash để check obj có rỗng hay ko
import { deleteUser } from '../../../services/apiService';
import { toast } from 'react-toastify';


const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete, fetchListUsers } = props;

    const handleClose = () => {
        setShow(false) // props.setShow
    };

    const handleSubmitDeleteUser = async () => {
        let data = await deleteUser(dataDelete.id);
        console.log("check data delete", data);

        if (data && data.errCode === 0) {
            toast.success(data.errMessage);
            // đóng modal
            handleClose();
            // cập nhật lại list user
            await fetchListUsers();
        }
        if (data && data.errCode !== 0) {
            toast.error(data.errMessage)
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
                    <b> {dataDelete && dataDelete.email ? dataDelete.email : "Không tìm thấy email"}</b>
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

export default ModalDeleteUser;



