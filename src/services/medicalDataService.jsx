import axios from "../utils/axios.jsx";

// triệu chứng
const createNewSymptom = (data) => {
    return axios.post('/api/create-new-symptom', data)
}

// thuốc
const createNewDrug = (data) => {
    return axios.post('/api/create-new-drug', data)
}
// dược liệu
const createNewMedicinal = (data) => {
    return axios.post('/api/create-new-medicinal-herb', data)
}

// bộ phận cơ thể
const createNewBodyPart = (data) => {
    return axios.post('/api/create-new-body-part', data)
}

export {
    createNewSymptom, createNewDrug, createNewMedicinal, createNewBodyPart
}