import { useEffect, useState } from "react";
import styles from "./ProfileCard.module.css";

import { getUserSubjects } from "../../../api/api.js";

function ProfileCard({ user }) {
  const [studySub, setStudySub] = useState([]);
  const [teachSub, setTeachSub] = useState([]);

  useEffect(() => {
    const fetchUserSubs = async () => {
      try {
        const response = await getUserSubjects(
          localStorage.getItem("user_info")
        );

        if (response.status === 200) {
          const studySubjects = [];
          const teachSubjects = [];

          for (const subject of response.data.studySubjects) {
            studySubjects.push(subject.name);
          }

          for (const subject of response.data.teachSubjects) {
            teachSubjects.push(subject.name);
          }

          setStudySub(studySubjects);
          setTeachSub(teachSubjects);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserSubs();
  }, []);

  return (
    <>
      <div className={styles.card_container}>
        <div className={styles.user_text}>
          <h3 className={styles.user_name}>{user.name}</h3>
          <h6 className={styles.user_email}>{user.email}</h6>
          <h5 className={styles.user_branch}>{user.branch}</h5>
          <p className={styles.user_bio}>
            Fueled by a passion for Learning,
            <br />
            I&apos;m an Engineering student{" "}
          </p>
        </div>

        <div className={styles.skills_container}>
          <div className={styles.skills}>
            <h3 className={styles.heading}>Teaches:</h3>
            {teachSub.length !== 0 ? (
              <ul className={styles.courses}>
                {teachSub.map((course, index) => (
                  <li className={styles.course_list} key={index}>
                    {course}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.user_bio}>Loading...</p>
            )}
          </div>
          <div className={styles.vertical_line}></div>
          <div className={styles.skills}>
            <h3 className={styles.heading}>Studies:</h3>
            {studySub.length !== 0 ? (
              <ul className={styles.courses}>
                {studySub.map((course, index) => (
                  <li className={styles.course_list} key={index}>
                    {course}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.user_bio}>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;