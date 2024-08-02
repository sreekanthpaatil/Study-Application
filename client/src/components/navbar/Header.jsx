import React from 'react';
import { Link } from 'react-router-dom';

import logoLET from '../../assets/letmainlogo.png';
import styles from './Header.module.css';

import LoginButton from './login/LoginButton';
import Group from './groups/Group';
import Notification from './notications/Notification';
import SearchBar from './search_bar/SearchBar';

const Header = ({ onShowModal }) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <Link to="/home">
          <img src={logoLET} alt="let-logo-img" className={styles.logo}></img>
        </Link>

        <div className={styles.search_bar}>
          <SearchBar />
        </div>
        <div className={styles.actions}>
          <Notification />
          <Group />
          <LoginButton onOpenModal={onShowModal} />
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;