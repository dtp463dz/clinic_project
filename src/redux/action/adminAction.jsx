import actionTypes from "./actionTypes";
import { getAllCodeService, createNewUserService, getAllUsers, deleteUser, editUserService } from "../../services/apiService";
import { getAllDoctors, getTopDoctorHomeService, saveDetailDoctorService } from "../../services/userService";
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => {
//     return {
//         type: actionTypes.FETCH_GENDER_START,
//     };
// };

// gender
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            // call api allcode
            let res = await getAllCodeService("gender");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailded());
            }
        } catch (e) {
            dispatch(fetchGenderFailded());
            console.log('fetchGenderStart error', e);
        }
    }

};

export const fetchGenderSuccess = (genderData) => {
    return {
        type: actionTypes.FETCH_GENDER_SUCCESS,
        data: genderData
    };
};
export const fetchGenderFailded = () => {
    return {
        type: actionTypes.FETCH_GENDER_FAILDED,
    };
};
// position
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            // call api allcode
            let res = await getAllCodeService("position");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailded());
            }
        } catch (e) {
            dispatch(fetchPositionFailded());
            console.log('fetchPositionStart error', e);
        }
    }

};
export const fetchPositionSuccess = (positionData) => {
    return {
        type: actionTypes.FETCH_POSITION_SUCCESS,
        data: positionData
    };
};
export const fetchPositionFailded = () => {
    return {
        type: actionTypes.FETCH_POSOTION_FAILDED,
    };
};

// role id 
export const fetchRoleIdStart = () => {
    return async (dispatch, getState) => {
        try {

            // call api allcode
            let res = await getAllCodeService("role");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleIdSuccess(res.data));
            } else {
                dispatch(fetchRoleIdFailded());
            }
        } catch (e) {
            dispatch(fetchRoleIdFailded());
            console.log('fetchRoleStart error', e);
        }
    }

};
export const fetchRoleIdSuccess = (roleIdData) => {
    return {
        type: actionTypes.FETCH_ROLEID_SUCCESS,
        data: roleIdData
    };
};
export const fetchRoleIdFailded = () => {
    return {
        type: actionTypes.FETCH_ROLEID_FAILDED,
    };
};

// create user
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            console.log('Data nhận được trong action:', data);
            // call create user
            let res = await createNewUserService(data)
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess());
            } else {
                dispatch(saveUserFailded());
            }
        } catch (e) {
            dispatch(saveUserFailded());
            console.log('saveUserFailded error', e);
        }
    }
}
export const saveUserSuccess = () => {
    return {
        type: actionTypes.CREATE_USER_SUCCESS
    }
}
export const saveUserFailded = () => {
    return {
        type: actionTypes.CREATE_USER_FAILDED
    }
}

// delete user
export const deleteNewUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            // call create user
            let res = await deleteUser(userId)
            if (res && res.errCode === 0) {
                toast.success('Delete User Success');
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart); // cập nhật lại table sau khi xóa
            } else {
                toast.error('Delete User Error');
                dispatch(deleteUserFailded());
            }
        } catch (e) {
            toast.error('Delete User Error');
            dispatch(deleteUserFailded());
            console.log('deleteUserFailded error', e);
        }
    }
}
export const deleteUserSuccess = () => {
    return {
        type: actionTypes.DELETE_USER_SUCCESS
    }
}
export const deleteUserFailded = () => {
    return {
        type: actionTypes.DELETE_USER_FAILDED
    }
}

// update user
export const updateUser = (data) => {
    return async (dispatch, getState) => {
        try {
            // call create user
            let res = await editUserService(data)
            if (res && res.errCode === 0) {
                dispatch(updateUserSuccess());
                dispatch(fetchAllUsersStart); // cập nhật lại table sau khi update
            } else {
                toast.error('Update the User error');
                dispatch(updateUserFailded());
            }
        } catch (e) {
            toast.error('Update the User error');
            dispatch(updateUserFailded());
            console.log('updateUserFailded error', e);
        }
    }
}
export const updateUserSuccess = () => {
    return {
        type: actionTypes.UPDATE_USER_SUCCESS
    }
}
export const updateUserFailded = () => {
    return {
        type: actionTypes.UPDATE_USER_FAILDED
    }
}

// get all list user
export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {

            // call api allcode
            let res = await getAllUsers("ALL");
            // let res1 = await getTopDoctorHomeService(3);
            // console.log('check list doctor: ', res1);
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users));
            } else {
                toast.error('Fetch all user error')
                dispatch(fetchAllUsersFailded());
            }
        } catch (e) {
            toast.error('Fetch all user error')
            dispatch(fetchAllUsersFailded());
            console.log('fetchAllUsersStart error', e);
        }
    }
};
export const fetchAllUsersSuccess = (users) => {
    return {
        type: actionTypes.FETCH_ALL_USERS_SUCCESS,
        users: users
    }
}
export const fetchAllUsersFailded = () => {
    return {
        type: actionTypes.FETCH_ALL_USERS_FAILDED,
    }
}


// doctor
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            console.log('check res', res);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctor: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILDED,
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTORS_FAILDED: ', e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILDED,
            })
        }
    }
}

// get all doctor
export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors('');
            console.log('check res', res);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataAllDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILDED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTORS_FAILDED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILDED,
            })
        }
    }
}

// save infor doctor
export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            console.log('check res', res);
            if (res && res.errCode === 0) {
                toast.success('Save Infor Detail Doctor Succeed!')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            } else {
                toast.error('Save Infor Detail Doctor Error!')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED,
                })
            }
        } catch (e) {
            toast.error('Save Infor Detail Doctor Error!')
            console.log('SAVE_DETAIL_DOCTOR_FAILDED: ', e)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED,
            })
        }
    }
}
