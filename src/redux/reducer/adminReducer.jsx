import actionTypes from "../action/actionTypes";

const INITIAL_STATE = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
};
const adminReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            return {
                // nạp vào redux
                ...copyState,

            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;

            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAIDED:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSOTION_FAIDED:
            state.positions = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLEID_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLEID_FAIDED:
            state.roles = [];
            return {
                ...state,
            }
        default: return state;
    }
};

export default adminReducer;