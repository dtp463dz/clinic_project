import { useEffect, useState } from "react";
import { getDoctorNotifications, markNotificationAsRead } from "../../../../services/userService";
import './Notifications.scss'
const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) return;
            const res = await getDoctorNotifications(token);
            if (res.errCode === 0) {
                setNotifications(res.data);
                setUnreadCount(res.unreadCount);
            }
        } catch (err) {
            console.error("Error fetching notifications:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            const token = localStorage.getItem("accessToken");
            await markNotificationAsRead(token, id);
            fetchNotifications();
        } catch (err) {
            console.error("Lỗi đánh dấu đã đọc:", err);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    if (loading) {
        return <div className="notifications">Đang tải thông báo...</div>;
    }

    return (
        <div className="notifications">
            <h2>Thông báo ({unreadCount} chưa đọc)</h2>
            {notifications.length === 0 ? (
                <p className="no-noti">Không có thông báo nào.</p>
            ) : (
                <ul>
                    {notifications.map((item) => (
                        <li
                            key={item.id}
                            className={`noti-item ${item.status === "unread" ? "unread" : ""}`}
                            onClick={() => handleMarkAsRead(item.id)}
                        >
                            <div className="noti-message">{item.message}</div>
                            <div className="noti-info">
                                <span>
                                    Bệnh nhân:{" "}
                                    <b>
                                        {item.patientData?.firstName}{" "}
                                        {item.patientData?.lastName}
                                    </b>
                                </span>
                                <span>
                                    Ngày khám: {item.bookingData?.date} (
                                    {item.bookingData?.timeTypeDataPatient?.valueVi})
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Notification;
