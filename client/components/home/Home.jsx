import React from 'react';
import styles from './Home.module.css';

import CardSection from './card-section/CardSection';

const Home = () => {
    return (
        <div className={styles.homewrapper}>
            <CardSection />
        </div>
    );
};

export default Home;