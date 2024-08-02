import React from "react";
import NavbarBtn from "../../../ui/NavbarBtn";
import Diversity3Icon from "@mui/icons-material/Diversity3";

import styles from "./Group.module.css";

const Group = () => {
  return (
    <NavbarBtn>
      <Diversity3Icon className={styles.nav_bar_icons} />
    </NavbarBtn>
  );
};

export default Group;