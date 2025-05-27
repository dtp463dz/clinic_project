import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import { FaCalendarAlt } from "react-icons/fa";
import { subDays } from 'date-fns'; // để tính toán khoảng ngày
import './CustomDatePicker.scss';
const CustomDatePicker = ({ onChange }) => {
    const [startDate, setStartDate] = useState(new Date());
    const handleDateChange = (date) => {
        setStartDate(date);
        if (onChange) {
            onChange(date)
        }
    }
    return (
        <div className="date-picker-container">
            <FaCalendarAlt className="icon-calender" />
            <DatePicker
                className="date-picker"
                selected={startDate}
                onChange={handleDateChange}
                minDate={subDays(new Date(), 5)} // Chỉ cho phép chọn từ 5 ngày trước trở đi
                dateFormat="dd/MM/yyyy" // Định dạng ngày thành dd/mm/yyyy
            />
        </div>

    );
};

export default CustomDatePicker;