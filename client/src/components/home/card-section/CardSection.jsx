import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './CardSection.module.css';

import Card from '../../card/Card';

const CardSection = ({ tokens, name }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        if (direction === 1 && prevIndex >= tokens.length - 4) {
          setDirection(-1);
          return prevIndex - 1;
        } else if (direction === -1 && prevIndex <= 0) {
          setDirection(1);
          return prevIndex + 1;
        };
        return prevIndex + direction;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [tokens.length, direction]);

  return (
    <>
      <div className={styles.sectionContainer}>
        <h1>Explore {name}</h1>
        <div className={styles.cardContainer}>
          {tokens.map(token => (
            <div
              key={token._id}
              className={styles.card}
              style={{
                transform: `translateX(-${currentIndex * 105.5}%)`,
              }}
            >
              <Card token={token} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.moreInfo}>
        <Link to={`/${name.toLowerCase()}`} className={styles.moreInfoText}>
            View all {name}
        </Link>
      </div>
    </>
  );
};

export default CardSection;
