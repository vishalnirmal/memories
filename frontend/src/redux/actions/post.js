import * as actionTypes from '../constants/posts';

export const addPost = (post) => async (dispatch) => {
    post["_id"] = Date().toString();
    post["likes"] = 0;
    dispatch({
        type: actionTypes.ADD_POST,
        payload: post
    });
}

export const deletePost = (id) => async (dispatch) => {
    dispatch({
        type: actionTypes.DELETE_POST,
        payload: id
    });
}

export const updatePost = (post) => async (dispatch) => {
    dispatch({
        type: actionTypes.UPDATE_POST,
        payload: post
    });
}

export const likePost = (id) => async (dispatch) => {
    dispatch({
        type: actionTypes.LIKE_POST,
        payload: id
    });
}