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
// post patient book appointment
const postPatientBookAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data)
}

// verify booking appointment
const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data)
}

// tạo chuyên khoa mới
const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data)
}

// lấy tất cả chuyên khoa
const getAllSpecialty = (page = 1, limit = 10) => {
    return axios.get(`/api/get-all-specialty?page=${page}&limit=${limit}`)
}

// lấy chi tiết chuyên khoa theo id và location (tỉnh thành)
const getDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}


// tạo phòng khám mới
const createNewClinic = (data) => {
    return axios.post('/api/create-new-clinic', data)
}
// lấy tất cả phòng khám
const getAllClinic = (page = 1, limit = 10) => {
    return axios.get(`/api/get-all-clinic?page=${page}&limit=${limit}`)
}
// lấy chi tiết phòng khám theo id 
const getDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}}`)
}

// lấy danh sách bệnh nhân từ bác sĩ
const getListPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}

// lưu thông tin modal hóa đơn khám bệnh 
const postSendConfirm = (data) => {
    return axios.post('/api/send-confirm', data)
}

export {
    getTopDoctorHomeService, getAllDoctors, saveDetailDoctorService, getDetailInforDoctor,
    saveBulkScheduleDoctor, getScheduleDoctorByDate,
    getExtraInforDoctorById, getProfileDoctorById, postPatientBookAppointment,
    postVerifyBookAppointment, createNewSpecialty, getAllSpecialty,
    getDetailSpecialtyById, createNewClinic, getAllClinic, getDetailClinicById,
    getListPatientForDoctor, postSendConfirm,
}