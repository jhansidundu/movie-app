import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import userContext from "../../Store/context";
import { auth } from "../../config/firebase";
import Card from "../UI/Card/Card";
import classes from "./SignIn.module.css";

function SignUp() {
  const context = useContext(userContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      context.setLogin(true);
      context.setUId(response.user.uid);
      navigate("/");
    } catch (err) {
      setErrorMessage(err.message);
      console.log(err);
    }
  };
  return (
    <div className={classes["login"]}>
      <div className={classes.form}>
        <h2 className="mb-4">SignUp</h2>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Username
            </label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" />
          </div>
          {errorMessage && (
            <div className={`${classes.error} mb-2`}>{errorMessage}</div>
          )}
          <button type="submit" className="btn btn-info">
            SIGNUP
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
