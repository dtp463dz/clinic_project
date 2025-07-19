import axios from "../utils/axios.jsx";

// triệu chứng
const createNewSymptom = (data) => {
    return axios.post('/api/create-new-symptom', data)
}
const getAllSymptom = (page = 1, limit = 10) => {
    return axios.get(`/api/get-all-symptom?page=${page}&limit=${limit}`)
}
const getDetailSymptomById = (data) => {
    return axios.get(`/api/get-detail-symptom-by-id?id=${data.id}`)
}

// thuốc
const createNewDrug = (data) => {
    return axios.post('/api/create-new-drug', data)
}
const getAllDrug = (page = 1, limit = 10) => {
    return axios.get(`/api/get-all-drug?page=${page}&limit=${limit}`)
}
const getDetailDrugById = (data) => {
    return axios.get(`/api/get-detail-drug-by-id?id=${data.id}`)
}
// dược liệu
const createNewMedicinal = (data) => {
    return axios.post('/api/create-new-medicinal-herb', data)
}
const getAllMedicinal = (page = 1, limit = 10) => {
    return axios.get(`/api/get-all-medicinal-herbs?page=${page}&limit=${limit}`)
}
const getDetailMedicinalById = (data) => {
    return axios.get(`/api/get-detail-medicinal-herb-by-id?id=${data.id}`)
}
// bộ phận cơ thể
const createNewBodyPart = (data) => {
    return axios.post('/api/create-body-part', data)
}
const getAllBodyPart = (page = 1, limit = 10) => {
    return axios.get(`/api/get-all-body-parts?page=${page}&limit=${limit}`)
}
const getDetailBodyPartById = (data) => {
    return axios.get(`/api/get-detail-body-part-by-id?id=${data.id}`)
}

// Tìm kiếm
const getSearchMedical = (keyword, limit = 10, page = 1) => {
    return axios.get(`/api/searchMedical`, {
        params: {
            keyword,
            limit,
            page
        }
    })
}

export {
    createNewSymptom, createNewDrug, createNewMedicinal, createNewBodyPart,
    getAllSymptom, getAllDrug, getAllMedicinal, getAllBodyPart,
    getDetailSymptomById, getDetailDrugById, getDetailMedicinalById, getDetailBodyPartById,
    getSearchMedical
}