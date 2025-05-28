import "./DoctorSchedule.scss";
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/vi'; // nạp locale tiếng Việt
import { getScheduleDoctorByDate } from "../../../services/userService";

const DoctorSchedule = (props) => {
    const [allDays, setAllDays] = useState([]);


    // Tạo danh sách 7 ngày bắt đầu từ hôm nay
    useEffect(() => {
        dayjs.locale('vi'); // thiết lập ngôn ngữ mặc định là tiếng Việt
        const tempDays = [];
        for (let i = 0; i < 7; i++) {
            const currentDate = dayjs().add(i, 'day');
            tempDays.push({
                label: currentDate.format('dddd - DD/MM'),
                value: currentDate.startOf('day').valueOf()
            });
        }
        console.log("allDays: ", tempDays)
        setAllDays(tempDays);
    }, [])
    // const fetchSchedule = async () => {
    //     try {
    //         let res = await getScheduleDoctorByDate(37, 1748451600000);
    //         console.log('check res', res);
    //     } catch (error) {
    //         console.error('Failed to fetch schedule:', error);
    //     }
    // };

    // useEffect(() => {
    //     if (doctorId) {
    //         fetchSchedule()
    //     }
    // }, [doctorId]);

    const handleOnChangeSelect = async (event) => {
        // lay doctorIdFromParent từ DetailDoctor
        if (props.doctorIdFromParent && props.doctorIdFromParent !== -1) {
            let doctorId = props.doctorIdFromParent;
            console.log('check detail doctor: ', doctorId)
            const date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);

            console.log('check handleonChange: ', res)
        }


    }
    return (
        <div className="doctor-schedule=container">
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

            </div>
        </div>
    )
}

export default DoctorSchedule;