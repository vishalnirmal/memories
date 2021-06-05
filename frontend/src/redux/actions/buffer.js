import * as actionTypes from '../constants/buffer';

export const fillUpdateBuffer = (post) => {
    return {
        type: actionTypes.FILL_UPDATE_BUFFER,
        payload: post
    };
}

export const emptyUpdateBuffer = () => {
    return {
        type: actionTypes.EMPTY_UPDATE_BUFFER
    };
}