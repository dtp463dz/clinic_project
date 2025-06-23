import './BookingModal.scss'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import DatePickerModal from '../../../Input/DatePickerModal';
import { format } from 'date-fns'; // format lai ngay
import { fetchGenderStart } from "../../../../redux/action/adminAction";
import { useDispatch, useSelector } from 'react-redux';
import { postPatientBookAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
dayjs.locale('vi');

const BookingModal = (props) => {
    const { show, setShow, dataTime } = props;
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        address: '',
        reason: '',
        birthday: '',
        selectedGender: '',
        doctorId: '',
        genders: '',
        timeType: ''
    })
    // dong modal
    const handleClose = () => {
        setShow(false);
        resetForm()
    }

    const resetForm = () => {
        setFormData({
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: dataTime?.doctorId || '',
            genders: '',
            timeType: dataTime?.timeType || ''
        });
    };

    useEffect(() => {
        if (dataTime && !_.isEmpty(dataTime)) {
            console.log("check dataTime: ", dataTime);
            let doctorId = dataTime.doctorId;
            let timeType = dataTime.timeType;
            setFormData(prevState => ({
                ...prevState,
                doctorId: doctorId,
                timeType: timeType,
            }))
        }
    }, [dataTime])
    // thay doi input
    const handleOnChangeInput = (event, id) => {
        const valueInput = event.target.value;
        setFormData(prevState => ({
            ...prevState,
            [id]: valueInput
        }));
    }
    // thay doi date 
    const handleOnChangeDatePicker = (date) => {
        setFormData(prevState => ({
            ...prevState,
            birthday: date
        }));
        console.log('Selected date:', format(date, 'dd/MM/yyyy'), date.getTime());
    };
    // thay doi select
    const handleChangeSelect = (event, id) => {
        const valueInput = event.target.value;
        setFormData(prevState => ({
            ...prevState,
            [id]: valueInput
        }));
        console.log(valueInput);
    }
    // lay fetchGenderStart từ redux
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchGenderStart());

    }, [dispatch])
    const genderArr = useSelector((state) => state.admin.genders)
    // render time
    const buildTimeBooking = (dataTime) => {
        // console.log('check dataTime inside time booking: ', dataTime)
        if (dataTime && !_.isEmpty(dataTime)) {
            const date = dayjs(Number(dataTime.date)).locale('vi').format('dddd - DD/MM/YYYY');
            const capitalizedDate = date.charAt(0).toUpperCase() + date.slice(1); // viết hoa chữ cái đầu 
            const time = dataTime?.timeTypeData?.valueVi;
            return `${time}, ${capitalizedDate}`
        }
        return <></>
    }
    // render name doctor
    const buildDoctorName = (dataTime) => {
        // console.log('check dataTime inside time booking: ', dataTime)
        if (dataTime && !_.isEmpty(dataTime)) {
            let nameDoctor = `${dataTime?.doctorData?.firstName} ${dataTime?.doctorData?.lastName}`;
            return `${nameDoctor}`
        }
        return <></>
    }
    // xác nhận đặt lịch
    const handleConfirmBooking = async () => {
        console.log('Thông tin đặt lịch:', {
            Họ_tên: formData.fullName,
            SĐT: formData.phoneNumber,
            Email: formData.email,
            Địa_chỉ: formData.address,
            Lý_do_khám: formData.reason,
            Ngày_sinh: formData.birthday
                ? format(formData.birthday, 'dd/MM/yyyy')
                : '',
            Giới_tính: formData.selectedGender,
            Mã_bác_sĩ: formData.doctorId
        });
        let date = new Date(formData.birthday).getTime()
        let timeString = buildTimeBooking(dataTime);
        let doctorName = buildDoctorName(dataTime);

        // validate input
        let res = await postPatientBookAppointment({
            fullName: formData.fullName,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            address: formData.address,
            reason: formData.reason,
            date: dataTime.date,     // ngay dat lich
            birthday: date, // ngay sinh benh nhan
            selectedGender: formData.selectedGender,
            doctorId: formData.doctorId,
            timeType: formData.timeType,
            timeString: timeString, // thời gian đặt lịch   
            doctorName: doctorName, // tên bác sĩ
        })
        if (res && res.errCode === 0) {
            toast.success('Đặt lịch khám thành công')
            setShow(false);
            resetForm()
        } else {
            toast.error('Đặt lịch khám thất bại')
        }
    }

    // console.log('check dataTime: ', dataTime)
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
                                doctorId={formData.doctorId}
                                isShowDescriptionDoctor={true} // open description
                                dataTime={dataTime}
                                isShowLinkDetail={false}
                                isShowPrice={true}
                            />
                        </div>

                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Họ tên</label>
                                <input className='form-control'
                                    value={formData.fullName}
                                    onChange={(event) => handleOnChangeInput(event, 'fullName')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Số điện thoại</label>
                                <input className='form-control'
                                    value={formData.phoneNumber}
                                    onChange={(event) => handleOnChangeInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ Email</label>
                                <input className='form-control'
                                    value={formData.email}
                                    onChange={(event) => handleOnChangeInput(event, 'email')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ liên hệ</label>
                                <input className='form-control'
                                    value={formData.address}
                                    onChange={(event) => handleOnChangeInput(event, 'address')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label>Lý do khám</label>
                                <input className='form-control'
                                    value={formData.reason}
                                    onChange={(event) => handleOnChangeInput(event, 'reason')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Ngày sinh</label>
                                <DatePickerModal
                                    onChange={handleOnChangeDatePicker}
                                    selected={formData.birthday}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Giới tính</label>
                                <select
                                    className="form-control"
                                    onChange={(event) => handleChangeSelect(event, 'selectedGender')}
                                    value={formData.selectedGender}
                                >
                                    <option value="">-- Chọn giới tính --</option>
                                    {genderArr && genderArr.length > 0 ? (
                                        genderArr.map((item, index) => (
                                            <option key={index} value={item.keyMap}>
                                                {item.valueVi}
                                            </option>
                                        ))
                                    ) : (
                                        <option>No genders available</option>
                                    )}
                                </select>
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
                    <Button variant="primary" onClick={handleConfirmBooking}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default BookingModal;