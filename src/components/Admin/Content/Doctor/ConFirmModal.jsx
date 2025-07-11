import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import CommonUtils from '../../../../utils/commonUtils';
import { getPatientPdf } from '../../../../services/pdfService';
import FullScreenSpinner from '../../../common/FullScreenSpinner';

const ConFirmModal = (props) => {

    const { show, setShow, dataModal, sendConfirm, isSending } = props;
    const [previewImage, setPreviewImage] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [pdfFile, setPdfFile] = useState("");

    const handleClose = () => {
        setShow(false)
        reSetForm();
    }
    useEffect(() => {
        setEmail(dataModal.email || '')
    }, [dataModal.email])

    const reSetForm = () => {
        setImage("");
        setPdfFile("");
        setPreviewImage("");
    }

    const handleSendConfirm = async () => {
        try {
            let finalPdfBase64 = pdfFile;

            // Nếu người dùng không upload file PDF, thì gọi BE để lấy PDF
            if (!image && !pdfFile) {
                const response = await getPatientPdf(dataModal.bookingId);
                if (response.status !== 200 || !response.data) {
                    throw new Error('Không thể tải file PDF từ hệ thống');
                }
                const pdfBlob = response.data;
                finalPdfBase64 = await CommonUtils.getBase64(pdfBlob);
            }
            sendConfirm({
                email: email,
                image: image || null,
                pdfBase64: finalPdfBase64 || null
            })
            // reset
            handleClose();
        } catch (error) {
            console.error('Lỗi khi gửi xác nhận kèm PDF: ', error);
        }

    }

    // upload hinh anh
    const handleUploadFile = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const fileType = file.type;

        // reset trước
        reSetForm();
        if (fileType.startsWith("image/")) {
            // convert file to base64
            let base64 = await CommonUtils.getBase64(file);
            // hien thi anh dung url.createObjectUrl se chuyen sang blob
            setPreviewImage(URL.createObjectURL(file));
            setImage(base64)
            setPdfFile("");
        } else if (fileType === "application/pdf") {
            const base64 = await CommonUtils.getBase64(file);
            setPreviewImage(URL.createObjectURL(file));
            setPdfFile(base64);
            setImage("");
        } else {
            alert('Chỉ hỗ trợ file ảnh hoặc PDF');
        }

    }

    return (
        <>
            {isSending && <FullScreenSpinner message="Đang gửi email..." />}
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
                    <div className='col-6 form-group  my-2'>
                        <label className="form-label label-upload" htmlFor='labelUpload'>
                            <FcPlus />Chọn hóa đơn (ảnh hoặc PDF)
                        </label>
                        <input
                            type="file"
                            id='labelUpload'
                            hidden
                            onChange={handleUploadFile}
                        />
                    </div>
                    {/* preview hình ảnh xem trước */}
                    <div className='col-12 my-3' style={{ maxHeight: '400px', overflow: 'auto' }}>
                        {previewImage ? (
                            pdfFile ? (
                                <embed
                                    src={previewImage}
                                    type="application/pdf"
                                    width="100%"
                                    height="400px"
                                    style={{ border: '1px solid #ccc', borderRadius: '8px' }}
                                />
                            ) : (
                                <img src={previewImage} alt="preview" style={{ maxWidth: '100%' }} />
                            )
                        ) : (
                            <span>Chưa có nội dung</span>
                        )}
                    </div>
                    {previewImage && (
                        <div className="text-end">
                            <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => {
                                    setPreviewImage("");
                                    setImage("");
                                    setPdfFile("");
                                }}
                            >
                                Xóa file
                            </button>
                        </div>
                    )}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSendConfirm}
                        disabled={isSending}
                    >
                        {isSending ? 'Đang gửi...' : 'Lưu'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ConFirmModal;