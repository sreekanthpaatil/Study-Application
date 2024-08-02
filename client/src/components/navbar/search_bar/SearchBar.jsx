import React, { useState, useEffect, useRef } from "react";
import styles from "./SearchBar.module.css";
import { getCommunityByName, getTeachers } from "../../../api/api";

import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";

const SearchBar = () => {
  const [searched, setSearched] = useState("");
  const [array, setArray] = useState([]);
  const [errors, setErrors] = useState({});

  const [filter, setFilter] = useState(null);

  const [isFocused, setIsFocused] = useState(false);

  const searchBarRef = useRef(null);

  const validate = () => {
    const errors = {};
    let isValid = true;

    if (searched.trim() === "" || searched.length === 0) {
      isValid = false;
      errors.search = "Please enter the text to be searched";
    }

    if (filter === null) {
      isValid = false;
      errors.filter = "Please select a filter";
    }

    setErrors(errors);
    return isValid;
  };

  const resetForm = () => {
    setSearched("");
    setFilter(null);
    setErrors({});
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleClickOutside = (e) => {
    if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
      setIsFocused(false);
    }
  };

  const handleTeachSearch = async () => {
    const token = localStorage.getItem("user_info");
    const response = await getTeachers(searched, token);
    setArray(response.data);
  };

  const handleCommunitySearch = async () => {
    const token = localStorage.getItem("user_info");
    const response = await getCommunityByName(searched, token);
    console.log(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (validate()) {
      switch (filter) {
        case "teach":
          handleTeachSearch();
          resetForm();
          break;
        case "community":
          handleCommunitySearch();
          resetForm();
          break;

        default:
          break;
      }
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.background_overlay} ${
          isFocused ? styles.search_form_focused : ""
        }`}
      ></div>
      <form
        className={` ${styles.search_form}
          ${
            isFocused
              ? `${styles.search_form_focused}`
              : `${styles.search_form}`
          }
        `}
        onSubmit={handleSubmit}
        onFocus={handleFocus}
      >
        <input
          type="text"
          placeholder="Search away..."
          className={styles.search_bar}
          value={searched}
          onChange={(e) => setSearched(e.target.value)}
        ></input>
        {errors.search && <p className={styles.error_msg}>{errors.search}</p>}

        {isFocused && (
          <div className={styles.advanced_filters}>
            <div className={styles.search_bar_controls}>
              <div
                className={styles.close_btn_container}
                onClick={() => setIsFocused(false)}
              >
                <CloseIcon
                  className={styles.close_icon_search}
                  onClick={() => setIsFocused(false)}
                />
              </div>
            </div>
            <div className={styles.display_results}>
              <div className={styles.select_mode_container}>
                <h3 className={styles.select_title}>Select a Filter: </h3>
                <ul className={styles.filter_options_list}>
                  <li
                    className={`${styles.filter} ${
                      filter === "user" ? styles.selected_filter : ""
                    }`}
                    onClick={() =>
                      setFilter((prevState) =>
                        prevState === null ? "user" : null
                      )
                    }
                  >
                    Peers
                  </li>
                  <li
                    className={`${styles.filter} ${
                      filter === "subject" ? styles.selected_filter : ""
                    }`}
                    onClick={() =>
                      setFilter((prevState) =>
                        prevState === null ? "subject" : null
                      )
                    }
                  >
                    Subjects
                  </li>
                  <li
                    className={`${styles.filter} ${
                      filter === "teach" ? styles.selected_filter : ""
                    }`}
                    onClick={() =>
                      setFilter((prevState) =>
                        prevState === null ? "teach" : null
                      )
                    }
                  >
                    Teachers for Subjects
                  </li>

                  <li
                    className={`${styles.filter} ${
                      filter === "community" ? styles.selected_filter : ""
                    }`}
                    onClick={() =>
                      setFilter((prevState) =>
                        prevState === null ? "community" : null
                      )
                    }
                  >
                    Communities
                  </li>
                </ul>
                {errors.filter && (
                  <p className={styles.error_msg}>{errors.filter}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={filter === null}
                className={styles.submit_btn}
              >
                SEARCH
              </button>

              <div className={styles.results_container}>
                {array.length !== 0 &&
                  array.map((ar) => (
                    <div key={ar._id} className={styles.result_container}>
                      <NavLink
                        to={`profile?uid=${ar._id}`}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          textDecoration: "none",
                        }}
                      >
                        <div className={styles.search_name}> {ar.name}</div>
                      </NavLink>
                      <div className={styles.search_rating}>
                        Rating:{ar.teachRating}⭐
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;