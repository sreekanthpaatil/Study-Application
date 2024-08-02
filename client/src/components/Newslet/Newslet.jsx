// Newslet.jsx
import React, { useEffect, useState } from 'react';
import Logo from '../../assets/LearnEarnTeach.png';
import { getNews } from '../../api/api';
import styles from './Newslet.module.css';
import { Link } from 'react-router-dom';

const Newslet = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getNewsLet = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('user_info');
        const response = await getNews(token);
        setEvents(response.data.events);
        setIsLoading(false);
        console.log(response);
      } catch (error) {
        console.error('Error fetching news:', error);
        // Handle error (e.g., display a message to the user)
      }
    };
    getNewsLet();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.newslet}>
        <h2>Getting AWESOME Events for you!</h2>
      </div>
    );
  }

  return (
    <div className={styles.newslet}>
      <div className={styles.newslet_heading}>EVENTS</div>
      <div className={styles.newslet_container}>
        {events.map((event, index) => (
          <div key={index} className={styles.news_box}>
            <div className={styles.news_heading}>{event.headline}</div>
            <div className={styles.news_desc}>{event.description}</div>
            <button type="button" className={styles.news_btn}>
              <Link
                className={styles.news_link}
                to={event.link}
                target="_blank"
              >
                Read more
              </Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Newslet;