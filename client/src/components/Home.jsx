import React, { useState } from "react";
import Schedule from "./ScheduleGenerate/Schedule";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const handleSchedule = (task) => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };
  return (
    <div>
      {showModal && (
        <Schedule
          onClose={() => handleModalClose()} // Close the Schedule modal
        />
      )}
      <div onClick={() => handleSchedule()}>Schedule</div>
    </div>
  );
};

export default Home;