import axios from "../utils/axios.jsx";

// register
const postRegister = (userEmail, userPassword, userFirstName, userLastName) => {
    return axios.post(`/api/register`, {
        email: userEmail,
        password: userPassword,
        firstName: userFirstName,
        lastName: userLastName,
    })
}

// login
const postLogin = (email, password) => {
    return axios.post(`/api/login`, {
        email: email,
        password: password,
        delay: 5000,
    });
}

// lay tat ca user
const getAllUsers = () => {
    return axios.get(`/api/get-all-users/?id=ALL`)
};

// tạo mới user
const postCreateNewUser = (email, password, firstName, lastName, roleId, image) => {
    return axios.post(`/api/create-new-user`, {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        roleId: roleId,
        image: image,
    });

};

// update user
const putUpdateUser = (id, firstName, lastName, roleId, image) => {
    return axios.put('/api/edit-user', {
        id: id,
        firstName: firstName,
        lastName: lastName,
        roleId: roleId,
        image: image,
    });
};

// delete user
const deleteUser = (userId) => {
    return axios.delete(`/api/delete-user`, { data: { id: userId } })
}

export { postLogin, getAllUsers, postCreateNewUser, putUpdateUser, deleteUser, postRegister }