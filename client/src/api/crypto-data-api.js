import axios from "axios";
import { axiosConfig } from '../constants/requesterConstants';

const BASE_URL = 'http://localhost:3000';

export const getAllTokens = async () => {
    return (await axios.get(`${BASE_URL}/tokens`, axiosConfig)).data;
};

export const getPartialTokens = async () => {
    return (await axios.get(`${BASE_URL}/tokens/partial`, axiosConfig)).data;
};

export const getOneTokenById = async (tokenId) => {
    return (await axios.get(`${BASE_URL}/tokens/${tokenId}`, axiosConfig)).data;
};