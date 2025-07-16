import axios from "../utils/axios.jsx";

// triệu chứng
const createNewSymptom = (data) => {
    return axios.post('/api/create-new-symptom', data)
}
const getAllSymptom = (page = 1, limit = 10) => {
    return axios.get(`/api/get-all-symptom?page=${page}&limit=${limit}`)
}

// thuốc
const createNewDrug = (data) => {
    return axios.post('/api/create-new-drug', data)
}
const getAllDrug = (page = 1, limit = 10) => {
    return axios.get(`/api/get-all-drug?page=${page}&limit=${limit}`)
}
// dược liệu
const createNewMedicinal = (data) => {
    return axios.post('/api/create-new-medicinal-herb', data)
}
const getAllMedicinal = (page = 1, limit = 10) => {
    return axios.get(`/api/get-all-medicinal-herbs?page=${page}&limit=${limit}`)
}
// bộ phận cơ thể
const createNewBodyPart = (data) => {
    return axios.post('/api/create-body-part', data)
}
const getAllBodyPart = (page = 1, limit = 10) => {
    return axios.get(`/api/get-all-body-parts?page=${page}&limit=${limit}`)
}


export {
    createNewSymptom, createNewDrug, createNewMedicinal, createNewBodyPart,
    getAllSymptom, getAllDrug, getAllMedicinal, getAllBodyPart
}