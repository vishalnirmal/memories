import axios from 'axios';
import * as actionTypes from '../constants/form';
import * as tokenActionTypes from '../constants/token';
const url = "http://localhost:5500/users";

export const register = (user) => async (dispatch) => {
    dispatch({
        type: actionTypes.POST_REQUEST
    });
    try {
        await axios.post(`${url}/register`, user);
        dispatch({
            type: actionTypes.POST_SUCCESS
        });
    } catch (error) {
        dispatch({
            type: actionTypes.POST_ERROR,
            payload: error.response.data.message
        });
    }
}

export const login = (user, history) => async (dispatch) => {
    dispatch({
        type: actionTypes.POST_REQUEST
    });
    try {
        const response = await axios.post(`${url}/login`, user);
        dispatch({
            type: actionTypes.POST_SUCCESS
        });
        dispatch({
            type: tokenActionTypes.ADD_TOKEN,
            payload: response.data
        });
        dispatch({
            type: actionTypes.FORM_RESET
        });
        history.push("/");
    } catch (error) {
        dispatch({
            type: actionTypes.POST_ERROR,
            payload: error.response.data.message
        });
    }
}

export const verify = (token, history) => async (dispatch) => {
    dispatch({
        type: actionTypes.POST_REQUEST
    });
    try {
        const response = await axios.get(`http://localhost:5500/users/verify/${token}`);
        dispatch({
            type: actionTypes.POST_SUCCESS
        });
        dispatch({
            type: tokenActionTypes.ADD_TOKEN,
            payload: response.data 
        });
        setTimeout(()=>{
            dispatch({
                type: actionTypes.FORM_RESET
            });
            history.push("/");
        }, 3000);
    } catch (error) {
        dispatch({
            type: actionTypes.POST_ERROR,
            payload: error.response.data.message
        });
    }
}