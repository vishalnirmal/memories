import * as actionTypes from '../constants/filter';

const filterReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.ADD_FILTER:
            return action.payload;
        case actionTypes.RESET_FILTER:
            return {};
        default:
            return state;
    }
};

export default filterReducer;