import "./DoctorSchedule.scss";
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/vi'; // nạp locale tiếng Việt
import { getScheduleDoctorByDate } from "../../../services/userService";
import { FaCalendarAlt, FaRegHandPointUp } from "react-icons/fa";
const DoctorSchedule = (props) => {
    const [allDays, setAllDays] = useState([]);
    const [allAvalableTime, setAllAvalableTime] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null); // state mới để lưu ngày được chọn

    // xử lý in hoa chữ cái đầu mỗi từ
    function capitalizeEachWord(str) {
        return str
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    // Tạo danh sách 7 ngày bắt đầu từ hôm nay
    useEffect(() => {
        dayjs.locale('vi'); // thiết lập ngôn ngữ mặc định là tiếng Việt
        const tempDays = [];
        for (let i = 0; i < 7; i++) {
            const currentDate = dayjs().add(i, 'day');
            let label;
            if (i === 0) {
                // ngày mặc định là ngày Hôm nay
                label = `Hôm nay - ${currentDate.format('DD/MM')}`;
            } else {
                // xử lý viết hoa chữ cái đầu
                const dayLabel = currentDate.format('dddd');
                const formattedLabel = capitalizeEachWord(dayLabel);
                label = `${formattedLabel} - ${currentDate.format('DD/MM')}`;
            }
            tempDays.push({
                label: label,
                value: currentDate.startOf('day').valueOf()
            });
        }
        console.log("allDays: ", tempDays)
        setAllDays(tempDays);
        if (tempDays.length > 0) {
            setSelectedDate(tempDays[0].value); // Chọn ngày đầu tiên làm mặc định
        }
    }, [])

    // Gọi API để lấy lịch khám khi có doctorId và selectedDate
    useEffect(() => {
        const fetchSchedule = async () => {
            // lay doctorIdFromParent từ DetailDoctor
            if (props.doctorIdFromParent && props.doctorIdFromParent !== -1 && selectedDate) {
                try {
                    let doctorId = props.doctorIdFromParent
                    let res = await getScheduleDoctorByDate(doctorId, selectedDate);
                    if (res && res.errCode === 0) {
                        setAllAvalableTime(res.data ? res.data : []);
                    }
                    // console.log('check fetchSchedule: ', res);
                } catch (error) {
                    console.error('Failed to fetch schedule:', error);
                }
            }
        };
        fetchSchedule();
    }, [props.doctorIdFromParent, selectedDate]);
    const handleOnChangeSelect = async (event) => {
        const date = event.target.value;
        setSelectedDate(date); // Cập nhật ngày được chọn
    }

    return (
        <div className="doctor-schedule-container">
            <div className="all-schedule">
                <select onChange={(event) => handleOnChangeSelect(event)}>
                    {allDays && allDays.length > 0 &&
                        allDays.map((item, index) => {
                            return (
                                <option
                                    key={index}
                                    value={item.value}
                                >
                                    {item.label}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="all-avaiable-time">
                <div className="text-calendar">
                    <FaCalendarAlt className="icon-calendar" /><span>Lịch khám</span>
                </div>
                <div className="time-content">
                    {allAvalableTime && allAvalableTime.length > 0 ?
                        <>
                            <div className="time-content-btns">
                                {allAvalableTime.map((item, index) => {
                                    let timeDisplay = item.timeTypeData.valueVi;
                                    return (
                                        <button key={index}>{timeDisplay}</button>
                                    )
                                })
                                }
                            </div>

                            <div className="book-free">
                                <span>Chọn <FaRegHandPointUp /> và đặt (miễn phí)</span>
                            </div>

                        </>
                        :
                        <div className="no-schedule">
                            <span>Không có lịch hẹn trong thời gian này, vui lòng chọn thời gian khác</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default DoctorSchedule;