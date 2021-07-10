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

export const addTitleFilter = (value) => {
    return {
        type: actionTypes.ADD_FILTER_TITLE,
        payload: value
    };
}

export const addTagFilter = (value) => {
    return {
        type: actionTypes.ADD_FILTER_TAG,
        payload: value
    };
}