import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import styles from './Login.module.css';
import LoginModal from './LoginModal';

import Card from '../../../ui/Card';

import { logout } from '../../../redux/userSlice';

const Login = (props) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserLogAction = () => {
    if (currentUser) {
      dispatch(logout());
      navigate('/authenticate/signin');
    }

    navigate('/authenticate/signup');
  };

  const cartModalContent = (
    <Card>
      <div className={styles.modal_actions}>
        <ul className={styles.modal_list}>
          <li className={styles.modal_action}>
            <Link className={styles.modal_action_link} to="profile">
              Your Profile
            </Link>
          </li>
          <li className={styles.modal_action}>Billing</li>
          <li className={styles.modal_action}>Account Settings</li>
          <li className={styles.modal_action} onClick={handleUserLogAction}>
            {currentUser ? 'Log Out' : 'Log In'}
          </li>
        </ul>
      </div>
    </Card>
  );

  return (
    <div>
      <LoginModal onClose={props.onHideModal}>{cartModalContent}</LoginModal>
    </div>
  );
};

export default Login;