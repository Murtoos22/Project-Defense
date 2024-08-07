import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Header.module.css';
import siteLogo from '../../../public/site-logo-alt.png';

import useUserLoginCheck from '../../hooks/useUserLoginCheck';

import { logout } from '../../api/user-api';

const Header = () => {
  const navigate = useNavigate();
  
  const { checkAndRedirect } = useUserLoginCheck();
  const isLoggedIn = checkAndRedirect();

  async function onLogoutClickHandler() {
    await logout();
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to={'/'}>
          <img src={siteLogo} alt="Logo" className={styles.logoImage} />
        </Link>
        <h1 className={styles.logoText}>Crypto Blog</h1>
      </div>
      {isLoggedIn
        ? (
          <div className={styles.navLinks}>
            <button
              className={styles.logout}
              onClick={onLogoutClickHandler}
            >
              Logout
            </button>
          </div>
        )
        : (
          <div className={styles.navLinks}>
            <Link to={'/login'} className={styles.login}>Login</Link>
            <Link to={'/register'} className={styles.register}>Register</Link>
          </div>
        )
      }
    </header>
  );
};

export default Header;