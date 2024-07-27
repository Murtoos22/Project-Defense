import { Link } from 'react-router-dom';

import styles from './Header.module.css';
import siteLogo from '../../public/site-logo-alt.png';

import Cookies from 'js-cookie';

const Header = () => {
  const isUser = !!Cookies.get('token');

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to={'/'}>
          <img src={siteLogo} alt="Logo" className={styles.logoImage} />
        </Link>
        <h1 className={styles.logoText}>Crypto Blog</h1>
      </div>
      {isUser
        ? null // TODO fix this add additional links
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