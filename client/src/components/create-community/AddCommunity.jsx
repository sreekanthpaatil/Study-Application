import React, { useState } from "react";

import styles from "./AddCommunity.module.css";
import { useSelector } from "react-redux";

import { createCommunity } from "../../api/api";
import { useNavigate } from "react-router-dom";

const AddCommunity = () => {
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const initialValues = {
    title: "",
    description: "",
    admin: [],
    members: [],
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const [createSuccess, setCreateSuccess] = useState(false);

  const resetForm = () => {
    setFormValues(initialValues);
  };

  const validateForm = () => {
    const errors = {};
    if (!formValues.title || formValues.title.trim().length < 5) {
      errors.title = "Community Name should be at least 5 characters long";
    }
    if (!formValues.description || formValues.description.trim().length < 30) {
      errors.description = "Description should be at least 30 characters long";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");

    const isFormValid = validateForm();
    console.log(isFormValid);
    if (isFormValid) {
      const data = {
        ...formValues,
      };
      const response = await createCommunity(
        data,
        localStorage.getItem("user_info")
      );

      if (response.status === 201) {
        resetForm();
        console.log(response?.data?.community);
        setCreateSuccess(true);
        setTimeout(() => {
          return navigate("/home/communities");
        }, 2000);
      } else {
        console.log(response);
      }
    }
  };

  return (
    <div className={styles.create_post_container}>
      <form
        method="POST"
        onSubmit={handleSubmit}
        className={styles.create_post_form}
      >
        <h3 className={styles.create_post_header}>CREATE A COMMUNITY</h3>

        <label className={styles.create_form_label}>
          Enter the Name of the community:
          <input
            type="text"
            value={formValues.title}
            onChange={(e) =>
              setFormValues({ ...formValues, title: e.target.value })
            }
          />
          {errors.title && (
            <p className={styles.error_message}>{errors.title}</p>
          )}
        </label>

        <label className={styles.create_form_label}>
          Enter a Short Description about the Community:
          <textarea
            value={formValues.description}
            onChange={(e) =>
              setFormValues({ ...formValues, description: e.target.value })
            }
          />
          {errors.description && (
            <p className={styles.error_message}>{errors.description}</p>
          )}
        </label>

        <div className={styles.admin_container}>
          <p>Current Admins: </p>
          <div className={styles.admin_box}>{currentUser.name}</div>
        </div>

        <div className={styles.form_btns_container}>
          <button type="submit" className={styles.form_submit_btn}>
            Create 
          </button>
          {createSuccess && <h3>Community Successfully created!</h3>}
        </div>
      </form>
    </div>
  );
};

export default AddCommunity;