import React from "react";
import AnimatedPage from "./AnimatedPage";

import styles from "./Section3.module.css";

export default function Section3() {
  return (
    <AnimatedPage>
      <section className={styles.about_section}>
        <h1 className={styles.about_header}>ABOUT US</h1>
        <p className={styles.about_desc}>
          LET is a dynamic peer-to-peer learning platform where students come
          together to teach and learn from each other. Our platform facilitates
          direct interactions, enabling students to connect, collaborate, and
          engage in a vibrant educational environment. By actively participating
          in discussions, sharing knowledge, and learning from one another,
          you'll deepen your understanding and acquire valuable insights. Join
          our diverse community of learners, experience the power of
          collaborative learning, and embark on an exciting educational journey
          where students become both teachers and lifelong learners. Welcome to
          LET, where peer-to-peer education thrives.
        </p>
      </section>
    </AnimatedPage>
  );
}