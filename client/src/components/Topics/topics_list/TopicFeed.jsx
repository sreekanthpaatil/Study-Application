import React from "react";
import { Link } from "react-router-dom";

import styles from "./TopicFeed.module.css";
import TopicBtn from "../../left-sidebar/hot_topics/TopicBtn";

const TopicFeed = () => {
  const all_topics = [
    { name: "Digital Electronics", id: "topic1" },
    { name: "DSA", id: "topic2" },
    { name: "Math - III", id: "topic3" },
    { name: "DBMS", id: "topic4" },
    { name: "MMI", id: "topic5" },
    { name: "OOP", id: "topic6" },
    { name: "Programming in C", id: "topic7" },
    { name: "Signals & Networks", id: "topic8" },
    { name: "Instrumentation", id: "topic9" },
    { name: "VLSI Design", id: "topic10" },
    { name: "Cryptography", id: "topic11" },
  ];

  const topics_section = (
    <div className={styles.topics_container}>
      <ul className={styles.topics_list}>
        {all_topics.map((topic) => (
          <Link
            to={`/topic/${topic.id}`}
            key={topic.id}
            className={styles.topic_list_item}
          >
            <TopicBtn key={topic.id} name={topic.name} />
          </Link>
        ))}
      </ul>
    </div>
  );

  return <div className={styles.topic_feed_container}>{topics_section}</div>;
};

export default TopicFeed;