import axios from "../utils/axios.jsx";

// Lấy dữ liệu dashboard
const getDashboardData = (startDate, endDate) => {
    return axios.get(`/api/get-dashboard-data`, {
        params: { startDate, endDate },
    });
};

export { getDashboardData };