import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import styles from './route-styles/Authenticate.module.css';

import AnimatedPage from '../components/AnimatedPage';

const Authenticate = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const actionMode = pathname.split('/').pop();
  const [action, setAction] = useState(actionMode);
  const navigate = useNavigate();

  return (
    <>
      <AnimatedPage>
        <section className={styles.authentication_section}>
          <div className={styles.authenticate_container}>
            <div className={styles.authenticate_btn_container}>
              <button
                className={
                  action === 'signup'
                    ? `${styles.authenticate_mode_btn} ${styles.authenticate_mode_selected}`
                    : `${styles.authenticate_mode_btn}`
                }
                onClick={() => {
                  setAction('signup');
                  navigate('signup');
                }}
              >
                Sign Up
              </button>
              <button
                className={
                  action === 'signin'
                    ? `${styles.authenticate_mode_btn} ${styles.authenticate_mode_selected}`
                    : `${styles.authenticate_mode_btn}`
                }
                onClick={() => {
                  setAction('signin');
                  navigate('signin');
                }}
              >
                Sign In
              </button>
            </div>
            <Outlet />
          </div>
        </section>
      </AnimatedPage>
    </>
  );
};

export default Authenticate;