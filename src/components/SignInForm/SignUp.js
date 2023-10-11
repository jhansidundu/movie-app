import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import userContext from "../../Store/context";
import { auth } from "../../config/firebase";
import Card from "../UI/Card/Card";
import classes from "./SignIn.module.css";

function SignUp() {
  const contex = useContext(userContext);
  const navigate = useNavigate();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log(email);
    const password = e.target.password.value;
    createUserWithEmailAndPassword(auth, email, password).then((data) => {
      console.log(data);
      contex.setLogin(true);
      navigate("/");
    });
  };
  return (
    <Card class={classes["login-card"]}>
      <h2>SignUp</h2>
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

        <button type="submit" className="btn btn-info">
          SIGNUP
        </button>
      </form>
    </Card>
  );
}

export default SignUp;
