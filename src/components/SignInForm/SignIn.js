import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../configure/firebase";
import { useNavigate } from "react-router";
import { useContext } from "react";
import userContext from "../../Store/context";

function SignIn() {
  const context = useContext(userContext);
  // localStorage.removeItem("userId");
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
          // console.log(userCred);
          context.setUId(uid);
          context.setLogin(true);
          localStorage.setItem("userId", uid);

          history("/");
        })
        .catch((err) => {
          // alert(err.code);
          console.log(err);
        });
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" placeholder="Email..." />
        <input name="password" placeholder="Password..." />
        <button>SignIn</button>
      </form>
    </div>
  );
}

export default SignIn;
