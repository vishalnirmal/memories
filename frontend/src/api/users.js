import axios from 'axios';
import {url as baseUrl} from './constants.js';
const url = `${baseUrl}/users`;

export const registerUser = async (user) => {
    return await axios.post(`${url}/register`, user);
}

export const loginUser = async (user) => {
    const response = await axios.post(`${url}/login`, user);
    return response;
}

export const verifyUser = async (token) => {
    const response = await axios.post(`${url}/verify/`, {token});
    return response;
}

export const sendPasswordResetEmail = async (email) => {
    const response = await axios.post(`${url}/password/reset`, {email});
    return response;
}

export const resetPassord = async (token, passwords) => {
    const response = await axios.post(`${url}/password/reset/confirm`, {
        ...passwords,
        token
    });
    return response;
}