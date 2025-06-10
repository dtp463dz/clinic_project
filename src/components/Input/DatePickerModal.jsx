import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import './DatePickerModal.scss';
import { getYear, getMonth } from "date-fns";

const DatePickerModal = ({ onChange, selected }) => {
    const years = Array.from({ length: getYear(new Date()) - 1950 + 1 }, (_, i) => 1950 + i);
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <div className="date-picker-container">
            <FaCalendarAlt className="icon-calender" />
            <DatePicker
                className="date-picker"
                selected={selected}
                onChange={onChange}
                dateFormat="dd/MM/yyyy"
                renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                }) => (
                    <div style={{ margin: 10, display: "flex", justifyContent: "center", gap: 8 }}>
                        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>{"<"}</button>
                        <select value={getYear(date)} onChange={({ target: { value } }) => changeYear(Number(value))}>
                            {years.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        <select
                            value={months[getMonth(date)]}
                            onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
                        >
                            {months.map((month, index) => (
                                <option key={index} value={month}>{month}</option>
                            ))}
                        </select>
                        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>{">"}</button>
                    </div>
                )}
            />
        </div>
    );
};

export default DatePickerModal;
