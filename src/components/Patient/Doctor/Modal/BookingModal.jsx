import './BookingModal.scss'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';

const BookingModal = (props) => {
    const { show, setShow, dataTime } = props;
    const handleClose = () => {
        setShow(false);
    }

    let doctorId = '';
    if (dataTime && !_.isEmpty(dataTime)) {
        doctorId = dataTime.doctorId
    }
    // let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
    console.log("check dataTime: ", dataTime);
    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                size='xl' // tăng kích thước
                backdrop="static" // k cho modal tự động thoát ra ngoài 
                className='modal-add-user'
            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header' >
                        <Modal.Header closeButton>
                            <span className='title-modal'>Thông tin đặt lịch khám bệnh</span>
                        </Modal.Header>
                    </div>
                    <div className='booking-modal-body mx-3'>
                        {/* {JSON.stringify(dataTime)} */}
                        <div className='doctor-infor'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={true} // open description
                                dataTime={dataTime}
                            />
                        </div>

                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Họ tên</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Số điện thoại</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ Email</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ liên hệ</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-12 form-group'>
                                <label>Lý do khám</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Đặt cho ai</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Giới tính</label>
                                <input className='form-control' />
                            </div>

                        </div>
                    </div>
                    <div className='booking-modal-footer'>

                    </div>
                </div>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" >
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default BookingModal;