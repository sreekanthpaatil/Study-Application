import React, { useEffect, useState } from 'react';

import styles from './ConfigureLayout.module.css';

import ConfigureNav from './ConfigureNav';
import SelectSub from './configure_pages/SelectSub';

import { getSubjects } from '../../api/api';
import { addSubjects } from '../../api/api';
import { getUserSubjects } from '../../api/api';
import { Link } from 'react-router-dom';

const ConfigureLayout = () => {
  const [actionPage, setActionPage] = useState('study');
  const [activeStep, setActiveStep] = useState(0);
  const [finish, setFinish] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const [subjects, setSubjects] = useState([]);
  const [studiesSubject, setStudiesSubject] = useState([]);
  const [teachesSubject, setTeachesSubject] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await getSubjects(localStorage.getItem('user_info'));
      setSubjects(response?.data?.subjects);
      console.log(response);
    };
    const fetchUserSubjects = async () => {
      const response = await getUserSubjects(localStorage.getItem('user_info'));
      if (response.status === 200) {
        console.log(response);
        setStudiesSubject(response?.data?.studySubjects);
        setTeachesSubject(response?.data?.teachSubjects);
      }
    };
    fetchSubjects();
    fetchUserSubjects();
  }, []);

  const handleStudyCardClick = (subject) => {
    const subjectId = subject._id;
    if (studiesSubject.some((sub) => sub._id === subjectId)) {
      setStudiesSubject(studiesSubject.filter((sub) => sub !== subject));
    } else {
      setStudiesSubject([...studiesSubject, subject]);
    }
    console.log(studiesSubject);
  };

  const handleTeachCardClick = (subject) => {
    const subjectId = subject._id;
    if (teachesSubject.some((sub) => sub._id === subjectId)) {
      setTeachesSubject(teachesSubject.filter((sub) => sub !== subject));
    } else {
      setTeachesSubject([...teachesSubject, subject]);
    }
    console.log(teachesSubject);
  };

  const handleSelectedStudyClick = (subject) => {
    const subjectId = subject._id;
    if (studiesSubject.some((sub) => sub._id === subjectId)) {
      setStudiesSubject(studiesSubject.filter((sub) => sub !== subject));
    }
  };

  const handleSelectedTeachClick = (subject) => {
    const subjectId = subject._id;
    if (teachesSubject.some((sub) => sub._id === subjectId)) {
      setTeachesSubject(teachesSubject.filter((sub) => sub !== subject));
    }
  };

  const handleChangeActionPage = (action) => {
    setActionPage(action);
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('user_info');
      const response = await addSubjects(
        { studySub: studiesSubject, teachSub: teachesSubject },
        token
      );

      if (response.status === 201) {
        console.log('ADDING SUBJECTS SUCCESSFUL');

        setIsUpdated(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let currPage;

  if (activeStep === 0) {
    currPage = (
      <SelectSub
        action={'study'}
        subjects={subjects}
        actionSubjects={studiesSubject}
        handleSubjectClick={handleStudyCardClick}
        handleSelectedClick={handleSelectedStudyClick}
      />
    );
  } else if (activeStep === 1) {
    currPage = (
      <SelectSub
        action={'teach'}
        subjects={subjects}
        actionSubjects={teachesSubject}
        handleSubjectClick={handleTeachCardClick}
        handleSelectedClick={handleSelectedTeachClick}
      />
    );
  }

  return (
    <div className={styles.layout_container}>
      <ConfigureNav
        currPage={actionPage}
        changePage={handleChangeActionPage}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        studySubjects={studiesSubject}
        teachSubjects={teachesSubject}
        setStudySubjects={setStudiesSubject}
        setTeachSubject={setTeachesSubject}
        setFinish={setFinish}
      />
      {finish && (
        <div className={styles.configure_action_btns_container}>
          {!isUpdated && (
            <button className={styles.update_btn} onClick={handleUpdateProfile}>
              UPDATE PROFILE
            </button>
          )}
          {isUpdated && (
            <div className={styles.complete_btns_container}>
              <p className={styles.update_message}>UPDATED YOUR PROFILE</p>
              <button type="button" className={`${styles.update_btn}`}>
                <Link to="/home" className={styles.home_link_text}>
                  GO TO HOME
                </Link>
              </button>
            </div>
          )}
        </div>
      )}
      {!isUpdated && currPage}
    </div>
  );
};

export default ConfigureLayout;