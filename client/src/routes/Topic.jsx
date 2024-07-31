import React from "react";

import Sidebar from "../components/right-sidebar/Sidebar";
import Trending from "../components/left-sidebar/Trending";

import styles from "./route-styles/Topic.module.css";
import TopicsPage from "../components/Topics/TopicsPage";

const Topic = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <TopicsPage />
      <Trending />
    </div>
  );
};

export default Topic;