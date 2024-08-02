import React, { useEffect, useState } from "react";

import styles from "./CommunityDisplay.module.css";

import { getCommunityById, getUser, getCommunityPosts } from "../../api/api";
import { useParams } from "react-router-dom";
import PostCard from "../feed/feed_posts/post_cards/PostCard";

const CommunityDisplay = () => {
  const id = useParams().id;

  const [community, setCommunity] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchCommunityById = async () => {
      try {
        const response = await getCommunityById(
          id,
          localStorage.getItem("user_info")
        );

        if (response.status === 200) {
          const user = await getUser(response.data.community.admin);

          if (user.status === 200) {
            setCommunity({ ...response.data.community, admin: user.data.name });
            const response1 = await getCommunityPosts(
              id,
              localStorage.getItem("user_info")
            );

            if (response1.status === 200) {
              setPosts(response1.data.posts);
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchCommunityById();
  }, [id, community]);

  return (
    <div className={styles.community_page}>
      {community ? (
        <>
          <div className={styles.community_details}>
            <h1 className={styles.community_title}>{community.title}</h1>
            <p className={styles.community_desc}>{community.description}</p>
            <h3 className={styles.community_admin}>Admin: {community.admin}</h3>
          </div>
          <div className={styles.community_posts}>
            <h4 className={styles.community_post_header}>Posts: </h4>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <div className={styles.community_posts_container}>
        {posts ? (
          posts.length !== 0 ? (
            <div className={styles.community_posts}>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <p>No Posts Found</p>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default CommunityDisplay;