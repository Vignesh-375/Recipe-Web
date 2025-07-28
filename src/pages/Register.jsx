import { Link } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup for validation

import {
  faInfoCircle,
  faCheck,
  faTimes,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  RegisterForm,
  RegisterSection,
  PasswordField,
} from "../components/StyledComponents.jsx";

const registerURL = "/register";

function Register() {
  const formik = useFormik({
    initialValues: {
      username: "", // declaring formik inputs
      password: "",
      confirmPwd: "",
    },
    validationSchema: Yup.object({
      // validation using yup and RegEx
      username: Yup.string()
        .matches(
          /^[a-zA-Z0-9_]{4,20}$/,
          "Username must be 4 to 20 characters long and contain only alphanumeric characters and underscores."
        )
        .required("Username is required"),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must be at least 8 characters long and contain at least one digit and one uppercase letter."
        )
        .required("Password is required"),
      confirmPwd: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post(registerURL, values, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        console.log(response.data);
        setSubmitting(false);
        //  success message  //
      } catch (err) {
        if (!err?.response) {
          setErrors({ general: "No Server Response" });
        } else if (err.response?.status === 409) {
          setErrors({ username: "Username Taken" });
        } else {
          setErrors({ general: "Registration Failed" });
        }
        setSubmitting(false);
      }
    },
  });

  return (
    <RegisterSection>
      <h1>Register</h1>
      <RegisterForm onSubmit={formik.handleSubmit}>
        {formik.errors.general && (
          <p className="errmsg" aria-live="assertive">
            {formik.errors.general}
          </p>
        )}
        <label htmlFor="username">
          Username:
          <span
            className={
              formik.touched.username && formik.errors.username
                ? "invalid"
                : "hide"
            }
          >
            <FontAwesomeIcon icon={faTimes} />
          </span>
          <span
            className={
              formik.touched.username && !formik.errors.username
                ? "valid"
                : "hide"
            }
          >
            <FontAwesomeIcon icon={faCheck} />
          </span>
        </label>
        <input
          type="text"
          id="username"
          {...formik.getFieldProps("username")}
        />
        {formik.touched.username && formik.errors.username && (
          <p className="instructions">
            <FontAwesomeIcon icon={faInfoCircle} />
            {formik.errors.username}
          </p>
        )}
        <label htmlFor="password">
          Password:
          <span
            className={
              formik.touched.password && formik.errors.password
                ? "invalid"
                : "hide"
            }
          >
            <FontAwesomeIcon icon={faTimes} />
          </span>
          <span
            className={
              formik.touched.password && !formik.errors.password
                ? "valid"
                : "hide"
            }
          >
            <FontAwesomeIcon icon={faCheck} />
          </span>
        </label>
        <input
          type="password"
          id="password"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="instructions">
            <FontAwesomeIcon icon={faInfoCircle} />
            {formik.errors.password}
          </p>
        )}

        <label htmlFor="confirmPassword">
          Confirm Password:
          <span
            className={
              formik.touched.confirmPwd && formik.errors.confirmPwd
                ? "invalid"
                : "hide"
            }
          >
            <FontAwesomeIcon icon={faTimes} />
          </span>
          <span
            className={
              formik.touched.confirmPwd && !formik.errors.confirmPwd
                ? "valid"
                : "hide"
            }
          >
            <FontAwesomeIcon icon={faCheck} />
          </span>
        </label>
        <input
          type="password"
          id="confirmPassword"
          {...formik.getFieldProps("confirmPwd")}
        />
        {formik.touched.confirmPwd && formik.errors.confirmPwd && (
          <p className="instructions">
            <FontAwesomeIcon icon={faInfoCircle} />
            {formik.errors.confirmPwd}
          </p>
        )}
        <button type="submit" disabled={formik.isSubmitting}>
          Sign Up
        </button>
      </RegisterForm>
      <p>
        Already registered?
        <br />
        <span className="line">
          <Link to="/login">Sign In</Link>
        </span>
      </p>
    </RegisterSection>
  );
}

export default Register;
