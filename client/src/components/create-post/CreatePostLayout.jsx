import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Dropzone, FileMosaic } from "@files-ui/react";

import { getSubjects, createPost, getCommunities } from "../../api/api";

import styles from "./CreatePostLayout.module.css";

const CreatePostLayout = () => {
  const { currentUser } = useSelector((state) => state.user);

  const initialValues = {
    title: "",
    text: "",
    category: [],
    concepts: [],
    communities: [],
    file: null,
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [communities, setCommunities] = useState([]);

  const [conceptInput, setConceptInput] = useState("");

  const [postSuccess, setPostSuccess] = useState(false);

  const resetForm = () => {
    setFormValues(initialValues);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSubjects(localStorage.getItem("user_info"));
        const resData = response?.data?.subjects;
        setSubjects(resData);
        const commResponse = await getCommunities(
          localStorage.getItem("user_info")
        );
        const resData1 = commResponse?.data?.communities;
        setCommunities(resData1);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [setSubjects, setCommunities]);

  // const onFileChange = (e) => {
  //   setValue("file", e.target.files);
  // };

  // const updateFiles = (incomingFiles) => {
  //   setFiles(incomingFiles);
  // };

  // const removeFile = (id) => {
  //   setFiles(files.filter((x) => x.id !== id));
  // };

  const handleCommunityInput = (e) => {
    if (!formValues.communities.includes(e.target.value)) {
      setFormValues({
        ...formValues,
        communities: [...formValues.communities, e.target.value],
      });
    } else {
      setFormValues({
        ...formValues,
        communities: formValues.communities.filter(
          (comm) => comm !== e.target.value
        ),
      });
    }
  };

  const addConceptInput = () => {
    if (conceptInput.trim() !== "") {
      setFormValues({
        ...formValues,
        concepts: [...formValues.concepts, conceptInput.trim()],
      });
      setConceptInput("");
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formValues.title || formValues.title.length < 10) {
      errors.title = "Title should be at least 10 characters long";
    }
    if (!formValues.text || formValues.text.length < 30) {
      errors.text = "Text Body should be at least 30 characters long";
    }
    if (formValues.category.length === 0) {
      errors.category = "Category is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      const postData = formValues;
      try {
        const response = await createPost(
          postData,
          localStorage.getItem("user_info")
        );

        if (response.status === 201) {
          resetForm();
          setPostSuccess(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={styles.create_post_container}>
      <form onSubmit={onSubmit} className={styles.create_post_form}>
        <h3 className={styles.create_post_header}>CREATE A POST</h3>

        <label className={styles.create_form_label}>
          Title:
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
          Text Body:
          <textarea
            value={formValues.text}
            onChange={(e) =>
              setFormValues({ ...formValues, text: e.target.value })
            }
          />
          {errors.text && <p className={styles.error_message}>{errors.text}</p>}
        </label>

        <label className={styles.create_form_label}>
          <div className={styles.select_options}>
            Category:
            {formValues.category.map((category) => (
              <span
                key={category}
                className={`${styles.subject_span} ${styles.cat}`}
                onClick={() => {
                  if (formValues.category.includes(category)) {
                    setFormValues({
                      ...formValues,
                      category: formValues.category.filter(
                        (comm) => comm !== category
                      ),
                    });
                  } else {
                    setFormValues({
                      ...formValues,
                      category: [...formValues.category, category],
                    });
                  }
                }}
              >
                {subjects.find((subject) => subject._id === category).name}
              </span>
            ))}
          </div>
          <div className={styles.select_options}>
            {subjects.map((subject) => (
              <span
                key={subject._id}
                className={`${styles.subject_span} ${
                  formValues.category.includes(subject._id)
                    ? styles.selected
                    : ""
                }`}
                onClick={() => {
                  if (formValues.category.includes(subject._id)) {
                    setFormValues({
                      ...formValues,
                      category: formValues.category.filter(
                        (id) => id !== subject._id
                      ),
                    });
                  } else {
                    setFormValues({
                      ...formValues,
                      category: [...formValues.category, subject._id],
                    });
                  }
                }}
              >
                {subject.name}
              </span>
            ))}
          </div>
          {errors.category && (
            <p className={styles.error_message}>{errors.category}</p>
          )}
        </label>

        <label className={styles.create_form_label}>
          Post in Community (optional):
          <div className={styles.select_options}>
            {communities.map((community) => {
              return formValues.communities.includes(community._id) ? (
                <span
                  key={community._id}
                  className={styles.subject_span}
                  onClick={() => {
                    if (formValues.communities.includes(community)) {
                      setFormValues({
                        ...formValues,
                        communities: formValues.communities.filter(
                          (comm) => comm !== community
                        ),
                      });
                    }
                  }}
                >
                  {community.title}
                </span>
              ) : null;
            })}
          </div>
          <div className={styles.input_add_container}>
            <select
              multiple
              value={formValues.communities}
              className={styles.select_input}
            >
              {communities.map((community) => (
                <option
                  key={community._id}
                  className={styles.select_option}
                  value={community._id}
                  onClick={handleCommunityInput}
                >
                  {community.title}
                </option>
              ))}
            </select>
          </div>
        </label>

        <label className={styles.create_form_label}>
          Concepts covered (optional):
          <div className={styles.select_options}>
            {formValues.concepts.map((concept) => (
              <span
                key={concept}
                className={styles.subject_span}
                onClick={() => {
                  if (formValues.concepts.includes(concept)) {
                    setFormValues({
                      ...formValues,
                      concepts: formValues.concepts.filter(
                        (con) => con !== concept
                      ),
                    });
                  } else {
                    setFormValues({
                      ...formValues,
                      concepts: [...formValues.concepts, concept],
                    });
                  }
                }}
              >
                {concept}
              </span>
            ))}
          </div>
          <div className={styles.input_add_container}>
            <input
              type="text"
              value={conceptInput}
              onChange={(e) => setConceptInput(e.target.value)}
            />
            <button
              type="button"
              className={styles.add_btn}
              onClick={addConceptInput}
            >
              Add
            </button>
          </div>
        </label>

        <label className={styles.create_form_label}>
          Upload File (optional):
          <Dropzone
            // onChange={updateFiles}
            value={files}
            accept="image/*, .pdf, .doc, .docx, .xlsx"
            maxFileSize={20480 * 1024}
            maxFiles={1}
            color="#fff"
            actionButtons={{ position: "bottom", cleanButton: {} }}
          >
            {files.map((file) => (
              <FileMosaic key={file.id} {...file} info />
            ))}
          </Dropzone>
        </label>
        <div className={styles.form_btns_container}>
          <button type="submit" className={styles.form_submit_btn}>
            Create Post
          </button>
          {postSuccess && <h3>Post Successfully created!</h3>}
        </div>
      </form>
    </div>
  );
};

export default CreatePostLayout;