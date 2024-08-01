import axios from "axios";
import { axiosConfig } from '../constants/requesterConstants';

const BASE_URL = 'http://localhost:3000';

export const login = async (email, password) => {
    return await axios.post(`${BASE_URL}/login`, { email, password }, axiosConfig);
};

export const register = async (username, email, password, confirmPassword) => {
    return await axios.post(
        `${BASE_URL}/register`, 
        { username, email, password, confirmPassword },
        axiosConfig
    );
};

// TODO review logout logic and make it functional
export const logout = async () => {
    return await axios.get(`${BASE_URL}/logout`, axiosConfig);
};