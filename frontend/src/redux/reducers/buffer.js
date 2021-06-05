import * as actionTypes from '../constants/buffer';

const bufferReducer = (state={isBufferLoaded: false}, action) => {
    switch (action.type) {
        case actionTypes.FILL_UPDATE_BUFFER:
            return {
                isBufferLoaded: true,
                post: action.payload
            }
        case actionTypes.EMPTY_UPDATE_BUFFER:
            return {
                isBufferLoaded: false
            }
        default:
            return state;
    }
}

export default bufferReducer;