import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

import { ConicGradientText } from '../../constants/gradientTexts';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <ConicGradientText>About Us</ConicGradientText>
          <p>
            We are a team of passionate developers creating awesome web applications.
          </p>
        </div>
        <div className={styles.footerSection}>
          <ConicGradientText>Quick Links</ConicGradientText>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <ConicGradientText>Follow Us</ConicGradientText>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2024 SoftUni React Project.</p>
      </div>
    </footer>
  );
};

export default Footer;