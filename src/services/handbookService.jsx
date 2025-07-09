import axios from "../utils/axios.jsx";


// tạo cẩm nang mới
const createNewHandBook = (data) => {
    return axios.post('/api/create-new-handbook', data)
}
// lấy tất cả cẩm nang
const getAllHandBook = (page = 1, limit = 10) => {
    return axios.get(`/api/get-all-handbook?page=${page}&limit=${limit}`)
}

// lấy chi tiết phòng khám theo id 
const getDetailHandBookById = (data) => {
    return axios.get(`/api/get-detail-handbook-by-id?id=${data.id}}`)
}
export {
    createNewHandBook, getAllHandBook, getDetailHandBookById
}