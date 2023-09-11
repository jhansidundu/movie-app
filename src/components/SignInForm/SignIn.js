import React from "react";
import { auth } from "./../configure/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";

// import { Redirect } from "react-router-dom";
function SignIn() {
  const history = useNavigate();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log(email);
    const password = e.target.password.value;
    createUserWithEmailAndPassword(auth, email, password).then((data) => {
      console.log(data);
      history("/");
    });
  };
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input name="email" placeholder="Email..." />
        <input name="password" type="password" placeholder="Password" />
        <button>SignIn</button>
      </form>
    </div>
  );
}

export default SignIn;
