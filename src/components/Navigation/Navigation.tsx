import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.css';

const Navigation = () => (
  <header className={styles.navigation}>
    <div className={styles.wrapper}>
      <nav>
        <NavLink to="/" end className={({ isActive }) => (isActive ? styles.active : undefined)}>
          JobsByPay
        </NavLink>
      </nav>
      <nav>
        <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : undefined)}>
          About
        </NavLink>
      </nav>
    </div>
  </header>
);

export default Navigation;
