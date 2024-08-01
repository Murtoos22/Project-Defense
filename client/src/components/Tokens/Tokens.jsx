import React, { useState } from 'react';
import styles from './Tokens.module.css';

import Card from '../card/Card';

import { useGetAllTokens } from '../../hooks/useGetAllTokens';

const Tokens = ({ tokens }) => {
    // const tokens = useGetAllTokens();

    const [tokenQuery, setTokenQuery] = useState('');
    const [tokenQueryResult, setTokenQueryResult] = useState([]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setTokenQuery(value);
        // TODO implement RegEx query
        const filtered = tokens.filter(token =>
            token.name.toLowerCase().includes(value.toLowerCase())
        );
        setTokenQueryResult(filtered);
    };

    return (
        <div>
            <div className={styles.introContainer}>
                <h1 className={styles.title}>Tokens</h1>
                <div className={styles.textContainer}>
                    <p className={styles.text}>
                        Dive into the world of cryptocurrency, learn new fascinating things about each individual protocol and its benefits to the blockchain ecosystem. Explore a diverse array of tokens, each offering unique features and innovations that contribute to the growth and security of decentralized networks. From pioneering solutions in decentralized finance (DeFi) to groundbreaking advancements in smart contract functionality, our curated list of tokens showcases the best the crypto world has to offer.
                    </p>
                </div>
            </div>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder={`Search ${'tokens'}...`}
                    className={styles.searchInput}
                    value={tokenQuery}
                    onChange={handleSearch}
                />
            </div>
            {
            tokenQueryResult.length > 0
                ? (
                    <div className={styles.tokenContainer}>
                        {tokenQueryResult.map(token => <Card key={token._id} token={token} />)}
                    </div>
                )
                : tokenQueryResult.length === 0 && tokenQuery ? (
                    <div className={styles.noResultContainer}>
                        <p className={styles.noResultMessage}>
                            No tokens found!
                        </p>
                    </div>
                )
                : (
                    <div className={styles.tokenContainer}>
                        {tokens.map(token => <Card key={token._id} token={token} />)}
                    </div>
                )
            }
        </div>
    );
};

export default Tokens;