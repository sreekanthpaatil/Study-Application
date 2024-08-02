import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

import styles from "./PostCard.module.css";
import Btn02 from "../../../../ui/Btn_02";
import Btn03 from "../../../../ui/Btn_03";

import { getSubjectFromId, getUser } from "../../../../api/api";
import { Link } from "react-router-dom";

const PostCard = (props) => {
  const { currentUser } = useSelector((state) => state.user);

  const [isShowLess, setIsShowLess] = useState(true);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const { category, creator, createdAt } = props.post;

  const [username, setUsername] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUser(creator);
        if (!response.status === 200) {
          setUsername("Unknown");
        } else {
          setUsername(response?.data?.name);
        }

        const categoryNames = await Promise.all(
          category.map(async (id) => {
            const response = await getSubjectFromId(
              id,
              localStorage.getItem("user_info")
            );
            if (response.status !== 200) {
              return "Unknown";
            } else {
              return response.data.subject.name;
            }
          })
        );
        setCategories(categoryNames);
      } catch (error) {
        console.log(`Error in Post Card: ${error}`);
      }
    };

    fetchData();
  }, [category, creator]);

  const opinionHandler = (opinion) => {
    if (opinion === "like") {
      setLike((prevState) => !prevState);
      setDislike((prevState) => !!prevState);
    }
    if (opinion === "dislike") {
      setLike((prevState) => !!prevState);
      setDislike((prevState) => !prevState);
    }
  };

  const toggleShowHandler = () => {
    setIsShowLess((prevState) => !prevState);
  };

  const showBtnContent = (
    <p className={styles.show_content}>{`Show ${
      isShowLess ? "More" : "Less"
    }...`}</p>
  );

  const likeClasses = `${
    like ? "fa-solid fa-thumbs-up liked" : "fa-solid fa-thumbs-up"
  }`;
  const dislikeClasses = `${
    dislike ? "fa-solid fa-thumbs-down disliked" : "fa-solid fa-thumbs-down"
  }`;

  const content = (
    <div>
      <div
        className={`${styles.post_content} ${
          isShowLess ? styles.post_content_less : styles.post_content_more
        }`}
      >
        <div>
          <p className={styles.content_text}>{props.post.text}</p>
        </div>
      </div>
      <div className={`${isShowLess ? styles.background : ""}`}></div>
    </div>
  );

  // const handleTopic = (topic) => {
  //   navigate(`/topic/${topic}`);
  // };

  // const handleConcept = (concept) => {
  //   navigate(`/topic/${topic}?${concept}`);
  // };

  const topics = (
    <div className={styles.post_topics}>
      {categories.map((topic) => (
        <Btn02 key={topic}>{topic}</Btn02>
      ))}
    </div>
  );

  const concepts = (
    <div className={styles.post_concepts}>
      {props.post.concepts.map((concept) => (
        <Btn03 key={concept}>{concept}</Btn03>
      ))}
    </div>
  );

  const dateObj = new Date(createdAt);

  const date = {
    month: dateObj.toLocaleString("en-US", { month: "long" }),
    day: dateObj.toLocaleString("en-US", { day: "2-digit" }),
    year: dateObj.getFullYear(),
  };

  return (
    <React.Fragment>
      <div className={styles.post_card}>
        <div className={styles.post_header}>
          <h4 className={styles.post_title}>{props.post.title}</h4>
        </div>
        <div className={styles.post_details}>
          <div className={styles.post_tags}>
            {topics}
            {concepts}
          </div>
          <div className={styles.post_public}>
            <div className={styles.post_author}>
              <Link
                to={`/home/profile?uid=${creator}`}
                className={styles.author_name}
              >
                {username}
              </Link>
            </div>
            <div className={styles.post_date}>
              <p className={styles.date}>
                {`${date.day} ${date.month} ${date.year}`}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <p className={styles.formatted_text}>{content}</p>
          <Btn02 onClick={toggleShowHandler}>{showBtnContent}</Btn02>
        </div>
        <div className={styles.post_ratings}>
          <div className={styles.ratings_section}>
            <div className={styles.post_stats}>
              <ThumbUpIcon
                style={{ color: "white" }}
                onClick={() => opinionHandler("like")}
              />
              {props.post.likes}
            </div>
            <div className={styles.post_stats}>
              <ThumbDownIcon
                style={{ color: "white" }}
                onClick={() => opinionHandler("dislike")}
              />
              {props.post.dislikes}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PostCard;