import axios from "axios";
import { axiosConfig } from '../constants/requesterConstants';

const BASE_URL = 'http://localhost:3000/tokens';

export const getAllTokens = async () => {
    return (await axios.get(BASE_URL, axiosConfig)).data;
};

export const getPartialTokens = async () => {
    return (await axios.get(`${BASE_URL}/partial`, axiosConfig)).data;
};

export const getOneTokenById = async (tokenId) => {
    return (await axios.get(`${BASE_URL}/${tokenId}`, axiosConfig)).data;
};