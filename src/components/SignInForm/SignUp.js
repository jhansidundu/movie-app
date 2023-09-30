import React, { useContext } from "react";
import { auth } from "../configure/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import userContext from "../../Store/context";

// import { Redirect } from "react-router-dom";
function SignUp() {
  const contex = useContext(userContext);
  const history = useNavigate();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log(email);
    const password = e.target.password.value;
    createUserWithEmailAndPassword(auth, email, password).then((data) => {
      console.log(data);
      contex.setLogin(true);
      history("/");
    });
  };
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input name="email" placeholder="Email..." />
        <input name="password" type="password" placeholder="Password" />
        <button>SignUp</button>
      </form>
    </div>
  );
}

export default SignUp;
