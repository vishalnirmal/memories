import axios from 'axios';
import {url as baseUrl} from './constants.js';
const url = `${baseUrl}/posts`;

export const getImage = async (url, source) => {
    try {
        return await axios.get(url, {
            cancelToken: source.token
        });
    } catch (error) {
        return "";
    }
}

export const getPosts = async (filter, source) => {
    return await axios.get(url, {
        params:filter,
        cancelToken: source.token
    });
}

export const addPost = async (post, token) => {
    const response = await axios.post(url, post, {
        headers: {
            'x-auth-token': token
        }
    });
    return response;
}

export const updatePost = async (post, token) => {
    const response = await axios.patch(url, post, {
        headers: {
            'x-auth-token': token
        }
    });
    return response;
}

export const deletePost = async (id, token) => {
    return await axios.delete(`${url}/${id}`,{
        headers: {
            "x-auth-token": token
        }
    });
}

export const likePost = async (id, token) => {
    return await axios.patch(`${url}/like/${id}`, {}, {
        headers: {
            "x-auth-token": token
        }
    });
}