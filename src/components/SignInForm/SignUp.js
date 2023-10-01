import React, { useContext } from "react";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import userContext from "../../Store/context";

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
