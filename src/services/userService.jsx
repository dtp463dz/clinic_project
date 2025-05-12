import axios from "../utils/axios.jsx";

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctor`)
}

const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-infor-doctors`, data)
}

export {
    getTopDoctorHomeService, getAllDoctors, saveDetailDoctorService
}