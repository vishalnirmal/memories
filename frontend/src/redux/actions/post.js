import * as actionTypes from '../constants/posts';
import * as memoriesApi from '../../api/posts';

export const getPosts = () => async (dispatch) => {
    dispatch({
        type: actionTypes.FETCH_POSTS_REQUEST
    });
    try {
        const response = await memoriesApi.getPosts();
        dispatch({
            type: actionTypes.FETCH_POSTS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: actionTypes.FETCH_POSTS_ERROR,
            payload: error.message
        });
    }
}

export const addPost = (post, setIsLoading, setError, token) => async (dispatch) => {
    setIsLoading(true);
    try {
        const response = await memoriesApi.addPost(post, token);
        dispatch({
            type: actionTypes.ADD_POST,
            payload: response.data
        });  
    } catch (error) {
        setError(error.response.data.message);
    }
    setIsLoading(false); 
}

export const deletePost = (id, token) => async (dispatch) => {
    try {
        await memoriesApi.deletePost(id, token);
        dispatch({
            type: actionTypes.DELETE_POST,
            payload: id
        });
    } catch (error) {
        console.log("Unable to delete the post");
    }
}

export const updatePost = (post, setIsLoading, setError, token) => async (dispatch) => {
    setIsLoading(true);
    try {
        const response = await memoriesApi.updatePost(post, token);
        dispatch({
            type: actionTypes.UPDATE_POST,
            payload: response.data
        });    
    } catch (error) {
        setError(error.response.data.message);
    }
    setIsLoading(false);
}

export const likePost = (id, userId, token) => async (dispatch) => {
    try {
        await memoriesApi.likePost(id, token);
        dispatch({
            type: actionTypes.LIKE_POST,
            payload: {
                postId: id,
                userId: userId
            }
        });
    } catch (error) {
        console.log("Unable to like the post");   
    }
}