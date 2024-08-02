import React, { useState } from "react";
import "./ProfileModal.css";

import { createPost } from "../../../api/api";

const NewPostModal = (props) => {
  const [contentType, setContentType] = useState("text"); // Content type state
  const [postContent, setPostContent] = useState({
    title: "",
    category: "",
    text: "",
  }); // Content data state

  const [fileContent, setFileContent] = useState({
    title: "",
    category: "",
    file: null,
  });
  const handleContentTypeChange = (type) => {
    setContentType(type); // Update content type state
  };

  // const handlePostContentChange = (content) => {
  //   setPostContent(content); // Update content data state
  // };

  const handlePost = async () => {
    // Submit post data to your backend service or API
    console.log("Posting: ", fileContent);
  };

  const handleCancel = () => {
    // Close the modal window
    // setShowModal(false)
    console.log("This is cancel");
  };

  return (
    <div className="new-post-modal">
      <h2 className="create-post">Create a New Post</h2>
      <div className="content-type-buttons">
        <button onClick={() => handleContentTypeChange("text")}>Text</button>
        <button onClick={() => handleContentTypeChange("image")}>Image</button>
        <button onClick={() => handleContentTypeChange("pdf")}>PDF</button>
      </div>
      {contentType === "text" && (
        <>
          <input
            placeholder="Title"
            value={postContent.title}
            onChange={(e) =>
              setPostContent({
                ...postContent,
                title: e.target.value,
              })
            }
          />
          <input
            placeholder="Category"
            value={postContent.category}
            onChange={(e) =>
              setPostContent({
                ...postContent,
                category: e.target.value,
              })
            }
          />
          <textarea
            placeholder="Write your post..."
            value={postContent.text}
            onChange={(e) =>
              setPostContent({
                ...postContent,
                text: e.target.value,
              })
            }
          />
        </>
      )}
      {contentType === "image" && (
        <>
          <input
            placeholder="Title"
            value={postContent.title}
            onChange={(e) =>
              setPostContent({
                ...postContent,
                title: e.target.value,
              })
            }
          />
          <input
            placeholder="Category"
            value={postContent.category}
            onChange={(e) =>
              setPostContent({
                ...postContent,
                category: e.target.value,
              })
            }
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setPostContent({
                ...postContent,
                text: e.target.value,
              })
            }
          />
        </>
      )}
      {contentType === "pdf" && (
        <>
          <input
            placeholder="Title"
            value={fileContent.title}
            onChange={(e) =>
              setFileContent({
                ...postContent,
                title: e.target.value,
              })
            }
          />
          <input
            placeholder="Category"
            value={fileContent.category}
            onChange={(e) =>
              setFileContent({
                ...postContent,
                category: e.target.value,
              })
            }
          />
          <input
            type="file"
            value={fileContent.file}
            onChange={(e) =>
              setFileContent({
                ...postContent,
                file: e.target.value,
              })
            }
          />
        </>
      )}

      <div className="buttons">
        <button onClick={() => handlePost()}>Post</button>
        <button onClick={props.onClick}>Cancel</button>
      </div>
    </div>
  );
};

export default NewPostModal;