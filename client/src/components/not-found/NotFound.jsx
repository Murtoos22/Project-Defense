import React from 'react';
import styles from './NotFound.module.css';

import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.notFoundTitle}>404</h1>
      <p className={styles.notFoundMessage}>Oops! Page not found.</p>
      <Link to={"/"} className={styles.notFoundLink}>Go Back to Home</Link>
    </div>
  );
};

export default NotFound;
