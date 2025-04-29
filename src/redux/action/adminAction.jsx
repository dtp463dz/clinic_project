import actionTypes from "./actionTypes";
import { getAllCodeService } from "../../services/apiService";

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
                dispatch(fetchGenderFaided());
            }
        } catch (e) {
            dispatch(fetchGenderFaided());
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
export const fetchGenderFaided = () => {
    return {
        type: actionTypes.FETCH_GENDER_FAIDED,
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
                dispatch(fetchPositionFaided());
            }
        } catch (e) {
            dispatch(fetchPositionFaided());
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
export const fetchPositionFaided = () => {
    return {
        type: actionTypes.FETCH_POSOTION_FAIDED,
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
                dispatch(fetchRoleIdFaided());
            }
        } catch (e) {
            dispatch(fetchRoleIdFaided());
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
export const fetchRoleIdFaided = () => {
    return {
        type: actionTypes.FETCH_ROLEID_FAIDED,
    };
};


