import React from 'react';

import styles from './selectSub.module.css';

const SelectSub = (props) => {
  return (
    <div className={styles.select_subs_container}>
      <h2 className={styles.subs_header}>
        Select the subjects you are interested in {props.action}ing...
      </h2>
      <div className={styles.subs_container}>
        {props.subjects?.map((subject, index) => (
          <button
            type="button"
            className={`${styles.sub_btn} ${
              props.actionSubjects.some((sub) => sub._id === subject._id)
                ? styles.selected
                : ''
            }`}
            key={index}
            onClick={() => props.handleSubjectClick(subject)}
          >
            {subject.name}
          </button>
        ))}
      </div>
      <div className={styles.select_subs_selected}>
        <h2 className={styles.subs_header}>Selected subjects:</h2>
        <div className={styles.sub_container}>
          {props.actionSubjects?.map((subject, index) => (
            <button
              type="button"
              className={styles.selected_sub_btn}
              key={index}
              onClick={() => props.handleSelectedClick(subject)}
            >
              {subject.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectSub;