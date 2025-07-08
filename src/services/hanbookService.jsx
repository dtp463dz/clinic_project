import axios from "../utils/axios.jsx";


// tạo cẩm nang mới
const createNewHandBook = (data) => {
    return axios.post('/api/create-new-handbook', data)
}

export {
    createNewHandBook
}