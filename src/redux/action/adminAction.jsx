import actionTypes from "./actionTypes";
import { getAllCodeService, createNewUserService } from "../../services/apiService";

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
            // call create user
            let res = await createNewUserService(data)
            console.log('check create user redux: ', res);
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


