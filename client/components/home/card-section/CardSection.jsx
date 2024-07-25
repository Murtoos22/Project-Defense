import React from 'react';
import styles from './CardSection.module.css';

import Card from './card/Card';

const CardSection = (props) => {
  return (
    <div className={styles.sectionContainer}>
      <h1>Explore {props.name}</h1>
      <section className={styles.cardContainer}>
        <Card />
        <Card />
        <Card />
        <Card />
      </section>
    </div>
  );
};

export default CardSection;
