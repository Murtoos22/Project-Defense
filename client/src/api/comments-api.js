import axios from "axios";
import { axiosConfig } from "../constants/requesterConstants";

const BASE_URL = 'http://localhost:3000';

export const createComment = async (commentData) => {
    return (await axios.post(`${BASE_URL}/comment/create`, { data: commentData }, axiosConfig)).data;
};

export const replyToComment = async (commentData) => {
    return (await axios.post(`${BASE_URL}/comment/reply`, { data: commentData }, axiosConfig)).data;
};  