import React, { useEffect, useState, useMemo } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

import styles from "./TopicsPage.module.css";
// import TopicsHeader from "./TopicsHeader";
import Break from "../../ui/Break";

const TopicsPage = () => {
  const tabs = useMemo(
    () => [
      { name: "Your Favorite Topics", id: "#1", to: "/topic", exact: true },
      { name: "Hot Topics", id: "#2", to: "/topic/hot-topics" },
      { name: "All Tabs", id: "#3", to: "/topic/all-topics" },
    ],
    []
  );

  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");

  // console.log(location.pathname);

  useEffect(() => {
    // Determine the active tab based on the current location
    const matchingTab = tabs.find((tab) =>
      location.pathname.startsWith(tab.to)
    );
    if (matchingTab) {
      setActiveTab(matchingTab.id);
    }
  }, [location.pathname, tabs]);

  const topics_tab_section = (
    <nav className={styles.topics_nav}>
      <div className={styles.topics_control}>
        <ul className={styles.topics_tabs_list}>
          {tabs.map((tab) => (
            <NavLink
              to={tab.to}
              exact={tab.exact}
              className={activeTab === tab.id ? styles.selected : undefined}
              onClick={() => setActiveTab(tab.id)}
              // className={({ isActive }) =>
              //   isActive ? styles.selected : undefined
              // }
              //   activeClassName={styles.selected}
            >
              {tab.name}
            </NavLink>
          ))}
        </ul>
      </div>
    </nav>
  );

  // const topic_header = <div></div>;

  return (
    <React.Fragment>
      <div className={styles.topic_feed}>
        <div className={styles.header_container}>{topics_tab_section}</div>
        <Break />
        <div className={styles.topic_content}>
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
};

export default TopicsPage;