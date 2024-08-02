import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./SlotBooking.module.css";

import { getUser, getSubjectFromId } from "../../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { createSlot } from "../../api/api";

const SlotBooking = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const userId = params.get("uid");

  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
    "6:00 PM - 7:00 PM",
    "7:00 PM - 8:00 PM",
    "8:00 PM - 9:00 PM",
    "9:00 PM - 10:00 PM",
  ];

  const [selectedDate, setSelectedDate] = useState(null);
  const [hasUserDetails, setHasUserDetails] = useState(false);
  const [user, setUser] = useState(null);
  const [teachSubs, setTeachSubs] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTime, setSelectedTime] = useState("4:00 PM - 5:00 PM");

  const [errors, setErrors] = useState({});
  const [slotSuccess, setSlotSuccess] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user_response = await getUser(userId);

        if (user_response.status === 200) {
          setHasUserDetails(true);
          setUser(user_response.data);

          const newTeachSubs = [];
          for (let i = 0; i < user_response.data.teachSub.length; i++) {
            const subject = user_response.data.teachSub[i];
            const subject_response = await getSubjectFromId(
              subject,
              localStorage.getItem("user_info")
            );

            if (subject_response.status === 200) {
              newTeachSubs.push(subject_response.data.subject);
            }
          }
          setTeachSubs(newTeachSubs);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [userId]);

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!user._id || !currentUser._id) {
      errors.user = "Error fetching user details. Please retry";
      isValid = false;
    }

    if (selectedSubject === null) {
      errors.subject = "Please select a subject for the session";
      isValid = false;
    }

    if (selectedTime === null) {
      errors.time = "Please select a suitable time for the slot";
      isValid = false;
    }

    if (selectedDate === null) {
      errors.date = "Please select a suitable date";
      isValid = false;
    } else if (selectedDate < new Date()) {
      errors.date = "Selected date cannot be in the past.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const resetForm = () => {
    setErrors({});
    setSelectedDate(null);
    setSelectedSubject(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const [startTime, endTime] = selectedTime.split(" - ");

      const slot = {
        teacher: user._id,
        student: currentUser._id,
        date: selectedDate,
        subject: selectedSubject,
        startTime: startTime,
        endTime: endTime,
      };

      try {
        const response = await createSlot(
          slot,
          localStorage.getItem("user_info")
        );

        if (response.status === 500 || response.status === 400) {
          console.log("Something went wrong!");
        }

        if (response.status === 201) {
          setSlotSuccess(true);
          resetForm();

          setTimeout(() => {
            return navigate("/home");
          }, 5000);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={styles.page}>
      {hasUserDetails ? (
        <form
          method="POST"
          onSubmit={handleSubmit}
          className={styles.container}
        >
          <div className={styles.header}>Book Your Slot</div>
          <div className={styles.teachearInfo}>
            <div className={styles.teachearName}>
              <h4>
                Teacher Name: <span>{user.name}</span>
              </h4>
              {errors.user && <p className={styles.error_msg}>{errors.user}</p>}
            </div>
            <div className={styles.teachearSubject}>
              Subjects they teach:
              <ul className={styles.subjects_list}>
                {teachSubs.map((sub) => (
                  <li
                    key={sub._id}
                    className={`${styles.subject_container} ${
                      selectedSubject === sub._id ? styles.selected_subject : ""
                    }`}
                    onClick={() =>
                      setSelectedSubject((prevState) =>
                        prevState === sub._id ? null : sub._id
                      )
                    }
                  >
                    {sub.name}
                  </li>
                ))}
              </ul>
              {errors.subject && (
                <p className={styles.error_msg}>{errors.subject}</p>
              )}
            </div>
          </div>

          <div className={styles.datePicker}>
            <label>Select Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
            />
            {errors.date && <p className={styles.error_msg}>{errors.date}</p>}
          </div>

          <div className={styles.slotsContainer}>
            Select Slot Time:
            <div className={styles.slots}>
              {timeSlots.map((slot) => (
                <div
                  key={slot}
                  className={`${styles.slotTime} ${styles.available} ${
                    selectedTime === slot && styles.selected_time
                  }`}
                  onClick={() => setSelectedTime(slot)}
                >
                  {slot}
                </div>
              ))}
            </div>
            {errors.time && <p className={styles.error_msg}>{errors.time}</p>}
          </div>

          <div className={styles.btnContainer}>
            <button type="submit" className={styles.btn}>
              Book
            </button>
          </div>

          <div className={styles.message_box}>
            {slotSuccess && (
              <p className={styles.success_msg}>
                Slot booked successfully. Check your dashboard for more details.
              </p>
            )}
          </div>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SlotBooking;