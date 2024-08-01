import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetOneTokenById } from '../../hooks/useGetAllTokens';

const TokenDetails = ({ tokens }) => {
    const { id } = useParams();
    const token = useGetOneTokenById(id);

    console.log(token);
    
    return (
        <div>
            <h1>{token.name}</h1>
        </div>
    );
};

export default TokenDetails;