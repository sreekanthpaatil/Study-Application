import React from "react";

import styles from "./Trending.module.css";
import TrendingPosts from "./trending_posts/TrendingPosts";
import HotTopics from "./hot_topics/HotTopics";
import Break from "../../ui/Break";

const Trending = () => {
  return (
    <React.Fragment>
      <div className={styles.rightbar}>
        <TrendingPosts />
        <Break />
        <HotTopics />
      </div>
    </React.Fragment>
  );
};

export default Trending;