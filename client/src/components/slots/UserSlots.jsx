import React, { useEffect, useState } from "react";

import styles from "./UserSlots.module.css";

import { getUserSlots, getUser, getSubjectFromId } from "../../api/api";

const UserSlots = () => {
  const [slots, setSlots] = useState([]);
  const [hasSlots, setHasSlots] = useState(false);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await getUserSlots(localStorage.getItem("user_info"));

        if (response.status === 200) {
          const fetchedSlots = [];
          console.log(response.data);

          for (let slot of response.data) {
            try {
              const user_response = await getUser(
                response.data.role === "teacher" ? slot.student : slot.teacher
              );

              if (user_response.status === 200) {
                slot = { ...slot, teacher: user_response.data.name };
              }

              const subject_response = await getSubjectFromId(
                slot.subject,
                localStorage.getItem("user_info")
              );

              if (subject_response.status === 200) {
                slot = { ...slot, subject: subject_response.data.subject.name };
              }

              slot = { ...slot, date: formatDate(slot.date) };

              fetchedSlots.push(slot);
            } catch (err) {
              console.log(err);
            }
          }

          fetchedSlots.sort((a, b) => new Date(a.date) - new Date(b.date));

          setSlots(fetchedSlots);
          setHasSlots(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSlots();
  }, []);

  return (
    <div className={styles.user_slots_page}>
      <div className={styles.slots_container}>
        <div className={styles.slots_header_container}>
          <h3 className={styles.slots_header}>YOUR UPCOMING SLOTS</h3>
        </div>
        {hasSlots ? (
          slots.length !== 0 ? (
            <ul className={styles.slots_list}>
              {slots.map((slot) => (
                <li
                  key={slot._id}
                  className={`${styles.slot_list_item} ${
                    slot.role === "teacher" ? styles.teacher : styles.student
                  }`}
                >
                  <h5 className={styles.slot_teacher}>
                    WITH: {slot.teacher} (
                    {slot.role === "teacher" ? "student" : "teacher"})
                  </h5>
                  <div className={styles.slot_topic_container}>
                    <p className={styles.slot_topic_text}>Topic: </p>
                    <div className={styles.slot_topic}>{slot.subject}</div>
                  </div>
                  <div className={styles.slot_box}>
                    <p className={styles.slot_text}>Date: {slot.date}</p>
                    <p className={styles.slot_text}>
                      Time: {`${slot.startTime} - ${slot.endTime}`}
                    </p>
                  </div>
                  <div className={styles.slot_box}>
                    <p className={styles.slot_text}>Room ID: {slot.roomId}</p>
                    <p className={styles.slot_text}>Role: {slot.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.loading}>No Slots Found!</p>
          )
        ) : (
          <p className={styles.loading}>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default UserSlots;