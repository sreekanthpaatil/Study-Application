import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LoginModal from './navbar/login/LoginModal';
import Card from '../ui/Card';

import { logout } from '../redux/userSlice';

import styles from './Logout.module.css';

const Logout = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    props.closeLogout();
    navigate('/');
  };
  const modalContent = (
    <>
      <Card>
        <div className={styles.logout_modal}>
          <div className={styles.logout_confirm_text}>
            <h3 className={styles.logout_text}>
              Are you sure you want to log out?
            </h3>
          </div>
          <div className={styles.logout_actions_container}>
            <button
              className={`${styles.logout_confirm_btn} ${styles.yes}`}
              onClick={handleLogout}
            >
              YES
            </button>
            <button
              className={`${styles.logout_confirm_btn} ${styles.no}`}
              onClick={props.closeLogout}
            >
              NO
            </button>
          </div>
        </div>
      </Card>
    </>
  );

  return (
    <div>
      <LoginModal onClose={props.closeLogout} modalDisplay="logout">
        {modalContent}
      </LoginModal>
    </div>
  );
};

export default Logout;