import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../configure/firebase";
import { useNavigate } from "react-router";
import { useContext } from "react";
import userContext from "../../Store/contex";

function SignUp() {
  const context = useContext(userContext);
  let uid;
  let history = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        const user = userCred.user;
        uid = user.uid;
        // console.log(userCred);
        context.setUId(uid);
        history("/");
      })
      .catch((err) => {
        // alert(err.code);
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" placeholder="Email..." />
        <input name="password" placeholder="Password..." />
        <button>SignUp</button>
      </form>
    </div>
  );
}

export default SignUp;
