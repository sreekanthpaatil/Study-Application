import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { signin, signup } from "../../api/api";
import { getUserByToken } from "../../api/api";

import styles from "./AuthenticateForm.module.css";
import { Link } from "react-router-dom";
import { loginSuccess } from "../../redux/userSlice";

const Signup = () => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  const initialValues = {
    name: "",
    email: "",
    instituteEmail: "",
    dob: "",
    gender: "",
    phone: "",
    city: "",
    programme: "",
    branch: "",
    password: "",
  };
  const initialErrors = {
    name: false,
    email: false,
    instituteEmail: false,
    dob: false,
    gender: false,
    phone: false,
    city: false,
    programme: false,
    branch: false,
    password: false,
  };

  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);
  const [userId, setUserId] = useState(null);

  const formRef = useRef(null);

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialErrors);
  const [formIsValid, setFormIsValid] = useState(false);

  const resetForm = () => {
    setFormValues(initialValues);
    setFormErrors(initialErrors);
  };

  const validate = (values) => {
    const errors = {};
    let flag = true;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Name is required!";
      flag = false;
    }
    if (!values.instituteEmail) {
      errors.instituteEmail = " Institute Email is required!";
      flag = false;
    } else if (!regex.test(values.instituteEmail)) {
      errors.instituteEmail = "This is not a valid email format!";
      flag = false;
    }
    if (!values.dob) {
      errors.dob = "Date of dob is required!";
      flag = false;
    }
    if (!values.gender) {
      errors.gender = "Gender is required!";
      flag = false;
    }
    if (!values.phone) {
      errors.phone = "Phone is required!";
      flag = false;
    } else if (values.phone.length !== 10) {
      errors.phone = "Invalid Phone Number";
      flag = false;
    }
    if (!values.city) {
      errors.city = "City is required!";
      flag = false;
    }
    if (!values.programme) {
      errors.programme = "Programme is required!";
      flag = false;
    }
    if (!values.branch) {
      errors.branch = "Branch is required!";
      flag = false;
    }
    if (!values.email) {
      errors.email = "Email is required!";
      flag = false;
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
      flag = false;
    }
    if (!values.password) {
      errors.password = "Password is required!";
      flag = false;
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
      flag = false;
    } else if (values.password.length > 20) {
      errors.password = "Password cannot exceed more than 20 characters";
      flag = false;
    }

    if (values.email === "exists") {
      errors.email = "User already exists.";
      flag = false;
    }

    if (flag) setFormIsValid(true);

    return errors;
  };

  useEffect(() => {
    async function fetchUserIdByToken() {
      if (currentUser) {
        try {
          const response = await getUserByToken(
            localStorage.getItem("user_info")
          );
          const userDetails = response.data;
          console.log(userDetails);
          if (userDetails) {
            setUserId(userDetails._id);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    fetchUserIdByToken();
    if (currentUser) setLogin(true);
  }, [currentUser, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (formIsValid) {
      try {
        const response = await signup(formValues);

        if (response.status === 201) {
          console.log("REGISTRATION SUCCESSFUL");
          setRegister(true);

          const loginResponse = await signin({
            email: formValues.email,
            password: formValues.password,
          });

          if (loginResponse.status === 200) {
            console.log("LOG IN SUCCESSFUL");

            dispatch(loginSuccess(loginResponse.data));
            setLogin(true);
            resetForm();
          }
        }
      } catch (error) {
        if (error.message) {
          if (
            error.response.status === 401 &&
            error.response.data.message === "User already exists."
          ) {
            const errors = { ...formValues, email: "exists" };
            setFormErrors(validate(errors));
          }
        } else {
          console.log(error);
        }
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      className={styles.authenticate_form}
    >
      <div className={styles.authenticate_inputs}>
        <div className={styles.authenticate_input_container}>
          <label className={styles.authenticate_label} htmlFor="name">
            Enter your Full Name:
          </label>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={(e) =>
              setFormValues({ ...formValues, name: e.target.value })
            }
            placeholder="Name"
            className={styles.authenticate_input}
          />
          {formErrors.name && (
            <p className={styles.authentication_errors}>{formErrors.name}</p>
          )}
        </div>
        <div className={styles.authenticate_input_container}>
          <label className={styles.authenticate_label} htmlFor="instituteEmail">
            Enter your Institute E-mail ID:
          </label>

          <input
            type="email"
            name="instituteEmail"
            placeholder="Instituition Mail"
            value={formValues.instituteEmail}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                instituteEmail: e.target.value,
              })
            }
            className={styles.authenticate_input}
          />
          {formErrors.instituteEmail && (
            <p className={styles.authentication_errors}>
              {formErrors.instituteEmail}
            </p>
          )}
        </div>
        <div className={styles.authenticate_input_container}>
          <label className={styles.authenticate_label} htmlFor="dob">
            Enter your Date of Birth:
          </label>

          <input
            type="Date"
            name="dob"
            placeholder="DOB"
            value={formValues.dob}
            onChange={(e) =>
              setFormValues({ ...formValues, dob: e.target.value })
            }
            className={styles.authenticate_input}
          />
          {formErrors.dob && (
            <p className={styles.authentication_errors}>{formErrors.dob}</p>
          )}
        </div>
        <div className={styles.authenticate_input_container}>
          <label className={styles.authenticate_label} htmlFor="gender">
            Enter your Gender:
          </label>

          <div className={styles.authenticate_radio}>
            <label className={styles.radio_label}>
              <input
                type="radio"
                name="gender"
                checked={formValues.gender === "Male"}
                value="Male"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    gender: e.target.value,
                  })
                }
                className={styles.authenticate_radio_input}
              />
              <p className={styles.radio_input_label}>Male</p>
            </label>
            <label className={styles.radio_label}>
              <input
                type="radio"
                name="gender"
                checked={formValues.gender === "Female"}
                value="Female"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    gender: e.target.value,
                  })
                }
                className={styles.authenticate_radio_input}
              />
              <p className={styles.radio_input_label}>Female</p>
            </label>
            <label className={styles.radio_label}>
              <input
                type="radio"
                name="gender"
                checked={formValues.gender === "Other"}
                value="Other"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    gender: e.target.value,
                  })
                }
                className={styles.authenticate_radio_input}
              />
              <p className={styles.radio_input_label}>Other</p>
            </label>
          </div>
          {formErrors.gender && (
            <p className={styles.authentication_errors}>{formErrors.gender}</p>
          )}
        </div>
        <div className={styles.authenticate_input_container}>
          <label className={styles.authenticate_label} htmlFor="phone">
            Enter your Phone No.:
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="Phone No."
            value={formValues.phone}
            onChange={(e) =>
              setFormValues({ ...formValues, phone: e.target.value })
            }
            className={styles.authenticate_input}
          />
          {formErrors.phone && (
            <p className={styles.authentication_errors}>{formErrors.phone}</p>
          )}
        </div>
        <div className={styles.authenticate_input_container}>
          <label className={styles.authenticate_label} htmlFor="city">
            Enter your City:
          </label>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formValues.city}
            onChange={(e) =>
              setFormValues({ ...formValues, city: e.target.value })
            }
            className={styles.authenticate_input}
          />
          {formErrors.city && (
            <p className={styles.authentication_errors}>{formErrors.city}</p>
          )}
        </div>
        <div className={styles.authenticate_input_container}>
          <label className={styles.authenticate_label} htmlFor="programme">
            Enter your Programme:
          </label>
          <input
            type="text"
            name="programme"
            placeholder="Programme"
            value={formValues.programme}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                programme: e.target.value,
              })
            }
            className={styles.authenticate_input}
          />
          {formErrors.programme && (
            <p className={styles.authentication_errors}>
              {formErrors.programme}
            </p>
          )}
        </div>
        <div className={styles.authenticate_input_container}>
          <label className={styles.authenticate_label} htmlFor="branch">
            Enter your Branch:
          </label>
          <input
            type="text"
            name="branch"
            placeholder="Branch"
            value={formValues.branch}
            onChange={(e) =>
              setFormValues({ ...formValues, branch: e.target.value })
            }
            className={styles.authenticate_input}
          />
          {formErrors.branch && (
            <p className={styles.authentication_errors}>{formErrors.branch}</p>
          )}
        </div>
        <div className={styles.authenticate_input_container}>
          <label className={styles.authenticate_label} htmlFor="email">
            Enter your Personal E-mail:
          </label>
          <input
            type="email"
            name="email"
            placeholder="Personal Email"
            value={formValues.email}
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
            className={styles.authenticate_input}
          />
          {formErrors.email && (
            <p className={styles.authentication_errors}>{formErrors.email}</p>
          )}
        </div>
        <div className={styles.authenticate_input_container}>
          <label className={styles.authenticate_label} htmlFor="password">
            Enter your Password:
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formValues.password}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                password: e.target.value,
              })
            }
            className={styles.authenticate_input}
          />
          {formErrors.password && (
            <p className={styles.authentication_errors}>
              {formErrors.password}
            </p>
          )}
        </div>
        {!login && (
          <div className={styles.authenticate_actions_btn_container}>
            <button
              type="submit"
              className={`${styles.sign_up} ${styles.authenticate_btn}`}
            >
              Submit
            </button>
            <button
              type="reset"
              onClick={resetForm}
              className={`${styles.reset} ${styles.authenticate_btn}`}
            >
              Reset
            </button>
          </div>
        )}
        {register && (
          <div className={styles.login_message}>
            <p className={styles.login_message_para}>REGISTRATION SUCCESSFUL</p>
            <br />
          </div>
        )}
        {login && userId && (
          <>
            <p className={styles.login_message_para}>You are logged in</p>
            <button
              type="button"
              className={`${styles.authenticate_btn} ${styles.home_link_btn}`}
            >
              <Link
                to={`/configure-profile/${userId}`}
                className={styles.home_link_text}
              >
                COMPLETE YOUR PROFILE
              </Link>
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default Signup;