import * as actionTypes from '../constants/filter';

export const addFilter = (filter) => {
    return {
        type: actionTypes.ADD_FILTER,
        payload: filter
    };
}

export const resetFilter = () => {
    return {
        type: actionTypes.RESET_FILTER
    };
}