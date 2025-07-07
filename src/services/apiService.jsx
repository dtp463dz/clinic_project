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
        delay: 3000,
    });
}

// lay tat ca user
const getAllUsers = (page = 1, limit = 10) => {
    return axios.get(`/api/get-all-users/?id=ALL&page=${page}&limit=${limit}`)
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

// create user service (để sử dụng trong redux)
const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', {
        ...data,
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

// update user redux
const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData)
}

// delete user
const deleteUser = (userId) => {
    return axios.delete(`/api/delete-user`, { data: { id: userId } })
}

// all code (có các type: gender role ...)
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode/?type=${inputType}`)

}


// Tìm kiếm
const getSearch = (keyword, limit = 10, page = 1) => {
    return axios.get(`/api/search`, {
        params: {
            keyword,
            limit,
            page
        }
    })
}

export {
    postLogin, getAllUsers, postCreateNewUser,
    putUpdateUser, deleteUser, postRegister,
    getAllCodeService, createNewUserService, editUserService,
    getSearch
}