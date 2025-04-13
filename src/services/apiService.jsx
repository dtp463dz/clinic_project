import axios from "axios";

const postLogin = (userEmail, userPassword) => {
    return axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        email: userEmail,
        password: userPassword
    });
}

export { postLogin }