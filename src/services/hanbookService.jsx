import axios from "../utils/axios.jsx";


// tạo cẩm nang mới
const createNewHandBook = (data) => {
    return axios.post('/api/create-new-handbook', data)
}
// lấy tất cả cẩm nang
const getAllHandBook = (page = 1, limit = 10) => {
    return axios.get(`/api/get-all-handbook?page=${page}&limit=${limit}`)
}
export {
    createNewHandBook, getAllHandBook
}