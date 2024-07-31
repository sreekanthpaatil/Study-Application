import { useState, useEffect } from "react";
import AnimatedPage from "./AnimatedPage";
import { signin, signup } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "../redux/userSlice";

import styles from "./login.module.css";
import { Link, redirect } from "react-router-dom";

export default function LoginSignUp() {
  const [action, setAction] = useState("Sign Up");
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
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
  const errorFields = {
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
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(errorFields);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const initialValues2 = { email: "", password: "" };
  const errorFields2 = { email: false, password: false };

  const [formValues2, setFormValues2] = useState(initialValues2);
  const [formErrors2, setFormErrors2] = useState({});
  const [isSubmit2, setIsSubmit2] = useState(false);
  const [formIsValid2, setFormIsValid2] = useState(false);

  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  const resetForm = () => {
    setFormErrors(errorFields);
    setFormValues(initialValues);
    setIsSubmit(false);
  };
  const resetForm2 = () => {
    setFormErrors2(errorFields2);
    setFormValues2(initialValues2);
    setIsSubmit2(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (formIsValid) {
      try {
        const response = await signup(formValues);
        if (response.data.message === "User already exists.") {
          setFormErrors({ ...formErrors, email: "User already exists" });
          setFormIsValid(false);
        }
        setIsSubmit(true);

        if (response.status === 201) {
          console.log("REGISTRATION SUCCESSFUL");
          setRegister(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setFormErrors2(validate2(formValues2));
    if (formIsValid2) {
      try {
        const response = await signin(formValues2);
        if (response.data.message === "User doesn't exist.") {
          setFormErrors2({ ...formErrors2, email: "User doesn't exist." });
          setFormIsValid2(false);
        }
        if (response.data.message === "Invalid credentials") {
          setFormErrors2({ ...formErrors2, password: "Invalid password" });
          setFormIsValid2(false);
        }
        setIsSubmit2(true);

        if (response.status === 200) {
          console.log("LOG IN SUCCESSFUL");

          dispatch(loginSuccess(response.data));
          // redirect("/info");

          setLogin(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // useEffect(() => {}, [formErrors]);

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
    }

    if (flag) setFormIsValid(true);

    return errors;
  };

  // useEffect(() => {}, [formErrors2]);
  const validate2 = (values) => {
    const errors2 = {};
    let flag = true;
    const regex2 = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors2.email = " Email is required!";
      flag = false;
    } else if (!regex2.test(values.email)) {
      errors2.email = "This is not a valid email format!";
      flag = false;
    }
    if (!values.password) {
      errors2.password = "Password is required";
      flag = false;
    } else if (values.password.length < 4) {
      errors2.password = "Password must be more than 4 characters";
      flag = false;
    }

    if (flag) setFormIsValid2(true);

    return errors2;
  };

  return (
    <AnimatedPage>
      <section className={styles.authentication_section}>
        <div className={styles.authenticate_container}>
          <div className={styles.authenticate_btn_container}>
            <button
              className={
                action === "Sign Up"
                  ? `${styles.authenticate_mode_btn} ${styles.authenticate_mode_selected}`
                  : `${styles.authenticate_mode_btn}`
              }
              onClick={() => {
                resetForm2();
                setAction("Sign Up");
              }}
            >
              Sign Up
            </button>
            <button
              className={
                action === "Sign In"
                  ? `${styles.authenticate_mode_btn} ${styles.authenticate_mode_selected}`
                  : `${styles.authenticate_mode_btn}`
              }
              onClick={() => {
                resetForm();
                setAction("Sign In");
              }}
            >
              Sign In
            </button>
          </div>
          {action === "Sign Up" && (
            <form onSubmit={handleSubmit} className={styles.authenticate_form}>
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
                    <p className={styles.authentication_errors}>
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div className={styles.authenticate_input_container}>
                  <label
                    className={styles.authenticate_label}
                    htmlFor="instituteEmail"
                  >
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
                    <p className={styles.authentication_errors}>
                      {formErrors.dob}
                    </p>
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
                    <p className={styles.authentication_errors}>
                      {formErrors.gender}
                    </p>
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
                    <p className={styles.authentication_errors}>
                      {formErrors.phone}
                    </p>
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
                    <p className={styles.authentication_errors}>
                      {formErrors.city}
                    </p>
                  )}
                </div>

                <div className={styles.authenticate_input_container}>
                  <label
                    className={styles.authenticate_label}
                    htmlFor="programme"
                  >
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
                    <p className={styles.authentication_errors}>
                      {formErrors.branch}
                    </p>
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
                    <p className={styles.authentication_errors}>
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div className={styles.authenticate_input_container}>
                  <label
                    className={styles.authenticate_label}
                    htmlFor="password"
                  >
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
                {register && (
                  <div className={styles.login_message}>
                    <p className={styles.login_message_para}>
                      REGISTRATION SUCCESSFUL <br />
                      PLEASE SIGN IN TO CONTINUE
                    </p>
                  </div>
                )}
              </div>
            </form>
          )}

          {action === "Sign In" && (
            <form onSubmit={handleSubmit2}>
              <div className={styles.authenticate_inputs}>
                <div className={styles.authenticate_input}>
                  <label className={styles.authenticate_label} htmlFor="email">
                    Enter your Registered E-mail ID (Personal):
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formValues2.email}
                    onChange={(e) =>
                      setFormValues2({
                        ...formValues2,
                        email: e.target.value,
                      })
                    }
                    className={styles.authenticate_input}
                    placeholder="Email ID"
                  />
                </div>
                {formErrors2.email && (
                  <p className={styles.authentication_errors}>
                    {formErrors2.email}
                  </p>
                )}

                <div className={styles.authenticate_input}>
                  <label
                    className={styles.authenticate_label}
                    htmlFor="passowrd"
                  >
                    Enter your Password:
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formValues2.password}
                    onChange={(e) =>
                      setFormValues2({
                        ...formValues2,
                        password: e.target.value,
                      })
                    }
                    className={styles.authenticate_input}
                  />
                </div>
                {formErrors2.password && (
                  <p className={styles.authentication_errors}>
                    {formErrors2.password}
                  </p>
                )}

                <div className={styles.forgot_pass}>
                  Forgot Password?<span> Click Here! </span>
                </div>
                <div className={styles.authenticate_actions_btn_container}>
                  <button
                    className={`${styles.sign_up} ${styles.authenticate_btn}`}
                    type="submit"
                  >
                    Submit
                  </button>
                  <button
                    type="reset"
                    onClick={resetForm2}
                    className={`${styles.reset} ${styles.authenticate_btn}`}
                  >
                    Reset
                  </button>
                </div>

                {login && (
                  <div className={styles.login_message}>
                    <p className={styles.login_message_para}>
                      LOG IN SUCCESSFUL
                    </p>
                    <button
                      type="button"
                      className={`${styles.authenticate_btn} ${styles.home_link_btn}`}
                    >
                      <Link to="/home" className={styles.home_link_text}>
                        GO TO HOME
                      </Link>
                    </button>
                    <button
                      type="button"
                      className={`${styles.authenticate_btn} ${styles.home_link_btn}`}
                    >
                      <Link to="/info" className={styles.home_link_text}>
                        CONTINUE
                      </Link>
                    </button>
                    <button
                      type="button"
                      className={`${styles.authenticate_btn} ${styles.home_link_btn}`}
                      onClick={() => {
                        setLogin(false);
                        dispatch(logout());
                      }}
                    >
                      LOG OUT
                    </button>
                  </div>
                )}
              </div>
            </form>
          )}
        </div>
      </section>
    </AnimatedPage>
  );
}