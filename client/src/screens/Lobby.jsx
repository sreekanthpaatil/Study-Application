import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Lobby.module.css";
import { useSocket } from "../context/SocketProvider";

const Lobby = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [role, setRole] = useState("student");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { username, room });
    },
    [username, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { username, room } = data;
      console.log(username, room);
      navigate(`/room/${room}?user=${username}&role=${role}`);
    },
    [navigate, role]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  });

  return (
    <div className={styles.lobby_page}>
      <div className={styles.lobby_container}>
        <h1 className={styles.lobby_header}>LOBBY</h1>
        <form className={styles.lobby_form} onSubmit={handleSubmit}>
          <div className={styles.form_section}>
            <label className={styles.form_label} htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className={styles.form_input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className={styles.form_section}>
            <label className={styles.form_label} htmlFor="room">
              Room Number
            </label>
            <input
              type="text"
              id="room"
              className={styles.form_input}
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>

          <div className={styles.form_section}>
            <label className={styles.form_label}>Role</label>
            <div className={styles.role_options}>
              <div className={styles.role_div}>
                <input
                  type="radio"
                  id="teacher"
                  name="role"
                  value="teacher"
                  checked={role === "teacher"}
                  onChange={() => setRole("teacher")}
                />
                <label htmlFor="teacher" className={styles.role_label}>
                  Teacher
                </label>
              </div>
              <div className={styles.role_div}>
                <input
                  type="radio"
                  id="student"
                  name="role"
                  value="student"
                  checked={role === "student"}
                  onChange={() => setRole("student")}
                />
                <label htmlFor="student" className={styles.role_label}>
                  Student
                </label>
              </div>
            </div>
          </div>

          <button type="submit" className={styles.form_submit_btn}>
            JOIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Lobby;