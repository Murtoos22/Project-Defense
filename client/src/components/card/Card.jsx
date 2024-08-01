import React from 'react';
import styles from './Card.module.css';
import SvgImage from '../SvgImage/SvgImage';

import { Link } from 'react-router-dom';

const Card = ({ token }) => {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.titleContainer}>
                <SvgImage name={token.name} />
                <h2 className={styles.name}>{token.name}</h2>
            </div>
            <p className={styles.paragraph} readOnly>
                {token.description}
            </p>
            <Link to={`/tokens/${token._id}`}>
                <button>Learn more</button>
            </Link>
        </div>
    );
};

export default Card;
