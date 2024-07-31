import React from 'react';
import letmainlogo from '../assets/letmainlogo.png';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './Navbar.module.css';

export default function Navbar(props) {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <nav className={styles.nav_landing}>
      <div className={styles.logo_container}>
        <img id={styles.logo} src={letmainlogo} alt="main-logo" />
      </div>
      <div className={styles.list_container}>
        <ul className={styles.landing_nav_links}>
          <li className={styles.landing_link}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `${styles.landing_active} ${styles.nav_link} `
                  : `${styles.nav_link}`
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li className={styles.landing_link}>
            <NavLink
              to="/learn"
              className={({ isActive }) =>
                isActive
                  ? `${styles.landing_active} ${styles.nav_link} `
                  : `${styles.nav_link}`
              }
            >
              Why Us
            </NavLink>
          </li>
          <li className={styles.landing_link}>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? `${styles.landing_active} ${styles.nav_link} `
                  : `${styles.nav_link}`
              }
            >
              About
            </NavLink>
          </li>
          <li className={styles.landing_link}>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? `${styles.landing_active} ${styles.nav_link} `
                  : `${styles.nav_link}`
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>

      <div>
        {currentUser ? (
          <div className={styles.authenticate_container}>
            <button className={styles.authenticate} onClick={props.openLogout}>
              Logout
            </button>
          </div>
        ) : (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${styles.landing_active_authenticate} ${styles.authenticate} ${styles.authenticate_link}`
                : `${styles.authenticate} ${styles.authenticate_link}`
            }
            to="/authenticate/signin"
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}