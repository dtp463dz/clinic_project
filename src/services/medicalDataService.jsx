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
const deleteSymptom = (symptomId) => {
    return axios.delete(`/api/delete-symptom`, { data: { id: symptomId } })
}
const updateSymptom = (data) => {
    return axios.put('/api/update-symptom', data)
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
const deleteDrug = (drugId) => {
    return axios.delete(`/api/delete-drug`, { data: { id: drugId } })
}
const updateDrug = (data) => {
    return axios.put('/api/update-drug', data)
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
const deleteMedicinal = (herbId) => {
    return axios.delete(`/api/delete-medicinal-herb`, { data: { id: herbId } })
}
const updateMedicinal = (data) => {
    return axios.put('/api/update-medicinal-herb', data)
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
const deleteBodyPart = (bodyPartId) => {
    return axios.delete(`/api/delete-body-part`, { data: { id: bodyPartId } })
}
const updateBodyPart = (data) => {
    return axios.put('/api/update-body-part', data)
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
    getSearchMedical, deleteSymptom, updateSymptom, deleteDrug, updateDrug,
    deleteMedicinal, updateMedicinal, deleteBodyPart, updateBodyPart
}