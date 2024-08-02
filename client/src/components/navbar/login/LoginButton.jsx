import React from "react";
import NavbarBtn from "../../../ui/NavbarBtn";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import styles from "./LoginButton.module.css";

const LoginButton = (props) => {
  return (
    <NavbarBtn onTouch={props.onOpenModal}>
      <AccountCircleIcon />
    </NavbarBtn>
  );
};

export default LoginButton;