import { useContext, useRef, useState } from "react";
import image from "../../assets/Tmdb.svg";
import classes from "./Header.module.css";
import SignIn from "../SignInForm/SignIn";
import { useNavigate } from "react-router";
import { Redirect } from "react-router";
import userContext from "../../Store/context";
const Header = (props) => {
  // const [searchVal, setSearchVal] = useState();
  const searchRef = useRef(null);
  const history = useNavigate();
  const context = useContext(userContext);

  const submitForm = () => {
    props.search(searchRef.current.value);
  };
  const OnLogin = () => {
    history("/signin");
    // context.login = true;
    // return <Redirect to="/signin" />;
  };
  const onSignUp = () => {
    history("/signup");
  };
  const onGetLike = () => {
    history("/likedlist");
  };
  const onHome = () => {
    history("/home");
  };
  const onSignOut = () => {
    context.setLogin(false);
    localStorage.removeItem("userId");

    history("/");
  };
  return (
    <>
      <header className={classes.header}>
        <a className={classes.logo}>
          <img src={image} alt="here is image app" onClick={onHome} />
        </a>

        <div className={classes.searchParent}>
          <input
            type="search"
            ref={searchRef}
            // value={searchVal}
            // onChange={onInputChange}
            className={classes.input}
            placeholder="Search..."
          />
          <button type="submit" className={classes.button}></button>
        </div>

        {/* <button onClick={submitForm}>Search</button> */}

        <div className={classes.InOut}>
          {context.login ? "" : <button onClick={OnLogin}>SignIn</button>}
          {context.login ? "" : <button onClick={onSignUp}>SignUp</button>}
          {context.login ? <button onClick={onSignOut}>SignOut</button> : ""}
        </div>
        {context.login ? <button onClick={onGetLike}>LikedItems</button> : ""}
      </header>
    </>
  );
};
export default Header;
