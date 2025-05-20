import { useDispatch, useSelector } from 'react-redux';
import './ManageDoctorSchedule.scss'
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { fetchAllDoctor, fetchAllScheduleTime } from '../../../../redux/action/adminAction';
import CustomDatePicker from '../../../Input/CustomDatePicker';

const ManageDoctorSchedule = () => {
    const dispatch = useDispatch();
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [listDoctors, setListDoctors] = useState([]);
    const allDoctors = useSelector((state) => state.admin.allDoctors)
    const allScheduleTime = useSelector((state) => state.admin.allScheduleTime)
    const [rangeTime, setRangeTime] = useState([]); // khoang thoi gian
    // lay ds bac si
    useEffect(() => {
        dispatch(fetchAllDoctor());
        dispatch(fetchAllScheduleTime())
        console.log('check props allScheduleTime: ', allScheduleTime)
    }, [dispatch])

    useEffect(() => {
        if (allDoctors && allDoctors.length > 0) {
            let dataSelect = buildDataInputSelect(allDoctors);
            setListDoctors(dataSelect)
        }
        if (allScheduleTime && allScheduleTime.length > 0) {
            setRangeTime(allScheduleTime)
        }
        console.log('check props time: ', rangeTime)

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
    const handleOnChangeDatePicker = (value) => {
        console.log('check onChange datePicker: ', value)
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
                                <button className='btn btn-schedule' key={index}>{item.valueVi}</button>
                            )
                        })
                    }

                </div>
                <div className='col-12 my-2'>
                    <button className='btn btn-primary'>Lưu thông tin</button>

                </div>
            </div>

        </div>
    )
}

export default ManageDoctorSchedule;