import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./HotTopics.module.css";
import TopicBtn from "./TopicBtn";

import { getSubjects } from "../../../api/api";

const HotTopics = () => {
  const [topicList, setTopicList] = useState([]);
  const [hasSubjects, setHasSubjects] = useState(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await getSubjects(localStorage.getItem("user_info"));

        if (response.status === 200) {
          setTopicList(response.data.subjects);
          setHasSubjects(true);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.topics_header}>
          <Link to="/topic/hot-topics">
            <h3 className={styles.header}>
              Hot Topics <span className={styles.emoji}>🔥</span>
            </h3>
          </Link>
        </div>
        <div className={styles.topics_container}>
          {hasSubjects ? (
            topicList.map((topic) => (
              <TopicBtn key={topic.id} name={topic.name} />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default HotTopics;