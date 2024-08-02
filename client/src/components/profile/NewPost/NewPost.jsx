import React, { useState } from "react";
import "./NewPost.css";
import profilephoto from "../../../assets/profilephoto.png";

import NewPostModal from "../Modal/ProfileModal";

function NewPost() {
  const [showModal, setShowModal] = useState(false);

  function startpost() {
    setShowModal(true);
  }

  return (
    <div className="Newpost">
      <img src={profilephoto} alt="" className="profilephoto" />
      <div className="start-post" onClick={startpost}>
        Start Typing...
      </div>
      {showModal && <NewPostModal onClick={() => setShowModal(false)} />}
    </div>
  );
}

export default NewPost;