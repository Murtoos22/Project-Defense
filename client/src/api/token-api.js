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

export const appendComment = async (commentData, tokenId) => {
    return (await axios.post(`${BASE_URL}/${tokenId}/comment`, { data: commentData }, axiosConfig)).data;
};

export const deleteComment = async (commentId, tokenId) => {
    return (await axios.delete(`${BASE_URL}/${tokenId}/comment/${commentId}`, axiosConfig)).data;
};

export const editComment = async (commentId, commentData, tokenId) => {
    return (await axios.put(`${BASE_URL}/${tokenId}/comment/${commentId}`, { data: commentData }, axiosConfig)).data;
};

export const likeComment = async (commentData, tokenId) => {
    return (await axios.post(`${BASE_URL}/${tokenId}/comment/like`, { data: commentData }, axiosConfig)).data;
};

export const dislikeComment = async (commentData, tokenId) => {
    return (await axios.post(`${BASE_URL}/${tokenId}/comment/dislike`, { data: commentData }, axiosConfig)).data;
};
