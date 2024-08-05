import axios from "axios";
import { axiosConfig } from "../constants/requesterConstants";

const BASE_URL = 'http://localhost:3000';

export const createComment = async(commentData) => {
    return await axios.post(`${BASE_URL}/createComment`, {data: commentData}, axiosConfig);
};