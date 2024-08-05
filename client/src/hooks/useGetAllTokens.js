import { useState, useEffect } from "react";
import {
    getAllTokens,
    getPartialTokens,
    getOneTokenById
} from "../api/token-api";

export function useGetAllTokens() {
    const [tokens, setTokens] = useState([]);
    useEffect(() => {
        (async () => {
            const tokenData = await getAllTokens();
            setTokens(tokenData);
        })();
    }, []);

    return tokens;
};

export function useGetPartialTokens() {
    const [tokens, setTokens] = useState([]);
    useEffect(() => {
        (async () => {
            const tokenData = await getPartialTokens();
            setTokens(tokenData);
        })();
    }, []);

    return tokens;
};

export function useGetOneTokenById(tokenId) {
    const [token, setToken] = useState({});
    useEffect(() => {
        (async () => {
            const token = await getOneTokenById(tokenId);
            setToken(token);
        })();
    }, []);

    return token;
};