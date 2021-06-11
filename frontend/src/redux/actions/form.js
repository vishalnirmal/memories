import * as memoriesApi from '../../api/users';
import * as actionTypes from '../constants/form';
import * as tokenActionTypes from '../constants/token';

export const register = (user) => async (dispatch) => {
    dispatch({
        type: actionTypes.POST_REQUEST
    });
    try {
        await memoriesApi.registerUser(user);
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
        const response = await memoriesApi.loginUser(user);
        dispatch({
            type: actionTypes.POST_SUCCESS
        });
        dispatch({
            type: tokenActionTypes.ADD_TOKEN,
            payload: response.data
        });
        dispatch(resetForm());
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
        const response = await memoriesApi.verifyUser(token);
        dispatch({
            type: actionTypes.POST_SUCCESS
        });
        dispatch({
            type: tokenActionTypes.ADD_TOKEN,
            payload: response.data 
        });
        setTimeout(()=>{
            dispatch(resetForm());
            history.push("/");
        }, 7000);
    } catch (error) {
        dispatch({
            type: actionTypes.POST_ERROR,
            payload: error.response.data.message
        });
    }
}

export const resetForm = () => {
    return {
        type: actionTypes.FORM_RESET
    };
}