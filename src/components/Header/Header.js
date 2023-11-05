import { useContext, useRef } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import userContext from "../../Store/context";
import classes from "./Header.module.css";
const Header = () => {
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const context = useContext(userContext);

  function handleSearch() {
    const searchQuery = searchRef.current.value;
    console.log(typeof searchQuery);
    console.log(searchQuery);
    if (!searchQuery || !searchQuery.trim()) return;
    navigate(`/search?q=${searchQuery}`);
  }

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
          {/* <img src={image} /> */}
          <h3>Movie Explorer</h3>
        </Link>

        <div className={classes.searchParent}>
          <input
            type="search"
            ref={searchRef}
            className={classes.input}
            placeholder="Search..."
          />
          <button onClick={handleSearch} className={classes.button}>
            <BiSearchAlt />
          </button>
        </div>

        <div className={classes.InOut}>
          {context.login ? (
            ""
          ) : (
            <span className={classes.headerLink} onClick={OnLogin}>
              Login
            </span>
          )}
          {context.login ? (
            ""
          ) : (
            <span className={classes.headerLink} onClick={onSignUp}>
              Signup
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
