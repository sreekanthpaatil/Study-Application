import React from "react";

import styles from "./Btn_01.module.css";
// This button is to be used for general small buttons

const Btn_01 = (props) => {
  return (
    <React.Fragment>
      <button className={styles.btn}>{props.children}</button>
    </React.Fragment>
  );
};

export default Btn_01;