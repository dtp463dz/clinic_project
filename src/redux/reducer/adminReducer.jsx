import actionTypes from "../action/actionTypes";

const INITIAL_STATE = {
    genders: [],
    roles: [],
    positions: [],
};
const adminReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log('check action start: ', action);
            return {
                // nạp vào redux
                ...state,

            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = { ...state };
            copyState.genders = action.data;
            console.log('check action succes: ', copyState);

            return {
                ...copyState,
            };
        case actionTypes.FETCH_GENDER_FAIDED:
            console.log('check action faided: ', action);
            return {
                ...state,
            }
        default: return state;
    }
};

export default adminReducer;