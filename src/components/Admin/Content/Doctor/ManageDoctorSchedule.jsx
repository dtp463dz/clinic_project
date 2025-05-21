import { useDispatch, useSelector } from 'react-redux';
import './ManageDoctorSchedule.scss'
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { fetchAllDoctor, fetchAllScheduleTime } from '../../../../redux/action/adminAction';
import CustomDatePicker from '../../../Input/CustomDatePicker';
import { format } from 'date-fns'; // format lai ngay
import { toast } from 'react-toastify';
import _ from 'lodash'; // sử dụng lodash để check obj có rỗng hay ko

const ManageDoctorSchedule = () => {
    const dispatch = useDispatch();
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [listDoctors, setListDoctors] = useState([]);
    const allDoctors = useSelector((state) => state.admin.allDoctors)
    const allScheduleTime = useSelector((state) => state.admin.allScheduleTime)
    const [rangeTime, setRangeTime] = useState([]); // khoang thoi gian
    const [currentDate, setCurrentDate] = useState(new Date()); // thoi gian chon
    // lay ds bac si
    useEffect(() => {
        dispatch(fetchAllDoctor());
        dispatch(fetchAllScheduleTime())
    }, [dispatch])

    useEffect(() => {
        if (allDoctors && allDoctors.length > 0) {
            let dataSelect = buildDataInputSelect(allDoctors);
            setListDoctors(dataSelect)
        }
        if (allScheduleTime && allScheduleTime.length > 0) {
            let data = allScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false })) // tạo isSelected và đặt = false
            }
            setRangeTime(data)
        }

    }, [allDoctors, allScheduleTime])
    const handleChangeSelect = async (selectedOption) => {
        setSelectedDoctor(selectedOption)
    }
    // data input select
    const buildDataInputSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let label = `${item.firstName} ${item.lastName}`;
                object.label = label;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }
    // onChange datepicker
    const handleOnChangeDatePicker = (currentDate) => {
        setCurrentDate(currentDate);
        const formattedDate = format(currentDate, 'dd/MM/yyyy');
        console.log('check onChange datePicker: ', formattedDate);
    }

    // handle onClick btn time 
    const handleClickBtnTime = (time) => {
        if (rangeTime && rangeTime.length > 0) {
            const updateRangeTime = rangeTime.map(item => {
                if (item.id === time.id) {
                    return {
                        ...item,
                        isSelected: !item.isSelected
                    };
                }
                return item;
            })
            setRangeTime(updateRangeTime)
            console.log('check range time after: ', updateRangeTime)

        }
    }
    // handle luu thong tin
    const handleSaveSchedule = () => {
        let result = [];
        // validate
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Vui lòng chọn bác sĩ !');
            return;
        }
        if (!currentDate || !rangeTime) {
            toast.error('Vui lòng chọn ngày và ít nhất một khung giờ !');
            return;
        }
        const formattedDate = format(currentDate, 'dd/MM/yyyy'); // format date
        if (rangeTime && rangeTime.length > 0) { // loc isSelected === true
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule, index) => {
                    console.log('check schedule: ', schedule, index, selectedDoctor)
                    let object = {};
                    object.doctorId = selectedDoctor.value; // value: label
                    object.date = formattedDate;
                    object.time = schedule.keyMap;
                    result.push(object)
                })
            } else {
                toast.error('Vui lòng chọn ngày và ít nhất một khung giờ !');
                return;
            }
        }
        console.log('check state: ', selectedDoctor, formattedDate, rangeTime);
        console.log('check result: ', result);
        toast.success('Lưu thông tin khám thành công')
    }

    return (
        <div className="manage-schedule-container">
            <div className="manage-schedule-title h4 px-4 py-2">
                Quản lý kế hoạch khám bệnh của bác sĩ
            </div>
            <div className='more-infor row'>
                <div className='col-6 form-group'>
                    <div className='title-label mb-2'>Chọn Bác Sĩ</div>
                    <Select
                        options={listDoctors}
                        value={selectedDoctor}
                        onChange={handleChangeSelect}
                    />
                </div>
                <div className='col-6 form-group'>
                    <div className='title-label mb-2'>Chọn Ngày</div>
                    <CustomDatePicker
                        onChange={handleOnChangeDatePicker}
                    />
                </div>
                <div className='col-12 pick-hour-container'>
                    {rangeTime && rangeTime.length > 0 &&
                        rangeTime.map((item, index) => {
                            return (
                                <button
                                    className={item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule"}
                                    key={index}
                                    onClick={() => handleClickBtnTime(item)}
                                >
                                    {item.valueVi}
                                </button>
                            )
                        })
                    }

                </div>
                <div className='col-12 my-2'>
                    <button
                        className='btn btn-primary'
                        onClick={() => handleSaveSchedule()}
                    >Lưu thông tin</button>

                </div>
            </div>

        </div>
    )
}

export default ManageDoctorSchedule;