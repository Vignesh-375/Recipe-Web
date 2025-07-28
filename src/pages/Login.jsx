import { useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  RegisterForm,
  RegisterSection,
  PasswordField,
} from "../components/StyledComponents.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck, faInfoCircle, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LOGIN_URL = "/auth"; // login endpoint

function Login() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().matches(/^[a-zA-Z0-9_]{4,20}$/, "Username must be 4 to 20 characters long and contain only alphanumeric characters and underscores.").required("Username is required"),
      password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, "Password must be at least 8 characters long and contain at least one digit and one uppercase letter.").required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post(LOGIN_URL, values, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // using cookies for authentication
        });

        console.log(JSON.stringify(response?.data)); // "?." is for optional chaining which is for checking null/undefined before assignment
        setSubmitting(false);
        // Assuming success message should be shown here
      } catch (err) {
        if (!err?.response) {
          setErrors({ general: "No Server Response" });
        } else if (err.response?.status === 400) {
          setErrors({ username: "Missing username or password", password: "Missing username or password" });
        } else if (err.response?.status === 401) {
          setErrors({ general: "Unauthorized or invalid username/password" });
        } else {
          setErrors({ general: "Login Failed" });
        }
      }
    }
  });

  const isMounted = useRef(true); // Using ref to check component's mounting state

  useEffect(() => {
    return () => {
      isMounted.current = false; // Setting isMounted to false when component is unmounted
    };
  }, []);

  useEffect(() => {
    if (isMounted.current) { 
      formik.setFieldTouched("username", false);
      formik.setFieldTouched("password", false);
    }
  }, []); 

  return (
    <>
      <RegisterSection>
        {formik.errors.general && (
          <p className="errmsg" aria-live="assertive">
            {formik.errors.general}
          </p>
        )}
        <h1>Log In</h1>
        <RegisterForm onSubmit={formik.handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            autoComplete="on"
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username && (
            <p className="instructions">
              <FontAwesomeIcon icon={faInfoCircle} />
              {formik.errors.username}
            </p>
          )}
          <label htmlFor="password">Password:</label>
          <PasswordField>
            <input
              type="password"
              id="password"
              {...formik.getFieldProps("password")}
            />
          </PasswordField>
          {formik.touched.password && formik.errors.password && (
            <p className="instructions">
              <FontAwesomeIcon icon={faInfoCircle} />
              {formik.errors.password}
            </p>
          )}
          <button type="submit" disabled={formik.isSubmitting}>
            Sign In
          </button>
        </RegisterForm>
        <p>
          Need an account?
          <br />
          <span className="line">
            <Link to="/register">Sign Up</Link>
          </span>
        </p>
      </RegisterSection>
    </>
  );
}

export default Login;
