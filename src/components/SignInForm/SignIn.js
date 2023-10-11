import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { useNavigate } from "react-router";
import userContext from "../../Store/context";
import { auth } from "../../config/firebase";
import Card from "../UI/Card/Card";
import classes from "./SignIn.module.css";

function SignIn() {
  const context = useContext(userContext);
  let uid;
  let history = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const userID = localStorage.getItem("userId");
    console.log(userID);
    if (userID) {
      context.setUId(userID);
      context.setLogin(true);
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          const user = userCred.user;
          uid = user.uid;
          localStorage.setItem("userId", uid);

          context.setUId(uid);
          context.setLogin(true);
          history("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Card class={classes["login-card"]}>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
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
          LOGIN
        </button>
      </form>
    </Card>
  );
}

export default SignIn;
