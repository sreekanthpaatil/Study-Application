import React, { useState } from "react";
import AnimatedPage from "./AnimatedPage";
import styles from "./Footer.module.css";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <AnimatedPage>
      <section className={styles.contact_section}>
        <h2 className={styles.contact_header}>CONTACT US</h2>
        <div className={styles.contact_form_container}>
          <form onSubmit={handleSubmit} className={styles.contact_form}>
            <div className={styles.contact_input_container}>
              <label htmlFor="name" className={styles.contact_label}>
                Name:
              </label>
              <br />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.contact_input}
                required
              />
            </div>
            <div className={styles.contact_input_container}>
              <label htmlFor="email" className={styles.contact_label}>
                Email:
              </label>
              <br />
              <input
                type="email"
                id="email"
                name="email"
                className={styles.contact_input}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.contact_input_container}>
              <label htmlFor="message" className={styles.contact_label}>
                Message:
              </label>
              <br />
              <textarea
                id="message"
                name="message"
                className={styles.contact_textarea}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className={styles.contact_btn}>
              Submit
            </button>
          </form>
        </div>
      </section>
      <footer className={styles.contact_footer}>
        <h5 className={styles.contact_footer_content}>made by Team LET</h5>
      </footer>
    </AnimatedPage>
  );
}

export default ContactUs;