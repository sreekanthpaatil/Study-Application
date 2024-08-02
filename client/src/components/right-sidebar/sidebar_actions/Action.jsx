import React from "react";

import styles from "./Action.module.css";
import { Link } from "react-router-dom";

const Action = (props) => {
  return (
    <React.Fragment>
      <Link className={styles.action_list} to={props.path}>
        {props.children}
      </Link>
    </React.Fragment>
  );
};

export default Action;