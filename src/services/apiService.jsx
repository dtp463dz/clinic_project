import axios from "../utils/axios.jsx";

const postLogin = (email, password) => {
    return axios.post(`/api/login`, {
        email: email,
        password: password
    });
}

// lay tat ca user
const getAllUsers = () => {
    return axios.get(`/api/get-all-users/?id=ALL`)
}
export { postLogin, getAllUsers }