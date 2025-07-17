import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getPatientPdf } from '../../../../services/pdfService';

const PrintInvoiceModal = (props) => {
    const { show, setShow, dataModal, onConfirm } = props;
    const handleConfirmPrint = async () => {
        try {
            // console.log('Đang tải PDF cho bookingId:', dataModal.bookingId); // Debug bookingId
            if (!dataModal.bookingId) {
                throw new Error('bookingId không hợp lệ');
            }

            const response = await getPatientPdf(dataModal.bookingId);

            // Kiểm tra trạng thái HTTP
            if (response.status !== 200) {
                throw new Error(`Lỗi server khi tải PDF, status: ${response.status}`);
            }

            const blob = response.data;
            if (!blob) {
                throw new Error('Dữ liệu blob không tồn tại');
            }
            // Kiểm tra kích thước blob
            if (blob.size < 1000) {
                const text = await blob.text();
                console.log('Nội dung blob (JSON lỗi?):', text);
                throw new Error('Dữ liệu PDF quá nhỏ, có thể bị hỏng');
            }

            const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Hoa_Don_${dataModal.bookingId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            toast.success('Tải hóa đơn thành công!');
            setShow(false);
            if (onConfirm) onConfirm();
        } catch (error) {
            if (error.response && error.response.data) {
                try {
                    const text = await error.response.data.text();
                    const jsonError = JSON.parse(text);
                    toast.error(`Lỗi khi tải hóa đơn: ${jsonError.error || jsonError.errmsg || 'Không xác định'}`);
                } catch (e) {
                    console.log(e)
                    toast.error('Lỗi khi tải hóa đơn: Dữ liệu phản hồi không hợp lệ');
                }
            } else {
                toast.error(`Lỗi khi tải hóa đơn: ${error.message || 'Không xác định'}`);
            }
            console.error('Lỗi khi tải PDF:', error);
        }
    }
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận in hóa đơn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Bạn có muốn in hóa đơn cho bệnh nhân <strong>{dataModal.patientName}</strong> không?</p>
                <p>Mã lịch khám: <strong>{dataModal.bookingId}</strong></p>
                <p>Bác sĩ phụ trách: <strong>{dataModal.doctorName}</strong></p>
                <p>Thời gian đặt: <strong>{dataModal.timeType}</strong></p>
                <p>Ngày khám: <strong>{dataModal.bookingDate}</strong></p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={handleConfirmPrint}>
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PrintInvoiceModal