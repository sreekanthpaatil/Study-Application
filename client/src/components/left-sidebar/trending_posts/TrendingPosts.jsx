import React, { useEffect, useState } from "react";

import styles from "./TrendingPosts.module.css";
import Post from "./Post";
import { getSubjectFromId, getTrendingPosts } from "../../../api/api";

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [hasPosts, setHasPosts] = useState(false);
  let count = 0;
  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const response = await getTrendingPosts(
          localStorage.getItem("user_info")
        );

        if (response.status === 200) {
          const posts = [];

          for (let post of response.data.posts) {
            const categories = [];
            for (let category of post.category) {
              const subject_response = await getSubjectFromId(
                category,
                localStorage.getItem("user_info")
              );

              if (subject_response.status === 200) {
                categories.push(subject_response.data.subject.name);
              }
            }
            posts.push({ ...post, category: categories });
          }

          setTrendingPosts(posts);
          setHasPosts(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchTrendingPosts();
  }, []);

  return (
    <React.Fragment>
      <div className={styles.trending_container}>
        <div className={styles.trending_header}>
          <h3 className={styles.header}>
            Trending <span className={styles.emoji}>📈</span>
          </h3>
        </div>
        <div className={styles.trending_posts}>
          <ul className={styles.trending_list}>
            {hasPosts ? (
              trendingPosts.map((post) => {
                return (
                  <Post
                    key={post._id}
                    name={post.title}
                    topics={post.category}
                    id={++count}
                  />
                );
              })
            ) : (
              <p>Loading...</p>
            )}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TrendingPosts;