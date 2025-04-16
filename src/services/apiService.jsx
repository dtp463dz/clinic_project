import axios from "../utils/axios.jsx";

// login
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

// tạo mới user
const postCreateNewUser = async (email, password, firstName, lastName, roleId, image) => {
    return axios.post(`/api/create-new-user`, {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        roleId: roleId,
        image: image,
    });

};

export { postLogin, getAllUsers, postCreateNewUser }