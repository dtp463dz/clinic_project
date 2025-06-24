import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import CommonUtils from '../../../../utils/commonUtils';

const ConFirmModal = (props) => {

    const { show, setShow, dataModal, sendConfirm } = props;
    const [previewImage, setPreviewImage] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");

    const handleClose = () => {
        setShow(false)
    }
    console.log('check dataModal: ', dataModal)

    useEffect(() => {
        setEmail(dataModal.email)
    }, [dataModal.email])

    const handleSendConfirm = () => {
        sendConfirm({
            email: email,
            image: image,
        })
    }

    // upload hinh anh
    const handleUploadImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            // convert file to base64
            let base64 = await CommonUtils.getBase64(file);
            // hien thi anh dung url.createObjectUrl se chuyen sang blob
            setPreviewImage(URL.createObjectURL(file));
            setImage(base64)
        }
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size='xl' // tăng kích thước
            backdrop="static" // k cho modal tự động thoát ra ngoài 
            className='modal-add-user'
        >
            <Modal.Header closeButton>
                <Modal.Title>Gửi hóa đơn khám bệnh thành công</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row'>
                    <div className='col-6 form-group'>
                        <div className=''>
                            <label className="form-label">Email bệnh nhân</label>
                            <input
                                className='form-control'
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className='col-12 form-group my-2'>
                    <div>
                        <label className="form-label label-upload" htmlFor='labelUpload'>
                            <FcPlus />Chọn hóa đơn
                        </label>
                        <input
                            type="file"
                            id='labelUpload' hidden
                            onChange={(event) => handleUploadImage(event)}
                        />
                    </div>

                </div>
                {/* preview hình ảnh xem trước */}
                <div className='col-md-12 img-preview'>
                    {previewImage ?
                        <img src={previewImage} />
                        :
                        <span>Preview Image</span>
                    }
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={() => handleSendConfirm()}>
                    Lưu
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConFirmModal;