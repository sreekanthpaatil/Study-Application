import React from "react";
import PostCard from "../../feed/feed_posts/post_cards/PostCard";

import styles from "./HotTopicsList.module.css";

const HotTopicsList = () => {
  const topics = [];

  let output = topics.map((post) => <PostCard key={post.id} post={post} />);

  if (topics.length === 0) {
    output = (
      <div className={styles.error_box}>
        <p className={styles.p_special}>
          Sorry! looks like we have nothing to show you at the moment. Please
          try again after some time!
        </p>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div>{output}</div>
    </React.Fragment>
  );
};

export default HotTopicsList;