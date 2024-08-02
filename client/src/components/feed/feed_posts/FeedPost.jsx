import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";

import styles from "./FeedPost.module.css";
import PostCard from "./PostCard";
import { useSelector } from "react-redux";
import { getUserByToken, getPosts } from "../../../../api/api";

const feed_posts = [
  {
    name: "Exploring Data Structures and Algorithms 🔥🔥",
    topic: ["DSA"],
    concepts: ["Arrays", "Linked Lists", "Recursion"],
    author: "codingMaster42",
    date: new Date("2023-04-10T09:30:00Z"),
    likes: 15,
    dislikes: 2,
    content:
      "Just dived into the world of Data Structures and Algorithms! 🚀 Today, I explored arrays, linked lists, and recursion. The journey has just begun! #coding #DSA. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin lacinia iaculis. Nulla scelerisque venenatis dolor sit amet rhoncus. Aenean ut aliquam lorem. Praesent tempor varius pretium. Pellentesque fermentum a massa eget eleifend. Praesent feugiat tellus quis ante commodo, quis suscipit sem bibendum. Nullam eu faucibus velit. Quisque in est pretium, aliquam eros quis, mattis eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac ultrices augue, eget pellentesque purus. Praesent purus tellus, aliquet at aliquam quis, laoreet a nunc. Phasellus sed consectetur velit. Aliquam gravida, ex sit amet congue ullamcorper, dui ex sodales augue, eget gravida nibh metus.",
  },
  {
    name: "Database Management Demystified",
    topic: ["DBMS"],
    concepts: ["Normalization", "SQL Queries", "Indexes"],
    author: "dataExplorer",
    date: new Date("2023-04-11T14:45:00Z"),
    likes: 20,
    dislikes: 1,
    content:
      "📊 Delving into the world of Database Management Systems! Explored normalization, wrote complex SQL queries, and learned about the magic of indexes. Feeling like a DBMS wizard! 🔍 #DBMS #SQL. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin lacinia iaculis. Nulla scelerisque venenatis dolor sit amet rhoncus. Aenean ut aliquam lorem. Praesent tempor varius pretium. Pellentesque fermentum a massa eget eleifend. Praesent feugiat tellus quis ante commodo, quis suscipit sem bibendum. Nullam eu faucibus velit. Quisque in est pretium, aliquam eros quis, mattis eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac ultrices augue, eget pellentesque purus. Praesent purus tellus, aliquet at aliquam quis, laoreet a nunc. Phasellus sed consectetur velit. Aliquam gravida, ex sit amet congue ullamcorper, dui ex sodales augue, eget gravida nibh metus.",
  },
  {
    name: "Understanding Computer Networks Basics",
    topic: ["CN"],
    concepts: ["TCP/IP", "Routing", "Subnetting"],
    author: "networkNinja",
    date: new Date("2023-04-12T11:15:00Z"),
    likes: 18,
    dislikes: 3,
    content:
      "🌐 Today's journey: Computer Networks! Explored TCP/IP, routing strategies, and even tried my hand at subnetting. Networking is fascinating! 💻 #ComputerNetworks #Networking. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin lacinia iaculis. Nulla scelerisque venenatis dolor sit amet rhoncus. Aenean ut aliquam lorem. Praesent tempor varius pretium. Pellentesque fermentum a massa eget eleifend. Praesent feugiat tellus quis ante commodo, quis suscipit sem bibendum. Nullam eu faucibus velit. Quisque in est pretium, aliquam eros quis, mattis eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac ultrices augue, eget pellentesque purus. Praesent purus tellus, aliquet at aliquam quis, laoreet a nunc. Phasellus sed consectetur velit. Aliquam gravida, ex sit amet congue ullamcorper, dui ex sodales augue, eget gravida nibh metus.",
  },
  {
    name: "Mastering Graph Theory",
    topic: ["DSA"],
    concepts: ["Graphs", "DFS", "BFS"],
    author: "graphGeek",
    date: new Date("2023-04-13T13:20:00Z"),
    likes: 25,
    dislikes: 0,
    content:
      "📈 Diving deep into Graph Theory! Explored graphs, implemented DFS and BFS algorithms. Graphs are not just nodes and edges; they're a fascinating world of connections! #GraphTheory #Algorithms. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin lacinia iaculis. Nulla scelerisque venenatis dolor sit amet rhoncus. Aenean ut aliquam lorem. Praesent tempor varius pretium. Pellentesque fermentum a massa eget eleifend. Praesent feugiat tellus quis ante commodo, quis suscipit sem bibendum. Nullam eu faucibus velit. Quisque in est pretium, aliquam eros quis, mattis eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac ultrices augue, eget pellentesque purus. Praesent purus tellus, aliquet at aliquam quis, laoreet a nunc. Phasellus sed consectetur velit. Aliquam gravida, ex sit amet congue ullamcorper, dui ex sodales augue, eget gravida nibh metus.",
  },
  {
    name: "Introduction to Relational Databases",
    topic: ["DBMS"],
    concepts: ["Relational Model", "Entity-Relationship Diagrams", "SQL"],
    author: "dataEnthusiast",
    date: new Date("2023-04-14T10:00:00Z"),
    likes: 22,
    dislikes: 1,
    content:
      "🗃️ Let's talk about Relational Databases! Explored the relational model, created Entity-Relationship Diagrams, and wrote SQL queries. The power of organizing data! #RelationalDatabases #SQL. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin lacinia iaculis. Nulla scelerisque venenatis dolor sit amet rhoncus. Aenean ut aliquam lorem. Praesent tempor varius pretium. Pellentesque fermentum a massa eget eleifend. Praesent feugiat tellus quis ante commodo, quis suscipit sem bibendum. Nullam eu faucibus velit. Quisque in est pretium, aliquam eros quis, mattis eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac ultrices augue, eget pellentesque purus. Praesent purus tellus, aliquet at aliquam quis, laoreet a nunc. Phasellus sed consectetur velit. Aliquam gravida, ex sit amet congue ullamcorper, dui ex sodales augue, eget gravida nibh metus.",
  },
];

const FeedPost = () => {
  const [userId, setUserId] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  let [feedPosts, setFeedPosts] = useState([]);

  useEffect(() => {
    async function fetchUserIdByToken() {
      if (currentUser) {
        try {
          const response = await getUserByToken(
            localStorage.getItem("user_info")
          );
          const userDetails = response.data;
          if (userDetails) {
            setUserId(userDetails._id);
            const response = await getPosts(localStorage.getItem("user_info"));
            const sorted_posts = response.data.posts.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setFeedPosts(sorted_posts);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log("No current user");
      }
    }
    fetchUserIdByToken();
  }, [currentUser, userId, setFeedPosts]);

  return (
    <React.Fragment>
      <div className={styles.feed_posts_container}>
        {feedPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      <button className={styles.add_post_btn}>
        <Link
          to={`/home/create-post/${userId}`}
          target="_blank"
          className={styles.add_btn_link}
        >
          <AddIcon sx={{ fontSize: "48px" }} />
        </Link>
      </button>
    </React.Fragment>
  );
};

export default FeedPost;