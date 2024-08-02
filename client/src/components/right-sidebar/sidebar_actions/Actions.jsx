import React from "react";

import styles from "./Actions.module.css";
import Action from "./Action";

const Actions = () => {
  const actions = [
    { name: "Join a Room", id: "action4", path: "/home/lobby" },
    { name: "NewsLET", id: "action5", path: "/home/newslet" },
    { name: "Schedule Generator", id: "action6", path: "/home/schedule" },
    { name: "Your Slots", id: "action7", path: "/home/user-slots" },
  ];

  return (
    <React.Fragment>
      <div className={styles.actions_section}>
        <ul className={styles.actions_list}>
          {actions.map((action) => [
            <Action name={action.name} key={action.id} path={action.path}>
              {action.name}
            </Action>,
          ])}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Actions;