import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../../services/apiService';
import _ from 'lodash'; // sử dụng lodash để check obj có rỗng hay ko

const ModalUpdateUser = (props) => {
    const { show, setShow, dataUpdate, resetUpdateData } = props;

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
        resetUpdateData();
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
    // hiển thị thông tin ban đầu trước khi update
    useEffect(() => {
        console.log("run useEffect: ", dataUpdate) // hiển thị thông tin user trước khi update
        //  nếu ko rỗng
        if (!_.isEmpty(dataUpdate)) {
            // update state vào modal  
            setEmail(dataUpdate.email);
            setFirstName(dataUpdate.firstName);
            setLastName(dataUpdate.lastName);
            setRoleId(dataUpdate.roleId);
            setImage("");
            // điều kiện nếu data có ảnh
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`); // image được hiển thị dạng base64
            }
        }
    }, [props.dataUpdate]); // gọi tới useEffect khi d

    // up load hình ảnh
    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            // hien thi anh đúng URL.createObjectURL sẽ chuyển sang blob
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])
        } else {
            // setPreviewImage("")
        }
    }
    // validate email
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }
    // submit tao user moi
    const handleSubmitUpdateUser = async () => {
        // validate email
        const isValidateEmail = validateEmail(email);
        if (!isValidateEmail) {
            toast.error("Email không hợp lệ");
            return;
        }

        try {
            // call api
            let data = await putUpdateUser(dataUpdate.id, firstName, lastName, roleId, image);
            console.log('check update user: ', data);

            // xử lý thành công (tùy bạn muốn làm gì)
            if (data && data.errCode === 0) {
                toast.success("Cập nhật người dùng thành công!");
                // có thể gọi reset form hoặc đóng modal tại đây
                handleClose();
                await props.fetchListUsers(); // khi modal đóng thì gọi lại API và cập nhật listUser 
            } else {
                toast.error(data?.message || "Có lỗi xảy ra khi cập nhật người dùng.");
            }

        } catch (error) {
            console.error("Lỗi gọi API:", error);
            toast.error("Không thể cập nhật người dùng. Vui lòng thử lại.");
        }
    };

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
                    <Modal.Title>Cập nhật người dùng</Modal.Title>
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
                    <Button variant="primary" onClick={() => handleSubmitUpdateUser()}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUpdateUser;



