import React, { useState } from 'react';
import Navbar from './Navbar';

import { Outlet } from 'react-router-dom';
import Logout from './Logout';

function Landing() {
  const [logoutModalOn, setLogoutModalOn] = useState(false);

  const handleLogoutOpen = () => {
    setLogoutModalOn(true);
  };

  const handleLogoutClose = () => {
    setLogoutModalOn(false);
  };

  return (
    <div>
      {logoutModalOn && <Logout closeLogout={handleLogoutClose} />}
      <Navbar openLogout={handleLogoutOpen} />
      <Outlet />
    </div>
  );
}

export default Landing;