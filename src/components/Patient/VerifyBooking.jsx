import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { postVerifyBookAppointment } from "../../services/userService";
import "./VerifyBooking.scss";

const VerifyBooking = () => {
    const location = useLocation(); // Lấy thông tin URL (bao gồm cả query string)
    const [statusVerify, setStatusVerify] = useState(false);
    const [message, setMessage] = useState("");
    // console.log(location)
    useEffect(() => {
        const fetchVerifyBooking = async () => {
            if (location && location.search) {
                const queryParams = new URLSearchParams(location.search); // Tạo đối tượng để truy xuất các tham số từ URL
                const doctorId = queryParams.get('doctorId'); // lấy doctorId
                const token = queryParams.get('token');       // lấy token nếu cần
                console.log("check id: ", doctorId)
                console.log("check token: ", token)
                let res = await postVerifyBookAppointment({
                    token: token,
                    doctorId: doctorId,
                });
                if (res && res.errCode === 0) {
                    setStatusVerify(true);
                    setMessage("Xác nhận lịch hẹn thành công!");
                } else {
                    setStatusVerify(false);
                    setMessage("Xác nhận thất bại hoặc đã được xác nhận trước đó.");
                }
            }

        }
        fetchVerifyBooking()
    }, [location])
    return (
        <div className="verify-booking-container">
            <div className="verify-box">
                <h2>Xác nhận đặt lịch khám</h2>
                <p className={statusVerify ? "success" : "error"}>
                    {message}
                </p>
            </div>
        </div>
    );
};



export default VerifyBooking;