import axios from "../utils/axios.jsx";

const postLogin = (email, password) => {
    return axios.post(`/api/login`, {
        email: email,
        password: password
    });
}

export { postLogin }