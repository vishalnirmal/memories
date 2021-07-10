import * as actionTypes from '../constants/filter';

const filterReducer = (state = {value: "", page: 1}, action) => {
    switch (action.type) {
        case actionTypes.ADD_FILTER_TITLE:
            return {
                value: action.payload,
                type: "title",
                page: 1
            };
        case actionTypes.ADD_FILTER_TAG:
            return {
                value: action.payload,
                type: "tags",
                page: 1
            }
        case actionTypes.NEXT_PAGE:
            return {
                ...state,
                page: state.page + 1
            }
        case actionTypes.ADD_FILTER:
            return action.payload;
        case actionTypes.RESET_FILTER:
            return {
                value: "",
                page: 1
            };
        default:
            return state;
    }
};

export default filterReducer;