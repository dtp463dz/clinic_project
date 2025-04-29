import actionTypes from "./actionTypes";
import { getAllCodeService } from "../../services/apiService";

// export const fetchGenderStart = () => {
//     return {
//         type: actionTypes.FETCH_GENDER_START,
//     };
// };

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
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

