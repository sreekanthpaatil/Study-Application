import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import Login from "../components/navbar/login/Login";
import Header from "../components/navbar/Header";

const Root = () => {
  const [modalOn, setModalOn] = useState(false);

  const openModalHandler = (e) => {
    setModalOn(true);
  };

  const closeModalHandler = (e) => {
    setModalOn(false);
  };
  return (
    <React.Fragment>
      {modalOn && <Login onHideModal={closeModalHandler}></Login>}
      <Header onShowModal={openModalHandler} />
      <Outlet />
    </React.Fragment>
  );
};

export default Root;