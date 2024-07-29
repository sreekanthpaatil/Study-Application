import React from "react";

import styles from "./Btn_02.module.css";

const Btn_02 = (props) => {
  return (
    <React.Fragment>
      <button className={styles.topic_btn_02} onClick={props.onClick}>
        <p className={styles.btn_02_content}>{props.children}</p>
      </button>
    </React.Fragment>
  );
};

export default Btn_02;