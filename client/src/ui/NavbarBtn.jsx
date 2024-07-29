import React from "react";

import styles from "./NavbarBtn.module.css";

const Navbar_Btn = ({ onTouch, children }) => {
  return (
    <React.Fragment>
      <button className={styles.btn} onClick={onTouch}>
        <span className={styles.icon}>{children}</span>
      </button>
    </React.Fragment>
  );
};

export default Navbar_Btn;