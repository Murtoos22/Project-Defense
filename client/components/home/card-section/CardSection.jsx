import React, { useState, useEffect } from 'react';
import styles from './CardSection.module.css';

import Card from './card/Card';

const CardSection = (props) => {

  return (
    <div className={styles.sectionContainer}>
      <h1>Explore {props.name}</h1>
      <section className={styles.cardContainer}>
        {Object.values(tokens).map(token => <Card key={token._id} token={token}/>)}
      </section>
    </div>
  );
};

export default CardSection;
