import axios from "../utils/axios.jsx";

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

export {
    getTopDoctorHomeService,
}