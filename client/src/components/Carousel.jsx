import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import peer2peer from "../assets/peer2peer.jpg";
import plearning from "../assets/plearning.jpg";
import qa from "../assets/qa.jpg";
import rewards from "../assets/rewards.jpg";
import feed from "../assets/feed.jpg";
import AnimatedPage from "./AnimatedPage";

import styles from "./Carousel.module.css";

export default function Carousel() {
  let settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };
  return (
    <AnimatedPage>
      <div className={styles.carousel_section}>
        <h1 className={styles.carousel_header}>WHAT WE OFFER?</h1>

        <Slider {...settings}>
          <div className={styles.carousel_card}>
            <div className={styles.carousel_card_content}>
              <h1 className={styles.carousel_card_title}>PEER-2-PEER</h1>
              <p className={styles.carousel_card_desc}>
                A platform that embodies the peer-to-peer concept in education.
                <br /> We facilitate direct interaction among students, enabling
                them to teach, learn, and collaborate with their peers.
              </p>
            </div>
            <div className={styles.carousel_img_container}>
              <img
                className={styles.carousel_card_img}
                src={peer2peer}
                alt="carousel-img"
              />
            </div>
          </div>
          <div className={styles.carousel_card}>
            <div className={styles.carousel_card_content}>
              <h1 className={styles.carousel_card_title}>
                PERSONALISED LEARNING
              </h1>
              <p className={styles.carousel_card_desc}>
                Focus on teaching the concepts you excel at and explore the
                concepts you desire to learn, without being constrained by
                entire subjects or chapters.
              </p>
            </div>
            <div className={styles.carousel_img_container}>
              <img
                className={styles.carousel_card_img}
                src={plearning}
                alt="carousel-img"
              />
            </div>
          </div>
          <div className={styles.carousel_card}>
            <div className={styles.carousel_card_content}>
              <h1 className={styles.carousel_card_title}>REWARD POINTS</h1>
              <p className={styles.carousel_card_desc}>
                Earn recognition for your commitment to the learning community
                and stay motivated on your educational journey. The more you
                engage, the more points you earn, unlocking exciting rewards and
                enhancing your learning experience.
              </p>
            </div>
            <div className={styles.carousel_img_container}>
              <img
                className={styles.carousel_card_img}
                src={rewards}
                alt="carousel-img"
              />
            </div>
          </div>
          <div className={styles.carousel_card}>
            <div className={styles.carousel_card_content}>
              <h1 className={styles.carousel_card_title}>FEED</h1>
              <p className={styles.carousel_card_desc}>
                Experience a comprehensive feed designed for our collaborative
                community.Access a wealth of study materials,engage in
                insightful discussions, and seek clarification for any doubts
                you may have.Stay connected with fellow learners, share
                resources, and foster a vibrant learning environment.Our
                platform brings together all the essential elements for
                effective collaboration, enabling you to learn, grow, and excel
                together. Join us and unlock the full potential of our
                collaborative community feed
              </p>
            </div>
            <div className={styles.carousel_img_container}>
              <img
                className={styles.carousel_card_img}
                src={feed}
                alt="carousel-img"
              />
            </div>
          </div>

          <div className={styles.carousel_card}>
            <div className={styles.carousel_card_content}>
              <h1 className={styles.carousel_card_title}>ASK A QUESTION</h1>
              <p className={styles.carousel_card_desc}>
                Questions? We've got answers! We're here to assist you with
                concepts, topics, and any doubts you may have. Don't hesitate to
                reach out for guidance and support on your learning journey.
              </p>
            </div>
            <div className={styles.carousel_img_container}>
              <img
                className={styles.carousel_card_img}
                src={qa}
                alt="carousel-img"
              />
            </div>
          </div>
        </Slider>
      </div>
    </AnimatedPage>
  );
}