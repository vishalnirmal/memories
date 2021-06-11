import axios from 'axios';
const url = "http://localhost:5500/users";

export const registerUser = async (user) => {
    return await axios.post(`${url}/register`, user);
}

export const loginUser = async (user) => {
    const response = await axios.post(`${url}/login`, user);
    return response;
}

export const verifyUser = async (token) => {
    const response = await axios.get(`${url}/verify/${token}`);
    return response;
}