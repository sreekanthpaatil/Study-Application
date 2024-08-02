import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import React, { useState } from 'react';
import styles from './schedule.module.css';
import { generateSchedule } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const Schedule = () => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    t_days: 0,
    hoursPerDay: 0,
    sessionLength: '',
  });
  const [selectedType, setSelectedType] = useState('');
  const [schedule, setSchedule] = useState([]);

  const handleTypeSelection = (type) => {
    setSelectedType(type);
    setInputValues({ ...inputValues, sessionLength: type });
  };

  const handleGenerate = async () => {
    setInputValues({
      ...inputValues,
      t_days: Number(inputValues.t_days),
      hoursPerDay: Number(inputValues.hoursPerDay),
    });
    const response = await generateSchedule(
      inputValues,
      localStorage.getItem('user_info')
    );
    console.log(response);
    setSchedule(response.data);
  };

  const onClose = () => {
    navigate('/home');
  };

  return (
    <div className={styles.mainPage}>
      <div className={styles.container}>
        <div className={styles.modal}>
          <div className={styles.borderContainer}>
            <div className={styles.heading}>Generate Schedule</div>
            <div className={styles.closeContainer} onClick={() => onClose()}>
              {/* <CloseRoundedIcon style={{ fontSize: "24px" }} /> */}x
            </div>
            <div className={styles.noContainer}>
              <input
                type="number"
                placeholder="Total no of days"
                min="0"
                max="60"
                className={styles.inputBox}
                value={inputValues.t_days === 0 ? '' : inputValues.t_days}
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    t_days: parseInt(e.target.value),
                  })
                }
              />
              <input
                type="number"
                placeholder="Hours per day"
                min="4"
                max="10"
                className={styles.inputBox}
                value={
                  inputValues.hoursPerDay === 0 ? '' : inputValues.hoursPerDay
                }
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    hoursPerDay: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div className={styles.schedule_text}>Choose type of session:</div>
            <div className={styles.noContainer}>
              <btn
                className={`${styles.schedule_btn} ${
                  selectedType === '30min' ? `${styles.selected}` : ''
                }`}
                onClick={() => handleTypeSelection('30min')}
              >
                30 min
              </btn>
              <btn
                className={`${styles.schedule_btn} ${
                  selectedType === '60min' ? `${styles.selected}` : ''
                }`}
                onClick={() => handleTypeSelection('60min')}
              >
                60 min
              </btn>
            </div>
            <btn
              className={`${styles.schedule_btn} ${styles.generate_btn}`}
              onClick={() => handleGenerate()}
            >
              Generate
            </btn>
            <div className={styles.scheduleContainer}>
              {schedule.map((day, index) => (
                <Accordion key={index}>
                  <AccordionSummary>Day {day.day}</AccordionSummary>
                  <AccordionDetails className={styles.sessions}>
                    {day.sessions.map((session, index) => (
                      <div
                        key={index}
                        className={styles.session}
                        style={{
                          background:
                            session.type === 'Recap/Revision'
                              ? '#87eeee'
                              : '#f8deb1',
                        }}
                      >
                        <div className={styles.type}>{session.type}</div>
                        <div>
                          {session.time.map((t) => {
                            return <p key={t}>{t}</p>;
                          })}
                        </div>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;