import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Break from "../../ui/Break";

import styles from "./TabNav.module.css";

const TabNav = () => {
  const tabs = [
    { name: "Home Feed", id: "#1", to: "/home/" },
    { name: "Hot", id: "#3", to: "/home/hot" },
    { name: "Communities", id: "#5", to: "/home/communities" },
  ];

  const location = useLocation().pathname;

  const [tabSelect, setTabSelect] = useState(location);

  const tabs_section = (
    <nav className={styles.tab_nav}>
      <div className={styles.section_control}>
        <ul className={styles.tabs_list}>
          {tabs.map((tab) => (
            <NavLink
              to={tab.to}
              className={tabSelect === tab.to ? styles.selected : undefined}
              key={tab.id}
              onClick={() => changeTabHandler(tab.to)}
            >
              {tab.name}
            </NavLink>
          ))}
        </ul>
        <Break />
      </div>
    </nav>
  );

  const changeTabHandler = (id) => {
    setTabSelect(id);
  };

  return (
    <React.Fragment>
      <div className={styles.feed}>
        {tabs_section}
        <Outlet />
      </div>
    </React.Fragment>
  );
};

export default TabNav;