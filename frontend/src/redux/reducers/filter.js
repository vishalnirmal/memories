import * as actionTypes from '../constants/filter';

const filterReducer = (state = {value: ""}, action) => {
    switch (action.type) {
        case actionTypes.ADD_FILTER:
            return action.payload;
        case actionTypes.RESET_FILTER:
            return {
                value: ""
            };
        default:
            return state;
    }
};

export default filterReducer;