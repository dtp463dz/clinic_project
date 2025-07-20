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

// xóa phòng khám
const deleteHandBook = (handBookId) => {
    return axios.delete(`/api/delete-handbook`, { data: { id: handBookId } })
}

// chỉnh sửa chuyên khoa
const updateHandBook = (data) => {
    return axios.put('/api/edit-handbook', data)
}
export {
    createNewHandBook, getAllHandBook, getDetailHandBookById, deleteHandBook, updateHandBook
}