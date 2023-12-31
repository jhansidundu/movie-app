import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import userContext from "../../Store/context";
import { auth } from "../../config/firebase";
import classes from "./SignIn.module.css";

function SignIn() {
  const context = useContext(userContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const user = response.user;
      localStorage.setItem("userId", user.uid);
      context.setUId(user.uid);
      context.setLogin(true);
      history("/");
    } catch (err) {
      setErrorMessage("Invalid Username/Password");
    }
  };

  return (
    <div className={classes["login"]}>
      <div className={classes.form}>
        <h2 className="mb-4">Login</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              placeholder="enter email address"
              className="form-control"
              id="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              placeholder="enter password"
              className="form-control"
              id="password"
            />
          </div>
          {errorMessage && (
            <div className={`text-danger mb-2`}>{errorMessage}</div>
          )}

          <button type="submit" className="btn btn-info">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
