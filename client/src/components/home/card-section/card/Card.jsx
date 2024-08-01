import React from 'react';
import styles from './Card.module.css';
import SvgImage from './token-svg/SvgImage';

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

            <button>Learn more</button>
        </div>
    );
};

export default Card;
