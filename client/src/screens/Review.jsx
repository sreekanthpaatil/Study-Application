import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

import { updateTeachRating } from "../api/api";

import styles from "./Review.module.css";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const Review = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const user = params.get("user");
  const role = params.get("role");

  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);

  //   const handleRating = async () => {
  //     try {
  //       const token = localStorage.getItem("user_info");
  //       const response = await updateTeachRating(token, {teacher})
  //     } catch {}
  //   };

  return (
    <div className={styles.call_review_page}>
      <div className={styles.call_review_container}>
        <div className={styles.call_review_header_container}>
          <h1 className={styles.call_review_header}>
            PLEASE REVIEW THE SESSION!
          </h1>
        </div>

        <div className={styles.call_review_content}>
          <p
            className={styles.call_review_para}
          >{`Please review ${user} as a ${role}`}</p>
          <div className={styles.call_review_ratings}>
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                size="large"
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
              )}
            </Box>
          </div>
          <div className={styles.redirect_home_btn_container}>
            <button type="button" className={styles.redirect_home_btn}>
              <Link to="/home" className={styles.redirect_link_call}>
                GO TO HOME
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;