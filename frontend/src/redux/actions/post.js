import axios from 'axios';
import * as actionTypes from '../constants/posts';
const url = "http://localhost:5500/posts";

export const getPosts = () => async (dispatch) => {
    dispatch({
        type: actionTypes.FETCH_POSTS_REQUEST
    });
    try {
        const response = await axios.get(`${url}`);
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
        const response = await axios.post(url, post, {
            headers: {
                'x-auth-token': token
            }
        });
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
        await axios.delete(`${url}/${id}`,{
            headers: {
                "x-auth-token": token
            }
        });
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
        const response = await axios.patch(url, post, {
            headers: {
                'x-auth-token': token
            }
        });
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
        await axios.patch(`${url}/like/${id}`, {}, {
            headers: {
                "x-auth-token": token
            }
        });
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