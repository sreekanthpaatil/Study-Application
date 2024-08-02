import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./CommunityPage.module.css";
import { getCommunities, getUserCommunities } from "../../../api/api";

const CommunityPage = () => {
  const [currentTab, setCurrentTab] = useState("all");
  const [communites, setCommunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  let output = communites.map((community) => {
    const link = `/home/community/${community._id}`;
    return (
      <Link to={link} key={community._id} className={styles.community_item}>
        {community.title}
      </Link>
    );
  });

  useEffect(() => {
    setCommunities([]);
    const fetchCommunities = async () => {
      if (currentTab === "all")
        try {
          setIsLoading(true);
          const response = await getCommunities(
            localStorage.getItem("user_info")
          );

          if (response.status === 200) {
            setCommunities(response.data.communities);
            setIsLoading(false);
          }
        } catch (error) {
          console.log(error);
        }
      else if (currentTab === "user") {
        try {
          setIsLoading(true);
          const response = await getUserCommunities(
            currentUser._id,
            localStorage.getItem("user_info")
          );
          if (response.status === 200) {
            setCommunities(response.data.communities);
            setIsLoading(false);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchCommunities();
  }, [currentTab, currentUser._id]);

  if (communites.length === 0) {
    output = (
      <div className={styles.error_box}>
        <p className={styles.p_special}>No Communities Found</p>
      </div>
    );
  }

  const handleCreateCommunity = () => {
    navigate("/home/create-community");
  };

  return (
    <React.Fragment>
      <div className={styles.feed_posts_container}>
        <div className={styles.create_community}>
          <button
            className={styles.create_community_btn}
            onClick={handleCreateCommunity}
          >
            Create Commuity
          </button>
        </div>
        <div className={styles.community_tab_view}>
          <p
            onClick={() => setCurrentTab("user")}
            className={
              currentTab === "user"
                ? `${styles.selected} ${styles.community_tab_link}`
                : styles.community_tab_link
            }
          >
            Your Communities
          </p>
          <p
            onClick={() => setCurrentTab("all")}
            className={
              currentTab === "all"
                ? `${styles.selected} ${styles.community_tab_link}`
                : styles.community_tab_link
            }
          >
            All Communities
          </p>
        </div>

        <ul className={styles.communities_list}>
          {isLoading ? (
            <div className={styles.error_box}>
              <p className={styles.p_special}>Loading...</p>
            </div>
          ) : (
            output
          )}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default CommunityPage;