import axios from "../utils/axios.jsx";

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

// lay tat ca ba si
const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctor`)
}

// luu thong tin chi tiet bac si
const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-infor-doctors`, data)
}

// lay thong tin chi tiet bac si
const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}

// save bulk schedule doctor
const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}

// get schedule doctor by date 
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

// get extra infor doctor id
const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}

// lay thong tin chi tiet bac si
const getProfileDoctorById = (inputId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${inputId}`)
}

export {
    getTopDoctorHomeService, getAllDoctors, saveDetailDoctorService, getDetailInforDoctor,
    saveBulkScheduleDoctor, getScheduleDoctorByDate,
    getExtraInforDoctorById, getProfileDoctorById
}