import { useRef, useState } from "react";
import image from "../../assets/Tmdb.svg";
import classes from "./Header.module.css";
import SignIn from "../SignInForm/SignIn";
import { useNavigate } from "react-router";
import { Redirect } from "react-router";

const Header = (props) => {
  // const [searchVal, setSearchVal] = useState();
  const searchRef = useRef(null);
  const history = useNavigate();
  // const onInputChange = (event) => {
  //   // console.log(event.target.value);
  //   setSearchVal(event.target.value);
  // };
  // console.log(searchRef.current);
  const submitForm = () => {
    props.search(searchRef.current.value);
  };
  const OnLogin = () => {
    history("/signin");
    // return <Redirect to="/signin" />;
  };
  const onSignUp = () => {
    history("/signup");
  };
  const onGetLike = () => {
    history("/likedlist");
  };
  return (
    <>
      <header className={classes.header}>
        <a className={classes.logo}>
          <img src={image} alt="here is image app" />
        </a>
        <div>
          <input
            type="text"
            ref={searchRef}
            // value={searchVal}
            // onChange={onInputChange}
            className={classes.input}
          />
        </div>
        <button onClick={submitForm}>Search</button>
        <div>
          <button onClick={OnLogin}>LoginIn</button>
          <button onClick={onSignUp}>SignUp</button>
        </div>
        <button onClick={onGetLike}>LikedItems</button>
      </header>
    </>
  );
};
export default Header;
