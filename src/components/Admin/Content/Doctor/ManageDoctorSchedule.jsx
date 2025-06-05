import { useDispatch, useSelector } from 'react-redux';
import './ManageDoctorSchedule.scss';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { fetchAllDoctor, fetchAllScheduleTime } from '../../../../redux/action/adminAction';
import CustomDatePicker from '../../../Input/CustomDatePicker';
import { format } from 'date-fns'; // format lai ngay
import { toast } from 'react-toastify';
import _ from 'lodash'; // sử dụng lodash để check obj có rỗng hay ko
import { saveBulkScheduleDoctor } from '../../../../services/userService';
import dayjs from 'dayjs'; // su dung de set thoi gian ve 00:00:00

const ManageDoctorSchedule = () => {
    const dispatch = useDispatch();
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [listDoctors, setListDoctors] = useState([]);
    const [rangeTime, setRangeTime] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isSaving, setIsSaving] = useState(false); // Trạng thái lưu

    const allDoctors = useSelector((state) => state.admin.allDoctors);
    const allScheduleTime = useSelector((state) => state.admin.allScheduleTime);

    // Lấy danh sách bác sĩ và khung giờ
    useEffect(() => {
        dispatch(fetchAllDoctor());
        dispatch(fetchAllScheduleTime());
    }, [dispatch]);

    useEffect(() => {
        if (allDoctors && allDoctors.length > 0) {
            setListDoctors(buildDataInputSelect(allDoctors));
        }
        if (allScheduleTime && allScheduleTime.length > 0) {
            const data = allScheduleTime.map(item => ({ ...item, isSelected: false }));
            setRangeTime(data);
        }
    }, [allDoctors, allScheduleTime]);

    const handleChangeSelect = (selectedOption) => {
        setSelectedDoctor(selectedOption);
    };

    const buildDataInputSelect = (inputData) => {
        return inputData.map(item => ({
            label: `${item.firstName} ${item.lastName}`,
            value: item.id
        }));
    };

    const handleOnChangeDatePicker = (date) => {
        setCurrentDate(date);
        console.log('Selected date:', format(date, 'dd/MM/yyyy'), date.getTime());
    };

    const handleClickBtnTime = (time) => {
        setRangeTime(prev =>
            prev.map(item =>
                item.id === time.id ? { ...item, isSelected: !item.isSelected } : item
            )
        );
    };

    // reset form
    const reSetForm = () => {
        setSelectedDoctor("");
        setIsSaving(false);
        // reset lại khung giờ
        setRangeTime(preRangTime =>
            preRangTime.map(item => ({
                ...item,
                isSelected: false,
            }))
        )
    }

    const handleSaveSchedule = async () => {
        if (isSaving) return;
        setIsSaving(true);

        try {
            // Validate
            if (!selectedDoctor || _.isEmpty(selectedDoctor)) {
                toast.error('Vui lòng chọn bác sĩ!');
                return;
            }
            if (!currentDate || isNaN(currentDate.getTime())) {
                toast.error('Ngày không hợp lệ!');
                return;
            }
            if (!rangeTime || rangeTime.every(item => !item.isSelected)) {
                toast.error('Vui lòng chọn ít nhất một khung giờ!');
                return;
            }

            const formattedDate = dayjs(currentDate).startOf('day').valueOf(); // chuan hoa về đầu ngày 00:00:000
            const selectedTime = rangeTime.filter(item => item.isSelected);
            const arrSchedule = selectedTime.map(schedule => ({
                doctorId: selectedDoctor.value,
                date: formattedDate,
                timeType: schedule.keyMap
            }));

            console.log('Data sent to API:', { arrSchedule, doctorId: selectedDoctor.value, formattedDate });

            const res = await saveBulkScheduleDoctor({
                arrSchedule,
                doctorId: selectedDoctor.value,
                formattedDate
            });

            if (res.errCode === 0) {
                toast.success(`Lưu ${res.createdCount || arrSchedule.length} lịch khám thành công`);
            } else {
                toast.error(res.errMessage || 'Lỗi khi lưu lịch khám');
            }
        } catch (error) {
            toast.error('Lỗi khi gửi yêu cầu: ' + error.message);
        } finally {
            setIsSaving(false);
        }
        reSetForm();
    };

    return (
        <div className="manage-schedule-container">
            <div className="manage-schedule-title h4 px-4 py-2">
                Quản lý kế hoạch khám bệnh của bác sĩ
            </div>
            <div className="more-infor row">
                <div className="col-6 form-group">
                    <div className="title-label mb-2">Chọn Bác Sĩ</div>
                    <Select
                        options={listDoctors}
                        value={selectedDoctor}
                        onChange={handleChangeSelect}
                    />
                </div>
                <div className="col-6 form-group">
                    <div className="title-label mb-2">Chọn Ngày</div>
                    <CustomDatePicker onChange={handleOnChangeDatePicker} />
                </div>
                <div className="col-12 pick-hour-container">
                    {rangeTime && rangeTime.map((item, index) => (
                        <button
                            className={item.isSelected ? 'btn btn-schedule active' : 'btn btn-schedule'}
                            key={index}
                            onClick={() => handleClickBtnTime(item)}
                        >
                            {item.valueVi}
                        </button>
                    ))}
                </div>
                <div className="col-12 my-2">
                    <button
                        className="btn btn-primary"
                        onClick={handleSaveSchedule}
                        disabled={isSaving}
                    >
                        {isSaving ? 'Đang lưu...' : 'Lưu thông tin'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManageDoctorSchedule;