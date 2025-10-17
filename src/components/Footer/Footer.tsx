import { NavLink } from 'react-router-dom';

import styles from './Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.content}>
      <p>Made by a Jamaican in Norway.</p>
      <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : undefined)}>
        About
      </NavLink>
    </div>
  </footer>
);

export default Footer;
