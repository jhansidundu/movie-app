import { useContext, useRef } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import userContext from "../../Store/context";
import image from "../../assets/Tmdb.svg";
import classes from "./Header.module.css";
import { BiSearchAlt } from "react-icons/bi";
const Header = () => {
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const context = useContext(userContext);

  const OnLogin = () => {
    navigate("/signin");
  };
  const onSignUp = () => {
    navigate("/signup");
  };
  const onGetLike = () => {
    navigate("/likedlist");
  };
  const onSignOut = () => {
    context.setLogin(false);
    localStorage.removeItem("userId");

    navigate("/");
  };
  return (
    <>
      <header className={classes.header}>
        <Link className={classes.logo} to="/home">
          <img src={image} />
        </Link>

        <div className={classes.searchParent}>
          <input
            type="search"
            ref={searchRef}
            className={classes.input}
            placeholder="Search..."
          />
          <button type="submit" className={classes.button}>
            <BiSearchAlt />
          </button>
        </div>

        <div className={classes.InOut}>
          {context.login ? (
            ""
          ) : (
            <span className={classes.headerLink} onClick={OnLogin}>
              LogIn
            </span>
          )}
          {context.login ? (
            ""
          ) : (
            <span className={classes.headerLink} onClick={onSignUp}>
              SignUp
            </span>
          )}
          {context.login ? (
            <span className={classes.headerLink} onClick={onGetLike}>
              Wishlist
            </span>
          ) : (
            ""
          )}
          {context.login ? (
            <span className={classes.headerLink} onClick={onSignOut}>
              Logout
            </span>
          ) : (
            ""
          )}
        </div>
      </header>
    </>
  );
};
export default Header;
