import React from "react";

import styles from "./Btn_03.module.css";

const Btn_04 = (props) => {
  return (
    <React.Fragment>
      <button className={`${styles.topic_btn_04} ${props.key === "topic"} ? `}>
        <p className={styles.btn_04_content}>{props.children}</p>
      </button>
    </React.Fragment>
  );
};

export default Btn_04;