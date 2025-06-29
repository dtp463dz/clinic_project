import actionTypes from "../action/actionTypes";

const INITIAL_STATE = {
    isLoadingGender: false,
    totalPages: 1,
    currentPage: 1,
    totalItems: 0,
    limit: 10,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],

    allRequiredDoctorInfor: [],
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
        case actionTypes.FETCH_GENDER_FAILDED:
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
        case actionTypes.FETCH_POSOTION_FAILDED:
            state.positions = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLEID_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLEID_FAILDED:
            state.roles = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USERS_START:
            return {
                ...state
            };
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            return {
                ...state,
                users: action.data.users, // Lưu danh sách người dùng
                totalPages: action.data.totalPages, // Lưu tổng số trang
                currentPage: action.data.currentPage, // Lưu trang hiện tại
                totalItems: action.data.totalItems, // Lưu tổng số người dùng
                limit: action.data.limit // Lưu số lượng item mỗi trang
            };
        case actionTypes.FETCH_ALL_USERS_FAILDED:
            return {
                ...state,
                users: [], // Đặt lại danh sách người dùng
                totalPages: 1,
                currentPage: 1,
                totalItems: 0,
                limit: 10
            };

        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.dataDoctor; // res.data ben action
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILDED:
            state.topDoctors = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataAllDoctors; // res.data ben action
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILDED:
            state.allDoctors = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime; // res.data ben action
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED:
            state.allScheduleTime = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START:
            state.allRequiredDoctorInfor = action.data; // res.data ben action
            //    console.log('>> required doctor data action: ', action)
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILDED:
            state.allRequiredDoctorInfor = [];
            return {
                ...state,
            }

        default: return state;
    }
};

export default adminReducer;