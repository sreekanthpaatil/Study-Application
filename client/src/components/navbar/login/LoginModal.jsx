import React from 'react';
import ReactDOM from 'react-dom';

import styles from './LoginModal.module.css';

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div
      className={
        props.modalDisplay === 'logout'
          ? `${styles.logout_modal}`
          : `${styles.modal}`
      }
    >
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const portal = document.getElementById('overlays');

const LoginModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portal)}
      {ReactDOM.createPortal(
        <ModalOverlay modalDisplay={props.modalDisplay}>
          {props.children}
        </ModalOverlay>,
        portal
      )}
    </React.Fragment>
  );
};

export default LoginModal;