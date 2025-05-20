import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import { FaCalendarAlt } from "react-icons/fa";
import { subDays, addDays } from 'date-fns'; // để tính toán khoảng ngày
import './CustomDatePicker.scss';
const CustomDatePicker = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div className="date-picker-container">
            <FaCalendarAlt className="icon-calender" />
            <DatePicker
                className="date-picker"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                minDate={subDays(new Date(), 5)} // Chỉ cho phép chọn từ 5 ngày trước trở đi
            />
        </div>

    );
};

export default CustomDatePicker;