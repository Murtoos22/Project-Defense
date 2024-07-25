import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Register.module.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repass, setRepass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO add authentication and register logic

    setEmail('');
    setPassword('');
    setRepass('');
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Register</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Repeat Password:</label>
          <input
            type="password"
            id="repass"
            className={styles.input}
            value={repass}
            onChange={(e) => setRepass(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>Register</button>
      </form>
      <div className={styles.redirectLink}>
        <p>Don't have an account?</p>
        <Link to={'/login'}>Login</Link>
      </div>
    </div>
  );
};

export default Register;