import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../../services/apiService';
import _ from 'lodash'; // sử dụng lodash để check obj có rỗng hay ko

const ModalViewUser = (props) => {
    const { show, setShow, dataView } = props;

    const handleClose = () => {
        setShow(false) // props.setShow
        // khi tắt, tất cả sẽ về giá trị rỗng
        setEmail("");
        setPassword("");
        // setUsername("");
        setFirstName("");
        setLastName("");
        setRoleId("");  // về lại mặc định
        setImage("");
        setPreviewImage("");
    };
    // state hóa modal
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [roleId, setRoleId] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    // chạy khi và chỉ khi data update thay đổi
    // hiển thị thông tin ban đầu 
    useEffect(() => {
        console.log("run useEffect: ", dataView) // hiển thị thông tin user khi view
        //  nếu ko rỗng
        if (!_.isEmpty(dataView)) {
            // update state vào modal  
            setEmail(dataView.email);
            setFirstName(dataView.firstName);
            setLastName(dataView.lastName);
            setRoleId(dataView.roleId);
            setImage("");
            // điều kiện nếu data có ảnh
            if (dataView.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataView.image}`); // image được hiển thị dạng base64
            }
        }
    }, [dataView]); // gọi tới useEffect khi data view

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size='xl' // tăng kích thước
                backdrop="static" // k cho modal tự động thoát ra ngoài 
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select
                                className="form-select"
                                value={roleId}
                                onChange={(event) => setRoleId(event.target.value)}
                            >
                                <option value="DOCTOR">DOCTOR</option>
                                <option value="ADMIN">ADMIN</option>
                                <option value="PATIENT">PATIENT</option>
                            </select>
                        </div>

                        <div className='col-md-12'>
                            <label className="form-label label-upload" htmlFor='labelUpload'>
                                <FcPlus />Upload File Image
                            </label>
                            <input
                                type="file"
                                id='labelUpload' hidden
                                onChange={(event) => handleUploadImage(event)}
                            />
                        </div>

                        {/* preview hình ảnh xem trước */}
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>Preview Image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalViewUser;



