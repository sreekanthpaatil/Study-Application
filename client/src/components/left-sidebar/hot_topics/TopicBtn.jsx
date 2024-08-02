import React from "react";

import styles from "./TopicBtn.module.css";

const TopicBtn = (props) => {
  return (
    <React.Fragment>
      <button className={styles.topic_btn}>
        <p className={styles.btn_content}>{props.name}</p>
      </button>
    </React.Fragment>
  );
};

export default TopicBtn;