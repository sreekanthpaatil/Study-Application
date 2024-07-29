import React from "react";

import styles from "./Btn_03.module.css";

const Btn_03 = (props) => {
  return (
    <React.Fragment>
      <button className={styles.topic_btn_03}>
        <p className={styles.btn_03_content}>{props.children}</p>
      </button>
    </React.Fragment>
  );
};

export default Btn_03;