import React from "react";

import styles from "./Hot.module.css";
import PostCard from "../feed_posts/post_cards/PostCard";

const Hot = () => {
  const feed_posts = [];

  let output = feed_posts.map((post) => <PostCard key={post.id} post={post} />);

  if (feed_posts.length === 0) {
    output = (
      <div className={styles.error_box}>
        <p className={styles.p_special}>Coming Soon!</p>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className={styles.feed_posts_container}>{output}</div>
    </React.Fragment>
  );
};

export default Hot;