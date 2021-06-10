import * as actionTypes from '../constants/form';

const formReducer = (state={loading: false, error: "", success: false}, action) => {
    switch (action.type) {
        case actionTypes.POST_REQUEST:
            return {
                loading: true,
                error: "",
                success: false
            };
        case actionTypes.POST_SUCCESS:
            return {
                loading: false,
                error: "",
                success: true
            };
        case actionTypes.POST_ERROR:
            return {
                loading: false,
                error: action.payload,
                success: false
            };
        case actionTypes.FORM_RESET:
            return {
                loading: false,
                error: "",
                success: false
            };
        default:
            return state;
    }
}

export default formReducer;