import { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { getDoctorNotifications } from "../../../../services/userService";
import "./BadgeNotification.scss";

const BadgeNotification = () => {
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchUnread = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) return;
            const res = await getDoctorNotifications(token);
            if (res.errCode === 0) {
                setUnreadCount(res.unreadCount);
            }
        } catch (err) {
            console.error("Error fetching unread notifications:", err);
        }
    };

    useEffect(() => {
        fetchUnread();
    }, []);

    return (
        <div className="badge-notification">
            <IoMdNotificationsOutline size={20} />
            {unreadCount > 0 && (
                <span className="badge-count">{unreadCount}</span>
            )}
        </div>
    );
};

export default BadgeNotification;