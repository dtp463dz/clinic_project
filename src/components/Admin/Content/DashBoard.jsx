import { useEffect, useState } from "react";
import { FaUser, FaClinicMedical, FaCalendarCheck, FaDollarSign, FaCalendarTimes } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./Dashboard.scss";
import { getDashboardData } from "../../../services/dashboardService";

const Dashboard = ({ isAdmin }) => {
    const [dashboardData, setDashboardData] = useState({
        metrics: {
            totalPatients: 0,
            totalClinics: 0,
            totalAppointments: 0,
            totalCancelAppointments: 0,
            totalRevenue: 0,
        },
        chartData: [],
        recentActivities: [],
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await getDashboardData();
                if (response.errCode === 0) {
                    setDashboardData(response.data);
                    setError(null);
                } else {
                    setError(response.errMessage || "Không thể tải dữ liệu dashboard");
                }
            } catch (err) {
                setError("Lỗi kết nối server");
                console.error("Error fetching dashboard data:", err);
            }
        };
        fetchDashboardData();
    }, []);
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>{isAdmin ? "Admin Dashboard" : "Doctor Dashboard"}</h1>
                <p>Chào mừng bạn quay lại! Đây là tổng quan hệ thống của bạn.</p>
                {error && <p className="error-message">{error}</p>}
            </header>

            <div className="metrics-grid">
                <div className="metric-card">
                    <div className="metric-content">
                        <FaUser className="metric-icon" />
                        <div>
                            <h3>Tổng Bệnh Nhân</h3>
                            <p>{dashboardData.metrics.totalPatients}</p>
                        </div>
                    </div>
                </div>
                <div className="metric-card">
                    <div className="metric-content">
                        <FaClinicMedical className="metric-icon" />
                        <div>
                            <h3>Phòng Khám Hoạt Động</h3>
                            <p>{dashboardData.metrics.totalClinics}</p>
                        </div>
                    </div>
                </div>
                <div className="metric-card">
                    <div className="metric-content">
                        <FaCalendarCheck className="metric-icon" />
                        <div>
                            <h3>Lịch Hẹn</h3>
                            <p>{dashboardData.metrics.totalAppointments}</p>
                        </div>
                    </div>
                </div>
                <div className="metric-card">
                    <div className="metric-content">
                        <FaCalendarTimes className="metric-icon" />
                        <div>
                            <h3>Lịch Đã Hủy</h3>
                            <p>{dashboardData.metrics.totalCancelAppointments}</p>
                        </div>
                    </div>
                </div>
                <div className="metric-card">
                    <div className="metric-content">
                        <FaDollarSign className="metric-icon" />
                        <div>
                            <h3>Doanh Thu</h3>
                            <p>{dashboardData.metrics.totalRevenue.toLocaleString("vi-VN")} VND</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="chart-container">
                <h2>Tổng Quan Hiệu Suất</h2>
                <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dashboardData.chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Legend />
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="patients"
                                stroke="#3b82f6"
                                name="Bệnh Nhân"
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="revenue"
                                stroke="#ef4444"
                                name="Doanh Thu"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="table-container">
                <h2>Hoạt Động Gần Đây</h2>
                <div className="table-wrapper">
                    <table>
                        <thead><tr><th>Ngày</th><th>Bệnh Nhân</th><th>Bác Sĩ</th><th>Hành Động</th><th>Trạng Thái</th></tr></thead>
                        <tbody>
                            {dashboardData.recentActivities.map((activity, index) => (
                                <tr key={index}>
                                    <td>{activity.date}</td>
                                    <td>{activity.patient}</td>
                                    <td>{activity.doctor}</td>
                                    <td>{activity.action}</td>
                                    <td>
                                        <span
                                            className={`status ${activity.status === "Confirmed"
                                                ? "confirmed"
                                                : activity.status === "Completed"
                                                    ? "completed"
                                                    : "pending"
                                                }`}
                                        >
                                            {activity.status === "Confirmed"
                                                ? "Đã Xác Nhận"
                                                : activity.status === "Completed"
                                                    ? "Hoàn Tất"
                                                    : "Đang Chờ"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;